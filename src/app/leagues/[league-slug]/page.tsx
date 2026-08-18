import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Trophy, ArrowRight, ShieldCheck } from "lucide-react";
import prisma from "@/lib/prisma";
import AdBanner from "@/components/AdBanner";
import RumorTierBadge from "@/components/RumorTierBadge";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ "league-slug": string }>;
}

export default async function LeaguePage({ params }: PageProps) {
  const { "league-slug": leagueSlug } = await params;

  let league: any = null;
  let posts: any[] = [];

  try {
    league = await prisma.league.findUnique({
      where: { slug: leagueSlug },
      include: {
        teams: true,
      },
    });

    if (league) {
      posts = await prisma.post.findMany({
        where: { leagueId: league.id },
        include: { author: true },
        orderBy: { publishedAt: "desc" },
      });
    }
  } catch (err) {
    console.error("Failed to load league", err);
  }

  if (!league) {
    // Basic fallback for standard 6 leagues
    const leagueNames: Record<string, { name: string; country: string }> = {
      "premier-league": { name: "Premier League", country: "England" },
      "la-liga": { name: "La Liga", country: "Spain" },
      "bundesliga": { name: "Bundesliga", country: "Germany" },
      "serie-a": { name: "Serie A", country: "Italy" },
      "ligue-1": { name: "Ligue 1", country: "France" },
      "champions-league": { name: "UEFA Champions League", country: "Europe" },
    };

    if (leagueNames[leagueSlug]) {
      league = {
        name: leagueNames[leagueSlug].name,
        country: leagueNames[leagueSlug].country,
        slug: leagueSlug,
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdBanner slot="header-leaderboard" />

      {/* League Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-slate-800 mb-10 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>European Top Tier Coverage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">{league.name}</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Comprehensive tactical analysis, expected goals (xG) breakdowns, and verified transfer telemetry for {league.country}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-400 font-bold">
            Season 2025/26
          </span>
        </div>
      </div>

      {/* League News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <article
              key={post.id}
              className="flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden glass-card-hover shadow-lg"
            >
              <div className="relative h-48 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-emerald-400">
                    {post.category?.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/news/${post.slug}`}>
                    <h3 className="text-base font-bold text-white hover:text-emerald-400 transition line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {post.author?.name}
                  </span>
                  <Link
                    href={`/news/${post.slug}`}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Full Analysis →
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full p-8 rounded-xl bg-slate-900 text-center border border-slate-800 text-slate-400 text-sm">
            Fresh tactical dossiers for {league.name} are being compiled by the Foot360 Scout Agent.
          </div>
        )}
      </div>

      <AdBanner slot="footer-banner" />
    </div>
  );
}
