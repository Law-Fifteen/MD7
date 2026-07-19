import { ArrowRight, MessageSquareText } from "lucide-react";
import { academyContent } from "../content/generatedContent";
import { GlassPanel } from "./GlassPanel";

type Props = { onOpenChapter: (id: string) => void };

export function ManagerCoachingQuestionsPage({ onOpenChapter }: Props) {
  const chaptersWithQuestions = academyContent.chapters.filter(c => c.coachingQuestions.length > 0);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-teal">Coaching</p>
        <h2 className="mt-2 text-3xl font-semibold">Manager Coaching Questions</h2>
        <p className="mt-3 max-w-2xl text-base text-white/60">Questions that improve judgment, not just activity.</p>
      </div>
      <div className="space-y-8">
        {chaptersWithQuestions.map(chapter => (
          <div key={chapter.id}>
            <button onClick={() => onOpenChapter(chapter.id)} className="group mb-4 flex items-center gap-2 text-lg font-semibold text-white/90 transition hover:text-teal">
              <span>Ch. {chapter.number} — {chapter.title}</span>
              <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
            </button>
            <div className="grid gap-4 md:grid-cols-2">
              {chapter.coachingQuestions.map((question, i) => (
                <GlassPanel key={i} className="flex gap-4 p-5">
                  <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  <p className="text-sm leading-6 text-white/72">{question}</p>
                </GlassPanel>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
