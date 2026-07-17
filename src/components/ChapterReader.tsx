import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight, MessageSquareText } from "lucide-react";
import type { Chapter } from "../types";
import { GlassPanel } from "./GlassPanel";
import { ProgressBar } from "./ProgressBar";

type ChapterReaderProps = {
  chapter: Chapter;
  progress: number;
  reflection: string;
  isComplete: boolean;
  onReflectionChange: (value: string) => void;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function ChapterReader({
  chapter,
  progress,
  reflection,
  isComplete,
  onReflectionChange,
  onComplete,
  onNext,
  onPrevious,
}: ChapterReaderProps) {
  const visibleSections = chapter.sections.filter((section) => section.items.length > 0).slice(0, 8);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_0.28fr]">
      <GlassPanel className="p-6 sm:p-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-teal">Chapter {chapter.number}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{chapter.title}</h2>
            {chapter.quote ? <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">"{chapter.quote}"</p> : null}
          </div>
          <button className="rounded-2xl border border-white/15 p-3 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Bookmark chapter">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8">
          <ProgressBar value={progress} label="Reading progress" />
        </div>

        <div className="space-y-7">
          {visibleSections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <div className="mt-4 space-y-3 text-base leading-8 text-white/72">
                {section.items.slice(0, 8).map((item, index) => (
                  <p key={`${section.title}-${index}`}>{item}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <button
            onClick={onPrevious}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-sm text-white/72 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={onNext}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-academy transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            Next Chapter <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </GlassPanel>

      <aside className="space-y-6">
        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Objectives</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/70">
            {chapter.objectives.slice(0, 6).map((objective) => (
              <p key={objective}>{objective}</p>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="mb-4 flex items-center gap-2 text-teal">
            <MessageSquareText className="h-5 w-5" />
            <p className="text-xs uppercase tracking-[0.22em]">Reflection</p>
          </div>
          <textarea
            value={reflection}
            onChange={(event) => onReflectionChange(event.target.value)}
            className="min-h-40 w-full resize-none rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-white/35 focus:border-teal"
            placeholder="What would this change in your next customer conversation?"
          />
          <p className="mt-3 text-xs text-white/45">Autosaved locally.</p>
        </GlassPanel>

        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Manager Coaching</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/70">
            {chapter.coachingQuestions.slice(0, 4).map((question) => (
              <p key={question}>{question}</p>
            ))}
          </div>
          <button
            onClick={onComplete}
            className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
              isComplete ? "bg-emerald/20 text-emerald" : "bg-teal text-ink hover:-translate-y-0.5"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isComplete ? "Chapter complete" : "Mark complete"}
          </button>
        </GlassPanel>
      </aside>
    </div>
  );
}
