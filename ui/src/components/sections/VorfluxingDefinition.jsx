/**
 * Dictionary-style "vor-flux-ing" definition block.
 * Two-column layout with phonetic pronunciation and usage example.
 */
export default function VorfluxingDefinition() {
  return (
    <section className="section-wrapper py-5 md:py-6 border-b border-[var(--color-border)]">
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-16">
        {/* Word + phonetic */}
        <div>
          <h2 className="font-headline text-4xl tracking-tight">
            vor&middot;flux&middot;ing
          </h2>
          <p className="mt-1 text-sm text-[var(--color-slate-500)]">
            <span className="font-serif italic text-[var(--color-slate-600)]">
              /&#x2C8;v&#x254;&#x2D0;r.fl&#x28C;ks.&#x26A;&#x14B;/
            </span>
            {' '}&middot; verb &middot; gerund
          </p>
        </div>

        {/* Definition */}
        <div className="space-y-4">
          <p className="text-xl text-[var(--color-slate-700)] leading-relaxed">
            Throwing two frontier models at the same problem from opposite ends
            — one writes, one rebuts — until the patch ships clean.
          </p>

          <blockquote className="border-l-2 border-[var(--color-teal-500)] pl-4 mt-6">
            <p className="font-serif italic text-[var(--color-teal-800)] text-sm">
              &ldquo;She was up all night vorfluxing the auth migration; ten thousand lines,
              one PR, all green.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
