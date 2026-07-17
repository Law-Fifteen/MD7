import type { PropsWithChildren } from "react";

type GlassPanelProps = PropsWithChildren<{
  className?: string;
}>;

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <section
      className={`rounded-3xl border border-white/15 bg-white/[0.09] shadow-glass backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}
