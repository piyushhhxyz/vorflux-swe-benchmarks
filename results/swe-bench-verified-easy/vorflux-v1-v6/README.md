# Vorflux Agent v1 — Run v6

**Date:** April 24, 2025  
**Score:** 17/20 (85.0%)  
**Avg Cost:** $1.50/instance  
**Total Cost:** $28.42  

## Configuration

- **Session type:** GENERAL (single-shot, no plan approval)
- **Model:** Claude Sonnet 4
- **Timeout:** 2400s per instance
- **Attempts:** 1 (no retries)

## Results by Repository

| Repository | Resolved | Total |
|---|---|---|
| django/django | 6 | 6 |
| sympy/sympy | 3 | 3 |
| pytest-dev/pytest | 1 | 1 |
| astropy/astropy | 2 | 3 |
| sphinx-doc/sphinx | 4 | 5 |
| scikit-learn/scikit-learn | 1 | 1 |
| matplotlib/matplotlib | 0 | 1 |

## Unresolved Instances

| Instance | Notes |
|---|---|
| `astropy__astropy-14598` | Session timed out — no patch produced |
| `matplotlib__matplotlib-24870` | Patch produced but did not pass tests |
| `sphinx-doc__sphinx-8638` | Patch produced but did not pass tests |
