import { SectionLabel } from '../ui';

export default function SidebarList({ label, items, activeId, onSelect, renderSubtitle }) {
  return (
    <div className="px-4 pb-3">
      <SectionLabel className="px-1 mb-2">{label}</SectionLabel>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`sidebar-item w-full text-left ${activeId === item.id ? 'active' : ''}`}
          >
            <div>
              <div className="font-medium text-sm">{item.name}</div>
              <div className={`text-xs mt-0.5 ${activeId === item.id ? 'text-white/70' : 'text-[var(--color-slate-400)]'}`}>
                {renderSubtitle(item)}
              </div>
            </div>
            {item.displayScore !== undefined && item.displayScore !== null && (
              <span className={`font-mono font-semibold text-sm ${activeId === item.id ? 'text-white' : 'text-[var(--color-slate-700)]'}`}>
                {item.displayScore}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
