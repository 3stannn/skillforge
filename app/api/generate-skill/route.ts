import { NextRequest, NextResponse } from "next/server";
import { scrapeTargetUrl } from "@/lib/scraper";
import { generateUniversalSkill } from "@/lib/generator";
import { prisma } from "@/lib/db";
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
          // STEP 1: Scraping target URL & extracting styles + scripts...
          await sendUpdate({
            step: 1,
            status: "active",
            message: "Scraping target URL & extracting styles + scripts...",
            details: firecrawlApiKey
              ? "Connecting via Firecrawl engine..."
              : "Analyzing HTML DOM, stylesheets, and scripts...",
          });

          const scrapeResult = await scrapeTargetUrl(url, firecrawlApiKey);

          await sendUpdate({
            step: 1,
            status: "completed",
            message: "Page content, styles, and scripts retrieved",
            details: `Found ${scrapeResult.styles.colors.length} color tokens, ${scrapeResult.styles.tailwindClasses.length} utility classes, and ${scrapeResult.logic.stateVariables.length} state items`,
          });

          // STEP 2: Analyzing visual design system & interactive logic...
          await sendUpdate({
            step: 2,
            status: "active",
            message: "Analyzing visual design system & interactive logic...",
            details: "Formulating typography hierarchy, color palette, layout rules, and event flows...",
          });

          await new Promise((r) => setTimeout(r, 400));

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

          await sendUpdate({
            step: 3,
            status: "completed",
            message: `Synthesized skill: "${skillResponse.name}"`,
            details: `Complete with YAML frontmatter, design tokens, and logic rules`,
          });

          // STEP 4: Compiling component code & cross-model adapters...
          await sendUpdate({
            step: 4,
            status: "active",
            message: "Compiling component code & cross-model adapters...",
            details: "Building React + Tailwind TSX component and export prompts for Gemini, Cursor, ChatGPT, and Claude...",
          });

          // Save to SQLite via Prisma
          try {
            const saved = await prisma.generatedSkill.create({
              data: {
                url: skillResponse.targetUrl,
                title: skillResponse.title || skillResponse.name,
                skillName: skillResponse.name,
                description: skillResponse.description,
                skillMd: skillResponse.skillMd,
                componentCode: skillResponse.componentCode,
                stylesJson: JSON.stringify(skillResponse.styles),
                logicJson: JSON.stringify(skillResponse.logic),
                promptsJson: JSON.stringify(skillResponse.modelPrompts),
                markdownSnippet: skillResponse.rawMarkdownSnippet || "",
              },
            });
            skillResponse.id = saved.id;
            skillResponse.createdAt = saved.createdAt.toISOString();
          } catch (dbErr) {
            console.warn("Failed to persist skill to database:", dbErr);
          }

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
    const scrapeResult = await scrapeTargetUrl(url, firecrawlApiKey);
    const skillResponse = await generateUniversalSkill(scrapeResult, {
      groqApiKey,
      geminiApiKey,
      preferredLlm,
    });

    try {
      const saved = await prisma.generatedSkill.create({
        data: {
          url: skillResponse.targetUrl,
          title: skillResponse.title || skillResponse.name,
          skillName: skillResponse.name,
          description: skillResponse.description,
          skillMd: skillResponse.skillMd,
          componentCode: skillResponse.componentCode,
          stylesJson: JSON.stringify(skillResponse.styles),
          logicJson: JSON.stringify(skillResponse.logic),
          promptsJson: JSON.stringify(skillResponse.modelPrompts),
          markdownSnippet: skillResponse.rawMarkdownSnippet || "",
        },
      });
      skillResponse.id = saved.id;
      skillResponse.createdAt = saved.createdAt.toISOString();
    } catch (dbErr) {
      console.warn("Database save error:", dbErr);
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
