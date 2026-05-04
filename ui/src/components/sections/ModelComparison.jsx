/**
 * Agent comparison — Vorflux (best harness) vs competitor agents.
 *
 * Shows Vorflux's best harness score alongside Claude Code, OpenAI Codex,
 * Gemini CLI, and Mythos Preview on each benchmark. Vorflux column is
 * highlighted as the flagship.
 */
import {
  BENCHMARKS, COMPETITORS, COMPETITOR_SCORES,
  getBestHarnessScore,
} from '../../data/benchmarks';
import SectionHeader from './SectionHeader';
import BestBadge from './BestBadge';

export default function ModelComparison() {
  return (
    <section className="py-10 md:py-14">
      <div className="section-wrapper">
        <SectionHeader label="SECTION 05" />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          How Vorflux stacks up.
        </h2>
        <p className="text-[var(--color-slate-500)] max-w-2xl mb-10 text-sm md:text-base">
          Our best harness score compared to every major coding agent on the
          same public benchmarks. Scores are from official benchmark runs —
          see each benchmark&apos;s leaderboard for methodology.
        </p>

        <div className="card p-6 md:p-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-4 pr-4 w-[180px]" />
                {/* Vorflux header */}
                <th className="text-center py-4 px-4 bg-[var(--color-teal-50)] border-x-2 border-t-2 border-[var(--color-teal-300)] rounded-t-lg">
                  <p className="font-semibold text-xs text-[var(--color-teal-800)]">Vorflux</p>
                  <p className="text-[10px] text-[var(--color-slate-400)] mt-0.5 font-mono">best harness</p>
                </th>
                {/* Competitor headers */}
                {COMPETITORS.map((c) => (
                  <th key={c.id} className="text-center py-4 px-4">
                    <p className="font-semibold text-xs text-[var(--color-slate-700)]">{c.name}</p>
                    {c.sub && (
                      <p className="text-[10px] text-[var(--color-slate-400)] mt-0.5 font-mono">
                        {c.sub}
                      </p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map((b, rowIdx) => {
                // Collect all scores for this benchmark row
                const allScores = [];
                const vorfluxScore = getBestHarnessScore(b.id);
                if (vorfluxScore != null) allScores.push(vorfluxScore);
                COMPETITORS.forEach((c) => {
                  const s = COMPETITOR_SCORES[b.id]?.[c.id];
                  if (s != null) allScores.push(s);
                });
                const best = allScores.length > 0 ? Math.max(...allScores) : null;

                return (
                  <tr
                    key={b.id}
                    className={rowIdx < BENCHMARKS.length - 1 ? 'border-b border-[var(--color-border)]' : ''}
                  >
                    <td className="py-5 pr-4">
                      <p className="font-semibold text-[var(--color-slate-800)]">{b.name}</p>
                      <p className="text-xs text-[var(--color-slate-400)]">{b.totalTasks} tasks</p>
                    </td>

                    {/* Vorflux column */}
                    <td className="text-center py-5 px-4 bg-[var(--color-teal-50)] border-x-2 border-[var(--color-teal-300)]">
                      {vorfluxScore != null ? (
                        <span className={`text-xl font-bold ${
                          vorfluxScore === best
                            ? 'text-[var(--color-teal-800)]'
                            : 'text-[var(--color-slate-700)]'
                        }`}>
                          {vorfluxScore}%
                          {vorfluxScore === best && (
                            <BestBadge className="ml-1.5 align-middle" />
                          )}
                        </span>
                      ) : (
                        <span className="text-xl text-[var(--color-slate-400)]">&mdash;</span>
                      )}
                    </td>

                    {/* Competitor columns */}
                    {COMPETITORS.map((c) => {
                      const val = COMPETITOR_SCORES[b.id]?.[c.id];
                      const isBest = val != null && val === best;
                      return (
                        <td key={c.id} className="text-center py-5 px-4">
                          {val != null ? (
                            <span className={`text-xl font-bold ${
                              isBest ? 'text-[var(--color-slate-900)]' : 'text-[var(--color-slate-600)]'
                            }`}>
                              {val}%
                            </span>
                          ) : (
                            <span className="text-xl text-[var(--color-slate-400)]">&mdash;</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
