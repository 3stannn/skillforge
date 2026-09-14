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
  languages?: string[];
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
  claude: string;       // Claude Project / CLAUDE.md prompt
}

export interface SemanticColorToken {
  role: string;         // "primary" | "background" | "surface" | "text" | "muted" | "border" | "accent" | "danger" | "success"
  name: string;         // Human label, e.g. "Acid Lime", "Obsidian Canvas"
  hex: string;          // Hex color e.g. "#0f1011"
  usage: string;        // Where and how it is applied
}

export interface TypographyScaleItem {
  level: string;        // "display" | "h1" | "h2" | "h3" | "body" | "small" | "code"
  size: string;         // "48px"
  lineHeight: string;   // "1.2"
  weight: string;       // "600"
  letterSpacing?: string; // "-0.02em"
  sample?: string;      // Example specimen phrase
}

export interface ComponentSpecItem {
  name: string;
  description: string;
  variantDetails?: string;
}

export interface DesignSystemData {
  id?: string;
  name: string;                         // kebab-case or snake_case identifier
  title: string;                        // Human-readable brand / product title
  description: string;                  // Short design summary or tagline
  targetUrl: string;
  aestheticSummary?: string;            // Aesthetic description (e.g. "Midnight precision instrument")
  designMd: string;                     // Canonical Google Stitch / DesignMD document
  skillMd: string;                      // Backwards compatibility alias for designMd
  componentCode: string;                // Interactive React + Tailwind specimen TSX component
  specimenCode?: string;                // Explicit specimen component alias
  semanticColors: SemanticColorToken[];
  typographyScale: TypographyScaleItem[];
  primaryFont: string;
  headingFont: string;
  monoFont: string;
  spacingScale: string[];
  radiiScale: string[];
  shadowScale: string[];
  cssVariablesFormatted: string;        // Formatted CSS :root { ... }
  tailwindConfigFormatted: string;      // Formatted Tailwind v4 @theme / v3 config
  tokensJsonFormatted: string;          // W3C Design Tokens JSON format
  styles: ExtractedStyles;
  logic: ExtractedLogic;
  modelPrompts: ModelPrompts;
  rawMarkdownSnippet?: string;
  createdAt?: string;
  crawledPages?: CrawledPageSummary[];
  frameworks?: string[];
  languages?: string[];
}

/**
 * UniversalSkill alias for backwards compatibility across existing components
 */
export type UniversalSkill = DesignSystemData;

export interface GenerationStepUpdate {
  step: 1 | 2 | 3 | 4;
  status: "pending" | "active" | "completed" | "error";
  message: string;
  details?: string;
  result?: DesignSystemData;
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

