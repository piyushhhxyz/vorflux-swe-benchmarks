<p align="center">
  <a href="https://vorflux.com">
    <img src="https://vorflux.com/favicon.ico" width="60" alt="Vorflux" />
  </a>
</p>

<h1 align="center">Vorflux SWE-Bench Results</h1>

<p align="center">
  Evaluation results for the <a href="https://vorflux.com">Vorflux</a> autonomous software engineering agent on <a href="https://www.swebench.com/">SWE-bench</a>.
</p>

<p align="center">
  <strong>92.0% Resolved</strong> &nbsp;·&nbsp; 46 out of 50 instances &nbsp;·&nbsp; SWE-bench Verified
</p>

---

## Results

| Benchmark | Model | Resolved | Total | Score |
|:---|:---|---:|---:|---:|
| [SWE-bench Verified](evaluation/verified/20250427_vorflux_agent_v2/) | Claude Sonnet 4 | 46 | 50 | **92.0%** |

> Evaluated on a 50-instance split from [SWE-bench Verified](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified). Full benchmark evaluation coming soon.

### Results by Repository

| Repository | Resolved | Total | Score |
|:---|---:|---:|---:|
| django/django | 20 | 22 | 90.9% |
| sphinx-doc/sphinx | 7 | 7 | 100.0% |
| sympy/sympy | 5 | 5 | 100.0% |
| astropy/astropy | 4 | 4 | 100.0% |
| scikit-learn/scikit-learn | 4 | 4 | 100.0% |
| matplotlib/matplotlib | 3 | 4 | 75.0% |
| mwaskom/seaborn | 1 | 1 | 100.0% |
| pydata/xarray | 1 | 1 | 100.0% |
| pytest-dev/pytest | 1 | 1 | 100.0% |
| pylint-dev/pylint | 0 | 1 | 0.0% |

## Methodology

- Single attempt per instance — no retries or iterative refinement
- Identical configuration and prompt across all instances — no per-instance tuning
- Evaluated using the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench)
- Each generated patch is independently verified against the project's test suite

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering agent that investigates codebases, implements features, fixes bugs, writes tests, and creates pull requests — all without human intervention.

## Repository Structure

```
evaluation/
  verified/                          # SWE-bench Verified
    20250427_vorflux_agent_v2/       # Evaluation results
      metadata.yaml                  # Agent and model configuration
      README.md                      # Detailed results and methodology
      results/
        results.json                 # Resolved instance list
        resolved_by_repo.json        # Breakdown by repository
      patches/                       # Generated patches (.diff per instance)
```

Follows the [swe-bench/experiments](https://github.com/swe-bench/experiments) directory convention.

## License

[MIT](LICENSE)
