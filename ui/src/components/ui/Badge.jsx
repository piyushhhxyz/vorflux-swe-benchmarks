const VARIANT_CLASSES = {
  teal: 'badge-teal',
  dark: 'badge-dark',
  purple: 'badge-purple',
  outline: 'border border-slate-300 text-slate-600 bg-white font-mono text-xs',
};

export default function Badge({ children, variant = 'teal', className = '' }) {
  return (
    <span className={`badge ${VARIANT_CLASSES[variant] || ''} ${className}`}>
      {children}
    </span>
  );
}
