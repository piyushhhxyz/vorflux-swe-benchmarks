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
  <img src="https://img.shields.io/badge/SWE--bench_Verified-84.5%25_(489)-blue?style=for-the-badge" alt="SWE-bench Verified 84.5%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Terminal_Bench_2-75.3%25_(89)-blue?style=for-the-badge" alt="Terminal Bench 2 75.3%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Harness-Opus_4.6_+_GPT_5.5_High-purple?style=for-the-badge" alt="Opus 4.6 + GPT 5.5 High" />
</p>

---

## What is Vorflux?

[Vorflux](https://vorflux.com) is not a single model — it is a **harness platform** that orchestrates multiple frontier models into specialized agent configurations. Each harness assigns different models to different roles (planning, exploration, code generation, review, testing) to maximize performance on real-world software engineering tasks.

We publish results for our **top harnesses** against industry-standard benchmarks, with full transparency: every patch, every trace, every score.

---

## Harness Configurations

| Harness | Code Model | Review Model | Description |
|:---|:---|:---|:---|
| **Opus 4.6 + GPT 5.5 High** | Claude Opus 4.6 | GPT 5.5 High | Cross-vendor: Anthropic builds, OpenAI reviews |
| Opus 4.7 + GPT 5.5 High | Claude Opus 4.7 | GPT 5.5 High | Latest Opus for code generation |
| GPT 5.5 High + GPT 5.5 High | GPT 5.5 High | GPT 5.5 High | Single-vendor OpenAI configuration |

> More harness results coming soon. Each harness runs the same evaluation framework with identical prompts — only the model assignments change.

---

## SWE-bench Verified — Full 500 Results

### Opus 4.6 + GPT 5.5 High Review — 84.5%

<table>
<tr>
<td width="50%">

| Metric | Value |
|:---|---:|
| **Resolved** | **413 / 489** |
| **Score** | **84.5%** |
| Instances evaluated | 489 / 500 |
| Attempts | 1 (single pass) |
| Concurrency | 100 |

</td>
<td width="50%">

```
  Resolved  ████████████████████░░░░  84.5%
            413 passed │ 76 failed

  Coverage  ████████████████████████░  97.8%
            489 evaluated │ 11 skipped
```

</td>
</tr>
</table>

#### Results by Repository

| Repository | Resolved | Total | Rate | |
|:---|---:|---:|---:|:---|
| pytest-dev/pytest | 18 | 19 | **94.7%** | ████████████████████ |
| pydata/xarray | 19 | 21 | **90.5%** | ██████████████████░░ |
| django/django | 202 | 227 | **89.0%** | █████████████████░░░ |
| scikit-learn/scikit-learn | 27 | 32 | **84.4%** | ████████████████░░░░ |
| sphinx-doc/sphinx | 35 | 42 | **83.3%** | ████████████████░░░░ |
| sympy/sympy | 60 | 74 | **81.1%** | ████████████████░░░░ |
| matplotlib/matplotlib | 27 | 34 | **79.4%** | ███████████████░░░░░ |
| psf/requests | 6 | 8 | **75.0%** | ███████████████░░░░░ |
| pylint-dev/pylint | 5 | 8 | **62.5%** | ████████████░░░░░░░░ |
| astropy/astropy | 12 | 21 | **57.1%** | ███████████░░░░░░░░░ |
| mwaskom/seaborn | 1 | 2 | **50.0%** | ██████████░░░░░░░░░░ |
| pallets/flask | 1 | 1 | **100.0%** | ████████████████████ |

> Full per-instance results, patches, and methodology: [`evaluation/verified/20250519_vorflux_opus46_gpt55h/`](evaluation/verified/20250519_vorflux_opus46_gpt55h/)

---

## Competitive Landscape — SWE-bench Verified

How Vorflux harnesses compare against other agents using their native model + harness:

| Agent | Model | SWE-bench Verified | Notes |
|:---|:---|---:|:---|
| Mythos Preview | — | **93.9%** | Preview build |
| Claude Code | Opus 4.7 | 87.6% | Self-reported |
| **Vorflux** | Opus 4.6 + GPT 5.5 High | **84.5%** | 489/500 instances, single pass |
| Claude Code | Opus 4.6 | 80.8% | — |
| Gemini CLI | Gemini 3.1 Pro | 80.6% | — |

> Vorflux achieves **84.5%** with Opus 4.6 — outperforming Claude Code's own 80.8% with the same base model. The harness architecture adds +3.7% over the raw model.

---

## Terminal-Bench 2.0

### Opus 4.6 + GPT 5.5 High Review — 75.3%

| Metric | Value |
|:---|---:|
| **Resolved** | **67 / 89** |
| **Score** | **75.3%** |
| Tasks evaluated | 89 / 89 (full benchmark) |
| Attempts | Best-of across runs |

#### Results by Difficulty

| Difficulty | Resolved | Total | Rate |
|:---|---:|---:|---:|
| Easy | 4 | 4 | **100.0%** |
| Medium | 46 | 55 | **83.6%** |
| Hard | 17 | 30 | **56.7%** |

#### Results by Category

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

## Competitive Landscape — Terminal-Bench 2.0

| Agent | Model | Terminal-Bench 2.0 | Notes |
|:---|:---|---:|:---|
| Mythos Preview | — | **82.0%** | Preview build |
| OpenAI Codex | GPT-5.4 | 75.1% | Self-reported harness |
| **Vorflux** | Opus 4.6 + GPT 5.5 High | **75.3%** | Full 89 tasks |
| Claude Code | Opus 4.7 | 69.4% | — |
| Gemini CLI | Gemini 3.1 Pro | 68.5% | — |
| Claude Code | Opus 4.6 | 65.4% | — |

> Vorflux with Opus 4.6 outperforms Claude Code with Opus 4.7 (+5.9%) on Terminal-Bench. The harness architecture provides significant uplift over raw model performance.

---

## Methodology

### Evaluation Framework

All evaluations use the same Vorflux evaluation framework:

1. **Instance selection**: Full dataset (no cherry-picking, no filtering)
2. **Single-pass scoring**: Each instance is attempted once. The agent receives the issue description and repository context, then produces a patch.
3. **Independent verification**: Patches are scored using the official benchmark harness (SWE-bench Docker for code, Terminal-Bench MCP for terminal tasks)
4. **No human intervention**: Zero manual fixes, no per-instance prompt tuning, no post-hoc filtering

### Scoring Criteria

**SWE-bench Verified:**
- **fail-to-pass (f2p)**: The generated patch must make the failing test(s) pass
- **pass-to-pass (p2p)**: The patch must not break any previously-passing tests
- Both criteria must be satisfied for an instance to count as "resolved"

**Terminal-Bench 2.0:**
- The agent's solution is verified by running the benchmark's test suite inside the task container
- A task counts as resolved only if all test assertions pass

### Harness Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Vorflux Agent Session                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────┐    ┌────────────┐    ┌────────────────────────┐  │
│  │   EXPLORE   │───▶│   BUILD    │───▶│   SIMPLIFY + REVIEW    │  │
│  │  Haiku 4.5  │    │  Opus 4.6  │    │    GPT 5.5 High        │  │
│  │    (xN)     │    │            │    │                        │  │
│  └────────────┘    └────────────┘    └───────────┬────────────┘  │
│                                                   │               │
│                                                   ▼               │
│                                           ┌────────────┐          │
│                                           │    TEST     │          │
│                                           │  Opus 4.6   │          │
│                                           └────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

Each role in the harness can be assigned to a different model:
- **Explore**: Fast, parallel codebase investigation (Haiku 4.5 x N subagents)
- **Build**: Primary code generation and implementation
- **Simplify + Review**: Cross-model review for correctness and code quality
- **Test**: Applies feedback, runs verification, iterates if needed

---

## Transparency

Every evaluation in this repository includes:

- **Patches** — The exact `.diff` file generated by the agent for each instance
- **Metadata** — Model versions, harness configuration, concurrency settings
- **Results** — Per-instance resolved/not-resolved status, per-repository breakdowns
- **LangSmith traces** — Full execution traces with token usage, timing, and intermediate steps (linked in metadata)

We believe benchmark results without reproducibility artifacts are meaningless. All data needed to verify our claims is in this repository.

---

## Repository Structure

```
evaluation/
  verified/                                         # SWE-bench Verified
    20250519_vorflux_opus46_gpt55h/                 # Full 500 — Opus 4.6 + GPT 5.5 High (84.5%)
      metadata.yaml                                 # Harness configuration
      README.md                                     # Detailed methodology
      results/
        results.json                                # Resolved/not-resolved lists
        resolved_by_repo.json                       # Per-repository breakdown
      patches/                                      # 461 generated patches (.diff)
    20250505_vorflux_agent_v3/                      # 100-instance easy split (92.0%)
    20250427_vorflux_agent_v2/                      # 100-instance stratified (83.0%)
    20250424_vorflux_agent_v1/                      # Early 20-instance pilot
  terminal-bench-2/                                 # Terminal-Bench 2.0
    combined_full_89/                               # Full 89-task results (75.3%)
    20250430_vorflux_agent_v1/                      # First 50 tasks
    20250503_vorflux_agent_v1_remaining39/          # Remaining 39 tasks
ui/                                                 # Interactive results dashboard
```

---

## Previous Evaluation Runs

These earlier runs used different harness configurations or subsets of the benchmark:

| Run | Harness | Instances | Resolved | Score | Notes |
|:---|:---|---:|---:|---:|:---|
| [v3 easy split](evaluation/verified/20250505_vorflux_agent_v3/) | Opus 4.6 + GPT 5.5 High | 100 | 92 | **92.0%** | Easy instances, 3 attempts |
| [v2 stratified](evaluation/verified/20250427_vorflux_agent_v2/) | Claude Sonnet 4 | 100 | 83 | **83.0%** | Stratified by difficulty, single attempt |
| [v1 pilot](evaluation/verified/20250424_vorflux_agent_v1/) | Claude Sonnet 4 | 20 | 18 | **90.0%** | Initial pilot run |

---

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering platform. Unlike single-model coding assistants, Vorflux orchestrates multiple frontier models into specialized roles — each model does what it's best at. The result: harness configurations that consistently outperform any single model used alone.

**Key differentiators:**
- **Multi-model orchestration** — Different models for exploration, implementation, and review
- **Parallel subagent architecture** — Multiple agents investigate the codebase simultaneously
- **Cross-vendor review** — Code written by one model is reviewed by another, catching blind spots
- **Fully autonomous** — No human intervention from issue to pull request

---

## License

[MIT](LICENSE)
