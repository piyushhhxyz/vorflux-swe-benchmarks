import { useState, useMemo } from 'react';
import {
  BENCHMARKS, HARNESSES, HARNESS_SCORES, LEADERBOARD,
  SWE_BENCH_REPO_TOTALS, TERMINAL_BENCH_REPO_TOTALS, generateDotGrid,
} from '../data/benchmarks';
import { RESOLVED_BY_REPO, RESOLVED_TERMINAL_BENCH_BY_REPO } from '../data/resolvedInstances';

export default function useBenchmarkState() {
  const [activeBenchmark, setActiveBenchmark] = useState('swe-bench');
  const [activeHarness, setActiveHarness] = useState('cosmos-pro');

  const benchmark = BENCHMARKS.find((b) => b.id === activeBenchmark);
  const harness = HARNESSES.find((h) => h.id === activeHarness);
  const scores = HARNESS_SCORES[activeBenchmark]?.[activeHarness] ?? null;

  const leaderboard = useMemo(
    () => LEADERBOARD[activeBenchmark] || [],
    [activeBenchmark]
  );

  // Derive scatter data from leaderboard (Simplify #1: eliminate SCATTER_DATA)
  const scatterData = useMemo(
    () => leaderboard.map(({ agent, score, cost, ours }) => ({ agent, score, cost, ours })),
    [leaderboard]
  );

  const dotGrid = useMemo(() => {
    if (activeBenchmark === 'swe-bench') return generateDotGrid(SWE_BENCH_REPO_TOTALS, RESOLVED_BY_REPO);
    return generateDotGrid(TERMINAL_BENCH_REPO_TOTALS, RESOLVED_TERMINAL_BENCH_BY_REPO);
  }, [activeBenchmark]);

  const repoBarData = useMemo(() => {
    const totals = activeBenchmark === 'swe-bench' ? SWE_BENCH_REPO_TOTALS : TERMINAL_BENCH_REPO_TOTALS;
    const resolved = activeBenchmark === 'swe-bench' ? RESOLVED_BY_REPO : RESOLVED_TERMINAL_BENCH_BY_REPO;
    return Object.entries(totals)
      .map(([repo, total]) => ({
        repo, total,
        resolved: resolved[repo] || 0,
        percentage: Math.round(((resolved[repo] || 0) / total) * 100),
      }))
      .sort((a, b) => b.resolved - a.resolved);
  }, [activeBenchmark]);

  const harnessesWithScores = useMemo(() =>
    HARNESSES.map((h) => ({ ...h, score: HARNESS_SCORES[activeBenchmark]?.[h.id]?.score ?? null })),
    [activeBenchmark]
  );

  const benchmarksWithScores = useMemo(() =>
    BENCHMARKS.map((b) => ({ ...b, topScore: HARNESS_SCORES[b.id]?.[activeHarness]?.score ?? null })),
    [activeHarness]
  );

  const dotGridStats = useMemo(() => {
    const totalResolved = dotGrid.filter((d) => d.resolved).length;
    return { resolved: totalResolved, total: dotGrid.length };
  }, [dotGrid]);

  return {
    activeBenchmark, setActiveBenchmark,
    activeHarness, setActiveHarness,
    benchmark, harness, scores, leaderboard, scatterData,
    dotGrid, repoBarData, harnessesWithScores, benchmarksWithScores, dotGridStats,
  };
}
