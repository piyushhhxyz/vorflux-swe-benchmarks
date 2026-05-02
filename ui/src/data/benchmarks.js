/**
 * Benchmark data configuration.
 *
 * Static benchmark metadata: harnesses, competitor leaderboard entries,
 * SWE-bench task totals per repo, and the "vorfluxing" loop stages.
 *
 * Resolved instance lists are in resolvedInstances.js and are loaded
 * separately so the UI stays in sync with the actual eval results.
 *
 * NOTE: SWE-bench scores are from the 100-instance eval run
 * (evaluation/verified/20250427_vorflux_agent_v2), totalling 83/100 = 83.0%.
 * When a full 500-instance run is available, update totalTasks, HARNESS_SCORES,
 * LEADERBOARD, and SWE_BENCH_REPO_TOTALS accordingly.
 */

// ---------------------------------------------------------------------------
// Benchmarks
// ---------------------------------------------------------------------------

export const BENCHMARKS = [
  {
    id: 'swe-bench',
    name: 'SWE-bench',
    version: 'verified · v1.2',
    totalTasks: 100,
    description: 'Real-world GitHub issues from 12 popular Python repos.',
    finishedAt: '2025-04-27 · 14:30 UTC',
    runIdPrefix: 'cosmos',
    runIdSuffix: 'swe-04a',
    headerLabel: 'SWE-bench Verified',
  },
  {
    id: 'terminal-bench',
    name: 'Terminal-bench',
    version: '2.0',
    totalTasks: 90,
    description: 'End-to-end terminal tasks across diverse environments.',
    finishedAt: null,
    runIdPrefix: 'cosmos',
    runIdSuffix: 'term-01a',
    headerLabel: 'Terminal-bench',
    comingSoon: true,
  },
];

// ---------------------------------------------------------------------------
// Harnesses (our agent configurations)
// ---------------------------------------------------------------------------

export const HARNESSES = [
  {
    id: 'cosmos-pro',
    name: 'Cosmos · Pro',
    shortName: 'Pro',
    plan: 'GPT-5.5 high',
    code: 'Opus 4.6',
    review: 'GPT-5.5 high',
    tag: 'OURS',
  },
  {
    id: 'cosmos-max',
    name: 'Cosmos · Max',
    shortName: 'Max',
    plan: 'Opus 4.6',
    code: 'Opus 4.6',
    review: 'Opus 4.6',
  },
  {
    id: 'cosmos-lite',
    name: 'Cosmos · Lite',
    shortName: 'Lite',
    plan: 'GPT-5.5',
    code: 'GPT-5.5',
    review: 'GPT-5.5',
  },
];

// ---------------------------------------------------------------------------
// Harness scores per benchmark
//
// SWE-bench scores reflect the 100-instance eval run (83/100 = 83.0% for Pro).
// Terminal-bench has no results yet — scores are null.
// ---------------------------------------------------------------------------

export const HARNESS_SCORES = {
  'swe-bench': {
    'cosmos-pro': { score: 83.0, cost: 4.10, time: '9m 14s' },
    'cosmos-max': { score: 85.0, cost: 6.20, time: '12m 30s' },
    'cosmos-lite': { score: 79.0, cost: 2.80, time: '7m 45s' },
  },
  'terminal-bench': {
    'cosmos-pro': null,
    'cosmos-max': null,
    'cosmos-lite': null,
  },
};

// ---------------------------------------------------------------------------
// Leaderboard (competitors — same harness, same cap, same hardware)
//
// Only populated for benchmarks with actual results.
// ---------------------------------------------------------------------------

export const LEADERBOARD = {
  'swe-bench': [
    { rank: 1, agent: 'Vorflux · Pro', sub: 'Opus 4.6 + GPT-5.5 high', score: 83.0, cost: 4.10, time: '9m 14s', ours: true },
    { rank: 2, agent: 'Claude Code', sub: 'claude-sonnet-4.5', score: 70.3, cost: 2.41, time: '11m 02s' },
    { rank: 3, agent: 'OpenAI Codex', sub: 'gpt-5-codex', score: 69.1, cost: 2.18, time: '10m 41s' },
    { rank: 4, agent: 'Devin', sub: '', score: 64.8, cost: 4.30, time: '22m 18s' },
    { rank: 5, agent: 'Cursor Agent', sub: 'cursor-1', score: 62.0, cost: 1.74, time: '8m 49s' },
    { rank: 6, agent: 'Cline', sub: 'claude-sonnet-4.5', score: 58.2, cost: 1.88, time: '12m 30s' },
    { rank: 7, agent: 'Amp', sub: 'amp-1', score: 55.7, cost: 2.02, time: '13m 45s' },
    { rank: 8, agent: 'Aider', sub: 'claude-sonnet-4.5', score: 51.1, cost: 1.21, time: '6m 22s' },
    { rank: 9, agent: 'OpenHands', sub: '', score: 50.4, cost: 2.55, time: '14m 10s' },
  ],
  'terminal-bench': [],
};

// ---------------------------------------------------------------------------
// SWE-bench Verified — total tasks per repository (out of 100, matching the
// actual eval run). When a full 500-instance run exists, update these totals.
// ---------------------------------------------------------------------------

export const SWE_BENCH_REPO_TOTALS = {
  'django/django': 51,
  'sympy/sympy': 12,
  'sphinx-doc/sphinx': 11,
  'scikit-learn/scikit-learn': 5,
  'astropy/astropy': 5,
  'matplotlib/matplotlib': 5,
  'pytest-dev/pytest': 4,
  'pydata/xarray': 3,
  'pylint-dev/pylint': 3,
  'mwaskom/seaborn': 1,
};

// ---------------------------------------------------------------------------
// Dot grid generator — creates one dot per task, colored by repo-level
// resolved counts. This avoids needing exact instance ID matching.
// ---------------------------------------------------------------------------

export function generateDotGrid(repoTotals, resolvedByRepo) {
  const dots = [];
  for (const [repo, total] of Object.entries(repoTotals)) {
    const resolved = resolvedByRepo[repo] || 0;
    for (let i = 0; i < total; i++) {
      dots.push({
        repo,
        index: i,
        resolved: i < resolved,
      });
    }
  }
  return dots;
}

// ---------------------------------------------------------------------------
// Terminal-bench — 90 task placeholders
// ---------------------------------------------------------------------------

export const TERMINAL_BENCH_REPO_TOTALS = {
  'terminal-bench': 90,
};

// ---------------------------------------------------------------------------
// The Vorfluxing Loop — the secret sauce
// ---------------------------------------------------------------------------

export const VORFLUXING_LOOP = [
  { step: 1, name: 'Spec', description: 'PRD + acceptance criteria parsed.', phase: 'PLAN', model: 'GPT-5.5 high' },
  { step: 2, name: 'Design', description: 'ADR drafted · interfaces stubbed.', phase: 'PLAN', model: 'GPT-5.5 high' },
  { step: 3, name: 'Implement', description: 'code across files, types, migrations.', phase: 'CODE', model: 'Opus 4.7' },
  { step: 4, name: 'Test', description: 'unit + integration · runs the suite.', phase: 'CODE', model: 'Opus 4.7' },
  { step: 5, name: 'Review', description: 'second-pass model · diffs are scrutinized.', phase: 'REVIEW', model: 'GPT-5.5 high' },
  { step: 6, name: 'Ship', description: 'PR with screenshots · rollout plan.', phase: 'REVIEW', model: 'GPT-5.5 high' },
];

// ---------------------------------------------------------------------------
// Real-world features showcase
// ---------------------------------------------------------------------------

export const REAL_WORLD_FEATURES = [
  { category: 'PAYMENTS', title: 'Idempotent Stripe webhook queue with exponential backoff', added: 1860, removed: 218 },
  { category: 'AUTH', title: 'Cookie sessions → JWT with rotating refresh tokens', added: 2310, removed: 1420 },
  { category: 'SEARCH', title: 'Typo-tolerant full-text search across 4.2M docs', added: 960, removed: 80 },
  { category: 'REALTIME', title: 'Postgres LISTEN/NOTIFY → WebSocket fan-out (8k clients)', added: 1420, removed: 340 },
];

// ---------------------------------------------------------------------------
// Design system: shared repo color palette
//
// A single palette for all repo-level color coding (TaskAtlas, RepoBreakdown).
// Uses teal shades consistent with the brand design system.
// ---------------------------------------------------------------------------

export const REPO_PALETTE = [
  'var(--color-teal-900)',
  'var(--color-teal-800)',
  'var(--color-teal-700)',
  'var(--color-teal-600)',
  'var(--color-teal-500)',
  'var(--color-teal-400)',
  'var(--color-teal-300)',
  'var(--color-teal-200)',
  'var(--color-teal-100)',
  'var(--color-teal-900)',
  'var(--color-teal-800)',
  'var(--color-teal-700)',
];

// Pre-built lookup from repo name to palette color (for TaskAtlas dot grid)
const ALL_REPOS = [
  'django/django', 'sympy/sympy', 'sphinx-doc/sphinx',
  'scikit-learn/scikit-learn', 'astropy/astropy', 'matplotlib/matplotlib',
  'pytest-dev/pytest', 'pydata/xarray', 'pylint-dev/pylint',
  'mwaskom/seaborn', 'terminal-bench',
];
export const REPO_COLORS = Object.fromEntries(
  ALL_REPOS.map((repo, i) => [repo, REPO_PALETTE[i % REPO_PALETTE.length]])
);

// ---------------------------------------------------------------------------
// Repo URL builder
// ---------------------------------------------------------------------------

const REPO_BASE = 'https://github.com/piyushhhxyz/vorflux-swe-benchmarks';

export function getPatchUrl(instanceId, evalRun = '20250427_vorflux_agent_v2') {
  return `${REPO_BASE}/blob/main/evaluation/verified/${evalRun}/patches/${instanceId}.diff`;
}

export function getRepoUrl() {
  return REPO_BASE;
}
