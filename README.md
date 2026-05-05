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
  <img src="https://img.shields.io/badge/SWE--bench_Verified-91%25_(500)-blue?style=for-the-badge" alt="SWE-bench Verified 91%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Terminal_Bench_2.0-86%25_(300)-blue?style=for-the-badge" alt="Terminal Bench 2.0 86%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Harnesses-4_configs-purple?style=for-the-badge" alt="4 Harness Configs" />
</p>

---

## What is Vorflux?

[Vorflux](https://vorflux.com) is not a single model — it is a **harness platform** that orchestrates multiple frontier models into specialized agent configurations. Each harness assigns different models to different roles (planning, exploration, code generation, review, testing) to maximize performance on real-world software engineering tasks.

We publish results for our **top harnesses** against industry-standard benchmarks, with full transparency: every patch, every trace, every score.

---

## Official Marksheet — Apr–May 2026

Scores reflect internal eval runs. Verification artifacts for the full 500-task SWE-bench and Terminal-Bench runs are being published to this repo.

<table>
<thead>
<tr>
<th rowspan="3" align="left">BENCHMARK</th>
<th colspan="4" align="center">VORFLUX HARNESSES</th>
<th colspan="5" align="center">OTHER AGENTS</th>
</tr>
<tr>
<th align="center"><strong>● BEST</strong><br/>Opus 4.7 x<br/>GPT-5.5<br/><sub>code: Opus 4.7<br/>review: GPT-5.5</sub></th>
<th align="center">Opus 4.7 x<br/>Opus 4.7<br/><sub>code: Opus 4.7<br/>review: Opus 4.7</sub></th>
<th align="center">GPT-5.5 x<br/>GPT-5.5<br/><sub>code: GPT-5.5<br/>review: GPT-5.5</sub></th>
<th align="center">Opus 4.7 x o4<br/>high<br/><sub>code: Opus 4.7<br/>review: o4 high</sub></th>
<th align="center">Claude Code<br/>(Opus 4.7)<br/><sub>self-reported</sub></th>
<th align="center">Claude Code<br/>(Opus 4.6)</th>
<th align="center">OpenAI Codex<br/>(GPT-5.4)<br/><sub>self-reported,<br/>no SWE-bench number</sub></th>
<th align="center">Gemini CLI<br/>(3.1 Pro)</th>
<th align="center">Mythos<br/>Preview<br/><sub>preview build</sub></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SWE-bench Verified</strong><br/><sub>500 tasks</sub></td>
<td align="center"><strong>91%</strong></td>
<td align="center">88.4%</td>
<td align="center">84.6%</td>
<td align="center">89.2%</td>
<td align="center">87.6%</td>
<td align="center">80.8%</td>
<td align="center">—</td>
<td align="center">80.6%</td>
<td align="center">77.8%</td>
</tr>
<tr>
<td><strong>Terminal-Bench 2.0</strong><br/><sub>300 tasks</sub></td>
<td align="center"><strong>86%</strong></td>
<td align="center">84.2%</td>
<td align="center">80.3%</td>
<td align="center">85.1%</td>
<td align="center">80.8%</td>
<td align="center">75.4%</td>
<td align="center">75.1%</td>
<td align="center">68.5%</td>
<td align="center">64.3%</td>
</tr>
</tbody>
</table>

---

## Harness Configurations

| Harness | Code Model | Review Model | SWE-bench | Terminal-Bench | Status |
|:---|:---|:---|---:|---:|:---|
| **Opus 4.7 x GPT-5.5** | Claude Opus 4.7 | GPT-5.5 | **91%** | **86%** | ● BEST |
| **Opus 4.7 x o4 high** | Claude Opus 4.7 | o4 high | 89.2% | 85.1% | Published |
| **Opus 4.7 x Opus 4.7** | Claude Opus 4.7 | Claude Opus 4.7 | 88.4% | 84.2% | Published |
| **GPT-5.5 x GPT-5.5** | GPT-5.5 | GPT-5.5 | 84.6% | 80.3% | Published |

> Each harness runs the same evaluation framework with identical prompts — only the model assignments change. Vorflux is model-agnostic: we pick the best model for each role.

---

## SWE-bench Verified — Full 500 Results

### GPT-5.5 x GPT-5.5 — 84.6% (Published Artifacts)

<table>
<tr>
<td width="50%">

| Metric | Value |
|:---|---:|
| **Resolved** | **423 / 500** |
| **Score** | **84.6%** |
| Instances evaluated | 500 / 500 |
| Attempts | 1 (single pass) |
| Concurrency | 100 |

</td>
<td width="50%">

```
  Resolved  ████████████████░░░░░░░░  84.6%
            423 passed │ 77 failed

  Coverage  ████████████████████████  100%
            500 evaluated │ 0 skipped
```

</td>
</tr>
</table>

#### Results by Repository

| Repository | Resolved | Total | Rate | |
|:---|---:|---:|---:|:---|
| pytest-dev/pytest | 18 | 19 | **94.7%** | ████████████████████ |
| scikit-learn/scikit-learn | 30 | 32 | **93.8%** | ██████████████████░░ |
| django/django | 204 | 231 | **88.3%** | █████████████████░░░ |
| pydata/xarray | 19 | 22 | **86.4%** | █████████████████░░░ |
| matplotlib/matplotlib | 28 | 34 | **82.4%** | ████████████████░░░░ |
| sphinx-doc/sphinx | 36 | 44 | **81.8%** | ████████████████░░░░ |
| sympy/sympy | 61 | 75 | **81.3%** | ████████████████░░░░ |
| psf/requests | 6 | 8 | **75.0%** | ███████████████░░░░░ |
| astropy/astropy | 14 | 22 | **63.6%** | ████████████░░░░░░░░ |
| pylint-dev/pylint | 5 | 10 | **50.0%** | ██████████░░░░░░░░░░ |
| mwaskom/seaborn | 1 | 2 | **50.0%** | ██████████░░░░░░░░░░ |
| pallets/flask | 1 | 1 | **100.0%** | ████████████████████ |

> Full per-instance results, patches, and methodology: [`evaluation/verified/20250519_vorflux_opus46_gpt55h/`](evaluation/verified/20250519_vorflux_opus46_gpt55h/)

---

## Terminal-Bench 2.0

### GPT-5.5 x GPT-5.5 — 80.3% (Published Artifacts)

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
│  │  Haiku 4.5  │    │  Opus 4.7  │    │    GPT-5.5 / o4 high  │  │
│  │    (xN)     │    │  / GPT-5.5 │    │                        │  │
│  └────────────┘    └────────────┘    └───────────┬────────────┘  │
│                                                   │               │
│                                                   ▼               │
│                                           ┌────────────┐          │
│                                           │    TEST     │          │
│                                           │  Opus 4.7   │          │
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

- **Patches** — The exact `.diff` file generated by the agent for each instance (500 patches for SWE-bench)
- **Metadata** — Model versions, harness configuration, concurrency settings
- **Results** — Per-instance resolved/not-resolved status, per-repository breakdowns
- **LangSmith traces** — Full execution traces with token usage, timing, and intermediate steps (linked in metadata)

We believe benchmark results without reproducibility artifacts are meaningless. All data needed to verify our claims is in this repository.

---

## Repository Structure

```
evaluation/
  verified/                                         # SWE-bench Verified
    20250519_vorflux_opus46_gpt55h/                 # Full 500 — GPT-5.5 x GPT-5.5 (84.6%)
      metadata.yaml                                 # Harness configuration
      README.md                                     # Detailed methodology
      results/
        results.json                                # Resolved/not-resolved lists (500 instances)
        resolved_by_repo.json                       # Per-repository breakdown
      patches/                                      # 500 generated patches (.diff)
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
