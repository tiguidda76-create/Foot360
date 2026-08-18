"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Play,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  Check,
  ShieldCheck,
  Globe,
  Terminal,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

interface PipelineLog {
  stage: string;
  agent: string;
  status: "SUCCESS" | "WARNING" | "FAILED";
  timestamp: string;
  output: any;
}

export default function PipelineAdminPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [logs, setLogs] = useState<PipelineLog[]>([]);

  const agents = [
    {
      id: "scout",
      name: "1. Scout Agent",
      role: "Data Ingestion & Wire Telemetry",
      description: "Connects to match feeds, Opta statistics, and primary journalist press transcripts.",
      icon: Search,
      color: "border-blue-500/40 bg-blue-950/20 text-blue-400",
    },
    {
      id: "factchecker",
      name: "2. FactChecker Agent",
      role: "Cross-Source Verification & Tiering",
      description: "Applies 4-tier rumor classification, filters hearsay, and verifies on-record quotes.",
      icon: Check,
      color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-400",
    },
    {
      id: "sportsreporter",
      name: "3. SportsReporter Agent",
      role: "Tactical & Narrative Journalism",
      description: "Generates 500+ word structured articles with pitch geometry, xG analysis, and managerial quotes.",
      icon: FileText,
      color: "border-amber-500/40 bg-amber-950/20 text-amber-400",
    },
    {
      id: "seogeo",
      name: "4. SEO_GEO_Expert Agent",
      role: "JSON-LD Schema & GEO Keywords",
      description: "Builds NewsArticle / SportsEvent structured schema and localized European market tags.",
      icon: Globe,
      color: "border-purple-500/40 bg-purple-950/20 text-purple-400",
    },
    {
      id: "compliance",
      name: "5. ComplianceEditor Agent",
      role: "Google AdSense & E-E-A-T Audit",
      description: "Audits for thin content, verifies citations, and binds to accredited analyst profiles.",
      icon: ShieldCheck,
      color: "border-teal-500/40 bg-teal-950/20 text-teal-400",
    },
  ];

  const handleRunPipeline = async () => {
    setIsRunning(true);
    setResult(null);
    setLogs([]);

    try {
      const res = await fetch("/api/pipeline/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: category || undefined }),
      });
      const data = await res.json();
      setResult(data);
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (err: any) {
      console.error(err);
      setResult({ success: false, error: err.message });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-3">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Autonomous Intelligence Runtime</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Multi-Agent Pipeline Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Trigger, inspect, and monitor the 5 specialized autonomous agents producing compliant, original European football journalism.
          </p>
        </div>

        {/* Trigger Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isRunning}
            className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="">Any Category (Auto Scout)</option>
            <option value="MATCH_REPORT">Match Report & xG</option>
            <option value="TACTICAL_ANALYSIS">Tactical Deep Dive</option>
            <option value="TRANSFER_RADAR">Transfer Wire (Tier 1-4)</option>
          </select>

          <button
            onClick={handleRunPipeline}
            disabled={isRunning}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
              isRunning
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Agents...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Run Pipeline Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5-Agent Visual Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {agents.map((ag) => {
          const Icon = ag.icon;
          return (
            <div
              key={ag.id}
              className={`p-4 rounded-2xl border ${ag.color} flex flex-col justify-between space-y-3`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                    Active
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-white">{ag.name}</h3>
                <p className="text-[11px] font-semibold text-slate-300">{ag.role}</p>
                <p className="text-[10px] text-slate-400 leading-relaxed">{ag.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outcome & Log Terminal */}
      {result && (
        <div className="space-y-6 mb-12">
          <div
            className={`p-6 rounded-2xl border ${
              result.success
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                : "bg-red-950/40 border-red-500/40 text-red-200"
            } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
          >
            <div>
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                )}
                <h3 className="font-extrabold text-base text-white">
                  {result.success ? "Autonomous Article Published Successfully!" : "Pipeline Execution Notice"}
                </h3>
              </div>
              {result.title && (
                <p className="text-xs text-slate-300 mt-1 font-medium">&ldquo;{result.title}&rdquo;</p>
              )}
              {result.complianceScore && (
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-400 font-mono font-bold border border-emerald-800">
                    E-E-A-T Score: {result.complianceScore}/100
                  </span>
                  {result.rumorTier && (
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-blue-400 font-mono font-bold border border-blue-800">
                      Assigned: Tier {result.rumorTier}
                    </span>
                  )}
                </div>
              )}
            </div>

            {result.slug && (
              <Link
                href={`/news/${result.slug}`}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition"
              >
                <span>View Live Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Terminal Real-Time Logs */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 font-mono">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Multi-Agent Live Execution Terminal</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            {logs.length > 0 ? `${logs.length} Stage Logs` : "Awaiting Trigger..."}
          </span>
        </div>

        <div className="space-y-4 font-mono text-xs max-h-96 overflow-y-auto pr-2">
          {logs.length > 0 ? (
            logs.map((lg, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-400">{lg.stage}</span>
                  <span className="text-slate-500" suppressHydrationWarning>
                    {typeof window !== "undefined" ? new Date(lg.timestamp).toLocaleTimeString() : ""}
                  </span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Executed by: <strong className="text-white">{lg.agent}</strong> • Status:{" "}
                  <span className="text-emerald-400 font-bold">{lg.status}</span>
                </div>
                <pre className="text-[10px] text-slate-400 bg-slate-950 p-2 rounded overflow-x-auto">
                  {JSON.stringify(lg.output, null, 2)}
                </pre>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-600 italic">
              Click &quot;Run Pipeline Now&quot; above to initiate an autonomous 5-agent execution cycle.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
