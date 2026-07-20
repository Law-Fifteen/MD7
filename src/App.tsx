import { useCallback, useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { ChapterReader } from "./components/ChapterReader";
import { Dashboard } from "./components/Dashboard";
import { KnowledgeLibrary } from "./components/KnowledgeLibrary";
import { ProgressView } from "./components/ProgressView";
import { SearchOverlay } from "./components/SearchOverlay";
import { Splash } from "./components/Splash";
import { IfThisThenThatPage } from "./components/IfThisThenThatPage";
import { CommonMistakesPage } from "./components/CommonMistakesPage";
import { WhatGreatAEsNoticePage } from "./components/WhatGreatAEsNoticePage";
import { ExitGatesPage } from "./components/ExitGatesPage";
import { ManagerCoachingQuestionsPage } from "./components/ManagerCoachingQuestionsPage";
import { academyContent } from "./content/generatedContent";
import { useLocalState } from "./lib/useLocalState";

type View = "Dashboard" | "Learning Path" | "If This Then That" | "Common Mistakes" | "What Great AEs Notice" | "Exit Gates" | "Personal Reflection" | "Knowledge Library" | "Progress";

export function App() {
  const [activeView, setActiveView] = useLocalState<View>("md7-active-view", "Dashboard");
  const [activeChapterId, setActiveChapterId] = useLocalState<string>(
    "md7-active-chapter",
    academyContent.chapters[0]?.id ?? "",
  );
  const [completed, setCompleted] = useLocalState<string[]>("md7-completed-chapters", []);
  const [reflections, setReflections] = useLocalState<Record<string, string>>("md7-reflections", {});
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  const activeChapter = useMemo(() => {
    return academyContent.chapters.find((chapter) => chapter.id === activeChapterId) ?? academyContent.chapters[0];
  }, [activeChapterId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setActiveView("Learning Path");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentIndex = academyContent.chapters.findIndex((chapter) => chapter.id === activeChapter.id);
  const readingProgress = Math.round(((currentIndex + 1) / academyContent.chapters.length) * 100);

  const renderView = () => {
    if (activeView === "Dashboard") {
      return (
        <Dashboard
          onContinue={() => setActiveView("Learning Path")}
        />
      );
    }

    if (activeView === "Learning Path") {
      return (
        <ChapterReader
          chapter={activeChapter}
          progress={readingProgress}
          reflection={reflections[activeChapter.id] ?? ""}
          isComplete={completed.includes(activeChapter.id)}
          onReflectionChange={(value) => setReflections({ ...reflections, [activeChapter.id]: value })}
          onComplete={() => {
            setCompleted((previous) =>
              previous.includes(activeChapter.id) ? previous : [...previous, activeChapter.id],
            );
          }}
          onPrevious={() => {
            const previous = academyContent.chapters[Math.max(0, currentIndex - 1)];
            openChapter(previous.id);
          }}
          onNext={() => {
            const next = academyContent.chapters[Math.min(academyContent.chapters.length - 1, currentIndex + 1)];
            openChapter(next.id);
          }}
        />
      );
    }

    if (activeView === "If This Then That") {
      return <IfThisThenThatPage onOpenChapter={openChapter} />;
    }

    if (activeView === "Common Mistakes") {
      return <CommonMistakesPage onOpenChapter={openChapter} />;
    }

    if (activeView === "What Great AEs Notice") {
      return <WhatGreatAEsNoticePage onOpenChapter={openChapter} />;
    }

    if (activeView === "Exit Gates") {
      return <ExitGatesPage onOpenChapter={openChapter} />;
    }

    if (activeView === "Personal Reflection") {
      return <ManagerCoachingQuestionsPage onOpenChapter={openChapter} />;
    }

    if (activeView === "Progress") {
      return <ProgressView completed={completed} onOpenChapter={openChapter} />;
    }

    return <KnowledgeLibrary onOpenChapter={openChapter} />;
  };

  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}
      <AppShell activeView={activeView} onNavigate={(view) => {
        if (view.startsWith("Chapter ")) {
          const num = parseInt(view.replace("Chapter ", ""), 10);
          const ch = academyContent.chapters.find((c) => c.number === num);
          if (ch) {
            openChapter(ch.id);
            return;
          }
        }
        setActiveView(view as View);
      }} onSearch={() => setSearchOpen(true)}>
        {renderView()}
      </AppShell>
      <SearchOverlay
        open={searchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={() => setSearchOpen(false)}
        onOpenChapter={openChapter}
      />
    </>
  );
}
