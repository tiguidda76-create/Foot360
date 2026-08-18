import { ScoutData } from "../lib/types";

// Raw curated feeds simulating high-frequency API ingestion & transfer desk wire
const RAW_EVENT_POOL: ScoutData[] = [
  {
    title: "Arsenal 3-1 Real Madrid: Tactical Mastery in Champions League Quarter-Final",
    category: "MATCH_REPORT",
    leagueSlug: "champions-league",
    leagueName: "UEFA Champions League",
    eventSummary: "Mikel Arteta's side dismantled Real Madrid at the Emirates with a relentless high press, winning 3-1 behind goals from Bukayo Saka, Martin Odegaard, and Kai Havertz. Vinicius Jr. scored Madrid's lone goal.",
    rawStats: {
      homeTeam: "Arsenal",
      awayTeam: "Real Madrid",
      score: "3-1",
      possession: "58% - 42%",
      shots: "17 (8 on target) - 9 (3 on target)",
      xG: "2.45 - 0.88",
      keyMoments: [
        "18' Saka curls into the top corner after Rice turnover",
        "42' Odegaard 25-yard strike off inside of post",
        "61' Vinicius Jr breaks through on counter to pull one back",
        "84' Havertz seals victory with header from corner"
      ],
    },
    rawQuotes: [
      {
        speaker: "Mikel Arteta",
        role: "Arsenal Manager",
        quote: "Our spatial occupation between Madrid's midfield line and back four was exceptional. We didn't allow Kroos and Camavinga time to turn and dictate rhythm.",
        source: "UEFA Post-Match Press Conference"
      },
      {
        speaker: "Carlo Ancelotti",
        role: "Real Madrid Manager",
        quote: "Arsenal played with immense physical intensity in defensive transitions. We lost control of the central passing corridors.",
        source: "Movistar+ Flash Interview"
      }
    ],
    sources: [
      { name: "UEFA Official Match Center", reliabilityTier: 1, url: "https://uefa.com" },
      { name: "The Athletic (Amy Lawrence)", reliabilityTier: 1, url: "https://theathletic.com" }
    ]
  },
  {
    title: "Florian Wirtz to Manchester City: £115M Agreement Reached with Bayer Leverkusen",
    category: "TRANSFER_RADAR",
    leagueSlug: "premier-league",
    leagueName: "Premier League",
    eventSummary: "Manchester City have reached a total agreement in principle with Bayer Leverkusen for German playmaker Florian Wirtz on a 5-year contract for an initial fee of £100m plus £15m in add-ons.",
    rawStats: {
      keyMoments: [
        "Personal terms 100% agreed on €280k/week package",
        "Medical scheduled in Manchester over the next 48 hours",
        "Pep Guardiola personally presented the tactical blueprint to Wirtz and his representatives in Munich"
      ]
    },
    rawQuotes: [
      {
        speaker: "David Ornstein",
        role: "Senior Football Journalist, The Athletic",
        quote: "Manchester City have agreed a deal in principle to sign Florian Wirtz from Bayer Leverkusen. Total package worth up to £115m. Five-year contract prepared.",
        source: "The Athletic Wire"
      },
      {
        speaker: "Fabrizio Romano",
        role: "Transfer Correspondent",
        quote: "Here we go confirmed! Florian Wirtz to Manchester City, contract until June 2031. Pep Guardiola's top target secured.",
        source: "Verified X Feed"
      }
    ],
    sources: [
      { name: "David Ornstein (The Athletic)", reliabilityTier: 1 },
      { name: "Fabrizio Romano", reliabilityTier: 1 }
    ],
    transferDetails: {
      playerName: "Florian Wirtz",
      currentClub: "Bayer Leverkusen",
      targetClub: "Manchester City",
      position: "Attacking Midfielder",
      reportedFee: "£115,000,000 (€135M)",
      contractLength: "5 Years (until 2031)"
    }
  },
  {
    title: "Barcelona 2-1 Atletico Madrid: Yamal Decides Title Showdown in Montjuïc",
    category: "MATCH_REPORT",
    leagueSlug: "la-liga",
    leagueName: "La Liga",
    eventSummary: "Lamine Yamal produced another world-class display with a solo goal and an assist for Robert Lewandowski as FC Barcelona secured a crucial 2-1 victory over Diego Simeone's Atletico Madrid.",
    rawStats: {
      homeTeam: "FC Barcelona",
      awayTeam: "Atletico Madrid",
      score: "2-1",
      possession: "64% - 36%",
      shots: "14 (6 on target) - 8 (4 on target)",
      xG: "1.92 - 1.15",
      keyMoments: [
        "24' Lamine Yamal cuts inside Reinildo and fires into bottom corner",
        "51' Antoine Griezmann equalizes with deft volley",
        "78' Lewandowski headers in Yamal's pinpoint trivela cross"
      ]
    },
    rawQuotes: [
      {
        speaker: "Hansi Flick",
        role: "FC Barcelona Head Coach",
        quote: "Lamine is playing with maturity beyond his years. The way he drew double-teams opened the half-space for Pedri and Dani Olmo continuously.",
        source: "Barça One Post-Match Desk"
      },
      {
        speaker: "Diego Simeone",
        role: "Atletico Madrid Manager",
        quote: "When a talent like Yamal decides moments with singular quality, you must applaud. We had our chances in the second half but lacked ruthlessness.",
        source: "DAZN Spain"
      }
    ],
    sources: [
      { name: "La Liga Official Match Feed", reliabilityTier: 1 },
      { name: "Mundo Deportivo", reliabilityTier: 2 }
    ]
  },
  {
    title: "Inter Milan 1-0 Juventus: Inzaghi's 3-5-2 Smothers Derby d'Italia at San Siro",
    category: "TACTICAL_ANALYSIS",
    leagueSlug: "serie-a",
    leagueName: "Serie A",
    eventSummary: "Inter Milan tightened their grip on the Scudetto race with a masterclass in positional compactness, defeating Juventus 1-0 thanks to Lautaro Martinez's first-half header.",
    rawStats: {
      homeTeam: "Inter Milan",
      awayTeam: "Juventus",
      score: "1-0",
      possession: "52% - 48%",
      shots: "12 (4 on target) - 6 (1 on target)",
      xG: "1.65 - 0.42",
      keyMoments: [
        "37' Lautaro Martinez heads home Dimarco's curling delivery",
        "68' Bastoni goal-line clearance denies Vlahovic",
        "88' Inter defense blocks 3 consecutive shots in stoppage time"
      ]
    },
    rawQuotes: [
      {
        speaker: "Simone Inzaghi",
        role: "Inter Milan Manager",
        quote: "Our central midfielders covered enormous ground. Calhanoglu's deep playmaking combined with Barella's pressing prevented Juventus from sustaining any pressure.",
        source: "Sky Sport Italia"
      }
    ],
    sources: [
      { name: "La Gazzetta dello Sport", reliabilityTier: 1 },
      { name: "Corriere dello Sport", reliabilityTier: 2 }
    ]
  },
  {
    title: "Bayern Munich 4-0 Borussia Dortmund: Kane Hat-Trick Humiliates BVB in Der Klassiker",
    category: "MATCH_REPORT",
    leagueSlug: "bundesliga",
    leagueName: "Bundesliga",
    eventSummary: "Harry Kane delivered a devastating masterclass in finishing, scoring a ruthless hat-trick as Bayern Munich dismantled Borussia Dortmund 4-0 at the Allianz Arena.",
    rawStats: {
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      score: "4-0",
      possession: "61% - 39%",
      shots: "21 (11 on target) - 5 (1 on target)",
      xG: "3.40 - 0.55",
      keyMoments: [
        "9' Kane converts Davies cutback",
        "32' Musiala brilliant solo run and finish",
        "72' Kane penalty into top right corner",
        "89' Kane chips Kobel for hat-trick"
      ]
    },
    rawQuotes: [
      {
        speaker: "Vincent Kompany",
        role: "Bayern Munich Head Coach",
        quote: "Harry's link-up play is just as important as his goals. He dropped deep into the number 10 pocket and completely destroyed Dortmund's zonal structure.",
        source: "Bundesliga TV"
      }
    ],
    sources: [
      { name: "Kicker Sportmagazin", reliabilityTier: 1 },
      { name: "Bild Sport", reliabilityTier: 2 }
    ]
  },
  {
    title: "PSG 3-0 Marseille: Dembele & Barcola Run Riot in Le Classique",
    category: "MATCH_REPORT",
    leagueSlug: "ligue-1",
    leagueName: "Ligue 1",
    eventSummary: "Paris Saint-Germain asserted total dominance over bitter rivals Olympique de Marseille at the Parc des Princes, cruising to a 3-0 victory fueled by explosive wide play from Ousmane Dembele and Bradley Barcola.",
    rawStats: {
      homeTeam: "Paris Saint-Germain",
      awayTeam: "Olympique de Marseille",
      score: "3-0",
      possession: "68% - 32%",
      shots: "19 (9 on target) - 4 (1 on target)",
      xG: "2.88 - 0.35",
      keyMoments: [
        "14' Dembele thunderbolt from edge of box",
        "40' Barcola tap-in after Hakimi overlap",
        "76' Joao Neves first goal for PSG from 20 yards"
      ]
    },
    rawQuotes: [
      {
        speaker: "Luis Enrique",
        role: "PSG Manager",
        quote: "We occupied the wide channels with extreme speed. The counter-pressing within 5 seconds of losing possession was the key to this match.",
        source: "Canal+ France"
      }
    ],
    sources: [
      { name: "L'Equipe", reliabilityTier: 1 },
      { name: "RMC Sport", reliabilityTier: 2 }
    ]
  }
];

export class ScoutAgent {
  /**
   * Fetches latest match and transfer intelligence from European wire feeds
   */
  public async fetchLatestIntelligence(categoryFilter?: string): Promise<ScoutData> {
    let pool = RAW_EVENT_POOL;
    if (categoryFilter) {
      pool = RAW_EVENT_POOL.filter((item) => item.category === categoryFilter);
    }
    if (pool.length === 0) pool = RAW_EVENT_POOL;

    // Pick an item from the pool or randomize for dynamic generation
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];

    return {
      ...selected,
    };
  }

  public async fetchAllPendingEvents(): Promise<ScoutData[]> {
    return [...RAW_EVENT_POOL];
  }
}

export const scoutAgent = new ScoutAgent();
