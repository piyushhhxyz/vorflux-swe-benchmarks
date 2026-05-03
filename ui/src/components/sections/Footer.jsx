/**
 * Footer — giant "vorfluxing" text spanning full width.
 * Same background as the page, light teal text, no buttons.
 */
export default function Footer() {
  return (
    <footer className="overflow-hidden pt-8 md:pt-12 pb-4">
      {/* Giant text — full width, light teal */}
      <div className="select-none pointer-events-none whitespace-nowrap text-center">
        <span
          className="font-serif font-bold tracking-tighter block leading-[0.85]"
          style={{
            fontSize: 'clamp(4rem, 14vw, 14rem)',
            color: 'var(--color-teal-100)',
          }}
        >
          vorfluxing
        </span>
      </div>

      {/* Minimal copyright */}
      <div className="section-wrapper mt-6 mb-2">
        <p className="text-center text-xs text-[var(--color-slate-400)] font-mono">
          &copy; {new Date().getFullYear()} Vorflux
        </p>
      </div>
    </footer>
  );
}
