export interface ExtractedStyles {
  colors: string[];
  fonts: string[];
  cssVariables: Record<string, string>;
  tailwindClasses: string[];
  layoutPatterns: string[];
  rawStylesSummary?: string;
}

export interface ExtractedLogic {
  stateVariables: string[];
  eventHandlers: string[];
  interactiveElements: string[];
  apiEndpoints: string[];
  formActions: string[];
  rawLogicSummary?: string;
}

export interface ModelPrompts {
  gemini: string;       // Google Gemini System Instruction & Persona
  chatgpt: string;      // OpenAI Custom GPT / System prompt
  cursor: string;       // .cursorrules / Windsurf rules format
  claude: string;       // Claude Project prompt
}

export interface UniversalSkill {
  id?: string;
  name: string;                         // kebab-case or snake-case skill identifier
  title: string;                        // Human-readable title
  description: string;                  // Instruction-dense description
  targetUrl: string;
  skillMd: string;                      // Canonical SKILL.md with YAML frontmatter
  componentCode: string;                // Production React + Tailwind component (TSX)
  styles: ExtractedStyles;
  logic: ExtractedLogic;
  modelPrompts: ModelPrompts;
  rawMarkdownSnippet?: string;
  createdAt?: string;
}

export interface GenerationStepUpdate {
  step: 1 | 2 | 3 | 4;
  status: "pending" | "active" | "completed" | "error";
  message: string;
  details?: string;
  result?: UniversalSkill;
  error?: string;
}

export interface ApiKeysConfig {
  groqApiKey?: string;
  geminiApiKey?: string;
  firecrawlApiKey?: string;
  preferredLlm: "groq" | "gemini" | "auto";
}
