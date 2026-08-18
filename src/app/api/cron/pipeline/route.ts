import { NextResponse } from "next/server";
import { multiAgentOrchestrator } from "@/agents/orchestrator";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const authHeader = request.headers.get("authorization");

  const expectedSecret = process.env.CRON_SECRET || "foot360_secure_cron_secret_2026";

  // Validate secret or authorization header for Vercel Cron
  if (secret !== expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized Cron Trigger" }, { status: 401 });
  }

  try {
    console.log("[Vercel Cron] Autonomous European Football Multi-Agent Pipeline Triggered");
    const result = await multiAgentOrchestrator.runPipeline();

    return NextResponse.json({
      status: "CRON_COMPLETED",
      articleGenerated: result.success,
      slug: result.slug,
      complianceScore: result.complianceScore,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
