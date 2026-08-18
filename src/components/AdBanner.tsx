"use client";

import React, { useEffect } from "react";

interface AdBannerProps {
  slot: "header-leaderboard" | "in-article" | "sidebar-rectangle" | "footer-banner" | "sticky-bottom";
  className?: string;
}

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isLive = adsenseClientId && !adsenseClientId.includes("00000000");

  useEffect(() => {
    if (isLive) {
      try {
        // @ts-expect-error - Google AdSense window global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error", e);
      }
    }
  }, [isLive]);

  const slotDimensions: Record<string, { height: string; label: string; dimensions: string }> = {
    "header-leaderboard": { height: "h-24 md:h-28", label: "Top Leaderboard Ad Slot", dimensions: "728x90 / 970x90 Responsive" },
    "in-article": { height: "h-48 md:h-64", label: "In-Article Content Ad Slot", dimensions: "Responsive Fluid / 300x250" },
    "sidebar-rectangle": { height: "h-72", label: "Sidebar High-Impact Ad Slot", dimensions: "300x250 / 300x600 Half-Page" },
    "footer-banner": { height: "h-28", label: "Footer Super Leaderboard", dimensions: "970x250 / 728x90" },
    "sticky-bottom": { height: "h-16 md:h-20", label: "Mobile Sticky Anchor Ad", dimensions: "320x50 / 728x90" },
  };

  const current = slotDimensions[slot] || slotDimensions["in-article"];

  return (
    <div
      className={`relative my-6 overflow-hidden rounded-xl border border-dashed border-emerald-500/20 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/80 p-4 text-center backdrop-blur-sm ${current.height} flex flex-col items-center justify-center ${className}`}
    >
      {isLive ? (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={adsenseClientId}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-1.5 opacity-80 transition hover:opacity-100">
          <div className="flex items-center space-x-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
              Google AdSense Slot
            </span>
          </div>
          <p className="text-xs font-medium text-slate-300">{current.label}</p>
          <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
            {current.dimensions}
          </span>
          <span className="text-[10px] text-slate-400">Compliant with Google AdSense Better Ads Standards</span>
        </div>
      )}
    </div>
  );
}
