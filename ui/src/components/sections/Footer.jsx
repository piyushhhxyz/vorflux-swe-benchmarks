import VorfluxLogo from '../../assets/VorfluxLogo';

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-slate-900)] text-white overflow-hidden">
      {/* CTA bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 max-w-[260px]">
          <p className="text-label text-white/60 mb-2">HIRE THE HARNESS</p>
          <p className="text-lg font-bold mb-1">$500 in credits. Run<br />it on your repo.</p>
          <a
            href="https://vorflux.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-white text-[var(--color-slate-900)] rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Open Vorflux app →
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://vorflux.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-sm hover:bg-white/10 transition-colors">
            <VorfluxLogo size={16} color="white" /> Cosmos
          </a>
          <a href="https://vorflux.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--color-teal-700)] text-sm font-medium hover:bg-[var(--color-teal-600)] transition-colors">
            <span className="w-2 h-2 rounded-full bg-[var(--color-green-500)]" /> Talk to us
          </a>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="relative py-8 px-8 overflow-hidden" style={{ minHeight: '200px' }}>
        <div className="giant-text select-none leading-none" style={{ opacity: 0.08 }}>vorflux</div>
      </div>
    </footer>
  );
}
