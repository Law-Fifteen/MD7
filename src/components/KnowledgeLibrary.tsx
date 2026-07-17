import { BookOpen, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { academyContent } from "../content/generatedContent";
import type { KnowledgeObject } from "../types";
import { GlassPanel } from "./GlassPanel";

type KnowledgeLibraryProps = {
  onOpenChapter: (chapterId: string) => void;
};

const filters = ["All", "Chapter", "Framework"] as const;

export function KnowledgeLibrary({ onOpenChapter }: KnowledgeLibraryProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const results = useMemo(() => {
    return academyContent.knowledgeObjects
      .filter((item) => filter === "All" || item.type === filter)
      .filter((item) => {
        const haystack = `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
      .slice(0, 36);
  }, [filter, query]);

  return (
    <div className="space-y-6">
      <GlassPanel className="p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-teal">Knowledge Library</p>
            <h2 className="mt-3 text-3xl font-semibold">Searchable commercial judgment objects</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
              Chapters, frameworks, decision signals, mistakes, and coaching prompts are modeled as reusable objects.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex min-w-64 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-white/45" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                placeholder="Search library"
              />
            </label>
            <div className="flex rounded-2xl border border-white/15 bg-white/10 p-1">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-xl px-4 py-2 text-sm transition ${
                    filter === item ? "bg-white text-academy" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((item) => (
          <KnowledgeCard key={item.id} item={item} onOpenChapter={onOpenChapter} />
        ))}
      </div>

      {results.length === 0 ? (
        <GlassPanel className="p-8 text-center">
          <Filter className="mx-auto h-8 w-8 text-teal" />
          <h3 className="mt-4 text-xl font-semibold">Try a related commercial concept</h3>
          <p className="mt-2 text-sm text-white/62">Search for discovery, legacy, negotiation, confidence, or coaching.</p>
        </GlassPanel>
      ) : null}
    </div>
  );
}

function KnowledgeCard({
  item,
  onOpenChapter,
}: {
  item: KnowledgeObject;
  onOpenChapter: (chapterId: string) => void;
}) {
  return (
    <button
      onClick={() => onOpenChapter(item.chapterId)}
      className="group rounded-3xl border border-white/12 bg-white/[0.075] p-5 text-left shadow-glass backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.12]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-teal/15 px-3 py-1 text-xs font-medium text-teal">{item.type}</span>
        <BookOpen className="h-4 w-4 text-white/38 transition group-hover:text-teal" />
      </div>
      <h3 className="text-lg font-semibold leading-7">{item.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/62">{item.summary || "Open the related chapter for context and application."}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
