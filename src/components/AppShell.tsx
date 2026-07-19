import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Compass,
  Eye,
  Menu,
  MessageSquareText,
  Search,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";
import { navItems } from "../content/platform";

const icons: Record<string, typeof Compass> = {
  Dashboard: Compass,
  "Learning Path": BookOpen,
  "If This Then That": Target,
  "Common Mistakes": AlertTriangle,
  "What Great AEs Notice": Eye,
  "Exit Gates": CheckCircle2,
  "Manager Coaching Questions": MessageSquareText,
};

type AppShellProps = {
  activeView: string;
  onNavigate: (view: string) => void;
  onSearch: () => void;
  children: ReactNode;
};

export function AppShell({ activeView, onNavigate, onSearch, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-academy text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,210,198,0.24),transparent_32%),linear-gradient(140deg,#052F47_0%,#071B24_55%,#0D3F50_100%)]" />
      <div className="relative flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-white/[0.06] px-5 py-6 backdrop-blur-xl lg:block">
          <div className="mb-9 flex items-center gap-3">
            <img src="./Resources/MD7-Logo.svg" alt="MD7" className="h-10 w-10 rounded-xl bg-white p-2" />
            <div>
              <p className="text-sm font-semibold">MD7 Sales Academy</p>
              <p className="text-xs text-white/50">Commercial judgment system</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = icons[item];
              const active = activeView === item;
              return (
                <button
                  key={item}
                  onClick={() => onNavigate(item)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                    active
                      ? "bg-white text-academy shadow-lift"
                      : "text-white/68 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item}
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-academy/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex items-center gap-3 lg:hidden">
                <button className="rounded-xl border border-white/15 p-2" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </button>
                <img src="./Resources/MD7-Logo.svg" alt="MD7" className="h-9 w-9 rounded-xl bg-white p-2" />
              </div>
              <div className="hidden lg:block">
                <p className="text-xs uppercase tracking-[0.28em] text-teal">Premium commercial academy</p>
                <h1 className="text-xl font-semibold">Learn the judgment behind the process</h1>
              </div>
              <button
                onClick={onSearch}
                className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/72 transition hover:bg-white/15 hover:text-white"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search frameworks, questions, objections</span>
                <kbd className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/55">Ctrl K</kbd>
              </button>
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
