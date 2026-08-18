import React from "react";
import Link from "next/link";
import { Activity, Clock, MapPin, BarChart2 } from "lucide-react";
import prisma from "@/lib/prisma";
import AdBanner from "@/components/AdBanner";

export const revalidate = 60;

export default async function MatchesPage() {
  let matches: any[] = [];
  try {
    matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
      orderBy: { matchDate: "asc" },
    });
  } catch (err) {
    console.error("Failed to load matches", err);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdBanner slot="header-leaderboard" />

      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            European Matchday Intelligence
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Matchday Center & Live Telemetry
        </h1>
        <p className="text-sm text-slate-300 mt-2">
          Real-time scorelines, expected goals (xG) metrics, pressing frequency, and head-to-head tactical dossiers across Europe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {matches.map((m: any) => {
          let stats: any = {};
          try {
            if (m.statsJson) stats = JSON.parse(m.statsJson);
          } catch {}

          return (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs">
                <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                  {m.league?.name || "European Competition"}
                </span>
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    m.status === "LIVE"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                      : "text-slate-400"
                  }`}
                >
                  {m.status === "LIVE" ? `LIVE ${m.minute}'` : m.status}
                </span>
              </div>

              {/* Teams & Score */}
              <div className="grid grid-cols-3 items-center text-center my-4">
                <div className="text-left">
                  <h4 className="text-base font-extrabold text-white">
                    {m.homeTeam?.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">{m.homeTeam?.stadium}</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800">
                    {m.homeScore} - {m.awayScore}
                  </div>
                  {stats.xG && (
                    <span className="text-[10px] text-emerald-400 font-mono mt-1">
                      xG: {stats.xG}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <h4 className="text-base font-extrabold text-white">
                    {m.awayTeam?.name}
                  </h4>
                  <span className="text-[11px] text-slate-400">{m.awayTeam?.stadium}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{m.venue}</span>
                </div>
                <Link
                  href={`/news/arsenal-3-1-real-madrid-tactical-mastery-champions-league`}
                  className="text-emerald-400 font-bold hover:underline"
                >
                  Tactical Dossier →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <AdBanner slot="footer-banner" />
    </div>
  );
}
