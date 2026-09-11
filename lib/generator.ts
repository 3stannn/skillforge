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
   - ## Visual Design System & Styling Tokens (exact color codes, typography hierarchy, layout rules, Tailwind classes, and visual effects like glassmorphism or shadows)
   - ## Interactive Logic & State Architecture (state variables, event handlers, formulas/calculations, user interaction loops, and API contracts)
   - ## Production Implementation Guidelines
   - ## Multi-Model Directives (instructions for Gemini, ChatGPT, Cursor, Claude)
3. Construct a standalone, copy-pasteable React + TypeScript + Tailwind CSS component ("componentCode") that faithfully recreates the extracted styles and interactive logic.
4. Construct tailored instructions for:
   - "gemini": Google Gemini System Instructions & Persona
   - "chatgpt": OpenAI Custom GPT Instructions
   - "cursor": .cursorrules / Windsurf Agent Rules format
   - "claude": Claude Project Instructions

You MUST return ONLY a valid JSON object with this exact structure:
{
  "name": "snake_case_name",
  "title": "Human Readable Title",
  "description": "Comprehensive instruction-dense summary of when and how an AI model should apply this skill.",
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
    description: parsed.description || `Specialized skill implementing the design system and logic of ${scrapeResult.title}.`,
    targetUrl,
    skillMd: parsed.skillMd || buildFallbackSkillMd(name, parsed.title || scrapeResult.title, scrapeResult),
    componentCode: parsed.componentCode || buildFallbackComponent(name, scrapeResult),
    styles: {
      colors: parsed.styles?.colors || scrapeResult.styles.colors,
      fonts: parsed.styles?.fonts || scrapeResult.styles.fonts,
      cssVariables: parsed.styles?.cssVariables || scrapeResult.styles.cssVariables,
      tailwindClasses: parsed.styles?.tailwindClasses || scrapeResult.styles.tailwindClasses,
      layoutPatterns: parsed.styles?.layoutPatterns || scrapeResult.styles.layoutPatterns,
      rawStylesSummary: parsed.styles?.rawStylesSummary || scrapeResult.styles.rawStylesSummary,
    },
    logic: {
      stateVariables: parsed.logic?.stateVariables || scrapeResult.logic.stateVariables,
      eventHandlers: parsed.logic?.eventHandlers || scrapeResult.logic.eventHandlers,
      interactiveElements: parsed.logic?.interactiveElements || scrapeResult.logic.interactiveElements,
      apiEndpoints: parsed.logic?.apiEndpoints || scrapeResult.logic.apiEndpoints,
      formActions: parsed.logic?.formActions || scrapeResult.logic.formActions,
      rawLogicSummary: parsed.logic?.rawLogicSummary || scrapeResult.logic.rawLogicSummary,
    },
    modelPrompts: {
      gemini: parsed.modelPrompts?.gemini || buildGeminiPrompt(name, parsed.title, scrapeResult),
      chatgpt: parsed.modelPrompts?.chatgpt || buildChatGptPrompt(name, parsed.title, scrapeResult),
      cursor: parsed.modelPrompts?.cursor || buildCursorRules(name, parsed.title, scrapeResult),
      claude: parsed.modelPrompts?.claude || buildClaudePrompt(name, parsed.title, scrapeResult),
    },
    rawMarkdownSnippet: scrapeResult.markdown.slice(0, 1500),
  };
}

/**
 * Fallback Component Builder
 */
export function buildFallbackComponent(name: string, scrapeResult: ScrapeResult): string {
  const compName = name
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const colors = scrapeResult.styles.colors.slice(0, 5);
  const primaryColor = colors[0] || "#06b6d4";
  const stateVars = scrapeResult.logic.stateVariables.slice(0, 4);

  return `"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";

/**
 * ${compName}
 * Reconstructed React component capturing the design system and logic of:
 * ${scrapeResult.targetUrl}
 */
export default function ${compName}() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAction = async () => {
    setIsLoading(true);
    // Simulating interactive logic extracted from target site
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
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

        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          {["overview", "inspect", "actions"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={\`px-3 py-1.5 rounded-lg capitalize font-medium transition-all \${
                activeTab === tab
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs"
                  : "text-zinc-400 hover:text-zinc-200"
              }\`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Style Tokens Card */}
        <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Extracted Style Tokens
          </h3>
          <div className="flex flex-wrap gap-2">
            {${JSON.stringify(colors)}.map((color, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs font-mono bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State & Logic Card */}
        <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Interactive Logic Controller
          </h3>
          <div className="space-y-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Test input or parameter..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={handleAction}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 transition-all disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
              <span>Execute Action</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
}

export function buildFallbackSkillMd(name: string, title: string, scrapeResult: ScrapeResult): string {
  const colors = scrapeResult.styles.colors.slice(0, 8);
  const tailwind = scrapeResult.styles.tailwindClasses.slice(0, 20);
  const states = scrapeResult.logic.stateVariables.slice(0, 8);
  const events = scrapeResult.logic.eventHandlers.slice(0, 8);
  const endpoints = scrapeResult.logic.apiEndpoints.slice(0, 5);

  return `---
name: ${name}
description: |
  Specialized skill extracting the design system, visual style tokens, interactive state logic,
  and behavioral contracts from ${title || scrapeResult.targetUrl}. Use when designing, building, or refactoring
  features to match this exact aesthetic and interactive flow.
---

# ${title || name}

> **Source URL**: [${scrapeResult.targetUrl}](${scrapeResult.targetUrl})  
> **Extraction Engine**: SkillForge Multi-Model Synthesizer

---

## 1. Executive Summary & Use Cases
This skill provides an authoritative blueprint of the visual design system and functional logic extracted from **${title}**.
Any modern AI model (Gemini, ChatGPT, Cursor, Claude) should use this specification to:
- Faithfully reproduce the component layout and user interaction flows.
- Implement matching color palettes, typography scales, and Tailwind CSS utility rules.
- Maintain consistent state transitions, input validation, and asynchronous handlers.

---

## 2. Visual Design System & Styling Tokens

### Color Palette
| Token | Hex / HSL | Application |
| :--- | :--- | :--- |
${colors.map((c, i) => `| \`color-${i + 1}\` | \`${c}\` | ${i === 0 ? "Primary accent" : i === 1 ? "Background / Surface" : "Content / Border"} |`).join("\n")}

### Typography & Fonts
- **Font Families**: ${scrapeResult.styles.fonts.join(", ") || "Inter, system-ui, sans-serif"}
- **Hierarchy**:
  - Headings: Bold / ExtraBold, tracking-tight
  - Body: Regular / Medium text-sm with leading-relaxed
  - Code / Tokens: Monospace font-mono text-xs

### Layout & Utility Classes
- **Layout Paradigms**: ${scrapeResult.styles.layoutPatterns.join(", ") || "Flexbox, CSS Grid, Responsive Containers"}
- **Primary Tailwind Classes**:
  \`\`\`css
  ${tailwind.join(" ")}
  \`\`\`

---

## 3. Interactive Logic & State Architecture

### Core State Variables
${states.length > 0 ? states.map((s) => `- \`${s}\``).join("\n") : "- `query: string` (User search or filter input)\n- `isLoading: boolean` (Asynchronous loading state)\n- `activeTab: string` (Current view mode)"}

### Event Handlers & User Workflows
${events.length > 0 ? events.map((e) => `- \`${e}\``).join("\n") : "- `onSubmit(event)`: Handles user submissions and parameter validation.\n- `onFilterChange(value)`: Triggers re-computation or data fetching.\n- `onReset()`: Restores initial component state."}

${endpoints.length > 0 ? `### Connected Endpoints & APIs\n${endpoints.map((ep) => `- \`${ep}\``).join("\n")}` : ""}

---

## 4. Universal AI Model Directives

### For Google Gemini
- Ground code generation in the CSS variables and Tailwind classes documented above.
- Ensure strict TypeScript typing and explicit component props interfaces.

### For OpenAI ChatGPT
- Apply the color tokens and state machines when generating UI or backend handlers.
- Prefer modular hooks for managing state variables.

### For Cursor & Windsurf
- Reference this skill when generating pages or components within this workspace.
- Adhere to the declared utility classes and avoid ad-hoc styling.

### For Anthropic Claude
- Use the structural layout patterns and design constraints outlined in Section 2.
`;
}

function buildGeminiPrompt(name: string, title: string, scrapeResult: ScrapeResult): string {
  return `You are a Senior Frontend Architect and Gemini Coding Assistant specialized in the "${name}" skill.
When writing code or answering queries related to ${title || scrapeResult.targetUrl}:
1. Use these primary colors: ${scrapeResult.styles.colors.slice(0, 5).join(", ")}.
2. Use Tailwind utility classes matching: ${scrapeResult.styles.tailwindClasses.slice(0, 15).join(" ")}.
3. Enforce the state management pattern: ${scrapeResult.logic.stateVariables.slice(0, 5).join(", ")}.
4. Always produce clean, typed TypeScript and modern React components.`;
}

function buildChatGptPrompt(name: string, title: string, scrapeResult: ScrapeResult): string {
  return `Role: Expert UI/UX & Full-Stack Engineer implementing ${title}.
Instructions:
- Maintain strict design fidelity with ${scrapeResult.targetUrl}.
- Primary palette: ${scrapeResult.styles.colors.slice(0, 4).join(", ")}.
- Ensure all interactive handlers (${scrapeResult.logic.eventHandlers.slice(0, 4).join(", ")}) handle loading and error boundaries gracefully.`;
}

function buildCursorRules(name: string, title: string, scrapeResult: ScrapeResult): string {
  return `# .cursorrules for ${name}
# Source: ${scrapeResult.targetUrl}

- Design System Colors: ${scrapeResult.styles.colors.slice(0, 5).join(", ")}
- Typography: ${scrapeResult.styles.fonts.join(", ") || "sans-serif"}
- Core Layout Classes: ${scrapeResult.styles.tailwindClasses.slice(0, 10).join(" ")}
- When creating UI components matching ${title}, preserve this state flow:
  ${scrapeResult.logic.stateVariables.slice(0, 5).join(", ")}
`;
}

function buildClaudePrompt(name: string, title: string, scrapeResult: ScrapeResult): string {
  return `You are an expert design systems engineer implementing features according to the ${name} specification.
Reference the design tokens: ${scrapeResult.styles.colors.slice(0, 5).join(", ")}.
Maintain the component state model: ${scrapeResult.logic.stateVariables.slice(0, 5).join(", ")}.
Implement complete, un-truncated React + Tailwind code.`;
}

/**
 * Heuristic Synthesizer (Zero-Cost Mode)
 */
export function heuristicSynthesizeSkill(
  scrapeResult: ScrapeResult
): UniversalSkill {
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
    modelPrompts: {
      gemini: buildGeminiPrompt(name, title, scrapeResult),
      chatgpt: buildChatGptPrompt(name, title, scrapeResult),
      cursor: buildCursorRules(name, title, scrapeResult),
      claude: buildClaudePrompt(name, title, scrapeResult),
    },
    rawMarkdownSnippet: scrapeResult.markdown.slice(0, 1500),
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

  const promptContent = `Target URL: ${scrapeResult.targetUrl}
Page Title: ${scrapeResult.title || "Unknown"}
Page Description: ${scrapeResult.description || "N/A"}

Extracted Styles:
- Colors: ${scrapeResult.styles.colors.join(", ")}
- Fonts: ${scrapeResult.styles.fonts.join(", ")}
- CSS Variables: ${JSON.stringify(scrapeResult.styles.cssVariables)}
- Tailwind Utility Classes: ${scrapeResult.styles.tailwindClasses.slice(0, 30).join(" ")}
- Layout Patterns: ${scrapeResult.styles.layoutPatterns.join(", ")}

Extracted Logic:
- State Variables: ${scrapeResult.logic.stateVariables.join(", ")}
- Event Handlers: ${scrapeResult.logic.eventHandlers.join(", ")}
- Interactive Elements: ${scrapeResult.logic.interactiveElements.join(", ")}
- API Endpoints: ${scrapeResult.logic.apiEndpoints.join(", ")}

Scraped Content Markdown:
${scrapeResult.markdown.slice(0, 15000)}

Formulate a production-grade SKILL.md and React+Tailwind component capturing both the styles and logic. Output strict JSON.`;

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
