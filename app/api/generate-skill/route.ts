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

          // STEP 1: Scraping target URL & exploring routes/stylesheets...
          await sendUpdate({
            step: 1,
            status: "active",
            message: isDeepCrawl
              ? "Deep crawling website & mapping route architecture..."
              : "Scraping target URL & extracting styles + scripts...",
            details: isDeepCrawl
              ? `Discovering internal routes, documentation, and external CSS (Depth: ${crawlDepth})...`
              : firecrawlApiKey
              ? "Connecting via Firecrawl engine..."
              : "Analyzing HTML DOM, stylesheets, and scripts...",
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
                  ? `Deep crawling (${progress.current}/${progress.total} pages)...`
                  : "Inspecting styles and logic...",
                details: progress.stage || `Scanning ${progress.currentUrl}`,
              });
            },
          });

          const pagesCount = scrapeResult.crawledPages?.length || 1;
          await sendUpdate({
            step: 1,
            status: "completed",
            message: isDeepCrawl
              ? `Explored ${pagesCount} pages across site architecture`
              : "Page content, styles, and scripts retrieved",
            details: `Found ${scrapeResult.styles.colors.length} colors, ${scrapeResult.styles.tailwindClasses.length} utility classes, and ${scrapeResult.logic.frameworks?.join(", ") || "Vanilla Web"}`,
          });

          // STEP 2: Analyzing visual design system & interactive logic...
          await sendUpdate({
            step: 2,
            status: "active",
            message: "Analyzing visual design system & interactive logic...",
            details: "Formulating typography hierarchy, color palette, layout rules, and event flows...",
          });

          await new Promise((r) => setTimeout(r, 300));

          await sendUpdate({
            step: 2,
            status: "completed",
            message: "Design tokens and interactive state flow analyzed",
            details: `Identified ${scrapeResult.styles.layoutPatterns.join(", ") || "Component layouts"}`,
          });

          // STEP 3: Synthesizing universal SKILL.md for all AI models (Gemini, GPT, Claude)...
          await sendUpdate({
            step: 3,
            status: "active",
            message: "Synthesizing universal SKILL.md for all AI models (Gemini, GPT, Claude)...",
            details: "Constructing canonical YAML frontmatter, design specifications, and model directives...",
          });

          const skillResponse = await generateUniversalSkill(scrapeResult, {
            groqApiKey,
            geminiApiKey,
            preferredLlm,
          });

          // Attach deep crawl metadata to response
          if (scrapeResult.crawledPages && scrapeResult.crawledPages.length > 0) {
            skillResponse.crawledPages = scrapeResult.crawledPages;
          }
          if (scrapeResult.logic.frameworks && scrapeResult.logic.frameworks.length > 0) {
            skillResponse.frameworks = scrapeResult.logic.frameworks;
          }
          const detectedLanguages = scrapeResult.languages || scrapeResult.logic.languages;
          if (detectedLanguages && detectedLanguages.length > 0 && (!skillResponse.languages || skillResponse.languages.length === 0)) {
            skillResponse.languages = detectedLanguages;
          }

          await sendUpdate({
            step: 3,
            status: "completed",
            message: `Synthesized skill: "${skillResponse.name}"`,
            details: `Complete with YAML frontmatter, design tokens, and ${skillResponse.languages?.length || 0} detected languages`,
          });

          // STEP 4: Compiling component code & cross-model adapters...
          await sendUpdate({
            step: 4,
            status: "active",
            message: "Compiling component code & cross-model adapters...",
            details: "Building React + Tailwind TSX component and export prompts for Gemini, Cursor, ChatGPT, and Claude...",
          });

          await sendUpdate({
            step: 4,
            status: "completed",
            message: "Universal SKILL.md package ready!",
            details: "Compatible with Google Gemini, ChatGPT, Cursor, and Claude",
            result: skillResponse,
          });
        } catch (err: any) {
          console.error("Error in skill generation:", err);
          await sendUpdate({
            step: 4,
            status: "error",
            message: "Failed to synthesize universal skill",
            error: err.message || "An unexpected error occurred during synthesis.",
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
    const skillResponse = await generateUniversalSkill(scrapeResult, {
      groqApiKey,
      geminiApiKey,
      preferredLlm,
    });

    if (scrapeResult.crawledPages && scrapeResult.crawledPages.length > 0) {
      skillResponse.crawledPages = scrapeResult.crawledPages;
    }
    if (scrapeResult.logic.frameworks && scrapeResult.logic.frameworks.length > 0) {
      skillResponse.frameworks = scrapeResult.logic.frameworks;
    }
    const detectedLanguages = scrapeResult.languages || scrapeResult.logic.languages;
    if (detectedLanguages && detectedLanguages.length > 0 && (!skillResponse.languages || skillResponse.languages.length === 0)) {
      skillResponse.languages = detectedLanguages;
    }

    return NextResponse.json(skillResponse);
  } catch (error: any) {
    console.error("API error /api/generate-skill:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
