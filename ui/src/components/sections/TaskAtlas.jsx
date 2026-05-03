/**
 * Dot grid — "Every task. Every result."
 * Full-viewport-width grid with difficulty-colored squares and benchmark toggle.
 */
import { useState, useMemo } from 'react';
import { BENCHMARKS, HARNESS_SCORES, generateDotGrid } from '../../data/benchmarks';
import SectionHeader from './SectionHeader';

const DIFFICULTY_COLORS = {
  easy: 'var(--color-dot-easy)',
  med: 'var(--color-dot-med)',
  hard: 'var(--color-dot-hard)',
  expert: 'var(--color-dot-expert)',
  miss: 'var(--color-dot-miss)',
};

const DIFFICULTY_LABELS = ['easy', 'med', 'hard', 'expert', 'miss'];

export default function TaskAtlas() {
  const [activeBench, setActiveBench] = useState('swe-bench');

  const benchmark = BENCHMARKS.find((b) => b.id === activeBench) || BENCHMARKS[0];
  const bestScore = Math.max(...Object.values(HARNESS_SCORES[activeBench]));
  const resolvedCount = Math.round((bestScore / 100) * benchmark.totalTasks);

  const dots = useMemo(
    () => generateDotGrid(benchmark.totalTasks, resolvedCount),
    [benchmark.totalTasks, resolvedCount],
  );

  /* Target ~20 rows: derive column count from total tasks. */
  const cols = Math.ceil(Math.sqrt(benchmark.totalTasks * 1.25));

  return (
    <section className="py-20 md:py-28 bg-[var(--color-bg-section)]">
      <div className="section-wrapper">
        <SectionHeader label="SECTION 04" />
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          The full picture.
        </h2>
        <p className="text-[var(--color-slate-600)] max-w-2xl mb-8 text-base md:text-lg">
          One dot per task. Colored dots are resolved; grey dots are misses.
          Shade is illustrative, not actual per-task difficulty. Best harness only.
        </p>

        {/* Benchmark toggle */}
        <div className="flex gap-3 mb-10">
          {BENCHMARKS.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBench(b.id)}
              className={`bench-toggle ${activeBench === b.id ? 'active' : ''}`}
            >
              {b.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Full-width grid card — breaks out of section-wrapper */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="card p-6 md:p-10 max-w-[1600px] mx-auto">
          {/* Stats + legend row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="flex items-baseline gap-8">
              <div>
                <p className="text-label text-[var(--color-slate-400)] mb-1">RESOLVED</p>
                <p className="text-4xl md:text-5xl font-bold text-[var(--color-slate-800)]">
                  {resolvedCount}
                  <span className="text-xl font-normal text-[var(--color-slate-400)] ml-1">
                    / {benchmark.totalTasks}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-label text-[var(--color-slate-400)] mb-1">SCORE</p>
                <p className="text-4xl md:text-5xl font-bold text-[var(--color-slate-800)]">
                  {bestScore}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-label text-[var(--color-slate-400)]">DIFFICULTY</span>
              {DIFFICULTY_LABELS.map((d) => (
                <div key={d} className="flex items-center gap-1.5">
                  <span
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: DIFFICULTY_COLORS[d] }}
                  />
                  <span className="text-xs text-[var(--color-slate-500)]">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dot grid — CSS grid for perfect alignment */}
          <div
            className="grid gap-[4px] md:gap-[5px]"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {dots.map((dot) => (
              <div
                key={dot.index}
                className="dot-grid-item aspect-square cursor-default"
                style={{ backgroundColor: DIFFICULTY_COLORS[dot.difficulty] }}
                title={`Task ${dot.index + 1} · ${dot.resolved ? 'resolved' : 'missed'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
