/**
 * Task Atlas — full dot grid visualization for all benchmark tasks.
 *
 * Shows ALL tasks (500 for SWE-bench, 300 for Terminal-bench).
 * Evaluated tasks use real data; unevaluated ones get random teal colors.
 * Grey dots = evaluated but missed. Dots are seeded-shuffled for a
 * random-looking but deterministic layout.
 *
 * Features: per-repo color legend with counts, difficulty filter tabs,
 * status filter tabs, and a highlight reel of notable resolved tasks.
 */
import { useState, useMemo } from 'react';
import {
  BENCHMARKS, HARNESS_SCORES, generateDotGrid,
  REPO_COLORS, getRepoStats, getCategoryStats,
} from '../../data/benchmarks';
import SectionHeader from './SectionHeader';

/** Color map for dot difficulty states. */
const DOT_COLORS = {
  easy: 'var(--color-teal-200)',
  medium: 'var(--color-teal-400)',
  hard: 'var(--color-teal-700)',
  miss: 'var(--color-slate-300)',
};

/** Difficulty filter options. */
const DIFFICULTY_FILTERS = ['All', 'Easy', 'Medium', 'Hard'];

/** Status filter options. */
const STATUS_FILTERS = ['All', 'Passed', 'Failed'];

/** Highlight reel — notable resolved tasks to showcase. */
const SWE_HIGHLIGHTS = [
  {
    id: 'django__django-16527',
    title: '"fields" keyword argument for F() and OrderBy()',
    repo: 'django/django',
  },
  {
    id: 'sympy__sympy-23950',
    title: 'Simplify sqrt of a sum of squares',
    repo: 'sympy/sympy',
  },
  {
    id: 'scikit-learn__scikit-learn-26323',
    title: 'ColumnTransformer with set_output drops index',
    repo: 'scikit-learn/scikit-learn',
  },
];

const TB_HIGHLIGHTS = [
  {
    id: 'install-windows-3.11',
    title: 'Install Windows 3.11 in QEMU',
    category: 'hard',
  },
  {
    id: 'feal-differential-cryptanalysis',
    title: 'FEAL differential cryptanalysis attack',
    category: 'hard',
  },
  {
    id: 'torch-pipeline-parallelism',
    title: 'PyTorch pipeline parallelism implementation',
    category: 'hard',
  },
];

export default function TaskAtlas() {
  const [activeBench, setActiveBench] = useState('swe-bench');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const benchmark = BENCHMARKS.find((b) => b.id === activeBench) || BENCHMARKS[0];
  const bestScore = Math.max(...Object.values(HARNESS_SCORES[activeBench]));

  const allDots = useMemo(() => generateDotGrid(activeBench), [activeBench]);

  // Apply filters — unevaluated placeholder dots always stay visible
  // as background context; filters only affect evaluated dots.
  const dots = useMemo(() => {
    return allDots.filter((dot) => {
      // Placeholders always visible
      if (!dot.evaluated) return true;

      // Status filter
      if (statusFilter === 'Passed' && !dot.resolved) return false;
      if (statusFilter === 'Failed' && dot.resolved) return false;

      // Difficulty filter
      if (difficultyFilter !== 'All') {
        const filterKey = difficultyFilter.toLowerCase();
        const dotDiff = dot.category || dot.difficulty;
        if (dotDiff !== filterKey && dot.difficulty !== filterKey) return false;
      }

      return true;
    });
  }, [allDots, difficultyFilter, statusFilter]);

  const evaluatedDots = allDots.filter((d) => d.evaluated);
  const resolvedCount = evaluatedDots.filter((d) => d.resolved).length;
  const evaluatedCount = evaluatedDots.length;
  const passRate = evaluatedCount > 0 ? ((resolvedCount / evaluatedCount) * 100).toFixed(1) : '0';

  const repoStats = useMemo(() => getRepoStats(), []);
  const categoryStats = useMemo(() => getCategoryStats(), []);

  const highlights = activeBench === 'swe-bench' ? SWE_HIGHLIGHTS : TB_HIGHLIGHTS;

  /* Grid columns — wider grid for better proportions. */
  const cols = 30;

  // Reset filters when switching benchmarks
  const handleBenchSwitch = (benchId) => {
    setActiveBench(benchId);
    setDifficultyFilter('All');
    setStatusFilter('All');
  };

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
              onClick={() => handleBenchSwitch(b.id)}
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

        {/* Filter row: STATUS + DIFFICULTY + showing count */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-label text-[var(--color-slate-400)] text-xs">STATUS</span>
            <div className="flex gap-1">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    statusFilter === f
                      ? 'bg-[var(--color-slate-800)] text-white border-[var(--color-slate-800)]'
                      : 'bg-white text-[var(--color-slate-600)] border-[var(--color-border)] hover:bg-[var(--color-slate-100)]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-label text-[var(--color-slate-400)] text-xs">DIFFICULTY</span>
            <div className="flex gap-1">
              {DIFFICULTY_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setDifficultyFilter(f)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    difficultyFilter === f
                      ? 'bg-[var(--color-slate-800)] text-white border-[var(--color-slate-800)]'
                      : 'bg-white text-[var(--color-slate-600)] border-[var(--color-border)] hover:bg-[var(--color-slate-100)]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <span className="ml-auto text-xs text-[var(--color-slate-400)] font-mono">
            showing <strong className="text-[var(--color-slate-700)]">{dots.length}</strong>
            {' · '}{resolvedCount} passed · {passRate}%
          </span>
        </div>

        {/* Per-repo / per-category legend pills */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {activeBench === 'swe-bench' ? (
            <>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[var(--color-border)] text-xs">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--color-teal-600)' }} />
                <span className="font-medium text-[var(--color-slate-700)]">All repos</span>
                <span className="text-[var(--color-slate-400)]">{resolvedCount}/{evaluatedCount}</span>
              </span>
              {repoStats.map((r) => (
                <span
                  key={r.repo}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[var(--color-border)] text-xs"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: REPO_COLORS[r.repo] || 'var(--color-teal-400)' }}
                  />
                  <span className="font-medium text-[var(--color-slate-700)]">{r.repo}</span>
                  <span className="text-[var(--color-slate-400)]">{r.resolved}/{r.total}</span>
                </span>
              ))}
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[var(--color-border)] text-xs">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'var(--color-teal-600)' }} />
                <span className="font-medium text-[var(--color-slate-700)]">All categories</span>
                <span className="text-[var(--color-slate-400)]">{resolvedCount}/{evaluatedCount}</span>
              </span>
              {categoryStats.map((c) => (
                <span
                  key={c.category}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[var(--color-border)] text-xs"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: DOT_COLORS[c.category] || 'var(--color-teal-400)' }}
                  />
                  <span className="font-medium text-[var(--color-slate-700)]">{c.category}</span>
                  <span className="text-[var(--color-slate-400)]">{c.resolved}/{c.total}</span>
                </span>
              ))}
            </>
          )}
        </div>

        {/* Dot grid — full-width, dots fill available space */}
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {dots.map((dot, i) => {
            // For SWE-bench evaluated dots, use repo color if available
            let color;
            if (activeBench === 'swe-bench' && dot.evaluated && dot.resolved && dot.repo) {
              color = REPO_COLORS[dot.repo] || DOT_COLORS[dot.difficulty] || DOT_COLORS.medium;
            } else {
              color = DOT_COLORS[dot.difficulty] || DOT_COLORS.medium;
            }
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

        {/* Bottom legend */}
        <div className="flex items-center gap-4 flex-wrap mt-4 mb-6">
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

        {/* Highlight reel */}
        <div className="border-t border-[var(--color-border)] pt-6">
          <p className="text-label text-[var(--color-slate-400)] mb-4">
            HIGHLIGHT REEL &middot; TASKS ONLY VORFLUX RESOLVED
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div key={h.id} className="card p-4">
                <p className="text-xs font-mono text-[var(--color-teal-700)] mb-2">{h.id}</p>
                <p className="text-sm font-medium text-[var(--color-slate-800)] leading-snug">
                  {h.title}
                </p>
                <p className="text-xs text-[var(--color-slate-400)] mt-2">
                  {h.repo || h.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
