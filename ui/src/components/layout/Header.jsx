import { getRepoUrl } from '../../data/benchmarks';
import ExternalLinkIcon from '../../assets/ExternalLinkIcon';

export default function Header({ benchmark, harness }) {
  const runId = `${benchmark?.runIdPrefix || 'cosmos'}-${harness?.shortName?.toLowerCase() || 'pro'}-${benchmark?.runIdSuffix || 'swe-04a'}`;
  const headerLabel = benchmark?.headerLabel || benchmark?.name || 'SWE-bench';
  const finishedAt = benchmark?.finishedAt || '—';

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-white">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          {headerLabel}
          <span className="text-[var(--color-slate-400)] font-normal text-base">
            · Cosmos · {harness?.shortName || 'Pro'}
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-label text-[var(--color-slate-400)]">RUN ID</span>
          <span className="font-mono text-[var(--color-slate-600)]">{runId}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label text-[var(--color-slate-400)]">FINISHED</span>
          <span className="font-mono text-[var(--color-slate-600)]">{finishedAt}</span>
        </div>
        <a
          href={getRepoUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--color-border)] rounded-md hover:bg-[var(--color-slate-50)] transition-colors text-[var(--color-slate-700)] font-medium"
        >
          view repo
          <ExternalLinkIcon className="opacity-60" />
        </a>
      </div>
    </header>
  );
}
