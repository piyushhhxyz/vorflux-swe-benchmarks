<p align="center">
  <a href="https://vorflux.com">
    <img src="https://vorflux-assets-public.s3.us-east-2.amazonaws.com/ui-assets/vorflux-icon.svg" width="80" alt="Vorflux" />
  </a>
</p>

<h1 align="center">Vorflux SWE-Bench Results</h1>

<p align="center">
  <em>Evaluation results for the <a href="https://vorflux.com">Vorflux</a> autonomous software engineering agent on <a href="https://www.swebench.com/">SWE-bench Verified</a></em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SWE--bench_Verified-81.2%25-brightgreen?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yMCA2TDkgMTdsLTUtNSIvPjwvc3ZnPg==" alt="SWE-bench Verified 81.2%" />
  &nbsp;
  <img src="https://img.shields.io/badge/Resolved-65%20of%2080-blue?style=for-the-badge" alt="65 of 80 resolved" />
  &nbsp;
  <img src="https://img.shields.io/badge/Model-Claude_Sonnet_4-purple?style=for-the-badge" alt="Claude Sonnet 4" />
</p>

---

## Highlights

- **81.2% resolve rate** on an 80-instance split from [SWE-bench Verified](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified) (500 instances)
- **Single attempt per instance** — no retries, no iterative refinement, no per-instance tuning
- Spans **10 major open-source Python repositories** across web frameworks, scientific computing, visualization, and developer tooling
- All patches independently verified via the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench)

---

## Results

| Benchmark | Model | Resolved | Total | Score |
|:---|:---|---:|---:|---:|
| [SWE-bench Verified](evaluation/verified/20250427_vorflux_agent_v2/) | Claude Sonnet 4 | **65** | 80 | **81.2%** |

### Results by Difficulty

| Difficulty | Resolved | Total | Rate |
|:---|---:|---:|---:|
| Easy (&lt;15 min) | 19 | 21 | **90.5%** |
| Easy++ (15 min – 1 hr) | 27 | 29 | **93.1%** |
| Medium (1 – 4 hr) | 18 | 27 | **66.7%** |
| Hard (&gt;4 hr) | 1 | 3 | **33.3%** |

> Difficulty is based on estimated human resolution time from the SWE-bench Verified dataset.

### Results by Repository

| Repository | Resolved | Total | Score |
|:---|---:|---:|---:|
| django/django | 33 | 39 | 84.6% |
| sphinx-doc/sphinx | 8 | 10 | 80.0% |
| sympy/sympy | 7 | 8 | 87.5% |
| astropy/astropy | 4 | 5 | 80.0% |
| scikit-learn/scikit-learn | 4 | 4 | 100.0% |
| matplotlib/matplotlib | 3 | 4 | 75.0% |
| pytest-dev/pytest | 3 | 3 | 100.0% |
| pydata/xarray | 2 | 3 | 66.7% |
| mwaskom/seaborn | 1 | 1 | 100.0% |
| pylint-dev/pylint | 0 | 3 | 0.0% |

---

## Methodology

- **Single attempt** per instance — no retries or iterative refinement
- **Identical configuration and prompt** across all instances — no per-instance tuning
- Evaluated using the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench)
- Each generated patch is independently verified against the project's full test suite (fail-to-pass and pass-to-pass)

---

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering agent that investigates codebases, implements features, fixes bugs, writes tests, and creates pull requests — all without human intervention.

---

## Repository Structure

```
evaluation/
  verified/                          # SWE-bench Verified
    20250427_vorflux_agent_v2/       # Evaluation run
      metadata.yaml                  # Agent and model configuration
      README.md                      # Detailed results and methodology
      results/
        results.json                 # Resolved instance list
        resolved_by_repo.json        # Breakdown by repository
      patches/                       # Generated patches (.diff per instance)
```

Follows the [swe-bench/experiments](https://github.com/swe-bench/experiments) directory convention.

---

## License

[MIT](LICENSE)
