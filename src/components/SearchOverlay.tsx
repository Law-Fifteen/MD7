import { Search, X } from "lucide-react";
import { useMemo, useRef } from "react";
import { academyContent } from "../content/generatedContent";

type SearchOverlayProps = {
  open: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onOpenChapter: (chapterId: string) => void;
};

export function SearchOverlay({ open, query, onQueryChange, onClose, onOpenChapter }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return academyContent.knowledgeObjects.slice(0, 8);
    }
    return academyContent.knowledgeObjects
      .filter((item) => `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase().includes(normalized))
      .slice(0, 10);
  }, [query]);

  if (!open) {
    return null;
  }

  window.setTimeout(() => inputRef.current?.focus(), 0);

  return (
    <div className="fixed inset-0 z-50 bg-ink/70 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
      <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-academy/95 shadow-glass">
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <Search className="h-5 w-5 text-teal" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/35"
            placeholder="Search MD7 knowledge"
          />
          <button onClick={onClose} className="rounded-xl p-2 text-white/55 hover:bg-white/10 hover:text-white" aria-label="Close search">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto p-3">
          {results.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onOpenChapter(item.chapterId);
                onClose();
              }}
              className="w-full rounded-2xl p-4 text-left transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-teal/15 px-3 py-1 text-xs text-teal">{item.type}</span>
                <p className="font-semibold">{item.title}</p>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/58">{item.summary}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
