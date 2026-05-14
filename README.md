# Vorflux SWE-Bench Evaluations

Public evaluation results for [Vorflux](https://vorflux.com) on [SWE-bench Verified](https://www.swebench.com/).

This repository contains all artifacts needed for independent verification: predictions, patches, results, agent trajectories, and per-instance metadata — following the official [swe-bench/experiments](https://github.com/swe-bench/experiments) schema.

## Results

| Benchmark | Harness | Resolved | Total | Rate |
|:---|:---|:---|:---|:---|
| SWE-bench Verified | [Opus 4.6 Code + GPT-5.5 High Review](evaluation/verified/20250519_vorflux_opus46-code_gpt55h-review/) | 413 | 500 | **82.6%** |

## Repository Structure

```
vorflux-swe-benchmarks/
├── evaluation/
│   └── verified/
│       └── 20250519_vorflux_opus46-code_gpt55h-review/
│           ├── all_preds.jsonl          # Official SWE-bench predictions
│           ├── metadata.yaml            # Official metadata
│           ├── README.md                # Results, checklist, evidence
│           ├── CONFIGURATION.md         # Harness configuration details
│           ├── runs.json                # Per-instance metadata (session IDs, trace links)
│           ├── runs.schema.md           # Schema documentation for runs.json
│           ├── results/
│           │   ├── results.json         # Resolved instance IDs
│           │   ├── resolved_by_repo.json
│           │   └── resolved_by_time.json
│           ├── patches/                 # 500 individual .diff files
│           └── trajs/                   # Agent trajectories (pending export)
├── scripts/
│   ├── generate_preds.py               # Generate all_preds.jsonl from patches
│   └── validate_artifacts.py           # Validate all artifacts against schema
├── ui/                                  # Dashboard app
└── README.md
```

## Methodology

Vorflux uses a **multi-model harness** where specialized models handle different stages of the software engineering workflow:

1. **Plan** (Claude Opus 4.6) — Reads the issue, plans the approach
2. **Explore** (Claude Haiku 4.5 x N) — Parallel codebase investigation
3. **Build** (Claude Opus 4.6) — Implements the fix
4. **Simplify** (Claude Opus 4.6) — Refactors for clarity
5. **Review** (GPT-5.5 High) — Cross-vendor code review
6. **Test** (Claude Opus 4.6) — Applies feedback, runs verification

Each instance is attempted exactly once (pass@1). No retries, no human intervention, no access to test knowledge or hints.

## Transparency

Every evaluation artifact is published for independent verification:

- **Predictions** (`all_preds.jsonl`) — The exact patches submitted to the SWE-bench harness
- **Patches** (`patches/`) — Individual `.diff` files for easy browsing on GitHub
- **Results** (`results/`) — Official-format results with breakdowns by repository and time
- **Trajectories** (`trajs/`) — Full agent session traces showing every tool call and model response (pending export from Laminar)
- **Per-instance metadata** (`runs.json`) — Session IDs, LangSmith trace links, and contamination check status for every instance

## Validation

Run the validation script to verify all artifacts match the expected schema:

```bash
python scripts/validate_artifacts.py evaluation/verified/20250519_vorflux_opus46-code_gpt55h-review
```

## License

MIT
