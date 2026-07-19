import { ArrowRight } from "lucide-react";
import { ifThisThenThatData } from "../content/ifThisThenThat";
import { academyContent } from "../content/generatedContent";
import { GlassPanel } from "./GlassPanel";

type Props = { onOpenChapter: (id: string) => void };

export function IfThisThenThatPage({ onOpenChapter }: Props) {
  const entries = Object.entries(ifThisThenThatData);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-teal">Field Intelligence</p>
        <h2 className="mt-2 text-3xl font-semibold">If This, Then That</h2>
        <p className="mt-3 max-w-2xl text-base text-white/60">What customers say, what they mean, and how to respond.</p>
      </div>
      <div className="space-y-8">
        {entries.map(([chapterId, items]) => {
          const chapter = academyContent.chapters.find(c => c.id === chapterId);
          if (!chapter || items.length === 0) return null;
          return (
            <div key={chapterId}>
              <button onClick={() => onOpenChapter(chapterId)} className="group mb-4 flex items-center gap-2 text-lg font-semibold text-white/90 transition hover:text-teal">
                <span>Ch. {chapter.number} — {chapter.title}</span>
                <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </button>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, i) => (
                  <GlassPanel key={i} className="p-5">
                    <p className="text-sm font-semibold text-amber">"{item.if}"</p>
                    {item.theyMean && <p className="mt-2 text-xs text-white/50">They mean: {item.theyMean}</p>}
                    <p className="mt-2 text-sm leading-6 text-white/72">{item.then}</p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
