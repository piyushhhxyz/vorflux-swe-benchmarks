# Vorflux Agent — Opus 4.6 + GPT-5.5 High

## Harness: `opus-4.6-code` + `gpt-5.5-high-review`

Full evaluation of the **Opus 4.6 code + GPT-5.5 High reviewer** harness on SWE-bench Verified (500 instances).

---

## Summary

| Metric | Value |
|:---|---:|
| **Harness** | Opus 4.6 (code) + GPT-5.5 High (review) |
| **Benchmark** | SWE-bench Verified (500 instances) |
| **Instances evaluated** | 500 / 500 |
| **Resolved** | **413 / 500 (82.6%)** |
| **Not resolved** | 87 |
| **Attempts** | 1 (single pass, no retries) |
| **Concurrency** | 100 parallel sessions |
| **Scoring** | SWE-bench Docker harness (fail-to-pass + pass-to-pass) |
| **LangSmith Experiment** | [`opus-gpt-harness-full-run`](https://smith.langchain.com/o/vorflux/datasets/881258bb-15b2-479b-b0f5-309711fc0b25/compare?selectedSessions=34f15aa8-4c43-4946-a83e-24341253ac2d) |

> 11 instances could not be evaluated due to infrastructure issues (Docker image unavailable or session creation failures). They are counted as not resolved.

---

## Results by Repository

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

---

## Methodology

1. **Single-pass evaluation**: Each instance is attempted exactly once — no retries, no iterative refinement, no per-instance tuning.
2. **Harness configuration**: The agent uses Claude Opus 4.6 for code generation (planning, exploration, implementation) and GPT-5.5 High for code review (simplify + review loop).
3. **Concurrency**: 100 instances run in parallel via the Vorflux evaluation framework.
4. **Scoring**: Each generated patch is verified using the official SWE-bench Docker harness. A patch must satisfy both fail-to-pass (f2p) and pass-to-pass (p2p) criteria.
5. **No human intervention**: Zero manual fixes, no per-instance prompt tuning, no post-hoc filtering.

---

## Artifacts

| Artifact | Description |
|:---|:---|
| `results/results.json` | Full resolved/not-resolved instance lists |
| `results/resolved_by_repo.json` | Per-repository breakdown |
| `patches/*.diff` | 500 patch files (one per instance, empty for unresolved) |
| `metadata.yaml` | Harness configuration and model versions |
| `CONFIGURATION.md` | Detailed agent configuration |

---

## Reproducibility

All 500 patch files are in the `patches/` directory. Resolved instances have the actual generated diff. Unresolved instances have an empty placeholder (the agent attempted but did not produce a valid fix, or the instance could not be evaluated).

To verify any individual result:
1. Check out the target repository at the specified commit
2. Apply the patch from `patches/<instance_id>.diff`
3. Run the SWE-bench Docker harness for that instance
