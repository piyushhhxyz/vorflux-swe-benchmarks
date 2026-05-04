/**
 * Harness picker — tabs for each harness, seat breakdown cards, and benchmark scores.
 */
import { useState } from 'react';
import { HARNESSES, HARNESS_SCORES, BENCHMARKS } from '../../data/benchmarks';
import SectionHeader from './SectionHeader';

const SEAT_LABELS = [
  { key: 'plan', label: 'PLAN', num: 1 },
  { key: 'explore', label: 'EXPLORE', num: 2 },
  { key: 'build', label: 'BUILD', num: 3 },
  { key: 'review', label: 'REVIEW', num: 4 },
  { key: 'test', label: 'TEST', num: 5 },
];

export default function HarnessPicker() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = HARNESSES[activeIdx];

  return (
    <section className="py-10 md:py-14 bg-[var(--color-bg-section)]">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Left — title + description */}
          <div>
            <SectionHeader label="SECTION 02" />
            <h2
              className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]"
            >
              One agent. Any harness you like.
            </h2>
            <p className="mt-6 text-[var(--color-slate-600)] leading-relaxed">
              A harness is a recipe — which model plans, which writes the code,
              which reviews the diff. We expose every seat. Pick a row to see the
              recipe and the score.
            </p>
          </div>

          {/* Right — picker card */}
          <div className="card p-6">
            {/* Harness tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {HARNESSES.map((h, i) => (
                <button
                  key={h.id}
                  onClick={() => setActiveIdx(i)}
                  className={`harness-tab text-left ${i === activeIdx ? 'active' : ''}`}
                >
                  <p className={`text-[10px] font-mono font-semibold tracking-wider mb-1 harness-tab-label ${
                    i === activeIdx ? 'text-[var(--color-teal-200)]' : 'text-[var(--color-teal-700)]'
                  }`}>
                    {h.label}
                  </p>
                  <p className={`text-sm font-semibold ${
                    i === activeIdx ? 'text-white' : 'text-[var(--color-slate-800)]'
                  }`}>
                    {h.name}
                  </p>
                </button>
              ))}
            </div>

            {/* Seat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
              {SEAT_LABELS.map((s) => (
                <div key={s.key} className="border border-[var(--color-border)] rounded-lg p-3">
                  <p className="text-[10px] font-mono text-[var(--color-slate-400)] mb-1">
                    SEAT {s.num} &middot; {s.label}
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-slate-800)]">
                    {active.seats[s.key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Benchmark scores */}
            <div className="grid grid-cols-2 gap-3">
              {BENCHMARKS.map((b) => {
                const score = HARNESS_SCORES[b.id][active.id];
                return (
                  <div
                    key={b.id}
                    className="flex items-center justify-between border border-[var(--color-border)] rounded-lg p-4"
                  >
                    <span className="text-sm font-mono text-[var(--color-slate-600)]">
                      {b.shortName}
                    </span>
                    <span className="text-2xl font-bold text-[var(--color-teal-700)]">
                      {score != null ? `${score}` : '—'}
                      <span className="text-sm font-normal text-[var(--color-teal-600)] ml-0.5">%</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
