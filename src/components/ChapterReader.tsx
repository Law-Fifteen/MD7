import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import type { Chapter } from "../types";
import { GlassPanel } from "./GlassPanel";

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

const COUNTDOWN_SECONDS = 5;

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
  const visibleSections = chapter.sections.filter((section) => section.items.length > 0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    setModuleIndex(0);
    setCountdown(COUNTDOWN_SECONDS);
  }, [chapter.id]);

  useEffect(() => {
    if (moduleIndex >= visibleSections.length - 1) return;
    setCountdown(COUNTDOWN_SECONDS);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [moduleIndex, visibleSections.length]);

  const currentSection = visibleSections[moduleIndex];
  const isFirst = moduleIndex === 0;
  const isLast = moduleIndex >= visibleSections.length - 1;
  const canProceed = countdown === 0 || isLast;

  const goNext = () => {
    if (isLast) {
      onNext();
    } else {
      setModuleIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_0.28fr]">
      <GlassPanel className="p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-teal">Chapter {chapter.number}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{chapter.title}</h2>
            {chapter.quote ? <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">"{chapter.quote}"</p> : null}
          </div>
          <button className="rounded-2xl border border-white/15 p-3 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Bookmark chapter">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 rounded-full bg-teal transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {visibleSections.map((section, i) => (
            <button
              key={section.title}
              onClick={() => { setModuleIndex(i); setCountdown(COUNTDOWN_SECONDS); }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                i === moduleIndex
                  ? "bg-[#ff671f] text-white"
                  : i < moduleIndex
                    ? "bg-teal/20 text-teal border border-teal/30"
                    : "border border-white/15 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {currentSection && (
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
            <h3 className="text-xl font-semibold">{currentSection.title}</h3>
            <div className="mt-4 space-y-3 text-base leading-8 text-white/72">
              {currentSection.items.map((item, index) => (
                <p key={`${currentSection.title}-${index}`}>{item}</p>
              ))}
            </div>
          </article>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-[auto_1fr]">
          <button
            onClick={() => { setModuleIndex((prev) => Math.max(0, prev - 1)); setCountdown(COUNTDOWN_SECONDS); }}
            disabled={isFirst}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm transition ${
              isFirst
                ? "border-white/8 text-white/30 cursor-not-allowed"
                : "border-white/15 text-white/72 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={goNext}
            disabled={!canProceed}
            className={`relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold transition ${
              canProceed
                ? "bg-white text-academy hover:-translate-y-0.5 hover:shadow-lift"
                : "bg-white/15 text-white/40 cursor-not-allowed"
            }`}
          >
            {!canProceed && (
              <span
                className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-1000"
                style={{ width: `${((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100}%` }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {!canProceed && <span className="tabular-nums">{countdown}s</span>}
              {isLast ? "Next Chapter" : "Next Module"} <ChevronRight className="h-4 w-4" />
            </span>
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
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Personal Reflection</p>
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
