import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { academyContent } from "../content/generatedContent";
import { GlassPanel } from "./GlassPanel";

type DashboardProps = {
  onContinue: () => void;
};

export function Dashboard({ onContinue }: DashboardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const chaptersWithQuotes = academyContent.chapters.filter((ch) => ch.quote);

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
      setQuoteIndex((prev) => (prev + 1) % chaptersWithQuotes.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [chaptersWithQuotes.length]);

  const currentChapter = chaptersWithQuotes[quoteIndex];

  return (
    <div className="space-y-6">
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
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
              A commercial operating system for better property-owner decisions.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
              This academy is designed to improve your decision making ability, improving
              judgement and offering a searchable Field Guide.
            </p>
            {currentChapter && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] text-teal">
                  Chapter {currentChapter.number} — {currentChapter.title}
                </p>
                <p className="mt-3 text-base leading-7 text-white/70 italic">
                  "{currentChapter.quote}"
                </p>
              </div>
            )}
            <button
              onClick={onContinue}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-academy transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              Continue Learning <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </GlassPanel>

      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/45 mb-4">Insights</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {academyContent.chapters.slice(0, 6).map((ch) => (
            <GlassPanel key={ch.id} className="p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-teal">
                Chapter {ch.number}
              </p>
              <p className="mt-2 text-sm font-medium">{ch.title}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
