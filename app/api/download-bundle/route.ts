import { NextRequest, NextResponse } from "next/server";
import { createSkillZipBundle } from "@/lib/exporter";
import { DesignSystemData } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const design: DesignSystemData = body.skill || body.design;

    if (!design || !design.name) {
      return NextResponse.json({ error: "Design system payload is required" }, { status: 400 });
    }

    const zipBuffer = await createSkillZipBundle(design);
    const fileName = `designmd-${design.name.replace(/_/g, "-")}.zip`;

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
