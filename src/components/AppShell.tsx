import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown as ChevronDownIcon,
  Compass,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  MessageSquareText,
  Search,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { academyContent } from "../content/generatedContent";
import { navItems } from "../content/platform";

const icons: Record<string, typeof Compass> = {
  Dashboard: Compass,
  "Learning Path": BookOpen,
  "If This Then That": Target,
  "Common Mistakes": AlertTriangle,
  "What Great AEs Notice": Eye,
  "Exit Gates": CheckCircle2,
  "Personal Reflection": MessageSquareText,
};

type AppShellProps = {
  activeView: string;
  onNavigate: (view: string) => void;
  onSearch: () => void;
  children: ReactNode;
};

export function AppShell({ activeView, onNavigate, onSearch, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [learningPathOpen, setLearningPathOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-academy text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,210,198,0.24),transparent_32%),linear-gradient(140deg,#052F47_0%,#071B24_55%,#0D3F50_100%)]" />

      <aside
        className={`relative z-20 flex shrink-0 flex-col border-r border-white/10 bg-white/[0.06] backdrop-blur-xl transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-72"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-6">
          <img src="./Resources/MD7-Logo.svg" alt="MD7" className="h-10 w-10 shrink-0 rounded-xl bg-white p-2" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">MD7 Sales Academy</p>
              <p className="truncate text-xs text-white/50">Commercial judgment system</p>
            </div>
          )}
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = icons[item];
            const active = activeView === item || (item === "Learning Path" && activeView.startsWith("Chapter"));
            const isLearningPath = item === "Learning Path";
            return (
              <div key={item}>
                <button
                  onClick={() => {
                    if (isLearningPath) {
                      setLearningPathOpen((prev) => !prev);
                    } else {
                      onNavigate(item);
                    }
                  }}
                  title={collapsed ? item : undefined}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
                    collapsed ? "justify-center" : ""
                  } ${
                    active
                      ? "bg-white text-academy shadow-lift"
                      : "text-white/68 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{item}</span>}
                  {!collapsed && isLearningPath && (
                    <ChevronDownIcon className={`ml-auto h-4 w-4 shrink-0 transition-transform ${learningPathOpen ? "rotate-180" : ""}`} />
                  )}
                </button>
                {isLearningPath && learningPathOpen && !collapsed && (
                  <div className="mt-1 ml-4 space-y-0.5 border-l border-white/10 pl-3">
                    {academyContent.chapters.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => onNavigate(`Chapter ${ch.number}`)}
                        className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-xs transition ${
                          activeView === `Chapter ${ch.number}`
                            ? "bg-white/15 text-white"
                            : "text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {ch.number} {ch.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="mx-2 mb-4 flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-3 py-2.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4 shrink-0" /> : <PanelLeftClose className="h-4 w-4 shrink-0" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      <main className="relative z-10 flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-30 shrink-0 border-b border-white/10 bg-academy/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden lg:block">
              <p className="text-xs uppercase tracking-[0.28em] text-teal">Premium commercial academy</p>
              <h1 className="text-xl font-semibold">Learn the judgment behind the process</h1>
            </div>
            <button
              onClick={onSearch}
              className="ml-auto flex min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/72 transition hover:bg-white/15 hover:text-white"
            >
              <Search className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Search frameworks, questions, objections</span>
              <kbd className="hidden rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/55 sm:inline">Ctrl K</kbd>
            </button>
          </div>
        </header>
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
