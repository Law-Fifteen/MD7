import { ArrowRight, BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import type { ElementType } from "react";
import { academyContent } from "../content/generatedContent";
import { competencyAreas, productWarnings } from "../content/platform";
import type { Chapter } from "../types";
import { GlassPanel } from "./GlassPanel";
import { ProgressBar } from "./ProgressBar";

type DashboardProps = {
  currentChapter: Chapter;
  completedCount: number;
  onContinue: () => void;
};

export function Dashboard({ currentChapter, completedCount, onContinue }: DashboardProps) {
  const progress = Math.round((completedCount / academyContent.chapters.length) * 100);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <GlassPanel className="overflow-hidden">
        <div className="relative min-h-[420px] p-6 sm:p-8">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-18"
            src="/Resources/MD7 Logo Flair.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-academy via-academy/88 to-academy/45" />
          <div className="relative max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-teal">
              <Target className="h-4 w-4" />
              Judgment over memorization
            </div>
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              A commercial operating system for better property-owner decisions.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
              The academy turns the MD7 Sales Framework into connected learning: chapters,
              decision exercises, frameworks, coaching prompts, and searchable field guidance.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <Metric icon={BookOpen} label="Chapters" value={academyContent.stats.chapterCount.toString()} />
              <Metric icon={TrendingUp} label="Knowledge Objects" value={academyContent.stats.knowledgeObjectCount.toString()} />
              <Metric icon={Clock} label="Current Focus" value={`Ch. ${currentChapter.number}`} />
            </div>
            <button
              onClick={onContinue}
              className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-academy transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              Continue Learning <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-6">
        <GlassPanel className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Overall Progress</p>
              <h3 className="mt-1 text-2xl font-semibold">{progress}% complete</h3>
            </div>
            <div className="rounded-2xl bg-teal/15 p-3 text-teal">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <ProgressBar value={progress} label="Academy" />
          <p className="mt-4 text-sm leading-6 text-white/62">
            Completion is earned through reading, practice, reflection, and coaching questions.
          </p>
        </GlassPanel>

        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Competency View</p>
          <div className="mt-5 space-y-4">
            {competencyAreas.map((area) => (
              <ProgressBar key={area.label} value={area.value} label={area.label} />
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-amber">Architect Notes</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/68">
            {productWarnings.map((warning) => (
              <p key={warning}>{warning}</p>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

type MetricProps = {
  icon: ElementType;
  label: string;
  value: string;
};

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur">
      <Icon className="mb-4 h-5 w-5 text-teal" />
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">{label}</p>
    </div>
  );
}
