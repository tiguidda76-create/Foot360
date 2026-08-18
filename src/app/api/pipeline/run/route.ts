import { NextResponse } from "next/server";
import { multiAgentOrchestrator } from "@/agents/orchestrator";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const category = body.category;

    console.log(`[API /api/pipeline/run] Triggering Multi-Agent Pipeline (Category: ${category || "RANDOM"})...`);

    const result = await multiAgentOrchestrator.runPipeline(category);

    return NextResponse.json({
      success: result.success,
      slug: result.slug,
      title: result.title,
      complianceScore: result.complianceScore,
      rumorTier: result.rumorTier,
      logs: result.logs,
    });
  } catch (error: any) {
    console.error("[API /api/pipeline/run] Pipeline execution error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to execute pipeline",
      },
      { status: 500 }
    );
  }
}
