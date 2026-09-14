import { Groq } from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import {
  DesignSystemData,
  SemanticColorToken,
  TypographyScaleItem,
  ModelPrompts,
} from "./types";
import { ScrapeResult } from "./scraper";

const SYSTEM_PROMPT = `You are a world-class Design Systems Architect and Lead Frontend Systems Engineer.
Analyze the provided scraped webpage styles, layout tokens, DOM structure, and markdown.
Formulate an authoritative, production-grade "DESIGN.md" specification following the Google Stitch and DesignMD Style Reference standard, plus matching code tokens (Tailwind v4/v3, CSS variables, W3C design tokens JSON, and interactive React specimen components).

Rules:
1. Produce a clean identifier name (snake_case, 3-64 chars) matching ^[a-z0-9_]+$.
2. Formulate an aestheticSummary describing the site's design archetype concisely without generic purple/violet AI-slop cliches.
3. Extract and organize Semantic Colors into a comprehensive palette (Obsidian Canvas, Void, Charcoal Card, Slate Edge, Iron Veil, Smoke, Ash, Frost, Linen, Snow, Electric Iris, Ember Pulse, Molasses).
4. Extract Typography scale (caption, body, body-lg, subheading, heading-sm, heading, display-sm, display) with sizes in px, line-heights, weights, and letter-spacing.
5. Formulate a complete, spec-compliant "DESIGN.md" markdown document matching the exact Style Reference structure:
   - # [Brand] - Style Reference
   - > [Poetic description]
   - **Theme:** mixed (or dark / light)
   - [Detailed atmosphere & design overview paragraph]
   - ## Tokens - Colors (Markdown table: Name | Value | Token | Role)
   - ## Tokens - Typography (Font breakdown with Substitutes, Weights, Sizes, Line height, Letter spacing, Role, plus ### Type Scale table)
   - ## Tokens - Spacing & Shapes (Base unit 4px, Density comfortable, Spacing Scale table, Border Radius table with Concentric Border Radius Rule Outer R = Inner R + Padding, Shadows table, Layout specs)
   - ## Components (Primary Pill Button, Ghost Pill Button, White Pill Button, Feature Card, MetaBrain Card, Product Screenshot Frame, Top Navigation Bar, Aurora Hero Background, Tag/Chip, Stat Counter, Light Section Band, Kanban Board Preview, Inbox/Chat Panel)
   - ## Do's and Don'ts (### Do and ### Don't)
   - ## Surfaces (| Level | Name | Value | Purpose |)
   - ## Elevation (bullet list of exact shadows)
   - ## Imagery
   - ## Layout
   - ## Agent Prompt Guide (primary action, Quick Color Reference, Example Component Prompts)
   - ## Gradient System
   - ## Similar Brands (Linear, Vercel, Arc Browser, Resend, Stripe)
   - ## Quick Start (### CSS Custom Properties and ### Tailwind v4)
   - CRITICAL ANTI-SLOP RULE: ZERO EM-DASHES ( - ) OR EN-DASHES (-) ANYWHERE IN THE DOCUMENT. Use regular hyphens (-), colons (:), or periods. The em-dash is strictly forbidden.
6. Generate clean CSS Custom Properties (:root { ... }) and Tailwind v4 theme (@theme { ... }).
7. Construct a standalone React + Tailwind specimen TSX component ("componentCode") rendering live interactive buttons, inputs, cards, and swatches.
8. Formulate tailored AI prompt rules for Cursor (.cursorrules), Claude (CLAUDE.md), Gemini, and ChatGPT.

You MUST return ONLY a valid JSON object with this exact structure:
{
  "name": "snake_case_name",
  "title": "Human Readable Title",
  "description": "Tagline or short description of the design system",
  "aestheticSummary": "e.g. Aurora through a midnight observatory...",
  "designMd": "# Full DESIGN.md Style Reference text...",
  "primaryFont": "Inter, sans-serif",
  "headingFont": "Esbuild, sans-serif",
  "monoFont": "JetBrains Mono, monospace",
  "semanticColors": [
    { "role": "background", "name": "Obsidian Canvas", "hex": "#303236", "usage": "Page background, dominant surface" },
    { "role": "deep", "name": "Void", "hex": "#090a0c", "usage": "Deepest surface layer for hero gradients" },
    { "role": "surface", "name": "Charcoal Card", "hex": "#111111", "usage": "Elevated card and panel surfaces" },
    { "role": "border", "name": "Slate Edge", "hex": "#4a4b50", "usage": "Hairline borders and dividers" },
    { "role": "primary", "name": "Electric Iris", "hex": "#5683da", "usage": "Primary action background, active nav indicator" },
    { "role": "accent", "name": "Ember Pulse", "hex": "#ff8964", "usage": "Secondary accent, hero aurora warm stop" },
    { "role": "text", "name": "Snow", "hex": "#ffffff", "usage": "Hairline borders and high-contrast text" }
  ],
  "typographyScale": [
    { "level": "caption", "size": "11px", "lineHeight": "1.38", "weight": "400", "letterSpacing": "-0.1px", "sample": "Metadata, tags & badges" },
    { "level": "body", "size": "14px", "lineHeight": "1.5", "weight": "400", "letterSpacing": "-0.14px", "sample": "All functional UI text" },
    { "level": "body-lg", "size": "16px", "lineHeight": "1.5", "weight": "500", "letterSpacing": "-0.16px", "sample": "Lead descriptions" },
    { "level": "subheading", "size": "18px", "lineHeight": "1.5", "weight": "600", "letterSpacing": "-0.36px", "sample": "Section openers" },
    { "level": "heading-sm", "size": "22px", "lineHeight": "1.25", "weight": "600", "letterSpacing": "0", "sample": "Card titles" },
    { "level": "heading", "size": "24px", "lineHeight": "1.25", "weight": "600", "letterSpacing": "-0.48px", "sample": "Section Milestones" },
    { "level": "display-sm", "size": "32px", "lineHeight": "1.0", "weight": "600", "letterSpacing": "-1.6px", "sample": "Feature Headings" },
    { "level": "display", "size": "80px", "lineHeight": "0.9", "weight": "700", "letterSpacing": "-4px", "sample": "Hero Title" }
  ],
  "spacingScale": ["4px", "8px", "12px", "16px", "20px", "24px", "28px", "32px", "36px", "40px", "64px", "160px", "180px", "240px"],
  "radiiScale": ["4px", "12px", "30px", "9999px"],
  "shadowScale": ["rgba(0, 0, 0, 0.15) 0px 4px 6px 0px", "rgba(0, 0, 0, 0.35) 0px 4px 16px 0px", "rgba(0, 0, 0, 0.5) 0px 6px 25px 0px"],
  "cssVariablesFormatted": ":root { ... }",
  "tailwindConfigFormatted": "@theme { ... }",
  "tokensJsonFormatted": "{\\"color\\": {...}}",
  "componentCode": "// Standalone React + Tailwind specimen component...",
  "modelPrompts": {
    "cursor": "...",
    "claude": "...",
    "gemini": "...",
    "chatgpt": "..."
  }
}`;

function sanitizeName(raw: string, fallback: string = "design_system"): string {
  let cleaned = (raw || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "");

  if (cleaned.length < 3) cleaned = `${cleaned}_design`;
  if (cleaned.length > 64) cleaned = cleaned.slice(0, 64).replace(/_+$/, "");
  if (!/^[a-z0-9_]+$/.test(cleaned)) cleaned = fallback;
  return cleaned;
}

/**
 * Determine luminance of a hex color to guess if it's dark or light
 */
function getLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16) / 255;
    const g = parseInt(clean[1] + clean[1], 16) / 255;
    const b = parseInt(clean[2] + clean[2], 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  return 0.5;
}

/**
 * Categorize scraped raw colors into semantic roles matching the Style Reference standard
 */
export function deriveSemanticColors(
  colors: string[],
  siteTitle: string
): SemanticColorToken[] {
  const validHexes = colors
    .filter((c) => /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c.trim()))
    .map((c) => c.trim().toLowerCase());

  const unique = Array.from(new Set(validHexes));

  // Sort by luminance
  const sorted = [...unique].sort((a, b) => getLuminance(a) - getLuminance(b));

  const darkColors = sorted.filter((c) => getLuminance(c) < 0.2);
  const lightColors = sorted.filter((c) => getLuminance(c) > 0.75);
  const midColors = sorted.filter((c) => getLuminance(c) >= 0.2 && getLuminance(c) <= 0.75);

  const isDarkCanvas = darkColors.length > 0;

  const bgHex = isDarkCanvas ? (darkColors[0] || "#303236") : (lightColors[lightColors.length - 1] || "#ffffff");
  const voidHex = isDarkCanvas ? "#090a0c" : "#f1f2f4";
  const cardHex = isDarkCanvas ? (darkColors[1] || "#111111") : (lightColors[lightColors.length - 2] || "#f8f9fa");
  const borderHex = isDarkCanvas ? (darkColors[darkColors.length - 1] || "#4a4b50") : "#d1d1d1";
  const mutedWashHex = isDarkCanvas ? "#6b6c6d" : "#e5e5e7";
  const smokeHex = midColors[0] || (isDarkCanvas ? "#95979e" : "#64748b");
  const ashHex = midColors[1] || (isDarkCanvas ? "#a9a9aa" : "#94a3b8");
  const frostHex = isDarkCanvas ? "#d1d1d1" : "#cbd5e1";
  const linenHex = isDarkCanvas ? "#e5e5e7" : "#f6f6f6";
  const snowHex = "#ffffff";

  // Vivid colors for primary and secondary accents
  const primaryHex = midColors.find((c) => {
    const lum = getLuminance(c);
    return lum > 0.15 && lum < 0.7;
  }) || (isDarkCanvas ? "#5683da" : "#2563eb");

  const accentHex = midColors.find((c) => c !== primaryHex && getLuminance(c) > 0.25) || (isDarkCanvas ? "#ff8964" : "#f97316");
  const molassesHex = isDarkCanvas ? "#5a250a" : "#431407";

  return [
    {
      role: "background",
      name: isDarkCanvas ? "Obsidian Canvas" : "Linen Canvas",
      hex: bgHex,
      usage: "Page background, dominant surface: near-black with a whisper of warmth, default stage for all content",
    },
    {
      role: "deep",
      name: isDarkCanvas ? "Void" : "Deep Substrate",
      hex: voidHex,
      usage: "Deepest surface layer for hero gradients, modal backdrops, and borders that need to disappear into the canvas",
    },
    {
      role: "surface",
      name: isDarkCanvas ? "Charcoal Card" : "Elevated Surface",
      hex: cardHex,
      usage: "Elevated card and panel surfaces sitting one step above the canvas",
    },
    {
      role: "border",
      name: isDarkCanvas ? "Slate Edge" : "Hairline Edge",
      hex: borderHex,
      usage: "Hairline borders and dividers on dark surfaces",
    },
    {
      role: "muted",
      name: "Iron Veil",
      hex: mutedWashHex,
      usage: "Muted backgrounds for tags, list-item fills, and disabled state washes",
    },
    {
      role: "secondary",
      name: "Smoke",
      hex: smokeHex,
      usage: "Icon strokes, secondary text, and inactive controls: the workhorse mid-gray",
    },
    {
      role: "tertiary",
      name: "Ash",
      hex: ashHex,
      usage: "Tertiary text and subtle body borders in content-heavy lists",
    },
    {
      role: "light-border",
      name: "Frost",
      hex: frostHex,
      usage: "Light-mode borders, input fields, and secondary CTA borders",
    },
    {
      role: "light-surface",
      name: "Linen",
      hex: linenHex,
      usage: "Light-mode surface tint and subtle section dividers in white backgrounds",
    },
    {
      role: "text",
      name: "Snow",
      hex: snowHex,
      usage: "Hairline borders, dividers, input outlines, and card edges on light surfaces. Do not promote it to primary CTA",
    },
    {
      role: "primary",
      name: "Electric Iris",
      hex: primaryHex,
      usage: "Primary action background, active nav indicator, hero cool stop: vivid and switched-on",
    },
    {
      role: "accent",
      name: "Ember Pulse",
      hex: accentHex,
      usage: "Secondary accent, hero warm stop, notification dot, illustration highlight",
    },
    {
      role: "dark-accent",
      name: "Molasses",
      hex: molassesHex,
      usage: "Deep ember tone for dark-context borders, icon strokes, and tag fills when coral would be too bright",
    },
  ];
}

/**
 * Format CSS custom properties (:root { ... }) matching the exact .agents/DESIGN.md standard
 */
export function formatCssVariables(
  semanticColors: SemanticColorToken[],
  primaryFont: string,
  monoFont: string
): string {
  const colorLines = semanticColors
    .map((c) => `  --color-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}: ${c.hex};`)
    .join("\n");

  const cleanPrimary = primaryFont.split(",")[0].replace(/['"]/g, "").trim();

  return `:root {
  /* Colors */
${colorLines}

  /* Typography: Font Families */
  --font-${cleanPrimary.toLowerCase()}: '${cleanPrimary}', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: '${monoFont.split(",")[0].replace(/['"]/g, "").trim()}', monospace;

  /* Typography: Scale */
  --text-caption: 11px;
  --leading-caption: 1.38;
  --tracking-caption: -0.1px;
  --text-body: 14px;
  --leading-body: 1.5;
  --tracking-body: -0.14px;
  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --tracking-body-lg: -0.16px;
  --text-subheading: 18px;
  --leading-subheading: 1.5;
  --tracking-subheading: -0.36px;
  --text-heading-sm: 22px;
  --leading-heading-sm: 1.25;
  --text-heading: 24px;
  --leading-heading: 1.25;
  --tracking-heading: -0.48px;
  --text-display-sm: 32px;
  --leading-display-sm: 1;
  --tracking-display-sm: -1.6px;
  --text-display: 80px;
  --leading-display: 0.9;
  --tracking-display: -4px;

  /* Typography: Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-64: 64px;
  --spacing-160: 160px;
  --spacing-180: 180px;
  --spacing-240: 240px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 96px;
  --card-padding: 24px;
  --element-gap: 12px;

  /* Border Radius */
  --radius-md: 4px;
  --radius-xl: 12px;
  --radius-3xl: 30px;
  --radius-full: 9999px;

  /* Concentric Border Radius Rule: Outer R = Inner R + Padding */
  --radius-outer-lg: 24px;
  --padding-concentric-lg: 8px;
  --radius-inner-lg: 16px;
  --radius-outer-md: 18px;
  --padding-concentric-md: 6px;
  --radius-inner-md: 12px;
  --radius-outer-sm: 12px;
  --padding-concentric-sm: 4px;
  --radius-inner-sm: 8px;

  /* Named Radii */
  --radius-tags: 9999px;
  --radius-cards: 12px;
  --radius-inputs: 4px;
  --radius-panels: 30px;
  --radius-buttons: 9999px;

  /* Shadows */
  --shadow-md: rgba(0, 0, 0, 0.35) 0px 4px 16px 0px;
  --shadow-subtle: rgba(255, 255, 255, 0.4) 0px 0px 0px 6px;
  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 4px 6px 0px;
  --shadow-xl: rgba(0, 0, 0, 0.5) 0px 6px 25px 0px;

  /* Surfaces */
  --surface-obsidian-canvas: ${semanticColors.find(c => c.role === "background")?.hex || "#303236"};
  --surface-void: ${semanticColors.find(c => c.role === "deep")?.hex || "#090a0c"};
  --surface-charcoal-card: ${semanticColors.find(c => c.role === "surface")?.hex || "#111111"};
  --surface-light-canvas: #ffffff;
  --surface-linen: #f6f6f6;
}`;
}

/**
 * Format Tailwind CSS configuration (Tailwind v4 @theme and Tailwind v3 config)
 */
export function formatTailwindConfig(
  semanticColors: SemanticColorToken[],
  primaryFont: string,
  monoFont: string
): string {
  const colorThemeLines = semanticColors
    .map((c) => `  --color-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}: ${c.hex};`)
    .join("\n");

  const cleanPrimary = primaryFont.split(",")[0].replace(/['"]/g, "").trim();

  return `/* === Tailwind CSS v4 (@theme) === */
@theme {
  /* Colors */
${colorThemeLines}

  /* Typography */
  --font-${cleanPrimary.toLowerCase()}: '${cleanPrimary}', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: '${monoFont.split(",")[0].replace(/['"]/g, "").trim()}', monospace;

  /* Typography: Scale */
  --text-caption: 11px;
  --leading-caption: 1.38;
  --tracking-caption: -0.1px;
  --text-body: 14px;
  --leading-body: 1.5;
  --tracking-body: -0.14px;
  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --tracking-body-lg: -0.16px;
  --text-subheading: 18px;
  --leading-subheading: 1.5;
  --tracking-subheading: -0.36px;
  --text-heading-sm: 22px;
  --leading-heading-sm: 1.25;
  --text-heading: 24px;
  --leading-heading: 1.25;
  --tracking-heading: -0.48px;
  --text-display-sm: 32px;
  --leading-display-sm: 1;
  --tracking-display-sm: -1.6px;
  --text-display: 80px;
  --leading-display: 0.9;
  --tracking-display: -4px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-64: 64px;
  --spacing-160: 160px;
  --spacing-180: 180px;
  --spacing-240: 240px;

  /* Border Radius */
  --radius-md: 4px;
  --radius-xl: 12px;
  --radius-3xl: 30px;
  --radius-full: 9999px;

  /* Concentric Border Radius Rule: Outer R = Inner R + Padding */
  --radius-outer-lg: 24px;
  --radius-inner-lg: 16px;
  --radius-outer-md: 18px;
  --radius-inner-md: 12px;
  --radius-outer-sm: 12px;
  --radius-inner-sm: 8px;

  /* Shadows */
  --shadow-md: rgba(0, 0, 0, 0.35) 0px 4px 16px 0px;
  --shadow-subtle: rgba(255, 255, 255, 0.4) 0px 0px 0px 6px;
  --shadow-sm: rgba(0, 0, 0, 0.15) 0px 4px 6px 0px;
  --shadow-xl: rgba(0, 0, 0, 0.5) 0px 6px 25px 0px;
}

/* === Tailwind CSS v3 (tailwind.config.js) === */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
${semanticColors.map((c) => `        "${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}": "${c.hex}",`).join("\n")}
      },
      fontFamily: {
        sans: ["${cleanPrimary}", "sans-serif"],
        mono: ["${monoFont.split(",")[0].replace(/['"]/g, "").trim()}", "monospace"],
      },
      borderRadius: {
        md: "4px",
        xl: "12px",
        "3xl": "30px",
        full: "9999px",
        "outer-lg": "24px",
        "inner-lg": "16px",
        "outer-md": "18px",
        "inner-md": "12px",
        "outer-sm": "12px",
        "inner-sm": "8px",
      },
    },
  },
};`;
}

/**
 * Format W3C standard JSON Design Tokens
 */
export function formatTokensJson(
  semanticColors: SemanticColorToken[],
  primaryFont: string,
  monoFont: string
): string {
  const colorObj: Record<string, { value: string; type: string; description: string }> = {};
  for (const c of semanticColors) {
    colorObj[c.role] = {
      value: c.hex,
      type: "color",
      description: c.usage,
    };
  }

  const tokens = {
    $schema: "https://design-tokens.github.io/community-group/format/",
    color: colorObj,
    typography: {
      fontFamily: {
        sans: { value: primaryFont, type: "fontFamily" },
        mono: { value: monoFont, type: "fontFamily" },
      },
      scale: {
        display: { size: "56px", lineHeight: "1.1", weight: "700" },
        h1: { size: "40px", lineHeight: "1.2", weight: "600" },
        h2: { size: "28px", lineHeight: "1.25", weight: "600" },
        body: { size: "16px", lineHeight: "1.5", weight: "400" },
        small: { size: "13px", lineHeight: "1.4", weight: "400" },
        code: { size: "13px", lineHeight: "1.45", weight: "400" },
      },
    },
    spacing: {
      "1": { value: "4px", type: "dimension" },
      "2": { value: "8px", type: "dimension" },
      "3": { value: "12px", type: "dimension" },
      "4": { value: "16px", type: "dimension" },
      "6": { value: "24px", type: "dimension" },
      "8": { value: "32px", type: "dimension" },
      "12": { value: "48px", type: "dimension" },
    },
    radius: {
      sm: { value: "4px", type: "dimension" },
      md: { value: "8px", type: "dimension" },
      lg: { value: "12px", type: "dimension" },
      full: { value: "9999px", type: "dimension" },
    },
    elevation: {
      sm: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", type: "shadow" },
      md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", type: "shadow" },
      lg: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", type: "shadow" },
    },
  };

  return JSON.stringify(tokens, null, 2);
}

/**
 * Builds the canonical Style Reference DESIGN.md matching .agents/DESIGN.md standard
 */
export function buildDesignMd(
  title: string,
  targetUrl: string,
  aesthetic: string,
  colors: SemanticColorToken[],
  typeScale: TypographyScaleItem[],
  primaryFont: string,
  headingFont: string,
  monoFont: string,
  crawledPages: { url: string; title: string; depth: number }[] = []
): string {
  const brandName = title.split(" - ")[0].split("-")[0].split(":")[0].trim();
  const primaryColor = colors.find((c) => c.role === "primary") || colors[0];
  const accentColor = colors.find((c) => c.role === "accent") || colors[1];
  const bg = colors.find((c) => c.role === "background") || colors[0];
  const surface = colors.find((c) => c.role === "surface") || colors[2];
  const border = colors.find((c) => c.role === "border") || colors[3];
  const voidColor = colors.find((c) => c.role === "deep") || { hex: "#090a0c", name: "Void" };
  const cleanPrimary = primaryFont.split(",")[0].replace(/['"]/g, "").trim();
  const cleanHeading = headingFont.split(",")[0].replace(/['"]/g, "").trim() || cleanPrimary;

  const colorTableRows = colors
    .map(
      (c) =>
        `| ${c.name} | \`${c.hex}\` | \`--color-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\` | ${c.usage} |`
    )
    .join("\n");

  const typeTableRows = typeScale
    .map(
      (t) =>
        `| ${t.level} | ${t.size} | ${t.lineHeight} | ${t.letterSpacing || "normal"} | \`--text-${t.level}\` |`
    )
    .join("\n");

  const cssProperties = formatCssVariables(colors, primaryFont, monoFont);
  const tailwindV4 = formatTailwindConfig(colors, primaryFont, monoFont);

  return `# ${brandName} - Style Reference
> ${aesthetic}

**Theme:** mixed

${brandName} projects a focused workspace atmosphere: near-black canvas with a single ${primaryColor.name.toLowerCase()} accent slicing through the hero, then a quieter productivity grid below. The system lives in a narrow chromatic band: one ${primaryColor.name.toLowerCase()} and one warm ${accentColor.name.toLowerCase()} do all the brand work against layered graphite surfaces. Typography is ${cleanPrimary} for functional UI, with a display face (${cleanHeading}) reserved for hero moments at 80-84px with tight tracking. Components lean pill-shaped: 9999px radii on controls, 12px on cards, minimal shadow, and hairline borders as primary decoration.

## Tokens - Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
${colorTableRows}

## Tokens - Typography

### ${cleanPrimary} - All functional UI text: body, nav, buttons, list items, captions, small headings. Used at weight 500-600 for emphasis, 400 for body, 300 sparingly for quiet metadata. · \`--font-${cleanPrimary.toLowerCase()}\`
- **Substitute:** DM Sans, IBM Plex Sans
- **Weights:** 300, 400, 500, 600, 700
- **Sizes:** 10, 11, 12, 14, 15, 16, 18, 22, 24
- **Line height:** 1.00, 1.13, 1.25, 1.38, 1.50
- **Letter spacing:** Tight: -0.04em at large sizes, -0.02em at subhead, -0.01em at body, normal at caption
- **Role:** All functional UI text: body, nav, buttons, list items, captions, small headings. Used at weight 500-600 for emphasis, 400 for body, 300 sparingly for quiet metadata.

### ${cleanHeading} - Display-only: hero headlines, section openers, feature titles. The condensed geometry and tight tracking make 84px feel editorial rather than SaaS. Never used below 28px. · \`--font-${cleanHeading.toLowerCase()}\`
- **Substitute:** Sora, General Sans
- **Weights:** 400, 500, 600
- **Sizes:** 28, 32, 80, 84
- **Line height:** 0.80, 0.90, 1.00
- **Letter spacing:** -0.05em to -0.02em, tightest at 80-84px
- **Role:** Display-only: hero headlines, section openers, feature titles. The condensed geometry and tight tracking make 84px feel editorial rather than SaaS. Never used below 28px.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
${typeTableRows}

## Tokens - Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | \`--spacing-4\` |
| 8 | 8px | \`--spacing-8\` |
| 12 | 12px | \`--spacing-12\` |
| 16 | 16px | \`--spacing-16\` |
| 20 | 20px | \`--spacing-20\` |
| 24 | 24px | \`--spacing-24\` |
| 28 | 28px | \`--spacing-28\` |
| 32 | 32px | \`--spacing-32\` |
| 36 | 36px | \`--spacing-36\` |
| 40 | 40px | \`--spacing-40\` |
| 64 | 64px | \`--spacing-64\` |
| 160 | 160px | \`--spacing-160\` |
| 180 | 180px | \`--spacing-180\` |
| 240 | 240px | \`--spacing-240\` |

### Border Radius

| Element | Value |
|---------|-------|
| tags | 9999px |
| cards | 12px |
| inputs | 4px |
| panels | 30px |
| buttons | 9999px |

#### Concentric Border Radius Rule (Nested Containers)
- **Formula:** \`Outer R = Inner R + Padding\` (or \`Inner R = max(0, Outer R - Padding)\`)
- **Principle:** When nesting rounded containers, the outer border radius MUST equal the inner border radius plus the padding between them. Setting equal radii (\`Outer R = Inner R\`) produces awkward, pinched margins at outer corners.
- **Concentric Scale Pairs:**
  - Large: Outer 24px = Inner 16px + Padding 8px (\`--radius-outer-lg\`)
  - Medium: Outer 18px = Inner 12px + Padding 6px (\`--radius-outer-md\`)
  - Small: Outer 12px = Inner 8px + Padding 4px (\`--radius-outer-sm\`)


### Shadows

| Name | Value | Token |
|------|-------|-------|
| md | \`rgba(0, 0, 0, 0.35) 0px 4px 16px 0px\` | \`--shadow-md\` |
| subtle | \`rgba(255, 255, 255, 0.4) 0px 0px 0px 6px\` | \`--shadow-subtle\` |
| sm | \`rgba(0, 0, 0, 0.15) 0px 4px 6px 0px\` | \`--shadow-sm\` |
| xl | \`rgba(0, 0, 0, 0.5) 0px 6px 25px 0px\` | \`--shadow-xl\` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 12px

## Components

### Primary Pill Button
**Role:** Hero CTA, top-level conversion

Filled ${primaryColor.hex}, white text, ${cleanPrimary} 14px weight 500, 9999px radius, 12px 24px padding. Inherits ${primaryColor.name} glow on hover. Uppercase or sentence-case tracking at -0.01em.

### Ghost Pill Button
**Role:** Secondary CTA, nav actions

Transparent background, 1px ${border.hex} border on dark surfaces, white text, ${cleanPrimary} 14px weight 500, 9999px radius, 10px 20px padding. Becomes solid white-on-charcoal on hover.

### White Pill Button
**Role:** Light-section CTA, 'See in action' hero button

Solid #ffffff fill with dark text (${voidColor.hex}), 9999px radius, 12px 24px padding. This is the hero ('SEE IN ACTION ->') and the one place white earns its weight as a foreground, not background.

### Feature Card
**Role:** Product capability cards in grids

Dark card on ${surface.hex} or gradient-tinted surface, 12px radius, 24px padding, optional 1px ${border.hex} border. Some variants carry a radial glow behind the card edge.

### MetaBrain Card
**Role:** Feature highlight in the MetaBrain section

Deep card (${voidColor.hex} base) with 12px radius, 16-20px padding, containing a ${cleanHeading} 32px heading in white. Many carry a soft radial gradient bleed in the corner (warm amber or cool iris) as the visual hook.

### Product Screenshot Frame
**Role:** In-app UI previews in the hero and feature sections

Dark UI surface (matching the real product) wrapped in a 12px radius frame with a soft black shadow (rgba(0,0,0,0.5) 0 6px 25px). Floats above the background as evidence.

### Top Navigation Bar
**Role:** Site-wide header

Transparent over the hero, sticks with a slight backdrop blur on scroll. ${brandName} logo mark on the left, ${cleanPrimary} 14px nav items in the center, 'Star Us' link + outlined 'Sign In' + filled 'Sign Up' pill on the right.

### Aurora Hero Background
**Role:** Full-bleed hero treatment

Vertical light beam on ${voidColor.hex}: linear gradient from ${primaryColor.name} (${primaryColor.hex} at ~60% opacity) through ${accentColor.name} (${accentColor.hex}) to white, painted as a narrow vertical streak. Radial sunburst glow at the base in warm amber.

### Tag/Chip
**Role:** Category labels on issue cards, filter pills

Small pill (9999px radius), 4px 10px padding, 11px ${cleanPrimary} weight 500, text colored to match category. Background is the category color at 12% opacity.

### Stat Counter
**Role:** MetaBrain date/time display

Large ${cleanHeading} numeral (80px) in white inside a 30px-radius circle, with a + button below. The oversized number in a circle is the section's visual signature.

### Light Section Band
**Role:** Alternating content sections below the dark hero

White (#ffffff) or warm linen (#f6f6f6) background, ${cleanHeading} display heading in #050506, ${cleanPrimary} body in ${bg.hex}. The contrast flip from dark hero to light band is the page's structural rhythm.

### Kanban Board Preview
**Role:** Feature illustration cards

Mini dark-mode kanban with columns (BACKLOG, TO DO, IN PROGRESS) rendered in-product, wrapped in a 12px card with subtle shadow. Shows tags and avatars at real product scale.

### Inbox/Chat Panel
**Role:** Right-side feature preview

Dark panel with avatar circles, 12px radius, user names in ${cleanPrimary} 14px weight 500 white, message previews in muted gray. Includes 'Unread' pills and status dots in ${primaryColor.name.toLowerCase()}.

## Do's and Don'ts

### Do
- Use 9999px radius for all buttons, tags, and pill controls: pill geometry is the system's signature shape
- Maintain concentric border radius on nested containers: Outer R = Inner R + Padding (Inner R = max(0, Outer R - Padding)) to preserve parallel, balanced margins at rounded corners
- Reserve ${cleanHeading} for display moments (28px and up); never use it for body, nav, or anything below 22px
- Pick a background mode first: dark (${bg.hex} canvas) for product-heavy screens, white (#ffffff) for editorial sections: never blend them in one component
- Use ${primaryColor.name} (${primaryColor.hex}) for the single most important action per screen; let ${accentColor.name} (${accentColor.hex}) appear as warm punctuation in tags, dots, and gradient stops
- Apply the aurora gradient (${primaryColor.name.toLowerCase()} -> ${accentColor.name.toLowerCase()} -> white) as a narrow vertical or radial beam, never as a full background fill
- Set body text to 14px / line-height 1.5 / -0.14px tracking, and increase tracking compression proportionally with size (to -4px at 80px display)
- Stack dark and light sections as alternating bands with 96px vertical gaps to create the page's signature rhythm

### Don't
- Don't use sharp corners (0-8px) on buttons or tags: the system is pill-first
- Don't set Outer R = Inner R on nested containers with padding: this violates concentric geometry and produces pinched, uneven corner margins
- Don't pair ${cleanPrimary} display weights with custom display faces; they fight each other at large sizes
- Don't apply the aurora gradient as a full-surface background: it loses its impact when it covers everything
- Don't introduce a third accent color; the ${primaryColor.name.toLowerCase()}/${accentColor.name.toLowerCase()} pair is the entire chromatic vocabulary
- Don't use shadows for elevation on dark cards: the system prefers borders (${border.hex}) and color contrast over drop shadows
- Don't use ${cleanHeading} below 28px or in body copy: tight tracking crushes readability at small sizes
- Don't put white text on a white section, or low contrast text on the dark canvas without checking contrast

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | ${bg.name} | \`${bg.hex}\` | Page background, dominant surface for dark sections |
| 1 | ${voidColor.name} | \`${voidColor.hex}\` | Deepest dark surface, hero gradient base, modal backdrops |
| 2 | ${surface.name} | \`${surface.hex}\` | Elevated card panels one step above canvas |
| 3 | Light Canvas | \`#ffffff\` | Alternating light sections, editorial content bands |
| 4 | Linen | \`#f6f6f6\` | Soft warm tint for secondary light sections |

## Elevation

- **Product screenshot card:** \`rgba(0, 0, 0, 0.5) 0px 6px 25px 0px\`
- **Floating panel:** \`rgba(0, 0, 0, 0.35) 0px 4px 16px 0px\`
- **Subtle elevation:** \`rgba(0, 0, 0, 0.15) 0px 4px 6px 0px\`
- **Focus ring:** \`rgba(255, 255, 255, 0.4) 0px 0px 0px 6px\`

## Imagery

Hero is focused gradient, no stock photography. All feature illustrations are real product UI screenshots (dark-mode kanban, inbox, calendar) wrapped in card frames, functioning as both evidence and decoration. No lifestyle photography, no stock imagery, no 3D renders. Icons are monochrome line icons in muted gray or white, never multicolor. The system treats its own dark UI as the hero asset: the product is the photography.

## Layout

Full-bleed hero with a focused accent beam and headline left-aligned, product preview floating bottom-right. Below the hero, a max-width 1200px content area alternates dark and light bands. Each section is a single vertical block: heading + 3-column or 4-column card grid, separated by 96px gaps. The 'MetaBrain' section breaks the grid with a centered display heading and a mixed-size card mosaic (large featured card + smaller supporting cards). The page is content-dense by SaaS standards but uses the dark/light band alternation to give each section room to breathe. Navigation is a single transparent top bar that becomes opaque on scroll.

## Agent Prompt Guide

primary action: ${primaryColor.hex} (filled action)
Create a Primary Action Button: ${primaryColor.hex} background, #ffffff text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.

## Quick Color Reference
- Canvas (dark): ${bg.hex}
- Canvas (light): #ffffff
- Primary text on dark: #ffffff
- Primary text on light: #050506
- Border dark: ${border.hex}
- Border light: #d1d1d1
- Accent: ${primaryColor.hex} (${primaryColor.name}) for primary actions
- Warm accent: ${accentColor.hex} (${accentColor.name}) for highlights, tags, gradient stops

## Example Component Prompts

1. **Primary action button**: ${primaryColor.hex} background, #ffffff text, 9999px radius, compact pill padding. Use this filled treatment for the main CTA.

2. **Feature card grid**: 4-column grid on white (#ffffff) section. Each card: ${surface.hex} background, 12px radius, 24px padding, 1px ${border.hex} border. Card heading: ${cleanHeading} 28px weight 500, #ffffff. Card body: ${cleanPrimary} 14px weight 400, muted gray. Optional radial gradient bleed in corner (rgba(255,137,100,0.15) fading to transparent).

3. **Product screenshot frame**: In-app dark UI screenshot wrapped in a 12px-radius container with shadow rgba(0,0,0,0.5) 0 6px 25px. Floats over the background at the bottom of the hero.

4. **Tag chip**: 9999px radius, 4px 10px padding, ${cleanPrimary} 11px weight 500. Background: category color at 12% opacity. Text: category color at full saturation.

5. **Top navigation**: Transparent over hero. ${brandName} logo left. Center: ${cleanPrimary} 14px weight 400, #ffffff, 24px gaps. Right: 'Star Us' text link + outlined 'Sign In' ghost pill (1px ${border.hex} border, 9999px radius) + filled 'Sign Up' pill (${primaryColor.hex}, white text, 9999px radius, 10px 20px padding).

## Gradient System

Two gradient families serve distinct purposes:

**Accent beam** (hero only): linear-gradient(180deg, ${primaryColor.name} -> ${accentColor.name} -> white) painted as a narrow streak, 15-25% page width. This is the brand's signature visual: it should appear once per page, not repeated.

**Radial glow** (feature card glows): radial-gradient from warm amber through soft yellow to transparent. Painted as a 200-400px circle bleeding from a card corner, at 30-50% opacity.

**Section transitions** (rare): linear-gradient from white to soft tint for section bridges.

Never stack two full-opacity gradients in the same viewport.

## Similar Brands

- **Linear**: Same dark-canvas productivity app aesthetic with a single vivid accent, pill-shaped controls, and product-UI-as-hero photography
- **Vercel**: Same dramatic gradient hero treatment (vertical beam on near-black) and display-headline-at-80px approach with tight letter-spacing
- **Arc Browser**: Same dark-mode-first product UI with warm-to-cool gradient washes and pill geometry on controls
- **Resend**: Same alternating dark/light section rhythm, minimal shadow approach, and 9999px button radii as a brand signature
- **Stripe**: Same use of gradient hero beams and product screenshots floating over atmospheric backgrounds, with ${cleanPrimary} as the workhorse UI face

## Quick Start

### CSS Custom Properties

\`\`\`css
${cssProperties}
\`\`\`

### Tailwind v4

\`\`\`css
${tailwindV4}
\`\`\`
`;
}

/**
 * Builds an interactive React + Tailwind TSX component rendering live specimens matching the Style Reference standard
 */
export function buildSpecimenComponent(
  name: string,
  title: string,
  colors: SemanticColorToken[],
  primaryFont: string,
  monoFont: string
): string {
  const brandName = title.split(" - ")[0].split("-")[0].split(":")[0].trim();
  const primaryColor = colors.find((c) => c.role === "primary") || colors[0];
  const accentColor = colors.find((c) => c.role === "accent") || colors[1];
  const bg = colors.find((c) => c.role === "background") || colors[0];
  const surface = colors.find((c) => c.role === "surface") || colors[2];
  const border = colors.find((c) => c.role === "border") || colors[3];
  const voidColor = colors.find((c) => c.role === "deep") || { hex: "#090a0c", name: "Void" };

  return `"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, ArrowRight } from "lucide-react";

export default function ${brandName.replace(/[^a-zA-Z0-9]/g, "")}Specimens() {
  const [activeTab, setActiveTab] = useState<"buttons" | "inputs" | "cards" | "palette">("buttons");
  const [inputText, setInputText] = useState("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = ${JSON.stringify(colors)};

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="w-full space-y-6 text-[#ffffff] font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[${border.hex}]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>${brandName} - Style Specimens</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[${primaryColor.hex}]/20 text-[${primaryColor.hex}] border border-[${primaryColor.hex}]/40">
              Style Reference
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Live interactive preview of extracted pill controls, inputs, and semantic tokens.
          </p>
        </div>

        {/* Specimen Tabs */}
        <div className="flex items-center gap-1 bg-[${voidColor.hex}] p-1 rounded-full border border-[${border.hex}] text-xs">
          {(["buttons", "inputs", "cards", "palette"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={\`px-3.5 py-1.5 rounded-full font-medium capitalize transition-all cursor-pointer \${
                activeTab === tab
                  ? "bg-[${bg.hex}] text-white shadow-xs border border-[${border.hex}]"
                  : "text-zinc-400 hover:text-white"
              }\`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Buttons Specimen */}
      {activeTab === "buttons" && (
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Pill-Shaped Controls (9999px Radius)
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary Pill Button */}
            <button
              type="button"
              style={{ backgroundColor: "${primaryColor.hex}" }}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-[0_0_20px_${primaryColor.hex}55] transition-all hover:opacity-95 active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Ghost Pill Button */}
            <button
              type="button"
              style={{ borderColor: "${border.hex}" }}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-transparent border hover:bg-white hover:text-[#090a0c] transition-all active:scale-98 cursor-pointer"
            >
              <span>Sign In</span>
            </button>

            {/* White Pill Button */}
            <button
              type="button"
              className="px-6 py-2.5 rounded-full text-sm font-medium text-[#090a0c] bg-[#ffffff] hover:bg-[#e5e5e7] shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <span>See In Action</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Tag Chips */}
            <span
              style={{ backgroundColor: "${primaryColor.hex}20", color: "${primaryColor.hex}", borderColor: "${primaryColor.hex}40" }}
              className="px-2.5 py-1 rounded-full text-xs font-medium border"
            >
              ⚡ ${primaryColor.name}
            </span>
            <span
              style={{ backgroundColor: "${accentColor.hex}20", color: "${accentColor.hex}", borderColor: "${accentColor.hex}40" }}
              className="px-2.5 py-1 rounded-full text-xs font-medium border"
            >
              🔥 ${accentColor.name}
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Inputs Specimen */}
      {activeTab === "inputs" && (
        <div className="space-y-4 max-w-md">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Text Input & Focus Rings
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300 block">
              Test Input Field
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Search or jump to command (⌘K)..."
              style={{ backgroundColor: "${surface.hex}", borderColor: "${border.hex}" }}
              className="w-full px-4 py-2.5 rounded-[4px] border text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[${primaryColor.hex}]/50 font-mono"
            />
            <p className="text-[11px] text-zinc-500">
              Matches 4px input corner radius, hairline border token, and active glow.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Cards Specimen (Concentric Radii) */}
      {activeTab === "cards" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Autonomous Agent Workspaces (Concentric: Outer R = Inner R + Padding)
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">Outer 20px = Inner 8px + Padding 12px</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cursor Agent Card */}
            <div
              style={{ backgroundColor: "${surface.hex}", borderColor: "${border.hex}" }}
              className="rounded-[20px] border p-3 flex flex-col justify-between space-y-4 text-left shadow-2xl relative overflow-hidden group hover:border-[#3c4048] transition-all"
            >
              <div className="flex items-center justify-between border-b border-[#191d20]/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <polygon points="12 2 2 22 22 22" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-white tracking-[-0.01em]">Cursor</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-500 text-xs font-mono">
                  <span>-</span>
                  <span>⤢</span>
                  <span>✕</span>
                </div>
              </div>

              <div className="bg-[#121417] border border-[#1e2126] rounded-[8px] p-3.5 space-y-2.5 shadow-inner">
                <p className="text-[13px] text-white/95 leading-relaxed font-normal">
                  add retry handling for failed image uploads described in this issue
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[#1e2126]/60">
                  <span className="w-3.5 h-3.5 rounded-full border border-amber-400/60 bg-amber-400/20 flex items-center justify-center text-[9px] text-amber-400 font-mono">
                    ◐
                  </span>
                  <span className="text-[11px] font-mono text-white/80 font-medium">ENG-2844</span>
                  <span className="text-[11px] text-zinc-500">added to context</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                  <span>Thinking...</span>
                  <span className="text-[10px]">▶</span>
                </div>
                <p className="text-[12px] text-zinc-300 leading-relaxed">
                  Started working on{" "}
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#191d22] border border-[#2a2e36] text-[11px] font-mono text-white">
                    <span className="text-amber-400">◐</span> ENG-2844 Failed image upload
                  </span>{" "}
                  and launched a cloud agent.
                </p>
              </div>

              <div className="bg-[#101215] border border-[#1b1e23] rounded-[8px] px-3 py-2 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 tracking-widest text-[11px]">⠿</span>
                  <span className="text-[12px] text-zinc-300">Setting up DRV/rideshare-app...</span>
                </div>
                <span className="font-mono text-[11px] text-zinc-500">00:07</span>
              </div>
            </div>

            {/* ${brandName} Opus 5 Agent Card */}
            <div
              style={{ backgroundColor: "${surface.hex}", borderColor: "${border.hex}" }}
              className="rounded-[20px] border p-3 flex flex-col justify-between space-y-4 text-left shadow-2xl relative overflow-hidden group hover:border-[#3c4048] transition-all"
            >
              <div className="flex items-center justify-between border-b border-[#191d20]/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-white flex items-center justify-center font-bold text-xs">
                    ◐
                  </div>
                  <span className="text-[13px] font-medium text-white tracking-[-0.01em]">${brandName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181a1e] border border-[#262a30] text-zinc-400 font-medium">
                    Opus 5
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-500 text-xs font-mono">
                  <span>-</span>
                  <span>⤢</span>
                  <span>✕</span>
                </div>
              </div>

              <div className="bg-[#121417] border border-[#1e2126] rounded-[8px] p-3.5 space-y-2.5 shadow-inner">
                <p className="text-[13px] text-white/95 leading-relaxed font-normal">
                  Fix the dimmed ride rows that never reset and open a PR
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[#1e2126]/60">
                  <span className="w-3.5 h-3.5 rounded-full border border-amber-400/60 bg-amber-400/20 flex items-center justify-center text-[9px] text-amber-400 font-mono">
                    ◐
                  </span>
                  <span className="text-[11px] font-mono text-white/80 font-medium">DRV-364</span>
                  <span className="text-[11px] text-zinc-500">added to context</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                  <span>Worked for 10 sec</span>
                  <span className="text-[10px]">▶</span>
                </div>
                <p className="text-[12px] text-zinc-300 leading-relaxed">
                  Pushed and opened a draft PR. Removed dimmedIds: isItemDimmed now checks waitingStatusById directly.
                </p>
              </div>

              <div className="bg-[#121417] border border-[#1e2126] rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <span>Changed 2 files</span>
                    <span className="font-mono text-[11px] text-emerald-400 font-medium">+22</span>
                    <span className="font-mono text-[11px] text-rose-400 font-medium">-10</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-zinc-300 bg-[#1a1d22] border border-[#2a2e36]">
                    Preview
                  </span>
                </div>
                <div className="pt-1 border-t border-[#1e2126]/60">
                  <div className="text-xs font-medium text-white/95">
                    Draft Reset dimmed ride rows
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 mt-0.5">
                    master ← ride/drv-364-reset-dimmed-rows
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Color Swatches */}
      {activeTab === "palette" && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Semantic Color Swatches (Click to Copy Hex)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {colors.map((c, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => copyColor(c.hex)}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-left hover:border-zinc-700 transition-all cursor-pointer group"
              >
                <div
                  className="w-full h-12 rounded-lg border border-white/10 mb-2 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-between mt-1">
                  <span>{c.hex}</span>
                  {copiedHex === c.hex ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
`;
}


/**
 * Builds AI Coding Agent Prompt Rules (Cursor, Claude, Gemini, ChatGPT)
 */
function buildModelRules(
  name: string,
  title: string,
  targetUrl: string,
  colors: SemanticColorToken[],
  primaryFont: string,
  monoFont: string
): ModelPrompts {
  const colorSummary = colors.map((c) => `${c.role}: ${c.hex} (${c.name})`).join(", ");

  const cursorPrompt = `# .cursorrules for ${title} Design System
# Extracted from: ${targetUrl}

You are an expert Frontend Systems Engineer building UI following the ${title} design system.

## Design System Tokens
- Colors: ${colorSummary}
- Primary Font: ${primaryFont}
- Code Font: ${monoFont}
- Border Radius: sm (4px), md (8px), lg (12px), full (9999px)
- Spacing: 4px base grid (4, 8, 12, 16, 24, 32, 48px)

## Implementation Directives
1. Always use the exact color tokens above instead of guessing arbitrary hex codes.
2. Maintain clean structural boundaries with 1px hairline borders on surface cards.
3. Keep buttons compact with 8px radius and active scale transitions.
4. Reference DESIGN.md in the project root for full component specifications.
`;

  const claudePrompt = `# CLAUDE.md - ${title} Design System Instructions
Source: ${targetUrl}

## Role & Mission
You are implementing features matching the exact design aesthetic of ${title}.

## Design Tokens & Standards
- Color Palette: ${colorSummary}
- Typography: Use ${primaryFont} for all body text and headings. Use ${monoFont} for code.
- Layout: Use a 4px modular scale. Container cards should have a 12px radius with a 1px border.
- Buttons: Primary button uses the primary color token with high-contrast text. Secondary buttons use surface fill with hairline borders.

When generating React or HTML/Tailwind components, strictly apply these tokens and avoid untracked arbitrary styles.
`;

  const geminiPrompt = `Role: Lead Design Systems Engineer for ${title}.
Target URL: ${targetUrl}
Design Tokens:
- Palette: ${colorSummary}
- Typography: ${primaryFont} (Sans), ${monoFont} (Mono)
Instructions:
- Build spec-compliant UI adhering strictly to the DESIGN.md specification.
- Use exact tokens for all buttons, form controls, surfaces, and badges.
- Never output placeholder styling; maintain production fidelity.`;

  const chatgptPrompt = `You are a custom AI assistant specialized in implementing the ${title} design system (${targetUrl}).
Tokens:
- Colors: ${colorSummary}
- Typography: ${primaryFont}
Guidelines:
- Generate clean React + Tailwind or CSS code adhering to this exact aesthetic.
- Preserve spacing, border radii (4px, 8px, 12px), and elevation shadows.`;

  return {
    cursor: cursorPrompt,
    claude: claudePrompt,
    gemini: geminiPrompt,
    chatgpt: chatgptPrompt,
  };
}

/**
 * Heuristic Synthesizer (Zero-Cost Mode)
 * Produces an exceptional DESIGN.md, tokens, and specimens without requiring an LLM API key.
 */
export function heuristicSynthesizeDesignSystem(scrapeResult: ScrapeResult): DesignSystemData {
  let domainSlug = "web";
  const rawUrl = scrapeResult.targetUrl || "https://example.com";
  try {
    const parsedUrl = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
    const hostParts = parsedUrl.hostname.replace(/^www\./, "").split(".");
    domainSlug = hostParts[0].toLowerCase().replace(/[^a-z0-9]/g, "_") || "web";
  } catch {
    domainSlug = "web";
  }

  const name = sanitizeName(`${domainSlug}_design`);
  const title = scrapeResult.title || `${domainSlug.charAt(0).toUpperCase() + domainSlug.slice(1)} Design System`;

  const extractedColors = scrapeResult.styles?.colors || [];
  const semanticColors = deriveSemanticColors(extractedColors, title);

  const primaryFont = scrapeResult.styles?.fonts?.[0] || "Inter, -apple-system, sans-serif";
  const headingFont = scrapeResult.styles?.fonts?.[1] || primaryFont;
  const monoFont = "JetBrains Mono, SF Mono, Menlo, monospace";

  const typeScale: TypographyScaleItem[] = [
    { level: "caption", size: "11px", lineHeight: "1.38", weight: "400", letterSpacing: "-0.1px", sample: "Metadata, tags & badges" },
    { level: "body", size: "14px", lineHeight: "1.5", weight: "400", letterSpacing: "-0.14px", sample: "All functional UI text: body, nav, buttons, list items, captions" },
    { level: "body-lg", size: "16px", lineHeight: "1.5", weight: "500", letterSpacing: "-0.16px", sample: "Lead descriptions & prominent subheads" },
    { level: "subheading", size: "18px", lineHeight: "1.5", weight: "600", letterSpacing: "-0.36px", sample: "Section openers and panel headers" },
    { level: "heading-sm", size: "22px", lineHeight: "1.25", weight: "600", letterSpacing: "normal", sample: "Card titles & component groups" },
    { level: "heading", size: "24px", lineHeight: "1.25", weight: "600", letterSpacing: "-0.48px", sample: "Section Headings & Milestones" },
    { level: "display-sm", size: "32px", lineHeight: "1.0", weight: "600", letterSpacing: "-1.6px", sample: "Key Feature Titles" },
    { level: "display", size: "80px", lineHeight: "0.9", weight: "700", letterSpacing: "-4px", sample: title },
  ];

  const aestheticSummary = `${title} design system built on ${semanticColors.find((c) => c.role === "background")?.name.toLowerCase()} with high-contrast type and vibrant ${semanticColors.find((c) => c.role === "primary")?.name.toLowerCase()} accents.`;

  const crawled = (scrapeResult.crawledPages || []).map((p) => ({
    url: p.url,
    title: p.title,
    depth: p.depth,
  }));

  const designMd = buildDesignMd(
    title,
    scrapeResult.targetUrl,
    aestheticSummary,
    semanticColors,
    typeScale,
    primaryFont,
    headingFont,
    monoFont,
    crawled
  );

  const cssVariablesFormatted = formatCssVariables(semanticColors, primaryFont, monoFont);
  const tailwindConfigFormatted = formatTailwindConfig(semanticColors, primaryFont, monoFont);
  const tokensJsonFormatted = formatTokensJson(semanticColors, primaryFont, monoFont);
  const componentCode = buildSpecimenComponent(name, title, semanticColors, primaryFont, monoFont);

  const modelPrompts = buildModelRules(
    name,
    title,
    scrapeResult.targetUrl,
    semanticColors,
    primaryFont,
    monoFont
  );

  return {
    name,
    title,
    description: `Complete DESIGN.md design system and tokens extracted from ${title}.`,
    targetUrl: scrapeResult.targetUrl,
    aestheticSummary,
    designMd,
    skillMd: designMd,
    componentCode,
    specimenCode: componentCode,
    semanticColors,
    typographyScale: typeScale,
    primaryFont,
    headingFont,
    monoFont,
    spacingScale: ["4px", "8px", "12px", "16px", "20px", "24px", "28px", "32px", "36px", "40px", "64px", "160px", "180px", "240px"],
    radiiScale: ["4px", "8px", "12px", "16px", "18px", "24px", "30px", "9999px"],
    shadowScale: [
      "rgba(0, 0, 0, 0.15) 0px 4px 6px 0px",
      "rgba(0, 0, 0, 0.35) 0px 4px 16px 0px",
      "rgba(0, 0, 0, 0.5) 0px 6px 25px 0px",
      "rgba(255, 255, 255, 0.4) 0px 0px 0px 6px",
    ],
    cssVariablesFormatted,
    tailwindConfigFormatted,
    tokensJsonFormatted,
    styles: scrapeResult.styles,
    logic: scrapeResult.logic,
    modelPrompts,
    rawMarkdownSnippet: scrapeResult.markdown.slice(0, 1500),
    crawledPages: scrapeResult.crawledPages,
    frameworks: scrapeResult.logic.frameworks,
    languages: scrapeResult.languages || scrapeResult.logic.languages || [],
  };
}

/**
 * Normalizes LLM JSON output or fills in defaults
 */
function parseAndNormalizeDesignOutput(
  rawJson: string,
  targetUrl: string,
  scrapeResult: ScrapeResult
): DesignSystemData {
  let cleaned = rawJson.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        parsed = JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
      } catch {
        // Fall back to heuristic on malformed JSON
        return heuristicSynthesizeDesignSystem(scrapeResult);
      }
    } else {
      return heuristicSynthesizeDesignSystem(scrapeResult);
    }
  }

  const fallbackData = heuristicSynthesizeDesignSystem(scrapeResult);

  const name = sanitizeName(
    parsed.name,
    `design_${new URL(targetUrl).hostname.replace(/[^a-z0-9]/gi, "_")}`
  );

  const title = parsed.title || fallbackData.title;
  const aestheticSummary = parsed.aestheticSummary || fallbackData.aestheticSummary;
  const semanticColors =
    Array.isArray(parsed.semanticColors) && parsed.semanticColors.length > 0
      ? parsed.semanticColors
      : fallbackData.semanticColors;

  const typographyScale =
    Array.isArray(parsed.typographyScale) && parsed.typographyScale.length > 0
      ? parsed.typographyScale
      : fallbackData.typographyScale;

  const primaryFont = parsed.primaryFont || fallbackData.primaryFont;
  const headingFont = parsed.headingFont || fallbackData.headingFont;
  const monoFont = parsed.monoFont || fallbackData.monoFont;

  const designMd = parsed.designMd || fallbackData.designMd;
  const componentCode = parsed.componentCode || fallbackData.componentCode;

  const cssVariablesFormatted =
    parsed.cssVariablesFormatted || formatCssVariables(semanticColors, primaryFont, monoFont);
  const tailwindConfigFormatted =
    parsed.tailwindConfigFormatted || formatTailwindConfig(semanticColors, primaryFont, monoFont);
  const tokensJsonFormatted =
    parsed.tokensJsonFormatted || formatTokensJson(semanticColors, primaryFont, monoFont);

  return {
    name,
    title,
    description: parsed.description || fallbackData.description,
    targetUrl,
    aestheticSummary,
    designMd,
    skillMd: designMd,
    componentCode,
    specimenCode: componentCode,
    semanticColors,
    typographyScale,
    primaryFont,
    headingFont,
    monoFont,
    spacingScale: parsed.spacingScale || fallbackData.spacingScale,
    radiiScale: parsed.radiiScale || fallbackData.radiiScale,
    shadowScale: parsed.shadowScale || fallbackData.shadowScale,
    cssVariablesFormatted,
    tailwindConfigFormatted,
    tokensJsonFormatted,
    styles: scrapeResult.styles,
    logic: scrapeResult.logic,
    modelPrompts: {
      cursor: parsed.modelPrompts?.cursor || fallbackData.modelPrompts.cursor,
      claude: parsed.modelPrompts?.claude || fallbackData.modelPrompts.claude,
      gemini: parsed.modelPrompts?.gemini || fallbackData.modelPrompts.gemini,
      chatgpt: parsed.modelPrompts?.chatgpt || fallbackData.modelPrompts.chatgpt,
    },
    rawMarkdownSnippet: scrapeResult.markdown.slice(0, 1500),
    crawledPages: scrapeResult.crawledPages,
    frameworks: scrapeResult.logic.frameworks,
    languages: scrapeResult.languages || scrapeResult.logic.languages || [],
  };
}

/**
 * Main generator entry point with multi-provider routing (Groq, Gemini, or Heuristic)
 */
export async function generateUniversalSkill(
  scrapeResult: ScrapeResult,
  options: {
    groqApiKey?: string;
    geminiApiKey?: string;
    preferredLlm?: "groq" | "gemini" | "auto";
  }
): Promise<DesignSystemData> {
  const groqKey = options.groqApiKey?.trim() || process.env.GROQ_API_KEY?.trim();
  const geminiKey = options.geminiApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();

  const crawledPagesText = scrapeResult.crawledPages?.length
    ? `${scrapeResult.crawledPages.length} pages explored:\n` +
      scrapeResult.crawledPages
        .map((p) => `  - ${p.title} (${p.url}) [Depth ${p.depth}]`)
        .join("\n")
    : "Single page exploration";

  const promptContent = `Target URL: ${scrapeResult.targetUrl}
Page Title: ${scrapeResult.title || "Unknown"}
Page Description: ${scrapeResult.description || "N/A"}
Explored Pages:
${crawledPagesText}

Extracted Style Tokens:
- Colors: ${scrapeResult.styles.colors.slice(0, 30).join(", ")}
- Fonts: ${scrapeResult.styles.fonts.join(", ")}
- CSS Variables: ${JSON.stringify(scrapeResult.styles.cssVariables)}
- Tailwind Utility Classes: ${scrapeResult.styles.tailwindClasses.slice(0, 30).join(" ")}
- Layout Patterns: ${scrapeResult.styles.layoutPatterns.join(", ")}
- Shadows: ${scrapeResult.styles.shadows?.join(", ") || "Standard"}
- Radii: ${scrapeResult.styles.radii?.join(", ") || "Standard"}

Scraped DOM Markdown Snippet:
${scrapeResult.markdown.slice(0, 15000)}

Formulate a production-grade DESIGN.md following the Google Stitch and DesignMD standard. Output strict JSON.`;

  // Try Groq if preferred or available
  if ((options.preferredLlm === "groq" || !options.preferredLlm) && groqKey) {
    try {
      const groq = new Groq({ apiKey: groqKey });
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: promptContent },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        response_format: { type: "json_object" },
      });

      const responseText = completion.choices[0]?.message?.content || "";
      if (responseText) {
        return parseAndNormalizeDesignOutput(responseText, scrapeResult.targetUrl, scrapeResult);
      }
    } catch (err) {
      console.warn("Groq generation failed, attempting Gemini fallback:", err);
    }
  }

  // Try Gemini if preferred or available
  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      for (const model of ["gemini-2.5-flash", "gemini-3.7-flash", "gemini-1.5-flash"]) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: `${SYSTEM_PROMPT}\n\n${promptContent}`,
            config: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          });
          const responseText = response.text || "";
          if (responseText) {
            return parseAndNormalizeDesignOutput(responseText, scrapeResult.targetUrl, scrapeResult);
          }
        } catch {}
      }
    } catch (err) {
      console.warn("Gemini generation failed, falling back to heuristic:", err);
    }
  }

  // Zero-cost Heuristic Fallback
  return heuristicSynthesizeDesignSystem(scrapeResult);
}
