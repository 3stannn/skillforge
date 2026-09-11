import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { UniversalSkill } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const records = await prisma.generatedSkill.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const skills: UniversalSkill[] = records.map((rec) => {
      let styles: any = { colors: [], fonts: [], cssVariables: {}, tailwindClasses: [], layoutPatterns: [] };
      let logic: any = { stateVariables: [], eventHandlers: [], interactiveElements: [], apiEndpoints: [], formActions: [] };
      let modelPrompts: any = { gemini: "", chatgpt: "", cursor: "", claude: "" };

      try {
        styles = JSON.parse(rec.stylesJson);
      } catch {}
      try {
        logic = JSON.parse(rec.logicJson);
      } catch {}
      try {
        modelPrompts = JSON.parse(rec.promptsJson);
      } catch {}

      return {
        id: rec.id,
        name: rec.skillName,
        title: rec.title || rec.skillName,
        description: rec.description,
        targetUrl: rec.url,
        skillMd: rec.skillMd,
        componentCode: rec.componentCode,
        styles,
        logic,
        modelPrompts,
        rawMarkdownSnippet: rec.markdownSnippet || undefined,
        createdAt: rec.createdAt.toISOString(),
      };
    });

    return NextResponse.json({ skills });
  } catch (error: any) {
    console.warn("Failed to fetch skills history (database may be unconfigured in serverless):", error);
    return NextResponse.json({ skills: [], warning: "Database unavailable or read-only" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing skill ID" }, { status: 400 });
    }

    await prisma.generatedSkill.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
