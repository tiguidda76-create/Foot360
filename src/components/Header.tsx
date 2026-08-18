"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Sparkles,
  Search,
  Trophy,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import MatchTicker from "./MatchTicker";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leaguesDropdownOpen, setLeaguesDropdownOpen] = useState(false);

  const leagues = [
    { name: "Premier League", slug: "premier-league", country: "England" },
    { name: "La Liga", slug: "la-liga", country: "Spain" },
    { name: "Bundesliga", slug: "bundesliga", country: "Germany" },
    { name: "Serie A", slug: "serie-a", country: "Italy" },
    { name: "Ligue 1", slug: "ligue-1", country: "France" },
    { name: "Champions League", slug: "champions-league", country: "Europe" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <MatchTicker />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
              360
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                FOOT<span className="text-emerald-400">360</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-400/80 font-bold block -mt-1">
                European Football Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition"
            >
              Latest News
            </Link>

            {/* Transfers */}
            <Link
              href="/transfers"
              className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              Transfer Radar
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Live
              </span>
            </Link>

            {/* Matches */}
            <Link
              href="/matches"
              className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Matchday Center
            </Link>

            {/* Leagues Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLeaguesDropdownOpen(true)}
              onMouseLeave={() => setLeaguesDropdownOpen(false)}
            >
              <button
                className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition flex items-center gap-1 py-2"
                onClick={() => setLeaguesDropdownOpen(!leaguesDropdownOpen)}
              >
                Top Leagues
                <ChevronDown className="w-4 h-4" />
              </button>

              {leaguesDropdownOpen && (
                <div className="absolute top-full left-0 w-60 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
                  {leagues.map((l) => (
                    <Link
                      key={l.slug}
                      href={`/leagues/${l.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition"
                      onClick={() => setLeaguesDropdownOpen(false)}
                    >
                      <span>{l.name}</span>
                      <span className="text-[10px] text-slate-400">{l.country}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Editorial Policy & Standards */}
            <Link
              href="/editorial-policy"
              className="text-xs font-semibold text-slate-400 hover:text-emerald-300 transition flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              E-E-A-T Standards
            </Link>
          </nav>

          {/* Right Actions: AI Agent Center & Search */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin/pipeline"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Multi-Agent Live Hub</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/admin/pipeline"
              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-base font-semibold text-slate-200 hover:text-emerald-400 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Latest News
            </Link>
            <Link
              href="/transfers"
              className="text-base font-semibold text-slate-200 hover:text-emerald-400 py-1 flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                Transfer Radar
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                Live
              </span>
            </Link>
            <Link
              href="/matches"
              className="text-base font-semibold text-slate-200 hover:text-emerald-400 py-1 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Matchday Center
            </Link>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-2">
                European Leagues
              </span>
              <div className="grid grid-cols-2 gap-2">
                {leagues.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/leagues/${l.slug}`}
                    className="p-2 rounded bg-slate-900 text-xs font-medium text-slate-200 hover:text-emerald-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col space-y-2 text-xs text-slate-400">
              <Link
                href="/editorial-policy"
                className="hover:text-emerald-300 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Editorial Policy & Fact-Checking
              </Link>
              <Link
                href="/about"
                className="hover:text-emerald-300 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Foot360 Team
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
