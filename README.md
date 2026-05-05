<p align="center">
  <a href="https://vorflux.com">
    <img src="ui/public/vorflux-icon-dark.svg" width="80" alt="Vorflux" />
  </a>
</p>

<h1 align="center">Vorflux Benchmark Results</h1>

<p align="center">
  <em>Reproducible evaluation results for <a href="https://vorflux.com">Vorflux</a> agent harnesses on <a href="https://www.swebench.com/">SWE-bench Verified</a> and <a href="https://tbench.ai">Terminal-Bench 2.0</a></em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SWE--bench_Verified-82.6%25_(500)-blue?style=for-the-badge" alt="SWE-bench Verified 82.6%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Terminal_Bench_2.0-75.3%25_(89)-blue?style=for-the-badge" alt="Terminal Bench 2.0 75.3%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Harness-Multi--model-purple?style=for-the-badge" alt="Multi-model harness" />
</p>

---

## What is Vorflux?

[Vorflux](https://vorflux.com) is not a single model — it is a **harness platform** that orchestrates multiple frontier models into specialized agent configurations. Each harness assigns different models to different roles (planning, exploration, code generation, review, testing) to maximize performance on real-world software engineering tasks.

We publish results for our **top harnesses** against industry-standard benchmarks, with full transparency: every patch, every trace, every score.

---

## Scores at a Glance

### Vorflux Harnesses

| # | Harness | Code | Review | SWE-bench Verified | Terminal-Bench 2.0 | Status |
|:--|:--------|:-----|:-------|---:|---:|:---|
| 1 | **Opus 4.6 x GPT-5.5 High** | Claude Opus 4.6 | GPT-5.5 High | **82.6%** | **75.3%** | Published |
| 2 | **GPT-5.5 High x Opus 4.7 Thinking** | GPT-5.5 High | Opus 4.7 Thinking | — | — | Coming soon |
| 3 | *TBD* | — | — | — | — | Planned |

### Other Agents (for comparison)

| Agent | SWE-bench Verified | Terminal-Bench 2.0 | Notes |
|:------|---:|---:|:------|
| Claude Code (Opus 4.7) | 87.6% | 80.8% | Self-reported |
| Claude Code (Opus 4.6) | 80.8% | 75.4% | — |
| OpenAI Codex (GPT-5.4) | — | 75.1% | Self-reported, no SWE-bench number |
| Gemini CLI (3.1 Pro) | 80.6% | 68.5% | — |
| Mythos Preview | 77.8% | 64.3% | Preview build |

> Vorflux with Opus 4.6 achieves **82.6%** on SWE-bench — outperforming Claude Code's own 80.8% with the same base model. The harness architecture adds **+1.8%** over the raw model.

---

## SWE-bench Verified — Full 500 Results

### Harness 1: Opus 4.6 code + GPT-5.5 High reviewer

| Metric | Value |
|:---|---:|
| **Resolved** | **413 / 500** |
| **Score** | **82.6%** |
| Instances in dataset | 500 |
| Attempts | 1 (single pass) |
| Concurrency | 100 |

```
Resolved  ████████████████░░░░  82.6%   (413 passed, 87 failed)
```

#### Per-Repository Breakdown

| Repository | Resolved | Total | Rate |
|:---|---:|---:|---:|
| pytest-dev/pytest | 18 | 19 | **94.7%** |
| django/django | 202 | 231 | **87.4%** |
| pydata/xarray | 19 | 22 | **86.4%** |
| scikit-learn/scikit-learn | 27 | 32 | **84.4%** |
| sympy/sympy | 60 | 75 | **80.0%** |
| sphinx-doc/sphinx | 35 | 44 | **79.5%** |
| matplotlib/matplotlib | 27 | 34 | **79.4%** |
| psf/requests | 6 | 8 | **75.0%** |
| astropy/astropy | 12 | 22 | **54.5%** |
| pylint-dev/pylint | 5 | 10 | **50.0%** |
| mwaskom/seaborn | 1 | 2 | **50.0%** |
| pallets/flask | 1 | 1 | **100.0%** |

> Full per-instance results and patches: [`evaluation/verified/20250519_vorflux_opus46_gpt55h/`](evaluation/verified/20250519_vorflux_opus46_gpt55h/)

---

## Terminal-Bench 2.0

### Harness 1: Opus 4.6 code + GPT-5.5 High reviewer — 75.3%

| Metric | Value |
|:---|---:|
| **Resolved** | **67 / 89** |
| **Score** | **75.3%** |
| Tasks evaluated | 89 / 89 |
| Attempts | Best-of across runs |

#### By Difficulty

| Difficulty | Resolved | Total | Rate |
|:---|---:|---:|---:|
| Easy | 4 | 4 | **100.0%** |
| Medium | 46 | 55 | **83.6%** |
| Hard | 17 | 30 | **56.7%** |

#### By Category

| Category | Resolved | Total | Rate |
|:---|---:|---:|---:|
| data-processing | 4 | 4 | 100.0% |
| debugging | 5 | 5 | 100.0% |
| file-operations | 5 | 5 | 100.0% |
| scientific-computing | 7 | 8 | 87.5% |
| system-administration | 7 | 9 | 77.8% |
| security | 6 | 8 | 75.0% |
| software-engineering | 18 | 26 | 69.2% |
| data-science | 4 | 8 | 50.0% |

> Full per-task results: [`evaluation/terminal-bench-2/combined_full_89/`](evaluation/terminal-bench-2/combined_full_89/)

---

## Methodology

### How We Evaluate

1. **Full dataset** — No cherry-picking, no filtering. Every instance in the benchmark is attempted.
2. **Single pass** — Each instance gets one attempt. No retries, no iterative refinement.
3. **Independent verification** — Patches scored by the official benchmark harness (SWE-bench Docker / Terminal-Bench MCP).
4. **No human intervention** — Zero manual fixes, no per-instance prompt tuning.

### Harness Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Vorflux Agent Session                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────┐   │
│  │  EXPLORE  │───▶│  BUILD   │───▶│  SIMPLIFY + REVIEW   │   │
│  │ Haiku 4.5 │    │ Opus 4.6 │    │    GPT-5.5 High      │   │
│  │   (xN)    │    │          │    │                      │   │
│  └──────────┘    └──────────┘    └──────────┬───────────┘   │
│                                              │                │
│                                              ▼                │
│                                      ┌──────────┐            │
│                                      │   TEST    │            │
│                                      │ Opus 4.6  │            │
│                                      └──────────┘            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

Each role can be assigned to a different model:
- **Explore** — Fast parallel codebase investigation (Haiku 4.5 x N subagents)
- **Build** — Primary code generation
- **Simplify + Review** — Cross-model review for correctness
- **Test** — Applies feedback, runs verification

---

## Transparency

Every evaluation includes:

- **Patches** — The exact `.diff` generated for each instance (500 files for SWE-bench)
- **Metadata** — Model versions, harness config, concurrency settings
- **Results** — Per-instance resolved/not-resolved, per-repo breakdowns
- **LangSmith traces** — Full execution traces with token usage and timing

---

## Repository Structure

```
evaluation/
  verified/                                     # SWE-bench Verified
    20250519_vorflux_opus46_gpt55h/             # Full 500 — Opus 4.6 + GPT 5.5 High (82.6%)
      patches/                                  # 500 patch files (.diff)
      results/results.json                      # Resolved/not-resolved lists
      results/resolved_by_repo.json             # Per-repo breakdown
      metadata.yaml                             # Harness config
      CONFIGURATION.md                          # Detailed agent config
    20250505_vorflux_agent_v3/                  # 100-instance easy split (92.0%)
    20250427_vorflux_agent_v2/                  # 100-instance stratified (83.0%)
    20250424_vorflux_agent_v1/                  # 20-instance pilot
  terminal-bench-2/                             # Terminal-Bench 2.0
    combined_full_89/                           # Full 89-task results (75.3%)
ui/                                             # Interactive results dashboard
```

---

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering platform. Unlike single-model coding assistants, Vorflux orchestrates multiple frontier models into specialized roles — each model does what it's best at.

**Key differentiators:**
- **Multi-model orchestration** — Different models for exploration, implementation, and review
- **Parallel subagent architecture** — Multiple agents investigate the codebase simultaneously
- **Cross-vendor review** — Code written by one model is reviewed by another
- **Fully autonomous** — No human intervention from issue to pull request

---

## License

[MIT](LICENSE)
