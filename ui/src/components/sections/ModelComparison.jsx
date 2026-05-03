/**
 * Raw model comparison table — how the underlying models score
 * without any harness orchestration.
 *
 * Data (MODELS / BENCHMARK_CATEGORIES / MODEL_SCORES) lives in the data layer.
 * Annotations (e.g. "self-reported harness") are driven by a `note` field in
 * the score entry — no hard-coded conditionals in rendering logic.
 */
import {
  RAW_MODELS, RAW_BENCHMARK_CATEGORIES, MODEL_SCORES,
  getModelScoreValue, getModelScoreNote,
} from '../../data/benchmarks';

export default function ModelComparison() {
  return (
    <section className="section-wrapper py-16">
      <div className="card p-8 md:p-10 overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="text-left py-4 pr-4 w-[200px]" />
              {RAW_MODELS.map((m) => (
                <th
                  key={m.id}
                  className={`text-center py-4 px-4 font-semibold text-[var(--color-slate-700)] ${
                    m.flagship ? 'border-l-2 border-t-2 border-r border-teal-300 rounded-tl-lg' : ''
                  }`}
                >
                  {m.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RAW_BENCHMARK_CATEGORIES.map((b, rowIdx) => {
              // Find best score in this row
              const scores = RAW_MODELS.map((m) => getModelScoreValue(MODEL_SCORES[b.key]?.[m.id]));
              const validScores = scores.filter((v) => v != null);
              const best = validScores.length > 0 ? Math.max(...validScores) : null;

              return (
                <tr
                  key={b.key}
                  className={rowIdx < RAW_BENCHMARK_CATEGORIES.length - 1 ? 'border-b border-[var(--color-border)]' : ''}
                >
                  <td className="py-5 pr-4">
                    <p className="font-semibold text-[var(--color-slate-800)]">{b.name}</p>
                    <p className="text-xs text-[var(--color-slate-400)]">{b.sub}</p>
                  </td>
                  {RAW_MODELS.map((m) => {
                    const entry = MODEL_SCORES[b.key]?.[m.id];
                    const val = getModelScoreValue(entry);
                    const note = getModelScoreNote(entry);
                    const isBest = val != null && val === best;
                    return (
                      <td
                        key={m.id}
                        className={`text-center py-5 px-4 ${
                          m.flagship ? 'border-l-2 border-teal-300' : ''
                        }`}
                      >
                        {val != null ? (
                          <span
                            className={`text-lg ${
                              isBest ? 'font-bold text-[var(--color-slate-900)]' : 'text-[var(--color-slate-600)]'
                            }`}
                          >
                            {val}%
                          </span>
                        ) : (
                          <span className="text-lg text-[var(--color-slate-400)]">—</span>
                        )}
                        {note && (
                          <p className="text-[10px] text-[var(--color-slate-400)] mt-0.5">
                            {note}
                          </p>
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
    </section>
  );
}
