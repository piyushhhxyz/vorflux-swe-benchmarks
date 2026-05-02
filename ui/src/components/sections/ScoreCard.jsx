import { Card, Badge } from '../ui';

function PipelineSegment({ label, model, color }) {
  return (
    <div className="text-center min-w-[80px]">
      <p className="text-label mb-1" style={{ color }}>{label}</p>
      <p className="font-mono text-xs font-medium text-[var(--color-slate-700)]">{model}</p>
    </div>
  );
}

export default function ScoreCard({ scores, harness, leaderboard }) {
  if (!scores || !harness) return null;

  const ourEntry = leaderboard.find((e) => e.ours);
  const rank = ourEntry?.rank ?? 1;
  const secondPlace = leaderboard[1];
  const delta = secondPlace ? (scores.score - secondPlace.score).toFixed(1) : null;

  return (
    <Card padding="lg" className="relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <p className="text-label text-[var(--color-slate-400)]">SCORE · RESOLVED</p>
        <Badge variant="dark">RANK #{rank}</Badge>
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-score text-[var(--color-slate-900)]">{scores.score}</span>
        <span className="text-score-unit">%</span>
      </div>

      <div className="space-y-1 text-sm text-[var(--color-slate-500)] mb-6">
        {delta && (
          <p>
            <span className="text-[var(--color-teal-700)] font-semibold">+{delta}pp</span> vs #{rank + 1}
          </p>
        )}
        <p className="font-mono">${scores.cost.toFixed(2)} median</p>
        <p className="font-mono">{scores.time} median</p>
      </div>

      <div className="flex items-center gap-0 mt-auto">
        <PipelineSegment label="PLAN" model={harness.plan} color="var(--color-teal-700)" />
        <div className="flex-1 h-[3px] bg-[var(--color-teal-700)]" />
        <PipelineSegment label="CODE" model={harness.code} color="var(--color-teal-700)" />
        <div className="flex-1 h-[3px] bg-[var(--color-teal-700)]" />
        <PipelineSegment label="REVIEW" model={harness.review} color="var(--color-purple-500)" />
      </div>
    </Card>
  );
}
