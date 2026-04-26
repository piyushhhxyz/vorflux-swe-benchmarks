# Vorflux SWE-Bench Evaluations

Public evaluation results for the [Vorflux](https://vorflux.com) autonomous software engineering agent on [SWE-bench](https://www.swebench.com/) benchmarks.

We believe in transparency. This repository contains our raw evaluation data — per-instance results, generated patches, and cost breakdowns — so anyone can verify our scores independently.

> **Note:** We are not submitting to the official SWE-bench leaderboard. Those submissions are often eval-optimized and tuned specifically for the benchmark. Our scores reflect Vorflux running as a general-purpose agent with a generic prompt — the same system our users interact with every day.

## Results

### SWE-bench Verified (Easy Split — 20 instances)

A curated subset of 20 instances from [SWE-bench Verified](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified) (`easy` + `easy++` difficulty).

| Run | Date | Resolved | Score | Avg Cost | Total Cost |
|---|---|---|---|---|---|
| [**v6 (latest)**](results/swe-bench-verified-easy/vorflux-v1-v6/) | 2025-04-24 | 17/20 | **85.0%** | $1.50 | $28.42 |
| [Baseline](results/swe-bench-verified-easy/vorflux-v1-baseline/) | 2025-04-22 | 15/20 | 75.0% | $1.70 | $33.93 |

### Per-Instance Breakdown (Latest: v6)

| Instance | Resolved | Cost |
|---|---|---|
| `astropy__astropy-7166` | :white_check_mark: | $0.67 |
| `astropy__astropy-14182` | :white_check_mark: | $1.91 |
| `astropy__astropy-14598` | :x: | — |
| `django__django-11728` | :white_check_mark: | $1.66 |
| `django__django-12039` | :white_check_mark: | $0.67 |
| `django__django-12262` | :white_check_mark: | $0.95 |
| `django__django-13512` | :white_check_mark: | $0.91 |
| `django__django-16901` | :white_check_mark: | $0.83 |
| `django__django-16938` | :white_check_mark: | $1.03 |
| `matplotlib__matplotlib-24870` | :x: | $2.33 |
| `pytest-dev__pytest-10051` | :white_check_mark: | $1.15 |
| `scikit-learn__scikit-learn-25747` | :white_check_mark: | $2.31 |
| `sphinx-doc__sphinx-7889` | :white_check_mark: | $1.10 |
| `sphinx-doc__sphinx-8638` | :x: | $3.32 |
| `sphinx-doc__sphinx-9698` | :white_check_mark: | $0.78 |
| `sphinx-doc__sphinx-9711` | :white_check_mark: | $0.92 |
| `sphinx-doc__sphinx-11445` | :white_check_mark: | $2.51 |
| `sympy__sympy-13757` | :white_check_mark: | $2.15 |
| `sympy__sympy-18211` | :white_check_mark: | $1.65 |
| `sympy__sympy-24661` | :white_check_mark: | $1.56 |

## Methodology

See [METHODOLOGY.md](METHODOLOGY.md) for details on how evaluations are run, including the prompt template, scoring process, and evaluation harness configuration.

**Key points:**
- Single attempt per instance — no retries, no cherry-picking
- Generic prompt template — no per-instance hints or instructions
- Standard SWE-bench Docker harness for scoring
- All costs are real API costs (not estimated)

## Repository Structure

```
results/
  swe-bench-verified-easy/          # Benchmark split
    vorflux-v1-v6/                  # Run identifier
      metadata.yaml                 # Run configuration and tags
      results.json                  # Machine-readable results
      resolved_by_repo.json         # Results grouped by repository
      patches/                      # Generated patches per instance
        django__django-16901.diff
        ...
      README.md                     # Run summary
```

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering agent that can investigate codebases, implement features, fix bugs, write tests, and create pull requests. These evaluations test Vorflux against real-world GitHub issues to measure its ability to resolve software engineering tasks end-to-end.

## License

Evaluation results and patches in this repository are released under [MIT](LICENSE). The SWE-bench dataset itself is maintained by Princeton NLP and is subject to its own [license](https://github.com/princeton-nlp/SWE-bench).
