import { ReportedArticle, SEOData, FactCheckedData } from "../lib/types";

export class SeoGeoExpertAgent {
  /**
   * Generates Google-compliant JSON-LD structured data and European GEO targeting metadata
   */
  public async optimize(
    article: ReportedArticle,
    factChecked: FactCheckedData,
    authorName = "Julian Sterling",
    authorRole = "Senior European Football Analyst"
  ): Promise<SEOData> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://foot360.vercel.app";
    const canonicalUrl = `${siteUrl}/news/${article.slug}`;

    const leagueGeoMap: Record<string, { country: string; cities: string[]; language: string }> = {
      "premier-league": { country: "United Kingdom", cities: ["London", "Manchester", "Liverpool", "Birmingham"], language: "en-GB" },
      "la-liga": { country: "Spain", cities: ["Madrid", "Barcelona", "Seville", "Valencia"], language: "es-ES" },
      "serie-a": { country: "Italy", cities: ["Milan", "Turin", "Rome", "Naples"], language: "it-IT" },
      "bundesliga": { country: "Germany", cities: ["Munich", "Dortmund", "Leverkusen", "Leipzig"], language: "de-DE" },
      "ligue-1": { country: "France", cities: ["Paris", "Marseille", "Lyon", "Monaco"], language: "fr-FR" },
      "champions-league": { country: "Europe", cities: ["London", "Madrid", "Munich", "Paris", "Milan"], language: "en-EU" },
    };

    const geoInfo = leagueGeoMap[factChecked.leagueSlug] || {
      country: "Europe",
      cities: ["London", "Madrid", "Munich", "Paris"],
      language: "en-GB",
    };

    // SEO Title & Description with high CTR sports journalism syntax
    const seoTitle = `${article.title} | Foot360 Tactical & Transfer Analysis`;
    const seoDescription = article.excerpt.length > 155 ? `${article.excerpt.slice(0, 152)}...` : article.excerpt;

    const keywords = [
      factChecked.leagueName,
      factChecked.category,
      "European Football News",
      "Tactical Analysis",
      "Expected Goals (xG)",
      ...geoInfo.cities,
      geoInfo.country,
      ...(factChecked.transferDetails ? [factChecked.transferDetails.playerName, factChecked.transferDetails.targetClub, "Transfer News", "Here We Go"] : []),
      ...(factChecked.rawStats.homeTeam ? [factChecked.rawStats.homeTeam, factChecked.rawStats.awayTeam || ""] : []),
    ].filter(Boolean);

    // Schema.org NewsArticle & SportsEvent JSON-LD
    const isMatch = factChecked.category === "MATCH_REPORT";
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": isMatch ? ["NewsArticle", "SportsEvent"] : "NewsArticle",
      "headline": article.title,
      "description": seoDescription,
      "image": [article.coverImage],
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      "author": {
        "@type": "Person",
        "name": authorName,
        "jobTitle": authorRole,
        "url": `${siteUrl}/authors/julian-sterling`,
        "worksFor": {
          "@type": "NewsMediaOrganization",
          "name": "Foot360 Intelligence",
        },
      },
      "publisher": {
        "@type": "NewsMediaOrganization",
        "name": "Foot360 European Football",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
        },
        "publishingPrinciples": `${siteUrl}/editorial-policy`,
        "correctionsPolicy": `${siteUrl}/editorial-policy#corrections`,
      },
      "keywords": keywords.join(", "),
      "articleSection": factChecked.leagueName,
      "inLanguage": geoInfo.language,
      "spatialCoverage": {
        "@type": "Place",
        "name": geoInfo.country,
      },
      ...(isMatch && factChecked.rawStats.homeTeam
        ? {
            "sport": "Football (Soccer)",
            "competitor": [
              { "@type": "SportsTeam", "name": factChecked.rawStats.homeTeam },
              { "@type": "SportsTeam", "name": factChecked.rawStats.awayTeam },
            ],
          }
        : {}),
    };

    return {
      seoTitle,
      seoDescription,
      keywords,
      canonicalUrl,
      ogImage: article.coverImage,
      schemaJson: JSON.stringify(jsonLd, null, 2),
      geoTargets: [geoInfo.country, ...geoInfo.cities],
    };
  }
}

export const seoGeoExpertAgent = new SeoGeoExpertAgent();
