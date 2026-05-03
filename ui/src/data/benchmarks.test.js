import { describe, it, expect } from 'vitest';
import {
  BENCHMARKS, HARNESSES, HARNESS_SCORES,
  COMPETITORS, COMPETITOR_SCORES,
  RAW_MODELS, RAW_BENCHMARK_CATEGORIES, MODEL_SCORES,
  generateDotGrid,
  SHIPPING_LOOP, SUB_AGENTS,
  getRepoUrl, EVAL_DATE,
  getModelScoreValue, getModelScoreNote,
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
  it('has four harness configurations', () => {
    expect(HARNESSES).toHaveLength(4);
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

  it('first harness actually has the highest SWE-bench score', () => {
    const firstId = HARNESSES[0].id;
    const firstScore = HARNESS_SCORES['swe-bench'][firstId];
    for (const h of HARNESSES) {
      const score = HARNESS_SCORES['swe-bench'][h.id];
      expect(firstScore).toBeGreaterThanOrEqual(score);
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

  it('best SWE-bench score is 91.0', () => {
    expect(HARNESS_SCORES['swe-bench']['opus47-gpt55']).toBe(91.0);
  });

  it('best Terminal-bench score is 86.0', () => {
    expect(HARNESS_SCORES['terminal-bench']['opus47-gpt55']).toBe(86.0);
  });

  it('all scores are between 0 and 100', () => {
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

describe('RAW_MODELS', () => {
  it('has at least one model', () => {
    expect(RAW_MODELS.length).toBeGreaterThan(0);
  });

  it('each model has id and name', () => {
    for (const m of RAW_MODELS) {
      expect(m.id).toBeTruthy();
      expect(m.name).toBeTruthy();
    }
  });

  it('exactly one model is flagged as flagship', () => {
    const flagships = RAW_MODELS.filter((m) => m.flagship);
    expect(flagships).toHaveLength(1);
  });
});

describe('RAW_BENCHMARK_CATEGORIES', () => {
  it('has three benchmark categories', () => {
    expect(RAW_BENCHMARK_CATEGORIES).toHaveLength(3);
  });

  it('each category has key, name, and sub', () => {
    for (const b of RAW_BENCHMARK_CATEGORIES) {
      expect(b.key).toBeTruthy();
      expect(b.name).toBeTruthy();
      expect(b.sub).toBeTruthy();
    }
  });
});

describe('MODEL_SCORES', () => {
  it('has entries for all benchmark categories', () => {
    for (const cat of RAW_BENCHMARK_CATEGORIES) {
      expect(MODEL_SCORES).toHaveProperty(cat.key);
    }
  });

  it('all numeric score values are between 0 and 100', () => {
    for (const cat of RAW_BENCHMARK_CATEGORIES) {
      const scores = MODEL_SCORES[cat.key];
      for (const entry of Object.values(scores)) {
        const val = getModelScoreValue(entry);
        if (val != null) {
          expect(val).toBeGreaterThanOrEqual(0);
          expect(val).toBeLessThanOrEqual(100);
        }
      }
    }
  });
});

describe('getModelScoreValue / getModelScoreNote', () => {
  it('extracts plain number', () => {
    expect(getModelScoreValue(75.1)).toBe(75.1);
    expect(getModelScoreNote(75.1)).toBeNull();
  });

  it('handles null', () => {
    expect(getModelScoreValue(null)).toBeNull();
    expect(getModelScoreNote(null)).toBeNull();
  });

  it('extracts value and note from object entry', () => {
    const entry = { value: 75.1, note: 'self-reported harness' };
    expect(getModelScoreValue(entry)).toBe(75.1);
    expect(getModelScoreNote(entry)).toBe('self-reported harness');
  });

  it('returns null note when object has no note field', () => {
    expect(getModelScoreNote({ value: 50 })).toBeNull();
  });
});

describe('generateDotGrid', () => {
  it('generates correct number of dots', () => {
    const dots = generateDotGrid(500, 443);
    expect(dots).toHaveLength(500);
  });

  it('marks correct number as resolved', () => {
    const dots = generateDotGrid(500, 443);
    expect(dots.filter((d) => d.resolved)).toHaveLength(443);
  });

  it('unresolved dots have difficulty "miss"', () => {
    const dots = generateDotGrid(10, 5);
    const misses = dots.filter((d) => !d.resolved);
    for (const m of misses) {
      expect(m.difficulty).toBe('miss');
    }
  });

  it('resolved dots have valid difficulty tiers', () => {
    const dots = generateDotGrid(100, 80);
    const resolved = dots.filter((d) => d.resolved);
    const validTiers = ['easy', 'med', 'hard', 'expert'];
    for (const d of resolved) {
      expect(validTiers).toContain(d.difficulty);
    }
  });

  it('is deterministic across calls', () => {
    const a = generateDotGrid(50, 30);
    const b = generateDotGrid(50, 30);
    for (let i = 0; i < 50; i++) {
      expect(a[i].difficulty).toBe(b[i].difficulty);
    }
  });

  it('handles zero resolved', () => {
    const dots = generateDotGrid(10, 0);
    expect(dots.filter((d) => d.resolved)).toHaveLength(0);
    expect(dots.every((d) => d.difficulty === 'miss')).toBe(true);
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
