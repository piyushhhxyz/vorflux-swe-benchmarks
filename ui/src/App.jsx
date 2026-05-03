import { Header } from './components/layout';
import {
  VorfluxingDefinition,
  HeroTitle,
  MarksheetTable,
  HarnessPicker,
  ShippingLoop,
  TaskAtlas,
  ModelComparison,
  TopHarnesses,
  RealWorldCTA,
  Footer,
} from './components/sections';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Header />
      <main>
        <VorfluxingDefinition />
        <HeroTitle />
        <MarksheetTable />
        <HarnessPicker />
        <ShippingLoop />
        <TaskAtlas />
        <ModelComparison />
        <TopHarnesses />
        <RealWorldCTA />
      </main>
      <Footer />
    </div>
  );
}
