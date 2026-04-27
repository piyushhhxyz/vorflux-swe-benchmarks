# Vorflux Agent — SWE-bench Verified

## Results

**46 out of 50 instances resolved (92.0%)** on a 50-instance split from SWE-bench Verified.

| Metric | Value |
|:---|:---|
| Resolved | 46/50 (92.0%) |
| Unresolved | 4/50 |
| Model | Claude Sonnet 4 |
| Attempts | 1 per instance |

## Methodology

- Single attempt per instance — no retries or iterative refinement
- Identical configuration and prompt across all instances — no per-instance tuning
- Evaluated using the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench)
- Each generated patch is independently verified against the project's test suite

## Results by Repository

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

## Unresolved Instances

| Instance | Repository |
|:---|:---|
| django__django-10999 | django/django |
| django__django-13513 | django/django |
| matplotlib__matplotlib-26208 | matplotlib/matplotlib |
| pylint-dev__pylint-7080 | pylint-dev/pylint |
