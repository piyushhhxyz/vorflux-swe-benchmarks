# Vorflux Agent — GPT-5.5 x GPT-5.5

## Harness: `gpt-5.5-code` + `gpt-5.5-review`

Full evaluation of the **GPT-5.5 x GPT-5.5** harness on SWE-bench Verified (500 instances).

---

## Summary

| Metric | Value |
|:---|---:|
| **Harness** | GPT-5.5 (code) + GPT-5.5 (review) |
| **Benchmark** | SWE-bench Verified (500 instances) |
| **Instances evaluated** | 500 / 500 |
| **Resolved** | **423 / 500 (84.6%)** |
| **Not resolved** | 77 |
| **Attempts** | 1 (single pass, no retries) |
| **Concurrency** | 100 parallel sessions |
| **Scoring** | SWE-bench Docker harness (fail-to-pass + pass-to-pass) |
| **LangSmith Experiment** | [`opus-gpt-harness-full-run`](https://smith.langchain.com/o/vorflux/datasets/881258bb-15b2-479b-b0f5-309711fc0b25/compare?selectedSessions=34f15aa8-4c43-4946-a83e-24341253ac2d) |

---

## Results by Repository

| Repository | Resolved | Total | Rate |
|:---|---:|---:|---:|
| pytest-dev/pytest | 18 | 19 | **94.7%** |
| scikit-learn/scikit-learn | 30 | 32 | **93.8%** |
| django/django | 204 | 231 | **88.3%** |
| pydata/xarray | 19 | 22 | **86.4%** |
| matplotlib/matplotlib | 28 | 34 | **82.4%** |
| sphinx-doc/sphinx | 36 | 44 | **81.8%** |
| sympy/sympy | 61 | 75 | **81.3%** |
| psf/requests | 6 | 8 | **75.0%** |
| astropy/astropy | 14 | 22 | **63.6%** |
| pylint-dev/pylint | 5 | 10 | **50.0%** |
| mwaskom/seaborn | 1 | 2 | **50.0%** |
| pallets/flask | 1 | 1 | **100.0%** |

---

## Methodology

1. **Single-pass evaluation**: Each instance is attempted exactly once — no retries, no iterative refinement, no per-instance tuning.
2. **Harness configuration**: The agent uses GPT-5.5 for code generation (planning, exploration, implementation) and GPT-5.5 for code review (simplify + review loop).
3. **Concurrency**: 100 instances run in parallel via the Vorflux evaluation framework.
4. **Scoring**: Each generated patch is verified using the official SWE-bench Docker harness. A patch must satisfy both fail-to-pass (f2p) and pass-to-pass (p2p) criteria.
5. **No human intervention**: Zero manual fixes, no per-instance prompt tuning, no post-hoc filtering.

---

## Artifacts

| Artifact | Description |
|:---|:---|
| `results/results.json` | Full resolved/not-resolved instance lists |
| `results/resolved_by_repo.json` | Per-repository breakdown |
| `patches/*.diff` | 500 generated patches (one per instance) |
| `metadata.yaml` | Harness configuration and model versions |
| `CONFIGURATION.md` | Detailed agent configuration |

---

## Reproducibility

All 500 patches are included in the `patches/` directory. Each `.diff` file corresponds to one SWE-bench instance. Patches for unresolved instances are empty (the agent attempted but did not produce a valid fix).

To verify any individual result:
1. Check out the target repository at the specified commit
2. Apply the patch from `patches/<instance_id>.diff`
3. Run the SWE-bench Docker harness for that instance
