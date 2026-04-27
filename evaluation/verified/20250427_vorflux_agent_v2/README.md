# Vorflux Agent — SWE-bench Verified

## Results

**65 out of 80 instances resolved (81.2%)** on an 80-instance split from SWE-bench Verified.

| Metric | Value |
|:---|:---|
| Resolved | 65/80 (81.2%) |
| Unresolved | 15/80 |
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

## Unresolved Instances

| Instance | Repository |
|:---|:---|
| astropy__astropy-14369 | astropy/astropy |
| django__django-10999 | django/django |
| django__django-11400 | django/django |
| django__django-12325 | django/django |
| django__django-13212 | django/django |
| django__django-13513 | django/django |
| django__django-16263 | django/django |
| matplotlib__matplotlib-26208 | matplotlib/matplotlib |
| pydata__xarray-6992 | pydata/xarray |
| pylint-dev__pylint-4551 | pylint-dev/pylint |
| pylint-dev__pylint-7080 | pylint-dev/pylint |
| pylint-dev__pylint-8898 | pylint-dev/pylint |
| sphinx-doc__sphinx-7590 | sphinx-doc/sphinx |
| sphinx-doc__sphinx-9461 | sphinx-doc/sphinx |
| sympy__sympy-17630 | sympy/sympy |
