"use client";

import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

interface MatchItem {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  status: "LIVE" | "FT" | "SCHEDULED";
  minute?: string;
  league: string;
}

const MOCK_MATCHES: MatchItem[] = [
  { id: "m1", homeTeam: "Arsenal", awayTeam: "Real Madrid", score: "3 - 1", status: "FT", league: "UCL" },
  { id: "m2", homeTeam: "Man City", awayTeam: "Liverpool", score: "2 - 2", status: "LIVE", minute: "74'", league: "EPL" },
  { id: "m3", homeTeam: "Barcelona", awayTeam: "Atlético", score: "2 - 1", status: "FT", league: "LaLiga" },
  { id: "m4", homeTeam: "Bayern", awayTeam: "Dortmund", score: "4 - 0", status: "FT", league: "BBL" },
  { id: "m5", homeTeam: "Inter", awayTeam: "Juventus", score: "1 - 0", status: "FT", league: "SerieA" },
  { id: "m6", homeTeam: "PSG", awayTeam: "Marseille", score: "3 - 0", status: "FT", league: "Ligue1" },
  { id: "m7", homeTeam: "Leverkusen", awayTeam: "Leipzig", score: "1 - 1", status: "LIVE", minute: "62'", league: "BBL" },
];

export default function MatchTicker() {
  return (
    <div className="bg-slate-950 border-b border-slate-800 text-xs py-2 overflow-x-auto scrollbar-none">
      <div className="container mx-auto px-4 flex items-center gap-4 min-w-max">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider text-[10px] border border-emerald-500/30">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>Matchday 360</span>
        </div>

        <div className="flex items-center gap-6">
          {MOCK_MATCHES.map((m) => (
            <Link
              key={m.id}
              href="/matches"
              className="flex items-center gap-2 hover:opacity-80 transition group"
            >
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                {m.league}
              </span>
              <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition">
                {m.homeTeam}
              </span>
              <span
                className={`font-mono font-extrabold px-1.5 py-0.5 rounded ${
                  m.status === "LIVE"
                    ? "bg-emerald-600 text-slate-950 animate-pulse"
                    : "bg-slate-800 text-slate-200"
                }`}
              >
                {m.score}
              </span>
              <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition">
                {m.awayTeam}
              </span>
              {m.status === "LIVE" ? (
                <span className="text-[10px] text-emerald-400 font-bold">{m.minute}</span>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">FT</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
