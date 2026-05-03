/**
 * Footer — giant "start vorfluxing" text spanning the entire viewport width.
 * No buttons, same page background, light teal text.
 */
export default function Footer() {
  return (
    <footer className="overflow-hidden pt-12 md:pt-20 pb-6">
      {/* Giant text — full viewport width, no max-width constraint */}
      <div className="select-none pointer-events-none whitespace-nowrap w-full">
        <span
          className="font-serif font-bold tracking-tighter block leading-[0.85] text-center"
          style={{
            fontSize: 'clamp(3rem, 15.5vw, 18rem)',
            color: 'var(--color-teal-100)',
          }}
        >
          start vorfluxing
        </span>
      </div>

      {/* Minimal copyright */}
      <div className="section-wrapper mt-8 mb-2">
        <p className="text-center text-xs text-[var(--color-slate-400)] font-mono">
          &copy; {new Date().getFullYear()} Vorflux
        </p>
      </div>
    </footer>
  );
}
