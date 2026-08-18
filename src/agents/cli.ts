import { multiAgentOrchestrator } from "./orchestrator";

async function main() {
  console.log("=================================================");
  console.log("⚽ FOOT360 AUTONOMOUS MULTI-AGENT PIPELINE CLI ⚽");
  console.log("=================================================\n");

  const category = process.argv[2];
  console.log(`Starting autonomous execution (Category: ${category || "RANDOM"})...\n`);

  const result = await multiAgentOrchestrator.runPipeline(category);

  console.log("\n================ PIPELINE LOGS ================");
  for (const log of result.logs) {
    const icon = log.status === "SUCCESS" ? "✅" : log.status === "WARNING" ? "⚠️" : "❌";
    console.log(`\n${icon} [${log.stage}] by ${log.agent}`);
    console.log(`   Timestamp: ${log.timestamp}`);
    console.log(`   Output:`, JSON.stringify(log.output, null, 2));
  }

  console.log("\n================ FINAL OUTCOME ================");
  if (result.success) {
    console.log(`🎉 Pipeline Succeeded!`);
    console.log(`   Article Slug: ${result.slug}`);
    console.log(`   Title: ${result.title}`);
    console.log(`   E-E-A-T Score: ${result.complianceScore}/100`);
    console.log(`   Rumor Tier: Tier ${result.rumorTier}`);
  } else {
    console.log(`❌ Pipeline failed. Check logs above.`);
  }
}

main().catch(console.error);
