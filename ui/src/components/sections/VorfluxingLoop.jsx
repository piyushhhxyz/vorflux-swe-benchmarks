import LoopBackIcon from '../../assets/LoopBackIcon';

const PHASE_COLORS = {
  PLAN: 'var(--color-teal-700)',
  CODE: 'var(--color-slate-700)',
  REVIEW: 'var(--color-purple-500)',
};

const PHASE_BG = {
  PLAN: 'var(--color-teal-50)',
  CODE: 'var(--color-slate-50)',
  REVIEW: '#f3e8ff',
};

export default function VorfluxingLoop({ data }) {
  return (
    <section className="py-16 px-8 bg-[var(--color-bg-primary)]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-[280px_1fr] gap-12">
          {/* Left description */}
          <div className="sticky top-8 self-start">
            <h2 className="text-4xl font-bold leading-tight mb-4">The loop.</h2>
            <p className="text-[var(--color-slate-600)] leading-relaxed mb-4">
              A super engineer doesn&apos;t patch and walk. They{' '}
              <em className="not-italic font-medium">close the loop</em>: spec, design,
              code, test, review, ship, then loop on what review said.
            </p>
            <p className="text-[var(--color-slate-600)] leading-relaxed">
              Each stage routes to whichever model in{' '}
              <strong>Cosmos · Max</strong> is best at it. Same harness,
              six stages, no hand-offs.
            </p>
          </div>

          {/* Right timeline */}
          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 loop-line" />

            {data.map((step) => (
              <div
                key={step.step}
                className="relative flex items-start gap-8 py-6 border-b border-dashed border-[var(--color-slate-200)] last:border-0"
              >
                <div className="relative z-10 mt-1"><div className="loop-dot" /></div>
                <span className="text-3xl font-bold text-[var(--color-teal-400)] font-mono w-[50px] shrink-0">
                  {String(step.step).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{step.name}</h3>
                  <p className="text-sm text-[var(--color-slate-500)]">{step.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-label mb-1" style={{ color: PHASE_COLORS[step.phase] }}>{step.phase}</p>
                  <span
                    className="inline-block px-3 py-1 rounded-md font-mono text-xs font-medium"
                    style={{
                      backgroundColor: PHASE_BG[step.phase],
                      color: PHASE_COLORS[step.phase],
                      border: `1px solid ${PHASE_COLORS[step.phase]}20`,
                    }}
                  >
                    {step.model}
                  </span>
                </div>
              </div>
            ))}

            {/* Loop-back callout */}
            <div className="mt-6 flex items-center gap-3 px-5 py-3 rounded-lg bg-[var(--color-teal-700)] text-white text-sm">
              <LoopBackIcon className="shrink-0" />
              If review found anything, the loop runs again. The PR doesn&apos;t open until review signs off.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
