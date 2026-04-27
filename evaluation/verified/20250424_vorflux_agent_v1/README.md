# Vorflux Agent v1

[Vorflux](https://vorflux.com) is an autonomous software engineering agent that resolves GitHub issues end-to-end — from investigating the codebase to implementing a fix, running tests, and submitting a patch.

The agent operates with full autonomy: no human-in-the-loop guidance, no per-instance hints, and no retries. Each instance receives a single attempt with a generic prompt.

```
==================================================
Resolved 17 instances (85.0%)
==================================================
Resolved by Repository
- astropy/astropy: 2/3 (66.67%)
- django/django: 6/6 (100.0%)
- matplotlib/matplotlib: 0/1 (0.0%)
- pytest-dev/pytest: 1/1 (100.0%)
- scikit-learn/scikit-learn: 1/1 (100.0%)
- sphinx-doc/sphinx: 4/5 (80.0%)
- sympy/sympy: 3/3 (100.0%)
==================================================
```

## Configuration

- **Model:** Claude Sonnet 4
- **Attempts:** 1
- **Dataset:** SWE-bench Verified
- **Evaluation:** Standard SWE-bench Docker harness
