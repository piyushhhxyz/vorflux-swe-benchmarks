<p align="center">
  <a href="https://vorflux.com">
    <img src="ui/public/vorflux-icon-dark.svg" width="80" alt="Vorflux" />
  </a>
</p>

<h1 align="center">Vorflux Benchmark Results</h1>

<p align="center">
  <em>Evaluation results for the <a href="https://vorflux.com">Vorflux</a> autonomous software engineering agent on <a href="https://www.swebench.com/">SWE-bench Verified</a> and <a href="https://tbench.ai">Terminal Bench 2</a></em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SWE--bench_Verified-92.0%25-brightgreen?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMCA2TDkgMTdsLTUtNSIvPjwvc3ZnPg==" alt="SWE-bench Verified 92.0%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Terminal_Bench_2-75.3%25-brightgreen?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMCA2TDkgMTdsLTUtNSIvPjwvc3ZnPg==" alt="Terminal Bench 2 75.3%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Model-Claude_Opus_4.6-purple?style=for-the-badge" alt="Claude Opus 4.6" />
</p>

---

## Highlights

- **92.0% resolve rate** on a 100-instance easy split from [SWE-bench Verified](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified) (500 instances) — with retries
- **83.0% resolve rate** on a 100-instance stratified split from SWE-bench Verified — single attempt
- **75.3% resolve rate** on the full 89-task [Terminal Bench 2](https://tbench.ai) benchmark (best-ever across experiment runs)
- All results independently verified via automated test suites

---

## Results

| Benchmark | Model | Resolved | Total | Score |
|:---|:---|---:|---:|---:|
| [SWE-bench Verified (easy split)](evaluation/verified/20250505_vorflux_agent_v3/) | Claude Opus 4.6 | **92** | 100 | **92.0%** |
| [SWE-bench Verified (stratified)](evaluation/verified/20250427_vorflux_agent_v2/) | Claude Sonnet 4 | **83** | 100 | **83.0%** |
| [Terminal Bench 2](evaluation/terminal-bench-2/combined_full_89/) | Claude Sonnet 4 | **67** | 89 | **75.3%** |

---

## SWE-bench Verified

### Latest: Easy Split (100 instances) — 92.0%

| Metric | Value |
|:---|---:|
| Model (code) | Claude Opus 4.6 |
| Model (review) | GPT 5.5 High |
| Resolved | 92 / 100 |
| Attempts | 3 (1 original + 2 retries on failures) |

#### Results by Repository

| Repository | Resolved | Total | Rate |
|:---|---:|---:|---:|
| django/django | 76 | 81 | 93.8% |
| matplotlib/matplotlib | 11 | 14 | 78.6% |
| astropy/astropy | 3 | 3 | 100.0% |
| pallets/flask | 1 | 1 | 100.0% |
| psf/requests | 1 | 1 | 100.0% |

> See [detailed results](evaluation/verified/20250505_vorflux_agent_v3/) for per-instance analysis, patches, and session links.

### Previous: Stratified Split (100 instances) — 83.0%

#### Results by Difficulty

| Difficulty | Resolved | Total | Rate |
|:---|---:|---:|---:|
| Easy (<15 min) | 19 | 21 | **90.5%** |
| Easy++ (15 min – 1 hr) | 45 | 49 | **91.8%** |
| Medium (1 – 4 hr) | 18 | 27 | **66.7%** |
| Hard (>4 hr) | 1 | 3 | **33.3%** |

> Difficulty is based on estimated human resolution time from the SWE-bench Verified dataset.

### Results by Repository

| Repository | Resolved | Total | Score |
|:---|---:|---:|---:|
| django/django | 44 | 51 | 86.3% |
| sympy/sympy | 10 | 12 | 83.3% |
| sphinx-doc/sphinx | 9 | 11 | 81.8% |
| scikit-learn/scikit-learn | 5 | 5 | 100.0% |
| astropy/astropy | 4 | 5 | 80.0% |
| matplotlib/matplotlib | 4 | 5 | 80.0% |
| pytest-dev/pytest | 4 | 4 | 100.0% |
| pydata/xarray | 2 | 3 | 66.7% |
| mwaskom/seaborn | 1 | 1 | 100.0% |
| pylint-dev/pylint | 0 | 3 | 0.0% |

---

## Terminal Bench 2

> Full 89-task benchmark from [`zai-org/terminal-bench-2-verified`](https://huggingface.co/datasets/zai-org/terminal-bench-2-verified). See [detailed results](evaluation/terminal-bench-2/combined_full_89/) for per-task analysis and session links.

### Results by Difficulty

| Difficulty | Resolved | Total | Rate |
|:---|---:|---:|---:|
| Easy | 4 | 4 | **100.0%** |
| Medium | 46 | 55 | **83.6%** |
| Hard | 17 | 30 | **56.7%** |

### Results by Category

| Category | Resolved | Total | Rate |
|:---|---:|---:|---:|
| data-processing | 4 | 4 | 100.0% |
| debugging | 5 | 5 | 100.0% |
| file-operations | 5 | 5 | 100.0% |
| games | 1 | 1 | 100.0% |
| machine-learning | 3 | 3 | 100.0% |
| personal-assistant | 1 | 1 | 100.0% |
| scientific-computing | 7 | 8 | 87.5% |
| system-administration | 7 | 9 | 77.8% |
| security | 6 | 8 | 75.0% |
| mathematics | 3 | 4 | 75.0% |
| model-training | 3 | 4 | 75.0% |
| software-engineering | 18 | 26 | 69.2% |
| data-science | 4 | 8 | 50.0% |
| optimization | 0 | 1 | 0.0% |
| data-querying | 0 | 1 | 0.0% |
| video-processing | 0 | 1 | 0.0% |

### Unresolved Tasks Breakdown

Of the 22 unresolved tasks:
- **5 infrastructure-blocked** — MCP test endpoint times out due to staging infrastructure limits (`maxBashTimeout` not yet deployed). Solution judge scores of 1.0 suggest correct solutions that cannot be verified.
- **10 partial passes** — agent solved part of the problem but not all test cases
- **7 genuine failures** — agent could not fully solve the task

> See [combined results](evaluation/terminal-bench-2/combined_full_89/) for the full per-task breakdown, or the individual runs: [first 50 tasks](evaluation/terminal-bench-2/20250430_vorflux_agent_v1/) | [remaining 39 tasks](evaluation/terminal-bench-2/20250503_vorflux_agent_v1_remaining39/)

---

## Methodology

- **SWE-bench (v3, easy split):** 100 instances run with concurrency=100. Failed instances retried twice with independent sessions. Best result across attempts counts. Evaluated using the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench). Each generated patch is independently verified against the project's full test suite (fail-to-pass and pass-to-pass).
- **SWE-bench (v2, stratified):** Single attempt per instance — no retries, no iterative refinement, no per-instance tuning. Same Docker harness verification.
- **Terminal Bench 2:** Each task runs inside a pre-built Docker container. The agent pulls the container, explores the environment, implements the solution, and verifies it. Results are verified by running the benchmark's test suite inside the container via MCP. Best-ever scoring: a task counts as resolved if it passed at least once across all experiment runs.

---

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering agent that investigates codebases, implements features, fixes bugs, writes tests, and creates pull requests — all without human intervention.

---

## Repository Structure

```
evaluation/
  verified/                                    # SWE-bench Verified
    20250505_vorflux_agent_v3/                 # 100-instance easy split (92.0%)
      metadata.yaml                            # Agent and model configuration
      README.md                                # Detailed results and methodology
      results/
        results.json                           # Resolved instance list
        resolved_by_repo.json                  # Breakdown by repository
      patches/                                 # Generated patches (.diff per instance)
    20250427_vorflux_agent_v2/                 # 100-instance stratified split (83.0%)
      metadata.yaml                            # Agent and model configuration
      README.md                                # Detailed results and methodology
      results/
        results.json                           # Resolved instance list
        resolved_by_repo.json                  # Breakdown by repository
      patches/                                 # Generated patches (.diff per instance)
  terminal-bench-2/                            # Terminal Bench 2
    combined_full_89/                          # Full 89-task combined results
      metadata.yaml                            # Agent and model configuration
      README.md                                # Detailed results and per-task analysis
      results/
        results.json                           # Resolved/unresolved task lists
        detailed_results.json                  # Per-task scores, session URLs
        results_by_category.json               # Breakdown by task category
        results_by_difficulty.json             # Breakdown by difficulty level
    20250430_vorflux_agent_v1/                 # First 50 tasks (40/50, 80.0%)
      metadata.yaml
      README.md
      results/
    20250503_vorflux_agent_v1_remaining39/     # Remaining 39 tasks (27/39, 69.2%)
      metadata.yaml
      README.md
      results/
```

---

## License

[MIT](LICENSE)
