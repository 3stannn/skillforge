import { Groq } from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import { UniversalSkill, ModelPrompts } from "./types";
import { ScrapeResult } from "./scraper";

const SYSTEM_PROMPT = `You are a world-class AI Systems Architect and Lead Design Systems Engineer.
Analyze the provided scraped webpage styles, logic, DOM structure, and markdown.
Formulate a production-grade, universal "SKILL.md" specification and interactive component implementation usable by ALL modern AI models (Google Gemini, OpenAI ChatGPT, Cursor / Windsurf, and Claude).

Rules:
1. Produce a clean identifier name (snake_case, 3-64 chars) matching ^[a-z0-9_]+$.
2. Formulate a complete, canonical "SKILL.md" document with:
   - Valid YAML frontmatter (name, description)
   - # Title & Overview
   - ## Discovered Site Architecture & Multi-Page Scope (if multiple pages were crawled)
   - ## Visual Design System & Styling Tokens (exact color codes, CSS variables, typography hierarchy, layout rules, Tailwind classes, and visual effects like glassmorphism, animations, or shadows)
   - ## Detected Languages & Code Stacks (all detected programming languages, CLI environments, and code dialects found on the site, with implementation patterns)
   - ## Interactive Logic & State Architecture (state variables, event handlers, forms & validation rules, user interaction loops, and API contracts)
   - ## Production Implementation Guidelines
   - ## Multi-Model Directives (instructions for Gemini, ChatGPT, Cursor, Claude)
3. Construct a standalone, copy-pasteable React + TypeScript + Tailwind CSS component ("componentCode") that faithfully recreates the extracted styles, sub-page navigation, and interactive logic.
4. Construct tailored instructions for:
   - "gemini": Google Gemini System Instructions & Persona
   - "chatgpt": OpenAI Custom GPT Instructions
   - "cursor": .cursorrules / Windsurf Agent Rules format
   - "claude": Claude Project Instructions
5. Detect, compile, and list all programming languages and environments discovered on the page in the "languages" array.

You MUST return ONLY a valid JSON object with this exact structure:
{
  "name": "snake_case_name",
  "title": "Human Readable Title",
  "description": "Comprehensive instruction-dense summary of when and how an AI model should apply this skill.",
  "languages": ["TypeScript", "JavaScript", "Python"],
  "skillMd": "---...full markdown with YAML frontmatter...",
  "componentCode": "// Standalone React + Tailwind component TSX code...",
  "styles": {
    "colors": ["#1e293b", "#06b6d4"],
    "fonts": ["Inter", "sans-serif"],
    "cssVariables": { "--primary": "#06b6d4" },
    "tailwindClasses": ["bg-zinc-950", "text-cyan-400"],
    "layoutPatterns": ["Flexbox Container", "Card Grid"],
    "rawStylesSummary": "..."
  },
  "logic": {
    "stateVariables": ["activeTab", "searchQuery", "isLoading"],
    "eventHandlers": ["handleSearch()", "onTabChange()"],
    "interactiveElements": ["Search Input", "Filter Tabs"],
    "apiEndpoints": ["https://..."],
    "formActions": [],
    "rawLogicSummary": "..."
  },
  "modelPrompts": {
    "gemini": "...",
    "chatgpt": "...",
    "cursor": "...",
    "claude": "..."
  }
}`;

function sanitizeSkillName(raw: string, fallback: string = "web_skill"): string {
  let cleaned = (raw || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "");

  if (cleaned.length < 3) cleaned = `${cleaned}_skill`;
  if (cleaned.length > 64) cleaned = cleaned.slice(0, 64).replace(/_+$/, "");
  if (!/^[a-z0-9_]+$/.test(cleaned)) cleaned = fallback;
  return cleaned;
}

function parseAndNormalizeOutput(
  rawJson: string,
  targetUrl: string,
  scrapeResult: ScrapeResult
): UniversalSkill {
  let cleaned = rawJson.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      try {
        parsed = JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
      } catch {
        throw new Error(`Failed to parse JSON response from LLM: ${(err as Error).message}`);
      }
    } else {
      throw new Error(`Invalid JSON returned by LLM: ${(err as Error).message}`);
    }
  }

  const name = sanitizeSkillName(
    parsed.name,
    `skill_${new URL(targetUrl).hostname.replace(/[^a-z0-9]/gi, "_")}`
  );

  return {
    name,
    title: parsed.title || scrapeResult.title || name,
    description:
      parsed.description ||
      `Specialized skill implementing the design system and logic of ${scrapeResult.title}.`,
    targetUrl,
    skillMd:
      parsed.skillMd ||
      buildFallbackSkillMd(name, parsed.title || scrapeResult.title, scrapeResult),
    componentCode: parsed.componentCode || buildFallbackComponent(name, scrapeResult),
    styles: {
      colors: parsed.styles?.colors || scrapeResult.styles.colors,
      fonts: parsed.styles?.fonts || scrapeResult.styles.fonts,
      cssVariables: parsed.styles?.cssVariables || scrapeResult.styles.cssVariables,
      tailwindClasses: parsed.styles?.tailwindClasses || scrapeResult.styles.tailwindClasses,
      layoutPatterns: parsed.styles?.layoutPatterns || scrapeResult.styles.layoutPatterns,
      animations: parsed.styles?.animations || scrapeResult.styles.animations,
      shadows: parsed.styles?.shadows || scrapeResult.styles.shadows,
      radii: parsed.styles?.radii || scrapeResult.styles.radii,
      mediaQueries: parsed.styles?.mediaQueries || scrapeResult.styles.mediaQueries,
      rawStylesSummary: parsed.styles?.rawStylesSummary || scrapeResult.styles.rawStylesSummary,
    },
    logic: {
      stateVariables: parsed.logic?.stateVariables || scrapeResult.logic.stateVariables,
      eventHandlers: parsed.logic?.eventHandlers || scrapeResult.logic.eventHandlers,
      interactiveElements:
        parsed.logic?.interactiveElements || scrapeResult.logic.interactiveElements,
      apiEndpoints: parsed.logic?.apiEndpoints || scrapeResult.logic.apiEndpoints,
      formActions: parsed.logic?.formActions || scrapeResult.logic.formActions,
      forms: scrapeResult.logic.forms,
      frameworks: scrapeResult.logic.frameworks,
      navigationRoutes: scrapeResult.logic.navigationRoutes,
      rawLogicSummary: parsed.logic?.rawLogicSummary || scrapeResult.logic.rawLogicSummary,
    },
    modelPrompts: {
      gemini: parsed.modelPrompts?.gemini || buildGeminiPrompt(name, parsed.title, scrapeResult),
      chatgpt:
        parsed.modelPrompts?.chatgpt || buildChatGptPrompt(name, parsed.title, scrapeResult),
      cursor: parsed.modelPrompts?.cursor || buildCursorRules(name, parsed.title, scrapeResult),
      claude: parsed.modelPrompts?.claude || buildClaudePrompt(name, parsed.title, scrapeResult),
    },
    rawMarkdownSnippet: scrapeResult.markdown.slice(0, 1500),
    crawledPages: scrapeResult.crawledPages,
    frameworks: scrapeResult.logic.frameworks,
    languages:
      Array.isArray(parsed.languages) && parsed.languages.length > 0
        ? parsed.languages
        : scrapeResult.languages || scrapeResult.logic.languages || [],
  };
}

/**
 * Fallback Component Builder with multi-tab subpages & interactive form controls
 */
export function buildFallbackComponent(name: string, scrapeResult: ScrapeResult): string {
  const compName = name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const colors = scrapeResult.styles.colors.slice(0, 5);
  const primaryColor = colors[0] || "#06b6d4";

  // If multiple pages crawled, use their titles as tabs
  const subPages = scrapeResult.crawledPages || [];
  const tabs =
    subPages.length > 1
      ? subPages.slice(0, 5).map((p, idx) => ({
          id: `tab_${idx}`,
          label: p.title.length > 20 ? `${p.title.slice(0, 18)}...` : p.title,
          url: p.url,
          words: p.wordCount,
        }))
      : [
          { id: "overview", label: "Overview", url: scrapeResult.targetUrl, words: 0 },
          { id: "inspect", label: "Inspect Tokens", url: scrapeResult.targetUrl, words: 0 },
          { id: "actions", label: "Interactive Controls", url: scrapeResult.targetUrl, words: 0 },
        ];

  const firstForm = scrapeResult.logic.forms?.[0];
  const formFields = firstForm?.fields.slice(0, 3) || [];

  return `"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, RefreshCw, Layers, ExternalLink } from "lucide-react";

/**
 * ${compName}
 * Reconstructed React component capturing the design system, multi-page architecture, and logic of:
 * ${scrapeResult.targetUrl}
 */
export default function ${compName}() {
  const [activeTab, setActiveTab] = useState<string>("${tabs[0]?.id || "overview"}");
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  const handleAction = async () => {
    setIsLoading(true);
    setStatusMsg("");
    // Simulating interactive logic extracted from target site
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
    setStatusMsg("Action executed successfully!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              ${scrapeResult.title || compName}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            ${scrapeResult.description || `Interactive component replicating styles and logic from ${scrapeResult.targetUrl}`}
          </p>
        </div>

        {/* Navigation Tabs (Discovered Routes / Views) */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs flex-wrap">
          {${JSON.stringify(tabs)}.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={\`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer \${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200"
              }\`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Style Tokens Card */}
        <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Extracted Style Tokens
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">
              ${scrapeResult.styles.colors.length} colors
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {${JSON.stringify(colors)}.map((color, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-xs font-mono bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800"
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                />
                <span>{color}</span>
              </div>
            ))}
          </div>

          {/* Detected Frameworks */}
          {${JSON.stringify(scrapeResult.logic.frameworks || [])}.length > 0 && (
            <div className="pt-2 border-t border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 block mb-1.5">Detected Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {${JSON.stringify(scrapeResult.logic.frameworks || [])}.map((fw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-mono"
                  >
                    {fw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detected Languages */}
          {${JSON.stringify(scrapeResult.languages || scrapeResult.logic.languages || [])}.length > 0 && (
            <div className="pt-2 border-t border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 block mb-1.5">Languages & CLI:</span>
              <div className="flex flex-wrap gap-1.5">
                {${JSON.stringify(scrapeResult.languages || scrapeResult.logic.languages || [])}.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 text-[10px] font-mono"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* State & Logic Controller */}
        <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Interactive Logic Controller
          </h3>

          <div className="space-y-2">
            ${
              formFields.length > 0
                ? formFields
                    .map(
                      (field) => `
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1 font-mono">${field.name}${field.required ? " *" : ""}</label>
              <input
                type="${field.type || "text"}"
                placeholder="${field.placeholder || `Enter ${field.name}...`}"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
              />
            </div>`
                    )
                    .join("\n")
                : `
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Test extracted input parameter..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
            />`
            }

            <button
              type="button"
              onClick={handleAction}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
              <span>Execute Action</span>
            </button>

            {statusMsg && (
              <p className="text-xs text-emerald-400 font-mono text-center pt-1">{statusMsg}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
`;
}

export function buildFallbackSkillMd(
  name: string,
  title: string,
  scrapeResult: ScrapeResult
): string {
  const colors = scrapeResult.styles.colors.slice(0, 8);
  const tailwind = scrapeResult.styles.tailwindClasses.slice(0, 25);
  const states = scrapeResult.logic.stateVariables.slice(0, 10);
  const events = scrapeResult.logic.eventHandlers.slice(0, 10);
  const endpoints = scrapeResult.logic.apiEndpoints.slice(0, 8);
  const cssVars = Object.entries(scrapeResult.styles.cssVariables).slice(0, 10);
  const frameworks = scrapeResult.logic.frameworks || [];
  const detectedLangs = scrapeResult.languages || scrapeResult.logic.languages || [];
  const crawled = scrapeResult.crawledPages || [];

  let sectionNum = 2;
  const siteArchSection = crawled.length > 1 ? `${sectionNum++}` : null;
  const designTokensSection = `${sectionNum++}`;
  const languagesSection = detectedLangs.length > 0 ? `${sectionNum++}` : null;
  const logicSection = `${sectionNum++}`;
  const directivesSection = `${sectionNum++}`;

  return `---
name: ${name}
description: |
  Specialized skill extracting the design system, visual style tokens, interactive state logic,
  and multi-page architecture from ${title || scrapeResult.targetUrl}. Use when designing, building, or refactoring
  features to match this exact aesthetic and interactive flow.
---

# ${title || name}

> **Source URL**: [${scrapeResult.targetUrl}](${scrapeResult.targetUrl})  
> **Extraction Engine**: SkillForge Multi-Model Synthesizer (Deep Crawl Engine)  
${crawled.length > 1 ? `> **Crawled Scope**: ${crawled.length} pages across site architecture\n` : ""}${detectedLangs.length > 0 ? `> **Detected Languages**: ${detectedLangs.join(", ")}\n` : ""}
---

## 1. Executive Summary & Use Cases
This skill provides an authoritative blueprint of the visual design system and functional logic extracted from **${title}**.
Any modern AI model (Gemini, ChatGPT, Cursor, Claude) should use this specification to:
- Faithfully reproduce the component layout and user interaction flows.
- Implement matching color palettes, typography scales, CSS variables, and Tailwind CSS utility rules.
- Maintain consistent state transitions, form validation schemas, and asynchronous API contracts.
${frameworks.length > 0 ? `- Align with detected architectural stack: **${frameworks.join(", ")}**.\n` : ""}${detectedLangs.length > 0 ? `- Apply code idioms for detected languages: **${detectedLangs.join(", ")}**.\n` : ""}
---

${
  siteArchSection
    ? `## ${siteArchSection}. Discovered Site Architecture & Crawled Pages
The deep scraper explored the following routes across the site:
| Page Title | URL / Route | Depth | Word Count |
| :--- | :--- | :---: | :---: |
${crawled.map((p) => `| ${p.title.replace(/\|/g, "\\|")} | [\`${new URL(p.url).pathname}\`](${p.url}) | ${p.depth} | ${p.wordCount} |`).join("\n")}

---
`
    : ""
}
## ${designTokensSection}. Visual Design System & Styling Tokens

### Color Palette
| Token | Hex / HSL | Application |
| :--- | :--- | :--- |
${colors.map((c, i) => `| \`color-${i + 1}\` | \`${c}\` | ${i === 0 ? "Primary accent" : i === 1 ? "Background / Surface" : "Content / Border"} |`).join("\n")}

${
  cssVars.length > 0
    ? `### CSS Custom Properties & Variables
| Variable | Value |
| :--- | :--- |
${cssVars.map(([k, v]) => `| \`${k}\` | \`${v}\` |`).join("\n")}
`
    : ""
}

### Typography & Fonts
- **Font Families**: ${scrapeResult.styles.fonts.join(", ") || "Inter, system-ui, sans-serif"}
- **Hierarchy**:
  - Headings: Bold / ExtraBold, tracking-tight
  - Body: Regular / Medium text-sm with leading-relaxed
  - Code / Tokens: Monospace font-mono text-xs

### Layout & Utility Classes
- **Layout Paradigms**: ${scrapeResult.styles.layoutPatterns.join(", ") || "Flexbox, CSS Grid, Responsive Containers"}
${scrapeResult.styles.animations && scrapeResult.styles.animations.length > 0 ? `- **Animation & Transitions**: ${scrapeResult.styles.animations.join(", ")}` : ""}
- **Primary Tailwind Classes**:
  \`\`\`css
  ${tailwind.join(" ")}
  \`\`\`

---

${
  languagesSection
    ? `## ${languagesSection}. Detected Languages & Code Stacks
The target application utilizes and references the following programming languages, CLI tooling, and dialects:
| Language / Tooling | Ecosystem Role | Detection Source |
| :--- | :--- | :--- |
${detectedLangs.map((lang) => `| **${lang}** | Implementation & Examples | DOM / Markdown / Scripts |`).join("\n")}

---
`
    : ""
}
## ${logicSection}. Interactive Logic & State Architecture

### Core State Variables
${
  states.length > 0
    ? states.map((s) => `- \`${s}\``).join("\n")
    : "- `query: string` (User search or filter input)\n- `isLoading: boolean` (Asynchronous loading state)\n- `activeTab: string` (Current view mode)"
}

### Event Handlers & User Workflows
${
  events.length > 0
    ? events.map((e) => `- \`${e}\``).join("\n")
    : "- `onSubmit(event)`: Handles user submissions and parameter validation.\n- `onFilterChange(value)`: Triggers re-computation or data fetching.\n- `onReset()`: Restores initial component state."
}

${
  scrapeResult.logic.forms && scrapeResult.logic.forms.length > 0
    ? `\n### Forms & Input Schemas\n${scrapeResult.logic.forms
        .map(
          (f, idx) => `#### Form ${idx + 1}: \`${f.method} ${f.action}\`
${f.fields.map((fd) => `- \`${fd.name}\` (${fd.type})${fd.required ? " **[required]**" : ""}${fd.placeholder ? ` placeholder: "${fd.placeholder}"` : ""}`).join("\n")}`
        )
        .join("\n\n")}\n`
    : ""
}${endpoints.length > 0 ? `\n### Connected Endpoints & APIs\n${endpoints.map((ep) => `- \`${ep}\``).join("\n")}\n` : ""}
---

## ${directivesSection}. Universal AI Model Directives

### For Google Gemini
- Ground code generation in the CSS variables and Tailwind classes documented above.
- Ensure strict TypeScript typing and explicit component props interfaces.
${frameworks.includes("Next.js") ? "- Use Next.js 15 App Router standards (React Server Components, server actions).\n" : ""}${detectedLangs.length > 0 ? `- Primary code languages to produce: ${detectedLangs.join(", ")}.\n` : ""}
### For OpenAI ChatGPT
- Apply the color tokens and state machines when generating UI or backend handlers.
- Prefer modular hooks for managing state variables.
${detectedLangs.length > 0 ? `- Target implementation languages: ${detectedLangs.join(", ")}.\n` : ""}
### For Cursor & Windsurf
- Reference this skill when generating pages or components within this workspace.
- Adhere to the declared utility classes and avoid ad-hoc styling.
${detectedLangs.length > 0 ? `- Format code blocks using syntax for: ${detectedLangs.join(", ")}.\n` : ""}
### For Anthropic Claude
- Use the structural layout patterns and design constraints outlined above.
${detectedLangs.length > 0 ? `- Support idiomatic patterns for ${detectedLangs.join(", ")}.\n` : ""}`;
}

function buildGeminiPrompt(name: string, title: string, scrapeResult: ScrapeResult): string {
  const langs = scrapeResult.languages || scrapeResult.logic.languages || [];
  const states =
    scrapeResult.logic.stateVariables.length > 0
      ? scrapeResult.logic.stateVariables.slice(0, 5).join(", ")
      : "activeTab, query, isLoading";
  const colors =
    scrapeResult.styles.colors.length > 0
      ? scrapeResult.styles.colors.slice(0, 5).join(", ")
      : "#1a73e8, #000000, #ffffff";
  const tailwind =
    scrapeResult.styles.tailwindClasses.length > 0
      ? scrapeResult.styles.tailwindClasses.slice(0, 15).join(" ")
      : "flex flex-col gap-4 text-zinc-100";

  return `You are a Senior Frontend Architect and Gemini Coding Assistant specialized in the "${name}" skill.
When writing code or answering queries related to ${title || scrapeResult.targetUrl}:
1. Use these primary colors: ${colors}.
2. Use Tailwind utility classes matching: ${tailwind}.
3. Enforce the state management pattern: ${states}.
${scrapeResult.logic.frameworks?.length ? `4. Target Frameworks: ${scrapeResult.logic.frameworks.join(", ")}.\n` : ""}${langs.length ? `5. Code Languages & Dialects: ${langs.join(", ")}.\n` : ""}6. Always produce clean, typed TypeScript and modern React components.`;
}

function buildChatGptPrompt(name: string, title: string, scrapeResult: ScrapeResult): string {
  const langs = scrapeResult.languages || scrapeResult.logic.languages || [];
  const colors =
    scrapeResult.styles.colors.length > 0
      ? scrapeResult.styles.colors.slice(0, 4).join(", ")
      : "#1a73e8, #000000, #ffffff";
  const events =
    scrapeResult.logic.eventHandlers.length > 0
      ? scrapeResult.logic.eventHandlers.slice(0, 4).join(", ")
      : "onSubmit(), onFilterChange(), onReset()";

  return `Role: Expert UI/UX & Full-Stack Engineer implementing ${title}.
Instructions:
- Maintain strict design fidelity with ${scrapeResult.targetUrl}.
- Primary palette: ${colors}.
${langs.length ? `- Supported Languages & Tooling: ${langs.join(", ")}.\n` : ""}- Ensure all interactive handlers (${events}) handle loading and error boundaries gracefully.`;
}

function buildCursorRules(name: string, title: string, scrapeResult: ScrapeResult): string {
  const langs = scrapeResult.languages || scrapeResult.logic.languages || [];
  const states =
    scrapeResult.logic.stateVariables.length > 0
      ? scrapeResult.logic.stateVariables.slice(0, 5).join(", ")
      : "activeTab, query, isLoading";
  const colors =
    scrapeResult.styles.colors.length > 0
      ? scrapeResult.styles.colors.slice(0, 5).join(", ")
      : "#1a73e8, #000000, #ffffff";
  const tailwind =
    scrapeResult.styles.tailwindClasses.length > 0
      ? scrapeResult.styles.tailwindClasses.slice(0, 10).join(" ")
      : "flex flex-col gap-4";

  return `# .cursorrules for ${name}
# Source: ${scrapeResult.targetUrl}

- Design System Colors: ${colors}
- Typography: ${scrapeResult.styles.fonts.join(", ") || "sans-serif"}
${langs.length ? `- Languages & Dialects: ${langs.join(", ")}\n` : ""}- Core Layout Classes: ${tailwind}
- When creating UI components matching ${title}, preserve this state flow:
  ${states}
`;
}

function buildClaudePrompt(name: string, title: string, scrapeResult: ScrapeResult): string {
  const langs = scrapeResult.languages || scrapeResult.logic.languages || [];
  const states =
    scrapeResult.logic.stateVariables.length > 0
      ? scrapeResult.logic.stateVariables.slice(0, 5).join(", ")
      : "activeTab, query, isLoading";
  const colors =
    scrapeResult.styles.colors.length > 0
      ? scrapeResult.styles.colors.slice(0, 5).join(", ")
      : "#1a73e8, #000000, #ffffff";

  return `You are an expert design systems engineer implementing features according to the ${name} specification.
Reference the design tokens: ${colors}.
${langs.length ? `Implement code using idiomatic patterns for: ${langs.join(", ")}.\n` : ""}Maintain the component state model: ${states}.
Implement complete, un-truncated React + Tailwind code.`;
}

/**
 * Heuristic Synthesizer (Zero-Cost Mode)
 */
export function heuristicSynthesizeSkill(scrapeResult: ScrapeResult): UniversalSkill {
  const parsedUrl = new URL(scrapeResult.targetUrl);
  const hostParts = parsedUrl.hostname.replace(/^www\./, "").split(".");
  const domainSlug = hostParts[0].toLowerCase().replace(/[^a-z0-9]/g, "_");
  const pathParts = parsedUrl.pathname
    .split("/")
    .filter(Boolean)
    .map((p) => p.toLowerCase().replace(/[^a-z0-9]/g, "_"));

  const action = pathParts.length > 0 ? pathParts.join("_") : "skill";
  const name = sanitizeSkillName(`${domainSlug}_${action}`);
  const title = scrapeResult.title || `${domainSlug} Engine`;

  const skillMd = buildFallbackSkillMd(name, title, scrapeResult);
  const componentCode = buildFallbackComponent(name, scrapeResult);

  return {
    name,
    title,
    description: `Universal skill specifying visual design system tokens, interactive logic, and component architecture extracted from ${title}.`,
    targetUrl: scrapeResult.targetUrl,
    skillMd,
    componentCode,
    styles: scrapeResult.styles,
    logic: scrapeResult.logic,
    languages: scrapeResult.languages || scrapeResult.logic.languages || [],
    modelPrompts: {
      gemini: buildGeminiPrompt(name, title, scrapeResult),
      chatgpt: buildChatGptPrompt(name, title, scrapeResult),
      cursor: buildCursorRules(name, title, scrapeResult),
      claude: buildClaudePrompt(name, title, scrapeResult),
    },
    rawMarkdownSnippet: scrapeResult.markdown.slice(0, 1500),
    crawledPages: scrapeResult.crawledPages,
    frameworks: scrapeResult.logic.frameworks,
  };
}

/**
 * Main generator entry point with multi-provider routing
 */
export async function generateUniversalSkill(
  scrapeResult: ScrapeResult,
  options: {
    groqApiKey?: string;
    geminiApiKey?: string;
    preferredLlm?: "groq" | "gemini" | "auto";
  }
): Promise<UniversalSkill> {
  const groqKey = options.groqApiKey?.trim() || process.env.GROQ_API_KEY?.trim();
  const geminiKey = options.geminiApiKey?.trim() || process.env.GEMINI_API_KEY?.trim();

  const frameworksText = scrapeResult.logic.frameworks?.join(", ") || "Vanilla / Standard Web";
  const crawledPagesText = scrapeResult.crawledPages?.length
    ? `${scrapeResult.crawledPages.length} pages explored:\n` +
      scrapeResult.crawledPages
        .map((p) => `  - ${p.title} (${p.url}) [Depth ${p.depth}]`)
        .join("\n")
    : "Single landing page";

  const formsText = scrapeResult.logic.forms?.length
    ? scrapeResult.logic.forms
        .map(
          (f) =>
            `  - ${f.method} ${f.action}: fields [${f.fields.map((fd) => `${fd.name}${fd.required ? "*" : ""} (${fd.type})`).join(", ")}]`
        )
        .join("\n")
    : "None";

  const promptContent = `Target URL: ${scrapeResult.targetUrl}
Page Title: ${scrapeResult.title || "Unknown"}
Page Description: ${scrapeResult.description || "N/A"}
Detected Frameworks & Libraries: ${frameworksText}
Detected Programming Languages & Code Stacks: ${scrapeResult.languages?.join(", ") || scrapeResult.logic.languages?.join(", ") || "Standard Web (TypeScript, JavaScript, HTML, CSS)"}
Crawled Site Architecture:
${crawledPagesText}

Extracted Styles:
- Colors: ${scrapeResult.styles.colors.join(", ")}
- Fonts: ${scrapeResult.styles.fonts.join(", ")}
- CSS Variables: ${JSON.stringify(scrapeResult.styles.cssVariables)}
- Tailwind Utility Classes: ${scrapeResult.styles.tailwindClasses.slice(0, 30).join(" ")}
- Layout Patterns: ${scrapeResult.styles.layoutPatterns.join(", ")}
- Animations & Effects: ${scrapeResult.styles.animations?.join(", ") || "Standard transitions"}
- Shadows: ${scrapeResult.styles.shadows?.join(", ") || "Standard"}
- Radii: ${scrapeResult.styles.radii?.join(", ") || "Standard"}
- Media Queries: ${scrapeResult.styles.mediaQueries?.join(", ") || "Responsive"}

Extracted Logic:
- State Variables: ${scrapeResult.logic.stateVariables.join(", ")}
- Event Handlers: ${scrapeResult.logic.eventHandlers.join(", ")}
- Interactive Elements: ${scrapeResult.logic.interactiveElements.join(", ")}
- Forms & Validation:
${formsText}
- API Endpoints: ${scrapeResult.logic.apiEndpoints.join(", ")}

Scraped Content Markdown:
${scrapeResult.markdown.slice(0, 15000)}

Formulate a production-grade SKILL.md and React+Tailwind component capturing both the styles, multi-page architecture, and logic. Output strict JSON.`;

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
        return parseAndNormalizeOutput(responseText, scrapeResult.targetUrl, scrapeResult);
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
            return parseAndNormalizeOutput(responseText, scrapeResult.targetUrl, scrapeResult);
          }
        } catch {}
      }
    } catch (err) {
      console.warn("Gemini generation failed, falling back to heuristic:", err);
    }
  }

  // Zero-cost Heuristic Fallback
  return heuristicSynthesizeSkill(scrapeResult);
}
