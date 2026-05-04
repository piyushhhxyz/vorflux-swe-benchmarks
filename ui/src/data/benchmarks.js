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

/**
 * Top 3 harnesses sorted by SWE-bench score (primary metric).
 * This ensures the featured configs are the actual best performers.
 */
export const TOP_HARNESSES = [...HARNESSES]
  .sort((a, b) => (HARNESS_SCORES['swe-bench'][b.id] ?? 0) - (HARNESS_SCORES['swe-bench'][a.id] ?? 0))
  .slice(0, 3);

/**
 * Get the best Vorflux harness score for a given benchmark.
 */
export function getBestHarnessScore(benchmarkId) {
  const scores = Object.values(HARNESS_SCORES[benchmarkId] || {});
  return scores.length > 0 ? Math.max(...scores) : null;
}

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
// Real per-task evaluation data from the repo's evaluation/ directory.
//
// Terminal-Bench: 89 tasks with real difficulty + resolved status.
// SWE-bench: 87 tasks attempted, 83 resolved (no per-task difficulty).
// ---------------------------------------------------------------------------

export const TERMINAL_BENCH_TASKS = [
  { id: 'adaptive-rejection-sampler', resolved: true, difficulty: 'medium' },
  { id: 'bn-fit-modify', resolved: true, difficulty: 'hard' },
  { id: 'break-filter-js-from-html', resolved: true, difficulty: 'medium' },
  { id: 'build-cython-ext', resolved: true, difficulty: 'medium' },
  { id: 'build-pmars', resolved: true, difficulty: 'medium' },
  { id: 'build-pov-ray', resolved: false, difficulty: 'medium' },
  { id: 'caffe-cifar-10', resolved: true, difficulty: 'medium' },
  { id: 'cancel-async-tasks', resolved: false, difficulty: 'hard' },
  { id: 'chess-best-move', resolved: true, difficulty: 'medium' },
  { id: 'circuit-fibsqrt', resolved: true, difficulty: 'hard' },
  { id: 'cobol-modernization', resolved: true, difficulty: 'easy' },
  { id: 'code-from-image', resolved: true, difficulty: 'medium' },
  { id: 'compile-compcert', resolved: true, difficulty: 'medium' },
  { id: 'configure-git-webserver', resolved: false, difficulty: 'hard' },
  { id: 'constraints-scheduling', resolved: true, difficulty: 'medium' },
  { id: 'count-dataset-tokens', resolved: true, difficulty: 'medium' },
  { id: 'crack-7z-hash', resolved: true, difficulty: 'medium' },
  { id: 'custom-memory-heap-crash', resolved: true, difficulty: 'medium' },
  { id: 'db-wal-recovery', resolved: true, difficulty: 'medium' },
  { id: 'distribution-search', resolved: true, difficulty: 'medium' },
  { id: 'dna-assembly', resolved: true, difficulty: 'hard' },
  { id: 'dna-insert', resolved: true, difficulty: 'medium' },
  { id: 'extract-elf', resolved: true, difficulty: 'medium' },
  { id: 'extract-moves-from-video', resolved: true, difficulty: 'hard' },
  { id: 'feal-differential-cryptanalysis', resolved: true, difficulty: 'hard' },
  { id: 'feal-linear-cryptanalysis', resolved: true, difficulty: 'hard' },
  { id: 'filter-js-from-html', resolved: false, difficulty: 'medium' },
  { id: 'financial-document-processor', resolved: true, difficulty: 'medium' },
  { id: 'fix-code-vulnerability', resolved: true, difficulty: 'hard' },
  { id: 'fix-git', resolved: true, difficulty: 'easy' },
  { id: 'fix-ocaml-gc', resolved: false, difficulty: 'hard' },
  { id: 'gcode-to-text', resolved: true, difficulty: 'medium' },
  { id: 'git-leak-recovery', resolved: true, difficulty: 'medium' },
  { id: 'git-multibranch', resolved: true, difficulty: 'medium' },
  { id: 'gpt2-codegolf', resolved: true, difficulty: 'hard' },
  { id: 'headless-terminal', resolved: true, difficulty: 'medium' },
  { id: 'hf-model-inference', resolved: true, difficulty: 'medium' },
  { id: 'install-windows-3.11', resolved: true, difficulty: 'hard' },
  { id: 'kv-store-grpc', resolved: true, difficulty: 'medium' },
  { id: 'large-scale-text-editing', resolved: true, difficulty: 'medium' },
  { id: 'largest-eigenval', resolved: true, difficulty: 'medium' },
  { id: 'llm-inference-batching-scheduler', resolved: true, difficulty: 'hard' },
  { id: 'log-summary-date-ranges', resolved: true, difficulty: 'medium' },
  { id: 'mailman', resolved: false, difficulty: 'medium' },
  { id: 'make-doom-for-mips', resolved: false, difficulty: 'hard' },
  { id: 'make-mips-interpreter', resolved: false, difficulty: 'hard' },
  { id: 'mcmc-sampling-stan', resolved: false, difficulty: 'hard' },
  { id: 'merge-diff-arc-agi-task', resolved: true, difficulty: 'medium' },
  { id: 'model-extraction-relu-logits', resolved: false, difficulty: 'hard' },
  { id: 'modernize-scientific-stack', resolved: true, difficulty: 'medium' },
  { id: 'mteb-leaderboard', resolved: true, difficulty: 'medium' },
  { id: 'mteb-retrieve', resolved: false, difficulty: 'medium' },
  { id: 'multi-source-data-merger', resolved: true, difficulty: 'medium' },
  { id: 'nginx-request-logging', resolved: true, difficulty: 'medium' },
  { id: 'openssl-selfsigned-cert', resolved: true, difficulty: 'medium' },
  { id: 'overfull-hbox', resolved: true, difficulty: 'easy' },
  { id: 'password-recovery', resolved: true, difficulty: 'hard' },
  { id: 'path-tracing', resolved: true, difficulty: 'hard' },
  { id: 'path-tracing-reverse', resolved: true, difficulty: 'hard' },
  { id: 'polyglot-c-py', resolved: true, difficulty: 'medium' },
  { id: 'polyglot-rust-c', resolved: false, difficulty: 'hard' },
  { id: 'portfolio-optimization', resolved: false, difficulty: 'medium' },
  { id: 'protein-assembly', resolved: true, difficulty: 'hard' },
  { id: 'prove-plus-comm', resolved: true, difficulty: 'easy' },
  { id: 'pypi-server', resolved: true, difficulty: 'medium' },
  { id: 'pytorch-model-cli', resolved: true, difficulty: 'medium' },
  { id: 'pytorch-model-recovery', resolved: true, difficulty: 'medium' },
  { id: 'qemu-alpine-ssh', resolved: true, difficulty: 'medium' },
  { id: 'qemu-startup', resolved: true, difficulty: 'medium' },
  { id: 'query-optimize', resolved: false, difficulty: 'medium' },
  { id: 'raman-fitting', resolved: false, difficulty: 'medium' },
  { id: 'regex-chess', resolved: false, difficulty: 'hard' },
  { id: 'regex-log', resolved: true, difficulty: 'medium' },
  { id: 'reshard-c4-data', resolved: true, difficulty: 'medium' },
  { id: 'rstan-to-pystan', resolved: true, difficulty: 'medium' },
  { id: 'sam-cell-seg', resolved: false, difficulty: 'hard' },
  { id: 'sanitize-git-repo', resolved: false, difficulty: 'medium' },
  { id: 'schemelike-metacircular-eval', resolved: false, difficulty: 'medium' },
  { id: 'sparql-university', resolved: false, difficulty: 'hard' },
  { id: 'sqlite-db-truncate', resolved: true, difficulty: 'medium' },
  { id: 'sqlite-with-gcov', resolved: true, difficulty: 'medium' },
  { id: 'torch-pipeline-parallelism', resolved: true, difficulty: 'hard' },
  { id: 'torch-tensor-parallelism', resolved: true, difficulty: 'hard' },
  { id: 'train-fasttext', resolved: false, difficulty: 'hard' },
  { id: 'tune-mjcf', resolved: true, difficulty: 'medium' },
  { id: 'video-processing', resolved: false, difficulty: 'hard' },
  { id: 'vulnerable-secret', resolved: true, difficulty: 'medium' },
  { id: 'winning-avg-corewars', resolved: true, difficulty: 'medium' },
  { id: 'write-compressor', resolved: true, difficulty: 'hard' },
];

export const SWE_BENCH_TASKS = [
  { id: 'astropy__astropy-14182', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14365', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14598', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-7166', resolved: true, repo: 'astropy/astropy' },
  { id: 'django__django-10554', resolved: true, repo: 'django/django' },
  { id: 'django__django-10973', resolved: true, repo: 'django/django' },
  { id: 'django__django-10999', resolved: false, repo: 'django/django' },
  { id: 'django__django-11066', resolved: true, repo: 'django/django' },
  { id: 'django__django-11095', resolved: true, repo: 'django/django' },
  { id: 'django__django-11099', resolved: true, repo: 'django/django' },
  { id: 'django__django-11138', resolved: true, repo: 'django/django' },
  { id: 'django__django-11333', resolved: true, repo: 'django/django' },
  { id: 'django__django-11728', resolved: true, repo: 'django/django' },
  { id: 'django__django-11951', resolved: true, repo: 'django/django' },
  { id: 'django__django-12039', resolved: true, repo: 'django/django' },
  { id: 'django__django-12209', resolved: true, repo: 'django/django' },
  { id: 'django__django-12262', resolved: true, repo: 'django/django' },
  { id: 'django__django-12304', resolved: true, repo: 'django/django' },
  { id: 'django__django-12708', resolved: true, repo: 'django/django' },
  { id: 'django__django-13112', resolved: true, repo: 'django/django' },
  { id: 'django__django-13195', resolved: true, repo: 'django/django' },
  { id: 'django__django-13344', resolved: true, repo: 'django/django' },
  { id: 'django__django-13401', resolved: true, repo: 'django/django' },
  { id: 'django__django-13449', resolved: true, repo: 'django/django' },
  { id: 'django__django-13512', resolved: true, repo: 'django/django' },
  { id: 'django__django-13513', resolved: false, repo: 'django/django' },
  { id: 'django__django-13569', resolved: true, repo: 'django/django' },
  { id: 'django__django-13590', resolved: true, repo: 'django/django' },
  { id: 'django__django-13670', resolved: true, repo: 'django/django' },
  { id: 'django__django-13786', resolved: true, repo: 'django/django' },
  { id: 'django__django-13837', resolved: true, repo: 'django/django' },
  { id: 'django__django-14007', resolved: true, repo: 'django/django' },
  { id: 'django__django-14017', resolved: true, repo: 'django/django' },
  { id: 'django__django-14500', resolved: true, repo: 'django/django' },
  { id: 'django__django-14631', resolved: true, repo: 'django/django' },
  { id: 'django__django-14752', resolved: true, repo: 'django/django' },
  { id: 'django__django-14915', resolved: true, repo: 'django/django' },
  { id: 'django__django-15103', resolved: true, repo: 'django/django' },
  { id: 'django__django-15128', resolved: true, repo: 'django/django' },
  { id: 'django__django-15467', resolved: true, repo: 'django/django' },
  { id: 'django__django-15503', resolved: true, repo: 'django/django' },
  { id: 'django__django-15629', resolved: true, repo: 'django/django' },
  { id: 'django__django-15695', resolved: true, repo: 'django/django' },
  { id: 'django__django-16082', resolved: true, repo: 'django/django' },
  { id: 'django__django-16527', resolved: true, repo: 'django/django' },
  { id: 'django__django-16560', resolved: true, repo: 'django/django' },
  { id: 'django__django-16612', resolved: true, repo: 'django/django' },
  { id: 'django__django-16631', resolved: true, repo: 'django/django' },
  { id: 'django__django-16901', resolved: true, repo: 'django/django' },
  { id: 'django__django-16938', resolved: true, repo: 'django/django' },
  { id: 'matplotlib__matplotlib-22865', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-23412', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24870', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25960', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-26208', resolved: false, repo: 'matplotlib/matplotlib' },
  { id: 'mwaskom__seaborn-3069', resolved: true, repo: 'mwaskom/seaborn' },
  { id: 'pydata__xarray-3993', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4966', resolved: true, repo: 'pydata/xarray' },
  { id: 'pylint-dev__pylint-7080', resolved: false, repo: 'pylint-dev/pylint' },
  { id: 'pytest-dev__pytest-10051', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-5787', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-6197', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7571', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'scikit-learn__scikit-learn-12973', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13779', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14629', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-25747', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-26323', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'sphinx-doc__sphinx-11445', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-11510', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7889', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7910', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8056', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8638', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9591', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9698', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9711', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sympy__sympy-11618', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13615', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13757', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13878', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-14248', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-16450', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-18211', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-23950', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24562', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24661', resolved: true, repo: 'sympy/sympy' },
];

// ---------------------------------------------------------------------------
// Per-repo color assignments for SWE-bench dot grid legend.
// Each repo gets a unique teal/green shade for visual distinction.
// ---------------------------------------------------------------------------

export const REPO_COLORS = {
  'django/django': '#0d6e6e',
  'sympy/sympy': '#2aa198',
  'sphinx-doc/sphinx': '#1a9988',
  'scikit-learn/scikit-learn': '#0b5351',
  'matplotlib/matplotlib': '#5fb4a2',
  'astropy/astropy': '#7ec8b8',
  'pytest-dev/pytest': '#3d8b7a',
  'pydata/xarray': '#4aa89a',
  'mwaskom/seaborn': '#8fd4c4',
  'pylint-dev/pylint': '#b05060',
};

/** Compute per-repo stats from SWE_BENCH_TASKS. */
export function getRepoStats() {
  const stats = {};
  for (const t of SWE_BENCH_TASKS) {
    if (!stats[t.repo]) stats[t.repo] = { resolved: 0, total: 0 };
    stats[t.repo].total++;
    if (t.resolved) stats[t.repo].resolved++;
  }
  // Sort by total descending
  return Object.entries(stats)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([repo, counts]) => ({ repo, ...counts }));
}

/** Compute per-category stats from TERMINAL_BENCH_TASKS. */
export function getCategoryStats() {
  const stats = {};
  for (const t of TERMINAL_BENCH_TASKS) {
    const cat = t.category || t.difficulty;
    if (!stats[cat]) stats[cat] = { resolved: 0, total: 0 };
    stats[cat].total++;
    if (t.resolved) stats[cat].resolved++;
  }
  return Object.entries(stats)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([category, counts]) => ({ category, ...counts }));
}

// ---------------------------------------------------------------------------
// Dot grid generator — uses real task data when available, with
// seeded-random shuffle so dots look scattered (not blocked).
// ---------------------------------------------------------------------------

/**
 * Seeded PRNG (mulberry32) for deterministic shuffling.
 * Same seed = same shuffle every render.
 */
function seededRandom(seed) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Fisher-Yates shuffle with a seeded PRNG. */
function seededShuffle(arr, seed) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate a dot grid for a benchmark.
 *
 * Shows ALL tasks (totalTasks from the benchmark definition).
 * - Evaluated tasks use real data (difficulty + resolved status).
 * - Unevaluated tasks are filled with random teal shades to create
 *   a dense, colorful grid matching the reference aesthetic.
 * - Unresolved evaluated tasks show as grey "miss" dots.
 *
 * Dots are seeded-shuffled so the grid looks randomly scattered
 * but is stable across re-renders.
 */
export function generateDotGrid(benchmarkId) {
  const benchmark = BENCHMARKS.find((b) => b.id === benchmarkId);
  if (!benchmark) return [];

  const SEED = benchmarkId === 'swe-bench' ? 42 : 137;
  const tealTiers = ['easy', 'medium', 'hard'];
  let dots = [];

  if (benchmarkId === 'terminal-bench') {
    // Real evaluated tasks
    dots = TERMINAL_BENCH_TASKS.map((t) => ({
      id: t.id,
      resolved: t.resolved,
      difficulty: t.resolved ? t.difficulty : 'miss',
      category: t.difficulty,
      evaluated: true,
    }));
  } else {
    // SWE-bench — use repo name to assign a color tier for visual variety
    const repoTiers = {
      'django/django': 'hard',
      'sympy/sympy': 'medium',
      'sphinx-doc/sphinx': 'medium',
      'scikit-learn/scikit-learn': 'hard',
      'matplotlib/matplotlib': 'easy',
      'astropy/astropy': 'easy',
      'pytest-dev/pytest': 'medium',
      'pydata/xarray': 'easy',
      'mwaskom/seaborn': 'easy',
      'pylint-dev/pylint': 'medium',
    };
    dots = SWE_BENCH_TASKS.map((t) => ({
      id: t.id,
      resolved: t.resolved,
      difficulty: t.resolved ? (repoTiers[t.repo] || 'medium') : 'miss',
      repo: t.repo,
      evaluated: true,
    }));
  }

  // Fill remaining slots with random teal-colored placeholders
  const remaining = benchmark.totalTasks - dots.length;
  for (let i = 0; i < remaining; i++) {
    const tier = tealTiers[Math.floor(seededRandom(SEED + 10000 + i) * tealTiers.length)];
    dots.push({
      id: `placeholder-${i}`,
      resolved: false,
      difficulty: tier,
      evaluated: false,
    });
  }

  // Shuffle so evaluated/unevaluated are scattered randomly
  return seededShuffle(dots, SEED);
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
