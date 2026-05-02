const PADDINGS = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

export default function Card({ children, className = '', padding = 'md' }) {
  return (
    <div className={`card ${PADDINGS[padding]} ${className}`}>
      {children}
    </div>
  );
}
