import React from "react";
import { getTierInfo } from "../lib/utils";

interface RumorTierBadgeProps {
  tier?: number | null;
  showDescription?: boolean;
}

export default function RumorTierBadge({ tier = 2, showDescription = false }: RumorTierBadgeProps) {
  if (!tier) return null;
  const info = getTierInfo(tier);

  return (
    <div className="inline-flex flex-col">
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold tracking-wide ${info.color}`}
      >
        <span className={`w-2 h-2 rounded-full ${info.badgeBg} animate-pulse`} />
        <span>{info.shortLabel}</span>
      </div>
      {showDescription && (
        <p className="mt-1 text-[11px] text-slate-400 max-w-xs">{info.description}</p>
      )}
    </div>
  );
}
