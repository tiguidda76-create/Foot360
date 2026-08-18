import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Foot360 European Football Database Seeding with Real-Time Data...");

  // 1. Seed Authors (E-E-A-T Accredited)
  const julian = await prisma.author.upsert({
    where: { slug: "julian-sterling" },
    update: {},
    create: {
      name: "Julian Sterling",
      slug: "julian-sterling",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      role: "Senior European Tactical Correspondent",
      bio: "Julian Sterling has spent 14 years covering elite European football from the press boxes of the Santiago Bernabéu, Allianz Arena, and the Emirates. Specializing in positional play, pressing triggers, and tactical evolution.",
      credentials: "UEFA B Coaching License • Member of the Football Writers' Association (FWA) • Former Tactical Analyst at StatsBomb & Opta Analyst",
      twitterHandle: "@jsterling_tactics",
    },
  });

  const marco = await prisma.author.upsert({
    where: { slug: "marco-rossi" },
    update: {},
    create: {
      name: "Marco Rossi",
      slug: "marco-rossi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      role: "European Transfer Desk Editor",
      bio: "Marco Rossi leads Foot360's transfer intelligence desk. With deep networks across London, Milan, Madrid, and Munich, Marco verifies transfer wires and enforces the Foot360 4-Tier Rumor Verification standard.",
      credentials: "International Sports Press Association (AIPS) Accredited • 10+ Years Transfer Verification Lead",
      twitterHandle: "@rossi_transfers",
    },
  });

  console.log("✅ Authors created");

  // 2. Seed 6 European Leagues
  const leaguesData = [
    { name: "Premier League", slug: "premier-league", country: "England", logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=200&q=80", badgeColor: "#38003c" },
    { name: "La Liga", slug: "la-liga", country: "Spain", logo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=200&q=80", badgeColor: "#ee1a3b" },
    { name: "Bundesliga", slug: "bundesliga", country: "Germany", logo: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=200&q=80", badgeColor: "#d20515" },
    { name: "Serie A", slug: "serie-a", country: "Italy", logo: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=200&q=80", badgeColor: "#024494" },
    { name: "Ligue 1", slug: "ligue-1", country: "France", logo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=200&q=80", badgeColor: "#091c3e" },
    { name: "UEFA Champions League", slug: "champions-league", country: "Europe", logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=200&q=80", badgeColor: "#001438" },
  ];

  const leagues: Record<string, { id: string; name: string; slug: string }> = {};
  for (const l of leaguesData) {
    const created = await prisma.league.upsert({
      where: { slug: l.slug },
      update: {},
      create: l,
    });
    leagues[l.slug] = created;
  }
  console.log("✅ Leagues created");

  // 3. Seed Key Teams
  const teamsData = [
    { name: "Arsenal", shortName: "ARS", slug: "arsenal", leagueId: leagues["premier-league"].id, stadium: "Emirates Stadium", badgeUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=150&q=80" },
    { name: "Manchester City", shortName: "MCI", slug: "man-city", leagueId: leagues["premier-league"].id, stadium: "Etihad Stadium", badgeUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=150&q=80" },
    { name: "Liverpool", shortName: "LIV", slug: "liverpool", leagueId: leagues["premier-league"].id, stadium: "Anfield", badgeUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=150&q=80" },
    { name: "Real Madrid", shortName: "RMA", slug: "real-madrid", leagueId: leagues["la-liga"].id, stadium: "Santiago Bernabéu", badgeUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=150&q=80" },
    { name: "FC Barcelona", shortName: "FCB", slug: "barcelona", leagueId: leagues["la-liga"].id, stadium: "Spotify Camp Nou", badgeUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=150&q=80" },
    { name: "Bayern Munich", shortName: "BAY", slug: "bayern-munich", leagueId: leagues["bundesliga"].id, stadium: "Allianz Arena", badgeUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=150&q=80" },
    { name: "Bayer Leverkusen", shortName: "B04", slug: "leverkusen", leagueId: leagues["bundesliga"].id, stadium: "BayArena", badgeUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=150&q=80" },
    { name: "Inter Milan", shortName: "INT", slug: "inter-milan", leagueId: leagues["serie-a"].id, stadium: "San Siro", badgeUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=150&q=80" },
    { name: "Juventus", shortName: "JUV", slug: "juventus", leagueId: leagues["serie-a"].id, stadium: "Allianz Stadium", badgeUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=150&q=80" },
    { name: "Paris Saint-Germain", shortName: "PSG", slug: "psg", leagueId: leagues["ligue-1"].id, stadium: "Parc des Princes", badgeUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=150&q=80" },
  ];

  const teams: Record<string, { id: string; name: string }> = {};
  for (const t of teamsData) {
    const created = await prisma.team.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
    teams[t.slug] = created;
  }
  console.log("✅ Teams created");

  // 4. Seed Live Matches with current real-time timestamps
  const now = new Date();
  await prisma.match.deleteMany({});
  await prisma.match.createMany({
    data: [
      {
        leagueId: leagues["champions-league"].id,
        homeTeamId: teams["real-madrid"].id,
        awayTeamId: teams["man-city"].id,
        matchDate: new Date(now.getTime() - 1000 * 60 * 45), // 45 mins ago (LIVE)
        status: "LIVE",
        minute: 68,
        homeScore: 2,
        awayScore: 1,
        venue: "Santiago Bernabéu, Madrid",
        statsJson: JSON.stringify({ xG: "1.95 - 1.42", possession: "48% - 52%", shots: "14 - 11" }),
      },
      {
        leagueId: leagues["premier-league"].id,
        homeTeamId: teams["arsenal"].id,
        awayTeamId: teams["liverpool"].id,
        matchDate: new Date(now.getTime() - 1000 * 60 * 120), // 2 hours ago (FT)
        status: "FT",
        homeScore: 2,
        awayScore: 1,
        venue: "Emirates Stadium, London",
        statsJson: JSON.stringify({ xG: "2.10 - 1.25", possession: "54% - 46%", shots: "16 - 8" }),
      },
      {
        leagueId: leagues["la-liga"].id,
        homeTeamId: teams["barcelona"].id,
        awayTeamId: teams["real-madrid"].id,
        matchDate: new Date(now.getTime() + 1000 * 60 * 60 * 24), // Tomorrow
        status: "SCHEDULED",
        homeScore: 0,
        awayScore: 0,
        venue: "Spotify Camp Nou, Barcelona",
        statsJson: JSON.stringify({ winProbability: "45% - 28% - 27%" }),
      },
    ],
  });
  console.log("✅ Matches created with real-time live timestamps");

  // 5. Seed Real-Time Transfer Rumors
  await prisma.transferRumor.deleteMany({});
  await prisma.transferRumor.createMany({
    data: [
      {
        playerName: "Nico Williams",
        currentClub: "Athletic Bilbao",
        targetClub: "Arsenal",
        position: "Left Winger",
        transferFee: "€75,000,000 (£64M)",
        rumorTier: 1,
        confidenceScore: 97,
        sourceName: "David Ornstein & Fabrizio Romano",
        summary: "Arsenal trigger €75m release clause. 5-year personal terms verbally agreed. Medical scheduled this week.",
        leagueId: leagues["premier-league"].id,
        verifiedAt: new Date(now.getTime() - 1000 * 60 * 18), // 18 mins ago
      },
      {
        playerName: "Florian Wirtz",
        currentClub: "Bayer Leverkusen",
        targetClub: "Manchester City",
        position: "Attacking Midfielder",
        transferFee: "£115M (€135M)",
        rumorTier: 1,
        confidenceScore: 98,
        sourceName: "The Athletic Live Desk",
        summary: "Total agreement in principle reached. Pep Guardiola approved tactical contract through 2031.",
        leagueId: leagues["premier-league"].id,
        verifiedAt: new Date(now.getTime() - 1000 * 60 * 42), // 42 mins ago
      },
      {
        playerName: "Joshua Kimmich",
        currentClub: "Bayern Munich",
        targetClub: "FC Barcelona",
        position: "Central Midfielder",
        transferFee: "Free Agent / €10M Signing Bonus",
        rumorTier: 2,
        confidenceScore: 88,
        sourceName: "Florian Plettenberg (Sky Sport DE)",
        summary: "Hansi Flick holds direct discussions in Munich regarding spatial midfield role.",
        leagueId: leagues["la-liga"].id,
        verifiedAt: new Date(now.getTime() - 1000 * 60 * 85), // 1h 25m ago
      },
    ],
  });
  console.log("✅ Real-time Transfer Rumors created");

  // 6. Seed In-Depth Fresh Real-Time Articles
  await prisma.post.deleteMany({});

  await prisma.post.create({
    data: {
      title: "Real Madrid 2-1 Man City (68'): Mbappé & Vinicius Counter-Press Overloads Stun Guardiola at the Bernabéu",
      slug: "real-madrid-man-city-mbappe-vinicius-live-tactical-masterclass",
      excerpt: "Carlo Ancelotti's Real Madrid have unleashed a suffocating transitional blitz against Manchester City, with Kylian Mbappé and Vinicius Jr tearing through central corridors.",
      content: `Under the pulsating floodlights of the Santiago Bernabéu, this heavyweight European encounter is delivering an absolute tactical clinic. Real Madrid currently lead Manchester City 2-1 in the 68th minute, orchestrated by an asymmetric pressing structure that has completely neutralized City's build-up phase.

## The Mbappé-Vinicius Transition Trap
Carlo Ancelotti deployed a fluid 4-3-3 that shifts into a narrow 4-4-2 diamond out of possession. Whenever Rodri receives the ball under pressure, Jude Bellingham and Federico Valverde initiate an aggressive dual-pivot squeeze, forcing turnovers into the inside-left channel where Kylian Mbappé and Vinicius Jr. exploit space behind Kyle Walker.

According to live telemetry from the Bernabéu press desk:
- **Real Madrid high turnovers**: 9 inside the final third
- **Transitional sprint speed**: Mbappé clocked at **35.9 km/h** on his opening goal run
- **Expected Goals (xG)**: Real Madrid 1.95 - 1.42 Manchester City

> "The spatial occupation between City's midfield line and back four has been the exact key to our direct vertical transitions."
> — **Carlo Ancelotti** (*Flash Interview*)

## Tactical Analysis: Positional Adjustments
1. **Asymmetric Left-Overload**: Real Madrid are channeling 61% of their attacks through the left half-space, creating 3v2 overloads against Akanji and Dias.
2. **Rest-Defense Discipline**: Antonio Rüdiger has suffocated Erling Haaland, denying the Norwegian striker central service.
3. **Midfield Compactness**: Camavinga's defensive recoveries (7 tackles won) have thwarted City's customary sustained possession.

With 20 minutes remaining, Pep Guardiola is preparing tactical adjustments from the bench as City look to unlock Madrid's deep defensive block.`,
      coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      category: "MATCH_REPORT",
      leagueId: leagues["champions-league"].id,
      authorId: julian.id,
      tacticalAnalysis: "Madrid's 4-3-3 asymmetric overload in the left half-space isolates City's right center-back in 1v1 situations with Mbappé.",
      statsBreakdown: JSON.stringify({ xG: "1.95 - 1.42", possession: "48% - 52%", shots: "14 - 11", ppda: "7.4 - 9.8" }),
      sources: JSON.stringify([
        { name: "UEFA Live Telemetry Desk", tier: 1, url: "https://uefa.com" },
        { name: "The Athletic Live (Mario Cortegana)", tier: 1, quote: "Ancelotti's transitional blueprint is completely exposing City's rest-defense." }
      ]),
      rumorTier: null,
      seoTitle: "Real Madrid vs Man City: Live Champions League Tactical Breakdown & xG | Foot360",
      seoDescription: "Live tactical report and statistical breakdown of Real Madrid vs Manchester City at the Santiago Bernabéu.",
      keywords: "Real Madrid, Manchester City, Champions League, Mbappe, Vinicius, Guardiola, Ancelotti, Tactical Analysis, xG",
      schemaJson: "{}",
      isCompliant: true,
      complianceScore: 100,
      featured: true,
      views: 3120,
      publishedAt: new Date(now.getTime() - 1000 * 60 * 22), // 22 minutes ago
    },
  });

  await prisma.post.create({
    data: {
      title: "Arsenal Confirm €75M Agreement for Nico Williams: Arteta's Left-Wing Solution Analyzed",
      slug: "arsenal-confirm-nico-williams-transfer-tactical-breakdown",
      excerpt: "Arsenal have finalized a landmark €75m deal for Athletic Bilbao winger Nico Williams. We analyze how the Euro 2024 hero completes Mikel Arteta's attacking puzzle.",
      content: `In a decisive development across the European transfer wire, **Arsenal** have reached total agreement to trigger the **€75,000,000 (£64M)** release clause for Athletic Bilbao and Spain winger **Nico Williams**.

## The Transfer Blueprint
Authenticated by senior correspondents **David Ornstein (The Athletic)** and **Fabrizio Romano**, Williams has committed to a five-year contract in North London after Mikel Arteta personally presented the tactical blueprint for his role.

> "Arsenal are advancing with the formal paperwork after triggering the full release clause. Contract 100% agreed until June 2031."
> — **David Ornstein** (*The Athletic Wire*)

## Tactical Fit & Positional Role
- **Direct 1v1 Isolation**: Williams completed 4.2 successful take-ons per 90 in La Liga last season (top 1% across Europe).
- **Dual-Flank Balance**: Pairing Williams on the left with Bukayo Saka on the right prevents opponents from double-teaming Saka.
- **Transitional Threat**: Adding electric vertical pace alongside Martin Odegaard's vision into space.`,
      coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
      category: "TRANSFER_RADAR",
      leagueId: leagues["premier-league"].id,
      authorId: marco.id,
      tacticalAnalysis: "Williams provides elite 1v1 separation on the left flank, allowing Gabriel Martinelli and Kai Havertz to overload central spaces.",
      statsBreakdown: JSON.stringify({ fee: "€75M (£64M)", takeOns: "4.2/90", xA: "0.34/90", contract: "5 Years" }),
      sources: JSON.stringify([
        { name: "David Ornstein (The Athletic)", tier: 1, quote: "Arsenal have triggered the release clause for Nico Williams." },
        { name: "Fabrizio Romano", tier: 1, quote: "Here we go! Nico Williams to Arsenal finalized." }
      ]),
      rumorTier: 1,
      seoTitle: "Nico Williams to Arsenal: €75M Transfer Breakdown & Tactical Blueprint | Foot360",
      seoDescription: "In-depth analysis of Nico Williams' €75M transfer to Arsenal and his tactical fit under Mikel Arteta.",
      keywords: "Nico Williams, Arsenal, Mikel Arteta, Transfer News, Premier League, Athletic Bilbao",
      schemaJson: "{}",
      isCompliant: true,
      complianceScore: 99,
      featured: true,
      views: 4580,
      publishedAt: new Date(now.getTime() - 1000 * 60 * 48), // 48 minutes ago
    },
  });

  await prisma.post.create({
    data: {
      title: "Bayern Munich 3-1 Bayer Leverkusen: Kompany's Intense 8.1 PPDA Press Breaks Alonso's Geometry",
      slug: "bayern-munich-3-1-bayer-leverkusen-tactical-report-kompany",
      excerpt: "Vincent Kompany's Bayern Munich executed an unrelenting high press to defeat Xabi Alonso's Bayer Leverkusen 3-1 in a thrilling Bundesliga summit clash.",
      content: `At the Allianz Arena, Vincent Kompany's Bayern Munich delivered their most comprehensive tactical display of the campaign, overwhelming Xabi Alonso's Bayer Leverkusen 3-1 through an aggressive 8.1 PPDA counter-press.

## Tactical Breakdown
1. **Denying Alonso's Build-Up**: Harry Kane and Jamal Musiala formed a compact 2-man pressing block that screened Granit Xhaka, cutting off Leverkusen's primary distributor.
2. **Wing Overload**: Michael Olise and Alphonso Davies pinned Leverkusen's wing-backs deep into their own defensive third.
3. **Rest-Defense Stability**: Dayot Upamecano and Min-jae Kim stepped 40 meters high to recover second balls instantly.`,
      coverImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
      category: "MATCH_REPORT",
      leagueId: leagues["bundesliga"].id,
      authorId: julian.id,
      tacticalAnalysis: "Bayern screened Xhaka with a mid-block pivot trap, forcing Leverkusen to play long into Upamecano's aerial dominance.",
      statsBreakdown: JSON.stringify({ xG: "2.31 - 1.05", possession: "56% - 44%", shots: "16 - 8", ppda: "8.1 - 12.4" }),
      sources: JSON.stringify([
        { name: "Kicker Sportmagazin", tier: 1 },
        { name: "Bundesliga Official Telemetry", tier: 1 }
      ]),
      rumorTier: null,
      seoTitle: "Bayern Munich 3-1 Bayer Leverkusen: Tactical Masterclass & xG | Foot360",
      seoDescription: "Tactical breakdown of Bayern Munich's 3-1 win over Bayer Leverkusen at the Allianz Arena.",
      keywords: "Bayern Munich, Bayer Leverkusen, Vincent Kompany, Xabi Alonso, Bundesliga, Tactical Analysis",
      schemaJson: "{}",
      isCompliant: true,
      complianceScore: 98,
      featured: false,
      views: 1890,
      publishedAt: new Date(now.getTime() - 1000 * 60 * 75), // 1 hour 15m ago
    },
  });

  console.log("✅ Seed articles created with real-time timestamps (22 mins ago, 48 mins ago, 1h ago)!");
  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
