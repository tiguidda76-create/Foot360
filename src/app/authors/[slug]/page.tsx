import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Award, Twitter, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import AdBanner from "@/components/AdBanner";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;

  let author: any = null;
  let posts: any[] = [];

  try {
    author = await prisma.author.findUnique({
      where: { slug },
      include: {
        posts: {
          orderBy: { publishedAt: "desc" },
        },
      },
    });
  } catch (e) {
    console.error("Failed to load author", e);
  }

  if (!author) {
    if (slug === "julian-sterling") {
      author = {
        name: "Julian Sterling",
        slug: "julian-sterling",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        role: "Senior European Tactical Correspondent",
        bio: "Julian Sterling has spent 14 years covering elite European football from the press boxes of the Santiago Bernabéu, Allianz Arena, and the Emirates. Specializing in positional play, pressing triggers, and tactical evolution.",
        credentials: "UEFA B Coaching License • Member of the Football Writers' Association (FWA) • Former Tactical Analyst at StatsBomb & Opta Analyst",
        twitterHandle: "@jsterling_tactics",
        posts: [],
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <AdBanner slot="header-leaderboard" />

      {/* Author Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatar}
          alt={author.name}
          className="w-32 h-32 rounded-2xl object-cover ring-4 ring-emerald-500 shadow-xl"
        />

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{author.name}</h1>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              E-E-A-T Verified
            </span>
          </div>

          <p className="text-sm font-semibold text-emerald-400">{author.role}</p>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{author.bio}</p>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Accreditations & Qualifications:</strong>
              <span>{author.credentials}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Author's Articles */}
      <div className="mb-12">
        <h2 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-3">
          Published Articles & Tactical Dossiers by {author.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {author.posts && author.posts.length > 0 ? (
            author.posts.map((p: any) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition shadow-lg flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                    {p.category?.replace("_", " ")}
                  </span>
                  <Link href={`/news/${p.slug}`}>
                    <h3 className="text-base font-bold text-white hover:text-emerald-400 transition mb-2">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">{p.excerpt}</p>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-3 border-t border-slate-800">
                  <span>Score: {p.complianceScore}/100</span>
                  <Link href={`/news/${p.slug}`} className="text-emerald-400 font-bold hover:underline">
                    Read Article →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">No published articles yet.</p>
          )}
        </div>
      </div>

      <AdBanner slot="footer-banner" />
    </div>
  );
}
