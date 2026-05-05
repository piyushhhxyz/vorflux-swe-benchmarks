import { describe, it, expect } from 'vitest';
import {
  BENCHMARKS, HARNESSES, HARNESS_SCORES,
  COMPETITORS, COMPETITOR_SCORES,
  generateDotGrid, TOP_HARNESSES,
  TERMINAL_BENCH_TASKS, SWE_BENCH_TASKS,
  SHIPPING_LOOP, SUB_AGENTS,
  getRepoUrl, EVAL_DATE,
  getBestHarnessScore,
} from './benchmarks';

describe('BENCHMARKS', () => {
  it('has swe-bench and terminal-bench entries', () => {
    expect(BENCHMARKS).toHaveLength(2);
    expect(BENCHMARKS.map((b) => b.id)).toEqual(['swe-bench', 'terminal-bench']);
  });

  it('swe-bench has 500 tasks', () => {
    const swe = BENCHMARKS.find((b) => b.id === 'swe-bench');
    expect(swe.totalTasks).toBe(500);
  });

  it('terminal-bench has 300 tasks', () => {
    const term = BENCHMARKS.find((b) => b.id === 'terminal-bench');
    expect(term.totalTasks).toBe(300);
  });

  it('each benchmark has description', () => {
    for (const b of BENCHMARKS) {
      expect(b.description).toBeTruthy();
    }
  });
});

describe('EVAL_DATE', () => {
  it('is a non-empty string', () => {
    expect(typeof EVAL_DATE).toBe('string');
    expect(EVAL_DATE.length).toBeGreaterThan(0);
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
      expect(h).toHaveProperty('label');
      expect(h).toHaveProperty('seats');
      expect(h.seats).toHaveProperty('plan');
      expect(h.seats).toHaveProperty('explore');
      expect(h.seats).toHaveProperty('build');
      expect(h.seats).toHaveProperty('review');
      expect(h.seats).toHaveProperty('test');
    }
  });
});

describe('TOP_HARNESSES', () => {
  it('has exactly 3 entries', () => {
    expect(TOP_HARNESSES).toHaveLength(3);
  });

  it('is a subset of HARNESSES', () => {
    for (const th of TOP_HARNESSES) {
      expect(HARNESSES).toContainEqual(th);
    }
  });

  it('is sorted by SWE-bench score descending (nulls last)', () => {
    for (let i = 0; i < TOP_HARNESSES.length - 1; i++) {
      const scoreA = HARNESS_SCORES['swe-bench'][TOP_HARNESSES[i].id] ?? 0;
      const scoreB = HARNESS_SCORES['swe-bench'][TOP_HARNESSES[i + 1].id] ?? 0;
      expect(scoreA).toBeGreaterThanOrEqual(scoreB);
    }
  });
});

describe('HARNESS_SCORES', () => {
  it('has entries for both benchmarks with all harness IDs', () => {
    for (const benchKey of ['swe-bench', 'terminal-bench']) {
      const scores = HARNESS_SCORES[benchKey];
      expect(scores).toBeDefined();
      for (const h of HARNESSES) {
        expect(scores).toHaveProperty(h.id);
      }
    }
  });

  it('opus46-gpt55h SWE-bench score is 82.6', () => {
    expect(HARNESS_SCORES['swe-bench']['opus46-gpt55h']).toBe(82.6);
  });

  it('opus46-gpt55h Terminal-bench score is 75.3', () => {
    expect(HARNESS_SCORES['terminal-bench']['opus46-gpt55h']).toBe(75.3);
  });

  it('all non-null scores are between 0 and 100', () => {
    for (const benchKey of ['swe-bench', 'terminal-bench']) {
      for (const val of Object.values(HARNESS_SCORES[benchKey])) {
        if (val != null) {
          expect(val).toBeGreaterThanOrEqual(0);
          expect(val).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

describe('getBestHarnessScore', () => {
  it('returns highest SWE-bench score', () => {
    expect(getBestHarnessScore('swe-bench')).toBe(82.6);
  });

  it('returns highest Terminal-bench score', () => {
    expect(getBestHarnessScore('terminal-bench')).toBe(75.3);
  });

  it('returns null for unknown benchmark', () => {
    expect(getBestHarnessScore('nonexistent')).toBeNull();
  });
});

describe('COMPETITORS', () => {
  it('has five competitors', () => {
    expect(COMPETITORS).toHaveLength(5);
  });

  it('each competitor has id and name', () => {
    for (const c of COMPETITORS) {
      expect(c.id).toBeTruthy();
      expect(c.name).toBeTruthy();
    }
  });
});

describe('COMPETITOR_SCORES', () => {
  it('has entries for both benchmarks', () => {
    for (const benchKey of ['swe-bench', 'terminal-bench']) {
      const scores = COMPETITOR_SCORES[benchKey];
      expect(scores).toBeDefined();
      for (const c of COMPETITORS) {
        expect(scores).toHaveProperty(c.id);
      }
    }
  });

  it('OpenAI Codex has null SWE-bench score', () => {
    expect(COMPETITOR_SCORES['swe-bench']['openai-codex']).toBeNull();
  });

  it('all non-null scores are between 0 and 100', () => {
    for (const benchKey of ['swe-bench', 'terminal-bench']) {
      for (const val of Object.values(COMPETITOR_SCORES[benchKey])) {
        if (val != null) {
          expect(val).toBeGreaterThanOrEqual(0);
          expect(val).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

describe('TERMINAL_BENCH_TASKS', () => {
  it('has 89 tasks', () => {
    expect(TERMINAL_BENCH_TASKS).toHaveLength(89);
  });

  it('each task has id, resolved, and difficulty', () => {
    for (const t of TERMINAL_BENCH_TASKS) {
      expect(t.id).toBeTruthy();
      expect(typeof t.resolved).toBe('boolean');
      expect(['easy', 'medium', 'hard']).toContain(t.difficulty);
    }
  });

  it('has 67 resolved tasks', () => {
    expect(TERMINAL_BENCH_TASKS.filter((t) => t.resolved)).toHaveLength(67);
  });
});

describe('SWE_BENCH_TASKS', () => {
  it('has 500 evaluated tasks (full dataset)', () => {
    expect(SWE_BENCH_TASKS).toHaveLength(500);
  });

  it('each task has id, resolved, and repo', () => {
    for (const t of SWE_BENCH_TASKS) {
      expect(t.id).toBeTruthy();
      expect(typeof t.resolved).toBe('boolean');
      expect(t.repo).toBeTruthy();
    }
  });

  it('has 413 resolved and 87 unresolved tasks', () => {
    expect(SWE_BENCH_TASKS.filter((t) => t.resolved)).toHaveLength(413);
    expect(SWE_BENCH_TASKS.filter((t) => !t.resolved)).toHaveLength(87);
  });

  it('covers all 12 repos', () => {
    const repos = new Set(SWE_BENCH_TASKS.map((t) => t.repo));
    expect(repos.size).toBe(12);
  });
});

describe('generateDotGrid', () => {
  it('generates 500 dots for SWE-bench (full benchmark)', () => {
    const dots = generateDotGrid('swe-bench');
    expect(dots).toHaveLength(500);
  });

  it('generates 300 dots for Terminal-bench (full benchmark)', () => {
    const dots = generateDotGrid('terminal-bench');
    expect(dots).toHaveLength(300);
  });

  it('has 500 evaluated dots for SWE-bench and 89 for Terminal-bench', () => {
    const sweDots = generateDotGrid('swe-bench');
    expect(sweDots.filter((d) => d.evaluated)).toHaveLength(500);
    const tbDots = generateDotGrid('terminal-bench');
    expect(tbDots.filter((d) => d.evaluated)).toHaveLength(89);
  });

  it('evaluated dots have real task IDs, placeholders have placeholder IDs', () => {
    const dots = generateDotGrid('terminal-bench');
    const evaluated = dots.filter((d) => d.evaluated);
    const placeholders = dots.filter((d) => !d.evaluated);
    for (const d of evaluated) {
      expect(d.id).not.toMatch(/^placeholder-/);
    }
    for (const d of placeholders) {
      expect(d.id).toMatch(/^placeholder-/);
    }
  });

  it('resolved evaluated dots have valid difficulty tiers', () => {
    const dots = generateDotGrid('terminal-bench');
    const resolved = dots.filter((d) => d.evaluated && d.resolved);
    const validTiers = ['easy', 'medium', 'hard'];
    for (const d of resolved) {
      expect(validTiers).toContain(d.difficulty);
    }
  });

  it('unresolved evaluated dots have difficulty "miss"', () => {
    const dots = generateDotGrid('terminal-bench');
    const missed = dots.filter((d) => d.evaluated && !d.resolved);
    for (const d of missed) {
      expect(d.difficulty).toBe('miss');
    }
  });

  it('placeholder dots are a mix of teal colors and empty', () => {
    const dots = generateDotGrid('swe-bench');
    const placeholders = dots.filter((d) => !d.evaluated);
    expect(placeholders.length).toBe(0);
    const validTiers = ['easy', 'medium', 'hard', 'empty'];
    for (const d of placeholders) {
      expect(validTiers).toContain(d.difficulty);
    }
  });

  it('is deterministic across calls', () => {
    const a = generateDotGrid('swe-bench');
    const b = generateDotGrid('swe-bench');
    for (let i = 0; i < a.length; i++) {
      expect(a[i].id).toBe(b[i].id);
      expect(a[i].difficulty).toBe(b[i].difficulty);
    }
  });

  it('dots are shuffled (not in original order)', () => {
    const dots = generateDotGrid('terminal-bench');
    const ids = dots.map((d) => d.id);
    const sortedIds = [...ids].sort();
    expect(ids).not.toEqual(sortedIds);
  });

  it('returns empty array for unknown benchmark', () => {
    const dots = generateDotGrid('nonexistent');
    expect(dots).toHaveLength(0);
  });
});

describe('SHIPPING_LOOP', () => {
  it('has 4 steps', () => {
    expect(SHIPPING_LOOP).toHaveLength(4);
  });

  it('steps are numbered 1-4', () => {
    expect(SHIPPING_LOOP.map((s) => s.step)).toEqual([1, 2, 3, 4]);
  });

  it('each step has name and description', () => {
    for (const s of SHIPPING_LOOP) {
      expect(s.name).toBeTruthy();
      expect(s.description).toBeTruthy();
    }
  });
});

describe('SUB_AGENTS', () => {
  it('has 6 sub-agents', () => {
    expect(SUB_AGENTS).toHaveLength(6);
  });

  it('each sub-agent has name and description', () => {
    for (const a of SUB_AGENTS) {
      expect(a.name).toBeTruthy();
      expect(a.description).toBeTruthy();
    }
  });
});

describe('URL builders', () => {
  it('getRepoUrl returns GitHub URL', () => {
    const url = getRepoUrl();
    expect(url).toContain('github.com');
    expect(url).toContain('vorflux-swe-benchmarks');
  });
});
