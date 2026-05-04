/**
 * Top 3 Harnesses — featured harness configurations with their benchmark scores.
 *
 * Shows the best-performing model combinations (code model + reviewer model)
 * with scores across all benchmarks. Harnesses are customizable recipes.
 */
import { TOP_HARNESSES, HARNESS_SCORES, BENCHMARKS } from '../../data/benchmarks';
import SectionHeader from './SectionHeader';
import BestBadge from './BestBadge';

export default function TopHarnesses() {
  return (
    <section className="py-10 md:py-14">
      <div className="section-wrapper">
        <SectionHeader label="SECTION 06" />
        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl tracking-tight mb-3">
          Top harness configurations.
        </h2>
        <p className="text-[var(--color-slate-500)] max-w-2xl mb-10 text-sm md:text-base">
          A harness is a recipe — which model plans, which writes code, which
          reviews the diff. Every seat is configurable. These are our top 3
          performers. Build your own or use ours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_HARNESSES.map((h, i) => {
            const rank = i + 1;
            return (
              <div
                key={h.id}
                className={`card p-6 md:p-8 relative ${
                  i === 0 ? 'border-2 border-[var(--color-teal-300)]' : ''
                }`}
              >
                {/* Rank badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-label text-[var(--color-teal-700)]">
                    #{rank} &middot; {h.label}
                  </span>
                  {i === 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[var(--color-teal-50)]">
                      <BestBadge />
                    </span>
                  )}
                </div>

                {/* Harness name */}
                <h3 className="text-xl font-bold text-[var(--color-slate-800)] mb-1">
                  {h.name}
                </h3>
                <p className="text-xs font-mono text-[var(--color-slate-400)] mb-6">
                  code: {h.seats.build} &middot; review: {h.seats.review}
                </p>

                {/* Seat breakdown */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {['plan', 'explore', 'build', 'review', 'test'].map((seat) => (
                    <div key={seat} className="text-center">
                      <p className="text-[9px] font-mono text-[var(--color-slate-400)] uppercase mb-1">
                        {seat}
                      </p>
                      <p className="text-[11px] font-semibold text-[var(--color-slate-700)] leading-tight">
                        {h.seats[seat]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Benchmark scores */}
                <div className="space-y-2 pt-4 border-t border-[var(--color-border)]">
                  {BENCHMARKS.map((b) => {
                    const score = HARNESS_SCORES[b.id]?.[h.id];
                    return (
                      <div key={b.id} className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[var(--color-slate-500)]">
                          {b.shortName}
                        </span>
                        <span className="text-lg font-bold text-[var(--color-teal-700)]">
                          {score != null ? `${score}%` : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-[var(--color-slate-400)] mt-8">
          Harnesses are fully customizable — swap any model into any seat.{' '}
          <a
            href="https://vorflux.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-teal-700)] underline underline-offset-2"
          >
            Build your own harness &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}
