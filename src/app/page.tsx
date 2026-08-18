import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Flame,
  FileText,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import prisma from "../lib/prisma";
import AdBanner from "../components/AdBanner";
import RumorTierBadge from "../components/RumorTierBadge";
import AuthorBadge from "../components/AuthorBadge";

export const revalidate = 60; // ISR Revalidate every 60 seconds

export default async function HomePage() {
  let posts: any[] = [];
  let rumors: any[] = [];
  let liveMatches: any[] = [];

  try {
    posts = await prisma.post.findMany({
      include: {
        author: true,
        league: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 8,
    });

    rumors = await prisma.transferRumor.findMany({
      orderBy: { verifiedAt: "desc" },
      take: 5,
    });

    liveMatches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
      take: 4,
    });
  } catch (err) {
    console.warn("DB Query fallback in HomePage", err);
  }

  const featuredPost = posts[0] || {
    title: "Arsenal 3-1 Real Madrid: Arteta's Pressing Trap Dismantles European Royalty at the Emirates",
    slug: "arsenal-3-1-real-madrid-tactical-mastery-champions-league",
    excerpt: "Mikel Arteta orchestrated a European tactical masterclass as Arsenal dismantled Real Madrid 3-1 behind suffocating counter-pressing and half-space overloads.",
    coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    category: "MATCH_REPORT",
    publishedAt: new Date(),
    author: {
      name: "Julian Sterling",
      slug: "julian-sterling",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      role: "Senior European Tactical Correspondent",
      credentials: "UEFA B License • FWA Member",
    },
    complianceScore: 98,
    rumorTier: null,
  };

  const secondaryPosts = posts.slice(1, 5);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Top Header Leaderboard Ad Slot */}
      <AdBanner slot="header-leaderboard" />

      {/* Hero Section: Breaking & Featured Deep Dive */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400">
              European Lead Story & Tactical Breakdown
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            E-E-A-T Verified • Score: {featuredPost.complianceScore}/100
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Card */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl glass-card-hover">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                  {featuredPost.category?.replace("_", " ")}
                </span>
                {featuredPost.rumorTier && (
                  <RumorTierBadge tier={featuredPost.rumorTier} />
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 -mt-16 sm:-mt-20 relative z-10">
              <Link href={`/news/${featuredPost.slug}`}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white hover:text-emerald-400 transition leading-tight mb-3">
                  {featuredPost.title}
                </h1>
              </Link>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredPost.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={featuredPost.author?.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">
                      {featuredPost.author?.name}
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      {featuredPost.author?.role}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/news/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  <span>Read Full Tactical Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Transfer Radar & Wire Desk Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md shadow-xl flex-1">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                    Live Transfer Radar
                  </h3>
                </div>
                <Link
                  href="/transfers"
                  className="text-xs font-bold text-emerald-400 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {rumors.length > 0 ? (
                  rumors.map((r: any) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/30 transition space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">
                          {r.playerName}
                        </span>
                        <RumorTierBadge tier={r.rumorTier} />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{r.currentClub} ➔ <strong className="text-slate-200">{r.targetClub}</strong></span>
                        <span className="font-mono text-emerald-400 font-bold">{r.transferFee}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{r.summary}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">Transfer feeds updating...</p>
                )}
              </div>
            </div>

            {/* In-sidebar Ad */}
            <AdBanner slot="sidebar-rectangle" className="my-0" />
          </div>
        </div>
      </section>

      {/* Grid of Latest Tactical & Match Reports */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-extrabold text-white">
              Tactical Deep Dives & European Coverage
            </h2>
          </div>
          <Link
            href="/leagues/champions-league"
            className="text-xs font-semibold text-slate-400 hover:text-emerald-400 flex items-center gap-1"
          >
            Explore Leagues <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryPosts.map((post: any) => (
            <article
              key={post.id}
              className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden glass-card-hover shadow-lg"
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
                  {post.rumorTier && <RumorTierBadge tier={post.rumorTier} />}
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

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">
                    {post.author?.name}
                  </span>
                  <Link
                    href={`/news/${post.slug}`}
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Read Analysis →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* In-Article / Mid-page Ad Banner */}
      <AdBanner slot="in-article" />

      {/* Autonomous Multi-Agent Spotlight */}
      <section className="my-14 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Autonomous Multi-Agent Journalism</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Verified European Football Intelligence
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Every Foot360 story is processed through our autonomous 5-Agent pipeline (Scout, FactChecker, SportsReporter, SEO_GEO_Expert, ComplianceEditor) guaranteeing on-record attribution, deep tactical perspective, and 100% Google AdSense & E-E-A-T quality compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href="/admin/pipeline"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm text-center transition shadow-lg shadow-emerald-500/20"
            >
              Open Multi-Agent Mission Control
            </Link>
            <Link
              href="/editorial-policy"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm text-center border border-slate-700 transition"
            >
              View Verification Standards
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
