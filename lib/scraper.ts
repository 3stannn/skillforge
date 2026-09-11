import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { ExtractedStyles, ExtractedLogic } from "./types";

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

  turndown.addRule("preserveCode", {
    filter: ["pre", "code"],
    replacement: (content, node) => {
      const element = node as HTMLElement;
      const lang = element.getAttribute("class")?.match(/language-(\w+)/)?.[1] || "";
      if (node.nodeName === "PRE") {
        return `\n\`\`\`${lang}\n${element.textContent?.trim() || ""}\n\`\`\`\n`;
      }
      return `\`${element.textContent || ""}\``;
    },
  });

  turndown.addRule("cleanTables", {
    filter: ["table"],
    replacement: (content, node) => {
      const $ = cheerio.load((node as HTMLElement).outerHTML);
      const rows: string[] = [];
      $("tr").each((_, tr) => {
        const cells: string[] = [];
        $(tr).find("th, td").each((_, cell) => {
          cells.push($(cell).text().trim().replace(/\|/g, "\\|"));
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

  return turndown;
}

/**
 * Extracts CSS tokens, colors, fonts, CSS variables, and Tailwind utility classes
 */
export function extractStylesFromHtml($: cheerio.CheerioAPI, rawHtml: string): ExtractedStyles {
  const colorSet = new Set<string>();
  const fontSet = new Set<string>();
  const cssVariables: Record<string, string> = {};
  const tailwindClassSet = new Set<string>();
  const layoutPatterns = new Set<string>();

  // 1. Extract from all <style> tags and inline style attributes
  const styleContents: string[] = [];
  $("style").each((_, el) => {
    styleContents.push($(el).text());
  });

  $("[style]").each((_, el) => {
    const inline = $(el).attr("style");
    if (inline) styleContents.push(inline);
  });

  const combinedStyles = styleContents.join("\n");

  // Regex for CSS variables: --primary-color: #3b82f6;
  const varMatches = combinedStyles.matchAll(/--([a-zA-Z0-9_-]+)\s*:\s*([^;}\n]+)/g);
  for (const m of varMatches) {
    const varName = `--${m[1].trim()}`;
    const varValue = m[2].trim();
    cssVariables[varName] = varValue;

    // Check if variable value is a color
    if (/^#(?:[0-9a-fA-F]{3,8})\b|^(?:rgb|hsl)a?\(/i.test(varValue)) {
      colorSet.add(varValue);
    }
  }

  // Regex for Hex colors (#fff, #1a202c, etc.)
  const hexMatches = (rawHtml + combinedStyles).match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g);
  if (hexMatches) {
    for (const hex of hexMatches.slice(0, 30)) {
      colorSet.add(hex.toLowerCase());
    }
  }

  // Regex for rgb/hsl colors
  const rgbMatches = (rawHtml + combinedStyles).match(/(?:rgb|hsl)a?\([^)]+\)/gi);
  if (rgbMatches) {
    for (const c of rgbMatches.slice(0, 15)) {
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

  // 2. Scan class attributes for Tailwind & layout utility classes
  $("[class]").each((_, el) => {
    const clsAttr = $(el).attr("class") || "";
    const classes = clsAttr.split(/\s+/).filter(Boolean);

    for (const c of classes) {
      if (
        /^(?:bg-|text-|border-|ring-|shadow-|rounded-|p-|px-|py-|m-|mx-|my-|w-|h-|max-w-|gap-|grid-|flex-|items-|justify-|hover:|dark:|focus:|transition-|animate-|font-|backdrop-)/.test(
          c
        )
      ) {
        tailwindClassSet.add(c);
      }

      if (c === "flex" || c.startsWith("flex-")) layoutPatterns.add("Flexbox Layout");
      if (c === "grid" || c.startsWith("grid-cols-")) layoutPatterns.add("CSS Grid System");
      if (c.includes("sticky") || c.includes("fixed")) layoutPatterns.add("Fixed/Sticky Positioning");
      if (c.includes("backdrop-blur") || c.includes("bg-opacity")) layoutPatterns.add("Glassmorphism Effect");
      if (c.includes("dark:")) layoutPatterns.add("Dark Mode Styling");
      if (c.includes("rounded-xl") || c.includes("rounded-2xl") || c.includes("rounded-full")) layoutPatterns.add("Modern Rounded Cards");
    }
  });

  return {
    colors: Array.from(colorSet).slice(0, 20),
    fonts: Array.from(fontSet).slice(0, 10),
    cssVariables,
    tailwindClasses: Array.from(tailwindClassSet).slice(0, 50),
    layoutPatterns: Array.from(layoutPatterns),
    rawStylesSummary: `Extracted ${colorSet.size} color tokens, ${Object.keys(cssVariables).length} CSS variables, and ${tailwindClassSet.size} utility classes.`,
  };
}

/**
 * Extracts JavaScript interaction logic, event handlers, scripts, forms, and state variables
 */
export function extractLogicFromHtml($: cheerio.CheerioAPI, rawHtml: string): ExtractedLogic {
  const stateVariables = new Set<string>();
  const eventHandlers = new Set<string>();
  const interactiveElements = new Set<string>();
  const apiEndpoints = new Set<string>();
  const formActions = new Set<string>();

  // 1. Extract interactive elements & event handlers
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

  $("[role='tab'], [role='dialog'], [role='menuitem'], [role='switch'], [role='accordion']").each((_, el) => {
    const role = $(el).attr("role");
    const text = $(el).text().trim().replace(/\s+/g, " ").slice(0, 40);
    interactiveElements.add(`${role} element: "${text}"`);
  });

  // Forms, inputs, and validation rules
  $("form").each((_, form) => {
    const action = $(form).attr("action") || "";
    const method = ($(form).attr("method") || "GET").toUpperCase();
    if (action) formActions.add(`${method} ${action}`);

    $(form)
      .find("input, select, textarea")
      .each((_, input) => {
        const name = $(input).attr("name") || $(input).attr("id") || "";
        const type = $(input).attr("type") || "text";
        const placeholder = $(input).attr("placeholder") || "";
        const required = $(input).is("[required]") ? " (required)" : "";
        if (name) {
          stateVariables.add(`${name} [${type}]${required}`);
        }
      });
  });

  // 2. Scan script tags for state, API fetch calls, Next.js / Nuxt / Vue initial state
  $("script").each((_, el) => {
    const content = $(el).text();
    const type = $(el).attr("type") || "";

    // Next.js data
    if ($(el).attr("id") === "__NEXT_DATA__") {
      try {
        const nextData = JSON.parse(content);
        if (nextData?.page) stateVariables.add(`NextPage: ${nextData.page}`);
        if (nextData?.query) {
          for (const q of Object.keys(nextData.query)) {
            stateVariables.add(`query.${q}`);
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
    const fetchMatches = content.matchAll(/(?:fetch|axios\.(?:get|post|put|delete))\s*\(\s*['"`]([^'"`]+)['"`]/g);
    for (const m of fetchMatches) {
      if (m[1] && !m[1].startsWith("data:")) {
        apiEndpoints.add(m[1]);
      }
    }

    // Scan for React useState or state keys
    const stateMatches = content.matchAll(/(?:const|let|var)\s*\[\s*([a-zA-Z0-9_]+)\s*,\s*set[a-zA-Z0-9_]+\s*\]/g);
    for (const sm of stateMatches) {
      stateVariables.add(sm[1]);
    }
  });

  return {
    stateVariables: Array.from(stateVariables).slice(0, 20),
    eventHandlers: Array.from(eventHandlers).slice(0, 15),
    interactiveElements: Array.from(new Set(interactiveElements)).slice(0, 20),
    apiEndpoints: Array.from(apiEndpoints).slice(0, 15),
    formActions: Array.from(formActions).slice(0, 10),
    rawLogicSummary: `Identified ${interactiveElements.size} interactive controls, ${stateVariables.size} state variables, and ${apiEndpoints.size} API endpoints.`,
  };
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
    const styles = extractStylesFromHtml($, html);
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
    };
  } catch {
    return null;
  }
}

/**
 * Local resilient scraper that extracts both visual styles and interactive logic
 */
export async function scrapeLocal(url: string): Promise<ScrapeResult> {
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
  if (contentType.includes("application/json") || rawText.trim().startsWith("{") || rawText.trim().startsWith("[")) {
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

  // Extract styles and logic before stripping elements
  const styles = extractStylesFromHtml($, rawText);
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
  };
}

/**
 * Scrapes target URL using Firecrawl if available, otherwise local scraper
 */
export async function scrapeTargetUrl(
  url: string,
  firecrawlApiKey?: string
): Promise<ScrapeResult> {
  try {
    new URL(url);
  } catch {
    throw new Error(`Invalid URL format: "${url}". Please include http:// or https://.`);
  }

  if (firecrawlApiKey && firecrawlApiKey.trim().length > 0) {
    const firecrawlResult = await scrapeWithFirecrawl(url, firecrawlApiKey.trim());
    if (firecrawlResult) {
      return firecrawlResult;
    }
  }

  return await scrapeLocal(url);
}
