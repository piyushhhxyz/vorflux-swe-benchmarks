/**
 * CTA section — $500 in credits offer.
 */
export default function RealWorldCTA() {
  return (
    <section className="section-wrapper py-20">
      <div
        className="rounded-2xl p-10 md:p-14 text-center"
        style={{
          background: 'var(--color-teal-900)',
          border: '1px solid var(--color-teal-800)',
        }}
      >
        <p className="text-label tracking-widest mb-4" style={{ color: 'var(--color-teal-300)' }}>
          START VORFLUXING
        </p>
        <h2
          className="font-serif text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white"
        >
          $500 in credits for frontier models.
        </h2>
        <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'var(--color-teal-200)' }}>
          Opus 4.7, GPT-5.5 High, and every model in between.
          No rate limits, no waiting lists.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://vorflux.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-lg transition-colors"
            style={{
              backgroundColor: 'white',
              color: 'var(--color-teal-900)',
            }}
          >
            Start vorfluxing &rarr;
          </a>
          <a
            href="https://github.com/piyushhhxyz/vorflux-swe-benchmarks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-lg transition-colors"
            style={{
              border: '1px solid var(--color-teal-400)',
              color: 'var(--color-teal-200)',
            }}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
