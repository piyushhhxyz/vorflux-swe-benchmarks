import { Card, SectionLabel } from '../ui';

export default function RealWorldCTA({ features }) {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <Card padding="lg" className="bg-[var(--color-slate-50)] border-0">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <SectionLabel className="mb-3">THE BENCHMARKS ARE THE FLOOR</SectionLabel>
              <h2 className="text-3xl font-bold leading-tight mb-2">
                Bugs are the warm-up.<br />
                <span className="text-[var(--color-teal-700)]">Whole features pay the bills.</span>
              </h2>
              <p className="text-[var(--color-slate-500)] leading-relaxed mt-4">
                Evals score single-file patches. Real teams hire{' '}
                <strong>Cosmos · Pro</strong> to vorflux entire features
                end-to-end — design, code, tests, rollout — using the same
                plan / code / review loop you see above.
              </p>
            </div>
            <div className="space-y-3">
              {features.map((feat) => (
                <div key={feat.category} className="flex items-center gap-4 px-4 py-3 bg-white rounded-lg border border-[var(--color-border)]">
                  <span className="text-label text-[var(--color-slate-400)] w-[70px] shrink-0">{feat.category}</span>
                  <span className="text-sm text-[var(--color-slate-700)] flex-1">{feat.title}</span>
                  <span className="font-mono text-xs text-[var(--color-slate-400)] shrink-0">
                    +{feat.added.toLocaleString()} / -{feat.removed.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
