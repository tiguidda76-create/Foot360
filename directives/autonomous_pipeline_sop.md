# SOP: Autonomous Multi-Agent Football Intelligence Pipeline

## Objective
Provide reliable, E-E-A-T and Google AdSense compliant sports journalism across Europe's top 6 competitions (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, UEFA Champions League).

## 3-Layer Architecture Flow

### Layer 1: Directive
- Target: 450 - 700 words per article.
- Verification: Only publish claims authenticated across Tier-1 wire feeds or on-record press releases.
- Quality Check: Ensure originality, tactical chalkboard breakdown, xG metrics, and accredited author binding.

### Layer 2: Orchestrator (`src/agents/orchestrator.ts`)
- Sequence:
  1. `ScoutAgent`: Ingest match statistics and transfer wire updates.
  2. `FactCheckerAgent`: Verify quotes and assign Rumor Tier (1 to 4).
  3. `SportsReporterAgent`: Draft 500+ word structured journalistic piece.
  4. `SeoGeoExpertAgent`: Generate JSON-LD NewsArticle / SportsEvent schema and GEO keywords.
  5. `ComplianceEditorAgent`: Audit E-E-A-T score (>= 80/100) and Google AdSense compatibility.
- DB Persistence: Write directly to `Post`, `TransferRumor`, and `AgentLog` tables in Prisma.

### Layer 3: Execution Scripts (`execution/` and `src/agents/`)
- CLI runner: `npm run agent:run` or `tsx src/agents/cli.ts`
- Vercel Cron Endpoint: `/api/cron/pipeline?secret=CRON_SECRET`
- Manual UI Trigger: `/admin/pipeline`
