import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Scale } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function EditorialPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-4">
          <Scale className="w-4 h-4" />
          <span>Journalistic Ethics & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Editorial & Fact-Checking Policy
        </h1>
        <p className="text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          Comprehensive E-E-A-T guidelines, source verification criteria, and our formal corrections procedure.
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* 1. Core Principles */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            1. Core Principles of Foot360 Journalism
          </h2>
          <p>
            Foot360 is committed to truth, accuracy, independence, and accountability. We reject sensationalism, misleading headlines, and fabricated transfer gossip. Our articles aim to provide readers with genuine tactical and analytical value.
          </p>
        </section>

        {/* 2. Source Attribution & Rumor Tiers */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-400" />
            2. Source Attribution & 4-Tier Verification
          </h2>
          <p>
            We require explicit attribution for all external statements, quotes, and reports. Transfer market coverage is categorized strictly under our 4-Tier System:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-emerald-400">Tier 1 (Verified / Done Deal):</strong> Primary source on-record statements, official club communications, or direct reporting from journalists with proven 95%+ reliability (e.g., David Ornstein, Fabrizio Romano).
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-blue-400">Tier 2 (Advanced Negotiations):</strong> Formal bids submitted, verified meetings between club executives or licensed player intermediaries.
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-amber-400">Tier 3 (Emerging Interest):</strong> Documented scouting presences or exploratory inquiries.
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-slate-400">Tier 4 (Early Speculation):</strong> Unconfirmed media reports clearly labeled as speculative with appropriate cautionary context.
            </div>
          </div>
        </section>

        {/* 3. AI & Human Oversight */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            3. AI Assistance & Editorial Oversight
          </h2>
          <p>
            While Foot360 utilizes state-of-the-art autonomous multi-agent pipelines for data synthesis and statistical telemetry extraction, every piece of content is governed by deterministic editorial constraints, source verification checks, and accredited sports analyst profiles to prevent thin or repetitive content.
          </p>
        </section>

        {/* 4. Corrections Policy */}
        <section id="corrections" className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-emerald-400" />
            4. Corrections Policy & Reporting Discrepancies
          </h2>
          <p>
            We promptly correct factual errors. When a substantive correction is made to an article, an explanatory note will be appended detailing the correction and timestamp.
          </p>
          <p>
            To report a factual error, please contact our editorial desk at <Link href="/contact" className="text-emerald-400 font-bold hover:underline">contact@foot360.com</Link> or use our correction submission form.
          </p>
        </section>
      </div>

      <AdBanner slot="footer-banner" className="mt-12" />
    </div>
  );
}
