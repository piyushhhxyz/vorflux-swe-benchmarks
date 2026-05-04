/**
 * CTA section — impressive numbers, super engineer positioning.
 */
import VorfluxLogo from '../../assets/VorfluxLogo';
import { HARNESSES, getBestHarnessScore } from '../../data/benchmarks';

export default function RealWorldCTA() {
  return (
    <section className="section-wrapper py-10 md:py-16">
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20"
        style={{ background: 'linear-gradient(135deg, var(--color-teal-900) 0%, var(--color-teal-850) 50%, var(--color-teal-800) 100%)' }}
      >
        {/* Decorative background elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 translate-x-[30%] -translate-y-[30%]"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, var(--color-teal-400), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 -translate-x-[20%] translate-y-[20%]"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, var(--color-teal-300), transparent 70%)' }}
        />

        <div className="relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15">
              <VorfluxLogo size={16} color="white" />
              <span className="text-label text-white/80 tracking-widest">YOUR SUPER ENGINEER</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-white text-center">
            $500 free credits.
          </h2>
          <p className="mt-3 font-serif text-xl md:text-2xl text-center" style={{ color: 'var(--color-teal-200)' }}>
            Ship code 10x faster with your AI super engineer.
          </p>

          {/* Impressive stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12 max-w-3xl mx-auto">
            {[
              { value: `${getBestHarnessScore('swe-bench')}%`, label: 'SWE-bench Verified' },
              { value: `${getBestHarnessScore('terminal-bench')}%`, label: 'Terminal-Bench 2.0' },
              { value: String(HARNESSES.length), label: 'Harness configs' },
              { value: '24/7', label: 'Always shipping' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-xs md:text-sm text-white/60 mt-1 font-mono">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-10">
            {['Opus 4.7 + GPT-5.5', 'Multi-model harnesses', 'No rate limits', 'No waiting list'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm md:text-base text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal-400)]" />
                {item}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12">
            <a
              href="https://vorflux.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ backgroundColor: 'white', color: 'var(--color-teal-900)' }}
            >
              Start vorfluxing &rarr;
            </a>
            <a
              href="https://github.com/piyushhhxyz/vorflux-swe-benchmarks"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-semibold rounded-xl transition-all hover:bg-white/10 border border-white/25 text-white"
            >
              View benchmarks
            </a>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--color-teal-300)' }}>
            No credit card required &middot; Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
