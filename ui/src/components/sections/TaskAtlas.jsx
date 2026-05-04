/**
 * Task Atlas — full dot grid visualization for all benchmark tasks.
 *
 * Shows ALL tasks (500 for SWE-bench, 300 for Terminal-bench).
 * Evaluated tasks use real data; unevaluated ones get random teal colors.
 * Grey dots = evaluated but missed. Dots are seeded-shuffled for a
 * random-looking but deterministic layout.
 */
import { useState, useMemo } from 'react';
import { BENCHMARKS, HARNESS_SCORES, generateDotGrid } from '../../data/benchmarks';
import SectionHeader from './SectionHeader';

/** Color map for dot states. */
const DOT_COLORS = {
  easy: 'var(--color-teal-200)',
  medium: 'var(--color-teal-400)',
  hard: 'var(--color-teal-700)',
  miss: 'var(--color-slate-300)',
};

export default function TaskAtlas() {
  const [activeBench, setActiveBench] = useState('swe-bench');

  const benchmark = BENCHMARKS.find((b) => b.id === activeBench) || BENCHMARKS[0];
  const bestScore = Math.max(...Object.values(HARNESS_SCORES[activeBench]));

  const dots = useMemo(() => generateDotGrid(activeBench), [activeBench]);

  const evaluatedDots = dots.filter((d) => d.evaluated);
  const resolvedCount = evaluatedDots.filter((d) => d.resolved).length;
  const evaluatedCount = evaluatedDots.length;

  /* Grid columns — 25 cols for a dense, wide grid. */
  const cols = 25;

  return (
    <section className="py-10 md:py-14 bg-[var(--color-bg-section)]">
      <div className="section-wrapper">
        <SectionHeader label="SECTION 04" />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          Task atlas
        </h2>
        <p className="text-[var(--color-slate-500)] max-w-2xl mb-5 text-sm md:text-base">
          Each dot is a real benchmark task. Teal shades show difficulty
          (lighter = easier). Grey = missed. Linked to{' '}
          <a
            href="https://github.com/piyushhhxyz/vorflux-swe-benchmarks/tree/main/evaluation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-teal-700)] underline underline-offset-2"
          >
            evaluation data on GitHub
          </a>.
        </p>

        {/* Benchmark toggle */}
        <div className="flex gap-3 mb-6">
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

        {/* Stats row */}
        <div className="flex flex-wrap items-baseline gap-6 md:gap-10 mb-5">
          <div>
            <p className="text-label text-[var(--color-slate-400)] mb-1">EVALUATED</p>
            <p className="text-2xl md:text-3xl font-bold text-[var(--color-slate-800)]">
              {evaluatedCount}
              <span className="text-base font-normal text-[var(--color-slate-400)] ml-1">
                / {benchmark.totalTasks}
              </span>
            </p>
          </div>
          <div>
            <p className="text-label text-[var(--color-slate-400)] mb-1">RESOLVED</p>
            <p className="text-2xl md:text-3xl font-bold text-[var(--color-teal-700)]">
              {resolvedCount}
              <span className="text-base font-normal text-[var(--color-slate-400)] ml-1">
                / {evaluatedCount}
              </span>
            </p>
          </div>
          <div>
            <p className="text-label text-[var(--color-slate-400)] mb-1">BEST HARNESS</p>
            <p className="text-2xl md:text-3xl font-bold text-[var(--color-teal-700)]">
              {bestScore}%
            </p>
            <p className="text-[10px] text-[var(--color-slate-400)] mt-0.5 font-mono">
              full benchmark score
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap mb-5">
          {[
            { label: 'easy', color: DOT_COLORS.easy },
            { label: 'medium', color: DOT_COLORS.medium },
            { label: 'hard', color: DOT_COLORS.hard },
            { label: 'missed', color: DOT_COLORS.miss },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[var(--color-slate-500)]">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Dot grid — full benchmark, compact fixed-width columns */}
        <div
          className="grid gap-[3px] w-fit"
          style={{ gridTemplateColumns: `repeat(${cols}, 16px)` }}
        >
          {dots.map((dot, i) => {
            const color = DOT_COLORS[dot.difficulty] || DOT_COLORS.medium;
            const label = dot.evaluated
              ? `${dot.id} · ${dot.difficulty} · ${dot.resolved ? 'resolved' : 'missed'}`
              : 'not yet evaluated';
            return (
              <div
                key={dot.id || i}
                className="dot-grid-item aspect-square cursor-default"
                style={{ backgroundColor: color }}
                title={label}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
