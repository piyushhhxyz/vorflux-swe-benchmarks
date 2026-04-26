# Vorflux Agent v1 — Baseline

**Date:** April 22, 2025  
**Score:** 15/20 (75.0%)  
**Avg Cost:** $1.70/instance  
**Total Cost:** $33.93  

## Configuration

- **Session type:** GENERAL (single-shot, no plan approval)
- **Model:** Claude Sonnet 4
- **Timeout:** 2400s per instance
- **Attempts:** 1 (no retries)

## Results by Repository

| Repository | Resolved | Total |
|---|---|---|
| django/django | 5 | 6 |
| sympy/sympy | 3 | 3 |
| pytest-dev/pytest | 1 | 1 |
| astropy/astropy | 2 | 3 |
| sphinx-doc/sphinx | 4 | 5 |
| scikit-learn/scikit-learn | 0 | 1 |
| matplotlib/matplotlib | 0 | 1 |

## Unresolved Instances

| Instance | Notes |
|---|---|
| `astropy__astropy-14598` | Patch produced but did not pass tests |
| `django__django-13512` | Partial fix (f2p=0.33) |
| `matplotlib__matplotlib-24870` | Patch produced but did not pass tests |
| `scikit-learn__scikit-learn-25747` | Patch produced but did not pass tests |
| `sphinx-doc__sphinx-8638` | Patch produced but did not pass tests |
