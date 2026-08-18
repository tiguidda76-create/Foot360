import React from "react";
import { Activity, Shield, Target } from "lucide-react";

interface TacticalPitchProps {
  homeTeam?: string;
  awayTeam?: string;
  formationHome?: string;
  formationAway?: string;
  tacticalNotes?: string | null;
  className?: string;
}

export default function TacticalPitch({
  homeTeam = "Home Side",
  awayTeam = "Away Side",
  formationHome = "4-3-3 Attacking",
  formationAway = "4-2-3-1 Low-Block",
  tacticalNotes,
  className = "",
}: TacticalPitchProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-950 p-6 shadow-2xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-4 mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Foot360 Tactical Chalkboard
          </span>
          <h3 className="text-lg font-extrabold text-white">
            {homeTeam} vs {awayTeam}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono">
            {formationHome}
          </span>
          <span className="text-slate-500">vs</span>
          <span className="px-2.5 py-1 rounded bg-blue-950 border border-blue-700 text-blue-300 font-mono">
            {formationAway}
          </span>
        </div>
      </div>

      {/* Football Pitch Graphic */}
      <div className="relative h-64 sm:h-72 w-full rounded-xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-900/60 via-emerald-950 to-slate-950 p-4 overflow-hidden">
        {/* Pitch Lines */}
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-emerald-500/30" />
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/30" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400" />
        {/* Penalty boxes */}
        <div className="absolute inset-x-1/4 top-0 h-14 rounded-b-lg border-b border-x border-emerald-500/30" />
        <div className="absolute inset-x-1/4 bottom-0 h-14 rounded-t-lg border-t border-x border-emerald-500/30" />

        {/* Tactical Nodes: Home Team (Top half / Green) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center ring-2 ring-emerald-300 shadow-lg">
            9
          </div>
          <span className="text-[10px] font-bold text-emerald-200 mt-1">CF (Press Trigger)</span>
        </div>

        <div className="absolute top-12 left-1/4 -translate-x-1/2 flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center ring-2 ring-emerald-300 shadow-lg">
            7
          </div>
          <span className="text-[10px] font-bold text-emerald-200 mt-1">LW (Inverted)</span>
        </div>

        <div className="absolute top-12 right-1/4 translate-x-1/2 flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center ring-2 ring-emerald-300 shadow-lg">
            11
          </div>
          <span className="text-[10px] font-bold text-emerald-200 mt-1">RW (Half-space)</span>
        </div>

        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-emerald-400 shadow-lg">
            8
          </div>
          <span className="text-[10px] font-bold text-emerald-300 mt-1">CAM Overload</span>
        </div>

        {/* Passing Line Indicator */}
        <div className="absolute top-20 left-1/3 w-1/3 h-0.5 border-t border-dashed border-emerald-400/80 -rotate-12" />

        {/* Away Team (Bottom half / Blue) */}
        <div className="absolute bottom-16 left-1/3 flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-blue-400 shadow-lg">
            6
          </div>
          <span className="text-[10px] font-bold text-blue-200 mt-1">Double Pivot</span>
        </div>

        <div className="absolute bottom-16 right-1/3 flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-blue-400 shadow-lg">
            4
          </div>
          <span className="text-[10px] font-bold text-blue-200 mt-1">Screen</span>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-blue-700 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-blue-300 shadow-lg">
            1
          </div>
          <span className="text-[10px] font-bold text-blue-200 mt-1">GK</span>
        </div>
      </div>

      {/* Key Strategic Takeaway */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          <Activity className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>High Rest-Defense Line (42m avg)</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          <Target className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Half-Space Overload Exploited</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          <Shield className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>Counter-Press Recovery: 4.1s</span>
        </div>
      </div>

      {tacticalNotes && (
        <div className="mt-3 text-xs text-slate-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 italic">
          &ldquo;{tacticalNotes}&rdquo;
        </div>
      )}
    </div>
  );
}
