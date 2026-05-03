/**
 * Reusable section header — teal dot + mono label.
 */
export default function SectionHeader({ label }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full bg-[var(--color-teal-600)]" />
      <span className="text-label text-[var(--color-teal-700)]">{label}</span>
    </div>
  );
}
