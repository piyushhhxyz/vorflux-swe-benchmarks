import { useMemo } from 'react';
import { SectionLabel } from '../ui';
import { getPatchUrl, REPO_COLORS } from '../../data/benchmarks';
import { RESOLVED_SWE_BENCH } from '../../data/resolvedInstances';

export default function TaskAtlas({ dotGrid, stats, activeBenchmark }) {
  // Build lookup: repo -> list of resolved instance IDs (for linking)
  // Only applicable to swe-bench; terminal-bench has no instance-level data yet.
  const resolvedByRepo = useMemo(() => {
    if (activeBenchmark !== 'swe-bench') return {};
    const map = {};
    for (const id of RESOLVED_SWE_BENCH) {
      // "django__django-10554" -> "django/django"
      const match = id.match(/^(.+?)__(.+?)-\d+$/);
      if (match) {
        const repo = `${match[1]}/${match[2]}`;
        if (!map[repo]) map[repo] = [];
        map[repo].push(id);
      }
    }
    return map;
  }, [activeBenchmark]);

  const cols = activeBenchmark === 'terminal-bench' ? 15 : 25;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel>TASK ATLAS · {dotGrid.length} DOTS</SectionLabel>
        <span className="text-[10px] font-mono text-[var(--color-slate-400)]">click any dot</span>
      </div>

      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {dotGrid.map((dot) => {
          const color = dot.resolved
            ? (REPO_COLORS[dot.repo] || 'var(--color-teal-700)')
            : 'var(--color-slate-200)';

          const repoInstances = resolvedByRepo[dot.repo] || [];
          const instanceId = dot.resolved && repoInstances[dot.index] ? repoInstances[dot.index] : null;

          return (
            <div
              key={`${dot.repo}-${dot.index}`}
              className="dot-grid-item"
              style={{ backgroundColor: color }}
              onClick={() => instanceId && window.open(getPatchUrl(instanceId), '_blank')}
              title={`${dot.repo}${dot.resolved ? ' (resolved)' : ' (failed)'}`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-4 text-xs text-[var(--color-slate-500)]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[var(--color-teal-700)]" />
          <span>Only Cosmos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[var(--color-teal-300)]" />
          <span>Cosmos+others</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-[var(--color-slate-200)]" />
          <span>Failed</span>
        </div>
        <div className="ml-auto text-right">
          <span className="text-[var(--color-teal-700)] font-semibold font-mono">
            {stats.resolved} only-Cosmos · {stats.resolved}/{stats.total}
          </span>
          <br />
          <span className="text-[var(--color-teal-700)] font-mono text-[11px]">resolved</span>
        </div>
      </div>
    </div>
  );
}
