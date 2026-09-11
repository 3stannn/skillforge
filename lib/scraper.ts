import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import {
  ExtractedStyles,
  ExtractedLogic,
  ExtractedForm,
  ExtractedFormField,
  CrawledPageSummary,
  CrawlOptions,
} from "./types";

export interface ScrapeResult {
  markdown: string;
  title: string;
  description?: string;
  source: "firecrawl" | "local_readability" | "local_cheerio" | "raw_json";
  targetUrl: string;
  styles: ExtractedStyles;
  logic: ExtractedLogic;
  statusCode?: number;
  wordCount?: number;
  crawledPages?: CrawledPageSummary[];
  totalCrawledCount?: number;
  rawHtml?: string;
}

/**
 * Configure Turndown for clean, code-friendly Markdown
 */
function createTurndownService(): TurndownService {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    hr: "---",
  });

  // Preserve pre and code blocks with language tags
  turndown.addRule("preserveCode", {
    filter: ["pre", "code"],
    replacement: (content, node) => {
      const element = node as HTMLElement;
      const classAttr = element.getAttribute("class") || "";
      const langMatch = classAttr.match(/(?:language-|lang-)(\w+)/i);
      const lang = langMatch ? langMatch[1].toLowerCase() : "";

      if (node.nodeName === "PRE") {
        const text = element.textContent?.trim() || "";
        return `\n\`\`\`${lang}\n${text}\n\`\`\`\n`;
      }
      return `\`${element.textContent || ""}\``;
    },
  });

  // Clean GitHub-compatible Markdown tables
  turndown.addRule("cleanTables", {
    filter: ["table"],
    replacement: (content, node) => {
      const $ = cheerio.load((node as HTMLElement).outerHTML);
      const rows: string[] = [];

      $("tr").each((_, tr) => {
        const cells: string[] = [];
        $(tr)
          .find("th, td")
          .each((_, cell) => {
            cells.push($(cell).text().trim().replace(/\|/g, "\\|").replace(/\n+/g, " "));
          });
        if (cells.length > 0) {
          rows.push(`| ${cells.join(" | ")} |`);
        }
      });

      if (rows.length > 0) {
        const headerCols = rows[0].split("|").filter(Boolean).length;
        const separator = `| ${new Array(headerCols).fill("---").join(" | ")} |`;
        return `\n${rows[0]}\n${separator}\n${rows.slice(1).join("\n")}\n\n`;
      }
      return content;
    },
  });

  // Admonitions / Callouts / Alerts converter
  turndown.addRule("admonitions", {
    filter: (node) => {
      const el = node as HTMLElement;
      const cls = (el.getAttribute("class") || "").toLowerCase();
      return (
        cls.includes("callout") ||
        cls.includes("admonition") ||
        cls.includes("alert-box") ||
        cls.includes("alert-info") ||
        cls.includes("alert-warning")
      );
    },
    replacement: (content, node) => {
      const el = node as HTMLElement;
      const cls = (el.getAttribute("class") || "").toLowerCase();
      let alertType = "NOTE";
      if (cls.includes("warn") || cls.includes("caution")) alertType = "WARNING";
      if (cls.includes("tip") || cls.includes("success")) alertType = "TIP";
      if (cls.includes("danger") || cls.includes("error")) alertType = "CAUTION";
      if (cls.includes("important")) alertType = "IMPORTANT";

      const cleanText = content.trim().replace(/^>\s*/gm, "");
      return `\n> [!${alertType}]\n> ${cleanText.split("\n").join("\n> ")}\n\n`;
    },
  });

  return turndown;
}

/**
 * Fetch external CSS stylesheets linked in the document head
 */
export async function fetchExternalStylesheets(
  $: cheerio.CheerioAPI,
  baseUrl: string,
  maxSheets: number = 3
): Promise<string> {
  const links: string[] = [];
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr("href");
    if (href) {
      try {
        const resolved = new URL(href, baseUrl).toString();
        if (resolved.startsWith("http://") || resolved.startsWith("https://")) {
          links.push(resolved);
        }
      } catch {}
    }
  });

  if (links.length === 0) return "";

  const selected = links.slice(0, maxSheets);
  const cssContents: string[] = [];

  await Promise.all(
    selected.map(async (sheetUrl) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(sheetUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 SkillForge/2.0",
            Accept: "text/css,*/*;q=0.1",
          },
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (res.ok) {
          const text = await res.text();
          // Cap to 100KB per sheet to prevent memory exhaustion
          cssContents.push(text.slice(0, 100000));
        }
      } catch {
        // Skip unreachable stylesheets silently
      }
    })
  );

  return cssContents.join("\n");
}

/**
 * Detects frontend frameworks, runtime libraries, and UI component packages
 */
export function detectFrameworks($: cheerio.CheerioAPI, rawHtml: string): string[] {
  const frameworks = new Set<string>();

  // Next.js
  if (
    rawHtml.includes("__NEXT_DATA__") ||
    rawHtml.includes("/_next/") ||
    rawHtml.includes("self.__next_f") ||
    $("[data-nextjs-scroll-focus-boundary]").length > 0
  ) {
    frameworks.add("Next.js");
  }

  // React
  if (
    rawHtml.includes("data-reactroot") ||
    rawHtml.includes("_reactListening") ||
    rawHtml.includes("react-dom") ||
    frameworks.has("Next.js")
  ) {
    frameworks.add("React");
  }

  // Vue & Nuxt
  if (rawHtml.includes("__NUXT__") || rawHtml.includes("/_nuxt/")) {
    frameworks.add("Nuxt");
    frameworks.add("Vue");
  } else if (
    rawHtml.includes("data-v-") ||
    rawHtml.includes("vue.js") ||
    rawHtml.includes("vue.min.js")
  ) {
    frameworks.add("Vue");
  }

  // Svelte & SvelteKit
  if (
    rawHtml.includes("__sveltekit") ||
    rawHtml.includes("data-sveltekit") ||
    rawHtml.includes("svelte-")
  ) {
    frameworks.add("Svelte / SvelteKit");
  }

  // Astro
  if (
    rawHtml.includes("astro-island") ||
    rawHtml.includes("data-astro-cid") ||
    rawHtml.includes("astro.build")
  ) {
    frameworks.add("Astro");
  }

  // Remix
  if (rawHtml.includes("__remixContext") || rawHtml.includes("remix-run")) {
    frameworks.add("Remix");
  }

  // Tailwind CSS
  if (
    rawHtml.includes("tailwindcss") ||
    rawHtml.includes("tailwind") ||
    rawHtml.includes("@tailwind")
  ) {
    frameworks.add("Tailwind CSS");
  } else {
    let twTokenCount = 0;
    $("[class]").each((_, el) => {
      const cls = $(el).attr("class") || "";
      const tokens = cls.split(/\s+/);
      for (const t of tokens) {
        if (
          /^(?:bg-|text-|border-|ring-|shadow-|rounded-|p-|px-|py-|m-|mx-|my-|w-|h-|max-w-|gap-|grid|flex|items-|justify-|hover:|dark:|focus:|backdrop-)/.test(
            t
          )
        ) {
          twTokenCount++;
        }
      }
    });
    if (twTokenCount >= 3) {
      frameworks.add("Tailwind CSS");
    }
  }

  // Radix UI / Shadcn UI
  if (rawHtml.includes("data-radix-") || rawHtml.includes("radix-ui")) {
    frameworks.add("Radix UI / Shadcn UI");
  }

  // Lucide Icons
  if (rawHtml.includes("lucide") || rawHtml.includes("lucide-react")) {
    frameworks.add("Lucide Icons");
  }

  // Alpine.js
  if (rawHtml.includes("x-data") || rawHtml.includes("x-bind")) {
    frameworks.add("Alpine.js");
  }

  // HTMX
  if (
    rawHtml.includes("hx-get") ||
    rawHtml.includes("hx-post") ||
    rawHtml.includes("hx-target")
  ) {
    frameworks.add("HTMX");
  }

  return Array.from(frameworks);
}

/**
 * Extracts CSS tokens, colors, fonts, CSS variables, keyframes, shadows, and Tailwind utility classes
 */
export function extractStylesFromHtml(
  $: cheerio.CheerioAPI,
  rawHtml: string,
  externalCss: string = ""
): ExtractedStyles {
  const colorSet = new Set<string>();
  const fontSet = new Set<string>();
  const cssVariables: Record<string, string> = {};
  const tailwindClassSet = new Set<string>();
  const layoutPatterns = new Set<string>();
  const animationSet = new Set<string>();
  const shadowSet = new Set<string>();
  const radiusSet = new Set<string>();
  const mediaQuerySet = new Set<string>();

  // 1. Combine inline styles, <style> tags, and external CSS
  const styleContents: string[] = [];
  $("style").each((_, el) => {
    styleContents.push($(el).text());
  });

  $("[style]").each((_, el) => {
    const inline = $(el).attr("style");
    if (inline) styleContents.push(inline);
  });

  if (externalCss) {
    styleContents.push(externalCss);
  }

  const combinedStyles = styleContents.join("\n");

  // Regex for CSS variables: --primary-color: #3b82f6;
  const varMatches = combinedStyles.matchAll(/--([a-zA-Z0-9_-]+)\s*:\s*([^;}\n]+)/g);
  for (const m of varMatches) {
    const varName = `--${m[1].trim()}`;
    const varValue = m[2].trim();
    if (varValue.length < 80) {
      cssVariables[varName] = varValue;
    }

    // Check if variable value is a color
    if (/^#(?:[0-9a-fA-F]{3,8})\b|^(?:rgb|hsl)a?\(/i.test(varValue)) {
      colorSet.add(varValue);
    }
  }

  // Regex for Hex colors (#fff, #1a202c, etc.)
  const hexMatches = (rawHtml + combinedStyles).match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g);
  if (hexMatches) {
    for (const hex of hexMatches.slice(0, 35)) {
      colorSet.add(hex.toLowerCase());
    }
  }

  // Regex for rgb/hsl colors
  const rgbMatches = (rawHtml + combinedStyles).match(/(?:rgb|hsl)a?\([^)]+\)/gi);
  if (rgbMatches) {
    for (const c of rgbMatches.slice(0, 20)) {
      colorSet.add(c.trim());
    }
  }

  // Regex for font families
  const fontMatches = combinedStyles.matchAll(/font-family\s*:\s*([^;}\n]+)/gi);
  for (const f of fontMatches) {
    const cleanFont = f[1].trim().replace(/['"]/g, "");
    if (cleanFont && !fontSet.has(cleanFont)) {
      fontSet.add(cleanFont);
    }
  }

  // Check Google Fonts links
  $('link[href*="fonts.googleapis.com"]').each((_, el) => {
    const href = $(el).attr("href") || "";
    const familyMatch = href.match(/family=([^&:]+)/);
    if (familyMatch) {
      const family = decodeURIComponent(familyMatch[1].replace(/\+/g, " "));
      fontSet.add(family);
    }
  });

  // Animations (@keyframes name)
  const keyframeMatches = combinedStyles.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g);
  for (const km of keyframeMatches) {
    if (km[1] && !animationSet.has(km[1])) {
      animationSet.add(`@keyframes ${km[1]}`);
    }
  }

  // Box-shadow tokens
  const shadowMatches = combinedStyles.matchAll(/box-shadow\s*:\s*([^;}\n]+)/gi);
  for (const sm of shadowMatches) {
    const val = sm[1].trim();
    if (val && val !== "none" && val.length < 80) {
      shadowSet.add(val);
    }
  }

  // Border-radius tokens
  const radiusMatches = combinedStyles.matchAll(/border-radius\s*:\s*([^;}\n]+)/gi);
  for (const rm of radiusMatches) {
    const val = rm[1].trim();
    if (val && val !== "0" && val.length < 40) {
      radiusSet.add(val);
    }
  }

  // Media queries (e.g. prefers-color-scheme: dark, responsive breakpoints)
  const mediaMatches = combinedStyles.matchAll(/@media\s*\(([^)]+)\)/gi);
  for (const mm of mediaMatches) {
    const query = mm[1].trim();
    if (query.includes("prefers-color-scheme")) {
      mediaQuerySet.add("Dark Mode (prefers-color-scheme)");
    } else if (query.includes("min-width") || query.includes("max-width")) {
      mediaQuerySet.add(`Breakpoint: (${query})`);
    }
  }

  // 2. Scan class attributes for Tailwind & layout utility classes
  $("[class]").each((_, el) => {
    const clsAttr = $(el).attr("class") || "";
    const classes = clsAttr.split(/\s+/).filter(Boolean);

    for (const c of classes) {
      if (
        /^(?:bg-|text-|border-|ring-|shadow-|rounded-|p-|px-|py-|m-|mx-|my-|w-|h-|max-w-|min-w-|gap-|grid-|flex-|items-|justify-|hover:|dark:|focus:|transition-|animate-|font-|backdrop-|overflow-|z-|cursor-)/.test(
          c
        )
      ) {
        tailwindClassSet.add(c);
      }

      if (c === "flex" || c.startsWith("flex-")) layoutPatterns.add("Flexbox Layout");
      if (c === "grid" || c.startsWith("grid-cols-")) layoutPatterns.add("CSS Grid System");
      if (c.includes("sticky") || c.includes("fixed")) layoutPatterns.add("Fixed/Sticky Navigation");
      if (c.includes("backdrop-blur") || c.includes("bg-opacity"))
        layoutPatterns.add("Glassmorphism Effect");
      if (c.includes("dark:")) layoutPatterns.add("Dark Mode Styling");
      if (c.includes("rounded-xl") || c.includes("rounded-2xl") || c.includes("rounded-full"))
        layoutPatterns.add("Modern Rounded Cards");
      if (
        c.includes("max-w-7xl") ||
        c.includes("max-w-6xl") ||
        c.includes("max-w-5xl") ||
        c.includes("container")
      )
        layoutPatterns.add("Centered Container Architecture");
    }
  });

  return {
    colors: Array.from(colorSet).slice(0, 25),
    fonts: Array.from(fontSet).slice(0, 10),
    cssVariables,
    tailwindClasses: Array.from(tailwindClassSet).slice(0, 50),
    layoutPatterns: Array.from(layoutPatterns),
    animations: Array.from(animationSet).slice(0, 10),
    shadows: Array.from(shadowSet).slice(0, 8),
    radii: Array.from(radiusSet).slice(0, 8),
    mediaQueries: Array.from(mediaQuerySet).slice(0, 8),
    rawStylesSummary: `Extracted ${colorSet.size} color tokens, ${Object.keys(cssVariables).length} CSS variables, and ${tailwindClassSet.size} utility classes.`,
  };
}

/**
 * Extracts JavaScript interaction logic, event handlers, scripts, forms, frameworks, and state variables
 */
export function extractLogicFromHtml($: cheerio.CheerioAPI, rawHtml: string): ExtractedLogic {
  const stateVariables = new Set<string>();
  const eventHandlers = new Set<string>();
  const interactiveElements = new Set<string>();
  const apiEndpoints = new Set<string>();
  const formActions = new Set<string>();
  const extractedForms: ExtractedForm[] = [];

  // 1. Detect Frameworks
  const frameworks = detectFrameworks($, rawHtml);

  // 2. Extract interactive elements & event handlers
  $("[onclick], [onchange], [onsubmit], [onkeydown], [onkeyup], [oninput]").each((_, el) => {
    const attrs = (el as any).attribs || {};
    for (const [key, val] of Object.entries(attrs)) {
      if (key.startsWith("on") && typeof val === "string") {
        eventHandlers.add(`${key}: ${val.slice(0, 60)}`);
      }
    }
  });

  // Buttons & ARIA interactive components
  $("button, [role='button'], a[role='button']").each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    const type = $(el).attr("type") || "button";
    if (text && text.length < 50) {
      interactiveElements.add(`Button: "${text}" (${type})`);
    }
  });

  $(
    "[role='tab'], [role='dialog'], [role='menuitem'], [role='switch'], [role='accordion'], [role='navigation'], [role='banner']"
  ).each((_, el) => {
    const role = $(el).attr("role");
    const text = $(el).text().trim().replace(/\s+/g, " ").slice(0, 40);
    interactiveElements.add(`${role} landmark: "${text}"`);
  });

  // Forms, inputs, and deep validation rules
  $("form").each((_, form) => {
    const action = $(form).attr("action") || "";
    const method = ($(form).attr("method") || "GET").toUpperCase();
    if (action) formActions.add(`${method} ${action}`);

    const fields: ExtractedFormField[] = [];
    $(form)
      .find("input, select, textarea")
      .each((_, input) => {
        const name = $(input).attr("name") || $(input).attr("id") || "";
        const type = $(input).attr("type") || input.tagName.toLowerCase();
        const placeholder = $(input).attr("placeholder") || undefined;
        const required = $(input).is("[required]");
        const pattern = $(input).attr("pattern") || undefined;

        if (name) {
          stateVariables.add(`${name} [${type}]${required ? " (required)" : ""}`);
          fields.push({
            name,
            type,
            required,
            placeholder,
            pattern,
          });
        }
      });

    if (action || fields.length > 0) {
      extractedForms.push({
        action: action || "client-side-handler",
        method,
        fields,
      });
    }
  });

  // 3. Scan script tags for state, API fetch calls, Next.js / Nuxt / Vue initial state
  $("script").each((_, el) => {
    const content = $(el).text();
    const type = $(el).attr("type") || "";

    // Next.js Pages router data
    if ($(el).attr("id") === "__NEXT_DATA__") {
      try {
        const nextData = JSON.parse(content);
        if (nextData?.page) stateVariables.add(`NextPage: ${nextData.page}`);
        if (nextData?.buildId) stateVariables.add(`NextBuildId: ${nextData.buildId}`);
        if (nextData?.query) {
          for (const q of Object.keys(nextData.query)) {
            stateVariables.add(`query.${q}`);
          }
        }
      } catch {}
    }

    // Next.js App Router RSC streaming flight data
    if (content.includes("self.__next_f.push")) {
      try {
        const rscMatches = content.matchAll(/self\.__next_f\.push\(\[1,\s*"([^"]+)"\]\)/g);
        for (const rm of rscMatches) {
          const chunk = rm[1];
          if (chunk.includes("/api/")) {
            const apiMatch = chunk.match(/\/api\/[a-zA-Z0-9_\-\/]+/);
            if (apiMatch) apiEndpoints.add(apiMatch[0]);
          }
        }
      } catch {}
    }

    // JSON-LD schema
    if (type.includes("json+ld") || type.includes("ld+json")) {
      try {
        const ld = JSON.parse(content);
        if (ld?.["@type"]) interactiveElements.add(`Schema.org Type: ${ld["@type"]}`);
      } catch {}
    }

    // Scan for fetch / axios calls
    const fetchMatches = content.matchAll(
      /(?:fetch|axios\.(?:get|post|put|delete))\s*\(\s*['"`]([^'"`]+)['"`]/g
    );
    for (const m of fetchMatches) {
      if (m[1] && !m[1].startsWith("data:") && !m[1].includes(".js") && !m[1].includes(".css")) {
        apiEndpoints.add(m[1]);
      }
    }

    // Scan for React useState or state keys
    const stateMatches = content.matchAll(
      /(?:const|let|var)\s*\[\s*([a-zA-Z0-9_]+)\s*,\s*set[a-zA-Z0-9_]+\s*\]/g
    );
    for (const sm of stateMatches) {
      stateVariables.add(sm[1]);
    }
  });

  return {
    stateVariables: Array.from(stateVariables).slice(0, 25),
    eventHandlers: Array.from(eventHandlers).slice(0, 15),
    interactiveElements: Array.from(new Set(interactiveElements)).slice(0, 25),
    apiEndpoints: Array.from(apiEndpoints).slice(0, 20),
    formActions: Array.from(formActions).slice(0, 10),
    forms: extractedForms.slice(0, 8),
    frameworks,
    rawLogicSummary: `Identified ${interactiveElements.size} interactive controls, ${stateVariables.size} state variables, and ${apiEndpoints.size} API endpoints.`,
  };
}

/**
 * Extract and score internal links within the same hostname
 */
export function extractInternalLinks($: cheerio.CheerioAPI, baseUrl: string): string[] {
  let baseOrigin: string;
  let baseHostname: string;
  try {
    const baseParsed = new URL(baseUrl);
    baseOrigin = baseParsed.origin;
    baseHostname = baseParsed.hostname;
  } catch {
    return [];
  }

  const seen = new Set<string>();
  const scoredLinks: Array<{ url: string; score: number }> = [];

  const ignoredExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".tar",
    ".gz",
    ".rar",
    ".7z",
    ".mp3",
    ".mp4",
    ".mov",
    ".avi",
    ".webm",
    ".css",
    ".js",
    ".map",
    ".json",
    ".xml",
    ".rss",
    ".woff",
    ".woff2",
    ".ttf",
  ];

  $("a[href]").each((_, el) => {
    const rawHref = $(el).attr("href")?.trim();
    if (!rawHref) return;

    if (
      rawHref.startsWith("#") ||
      rawHref.startsWith("mailto:") ||
      rawHref.startsWith("tel:") ||
      rawHref.startsWith("javascript:") ||
      rawHref.startsWith("data:")
    ) {
      return;
    }

    try {
      const resolved = new URL(rawHref, baseUrl);

      // Must share same hostname or origin
      if (resolved.origin !== baseOrigin && resolved.hostname !== baseHostname) {
        return;
      }

      // Strip hash and tracking params
      resolved.hash = "";
      const searchParams = new URLSearchParams(resolved.search);
      for (const key of Array.from(searchParams.keys())) {
        if (key.startsWith("utm_") || key === "ref" || key === "source" || key === "fbclid") {
          searchParams.delete(key);
        }
      }
      resolved.search = searchParams.toString() ? `?${searchParams.toString()}` : "";

      // Normalize trailing slash
      let cleanUrl = resolved.toString();
      if (cleanUrl.endsWith("/") && resolved.pathname !== "/") {
        cleanUrl = cleanUrl.slice(0, -1);
      }

      // Ignore static assets
      const pathname = resolved.pathname.toLowerCase();
      if (ignoredExtensions.some((ext) => pathname.endsWith(ext))) {
        return;
      }

      if (cleanUrl === baseUrl || seen.has(cleanUrl)) return;
      seen.add(cleanUrl);

      let score = 0;

      // Prioritize documentation, guides, APIs, components, features
      if (
        /(?:docs|doc|documentation|guide|tutorial|learn|reference|api|spec|components|sdk)/i.test(
          pathname
        )
      ) {
        score += 15;
      }
      if (/(?:features|about|overview|showcase|pricing|architecture)/i.test(pathname)) {
        score += 8;
      }
      if (
        /(?:getting-started|quickstart|installation|introduction|concepts)/i.test(
          pathname
        )
      ) {
        score += 12;
      }

      // Deprioritize auth, legal, search
      if (/(?:login|signin|signup|register|auth|logout|cart|checkout)/i.test(pathname)) {
        score -= 20;
      }
      if (/(?:privacy|terms|cookie|disclaimer|license|copyright|legal)/i.test(pathname)) {
        score -= 10;
      }
      if (/(?:search|tag|category|archive|feed)/i.test(pathname)) {
        score -= 5;
      }

      scoredLinks.push({ url: cleanUrl, score });
    } catch {}
  });

  // Sort descending by score
  scoredLinks.sort((a, b) => b.score - a.score);
  return scoredLinks.map((l) => l.url);
}

/**
 * Scrapes a single page and extracts its content, styles, and logic
 */
export async function scrapeSinglePage(
  url: string,
  options: { fetchExternalCss?: boolean } = {}
): Promise<ScrapeResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 SkillForge/2.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    },
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: HTTP ${response.status} (${response.statusText})`);
  }

  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();

  // If raw JSON API endpoint
  if (
    contentType.includes("application/json") ||
    rawText.trim().startsWith("{") ||
    rawText.trim().startsWith("[")
  ) {
    try {
      const parsedJson = JSON.parse(rawText);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      return {
        markdown: `# API Endpoint Response\n\nURL: \`${url}\`\n\n\`\`\`json\n${formattedJson.slice(0, 8000)}\n\`\`\``,
        title: `API Endpoint: ${new URL(url).pathname}`,
        description: "REST JSON API endpoint",
        source: "raw_json",
        targetUrl: url,
        styles: {
          colors: ["#09090b", "#38bdf8", "#f4f4f5"],
          fonts: ["ui-monospace", "monospace"],
          cssVariables: {},
          tailwindClasses: ["font-mono", "bg-zinc-950", "text-zinc-100", "p-4", "rounded-xl"],
          layoutPatterns: ["JSON Data Inspector"],
          rawStylesSummary: "Clean developer-friendly JSON code viewer layout",
        },
        logic: {
          stateVariables: ["data", "isLoading", "error"],
          eventHandlers: ["onRefresh()", "onCopy()"],
          interactiveElements: ["JSON Viewer", "Copy Payload Button"],
          apiEndpoints: [url],
          formActions: [],
          rawLogicSummary: "Fetches JSON data with GET and displays parsed keys",
        },
        statusCode: response.status,
        wordCount: formattedJson.split(/\s+/).length,
      };
    } catch {}
  }

  // Parse HTML DOM with Cheerio
  const $ = cheerio.load(rawText);

  const pageTitle =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text().trim() ||
    url;

  const pageDescription =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";

  // Optionally fetch external CSS stylesheets for deeper style extraction
  let externalCss = "";
  if (options.fetchExternalCss) {
    externalCss = await fetchExternalStylesheets($, url, 3);
  }

  // Extract styles and logic
  const styles = extractStylesFromHtml($, rawText, externalCss);
  const logic = extractLogicFromHtml($, rawText);

  // Readability for clean article / markdown text
  let readableHtml = "";
  try {
    const dom = new JSDOM(rawText, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    if (article && article.content && article.content.length > 200) {
      readableHtml = article.content;
    }
  } catch (err) {
    console.warn("Readability parsing error, falling back to Cheerio:", err);
  }

  const turndown = createTurndownService();
  let markdown = "";
  let source: "local_readability" | "local_cheerio" = "local_readability";

  if (readableHtml) {
    markdown = turndown.turndown(readableHtml);
  } else {
    source = "local_cheerio";
    $(
      "script, style, noscript, iframe, svg, nav, footer, header, [role='banner'], [role='navigation']"
    ).remove();
    const mainContent = $("main, article, #content, .content, body").first().html() || "";
    markdown = turndown.turndown(mainContent);
  }

  let enrichedMarkdown = `# ${pageTitle}\n\n`;
  enrichedMarkdown += `**Source URL**: ${url}\n`;
  if (pageDescription) {
    enrichedMarkdown += `**Description**: ${pageDescription}\n\n`;
  }
  enrichedMarkdown += `\n---\n\n${markdown}`;

  return {
    markdown: enrichedMarkdown,
    title: pageTitle,
    description: pageDescription,
    source,
    targetUrl: url,
    styles,
    logic,
    statusCode: response.status,
    wordCount: enrichedMarkdown.split(/\s+/).length,
    rawHtml: rawText,
  };
}

/**
 * Local resilient scraper that extracts both visual styles and interactive logic
 */
export async function scrapeLocal(
  url: string,
  fetchExternalCss: boolean = true
): Promise<ScrapeResult> {
  return await scrapeSinglePage(url, { fetchExternalCss });
}

/**
 * Scrapes target URL using Firecrawl API
 */
async function scrapeWithFirecrawl(
  url: string,
  apiKey: string
): Promise<ScrapeResult | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html"],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) return null;

    const data = await response.json();
    const markdown = data?.data?.markdown || data?.markdown || "";
    const html = data?.data?.html || data?.html || "";
    const title = data?.data?.metadata?.title || data?.metadata?.title || url;
    const description = data?.data?.metadata?.description || data?.metadata?.description;

    if (!markdown && !html) return null;

    const $ = cheerio.load(html || "<div></div>");
    const externalCss = await fetchExternalStylesheets($, url, 2);
    const styles = extractStylesFromHtml($, html, externalCss);
    const logic = extractLogicFromHtml($, html);

    return {
      markdown: markdown || title,
      title,
      description,
      source: "firecrawl",
      targetUrl: url,
      styles,
      logic,
      statusCode: response.status,
      wordCount: markdown.split(/\s+/).length,
      rawHtml: html,
    };
  } catch {
    return null;
  }
}

/**
 * BFS Deep Crawler that discovers internal routes and aggregates multi-page architecture
 */
export async function crawlWebsite(
  rootUrl: string,
  options: CrawlOptions = {}
): Promise<ScrapeResult> {
  const crawlDepth = options.crawlDepth ?? 1;
  const maxPages = Math.min(Math.max(options.maxPages ?? 5, 1), 10);
  const fetchExternalCss = options.fetchExternalCss ?? true;
  const onProgress = options.onProgress;

  const queue: Array<{ url: string; depth: number }> = [{ url: rootUrl, depth: 0 }];
  const visited = new Set<string>();
  const crawledPages: Array<{
    url: string;
    title: string;
    description?: string;
    depth: number;
    wordCount: number;
    statusCode?: number;
    markdown: string;
    styles: ExtractedStyles;
    logic: ExtractedLogic;
  }> = [];

  let rootResult: ScrapeResult | null = null;

  while (queue.length > 0 && crawledPages.length < maxPages) {
    const current = queue.shift()!;
    if (visited.has(current.url)) continue;
    visited.add(current.url);

    if (onProgress) {
      await onProgress({
        current: crawledPages.length + 1,
        total: Math.min(queue.length + crawledPages.length + 1, maxPages),
        currentUrl: current.url,
        stage:
          current.depth === 0
            ? "Scraping root landing page..."
            : `Deep crawling sub-page (depth ${current.depth}): ${new URL(current.url).pathname}`,
      });
    }

    try {
      const pageResult = await scrapeSinglePage(current.url, {
        fetchExternalCss: current.depth === 0 && fetchExternalCss,
      });

      if (current.depth === 0) {
        rootResult = pageResult;
      }

      crawledPages.push({
        url: current.url,
        title: pageResult.title,
        description: pageResult.description,
        depth: current.depth,
        wordCount: pageResult.wordCount || 0,
        statusCode: pageResult.statusCode,
        markdown: pageResult.markdown,
        styles: pageResult.styles,
        logic: pageResult.logic,
      });

      // If we can go deeper, extract internal links
      if (current.depth < crawlDepth && crawledPages.length < maxPages) {
        const $ = cheerio.load(pageResult.rawHtml || "");
        const discovered = extractInternalLinks($, current.url);
        for (const nextUrl of discovered) {
          if (!visited.has(nextUrl) && !queue.some((q) => q.url === nextUrl)) {
            queue.push({ url: nextUrl, depth: current.depth + 1 });
          }
        }
      }
    } catch (err: any) {
      console.warn(`Failed to crawl sub-page ${current.url}:`, err.message);
    }
  }

  // If rootResult was not created (e.g. error on root), throw
  if (!rootResult) {
    throw new Error(`Failed to crawl root target URL: ${rootUrl}`);
  }

  // If only 1 page was successfully crawled, return root result
  if (crawledPages.length <= 1) {
    return {
      ...rootResult,
      crawledPages: [
        {
          url: rootResult.targetUrl,
          title: rootResult.title,
          depth: 0,
          wordCount: rootResult.wordCount || 0,
          statusCode: rootResult.statusCode,
        },
      ],
      totalCrawledCount: 1,
    };
  }

  // Aggregate styles and logic across all crawled pages
  const allColors = new Set<string>();
  const allFonts = new Set<string>();
  const allCssVars: Record<string, string> = {};
  const allTailwind = new Set<string>();
  const allLayouts = new Set<string>();
  const allAnimations = new Set<string>();
  const allShadows = new Set<string>();
  const allRadii = new Set<string>();
  const allMediaQueries = new Set<string>();

  const allStateVars = new Set<string>();
  const allEventHandlers = new Set<string>();
  const allInteractiveElements = new Set<string>();
  const allApiEndpoints = new Set<string>();
  const allFormActions = new Set<string>();
  const allForms: ExtractedForm[] = [];
  const allFrameworks = new Set<string>();
  const allNavigationRoutes = new Set<string>();

  for (const page of crawledPages) {
    allNavigationRoutes.add(page.url);

    // Styles
    page.styles.colors.forEach((c) => allColors.add(c));
    page.styles.fonts.forEach((f) => allFonts.add(f));
    Object.assign(allCssVars, page.styles.cssVariables);
    page.styles.tailwindClasses.forEach((tc) => allTailwind.add(tc));
    page.styles.layoutPatterns.forEach((lp) => allLayouts.add(lp));
    page.styles.animations?.forEach((a) => allAnimations.add(a));
    page.styles.shadows?.forEach((s) => allShadows.add(s));
    page.styles.radii?.forEach((r) => allRadii.add(r));
    page.styles.mediaQueries?.forEach((m) => allMediaQueries.add(m));

    // Logic
    page.logic.stateVariables.forEach((sv) => allStateVars.add(sv));
    page.logic.eventHandlers.forEach((eh) => allEventHandlers.add(eh));
    page.logic.interactiveElements.forEach((ie) => allInteractiveElements.add(ie));
    page.logic.apiEndpoints.forEach((ae) => allApiEndpoints.add(ae));
    page.logic.formActions.forEach((fa) => allFormActions.add(fa));
    page.logic.forms?.forEach((f) => allForms.push(f));
    page.logic.frameworks?.forEach((fw) => allFrameworks.add(fw));
  }

  // Build aggregated hierarchical Markdown
  let aggregatedMarkdown = `# ${rootResult.title}\n\n`;
  aggregatedMarkdown += `**Root Source URL**: ${rootUrl}\n`;
  if (rootResult.description) {
    aggregatedMarkdown += `**Description**: ${rootResult.description}\n\n`;
  }
  aggregatedMarkdown += `> **Deep Crawl Summary**: Successfully explored **${crawledPages.length} pages** across the site (Crawl Depth: ${crawlDepth}).\n\n`;

  // Site architecture / Table of Routes
  aggregatedMarkdown += `### Discovered Site Architecture & Crawled Pages\n`;
  aggregatedMarkdown += `| Page Title | Route / URL | Depth | Words |\n| :--- | :--- | :---: | :---: |\n`;
  for (const p of crawledPages) {
    try {
      const parsed = new URL(p.url);
      const displayPath = parsed.pathname || "/";
      aggregatedMarkdown += `| ${p.title.replace(/\|/g, "\\|")} | [\`${displayPath}\`](${p.url}) | ${p.depth} | ${p.wordCount} |\n`;
    } catch {
      aggregatedMarkdown += `| ${p.title} | ${p.url} | ${p.depth} | ${p.wordCount} |\n`;
    }
  }
  aggregatedMarkdown += `\n---\n\n`;

  // Root content
  aggregatedMarkdown += `## 1. Primary Landing Page Content\n\n${rootResult.markdown.replace(/^#\s+[^\n]+\n+/, "")}\n\n`;

  // Sub-pages content
  for (let i = 1; i < crawledPages.length; i++) {
    const sub = crawledPages[i];
    aggregatedMarkdown += `\n---\n\n## ${i + 1}. Sub-Page: ${sub.title}\n`;
    aggregatedMarkdown += `> **URL**: [${sub.url}](${sub.url}) | **Depth**: ${sub.depth}\n\n`;
    aggregatedMarkdown += `${sub.markdown.replace(/^#\s+[^\n]+\n+/, "")}\n`;
  }

  const mergedStyles: ExtractedStyles = {
    colors: Array.from(allColors).slice(0, 30),
    fonts: Array.from(allFonts).slice(0, 12),
    cssVariables: allCssVars,
    tailwindClasses: Array.from(allTailwind).slice(0, 60),
    layoutPatterns: Array.from(allLayouts),
    animations: Array.from(allAnimations).slice(0, 15),
    shadows: Array.from(allShadows).slice(0, 10),
    radii: Array.from(allRadii).slice(0, 10),
    mediaQueries: Array.from(allMediaQueries).slice(0, 10),
    rawStylesSummary: `Extracted ${allColors.size} color tokens, ${Object.keys(allCssVars).length} CSS variables, and ${allTailwind.size} utility classes across ${crawledPages.length} crawled pages.`,
  };

  const mergedLogic: ExtractedLogic = {
    stateVariables: Array.from(allStateVars).slice(0, 30),
    eventHandlers: Array.from(allEventHandlers).slice(0, 20),
    interactiveElements: Array.from(allInteractiveElements).slice(0, 30),
    apiEndpoints: Array.from(allApiEndpoints).slice(0, 25),
    formActions: Array.from(allFormActions).slice(0, 15),
    forms: allForms.slice(0, 10),
    frameworks: Array.from(allFrameworks),
    navigationRoutes: Array.from(allNavigationRoutes),
    rawLogicSummary: `Identified ${allInteractiveElements.size} interactive controls, ${allStateVars.size} state variables, ${allApiEndpoints.size} API endpoints, and ${allForms.length} forms across ${crawledPages.length} crawled pages.`,
  };

  return {
    markdown: aggregatedMarkdown,
    title: rootResult.title,
    description: rootResult.description,
    source: rootResult.source,
    targetUrl: rootUrl,
    styles: mergedStyles,
    logic: mergedLogic,
    statusCode: rootResult.statusCode,
    wordCount: aggregatedMarkdown.split(/\s+/).length,
    crawledPages: crawledPages.map((p) => ({
      url: p.url,
      title: p.title,
      depth: p.depth,
      wordCount: p.wordCount,
      statusCode: p.statusCode,
    })),
    totalCrawledCount: crawledPages.length,
    rawHtml: rootResult.rawHtml,
  };
}

/**
 * Scrapes target URL using Firecrawl if available, otherwise local scraper or BFS deep crawler
 */
export async function scrapeTargetUrl(
  url: string,
  firecrawlApiKey?: string,
  options: CrawlOptions = {}
): Promise<ScrapeResult> {
  try {
    new URL(url);
  } catch {
    throw new Error(`Invalid URL format: "${url}". Please include http:// or https://.`);
  }

  // If deep crawl is requested (depth > 0)
  if ((options.crawlDepth ?? 0) > 0) {
    return await crawlWebsite(url, options);
  }

  // Single page mode with Firecrawl if API key provided
  if (firecrawlApiKey && firecrawlApiKey.trim().length > 0) {
    const firecrawlResult = await scrapeWithFirecrawl(url, firecrawlApiKey.trim());
    if (firecrawlResult) {
      return firecrawlResult;
    }
  }

  // Local single page scraper
  return await scrapeLocal(url, options.fetchExternalCss ?? true);
}
