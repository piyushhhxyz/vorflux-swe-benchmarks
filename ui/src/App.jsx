import { Header, Sidebar } from './components/layout';
import {
  ScoreCard, Leaderboard, TaskAtlas, RepoBreakdown,
  VorfluxingLoop, RealWorldCTA, Footer,
} from './components/sections';
import { ScatterChart } from './components/charts';
import useBenchmarkState from './hooks/useBenchmarkState';
import { VORFLUXING_LOOP, REAL_WORLD_FEATURES } from './data/benchmarks';

export default function App() {
  const {
    activeBenchmark, setActiveBenchmark,
    activeHarness, setActiveHarness,
    benchmark, harness, scores, leaderboard, scatterData,
    dotGrid, repoBarData, harnessesWithScores, benchmarksWithScores, dotGridStats,
  } = useBenchmarkState();

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-primary)]">
      <Sidebar
        harnessesWithScores={harnessesWithScores}
        benchmarksWithScores={benchmarksWithScores}
        activeHarness={activeHarness}
        activeBenchmark={activeBenchmark}
        onHarnessChange={setActiveHarness}
        onBenchmarkChange={setActiveBenchmark}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header benchmark={benchmark} harness={harness} />

        <main className="flex-1 overflow-y-auto">
          {/* Score + Scatter */}
          <section className="grid grid-cols-2 gap-6 p-6">
            <ScoreCard scores={scores} harness={harness} leaderboard={leaderboard} />
            <ScatterChart data={scatterData} />
          </section>

          {/* Leaderboard + Task Atlas */}
          <section className="grid grid-cols-2 gap-6 px-6 pb-6">
            <Leaderboard data={leaderboard} />
            <TaskAtlas dotGrid={dotGrid} stats={dotGridStats} activeBenchmark={activeBenchmark} />
          </section>

          {/* Repo breakdown */}
          <section className="px-6 pb-8">
            <RepoBreakdown data={repoBarData} />
          </section>

          <VorfluxingLoop data={VORFLUXING_LOOP} />
          <RealWorldCTA features={REAL_WORLD_FEATURES} />
          <Footer />
        </main>
      </div>
    </div>
  );
}
