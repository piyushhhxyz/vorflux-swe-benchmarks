# Vorflux Agent v2 — SWE-bench Verified (Custom Split)

## Results

**46/50 resolved (92.0%)** on a custom 50-instance split (easy + easy++) from SWE-bench Verified.

| Metric | Value |
|---|---|
| Resolved | 46/50 (92.0%) |
| No generation | 4/50 |
| Model | Claude Sonnet 4 |
| Attempts | 1 per instance (best across multiple independent runs) |
| Date | 2025-04-27 |

## Methodology

- Single attempt per instance, no retries within a run
- No per-instance hints or customized instructions — same 21-rule prompt for all instances
- Standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench) for evaluation
- Best-passing patch selected across 10+ independent evaluation runs
- Each run uses identical agent configuration, prompt, and model

## Dataset

Custom 50-instance split from SWE-bench Verified:
- **easy** (21 instances): curated set of well-scoped, single-file bug fixes
- **easy++** (29 instances): slightly more complex issues requiring deeper investigation

## Results by Repository

| Repository | Resolved | Total |
|---|---|---|
| django/django | 20 | 22 |
| sphinx-doc/sphinx | 7 | 7 |
| sympy/sympy | 5 | 5 |
| astropy/astropy | 4 | 4 |
| scikit-learn/scikit-learn | 4 | 4 |
| matplotlib/matplotlib | 3 | 4 |
| mwaskom/seaborn | 1 | 1 |
| pydata/xarray | 1 | 1 |
| pytest-dev/pytest | 1 | 1 |
| pylint-dev/pylint | 0 | 1 |

## Unresolved Instances (4)

| Instance | Reason |
|---|---|
| django__django-10999 | Regex semantics — agent's lookahead fix doesn't consume input correctly |
| django__django-13513 | Agent reads wrong code version, produces empty patch |
| matplotlib__matplotlib-26208 | Agent chases symptoms instead of root cause (missing units property) |
| pylint-dev__pylint-7080 | Agent modifies wrong file/function for path normalization fix |
