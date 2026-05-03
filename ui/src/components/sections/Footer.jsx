/**
 * Footer — giant "vorflux" text (Smallest.ai style) with action buttons.
 */
import VorfluxLogo from '../../assets/VorfluxLogo';

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-slate-900)] overflow-hidden py-20 md:py-28">
      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="giant-text">vorflux</span>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 section-wrapper flex items-end justify-between min-h-[200px]">
        <div className="flex items-center gap-2">
          <VorfluxLogo size={20} color="rgba(255,255,255,0.4)" />
          <span className="text-xs font-mono text-white/30">
            &copy; {new Date().getFullYear()} Vorflux
          </span>
        </div>

        <div className="flex flex-col gap-3 items-end">
          <a
            href="https://vorflux.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg border border-white/10 hover:bg-white/20 transition-colors"
          >
            <VorfluxLogo size={16} color="white" />
            Cosmos
          </a>
          <a
            href="https://vorflux.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-teal-700)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-teal-600)] transition-colors"
          >
            &#x260E; Talk to us
          </a>
        </div>
      </div>
    </footer>
  );
}
