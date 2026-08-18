import React from "react";
import AdBanner from "@/components/AdBanner";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Terms of Service & Licensing
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Effective Date: January 1, 2026
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed p-8 rounded-2xl bg-slate-900 border border-slate-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Intellectual Property & Fair Dealing</h2>
          <p>
            All original editorial content, tactical chalkboard visualizations, analytical writings, and database schemas created by Foot360 are the exclusive property of Foot360 Media Group. Club crests, player trademarks, and competition badges are property of their respective governing bodies (UEFA, Premier League, La Liga, etc.) and are used strictly under fair dealing for non-commercial identification and reporting.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Accuracy of Sports Data & Disclaimers</h2>
          <p>
            While Foot360 utilizes verified statistical telemetry and on-record reporting, sports news involves dynamic real-world developments. Foot360 provides content &quot;as is&quot; for informational and entertainment purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. User Conduct</h2>
          <p>
            Reproduction of Foot360 articles in whole without explicit attribution and canonical backlink is prohibited. Automated scraping of our database without written consent is strictly disallowed.
          </p>
        </section>
      </div>

      <AdBanner slot="footer-banner" className="mt-12" />
    </div>
  );
}
