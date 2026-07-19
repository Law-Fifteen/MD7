import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight, MessageSquareText } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setActiveIndex(0);
  }, [chapter.id]);

  const scrollToIndex = useCallback((index: number) => {
    setActiveIndex(index);
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const center = scrollLeft + containerWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(center - elCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

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

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {visibleSections.map((section, i) => (
            <button
              key={section.title}
              ref={(el) => { sectionRefs.current[i] = el; }}
              onClick={() => scrollToIndex(i)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                activeIndex === i
                  ? "bg-[#ff671f] text-white"
                  : "border border-white/15 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="space-y-7">
          {visibleSections.map((section, i) => (
            <div
              key={section.title}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="scroll-mt-24"
            >
              <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <div className="mt-4 space-y-3 text-base leading-8 text-white/72">
                  {section.items.map((item, index) => (
                    <p key={`${section.title}-${index}`}>{item}</p>
                  ))}
                </div>
              </article>
            </div>
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
