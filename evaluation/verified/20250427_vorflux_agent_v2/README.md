# Vorflux Agent — SWE-bench Verified

## Results

**83 out of 100 instances resolved (83.0%)** on a 100-instance split from SWE-bench Verified.

| Metric | Value |
|:---|:---|
| Resolved | 83/100 (83.0%) |
| Unresolved | 17/100 |
| Model | Claude Sonnet 4 |
| Attempts | 1 per instance |

## Methodology

- Single attempt per instance — no retries or iterative refinement
- Identical configuration and prompt across all instances — no per-instance tuning
- Evaluated using the standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench)
- Each generated patch is independently verified against the project's test suite

## Results by Difficulty

| Difficulty | Resolved | Total | Rate |
|:---|---:|---:|---:|
| Easy (&lt;15 min) | 19 | 21 | 90.5% |
| Easy++ (15 min – 1 hr) | 45 | 49 | 91.8% |
| Medium (1 – 4 hr) | 18 | 27 | 66.7% |
| Hard (&gt;4 hr) | 1 | 3 | 33.3% |

> Difficulty is based on estimated human resolution time from the SWE-bench Verified dataset.

## Results by Repository

| Repository | Resolved | Total | Score |
|:---|---:|---:|---:|
| django/django | 44 | 51 | 86.3% |
| sympy/sympy | 10 | 12 | 83.3% |
| sphinx-doc/sphinx | 9 | 11 | 81.8% |
| scikit-learn/scikit-learn | 5 | 5 | 100.0% |
| astropy/astropy | 4 | 5 | 80.0% |
| matplotlib/matplotlib | 4 | 5 | 80.0% |
| pytest-dev/pytest | 4 | 4 | 100.0% |
| pydata/xarray | 2 | 3 | 66.7% |
| mwaskom/seaborn | 1 | 1 | 100.0% |
| pylint-dev/pylint | 0 | 3 | 0.0% |

## Unresolved Instances

| Instance | Repository | Difficulty |
|:---|:---|:---|
| astropy__astropy-14369 | astropy/astropy | medium |
| django__django-10999 | django/django | easy |
| django__django-11400 | django/django | medium |
| django__django-11734 | django/django | easy++ |
| django__django-12325 | django/django | medium |
| django__django-13212 | django/django | medium |
| django__django-13513 | django/django | easy++ |
| django__django-16263 | django/django | medium |
| matplotlib__matplotlib-26208 | matplotlib/matplotlib | medium |
| pydata__xarray-6992 | pydata/xarray | medium |
| pylint-dev__pylint-4551 | pylint-dev/pylint | medium |
| pylint-dev__pylint-7080 | pylint-dev/pylint | easy++ |
| pylint-dev__pylint-8898 | pylint-dev/pylint | medium |
| sphinx-doc__sphinx-7590 | sphinx-doc/sphinx | medium |
| sphinx-doc__sphinx-9461 | sphinx-doc/sphinx | medium |
| sympy__sympy-17630 | sympy/sympy | medium |
| sympy__sympy-21930 | sympy/sympy | easy++ |
