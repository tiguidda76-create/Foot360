import { scoutAgent } from "./scout";
import { factCheckerAgent } from "./factChecker";
import { sportsReporterAgent } from "./sportsReporter";
import { seoGeoExpertAgent } from "./seoGeoExpert";
import { complianceEditorAgent } from "./complianceEditor";
import prisma from "../lib/prisma";

export interface PipelineExecutionLog {
  stage: string;
  agent: string;
  status: "SUCCESS" | "WARNING" | "FAILED";
  timestamp: string;
  output: unknown;
}

export interface PipelineResult {
  success: boolean;
  articleId?: string;
  slug?: string;
  title?: string;
  complianceScore?: number;
  rumorTier?: number;
  logs: PipelineExecutionLog[];
}

export class MultiAgentOrchestrator {
  /**
   * Executes the full 5-agent pipeline autonomously
   */
  public async runPipeline(categoryFilter?: string): Promise<PipelineResult> {
    const logs: PipelineExecutionLog[] = [];

    try {
      // 1. SCOUT AGENT
      const scoutData = await scoutAgent.fetchLatestIntelligence(categoryFilter);
      logs.push({
        stage: "1. Data Ingestion",
        agent: "ScoutAgent",
        status: "SUCCESS",
        timestamp: new Date().toISOString(),
        output: {
          title: scoutData.title,
          category: scoutData.category,
          league: scoutData.leagueName,
          sourcesCount: scoutData.sources.length,
        },
      });

      // 2. FACT CHECKER AGENT
      const factChecked = await factCheckerAgent.verifyAndTier(scoutData);
      logs.push({
        stage: "2. Cross-Source Verification & Tiering",
        agent: "FactCheckerAgent",
        status: factChecked.isApprovedForReporting ? "SUCCESS" : "WARNING",
        timestamp: new Date().toISOString(),
        output: {
          rumorTier: factChecked.rumorTier,
          confidenceScore: factChecked.confidenceScore,
          verifiedClaimsCount: factChecked.verifiedClaims.length,
          factCheckNotes: factChecked.factCheckNotes,
        },
      });

      // 3. SPORTS REPORTER AGENT
      const article = await sportsReporterAgent.writeArticle(factChecked);
      logs.push({
        stage: "3. Narrative & Tactical Journalism",
        agent: "SportsReporterAgent",
        status: "SUCCESS",
        timestamp: new Date().toISOString(),
        output: {
          title: article.title,
          slug: article.slug,
          wordCount: article.content.split(/\s+/).length,
          hasTacticalAnalysis: !!article.tacticalAnalysis,
        },
      });

      // 4. SEO & GEO EXPERT AGENT
      const seoData = await seoGeoExpertAgent.optimize(article, factChecked);
      logs.push({
        stage: "4. JSON-LD Schema & GEO Keyword Targeting",
        agent: "SeoGeoExpertAgent",
        status: "SUCCESS",
        timestamp: new Date().toISOString(),
        output: {
          seoTitle: seoData.seoTitle,
          geoTargets: seoData.geoTargets,
          canonicalUrl: seoData.canonicalUrl,
        },
      });

      // 5. COMPLIANCE & E-E-A-T EDITOR AGENT
      // Fetch default accredited author or fallback
      let authorId = "author-julian-sterling";
      let leagueId: string | undefined = undefined;

      try {
        const author = await prisma.author.findFirst();
        if (author) authorId = author.id;

        const league = await prisma.league.findUnique({
          where: { slug: factChecked.leagueSlug },
        });
        if (league) leagueId = league.id;
      } catch {
        // Safe database fallback
      }

      const compliance = await complianceEditorAgent.auditArticle(article, factChecked, authorId);
      logs.push({
        stage: "5. Google AdSense & E-E-A-T Compliance Audit",
        agent: "ComplianceEditorAgent",
        status: compliance.isCompliant ? "SUCCESS" : "WARNING",
        timestamp: new Date().toISOString(),
        output: {
          isCompliant: compliance.isCompliant,
          complianceScore: compliance.complianceScore,
          adSenseChecks: compliance.adSenseChecks,
          editorialNotes: compliance.editorialNotes,
        },
      });

      // 6. PERSISTENCE TO DATABASE
      let createdPost = null;
      try {
        createdPost = await prisma.post.upsert({
          where: { slug: article.slug },
          update: {
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            coverImage: article.coverImage,
            category: factChecked.category,
            leagueId: leagueId || null,
            authorId: compliance.authorId,
            tacticalAnalysis: article.tacticalAnalysis,
            statsBreakdown: JSON.stringify(article.statsBreakdown),
            sources: JSON.stringify(article.sourcesAttribution),
            rumorTier: factChecked.rumorTier,
            seoTitle: seoData.seoTitle,
            seoDescription: seoData.seoDescription,
            keywords: seoData.keywords.join(", "),
            schemaJson: seoData.schemaJson,
            isCompliant: compliance.isCompliant,
            complianceScore: compliance.complianceScore,
            updatedAt: new Date(),
          },
          create: {
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: article.content,
            coverImage: article.coverImage,
            category: factChecked.category,
            leagueId: leagueId || null,
            authorId: compliance.authorId,
            tacticalAnalysis: article.tacticalAnalysis,
            statsBreakdown: JSON.stringify(article.statsBreakdown),
            sources: JSON.stringify(article.sourcesAttribution),
            rumorTier: factChecked.rumorTier,
            seoTitle: seoData.seoTitle,
            seoDescription: seoData.seoDescription,
            keywords: seoData.keywords.join(", "),
            schemaJson: seoData.schemaJson,
            isCompliant: compliance.isCompliant,
            complianceScore: compliance.complianceScore,
          },
        });

        // Also record transfer rumor if applicable
        if (factChecked.category === "TRANSFER_RADAR" && factChecked.transferDetails) {
          await prisma.transferRumor.create({
            data: {
              playerName: factChecked.transferDetails.playerName,
              currentClub: factChecked.transferDetails.currentClub,
              targetClub: factChecked.transferDetails.targetClub,
              position: factChecked.transferDetails.position,
              transferFee: factChecked.transferDetails.reportedFee,
              rumorTier: factChecked.rumorTier,
              confidenceScore: factChecked.confidenceScore,
              sourceName: factChecked.sources.map((s) => s.name).join(", "),
              summary: article.excerpt,
              leagueId: leagueId || null,
            },
          });
        }

        // Log pipeline success
        await prisma.agentLog.create({
          data: {
            agentName: "MultiAgentOrchestrator",
            action: `Published article: ${article.title}`,
            status: "SUCCESS",
            details: JSON.stringify({ slug: article.slug, complianceScore: compliance.complianceScore }),
          },
        });
      } catch (dbError) {
        console.error("[MultiAgentOrchestrator] Database write warning:", dbError);
      }

      return {
        success: true,
        articleId: createdPost?.id,
        slug: article.slug,
        title: article.title,
        complianceScore: compliance.complianceScore,
        rumorTier: factChecked.rumorTier,
        logs,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logs.push({
        stage: "Pipeline Error",
        agent: "MultiAgentOrchestrator",
        status: "FAILED",
        timestamp: new Date().toISOString(),
        output: { error: errorMessage },
      });

      return {
        success: false,
        logs,
      };
    }
  }
}

export const multiAgentOrchestrator = new MultiAgentOrchestrator();
