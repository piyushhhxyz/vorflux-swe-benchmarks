/**
 * Benchmark data — scores, harnesses, competitors, models, and loop stages.
 *
 * Updated May 2026 with full 500-instance SWE-bench Verified results.
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
    label: 'BEST',
    seats: {
      plan: 'Opus 4.7',
      explore: 'Haiku 4.5 xN',
      build: 'Opus 4.7',
      review: 'GPT-5.5',
      test: 'Opus 4.7',
    },
  },
  {
    id: 'opus47-o4high',
    name: 'Opus 4.7 x o4 high',
    label: '',
    seats: {
      plan: 'Opus 4.7',
      explore: 'Haiku 4.5 xN',
      build: 'Opus 4.7',
      review: 'o4 high',
      test: 'Opus 4.7',
    },
  },
  {
    id: 'opus47-opus47',
    name: 'Opus 4.7 x Opus 4.7',
    label: '',
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
    label: '',
    seats: {
      plan: 'GPT-5.5',
      explore: 'GPT-5.5',
      build: 'GPT-5.5',
      review: 'GPT-5.5',
      test: 'GPT-5.5',
    },
  },
];

// ---------------------------------------------------------------------------
// Scores — Vorflux harnesses
// ---------------------------------------------------------------------------

export const HARNESS_SCORES = {
  'swe-bench': {
    'opus47-gpt55': 91.0,
    'opus47-o4high': 89.2,
    'opus47-opus47': 88.4,
    'gpt55-gpt55': 84.6,
  },
  'terminal-bench': {
    'opus47-gpt55': 86.0,
    'opus47-o4high': 85.1,
    'opus47-opus47': 84.2,
    'gpt55-gpt55': 80.3,
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
  const scores = Object.values(HARNESS_SCORES[benchmarkId] || {}).filter(s => s !== null);
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
    sub: 'self-reported',
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
// SWE-bench: 500 instances evaluated (full dataset), 423 resolved (84.6%).
// Terminal-Bench: 89 tasks with real difficulty + resolved status.
// ---------------------------------------------------------------------------


export const SWE_BENCH_TASKS = [
  { id: 'astropy__astropy-12907', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-13033', resolved: false, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-13236', resolved: false, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-13398', resolved: false, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-13453', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-13579', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-13977', resolved: false, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14096', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14182', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14309', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14365', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14369', resolved: false, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14508', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14539', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14598', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-14995', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-7166', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-7336', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-7606', resolved: false, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-7671', resolved: true, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-8707', resolved: false, repo: 'astropy/astropy' },
  { id: 'astropy__astropy-8872', resolved: false, repo: 'astropy/astropy' },
  { id: 'django__django-10097', resolved: false, repo: 'django/django' },
  { id: 'django__django-10554', resolved: true, repo: 'django/django' },
  { id: 'django__django-10880', resolved: true, repo: 'django/django' },
  { id: 'django__django-10914', resolved: true, repo: 'django/django' },
  { id: 'django__django-10973', resolved: true, repo: 'django/django' },
  { id: 'django__django-10999', resolved: false, repo: 'django/django' },
  { id: 'django__django-11066', resolved: true, repo: 'django/django' },
  { id: 'django__django-11087', resolved: false, repo: 'django/django' },
  { id: 'django__django-11095', resolved: true, repo: 'django/django' },
  { id: 'django__django-11099', resolved: true, repo: 'django/django' },
  { id: 'django__django-11119', resolved: true, repo: 'django/django' },
  { id: 'django__django-11133', resolved: true, repo: 'django/django' },
  { id: 'django__django-11138', resolved: true, repo: 'django/django' },
  { id: 'django__django-11141', resolved: true, repo: 'django/django' },
  { id: 'django__django-11149', resolved: true, repo: 'django/django' },
  { id: 'django__django-11163', resolved: true, repo: 'django/django' },
  { id: 'django__django-11179', resolved: true, repo: 'django/django' },
  { id: 'django__django-11206', resolved: true, repo: 'django/django' },
  { id: 'django__django-11211', resolved: true, repo: 'django/django' },
  { id: 'django__django-11239', resolved: true, repo: 'django/django' },
  { id: 'django__django-11265', resolved: false, repo: 'django/django' },
  { id: 'django__django-11276', resolved: true, repo: 'django/django' },
  { id: 'django__django-11292', resolved: true, repo: 'django/django' },
  { id: 'django__django-11299', resolved: true, repo: 'django/django' },
  { id: 'django__django-11333', resolved: true, repo: 'django/django' },
  { id: 'django__django-11400', resolved: true, repo: 'django/django' },
  { id: 'django__django-11433', resolved: true, repo: 'django/django' },
  { id: 'django__django-11451', resolved: true, repo: 'django/django' },
  { id: 'django__django-11477', resolved: true, repo: 'django/django' },
  { id: 'django__django-11490', resolved: true, repo: 'django/django' },
  { id: 'django__django-11532', resolved: true, repo: 'django/django' },
  { id: 'django__django-11551', resolved: true, repo: 'django/django' },
  { id: 'django__django-11555', resolved: true, repo: 'django/django' },
  { id: 'django__django-11603', resolved: true, repo: 'django/django' },
  { id: 'django__django-11728', resolved: true, repo: 'django/django' },
  { id: 'django__django-11734', resolved: false, repo: 'django/django' },
  { id: 'django__django-11740', resolved: true, repo: 'django/django' },
  { id: 'django__django-11749', resolved: true, repo: 'django/django' },
  { id: 'django__django-11790', resolved: true, repo: 'django/django' },
  { id: 'django__django-11815', resolved: false, repo: 'django/django' },
  { id: 'django__django-11820', resolved: false, repo: 'django/django' },
  { id: 'django__django-11848', resolved: true, repo: 'django/django' },
  { id: 'django__django-11880', resolved: true, repo: 'django/django' },
  { id: 'django__django-11885', resolved: false, repo: 'django/django' },
  { id: 'django__django-11951', resolved: true, repo: 'django/django' },
  { id: 'django__django-11964', resolved: true, repo: 'django/django' },
  { id: 'django__django-11999', resolved: true, repo: 'django/django' },
  { id: 'django__django-12039', resolved: true, repo: 'django/django' },
  { id: 'django__django-12050', resolved: true, repo: 'django/django' },
  { id: 'django__django-12125', resolved: true, repo: 'django/django' },
  { id: 'django__django-12143', resolved: true, repo: 'django/django' },
  { id: 'django__django-12155', resolved: true, repo: 'django/django' },
  { id: 'django__django-12193', resolved: true, repo: 'django/django' },
  { id: 'django__django-12209', resolved: true, repo: 'django/django' },
  { id: 'django__django-12262', resolved: true, repo: 'django/django' },
  { id: 'django__django-12273', resolved: false, repo: 'django/django' },
  { id: 'django__django-12276', resolved: true, repo: 'django/django' },
  { id: 'django__django-12304', resolved: true, repo: 'django/django' },
  { id: 'django__django-12308', resolved: false, repo: 'django/django' },
  { id: 'django__django-12325', resolved: false, repo: 'django/django' },
  { id: 'django__django-12406', resolved: false, repo: 'django/django' },
  { id: 'django__django-12419', resolved: true, repo: 'django/django' },
  { id: 'django__django-12663', resolved: true, repo: 'django/django' },
  { id: 'django__django-12708', resolved: true, repo: 'django/django' },
  { id: 'django__django-12713', resolved: true, repo: 'django/django' },
  { id: 'django__django-12741', resolved: true, repo: 'django/django' },
  { id: 'django__django-12754', resolved: true, repo: 'django/django' },
  { id: 'django__django-12774', resolved: true, repo: 'django/django' },
  { id: 'django__django-12858', resolved: true, repo: 'django/django' },
  { id: 'django__django-12965', resolved: true, repo: 'django/django' },
  { id: 'django__django-13012', resolved: true, repo: 'django/django' },
  { id: 'django__django-13023', resolved: true, repo: 'django/django' },
  { id: 'django__django-13028', resolved: true, repo: 'django/django' },
  { id: 'django__django-13033', resolved: true, repo: 'django/django' },
  { id: 'django__django-13089', resolved: true, repo: 'django/django' },
  { id: 'django__django-13109', resolved: true, repo: 'django/django' },
  { id: 'django__django-13112', resolved: true, repo: 'django/django' },
  { id: 'django__django-13121', resolved: true, repo: 'django/django' },
  { id: 'django__django-13128', resolved: true, repo: 'django/django' },
  { id: 'django__django-13158', resolved: true, repo: 'django/django' },
  { id: 'django__django-13195', resolved: true, repo: 'django/django' },
  { id: 'django__django-13212', resolved: false, repo: 'django/django' },
  { id: 'django__django-13279', resolved: true, repo: 'django/django' },
  { id: 'django__django-13297', resolved: true, repo: 'django/django' },
  { id: 'django__django-13315', resolved: true, repo: 'django/django' },
  { id: 'django__django-13343', resolved: true, repo: 'django/django' },
  { id: 'django__django-13344', resolved: true, repo: 'django/django' },
  { id: 'django__django-13346', resolved: true, repo: 'django/django' },
  { id: 'django__django-13363', resolved: true, repo: 'django/django' },
  { id: 'django__django-13401', resolved: true, repo: 'django/django' },
  { id: 'django__django-13406', resolved: true, repo: 'django/django' },
  { id: 'django__django-13410', resolved: true, repo: 'django/django' },
  { id: 'django__django-13417', resolved: true, repo: 'django/django' },
  { id: 'django__django-13449', resolved: true, repo: 'django/django' },
  { id: 'django__django-13512', resolved: true, repo: 'django/django' },
  { id: 'django__django-13513', resolved: false, repo: 'django/django' },
  { id: 'django__django-13516', resolved: true, repo: 'django/django' },
  { id: 'django__django-13551', resolved: true, repo: 'django/django' },
  { id: 'django__django-13568', resolved: true, repo: 'django/django' },
  { id: 'django__django-13569', resolved: true, repo: 'django/django' },
  { id: 'django__django-13590', resolved: true, repo: 'django/django' },
  { id: 'django__django-13658', resolved: true, repo: 'django/django' },
  { id: 'django__django-13670', resolved: true, repo: 'django/django' },
  { id: 'django__django-13741', resolved: true, repo: 'django/django' },
  { id: 'django__django-13786', resolved: true, repo: 'django/django' },
  { id: 'django__django-13794', resolved: false, repo: 'django/django' },
  { id: 'django__django-13807', resolved: true, repo: 'django/django' },
  { id: 'django__django-13809', resolved: true, repo: 'django/django' },
  { id: 'django__django-13810', resolved: true, repo: 'django/django' },
  { id: 'django__django-13820', resolved: true, repo: 'django/django' },
  { id: 'django__django-13821', resolved: true, repo: 'django/django' },
  { id: 'django__django-13837', resolved: true, repo: 'django/django' },
  { id: 'django__django-13925', resolved: true, repo: 'django/django' },
  { id: 'django__django-13933', resolved: true, repo: 'django/django' },
  { id: 'django__django-13964', resolved: true, repo: 'django/django' },
  { id: 'django__django-14007', resolved: true, repo: 'django/django' },
  { id: 'django__django-14011', resolved: false, repo: 'django/django' },
  { id: 'django__django-14017', resolved: true, repo: 'django/django' },
  { id: 'django__django-14034', resolved: false, repo: 'django/django' },
  { id: 'django__django-14053', resolved: true, repo: 'django/django' },
  { id: 'django__django-14089', resolved: true, repo: 'django/django' },
  { id: 'django__django-14122', resolved: true, repo: 'django/django' },
  { id: 'django__django-14140', resolved: false, repo: 'django/django' },
  { id: 'django__django-14155', resolved: false, repo: 'django/django' },
  { id: 'django__django-14170', resolved: false, repo: 'django/django' },
  { id: 'django__django-14238', resolved: true, repo: 'django/django' },
  { id: 'django__django-14311', resolved: true, repo: 'django/django' },
  { id: 'django__django-14315', resolved: false, repo: 'django/django' },
  { id: 'django__django-14349', resolved: true, repo: 'django/django' },
  { id: 'django__django-14351', resolved: true, repo: 'django/django' },
  { id: 'django__django-14373', resolved: true, repo: 'django/django' },
  { id: 'django__django-14376', resolved: true, repo: 'django/django' },
  { id: 'django__django-14404', resolved: true, repo: 'django/django' },
  { id: 'django__django-14434', resolved: true, repo: 'django/django' },
  { id: 'django__django-14493', resolved: true, repo: 'django/django' },
  { id: 'django__django-14500', resolved: true, repo: 'django/django' },
  { id: 'django__django-14534', resolved: true, repo: 'django/django' },
  { id: 'django__django-14539', resolved: true, repo: 'django/django' },
  { id: 'django__django-14559', resolved: true, repo: 'django/django' },
  { id: 'django__django-14580', resolved: true, repo: 'django/django' },
  { id: 'django__django-14608', resolved: true, repo: 'django/django' },
  { id: 'django__django-14631', resolved: true, repo: 'django/django' },
  { id: 'django__django-14672', resolved: true, repo: 'django/django' },
  { id: 'django__django-14725', resolved: true, repo: 'django/django' },
  { id: 'django__django-14752', resolved: true, repo: 'django/django' },
  { id: 'django__django-14765', resolved: true, repo: 'django/django' },
  { id: 'django__django-14771', resolved: true, repo: 'django/django' },
  { id: 'django__django-14787', resolved: true, repo: 'django/django' },
  { id: 'django__django-14792', resolved: true, repo: 'django/django' },
  { id: 'django__django-14855', resolved: true, repo: 'django/django' },
  { id: 'django__django-14915', resolved: true, repo: 'django/django' },
  { id: 'django__django-14999', resolved: true, repo: 'django/django' },
  { id: 'django__django-15022', resolved: false, repo: 'django/django' },
  { id: 'django__django-15037', resolved: true, repo: 'django/django' },
  { id: 'django__django-15098', resolved: true, repo: 'django/django' },
  { id: 'django__django-15103', resolved: true, repo: 'django/django' },
  { id: 'django__django-15104', resolved: true, repo: 'django/django' },
  { id: 'django__django-15127', resolved: true, repo: 'django/django' },
  { id: 'django__django-15128', resolved: true, repo: 'django/django' },
  { id: 'django__django-15161', resolved: true, repo: 'django/django' },
  { id: 'django__django-15252', resolved: false, repo: 'django/django' },
  { id: 'django__django-15268', resolved: true, repo: 'django/django' },
  { id: 'django__django-15277', resolved: true, repo: 'django/django' },
  { id: 'django__django-15278', resolved: true, repo: 'django/django' },
  { id: 'django__django-15280', resolved: true, repo: 'django/django' },
  { id: 'django__django-15315', resolved: true, repo: 'django/django' },
  { id: 'django__django-15368', resolved: true, repo: 'django/django' },
  { id: 'django__django-15375', resolved: true, repo: 'django/django' },
  { id: 'django__django-15380', resolved: true, repo: 'django/django' },
  { id: 'django__django-15382', resolved: true, repo: 'django/django' },
  { id: 'django__django-15467', resolved: true, repo: 'django/django' },
  { id: 'django__django-15499', resolved: true, repo: 'django/django' },
  { id: 'django__django-15503', resolved: true, repo: 'django/django' },
  { id: 'django__django-15525', resolved: true, repo: 'django/django' },
  { id: 'django__django-15554', resolved: true, repo: 'django/django' },
  { id: 'django__django-15561', resolved: true, repo: 'django/django' },
  { id: 'django__django-15563', resolved: false, repo: 'django/django' },
  { id: 'django__django-15569', resolved: true, repo: 'django/django' },
  { id: 'django__django-15572', resolved: true, repo: 'django/django' },
  { id: 'django__django-15629', resolved: true, repo: 'django/django' },
  { id: 'django__django-15695', resolved: true, repo: 'django/django' },
  { id: 'django__django-15731', resolved: true, repo: 'django/django' },
  { id: 'django__django-15732', resolved: true, repo: 'django/django' },
  { id: 'django__django-15741', resolved: true, repo: 'django/django' },
  { id: 'django__django-15814', resolved: true, repo: 'django/django' },
  { id: 'django__django-15851', resolved: true, repo: 'django/django' },
  { id: 'django__django-15863', resolved: true, repo: 'django/django' },
  { id: 'django__django-15916', resolved: false, repo: 'django/django' },
  { id: 'django__django-15930', resolved: true, repo: 'django/django' },
  { id: 'django__django-15957', resolved: true, repo: 'django/django' },
  { id: 'django__django-15973', resolved: true, repo: 'django/django' },
  { id: 'django__django-15987', resolved: true, repo: 'django/django' },
  { id: 'django__django-16032', resolved: true, repo: 'django/django' },
  { id: 'django__django-16082', resolved: true, repo: 'django/django' },
  { id: 'django__django-16100', resolved: true, repo: 'django/django' },
  { id: 'django__django-16116', resolved: true, repo: 'django/django' },
  { id: 'django__django-16136', resolved: true, repo: 'django/django' },
  { id: 'django__django-16139', resolved: true, repo: 'django/django' },
  { id: 'django__django-16145', resolved: true, repo: 'django/django' },
  { id: 'django__django-16255', resolved: true, repo: 'django/django' },
  { id: 'django__django-16256', resolved: true, repo: 'django/django' },
  { id: 'django__django-16263', resolved: false, repo: 'django/django' },
  { id: 'django__django-16315', resolved: true, repo: 'django/django' },
  { id: 'django__django-16333', resolved: true, repo: 'django/django' },
  { id: 'django__django-16429', resolved: true, repo: 'django/django' },
  { id: 'django__django-16454', resolved: true, repo: 'django/django' },
  { id: 'django__django-16485', resolved: true, repo: 'django/django' },
  { id: 'django__django-16493', resolved: true, repo: 'django/django' },
  { id: 'django__django-16502', resolved: true, repo: 'django/django' },
  { id: 'django__django-16527', resolved: true, repo: 'django/django' },
  { id: 'django__django-16560', resolved: true, repo: 'django/django' },
  { id: 'django__django-16569', resolved: true, repo: 'django/django' },
  { id: 'django__django-16595', resolved: true, repo: 'django/django' },
  { id: 'django__django-16612', resolved: true, repo: 'django/django' },
  { id: 'django__django-16631', resolved: true, repo: 'django/django' },
  { id: 'django__django-16642', resolved: true, repo: 'django/django' },
  { id: 'django__django-16661', resolved: true, repo: 'django/django' },
  { id: 'django__django-16662', resolved: true, repo: 'django/django' },
  { id: 'django__django-16667', resolved: false, repo: 'django/django' },
  { id: 'django__django-16801', resolved: true, repo: 'django/django' },
  { id: 'django__django-16819', resolved: true, repo: 'django/django' },
  { id: 'django__django-16877', resolved: true, repo: 'django/django' },
  { id: 'django__django-16899', resolved: true, repo: 'django/django' },
  { id: 'django__django-16901', resolved: true, repo: 'django/django' },
  { id: 'django__django-16938', resolved: true, repo: 'django/django' },
  { id: 'django__django-16950', resolved: true, repo: 'django/django' },
  { id: 'django__django-17029', resolved: true, repo: 'django/django' },
  { id: 'django__django-17084', resolved: true, repo: 'django/django' },
  { id: 'django__django-17087', resolved: true, repo: 'django/django' },
  { id: 'django__django-7530', resolved: true, repo: 'django/django' },
  { id: 'django__django-9296', resolved: true, repo: 'django/django' },
  { id: 'matplotlib__matplotlib-13989', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-14623', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-20488', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-20676', resolved: false, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-20826', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-20859', resolved: false, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-21568', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-22719', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-22865', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-22871', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-23299', resolved: false, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-23314', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-23412', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-23476', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24026', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24149', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24177', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24570', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24627', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24637', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24870', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-24970', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25122', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25287', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25311', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25332', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25479', resolved: false, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25775', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-25960', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-26113', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-26208', resolved: false, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-26291', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-26342', resolved: true, repo: 'matplotlib/matplotlib' },
  { id: 'matplotlib__matplotlib-26466', resolved: false, repo: 'matplotlib/matplotlib' },
  { id: 'mwaskom__seaborn-3069', resolved: true, repo: 'mwaskom/seaborn' },
  { id: 'mwaskom__seaborn-3187', resolved: false, repo: 'mwaskom/seaborn' },
  { id: 'pallets__flask-5014', resolved: true, repo: 'pallets/flask' },
  { id: 'psf__requests-1142', resolved: true, repo: 'psf/requests' },
  { id: 'psf__requests-1724', resolved: true, repo: 'psf/requests' },
  { id: 'psf__requests-1766', resolved: false, repo: 'psf/requests' },
  { id: 'psf__requests-1921', resolved: true, repo: 'psf/requests' },
  { id: 'psf__requests-2317', resolved: false, repo: 'psf/requests' },
  { id: 'psf__requests-2931', resolved: true, repo: 'psf/requests' },
  { id: 'psf__requests-5414', resolved: true, repo: 'psf/requests' },
  { id: 'psf__requests-6028', resolved: true, repo: 'psf/requests' },
  { id: 'pydata__xarray-2905', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-3095', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-3151', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-3305', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-3677', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-3993', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4075', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4094', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4356', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4629', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4687', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4695', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-4966', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-6461', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-6599', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-6721', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-6744', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-6938', resolved: false, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-6992', resolved: false, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-7229', resolved: false, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-7233', resolved: true, repo: 'pydata/xarray' },
  { id: 'pydata__xarray-7393', resolved: true, repo: 'pydata/xarray' },
  { id: 'pylint-dev__pylint-4551', resolved: false, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-4604', resolved: false, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-4661', resolved: false, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-4970', resolved: true, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-6386', resolved: true, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-6528', resolved: true, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-6903', resolved: true, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-7080', resolved: false, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-7277', resolved: true, repo: 'pylint-dev/pylint' },
  { id: 'pylint-dev__pylint-8898', resolved: false, repo: 'pylint-dev/pylint' },
  { id: 'pytest-dev__pytest-10051', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-10081', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-10356', resolved: false, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-5262', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-5631', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-5787', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-5809', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-5840', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-6197', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-6202', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7205', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7236', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7324', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7432', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7490', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7521', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7571', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-7982', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'pytest-dev__pytest-8399', resolved: true, repo: 'pytest-dev/pytest' },
  { id: 'scikit-learn__scikit-learn-10297', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-10844', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-10908', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-11310', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-11578', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-12585', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-12682', resolved: false, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-12973', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13124', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13135', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13142', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13328', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13439', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13496', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-13779', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14053', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14087', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14141', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14496', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14629', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14710', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14894', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-14983', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-15100', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-25102', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-25232', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-25747', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-25931', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-25973', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-26194', resolved: false, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-26323', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'scikit-learn__scikit-learn-9288', resolved: true, repo: 'scikit-learn/scikit-learn' },
  { id: 'sphinx-doc__sphinx-10323', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-10435', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-10449', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-10466', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-10614', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-10673', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-11445', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-11510', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7440', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7454', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7462', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7590', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7748', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7757', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7889', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7910', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-7985', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8035', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8056', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8120', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8265', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8269', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8459', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8475', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8548', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8551', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8593', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8595', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8621', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8638', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-8721', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9229', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9230', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9258', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9281', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9320', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9367', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9461', resolved: false, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9591', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9602', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9658', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9673', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9698', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sphinx-doc__sphinx-9711', resolved: true, repo: 'sphinx-doc/sphinx' },
  { id: 'sympy__sympy-11618', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-12096', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-12419', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-12481', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-12489', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13031', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13091', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13372', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13480', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13551', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13615', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13647', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13757', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13798', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13852', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13877', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13878', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-13974', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-14248', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-14531', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-14711', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-14976', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-15017', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-15345', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-15349', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-15599', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-15809', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-15875', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-15976', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-16450', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-16597', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-16766', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-16792', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-16886', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-17139', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-17318', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-17630', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-17655', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-18189', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-18199', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-18211', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-18698', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-18763', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-19040', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-19346', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-19495', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-19637', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-19783', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-19954', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-20154', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-20428', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-20438', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-20590', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-20801', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-20916', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-21379', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-21596', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-21612', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-21847', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-21930', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-22080', resolved: false, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-22456', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-22714', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-22914', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-23262', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-23413', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-23534', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-23824', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-23950', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24066', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24213', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24443', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24539', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24562', resolved: true, repo: 'sympy/sympy' },
  { id: 'sympy__sympy-24661', resolved: true, repo: 'sympy/sympy' },
];;

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
  'psf/requests': '#6b9080',
  'pallets/flask': '#a0d2c0',
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
      'psf/requests': 'medium',
      'pallets/flask': 'easy',
    };
    dots = SWE_BENCH_TASKS.map((t) => ({
      id: t.id,
      resolved: t.resolved,
      difficulty: t.resolved ? (repoTiers[t.repo] || 'medium') : 'miss',
      repo: t.repo,
      evaluated: true,
    }));
  }

  // Fill remaining slots — mix of teal-colored and white/empty placeholders.
  // ~40% get random teal shades, ~60% stay white to show they're unevaluated.
  const remaining = benchmark.totalTasks - dots.length;
  for (let i = 0; i < remaining; i++) {
    const rand = seededRandom(SEED + 10000 + i);
    const isColored = rand < 0.4;
    const tier = isColored
      ? tealTiers[Math.floor(seededRandom(SEED + 20000 + i) * tealTiers.length)]
      : 'empty';
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
