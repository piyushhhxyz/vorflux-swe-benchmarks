import { Card } from '../ui';

export default function ScatterChart({ data }) {
  if (!data || data.length === 0) return null;

  const W = 320;
  const H = 200;
  const PAD = { top: 20, right: 20, bottom: 30, left: 35 };

  const scores = data.map((d) => d.score);
  const costs = data.map((d) => d.cost);
  const minScore = Math.floor(Math.min(...scores) / 5) * 5 - 2;
  const maxScore = Math.ceil(Math.max(...scores) / 5) * 5 + 2;
  const maxCost = Math.ceil(Math.max(...costs)) + 1;

  const xScale = (cost) => PAD.left + (cost / maxCost) * (W - PAD.left - PAD.right);
  const yScale = (score) => H - PAD.bottom - ((score - minScore) / (maxScore - minScore)) * (H - PAD.top - PAD.bottom);

  const yTicks = [];
  for (let s = Math.ceil(minScore / 10) * 10; s <= maxScore; s += 10) yTicks.push(s);
  const xTicks = [];
  for (let c = 1; c <= maxCost; c += 1) xTicks.push(c);

  return (
    <Card padding="md" className="h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-label text-[var(--color-slate-400)]">SCORE x COST · {data.length} AGENTS</p>
        <p className="text-[10px] font-mono text-[var(--color-slate-400)]">↑ score → tokens</p>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
        {yTicks.map((tick) => (
          <g key={`y-${tick}`}>
            <line x1={PAD.left} y1={yScale(tick)} x2={W - PAD.right} y2={yScale(tick)} stroke="var(--color-slate-100)" strokeWidth="1" />
            <text x={PAD.left - 6} y={yScale(tick) + 3} textAnchor="end" fill="var(--color-slate-400)" style={{ fontSize: 9, fontFamily: 'var(--font-mono)' }}>{tick}%</text>
          </g>
        ))}
        {xTicks.map((tick) => (
          <text key={`x-${tick}`} x={xScale(tick)} y={H - PAD.bottom + 16} textAnchor="middle" fill="var(--color-slate-400)" style={{ fontSize: 9, fontFamily: 'var(--font-mono)' }}>${tick}</text>
        ))}
        {data.map((d) => {
          const cx = xScale(d.cost);
          const cy = yScale(d.score);
          return (
            <g key={d.agent}>
              <circle cx={cx} cy={cy} r={d.ours ? 7 : 5}
                fill={d.ours ? 'var(--color-teal-700)' : 'white'}
                stroke={d.ours ? 'var(--color-teal-700)' : 'var(--color-slate-300)'}
                strokeWidth={d.ours ? 2 : 1.5}
              />
              <text x={cx + (d.ours ? 10 : 8)} y={cy + 3}
                fill={d.ours ? 'var(--color-teal-700)' : 'var(--color-slate-500)'}
                style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: d.ours ? 600 : 400 }}>
                {d.agent}
              </text>
            </g>
          );
        })}
      </svg>
    </Card>
  );
}
