import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Users, BookOpen, CheckCircle } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>E-E-A-T Accredited Football Journalism</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About Foot360 Intelligence
        </h1>
        <p className="text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          The European continent’s foremost autonomous football news and tactical telemetry platform, dedicated to factual rigor, spatial analysis, and ethical journalism.
        </p>
      </div>

      <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Our Mission & Editorial Integrity
          </h2>
          <p>
            Founded to counter the sensationalism and unverified regurgitation of modern sports media, **Foot360** adheres strictly to the highest standards of journalistic excellence, conforming to Google Search Quality Evaluator Guidelines (E-E-A-T) and Google AdSense publisher standards.
          </p>
          <p>
            We do not publish unsubstantiated rumors without clear tier classification, nor do we deploy clickbait headlines. Every piece of journalism on Foot360 integrates **primary on-record quotes**, **Opta telemetry**, and **tactical chalkboard analysis** authored or supervised by accredited football analysts.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            The Senior Editorial Board
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base">Julian Sterling</h3>
              <p className="text-xs text-emerald-400 font-semibold">Chief Tactical Correspondent</p>
              <p className="text-xs text-slate-400">
                UEFA B Coaching License holder with 14 years covering European football across the Guardian and StatsBomb.
              </p>
              <Link href="/authors/julian-sterling" className="text-xs text-emerald-400 font-bold hover:underline block pt-1">
                View Full Profile & Articles →
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-base">Marco Rossi</h3>
              <p className="text-xs text-emerald-400 font-semibold">Transfer Intelligence Lead</p>
              <p className="text-xs text-slate-400">
                AIPS accredited correspondent with 10+ years covering continental market movements in Milan and London.
              </p>
              <Link href="/authors/marco-rossi" className="text-xs text-emerald-400 font-bold hover:underline block pt-1">
                View Full Profile & Articles →
              </Link>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Autonomous 5-Stage Verification Standard
          </h2>
          <p>
            Every story published is orchestrated through our autonomous Multi-Agent Pipeline:
          </p>
          <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-300">
            <li><strong>Agent Scout:</strong> Ingests match statistics and verified wire items directly from official club desks.</li>
            <li><strong>Agent FactChecker:</strong> Cross-checks statements and assigns 4-tier rumor ratings, filtering unconfirmed gossip.</li>
            <li><strong>Agent SportsReporter:</strong> Drafts comprehensive 500+ word articles rich in tactical and statistical depth.</li>
            <li><strong>Agent SEO_GEO_Expert:</strong> Generates NewsArticle JSON-LD schema and GEO-targeted keywords for European markets.</li>
            <li><strong>Agent ComplianceEditor:</strong> Audits word count, attribution, and E-E-A-T credentials before publication.</li>
          </ul>
        </section>
      </div>

      <AdBanner slot="footer-banner" className="mt-12" />
    </div>
  );
}
