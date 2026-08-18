import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Foot360 European Football Database Seeding...");

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

  // 4. Seed Matches
  await prisma.match.createMany({
    data: [
      {
        leagueId: leagues["champions-league"].id,
        homeTeamId: teams["arsenal"].id,
        awayTeamId: teams["real-madrid"].id,
        matchDate: new Date(Date.now() - 3600 * 1000 * 24),
        status: "FT",
        homeScore: 3,
        awayScore: 1,
        venue: "Emirates Stadium, London",
        statsJson: JSON.stringify({ xG: "2.45 - 0.88", possession: "58% - 42%", shots: "17 - 9", fouls: "11 - 14" }),
      },
      {
        leagueId: leagues["la-liga"].id,
        homeTeamId: teams["barcelona"].id,
        awayTeamId: teams["real-madrid"].id,
        matchDate: new Date(Date.now() + 3600 * 1000 * 48),
        status: "SCHEDULED",
        homeScore: 0,
        awayScore: 0,
        venue: "Spotify Camp Nou, Barcelona",
        statsJson: JSON.stringify({ winProbability: "42% - 31% - 27%" }),
      },
      {
        leagueId: leagues["premier-league"].id,
        homeTeamId: teams["man-city"].id,
        awayTeamId: teams["liverpool"].id,
        matchDate: new Date(),
        status: "LIVE",
        minute: 74,
        homeScore: 2,
        awayScore: 2,
        venue: "Etihad Stadium, Manchester",
        statsJson: JSON.stringify({ xG: "1.85 - 1.90", possession: "62% - 38%" }),
      },
    ],
  });
  console.log("✅ Matches created");

  // 5. Seed Transfer Rumors (Tiered 1-4)
  await prisma.transferRumor.createMany({
    data: [
      {
        playerName: "Florian Wirtz",
        currentClub: "Bayer Leverkusen",
        targetClub: "Manchester City",
        position: "Attacking Midfielder",
        transferFee: "£115M (€135M)",
        rumorTier: 1,
        confidenceScore: 98,
        sourceName: "David Ornstein & Fabrizio Romano",
        summary: "Agreement in principle finalized. 5-year contract until June 2031, medical booked in Manchester.",
        leagueId: leagues["premier-league"].id,
      },
      {
        playerName: "Alphonso Davies",
        currentClub: "Bayern Munich",
        targetClub: "Real Madrid",
        position: "Left Back",
        transferFee: "Free Agent / €12M Signing Bonus",
        rumorTier: 1,
        confidenceScore: 95,
        sourceName: "Mario Cortegana (The Athletic)",
        summary: "Pre-contract agreement verbalized. Joining Los Blancos on a 5-year deal.",
        leagueId: leagues["la-liga"].id,
      },
      {
        playerName: "Joshua Kimmich",
        currentClub: "Bayern Munich",
        targetClub: "FC Barcelona",
        position: "Central Midfielder",
        transferFee: "Free / €35M Contract Package",
        rumorTier: 2,
        confidenceScore: 84,
        sourceName: "Florian Plettenberg (Sky Sport DE)",
        summary: "Direct discussions between Hansi Flick and Kimmich's representatives continuing in Munich.",
        leagueId: leagues["la-liga"].id,
      },
      {
        playerName: "Theo Hernandez",
        currentClub: "AC Milan",
        targetClub: "Bayern Munich",
        position: "Left Back",
        transferFee: "€65,000,000",
        rumorTier: 2,
        confidenceScore: 78,
        sourceName: "Gianluca Di Marzio (Sky Italia)",
        summary: "Bayern exploring Theo as primary successor if left-back departures materialize.",
        leagueId: leagues["bundesliga"].id,
      },
      {
        playerName: "Viktor Gyökeres",
        currentClub: "Sporting CP",
        targetClub: "Arsenal",
        position: "Striker",
        transferFee: "€85,000,000 Release Clause",
        rumorTier: 3,
        confidenceScore: 68,
        sourceName: "Record Portugal / The Standard",
        summary: "Arsenal scouts compiled 6 consecutive in-person dossiers during Liga Portugal matches.",
        leagueId: leagues["premier-league"].id,
      },
    ],
  });
  console.log("✅ Transfer Rumors created");

  // 6. Seed In-Depth E-E-A-T Articles
  await prisma.post.upsert({
    where: { slug: "arsenal-3-1-real-madrid-tactical-mastery-champions-league" },
    update: {},
    create: {
      title: "Arsenal 3-1 Real Madrid: Arteta's Pressing Trap Dismantles European Royalty at the Emirates",
      slug: "arsenal-3-1-real-madrid-tactical-mastery-champions-league",
      excerpt: "Mikel Arteta orchestrated a European tactical masterclass as Arsenal dismantled Real Madrid 3-1 behind suffocating counter-pressing and half-space overloads.",
      content: `Under the glare of European floodlights, matches of this magnitude are not decided by fortune; they are won in the exacting margins of structural discipline, pressing resistance, and spatial dominance. The 3-1 triumph of **Arsenal** over **Real Madrid** was not simply a statement victory—it was an ideological manifesto executed by Mikel Arteta's meticulously calibrated side.

## The Decisive Pressing Trap
From the opening whistle, Arsenal established territorial hegemony through a high-intensity 4-2-4 pressing structure. Declan Rice and Thomas Partey were instructed to step aggressively onto Real Madrid's interior pivots, preventing Toni Kroos and Eduardo Camavinga from turning to access Vinicius Jr. in transition.

According to telemetry recorded by UEFA Match Centre, Arsenal forced **14 high turnovers within Madrid's defensive third** in the first 45 minutes alone.

> "Our spatial occupation between Madrid's midfield line and back four was exceptional. We didn't allow their playmakers time to settle or dictate rhythm."
> — **Mikel Arteta** (*UEFA Post-Match Press Conference*)

Bukayo Saka opened the scoring on 18 minutes after an interception by Rice, cutting inside Ferland Mendy and placing a curling left-footed strike into the top corner. Martin Odegaard doubled the lead with a 25-yard drive before Kai Havertz sealed the triumph following a second-half counter-punch from Vinicius Jr.

## Tactical Breakdown: Positional Asymmetry & The Rice Axis
The structural divergence between the two sides was profound:
1. **Inverted Fullback Mechanics**: Jurrien Timber shifted into central midfield during possession phases, creating a 3-2-4-1 overload that overwhelmed Madrid's midfield double-pivot.
2. **Half-Space Exploitation**: Odegaard and Saka continuously engineered 2v1 overloads against Mendy, isolating Madrid's left flank.
3. **Rest-Defense Stability**: Gabriel Magalhães and William Saliba maintained a high 44-meter line, compressing the pitch and reducing space for Madrid's transitional runners.

## Statistical Dominance & Analytical Depth
The underlying metrics confirm the comprehensive nature of the performance:
- **Expected Goals (xG)**: Arsenal 2.45 - 0.88 Real Madrid
- **Field Tilt**: Arsenal 64% in the opening hour
- **Pressing Efficiency**: 6.2 Passes Per Defensive Action (PPDA) for Arsenal

For Carlo Ancelotti's Real Madrid, the loss exposes structural vulnerabilities in central midfield defensive transitions when facing elite pressing sides. For Arsenal, it confirms their evolution from domestic contenders to formidable European heavyweights.`,
      coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      category: "MATCH_REPORT",
      leagueId: leagues["champions-league"].id,
      authorId: julian.id,
      tacticalAnalysis: "Arsenal employed a compact 3-2-4-1 in-possession shape with Timber inverting alongside Partey. The key pressing trigger was triggered whenever Madrid's center-backs played backwards to Courtois.",
      statsBreakdown: JSON.stringify({ xG: "2.45 - 0.88", possession: "58% - 42%", shots: "17 - 9", ppda: "6.2 - 14.1" }),
      sources: JSON.stringify([
        { name: "UEFA Official Match Center", tier: 1, url: "https://uefa.com" },
        { name: "The Athletic (Amy Lawrence)", tier: 1, quote: "Arteta's tactical blueprint stifled Madrid's transition game completely." },
        { name: "Mikel Arteta Post-Match", tier: 1, speaker: "Mikel Arteta", quote: "Our spatial occupation between Madrid's midfield line and back four was exceptional." }
      ]),
      rumorTier: null,
      seoTitle: "Arsenal 3-1 Real Madrid: Tactical Analysis & Pressing Masterclass | Foot360",
      seoDescription: "In-depth tactical report and xG breakdown of Arsenal's 3-1 Champions League victory over Real Madrid at the Emirates Stadium.",
      keywords: "Arsenal, Real Madrid, UEFA Champions League, Mikel Arteta, Tactical Analysis, xG, London, Madrid",
      schemaJson: "{}",
      isCompliant: true,
      complianceScore: 98,
      featured: true,
      views: 1420,
    },
  });

  await prisma.post.upsert({
    where: { slug: "florian-wirtz-manchester-city-transfer-tactical-fit" },
    update: {},
    create: {
      title: "Florian Wirtz to Manchester City: £115M Agreement & Tactical Blueprint Decoded",
      slug: "florian-wirtz-manchester-city-transfer-tactical-fit",
      excerpt: "Manchester City have agreed a landmark £115m package for Florian Wirtz. We decode Pep Guardiola's tactical blueprint for the German playmaker.",
      content: `When elite European clubs maneuver in the modern transfer market, value is no longer measured solely in currency, but in positional mastery and tactical adaptability. The definitive agreement sending **Florian Wirtz** from **Bayer Leverkusen** to **Manchester City** in a package valued at **£115,000,000 (€135M)** marks a seismic shift in the European football hierarchy.

## The Blueprint Behind the Move
The pursuit of Wirtz by Manchester City has been meticulous. Identified as the premier archetype for modern transitional and positional play, the 22-year-old German international brings a rare combination of line-breaking progression, spatial intelligence in the half-spaces, and elite pressing output.

According to reporting authenticated by **David Ornstein (The Athletic)** and **Fabrizio Romano**, contractual terms have been formalized on a five-year commitment with medical examinations scheduled in Manchester.

> "Manchester City have agreed a deal in principle to sign Florian Wirtz from Bayer Leverkusen. Total package worth up to £115m. Five-year contract prepared."
> — **David Ornstein** (*The Athletic Wire*)

## Tactical Architecture & Positional Fit
In Pep Guardiola's tactical configuration, Wirtz is projected to operate as an advanced free interior in the dual 'number 8/10' roles:
- **Spatial Manipulation**: Drawing opposition double-pivots out of position through deceptive body orientation and half-turn receiving.
- **Transitional Speed**: Accelerating vertical attacks within 3.2 seconds of turnover recovery, feeding Erling Haaland's blind-side runs.
- **Defensive Work-Rate**: Clocking over 19 high-intensity pressures per 90 minutes under Xabi Alonso at Leverkusen.

## Statistical Profile (99th Percentile)
Over the preceding 12 months, Wirtz registered:
- **8.4 Progressive Passes per 90** (99th percentile across Europe's top five leagues)
- **3.1 Shot-Creating Actions per 90**
- **Expected Assists (xA) of 0.38 per match**

For Bayer Leverkusen, the substantial capital injection provides foundational flexibility for a comprehensive squad reinvestment. For Manchester City, it represents the acquisition of the premier creative engine in world football.`,
      coverImage: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=1200&q=80",
      category: "TRANSFER_RADAR",
      leagueId: leagues["premier-league"].id,
      authorId: marco.id,
      tacticalAnalysis: "Wirtz will operate in the inside-left pocket, combining with Phil Foden and feeding Erling Haaland with through-balls into the channels.",
      statsBreakdown: JSON.stringify({ fee: "£115M", progressivePasses: "8.4/90", xA: "0.38/90", contract: "5 Years" }),
      sources: JSON.stringify([
        { name: "David Ornstein (The Athletic)", tier: 1, speaker: "David Ornstein", quote: "Manchester City have agreed a deal in principle to sign Florian Wirtz from Bayer Leverkusen." },
        { name: "Fabrizio Romano", tier: 1, speaker: "Fabrizio Romano", quote: "Here we go confirmed! Florian Wirtz to Manchester City, contract until June 2031." }
      ]),
      rumorTier: 1,
      seoTitle: "Florian Wirtz to Manchester City: £115M Agreement & Tactical Analysis | Foot360",
      seoDescription: "Exclusive transfer breakdown of Florian Wirtz's £115M move to Manchester City, detailing Pep Guardiola's tactical blueprint.",
      keywords: "Florian Wirtz, Manchester City, Bayer Leverkusen, Pep Guardiola, Transfer News, Premier League, Here We Go",
      schemaJson: "{}",
      isCompliant: true,
      complianceScore: 99,
      featured: true,
      views: 2890,
    },
  });

  console.log("✅ Seed articles created");
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
