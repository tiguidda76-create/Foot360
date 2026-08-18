export interface ScoutData {
  title: string;
  category: "MATCH_REPORT" | "TACTICAL_ANALYSIS" | "TRANSFER_RADAR" | "BREAKING_NEWS";
  leagueSlug: string;
  leagueName: string;
  eventSummary: string;
  rawStats: {
    homeTeam?: string;
    awayTeam?: string;
    score?: string;
    possession?: string;
    shots?: string;
    xG?: string;
    keyMoments?: string[];
  };
  rawQuotes: {
    speaker: string;
    role: string;
    quote: string;
    source: string;
  }[];
  sources: {
    name: string;
    url?: string;
    reliabilityTier: number; // 1 to 4
  }[];
  transferDetails?: {
    playerName: string;
    currentClub: string;
    targetClub: string;
    position: string;
    reportedFee: string;
    contractLength?: string;
  };
}

export interface FactCheckedData extends ScoutData {
  rumorTier: number; // 1: Verified/Tier 1, 2: Advanced Talks, 3: Emerging, 4: Speculation
  factCheckNotes: string;
  confidenceScore: number;
  isApprovedForReporting: boolean;
  verifiedClaims: string[];
  droppedClaims: string[];
}

export interface ReportedArticle {
  title: string;
  slug: string;
  leadHook: string;
  content: string; // 450 - 700 words markdown/html
  excerpt: string;
  tacticalAnalysis: string;
  statsBreakdown: Record<string, unknown>;
  sourcesAttribution: {
    name: string;
    tier: number;
    quote?: string;
    speaker?: string;
  }[];
  coverImage: string;
}

export interface SEOData {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  schemaJson: string; // JSON-LD string
  geoTargets: string[];
}

export interface ComplianceResult {
  isCompliant: boolean;
  complianceScore: number; // 0 - 100
  editorialNotes: string;
  authorId: string;
  adSenseChecks: {
    thinContentPassed: boolean;
    originalityPassed: boolean;
    attributionPassed: boolean;
    eeatAccredited: boolean;
  };
}
