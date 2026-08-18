import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

export function formatShortDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
  }).format(d);
}

export function getTierInfo(tier: number) {
  switch (tier) {
    case 1:
      return {
        label: "Tier 1: Verified / Done Deal",
        shortLabel: "Tier 1",
        color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        badgeBg: "bg-emerald-500",
        description: "Confirmed by Tier-1 sources (David Ornstein, Fabrizio Romano, Official Club).",
      };
    case 2:
      return {
        label: "Tier 2: Advanced Negotiations",
        shortLabel: "Tier 2",
        color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        badgeBg: "bg-blue-500",
        description: "Direct talks occurring between clubs or player reps. Highly reliable.",
      };
    case 3:
      return {
        label: "Tier 3: Emerging Interest",
        shortLabel: "Tier 3",
        color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        badgeBg: "bg-amber-500",
        description: "Scouting reports, exploratory inquiries, or agent meetings.",
      };
    case 4:
    default:
      return {
        label: "Tier 4: Early Speculation",
        shortLabel: "Tier 4",
        color: "bg-slate-500/20 text-slate-300 border-slate-500/30",
        badgeBg: "bg-slate-500",
        description: "Speculative reports requiring further cross-validation.",
      };
  }
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
