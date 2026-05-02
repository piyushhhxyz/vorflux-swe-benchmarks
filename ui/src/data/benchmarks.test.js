import { describe, it, expect } from 'vitest';
import {
  BENCHMARKS, HARNESSES, HARNESS_SCORES, LEADERBOARD,
  SWE_BENCH_REPO_TOTALS, TERMINAL_BENCH_REPO_TOTALS, generateDotGrid,
  REPO_PALETTE, REPO_COLORS,
  VORFLUXING_LOOP, REAL_WORLD_FEATURES,
  getPatchUrl, getRepoUrl,
} from './benchmarks';
import { RESOLVED_BY_REPO, RESOLVED_SWE_BENCH, RESOLVED_TERMINAL_BENCH_BY_REPO } from './resolvedInstances';

describe('BENCHMARKS', () => {
  it('has swe-bench and terminal-bench entries', () => {
    expect(BENCHMARKS).toHaveLength(2);
    expect(BENCHMARKS.map((b) => b.id)).toEqual(['swe-bench', 'terminal-bench']);
  });

  it('swe-bench totalTasks matches repo totals sum', () => {
    const sweBench = BENCHMARKS.find((b) => b.id === 'swe-bench');
    const repoTotalSum = Object.values(SWE_BENCH_REPO_TOTALS).reduce((a, b) => a + b, 0);
    expect(sweBench.totalTasks).toBe(repoTotalSum);
  });

  it('terminal-bench is marked as comingSoon', () => {
    const termBench = BENCHMARKS.find((b) => b.id === 'terminal-bench');
    expect(termBench.comingSoon).toBe(true);
  });

  it('swe-bench has finishedAt metadata', () => {
    const sweBench = BENCHMARKS.find((b) => b.id === 'swe-bench');
    expect(sweBench.finishedAt).toBeTruthy();
  });

  it('terminal-bench has null finishedAt (no results yet)', () => {
    const termBench = BENCHMARKS.find((b) => b.id === 'terminal-bench');
    expect(termBench.finishedAt).toBeNull();
  });

  it('each benchmark has headerLabel and runId fields', () => {
    for (const b of BENCHMARKS) {
      expect(b).toHaveProperty('headerLabel');
      expect(b).toHaveProperty('runIdPrefix');
      expect(b).toHaveProperty('runIdSuffix');
    }
  });
});

describe('HARNESSES', () => {
  it('has three harness configurations', () => {
    expect(HARNESSES).toHaveLength(3);
  });

  it('each harness has required fields', () => {
    for (const h of HARNESSES) {
      expect(h).toHaveProperty('id');
      expect(h).toHaveProperty('name');
      expect(h).toHaveProperty('shortName');
      expect(h).toHaveProperty('plan');
      expect(h).toHaveProperty('code');
      expect(h).toHaveProperty('review');
    }
  });
});

describe('HARNESS_SCORES', () => {
  it('has entries for swe-bench with all harness IDs', () => {
    const sweScores = HARNESS_SCORES['swe-bench'];
    expect(sweScores).toBeDefined();
    for (const h of HARNESSES) {
      expect(sweScores).toHaveProperty(h.id);
      expect(sweScores[h.id]).not.toBeNull();
    }
  });

  it('terminal-bench scores are all null (no results)', () => {
    const termScores = HARNESS_SCORES['terminal-bench'];
    expect(termScores).toBeDefined();
    for (const h of HARNESSES) {
      expect(termScores[h.id]).toBeNull();
    }
  });

  it('swe-bench Pro score matches 83.0 (83/100 run)', () => {
    expect(HARNESS_SCORES['swe-bench']['cosmos-pro'].score).toBe(83.0);
  });
});

describe('LEADERBOARD', () => {
  it('swe-bench leaderboard is populated', () => {
    expect(LEADERBOARD['swe-bench'].length).toBeGreaterThan(0);
  });

  it('terminal-bench leaderboard is empty (no results)', () => {
    expect(LEADERBOARD['terminal-bench']).toEqual([]);
  });

  it('swe-bench leaderboard has Vorflux entry marked as ours', () => {
    const ours = LEADERBOARD['swe-bench'].find((e) => e.ours);
    expect(ours).toBeDefined();
    expect(ours.agent).toContain('Vorflux');
  });

  it('leaderboard entries have all required fields', () => {
    for (const entry of LEADERBOARD['swe-bench']) {
      expect(entry).toHaveProperty('rank');
      expect(entry).toHaveProperty('agent');
      expect(entry).toHaveProperty('score');
      expect(entry).toHaveProperty('cost');
      expect(entry).toHaveProperty('time');
    }
  });

  it('our leaderboard score matches HARNESS_SCORES for Pro', () => {
    const ours = LEADERBOARD['swe-bench'].find((e) => e.ours);
    expect(ours.score).toBe(HARNESS_SCORES['swe-bench']['cosmos-pro'].score);
  });
});

describe('resolved instances consistency', () => {
  it('RESOLVED_SWE_BENCH count is 83', () => {
    expect(RESOLVED_SWE_BENCH).toHaveLength(83);
  });

  it('RESOLVED_BY_REPO values sum to 83', () => {
    const sum = Object.values(RESOLVED_BY_REPO).reduce((a, b) => a + b, 0);
    expect(sum).toBe(83);
  });

  it('resolved counts do not exceed repo totals', () => {
    for (const [repo, total] of Object.entries(SWE_BENCH_REPO_TOTALS)) {
      const resolved = RESOLVED_BY_REPO[repo] || 0;
      expect(resolved).toBeLessThanOrEqual(total);
    }
  });

  it('all repos in RESOLVED_BY_REPO exist in SWE_BENCH_REPO_TOTALS', () => {
    for (const repo of Object.keys(RESOLVED_BY_REPO)) {
      if (RESOLVED_BY_REPO[repo] > 0) {
        expect(SWE_BENCH_REPO_TOTALS).toHaveProperty(repo);
      }
    }
  });

  it('terminal-bench has zero resolved instances', () => {
    const sum = Object.values(RESOLVED_TERMINAL_BENCH_BY_REPO).reduce((a, b) => a + b, 0);
    expect(sum).toBe(0);
  });

  it('terminal-bench totalTasks matches TERMINAL_BENCH_REPO_TOTALS sum', () => {
    const termBench = BENCHMARKS.find((b) => b.id === 'terminal-bench');
    const repoTotalSum = Object.values(TERMINAL_BENCH_REPO_TOTALS).reduce((a, b) => a + b, 0);
    expect(termBench.totalTasks).toBe(repoTotalSum);
  });
});

describe('generateDotGrid', () => {
  it('generates correct number of dots for swe-bench', () => {
    const dots = generateDotGrid(SWE_BENCH_REPO_TOTALS, RESOLVED_BY_REPO);
    const expectedTotal = Object.values(SWE_BENCH_REPO_TOTALS).reduce((a, b) => a + b, 0);
    expect(dots).toHaveLength(expectedTotal);
  });

  it('marks first N dots as resolved per repo', () => {
    const totals = { 'test/repo': 5 };
    const resolved = { 'test/repo': 3 };
    const dots = generateDotGrid(totals, resolved);
    expect(dots).toHaveLength(5);
    expect(dots.filter((d) => d.resolved)).toHaveLength(3);
    // First 3 should be resolved
    expect(dots[0].resolved).toBe(true);
    expect(dots[2].resolved).toBe(true);
    expect(dots[3].resolved).toBe(false);
  });

  it('handles repos with zero resolved', () => {
    const totals = { 'test/repo': 3 };
    const resolved = { 'test/repo': 0 };
    const dots = generateDotGrid(totals, resolved);
    expect(dots.filter((d) => d.resolved)).toHaveLength(0);
  });

  it('total resolved dots match RESOLVED_BY_REPO sum', () => {
    const dots = generateDotGrid(SWE_BENCH_REPO_TOTALS, RESOLVED_BY_REPO);
    const resolvedDots = dots.filter((d) => d.resolved).length;
    const expectedResolved = Object.values(RESOLVED_BY_REPO).reduce((a, b) => a + b, 0);
    expect(resolvedDots).toBe(expectedResolved);
  });
});

describe('REPO_PALETTE and REPO_COLORS', () => {
  it('REPO_PALETTE uses CSS variable references', () => {
    for (const color of REPO_PALETTE) {
      expect(color).toMatch(/^var\(--color-teal-\d+\)$/);
    }
  });

  it('REPO_COLORS has entries for all SWE_BENCH repos', () => {
    for (const repo of Object.keys(SWE_BENCH_REPO_TOTALS)) {
      expect(REPO_COLORS).toHaveProperty(repo);
    }
  });

  it('REPO_COLORS has entry for terminal-bench', () => {
    expect(REPO_COLORS).toHaveProperty('terminal-bench');
  });
});

describe('VORFLUXING_LOOP', () => {
  it('has 6 steps', () => {
    expect(VORFLUXING_LOOP).toHaveLength(6);
  });

  it('steps are numbered 1–6', () => {
    const steps = VORFLUXING_LOOP.map((s) => s.step);
    expect(steps).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('REAL_WORLD_FEATURES', () => {
  it('has 4 features', () => {
    expect(REAL_WORLD_FEATURES).toHaveLength(4);
  });

  it('each feature has required fields', () => {
    for (const feat of REAL_WORLD_FEATURES) {
      expect(feat).toHaveProperty('category');
      expect(feat).toHaveProperty('title');
      expect(feat).toHaveProperty('added');
      expect(feat).toHaveProperty('removed');
    }
  });
});

describe('URL builders', () => {
  it('getPatchUrl generates correct URL', () => {
    const url = getPatchUrl('django__django-10554');
    expect(url).toContain('vorflux-swe-benchmarks');
    expect(url).toContain('django__django-10554.diff');
    expect(url).toContain('20250427_vorflux_agent_v2');
  });

  it('getRepoUrl returns GitHub URL', () => {
    const url = getRepoUrl();
    expect(url).toContain('github.com');
    expect(url).toContain('vorflux-swe-benchmarks');
  });
});
