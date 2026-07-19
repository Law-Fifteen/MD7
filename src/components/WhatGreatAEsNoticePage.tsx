import { ArrowRight, Eye } from "lucide-react";
import { academyContent } from "../content/generatedContent";
import { GlassPanel } from "./GlassPanel";

type Props = { onOpenChapter: (id: string) => void };

export function WhatGreatAEsNoticePage({ onOpenChapter }: Props) {
  const chaptersWithSignals = academyContent.chapters.filter(c => c.greatAeSignals.length > 0);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-teal">Signals</p>
        <h2 className="mt-2 text-3xl font-semibold">What Great AEs Notice</h2>
        <p className="mt-3 max-w-2xl text-base text-white/60">Behavioral cues that reveal what customers are really thinking.</p>
      </div>
      <div className="space-y-8">
        {chaptersWithSignals.map(chapter => (
          <div key={chapter.id}>
            <button onClick={() => onOpenChapter(chapter.id)} className="group mb-4 flex items-center gap-2 text-lg font-semibold text-white/90 transition hover:text-teal">
              <span>Ch. {chapter.number} — {chapter.title}</span>
              <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
            </button>
            <div className="grid gap-4 md:grid-cols-2">
              {chapter.greatAeSignals.map((signal, i) => (
                <GlassPanel key={i} className="flex gap-4 p-5">
                  <Eye className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  <p className="text-sm leading-6 text-white/72">{signal}</p>
                </GlassPanel>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
