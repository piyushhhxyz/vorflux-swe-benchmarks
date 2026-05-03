/**
 * Full-width marksheet comparison table.
 * Vorflux harnesses (left, separated by dashed border) vs competitor agents (right).
 *
 * NOTE: The evaluation artifacts in the linked repo cover the existing
 * 20250427_vorflux_agent_v2 SWE-bench run. Newer 500-task and Terminal-Bench
 * runs are pending upload — scores shown here are from internal eval runs.
 */
import {
  BENCHMARKS, HARNESSES, HARNESS_SCORES,
  COMPETITORS, COMPETITOR_SCORES, EVAL_DATE, getRepoUrl,
} from '../../data/benchmarks';

export default function MarksheetTable() {
  const bestScores = {};
  BENCHMARKS.forEach((b) => {
    const allScores = [
      ...Object.values(HARNESS_SCORES[b.id]),
      ...Object.values(COMPETITOR_SCORES[b.id]),
    ].filter((v) => v != null);
    bestScores[b.id] = Math.max(...allScores);
  });

  return (
    <section className="section-wrapper py-16">
      <div className="card p-8 md:p-10 overflow-x-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-label text-[var(--color-slate-400)] mb-2">
              EXAMINATION &middot; PUBLIC BENCHMARKS &middot; APR–MAY 2026
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Cosmos &middot; official marksheet
            </h2>
            <p className="text-xs text-[var(--color-slate-400)] mt-2 max-w-lg leading-relaxed">
              Scores reflect internal eval runs. Verification artifacts for the full
              500-task SWE-bench and Terminal-Bench runs are being published to the repo.
            </p>
          </div>
          <div className="stamp-circle hidden md:flex">
            <span>{EVAL_DATE.replace(' ', '')}<br />Cosmos</span>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm border-collapse min-w-[900px]">
          <thead>
            {/* Group headers */}
            <tr>
              <th className="pb-2" />
              <th
                colSpan={HARNESSES.length}
                className="text-label text-[var(--color-teal-700)] pb-2 text-center border-b-2 border-dashed border-[var(--color-teal-200)]"
              >
                VORFLUX HARNESSES
              </th>
              <th
                colSpan={COMPETITORS.length}
                className="text-label text-[var(--color-slate-400)] pb-2 text-center border-b border-[var(--color-border)]"
              >
                OTHER AGENTS
              </th>
            </tr>

            {/* Column headers */}
            <tr>
              <th className="text-left py-4 pr-4 text-label text-[var(--color-slate-500)] font-medium align-bottom w-[180px]">
                BENCHMARK
              </th>
              {HARNESSES.map((h, i) => (
                <th
                  key={h.id}
                  className={`text-center py-4 px-3 align-bottom ${
                    i < HARNESSES.length - 1
                      ? 'border-r border-dashed border-[var(--color-border)]'
                      : 'border-r-2 border-dashed border-[var(--color-teal-200)]'
                  }`}
                >
                  {i === 0 && (
                    <span className="inline-flex items-center gap-1 text-label text-[var(--color-teal-700)] mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal-600)]" />
                      BEST
                    </span>
                  )}
                  <p className="font-semibold text-[var(--color-slate-800)] text-xs mt-1">
                    {h.name}
                  </p>
                  <p className="text-[10px] text-[var(--color-slate-400)] mt-1 leading-tight font-mono">
                    code: {h.seats.build} · review: {h.seats.review}
                  </p>
                </th>
              ))}
              {COMPETITORS.map((c) => (
                <th key={c.id} className="text-center py-4 px-3 align-bottom">
                  <p className="font-semibold text-[var(--color-slate-700)] text-xs">
                    {c.name}
                  </p>
                  {c.sub && (
                    <p className="text-[10px] text-[var(--color-slate-400)] mt-1 leading-tight font-mono">
                      {c.sub}
                    </p>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {BENCHMARKS.map((b) => {
              const best = bestScores[b.id];

              return (
                <tr key={b.id} className="border-t border-[var(--color-border)]">
                  <td className="py-5 pr-4">
                    <p className="font-semibold text-[var(--color-slate-800)]">{b.name}</p>
                    <p className="text-xs text-[var(--color-slate-400)]">{b.totalTasks} tasks</p>
                  </td>
                  {HARNESSES.map((h, i) => {
                    const val = HARNESS_SCORES[b.id][h.id];
                    const isBest = val === best;
                    return (
                      <td
                        key={h.id}
                        className={`text-center py-5 px-3 ${
                          i < HARNESSES.length - 1
                            ? 'border-r border-dashed border-[var(--color-border)]'
                            : 'border-r-2 border-dashed border-[var(--color-teal-200)]'
                        }`}
                      >
                        <span
                          className={`text-xl font-bold ${
                            isBest
                              ? 'text-[var(--color-teal-700)]'
                              : 'text-[var(--color-slate-700)]'
                          }`}
                        >
                          {val != null ? `${val}%` : '—'}
                        </span>
                      </td>
                    );
                  })}
                  {COMPETITORS.map((c) => {
                    const val = COMPETITOR_SCORES[b.id][c.id];
                    return (
                      <td key={c.id} className="text-center py-5 px-3">
                        <span className="text-xl font-bold text-[var(--color-slate-600)]">
                          {val != null ? `${val}%` : '—'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
          <p className="text-label text-[var(--color-slate-400)]">
            FOR VERIFICATION &#x2197;
          </p>
          <a
            href={getRepoUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-teal-700)] hover:text-[var(--color-teal-900)] font-mono underline underline-offset-2"
          >
            github.com/piyushhhxyz/vorflux-swe-benchmarks &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
