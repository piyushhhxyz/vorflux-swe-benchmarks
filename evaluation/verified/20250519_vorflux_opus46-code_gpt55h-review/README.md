# Vorflux: Opus 4.6 Code + GPT-5.5 High Review

This directory contains the full evaluation results for Vorflux's first harness on [SWE-bench Verified](https://www.swebench.com/).

## Results

```
==================================================
Resolved 413 instances (82.6%)
==================================================
Resolved by Repository
- astropy/astropy: 12/22 (54.5%)
- django/django: 202/231 (87.4%)
- matplotlib/matplotlib: 27/34 (79.4%)
- mwaskom/seaborn: 1/2 (50.0%)
- pallets/flask: 1/1 (100.0%)
- psf/requests: 6/8 (75.0%)
- pydata/xarray: 19/22 (86.4%)
- pylint-dev/pylint: 5/10 (50.0%)
- pytest-dev/pytest: 18/19 (94.7%)
- scikit-learn/scikit-learn: 27/32 (84.4%)
- sphinx-doc/sphinx: 35/44 (79.5%)
- sympy/sympy: 60/75 (80.0%)
==================================================
Resolved by Time
- 2013: 2/3 (66.7%)
- 2014: 1/2 (50.0%)
- 2015: 1/1 (100.0%)
- 2016: 2/2 (100.0%)
- 2017: 15/16 (93.8%)
- 2018: 19/24 (79.2%)
- 2019: 83/98 (84.7%)
- 2020: 92/108 (85.2%)
- 2021: 66/86 (76.7%)
- 2022: 85/102 (83.3%)
- 2023: 47/58 (81.0%)
==================================================
```

## System Description

Vorflux uses a **multi-model harness** where different models handle different stages of the software engineering workflow:

| Role | Model | Purpose |
|:---|:---|:---|
| **Plan** | Claude Opus 4.6 | Reads the issue, plans the approach |
| **Explore** | Claude Haiku 4.5 (x N) | Parallel codebase investigation subagents |
| **Build** | Claude Opus 4.6 | Implements the fix (code generation) |
| **Simplify** | Claude Opus 4.6 | Refactors for clarity and minimalism |
| **Review** | GPT-5.5 High | Cross-vendor code review for correctness |
| **Test** | Claude Opus 4.6 | Applies feedback, runs verification |

Each instance receives exactly one attempt (pass@1). No retries, no iterative refinement, no human intervention. 100 instances run concurrently with the same system prompt and configuration.

See [CONFIGURATION.md](CONFIGURATION.md) for full details on evaluation parameters, agent behavior, and scoring pipeline.

## Authors

- **Piyush Bhawsar** — [Vorflux](https://vorflux.com)
- Vorflux team

## Artifacts

| File | Description |
|:---|:---|
| [`all_preds.jsonl`](all_preds.jsonl) | Official SWE-bench predictions (500 instances) |
| [`results/results.json`](results/results.json) | Resolved instance IDs |
| [`results/resolved_by_repo.json`](results/resolved_by_repo.json) | Results broken down by repository |
| [`results/resolved_by_time.json`](results/resolved_by_time.json) | Results broken down by year |
| [`patches/`](patches/) | Individual `.diff` files for all 500 instances |
| [`trajs/`](trajs/) | Agent trajectories (pending export from Laminar) |
| [`runs.json`](runs.json) | Per-instance metadata with session links and trace IDs |
| [`metadata.yaml`](metadata.yaml) | Official SWE-bench metadata |
| [`CONFIGURATION.md`](CONFIGURATION.md) | Detailed harness configuration |

**Note:** All 500 instances have non-empty generated patches. The 87 unresolved instances produced patches that did not pass the SWE-bench test suite.

## Checklist

- [x] Is a pass@1 submission (does not attempt the same task instance more than once)
- [x] Does not use SWE-bench test knowledge (`PASS_TO_PASS`, `FAIL_TO_PASS`)
- [x] Does not use the `hints` field in SWE-bench
- [x] Does not have web-browsing OR has taken steps to prevent lookup of SWE-bench solutions via web-browsing

### Evidence

- **Pass@1**: Each instance receives exactly one attempt. No retries or iterative refinement. The agent session is created once per instance and runs to completion. `num_repetitions: 1`, `retry_on_failure: false`.
- **No test knowledge**: The agent receives only the GitHub issue description (title + body), the repository name, and the base commit SHA. It does NOT receive failing test names, test file contents, `PASS_TO_PASS`, `FAIL_TO_PASS`, or `hints_text` fields.
- **No web browsing**: The agent operates in a sandboxed environment with repository-only file access tools (read, search, edit). No browser, no internet search, no access to GitHub issue pages or PR discussions beyond the issue description provided in the prompt.
