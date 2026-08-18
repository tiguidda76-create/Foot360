import { multiAgentOrchestrator } from "./orchestrator";

// Default interval: every 15 minutes in dev, configurable via INTERVAL_MINUTES env var
const INTERVAL_MINUTES = parseInt(process.env.AUTO_PUBLISH_INTERVAL_MINUTES || "15", 10);
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

async function runAutonomousCycle() {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n[${timestamp}] 🤖 [AutoPublisher Daemon] Initiating autonomous Multi-Agent cycle...`);

  try {
    const result = await multiAgentOrchestrator.runPipeline();
    if (result.success) {
      console.log(`[${timestamp}] ✅ [AutoPublisher] Successfully published story: "${result.title}"`);
      console.log(`               Slug: /news/${result.slug}`);
      console.log(`               E-E-A-T Score: ${result.complianceScore}/100 | Tier: ${result.rumorTier ? `Tier ${result.rumorTier}` : "N/A"}`);
    } else {
      console.warn(`[${timestamp}] ⚠️ [AutoPublisher] Cycle skipped or no new verified items.`);
    }
  } catch (error) {
    console.error(`[${timestamp}] ❌ [AutoPublisher] Execution error:`, error);
  }

  console.log(`[AutoPublisher] Sleeping for ${INTERVAL_MINUTES} minutes until next autonomous cycle...`);
}

async function startDaemon() {
  console.log("=========================================================");
  console.log("⚽ FOOT360 FULLY AUTONOMOUS BACKGROUND PUBLISHER ⚽");
  console.log("=========================================================");
  console.log(`Interval: Every ${INTERVAL_MINUTES} minute(s)`);
  console.log("Press Ctrl+C to stop.\n");

  // Run immediate first cycle
  await runAutonomousCycle();

  // Schedule recurring intervals
  setInterval(runAutonomousCycle, INTERVAL_MS);
}

startDaemon().catch(console.error);
