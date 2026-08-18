import React from "react";
import AdBanner from "@/components/AdBanner";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Privacy & Cookie Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Effective Date: January 1, 2026 • Compliant with GDPR & Google AdSense Disclosures
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed p-8 rounded-2xl bg-slate-900 border border-slate-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Introduction</h2>
          <p>
            Foot360 (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is dedicated to protecting your privacy. This policy explains how we handle information when you visit our website, read our tactical analyses, or interact with our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Google AdSense & Advertising Cookies</h2>
          <p>
            We use Google AdSense and third-party advertising partners to serve ads when you visit our website. These companies may use cookies, web beacons, and similar technologies to collect non-personal information (such as your browser type, time and date, subject of advertisements clicked or scrolled over) to provide advertisements about goods and services likely to be of greater interest to you.
          </p>
          <p>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Google Ad Settings</a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Data Collection & Analytics</h2>
          <p>
            We collect anonymized telemetry regarding page views, reading time, and referral sources to optimize the delivery and relevance of our European football coverage. We do not sell personal data to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Your Rights under GDPR</h2>
          <p>
            If you are an EU resident, you have the right to access, rectify, or request deletion of any personal data stored with us. For inquiries, contact privacy@foot360.com.
          </p>
        </section>
      </div>

      <AdBanner slot="footer-banner" className="mt-12" />
    </div>
  );
}
