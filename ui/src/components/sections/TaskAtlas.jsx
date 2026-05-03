/**
 * Dot grid — aggregate visualization of resolved vs. unresolved tasks.
 * Big grid with difficulty-shaded dots, benchmark toggle, and stats.
 */
import { useState, useMemo } from 'react';
import { BENCHMARKS, HARNESS_SCORES, generateDotGrid } from '../../data/benchmarks';
import SectionHeader from './SectionHeader';

const DIFFICULTY_COLORS = {
  easy: 'var(--color-teal-200)',
  med: 'var(--color-teal-400)',
  hard: 'var(--color-teal-700)',
  expert: 'var(--color-teal-900)',
  miss: 'var(--color-slate-200)',
};

const DIFFICULTY_LABELS = ['easy', 'med', 'hard', 'expert', 'miss'];

export default function TaskAtlas() {
  const [activeBench, setActiveBench] = useState('swe-bench');

  const benchmark = BENCHMARKS.find((b) => b.id === activeBench) || BENCHMARKS[0];

  // Best harness score for this benchmark
  const bestScore = Math.max(...Object.values(HARNESS_SCORES[activeBench]));
  const resolvedCount = Math.round((bestScore / 100) * benchmark.totalTasks);

  const dots = useMemo(
    () => generateDotGrid(benchmark.totalTasks, resolvedCount),
    [benchmark.totalTasks, resolvedCount],
  );

  return (
    <section className="py-20 bg-[var(--color-bg-section)]">
      <div className="section-wrapper">
        {/* Header */}
        <SectionHeader label="SECTION 04" />
        <h2
          className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Aggregate results at a glance.
        </h2>
        <p className="text-[var(--color-slate-600)] max-w-2xl mb-8">
          One dot per task. Shading represents approximate difficulty tiers derived
          from aggregate counts — darker means harder. Empty dots are tasks the best
          harness did not solve.
        </p>

        {/* Benchmark toggle */}
        <div className="flex gap-3 mb-8">
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

        {/* Grid card */}
        <div className="card p-6 md:p-8">
          {/* Stats row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-baseline gap-6">
              <div>
                <p className="text-label text-[var(--color-slate-400)] mb-1">RESOLVED</p>
                <p className="text-3xl font-bold text-[var(--color-slate-800)]">
                  {resolvedCount}
                  <span className="text-lg font-normal text-[var(--color-slate-400)] ml-1">
                    / {benchmark.totalTasks}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-label text-[var(--color-slate-400)] mb-1">SCORE</p>
                <p className="text-3xl font-bold text-[var(--color-slate-800)]">
                  {bestScore}%
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-label text-[var(--color-slate-400)]">SHADING</span>
              {DIFFICULTY_LABELS.map((d) => (
                <div key={d} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: DIFFICULTY_COLORS[d] }}
                  />
                  <span className="text-xs text-[var(--color-slate-500)]">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dot grid */}
          <div className="flex flex-wrap gap-[3px]">
            {dots.map((dot) => (
              <div
                key={dot.index}
                className="dot-grid-item"
                style={{ backgroundColor: DIFFICULTY_COLORS[dot.difficulty] }}
                title={`Task ${dot.index + 1}: ${dot.difficulty}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
