import { ArrowRight, CheckCircle2 } from "lucide-react";
import { exitGates } from "../content/ifThisThenThat";
import { academyContent } from "../content/generatedContent";
import { GlassPanel } from "./GlassPanel";

type Props = { onOpenChapter: (id: string) => void };

export function ExitGatesPage({ onOpenChapter }: Props) {
  const entries = Object.entries(exitGates);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-teal">Commitment Checkpoints</p>
        <h2 className="mt-2 text-3xl font-semibold">Exit Gates</h2>
        <p className="mt-3 max-w-2xl text-base text-white/60">What must be true before advancing to the next stage.</p>
      </div>
      <div className="space-y-8">
        {entries.map(([chapterKey, stages]) => {
          const chapter = academyContent.chapters.find(c => c.id.startsWith(chapterKey));
          if (!chapter) return null;
          return (
            <div key={chapterKey}>
              <button onClick={() => onOpenChapter(chapter.id)} className="group mb-4 flex items-center gap-2 text-lg font-semibold text-white/90 transition hover:text-teal">
                <span>Ch. {chapter.number} — {chapter.title}</span>
                <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </button>
              <div className="space-y-3">
                {stages.map((stage, i) => (
                  <GlassPanel key={i} className="flex items-start gap-4 p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    <div>
                      <p className="text-sm font-semibold text-white/90">{stage.stage}</p>
                      <p className="mt-1 text-sm text-white/60">{stage.gate}</p>
                    </div>
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
