export default function SectionLabel({ children, className = '' }) {
  return (
    <p className={`text-label text-[var(--color-slate-500)] ${className}`}>
      {children}
    </p>
  );
}
