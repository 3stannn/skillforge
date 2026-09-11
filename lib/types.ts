export interface ExtractedStyles {
  colors: string[];
  fonts: string[];
  cssVariables: Record<string, string>;
  tailwindClasses: string[];
  layoutPatterns: string[];
  animations?: string[];
  shadows?: string[];
  radii?: string[];
  mediaQueries?: string[];
  rawStylesSummary?: string;
}

export interface ExtractedFormField {
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  pattern?: string;
}

export interface ExtractedForm {
  action: string;
  method: string;
  fields: ExtractedFormField[];
}

export interface ExtractedLogic {
  stateVariables: string[];
  eventHandlers: string[];
  interactiveElements: string[];
  apiEndpoints: string[];
  formActions: string[];
  forms?: ExtractedForm[];
  frameworks?: string[];
  navigationRoutes?: string[];
  rawLogicSummary?: string;
}

export interface CrawledPageSummary {
  url: string;
  title: string;
  depth: number;
  wordCount: number;
  statusCode?: number;
}

export interface CrawlOptions {
  crawlDepth?: number;
  maxPages?: number;
  fetchExternalCss?: boolean;
  onProgress?: (update: {
    current: number;
    total: number;
    currentUrl: string;
    pageTitle?: string;
    stage?: string;
  }) => Promise<void> | void;
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
  crawledPages?: CrawledPageSummary[];
  frameworks?: string[];
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
  defaultCrawlDepth?: number;
  maxCrawlPages?: number;
}

