import { CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { academyContent } from "../content/generatedContent";
import type { Chapter } from "../types";
import { GlassPanel } from "./GlassPanel";
import { ProgressBar } from "./ProgressBar";

type ProgressViewProps = {
  completed: string[];
  onOpenChapter: (chapterId: string) => void;
};

export function ProgressView({ completed, onOpenChapter }: ProgressViewProps) {
  const progress = Math.round((completed.length / academyContent.chapters.length) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
      <GlassPanel className="p-6">
        <TrendingUp className="h-7 w-7 text-teal" />
        <h2 className="mt-5 text-3xl font-semibold">{progress}%</h2>
        <p className="mt-2 text-sm leading-6 text-white/62">Overall academy completion</p>
        <div className="mt-6">
          <ProgressBar value={progress} label="Learning path" />
        </div>
      </GlassPanel>
      <GlassPanel className="p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-white/45">Chapter Progress</p>
        <div className="mt-5 divide-y divide-white/10">
          {academyContent.chapters.map((chapter) => (
            <ProgressRow
              key={chapter.id}
              chapter={chapter}
              complete={completed.includes(chapter.id)}
              onOpenChapter={onOpenChapter}
            />
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

function ProgressRow({
  chapter,
  complete,
  onOpenChapter,
}: {
  chapter: Chapter;
  complete: boolean;
  onOpenChapter: (chapterId: string) => void;
}) {
  const Icon = complete ? CheckCircle2 : Circle;

  return (
    <button
      onClick={() => onOpenChapter(chapter.id)}
      className="flex w-full items-center gap-4 py-4 text-left transition hover:text-teal"
    >
      <Icon className={`h-5 w-5 ${complete ? "text-emerald" : "text-white/35"}`} />
      <div>
        <p className="text-sm font-medium">Chapter {chapter.number}</p>
        <p className="mt-1 text-sm text-white/58">{chapter.title}</p>
      </div>
    </button>
  );
}
