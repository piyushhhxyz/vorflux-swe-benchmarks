import VorfluxLogo from '../../assets/VorfluxLogo';
import { Badge } from '../ui';
import SidebarList from './SidebarList';

export default function Sidebar({
  harnessesWithScores,
  benchmarksWithScores,
  activeHarness,
  activeBenchmark,
  onHarnessChange,
  onBenchmarkChange,
}) {
  // Map harnesses into a shape SidebarList expects
  const harnessItems = harnessesWithScores.map((h) => ({
    ...h,
    displayScore: h.score,
  }));

  // Map benchmarks into a shape SidebarList expects, showing "Coming soon" for unavailable ones
  const benchmarkItems = benchmarksWithScores.map((b) => ({
    ...b,
    displayScore: b.comingSoon ? null : b.topScore,
  }));

  return (
    <aside className="w-[260px] min-h-screen bg-white border-r border-[var(--color-border)] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3">
        <VorfluxLogo size={28} />
        <span className="font-semibold text-lg tracking-tight">Vorflux</span>
        <Badge variant="teal" className="ml-auto text-[10px]">EVALS</Badge>
      </div>

      {/* Cockpit heading */}
      <div className="px-5 pb-4">
        <p className="text-label text-[var(--color-slate-500)] mb-2">COCKPIT</p>
        <h2 className="text-2xl font-bold leading-tight">
          Pick a harness.<br />
          Pick a bench.<br />
          <span className="text-[var(--color-teal-700)]">Read the score.</span>
        </h2>
      </div>

      <SidebarList
        label={`HARNESS (${harnessItems.length})`}
        items={harnessItems}
        activeId={activeHarness}
        onSelect={onHarnessChange}
        renderSubtitle={(h) => `${h.plan} · ${h.code}`}
      />

      <SidebarList
        label="BENCHMARK"
        items={benchmarkItems}
        activeId={activeBenchmark}
        onSelect={(id) => {
          const b = benchmarksWithScores.find((x) => x.id === id);
          if (!b?.comingSoon) onBenchmarkChange(id);
        }}
        renderSubtitle={(b) => b.comingSoon ? 'Coming soon' : `${b.version} · ${b.totalTasks} tasks`}
      />

      <div className="flex-1" />
    </aside>
  );
}
