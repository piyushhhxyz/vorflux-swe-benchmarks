# Vorflux: Opus 4.6 Code + GPT-5.5 High Review

This directory contains the full evaluation results for Vorflux's first harness on [SWE-bench Verified](https://www.swebench.com/).

## Results

```
==================================================
Resolved 442 instances (88.4%)
Resolved (clean, no contamination): 437 (87.4%)
==================================================
Resolved by Repository
- astropy/astropy: 16/22 (72.7%)
- django/django: 213/231 (92.2%)
- matplotlib/matplotlib: 28/34 (82.4%)
- mwaskom/seaborn: 2/2 (100.0%)
- pallets/flask: 1/1 (100.0%)
- psf/requests: 8/8 (100.0%)
- pydata/xarray: 19/22 (86.4%)
- pylint-dev/pylint: 5/10 (50.0%)
- pytest-dev/pytest: 16/19 (84.2%)
- scikit-learn/scikit-learn: 31/32 (96.9%)
- sphinx-doc/sphinx: 38/44 (86.4%)
- sympy/sympy: 65/75 (86.7%)
==================================================
Resolved by Time
- 2013: 3/3 (100.0%)
- 2014: 2/2 (100.0%)
- 2015: 1/1 (100.0%)
- 2016: 2/2 (100.0%)
- 2017: 15/16 (93.8%)
- 2018: 22/24 (91.7%)
- 2019: 87/98 (88.8%)
- 2020: 95/108 (88.0%)
- 2021: 71/86 (82.6%)
- 2022: 92/102 (90.2%)
- 2023: 52/58 (89.7%)
==================================================
```

## Contamination

10 instances were flagged by the contamination judge. Of those, 5 were resolved and 5 were not resolved. The clean resolve rate (excluding contaminated instances) is **87.4%** (437/500).

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
| [`runs.json`](runs.json) | Per-instance metadata with session links, trace IDs, and contamination status |
| [`metadata.yaml`](metadata.yaml) | Official SWE-bench metadata |
| [`CONFIGURATION.md`](CONFIGURATION.md) | Detailed harness configuration |

**Note:** All 500 instances have non-empty generated patches. The 58 unresolved instances produced patches that did not pass the SWE-bench test suite.

## Checklist

- [x] Is a pass@1 submission (does not attempt the same task instance more than once)
- [x] Does not use SWE-bench test knowledge (`PASS_TO_PASS`, `FAIL_TO_PASS`)
- [x] Does not use the `hints` field in SWE-bench
- [x] Does not have web-browsing OR has taken steps to prevent lookup of SWE-bench solutions via web-browsing

### Evidence

- **Pass@1**: Each instance receives exactly one attempt. No retries or iterative refinement. The agent session is created once per instance and runs to completion. `num_repetitions: 1`, `retry_on_failure: false`.
- **No test knowledge**: The agent receives only the GitHub issue description (title + body), the repository name, and the base commit SHA. It does NOT receive failing test names, test file contents, `PASS_TO_PASS`, `FAIL_TO_PASS`, or `hints_text` fields.
- **No web browsing**: The agent operates in a sandboxed environment with repository-only file access tools (read, search, edit). No browser, no internet search, no access to GitHub issue pages or PR discussions beyond the issue description provided in the prompt.
