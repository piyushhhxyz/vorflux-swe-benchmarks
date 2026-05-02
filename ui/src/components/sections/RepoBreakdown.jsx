import { SectionLabel } from '../ui';
import { REPO_PALETTE } from '../../data/benchmarks';

export default function RepoBreakdown({ data }) {
  if (!data || data.length === 0) return null;
  const maxTotal = Math.max(...data.map((d) => d.total));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>BY REPO</SectionLabel>
        <span className="text-[10px] font-mono text-[var(--color-slate-400)]">resolved / total</span>
      </div>

      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={item.repo} className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-[200px] shrink-0">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: REPO_PALETTE[i % REPO_PALETTE.length] }} />
              <span className="text-sm font-mono text-[var(--color-slate-700)] truncate">{item.repo}</span>
            </div>
            <div className="flex-1 repo-bar-bg">
              <div className="flex h-full">
                <div className="repo-bar-fill" style={{ width: `${(item.resolved / maxTotal) * 100}%`, backgroundColor: 'var(--color-teal-700)' }} />
                <div className="repo-bar-fill" style={{ width: `${((item.total - item.resolved) / maxTotal) * 100}%`, backgroundColor: 'var(--color-teal-200)' }} />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-[80px] justify-end">
              <span className="font-mono text-sm text-[var(--color-slate-500)]">{item.resolved}/{item.total}</span>
              <span className={`font-mono text-sm font-semibold ${
                item.percentage >= 70 ? 'text-[var(--color-teal-700)]' : item.percentage >= 50 ? 'text-[var(--color-slate-600)]' : 'text-[var(--color-slate-400)]'
              }`}>
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
