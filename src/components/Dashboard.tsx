import { ArrowRight, BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import type { ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import { academyContent } from "../content/generatedContent";
import { ifThisThenThatData } from "../content/ifThisThenThat";
import type { Chapter } from "../types";
import { GlassPanel } from "./GlassPanel";

type DashboardProps = {
  currentChapter: Chapter;
  completedCount: number;
  onContinue: () => void;
};

type InsightCard = {
  category: string;
  text: string;
  chapterNumber: number;
  chapterTitle: string;
  color: string;
};

function buildInsightPool(): InsightCard[] {
  const pool: InsightCard[] = [];
  for (const chapter of academyContent.chapters) {
    for (const sig of chapter.greatAeSignals.slice(0, 2)) {
      pool.push({ category: "What Great AEs Notice", text: sig, chapterNumber: chapter.number, chapterTitle: chapter.title, color: "text-teal" });
    }
    for (const mist of chapter.commonMistakes.slice(0, 2)) {
      pool.push({ category: "Common Mistakes", text: mist, chapterNumber: chapter.number, chapterTitle: chapter.title, color: "text-amber" });
    }
    for (const q of chapter.coachingQuestions.slice(0, 1)) {
      pool.push({ category: "Manager Coaching", text: q, chapterNumber: chapter.number, chapterTitle: chapter.title, color: "text-white/60" });
    }
    const itt = ifThisThenThatData[chapter.id];
    if (itt) {
      for (const item of itt.slice(0, 2)) {
        pool.push({ category: "If This, Then That", text: `"${item.if}" → ${item.then}`, chapterNumber: chapter.number, chapterTitle: chapter.title, color: "text-amber" });
      }
    }
  }
  return pool;
}

function shufflePick<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export function Dashboard({ currentChapter, completedCount, onContinue }: DashboardProps) {
  const progress = Math.round((completedCount / academyContent.chapters.length) * 100);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [insights, setInsights] = useState<InsightCard[]>(() => shufflePick(buildInsightPool(), 9));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.5;
    let timer: ReturnType<typeof setTimeout>;

    const handleEnded = () => {
      video.pause();
      timer = setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 10000);
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      clearTimeout(timer);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setInsights(shufflePick(buildInsightPool(), 9));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <GlassPanel className="overflow-hidden">
          <div className="relative min-h-[420px] p-6 sm:p-8">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-18"
              src="./Resources/MD7 Logo Flair.mp4"
              autoPlay
              muted
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
          <p className="mt-4 text-sm leading-6 text-white/62">
            Completion is earned through reading, practice, reflection, and coaching questions.
          </p>
        </GlassPanel>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/45 mb-4">Insights</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, i) => (
            <GlassPanel key={`${insight.text.slice(0, 20)}-${i}`} className="p-5">
              <p className={`text-xs uppercase tracking-[0.18em] ${insight.color}`}>{insight.category}</p>
              <p className="mt-3 text-sm leading-6 text-white/72">{insight.text}</p>
              <p className="mt-2 text-xs text-white/40">Ch. {insight.chapterNumber} — {insight.chapterTitle}</p>
            </GlassPanel>
          ))}
        </div>
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
