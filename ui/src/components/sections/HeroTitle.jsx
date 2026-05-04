/**
 * Hero section — report card / newspaper style headline + two score cards side-by-side.
 */
import { BENCHMARKS, HARNESSES, HARNESS_SCORES, EVAL_DATE } from '../../data/benchmarks';

/** Find the harness with the highest SWE-bench score (computed once at module scope). */
function computeBestHarness() {
  let best = HARNESSES[0];
  let bestScore = -1;
  for (const h of HARNESSES) {
    const score = HARNESS_SCORES['swe-bench'][h.id] ?? 0;
    if (score > bestScore) {
      bestScore = score;
      best = h;
    }
  }
  return best;
}

const BEST_HARNESS = computeBestHarness();

export default function HeroTitle() {
  const bestHarness = BEST_HARNESS;
  const sweBench = BENCHMARKS.find((b) => b.id === 'swe-bench');
  const termBench = BENCHMARKS.find((b) => b.id === 'terminal-bench');
  const sweScore = HARNESS_SCORES['swe-bench'][bestHarness.id];
  const termScore = HARNESS_SCORES['terminal-bench'][bestHarness.id];

  return (
    <section className="section-wrapper pt-6 md:pt-8 pb-8">
      {/* Section label + date line */}
      <div className="pt-1 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-teal-600)]" />
            <span className="text-label text-[var(--color-teal-700)]">COSMOS &middot; MARKSHEET</span>
          </div>
          <span className="text-label text-[var(--color-slate-400)]">{EVAL_DATE}</span>
        </div>
      </div>

      {/* Side-by-side: Headline left, Score cards right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
        {/* Left: Headline + subtitle */}
        <div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
            Vorflux&rsquo;s report card across{' '}
            <span className="text-[var(--color-teal-700)]">industry benchmarks.</span>
          </h1>

          <div className="border-t border-[var(--color-border)] mt-6 pt-4">
            <p className="text-base md:text-lg text-[var(--color-slate-600)] max-w-xl leading-relaxed">
              Two public benchmarks. Four harness recipes. Every run, every patch,
              every trajectory — open in the repo. No selection, no cherry-picks.
            </p>
          </div>
        </div>

        {/* Right: Two score cards stacked */}
        <div className="flex flex-col gap-4 lg:w-[340px]">
          <ScoreHero benchmark={sweBench} score={sweScore} harness={bestHarness} />
          <ScoreHero benchmark={termBench} score={termScore} harness={bestHarness} />
        </div>
      </div>
    </section>
  );
}

function ScoreHero({ benchmark, score, harness }) {
  return (
    <div className="card p-5">
      <p className="text-label text-[var(--color-slate-500)] mb-3">
        {benchmark.shortName.toUpperCase()} &middot; {benchmark.totalTasks} TASKS
      </p>

      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-score">{Math.floor(score)}</span>
          <span className="text-score-unit">%</span>
        </div>

        <div className="text-right">
          <p className="text-label text-[var(--color-slate-400)] mb-1">BEST HARNESS</p>
          <p className="text-sm font-semibold text-[var(--color-slate-800)]">{harness.name}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-[var(--color-slate-500)]">
        {benchmark.description}
      </p>
    </div>
  );
}
