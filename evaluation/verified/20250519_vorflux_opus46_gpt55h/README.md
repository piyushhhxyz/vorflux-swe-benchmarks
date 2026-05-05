# Vorflux Agent — Opus 4.6 + GPT 5.5 High Review

## Harness: `opus-4.6-code` + `gpt-5.5-high-review`

Full evaluation of the **Opus 4.6 code + GPT 5.5 High reviewer** harness on SWE-bench Verified (500 instances).

---

## Summary

| Metric | Value |
|:---|---:|
| **Harness** | Opus 4.6 (code) + GPT 5.5 High (review) |
| **Benchmark** | SWE-bench Verified (500 instances) |
| **Instances evaluated** | 489 / 500 |
| **Resolved** | **413 / 489 (84.5%)** |
| **Not resolved** | 76 |
| **Attempts** | 1 (single pass, no retries) |
| **Concurrency** | 100 parallel sessions |
| **Scoring** | SWE-bench Docker harness (fail-to-pass + pass-to-pass) |
| **LangSmith Experiment** | [`opus-gpt-harness-full-run`](https://smith.langchain.com/o/vorflux/datasets/881258bb-15b2-479b-b0f5-309711fc0b25/compare?selectedSessions=34f15aa8-4c43-4946-a83e-24341253ac2d) |

> 11 instances from the dataset were not evaluated due to infrastructure issues (Docker image unavailable or session creation failures).

---

## Results by Repository

| Repository | Resolved | Total | Rate |
|:---|---:|---:|---:|
| django/django | 202 | 227 | **89.0%** |
| sympy/sympy | 60 | 74 | **81.1%** |
| sphinx-doc/sphinx | 35 | 42 | **83.3%** |
| matplotlib/matplotlib | 27 | 34 | **79.4%** |
| scikit-learn/scikit-learn | 27 | 32 | **84.4%** |
| pydata/xarray | 19 | 21 | **90.5%** |
| pytest-dev/pytest | 18 | 19 | **94.7%** |
| astropy/astropy | 12 | 21 | **57.1%** |
| pylint-dev/pylint | 5 | 8 | **62.5%** |
| psf/requests | 6 | 8 | **75.0%** |
| mwaskom/seaborn | 1 | 2 | **50.0%** |
| pallets/flask | 1 | 1 | **100.0%** |

---

## Methodology

1. **Single-pass evaluation**: Each instance is attempted exactly once — no retries, no iterative refinement, no per-instance tuning.
2. **Harness configuration**: The agent uses Claude Opus 4.6 for code generation (planning, exploration, implementation) and GPT 5.5 High for code review (simplify + review loop).
3. **Concurrency**: 100 instances run in parallel via the Vorflux evaluation framework.
4. **Scoring**: Each generated patch is independently verified using the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench):
   - **fail-to-pass (f2p)**: The patch must make previously-failing tests pass.
   - **pass-to-pass (p2p)**: The patch must not break any previously-passing tests.
5. **Transparency**: All generated patches are available in the [`patches/`](./patches/) directory.

---

## Harness Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vorflux Agent Session                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐   │
│  │  EXPLORE  │───▶│  BUILD   │───▶│  SIMPLIFY+REVIEW │   │
│  │ Haiku 4.5 │    │ Opus 4.6 │    │  GPT 5.5 High    │   │
│  │   (xN)    │    │          │    │                  │   │
│  └──────────┘    └──────────┘    └────────┬─────────┘   │
│                                           │              │
│                                           ▼              │
│                                    ┌──────────┐          │
│                                    │   TEST   │          │
│                                    │ Opus 4.6 │          │
│                                    └──────────┘          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

- **Explore**: Multiple Haiku 4.5 subagents investigate the codebase in parallel
- **Build**: Opus 4.6 implements the fix based on exploration results
- **Simplify + Review**: GPT 5.5 High reviews the implementation for correctness and simplicity
- **Test**: Opus 4.6 applies review feedback and verifies the solution

---

## File Structure

```
20250519_vorflux_opus46_gpt55h/
├── metadata.yaml              # Harness and model configuration
├── README.md                  # This file
├── results/
│   ├── results.json           # Full resolved/not-resolved instance lists
│   └── resolved_by_repo.json  # Per-repository breakdown
└── patches/                   # Generated patches (one .diff per instance)
    ├── django__django-10554.diff
    ├── django__django-10973.diff
    ├── ...
    └── sympy__sympy-24661.diff
```

---

## Reproducibility

This evaluation can be reproduced using the Vorflux evaluation framework:

```bash
# From the cosmos repository
cd src/cosmos/evaluations

# Run with example-id-file for specific instances
python run_eval.py \
  --dataset vorflux-swe-bench-v1 \
  --experiment-name opus-gpt-harness-full-run \
  --concurrency 100 \
  --harness opus46-gpt55h
```

The LangSmith experiment contains full traces, token usage, and timing data for every instance.
