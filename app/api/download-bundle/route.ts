import { NextRequest, NextResponse } from "next/server";
import { createSkillZipBundle } from "@/lib/exporter";
import { UniversalSkill } from "@/lib/types";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let skill: UniversalSkill = body.skill;

    if (!skill && body.id) {
      const rec = await prisma.generatedSkill.findUnique({
        where: { id: body.id },
      });
      if (rec) {
        skill = {
          id: rec.id,
          name: rec.skillName,
          title: rec.title || rec.skillName,
          description: rec.description,
          targetUrl: rec.url,
          skillMd: rec.skillMd,
          componentCode: rec.componentCode,
          styles: JSON.parse(rec.stylesJson),
          logic: JSON.parse(rec.logicJson),
          modelPrompts: JSON.parse(rec.promptsJson),
        };
      }
    }

    if (!skill || !skill.name) {
      return NextResponse.json({ error: "Skill payload is required" }, { status: 400 });
    }

    const zipBuffer = await createSkillZipBundle(skill);
    const fileName = `skill-${skill.name.replace(/_/g, "-")}.zip`;

    return new Response(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error: any) {
    console.error("Bundle download error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
