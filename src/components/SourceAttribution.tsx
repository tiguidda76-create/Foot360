import React from "react";
import { CheckCircle, ExternalLink, Quote } from "lucide-react";

interface SourceItem {
  name: string;
  tier?: number;
  url?: string;
  speaker?: string;
  quote?: string;
}

interface SourceAttributionProps {
  sourcesString?: string;
  sourcesArray?: SourceItem[];
}

export default function SourceAttribution({ sourcesString, sourcesArray }: SourceAttributionProps) {
  let sources: SourceItem[] = [];

  if (sourcesArray) {
    sources = sourcesArray;
  } else if (sourcesString) {
    try {
      sources = JSON.parse(sourcesString);
    } catch {
      sources = [{ name: sourcesString, tier: 1 }];
    }
  }

  if (sources.length === 0) return null;

  return (
    <div className="my-6 p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Source Attribution & Verification Audit (E-E-A-T)
        </h4>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {sources.map((s, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-semibold">{s.name}</span>
              {s.tier && (
                <span className="text-[10px] bg-slate-700 px-1 rounded text-emerald-300 font-mono">
                  Tier {s.tier}
                </span>
              )}
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {sources.some((s) => s.quote) && (
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            {sources
              .filter((s) => s.quote)
              .map((s, idx) => (
                <div key={idx} className="flex gap-2 text-xs italic text-slate-400">
                  <Quote className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span>&ldquo;{s.quote}&rdquo;</span>
                    {s.speaker && <span className="block font-medium text-slate-300 not-italic mt-0.5">— {s.speaker}</span>}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <p className="mt-3 text-[10px] text-slate-400">
        In compliance with Foot360 Editorial Verification Standards, all claims are verified against primary press transcripts or tier-1 wire telemetry before publication.
      </p>
    </div>
  );
}
