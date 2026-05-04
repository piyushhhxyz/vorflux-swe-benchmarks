/**
 * The shipping loop — horizontal 4-step pipeline + sub-agents grid.
 */
import { SHIPPING_LOOP, SUB_AGENTS } from '../../data/benchmarks';
import SectionHeader from './SectionHeader';

export default function ShippingLoop() {
  return (
    <section className="section-wrapper py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
        {/* Left — title */}
        <div>
          <SectionHeader label="SECTION 03" />
          <h2
            className="font-headline text-4xl md:text-5xl tracking-tight leading-[1.05]"
          >
            The shipping loop.
          </h2>
          <p className="mt-6 text-[var(--color-slate-600)] leading-relaxed">
            Cosmos is not one prompt. It&rsquo;s a pipeline — plan, build, review, test
            — running on parallel explore sub-agents that the main loop calls on demand.
          </p>
        </div>

        {/* Right — pipeline + sub-agents */}
        <div className="card p-6 md:p-8">
          {/* Pipeline steps — first-child styling handled by CSS .pipeline-step:first-child */}
          <div className="grid grid-cols-4 gap-2 sm:flex sm:items-center sm:justify-between mb-4">
            {SHIPPING_LOOP.map((step, i) => (
              <div key={step.step} className="contents">
                <div className="pipeline-step flex-shrink-0">
                  {String(step.step).padStart(2, '0')}
                </div>
                {i < SHIPPING_LOOP.length - 1 && (
                  <span className="hidden sm:inline text-[var(--color-slate-300)] text-lg mx-2 flex-shrink-0">&rarr;</span>
                )}
              </div>
            ))}
          </div>

          {/* Step labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {SHIPPING_LOOP.map((step) => (
              <div key={step.step}>
                <p className="font-bold text-[var(--color-slate-800)] text-lg">{step.name}</p>
                <p className="text-xs text-[var(--color-slate-500)] mt-1 leading-relaxed font-mono">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sub-agents */}
          <div className="border-t border-dashed border-[var(--color-border)] pt-6">
            <p className="text-label text-[var(--color-teal-700)] mb-4">
              &#x21B3; EXPLORE SUB-AGENTS &middot; CALLABLE FROM ANY STAGE
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SUB_AGENTS.map((agent) => (
                <div
                  key={agent.name}
                  className="border border-[var(--color-border)] rounded-lg p-4"
                >
                  <p className="font-semibold text-[var(--color-teal-800)] text-sm font-mono">
                    {agent.name}
                  </p>
                  <p className="text-xs text-[var(--color-slate-500)] mt-1 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
