/**
 * BestBadge — shared "BEST" indicator used across ModelComparison and TopHarnesses.
 */
export default function BestBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[var(--color-teal-700)] ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal-600)]" />
      BEST
    </span>
  );
}
