import VorfluxLogo from '../../assets/VorfluxLogo';
import { EVAL_DATE } from '../../data/benchmarks';

export default function Header() {
  return (
    <header className="w-full bg-[var(--color-bg-primary)]">
      <div className="section-wrapper pt-6 pb-4">
        {/* Top line: logo + wordmark left, meta right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VorfluxLogo size={24} />
            <span className="font-headline text-2xl tracking-tight text-[var(--color-slate-900)]">
              Vorflux
            </span>
          </div>
          <nav className="flex items-center gap-4 text-label text-[var(--color-slate-400)]">
            <span>{EVAL_DATE}</span>
            <span>&middot;</span>
            <a
              href="https://vorflux.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-slate-600)] transition-colors"
            >
              VORFLUX.COM
            </a>
            <span>&middot;</span>
            <a
              href="https://github.com/piyushhhxyz/vorflux-swe-benchmarks"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-slate-600)] transition-colors"
            >
              GITHUB
            </a>
          </nav>
        </div>

        {/* Newspaper-style rule */}
        <div className="mt-4 border-t-[3px] border-[var(--color-slate-900)]" />
        <div className="mt-[2px] border-t border-[var(--color-slate-900)]" />

        {/* Subtitle / edition line */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-label text-[var(--color-slate-500)]">
            PUBLIC BENCHMARK RESULTS
          </p>
          <p className="text-label text-[var(--color-slate-400)]">
            SWE-BENCH VERIFIED &middot; TERMINAL BENCH 2
          </p>
        </div>
      </div>
    </header>
  );
}
