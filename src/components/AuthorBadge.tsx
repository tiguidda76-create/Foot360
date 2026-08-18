"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface AuthorProps {
  author?: {
    name: string;
    slug: string;
    avatar: string;
    role: string;
    bio?: string;
    credentials: string;
    twitterHandle?: string | null;
  } | null;
  publishedAt?: Date | string;
}

export default function AuthorBadge({ author, publishedAt }: AuthorProps) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (publishedAt) {
      const d = typeof publishedAt === "string" ? new Date(publishedAt) : publishedAt;
      setFormattedDate(
        d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    }
  }, [publishedAt]);

  const defaultAuthor = {
    name: "Julian Sterling",
    slug: "julian-sterling",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "Senior European Football Correspondent",
    credentials: "UEFA B License Holder • 12+ Years European Match Coverage (Guardian / Opta Alum)",
    twitterHandle: "@jsterling_foot",
  };

  const a = author || defaultAuthor;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Link href={`/authors/${a.slug}`} className="group relative flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.avatar}
            alt={a.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/50 group-hover:ring-emerald-400 transition"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 text-slate-950">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={`/authors/${a.slug}`}
              className="font-bold text-slate-100 hover:text-emerald-400 transition text-sm sm:text-base flex items-center gap-1.5"
            >
              {a.name}
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </Link>
            {a.twitterHandle && (
              <span className="text-xs text-slate-400 font-mono">{a.twitterHandle}</span>
            )}
          </div>
          <p className="text-xs text-emerald-400/90 font-medium">{a.role}</p>
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{a.credentials}</p>
        </div>
      </div>

      {publishedAt && (
        <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
            Verified Story
          </span>
          <span className="text-xs text-slate-300 font-mono" suppressHydrationWarning>
            {formattedDate || "Aug 2026"}
          </span>
        </div>
      )}
    </div>
  );
}
