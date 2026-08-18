import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Globe, Award, FileText, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-20" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
                360
              </div>
              <span className="text-xl font-black text-white">
                FOOT<span className="text-emerald-400">360</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Foot360 is Europe’s premier autonomous football intelligence and tactical analysis platform. We deliver verified match reporting, rigorous statistical telemetry, and authenticated transfer intelligence across the continent’s leading leagues.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Accredited E-E-A-T Journalism & Google AdSense Quality Certified</span>
            </div>
          </div>

          {/* Col 2: Top European Leagues */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              European Leagues
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/leagues/premier-league" className="hover:text-emerald-400 transition">
                  Premier League (England)
                </Link>
              </li>
              <li>
                <Link href="/leagues/la-liga" className="hover:text-emerald-400 transition">
                  La Liga (Spain)
                </Link>
              </li>
              <li>
                <Link href="/leagues/bundesliga" className="hover:text-emerald-400 transition">
                  Bundesliga (Germany)
                </Link>
              </li>
              <li>
                <Link href="/leagues/serie-a" className="hover:text-emerald-400 transition">
                  Serie A (Italy)
                </Link>
              </li>
              <li>
                <Link href="/leagues/ligue-1" className="hover:text-emerald-400 transition">
                  Ligue 1 (France)
                </Link>
              </li>
              <li>
                <Link href="/leagues/champions-league" className="hover:text-emerald-400 transition">
                  UEFA Champions League
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Editorial Standards & E-E-A-T */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              Editorial Standards
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/editorial-policy" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Editorial & Fact-Checking
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  About the Editorial Board
                </Link>
              </li>
              <li>
                <Link href="/authors/julian-sterling" className="hover:text-emerald-400 transition">
                  Accredited Correspondents
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="hover:text-emerald-400 transition">
                  Rumor Tiering Methodology
                </Link>
              </li>
              <li>
                <Link href="/admin/pipeline" className="hover:text-emerald-400 transition text-emerald-400 font-semibold">
                  Multi-Agent Intelligence System
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust, Legal & Compliance */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              Trust & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition">
                  Privacy & Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition">
                  Terms of Service & Licensing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">
                  Contact & Corrections Desk
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 block pt-2">
                  AdSense Publisher ID: ca-pub-0000000000000000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Disclaimers */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p suppressHydrationWarning>
            © 2026 Foot360 Media Group. All rights reserved. Club crests and trademarks are property of their respective holders and used for descriptive news reporting under fair dealing.
          </p>
          <div className="flex items-center gap-4">
            <span>Server Location: Frankfurt (EU-Central)</span>
            <span>•</span>
            <Link href="/editorial-policy#corrections" className="hover:text-slate-300 underline">
              Report an Editorial Correction
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
