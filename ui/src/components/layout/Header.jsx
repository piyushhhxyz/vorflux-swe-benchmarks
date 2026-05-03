import VorfluxLogo from '../../assets/VorfluxLogo';
import { EVAL_DATE } from '../../data/benchmarks';

export default function Header() {
  return (
    <header className="w-full border-b border-[var(--color-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="section-wrapper flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <VorfluxLogo size={22} />
          <span className="text-label text-[var(--color-slate-900)]">
            VORFLUX <span className="text-[var(--color-slate-400)]">&middot;</span> EVALS
          </span>
        </div>
        <div className="flex items-center gap-1 text-label text-[var(--color-slate-500)]">
          PUBLIC RESULTS <span>&middot;</span> {EVAL_DATE} <span>&middot;</span>{' '}
          <a
            href="https://github.com/piyushhhxyz/vorflux-swe-benchmarks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-teal-700)] hover:text-[var(--color-teal-900)] underline underline-offset-2"
          >
            GITHUB
          </a>
        </div>
      </div>
    </header>
  );
}
