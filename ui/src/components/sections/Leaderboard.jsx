import { Badge, SectionLabel } from '../ui';

export default function Leaderboard({ data }) {
  if (!data || data.length === 0) return null;
  const maxScore = Math.max(...data.map((d) => d.score));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>LEADERBOARD</SectionLabel>
        <span className="text-[10px] font-mono text-[var(--color-slate-400)]">
          same harness, same cap, same hardware
        </span>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-[40px_1fr_120px_80px_80px_80px] gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[var(--color-slate-400)]">
        <span>#</span><span>AGENT</span><span></span>
        <span className="text-right">SCORE</span><span className="text-right">COST</span><span className="text-right">TIME</span>
      </div>

      {data.map((entry) => (
        <div
          key={entry.rank}
          className={`grid grid-cols-[40px_1fr_120px_80px_80px_80px] gap-2 px-3 py-3 items-center border-t border-[var(--color-slate-100)] ${entry.ours ? 'bg-[var(--color-teal-50)]' : ''}`}
        >
          <span className="font-mono text-sm text-[var(--color-slate-400)]">
            {String(entry.rank).padStart(2, '0')}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-sm ${entry.ours ? 'text-[var(--color-teal-700)]' : ''}`}>
                {entry.agent}
              </span>
              {entry.ours && <Badge variant="dark" className="text-[9px] py-0 px-1.5">OURS</Badge>}
            </div>
            {entry.sub && <span className="text-xs text-[var(--color-slate-400)] font-mono">{entry.sub}</span>}
          </div>
          <div className="flex items-center">
            <div className="w-full bg-[var(--color-slate-100)] rounded-full h-[6px]">
              <div
                className="leaderboard-bar"
                style={{
                  width: `${(entry.score / maxScore) * 100}%`,
                  backgroundColor: entry.ours ? 'var(--color-teal-700)' : 'var(--color-slate-400)',
                }}
              />
            </div>
          </div>
          <span className={`text-right font-mono text-sm font-semibold ${entry.ours ? 'text-[var(--color-teal-700)]' : ''}`}>
            {entry.score}%
          </span>
          <span className="text-right font-mono text-sm text-[var(--color-slate-500)]">${entry.cost.toFixed(2)}</span>
          <span className="text-right font-mono text-sm text-[var(--color-slate-500)]">{entry.time}</span>
        </div>
      ))}
    </div>
  );
}
