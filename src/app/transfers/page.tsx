import React from "react";
import Link from "next/link";
import { RefreshCw, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import prisma from "@/lib/prisma";
import AdBanner from "@/components/AdBanner";
import RumorTierBadge from "@/components/RumorTierBadge";

export const revalidate = 60;

export default async function TransfersPage() {
  let rumors: any[] = [];
  try {
    rumors = await prisma.transferRumor.findMany({
      orderBy: { verifiedAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to fetch rumors", e);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdBanner slot="header-leaderboard" />

      {/* Header */}
      <div className="mb-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin-slow" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            European Transfer Desk 2026
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Live Transfer Radar & 4-Tier Verification Matrix
        </h1>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Every deal tracked through our 4-tier verification protocol: Tier 1 (Done Deal / Verified Wire), Tier 2 (Direct Club Talks), Tier 3 (Exploratory Inquiries), Tier 4 (Speculative).
        </p>
      </div>

      {/* Tier Explanation Guide */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
          <span className="font-bold text-emerald-400 block mb-1">Tier 1: Done Deal</span>
          <p className="text-[11px] text-slate-400">100% verified by David Ornstein, Fabrizio Romano, or official club press.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs">
          <span className="font-bold text-blue-400 block mb-1">Tier 2: Advanced Talks</span>
          <p className="text-[11px] text-slate-400">Official bids submitted, direct club negotiations active.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs">
          <span className="font-bold text-amber-400 block mb-1">Tier 3: Emerging Interest</span>
          <p className="text-[11px] text-slate-400">Scouting missions, exploratory agent inquiries.</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs">
          <span className="font-bold text-slate-400 block mb-1">Tier 4: Early Speculation</span>
          <p className="text-[11px] text-slate-400">Market rumors requiring further cross-source authentication.</p>
        </div>
      </div>

      {/* Rumors Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {rumors.map((r: any) => (
          <div
            key={r.id}
            className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {r.position}
                </span>
                <RumorTierBadge tier={r.rumorTier} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {r.playerName}
              </h3>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs mb-3">
                <div>
                  <span className="text-[10px] text-slate-500 block">Current Club</span>
                  <span className="font-bold text-slate-300">{r.currentClub}</span>
                </div>
                <div className="text-emerald-400 font-bold">➔</div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Target Club</span>
                  <span className="font-bold text-emerald-400">{r.targetClub}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs mb-3 font-mono">
                <span className="text-slate-400">Reported Package:</span>
                <span className="text-white font-extrabold">{r.transferFee}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                {r.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Source: <strong className="text-slate-300">{r.sourceName}</strong></span>
              <span className="text-emerald-400 font-semibold">{r.confidenceScore}% Verified</span>
            </div>
          </div>
        ))}
      </div>

      <AdBanner slot="footer-banner" />
    </div>
  );
}
