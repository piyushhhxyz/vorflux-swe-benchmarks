/**
 * Benchmark data — scores, harnesses, competitors, models, and loop stages.
 *
 * Updated May 2026 with latest eval results.
 */

// ---------------------------------------------------------------------------
// Shared constants
// ---------------------------------------------------------------------------

/** Display date for the evaluation run. Update here when new evals land. */
export const EVAL_DATE = 'MAY 2026';

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

export const BENCHMARKS = [
  {
    id: 'swe-bench',
    name: 'SWE-bench Verified',
    shortName: 'SWE-bench Verified',
    totalTasks: 500,
    description: '500 human-verified GitHub issues across 12 mature Python repos.',
  },
  {
    id: 'terminal-bench',
    name: 'Terminal-Bench 2.0',
    shortName: 'Terminal-Bench 2.0',
    totalTasks: 300,
    description: '300 real-world shell tasks. A run passes only if the final filesystem state matches.',
  },
];

// ---------------------------------------------------------------------------
// Vorflux Harnesses (our agent configurations)
// Each harness is a "recipe" — which model plans, which writes code, which reviews.
// ---------------------------------------------------------------------------

export const HARNESSES = [
  {
    id: 'opus47-gpt55',
    name: 'Opus 4.7 x GPT-5.5',
    label: 'BEST RESULT',
    seats: {
      plan: 'GPT-5.5',
      explore: 'Haiku 4.5 xN',
      build: 'Opus 4.7',
      review: 'GPT-5.5',
      test: 'Opus 4.7',
    },
  },
  {
    id: 'opus47-opus47',
    name: 'Opus 4.7 x Opus 4.7',
    label: 'PARANOID REVIEW',
    seats: {
      plan: 'Opus 4.7',
      explore: 'Haiku 4.5 xN',
      build: 'Opus 4.7',
      review: 'Opus 4.7',
      test: 'Opus 4.7',
    },
  },
  {
    id: 'gpt55-gpt55',
    name: 'GPT-5.5 x GPT-5.5',
    label: 'SINGLE-VENDOR',
    seats: {
      plan: 'GPT-5.5',
      explore: 'GPT-5.5',
      build: 'GPT-5.5',
      review: 'GPT-5.5',
      test: 'GPT-5.5',
    },
  },
  {
    id: 'opus47-o4high',
    name: 'Opus 4.7 x o4 high',
    label: 'DEEP REVIEW',
    seats: {
      plan: 'o4 high',
      explore: 'Haiku 4.5 xN',
      build: 'Opus 4.7',
      review: 'o4 high',
      test: 'Opus 4.7',
    },
  },
];

// ---------------------------------------------------------------------------
// Scores — Vorflux harnesses
// ---------------------------------------------------------------------------

export const HARNESS_SCORES = {
  'swe-bench': {
    'opus47-gpt55': 91.0,
    'opus47-opus47': 88.4,
    'gpt55-gpt55': 84.6,
    'opus47-o4high': 89.2,
  },
  'terminal-bench': {
    'opus47-gpt55': 86.0,
    'opus47-opus47': 84.2,
    'gpt55-gpt55': 80.3,
    'opus47-o4high': 85.1,
  },
};

// ---------------------------------------------------------------------------
// Competitor agents — other companies' scores on the same benchmarks
// ---------------------------------------------------------------------------

export const COMPETITORS = [
  {
    id: 'claude-code-opus47',
    name: 'Claude Code (Opus 4.7)',
    sub: 'self-reported',
  },
  {
    id: 'claude-code-opus46',
    name: 'Claude Code (Opus 4.6)',
    sub: '',
  },
  {
    id: 'openai-codex',
    name: 'OpenAI Codex (GPT-5.4)',
    sub: 'self-reported, no SWE-bench number',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI (3.1 Pro)',
    sub: '',
  },
  {
    id: 'mythos-preview',
    name: 'Mythos Preview',
    sub: 'preview build',
  },
];

export const COMPETITOR_SCORES = {
  'swe-bench': {
    'claude-code-opus47': 87.6,
    'claude-code-opus46': 80.8,
    'openai-codex': null, // no SWE-bench verified number
    'gemini-cli': 80.6,
    'mythos-preview': 77.8,
  },
  'terminal-bench': {
    'claude-code-opus47': 80.8,
    'claude-code-opus46': 75.4,
    'openai-codex': 75.1,
    'gemini-cli': 68.5,
    'mythos-preview': 64.3,
  },
};

// ---------------------------------------------------------------------------
// Raw model scores (not harness — just the model itself on benchmarks)
// Feedback #10: centralized in data layer (was in ModelComparison.jsx)
// ---------------------------------------------------------------------------

export const RAW_MODELS = [
  { id: 'opus47', name: 'Opus 4.7', flagship: true },
  { id: 'opus46', name: 'Opus 4.6' },
  { id: 'gpt54', name: 'GPT-5.4' },
  { id: 'gemini31pro', name: 'Gemini 3.1 Pro' },
  { id: 'mythos', name: 'Mythos Preview' },
];

export const RAW_BENCHMARK_CATEGORIES = [
  { key: 'swe-bench-pro', name: 'Agentic coding', sub: 'SWE-bench Pro' },
  { key: 'swe-bench-verified', name: 'Agentic coding', sub: 'SWE-bench Verified' },
  { key: 'terminal-bench', name: 'Agentic terminal coding', sub: 'Terminal-Bench 2.0' },
];

export const MODEL_SCORES = {
  'swe-bench-pro': {
    'opus47': 64.3,
    'opus46': 53.4,
    'gpt54': 57.7,
    'gemini31pro': 54.2,
    'mythos': 77.8,
  },
  'swe-bench-verified': {
    'opus47': 87.6,
    'opus46': 80.8,
    'gpt54': null,
    'gemini31pro': 80.6,
    'mythos': 93.9,
  },
  'terminal-bench': {
    'opus47': 69.4,
    'opus46': 65.4,
    'gpt54': { value: 75.1, note: 'self-reported harness' },
    'gemini31pro': 68.5,
    'mythos': 82.0,
  },
};

/**
 * Extract the numeric value from a MODEL_SCORES entry.
 * Entries can be a plain number, null, or { value, note }.
 */
export function getModelScoreValue(entry) {
  if (entry == null) return null;
  if (typeof entry === 'number') return entry;
  return entry.value ?? null;
}

/**
 * Extract the annotation note from a MODEL_SCORES entry, if any.
 */
export function getModelScoreNote(entry) {
  if (entry != null && typeof entry === 'object' && 'note' in entry) return entry.note;
  return null;
}

// ---------------------------------------------------------------------------
// Aggregate dot grid — visualization of resolved vs. unresolved tasks.
//
// NOTE: This generates an *aggregate* visualization from total/resolved counts
// only. Difficulty tiers are assigned by a deterministic hash — they do NOT
// represent actual per-task difficulty metadata.
// ---------------------------------------------------------------------------

export function generateDotGrid(totalTasks, resolvedCount) {
  const dots = [];
  const tiers = ['easy', 'med', 'hard', 'expert'];
  for (let i = 0; i < totalTasks; i++) {
    // Deterministic hash so the grid is stable across re-renders
    const hash = ((i * 2654435761) >>> 0) % 4;
    dots.push({
      index: i,
      resolved: i < resolvedCount,
      difficulty: i < resolvedCount ? tiers[hash] : 'miss',
    });
  }
  return dots;
}

// ---------------------------------------------------------------------------
// The Shipping Loop — 4 stages + sub-agents
// ---------------------------------------------------------------------------

export const SHIPPING_LOOP = [
  {
    step: 1,
    name: 'Plan',
    description: 'PRD parsed · acceptance criteria · interfaces stubbed',
  },
  {
    step: 2,
    name: 'Build',
    description: 'implements across files · types · migrations',
  },
  {
    step: 3,
    name: 'Review',
    description: 'second-pass model · diff scrutiny · rejects bad patches',
  },
  {
    step: 4,
    name: 'Test',
    description: 'unit + integration · re-runs after every change',
  },
];

export const SUB_AGENTS = [
  { name: 'Explore', description: 'ranks files, traces call graphs, summarises modules' },
  { name: 'Reproduce', description: 'spins up the failing test, captures the trace' },
  { name: 'Spec-reader', description: 'reads the issue + linked discussions + linked PRs' },
  { name: 'Test-runner', description: 'runs the suite incrementally, surfaces flakes' },
  { name: 'Doc-reader', description: 'pulls the relevant section from upstream docs' },
  { name: 'Ref-scout', description: 'finds prior commits that touched the same code path' },
];

// ---------------------------------------------------------------------------
// Repo URL builder
// ---------------------------------------------------------------------------

const REPO_BASE = 'https://github.com/piyushhhxyz/vorflux-swe-benchmarks';

export function getRepoUrl() {
  return REPO_BASE;
}
