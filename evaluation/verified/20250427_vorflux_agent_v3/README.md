# Vorflux Agent — SWE-bench Verified (Expansion)

## Results

**18 out of 20 instances resolved (90.0%)** on a 20-instance easy++ expansion split from SWE-bench Verified.

| Metric | Value |
|:---|:---|
| Resolved | 18/20 (90.0%) |
| Unresolved | 2/20 |
| Model | Claude Sonnet 4 |
| Attempts | Best of up to 4 attempts |

## Methodology

- Up to 4 attempts per instance — best result taken across retries
- Identical configuration and prompt across all instances — no per-instance tuning
- Evaluated using the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench)
- Each generated patch is independently verified against the project's test suite

## Results by Repository

| Repository | Resolved | Total | Score |
|:---|---:|---:|---:|
| django/django | 11 | 12 | 91.7% |
| sympy/sympy | 3 | 4 | 75.0% |
| matplotlib/matplotlib | 1 | 1 | 100.0% |
| pytest-dev/pytest | 1 | 1 | 100.0% |
| scikit-learn/scikit-learn | 1 | 1 | 100.0% |
| sphinx-doc/sphinx | 1 | 1 | 100.0% |

## Unresolved Instances

| Instance | Repository |
|:---|:---|
| django__django-11734 | django/django |
| sympy__sympy-21930 | sympy/sympy |
