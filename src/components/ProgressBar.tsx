type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const bounded = Math.max(0, Math.min(100, value));

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/55">
          <span>{label}</span>
          <span>{bounded}%</span>
        </div>
      ) : null}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal to-emerald transition-all duration-500"
          style={{ width: `${bounded}%` }}
        />
      </div>
    </div>
  );
}
