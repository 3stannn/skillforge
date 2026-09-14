import { NextRequest, NextResponse } from "next/server";
import { scrapeTargetUrl } from "@/lib/scraper";
import { generateUniversalSkill } from "@/lib/generator";
import { GenerationStepUpdate } from "@/lib/types";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

interface GenerateSkillRequestBody {
  url: string;
  firecrawlApiKey?: string;
  groqApiKey?: string;
  geminiApiKey?: string;
  preferredLlm?: "groq" | "gemini" | "auto";
  stream?: boolean;
  crawlDepth?: number;
  maxPages?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateSkillRequestBody;
    const {
      url,
      firecrawlApiKey,
      groqApiKey,
      geminiApiKey,
      preferredLlm = "auto",
      stream = true,
      crawlDepth = 0,
      maxPages = 5,
    } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid target URL is required." },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format. Please include http:// or https://" },
        { status: 400 }
      );
    }

    if (stream) {
      const responseStream = new TransformStream();
      const writer = responseStream.writable.getWriter();
      const encoder = new TextEncoder();

      const sendUpdate = async (update: GenerationStepUpdate) => {
        const payload = `data: ${JSON.stringify(update)}\n\n`;
        await writer.write(encoder.encode(payload));
      };

      (async () => {
        try {
          const isDeepCrawl = (crawlDepth ?? 0) > 0;

          // STEP 1: Exploring target URL & crawling page structure...
          await sendUpdate({
            step: 1,
            status: "active",
            message: isDeepCrawl
              ? "Exploring website hierarchy & crawling sub-pages..."
              : "Exploring target URL & fetching stylesheets...",
            details: isDeepCrawl
              ? `Discovering internal routes, external CSS, and page components (Depth: ${crawlDepth})...`
              : firecrawlApiKey
              ? "Connecting via Firecrawl engine..."
              : "Analyzing HTML DOM, stylesheets, and computed styles...",
          });

          const scrapeResult = await scrapeTargetUrl(url, firecrawlApiKey, {
            crawlDepth,
            maxPages,
            fetchExternalCss: true,
            onProgress: async (progress) => {
              await sendUpdate({
                step: 1,
                status: "active",
                message: isDeepCrawl
                  ? `Exploring site (${progress.current}/${progress.total} pages)...`
                  : "Inspecting styles and DOM...",
                details: progress.stage || `Scanning ${progress.currentUrl}`,
              });
            },
          });

          const pagesCount = scrapeResult.crawledPages?.length || 1;
          await sendUpdate({
            step: 1,
            status: "completed",
            message: isDeepCrawl
              ? `Explored ${pagesCount} pages across site hierarchy`
              : "Target page and external stylesheets retrieved",
            details: `Found ${scrapeResult.styles.colors.length} color tokens, ${scrapeResult.styles.tailwindClasses.length} utility classes, and ${scrapeResult.logic.frameworks?.join(", ") || "standard web styles"}`,
          });

          // STEP 2: Extracting design tokens, colors & typography...
          await sendUpdate({
            step: 2,
            status: "active",
            message: "Extracting design tokens, colors & typography hierarchy...",
            details: "Deriving semantic palette, typography scale, spacing, border radii, and shadows...",
          });

          await new Promise((r) => setTimeout(r, 300));

          await sendUpdate({
            step: 2,
            status: "completed",
            message: "Design tokens and semantic roles categorized",
            details: `Identified ${scrapeResult.styles.fonts.join(", ") || "Modern sans"} typefaces and structural layouts`,
          });

          // STEP 3: Synthesizing spec-compliant DESIGN.md with AI...
          await sendUpdate({
            step: 3,
            status: "active",
            message: "Synthesizing spec-compliant DESIGN.md (Google Stitch standard)...",
            details: "Formulating design principles, semantic roles, component specifications, and agent directives...",
          });

          const designResponse = await generateUniversalSkill(scrapeResult, {
            groqApiKey,
            geminiApiKey,
            preferredLlm,
          });

          // Attach deep crawl metadata to response
          if (scrapeResult.crawledPages && scrapeResult.crawledPages.length > 0) {
            designResponse.crawledPages = scrapeResult.crawledPages;
          }
          if (scrapeResult.logic.frameworks && scrapeResult.logic.frameworks.length > 0) {
            designResponse.frameworks = scrapeResult.logic.frameworks;
          }
          const detectedLanguages = scrapeResult.languages || scrapeResult.logic.languages;
          if (detectedLanguages && detectedLanguages.length > 0 && (!designResponse.languages || designResponse.languages.length === 0)) {
            designResponse.languages = detectedLanguages;
          }

          await sendUpdate({
            step: 3,
            status: "completed",
            message: `Synthesized DESIGN.md for "${designResponse.title}"`,
            details: `Structured with ${designResponse.semanticColors.length} semantic colors and ${designResponse.typographyScale.length} type scale levels`,
          });

          // STEP 4: Compiling Tailwind tokens, CSS variables & live specimens...
          await sendUpdate({
            step: 4,
            status: "active",
            message: "Compiling Tailwind tokens, CSS variables & live specimens...",
            details: "Generating Tailwind v4/v3 theme configs, CSS custom properties, and interactive preview specimens...",
          });

          await sendUpdate({
            step: 4,
            status: "completed",
            message: "DESIGN.md & design tokens package ready!",
            details: "Ready for Cursor, Claude Code, v0, Lovable, and human developers",
            result: designResponse,
          });
        } catch (err: any) {
          console.error("Error in design generation:", err);
          await sendUpdate({
            step: 4,
            status: "error",
            message: "Failed to synthesize DESIGN.md",
            error: err.message || "An unexpected error occurred during design extraction.",
          });
        } finally {
          await writer.close();
        }
      })();

      return new Response(responseStream.readable, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    // Non-streaming fallback
    const scrapeResult = await scrapeTargetUrl(url, firecrawlApiKey, {
      crawlDepth,
      maxPages,
      fetchExternalCss: true,
    });
    const designResponse = await generateUniversalSkill(scrapeResult, {
      groqApiKey,
      geminiApiKey,
      preferredLlm,
    });

    if (scrapeResult.crawledPages && scrapeResult.crawledPages.length > 0) {
      designResponse.crawledPages = scrapeResult.crawledPages;
    }
    if (scrapeResult.logic.frameworks && scrapeResult.logic.frameworks.length > 0) {
      designResponse.frameworks = scrapeResult.logic.frameworks;
    }
    const detectedLanguages = scrapeResult.languages || scrapeResult.logic.languages;
    if (detectedLanguages && detectedLanguages.length > 0 && (!designResponse.languages || designResponse.languages.length === 0)) {
      designResponse.languages = detectedLanguages;
    }

    return NextResponse.json(designResponse);
  } catch (error: any) {
    console.error("API error /api/generate-skill:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
