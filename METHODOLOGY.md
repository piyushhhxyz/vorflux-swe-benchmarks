# Evaluation Methodology

This document describes how Vorflux SWE-bench evaluations are conducted.

## Overview

Each evaluation run creates agent sessions on the Vorflux platform, one per SWE-bench instance. The agent receives a prompt containing the GitHub issue and repository setup instructions, then autonomously investigates the codebase, implements a fix, and outputs a patch. Patches are scored using the standard SWE-bench Docker harness.

## Prompt Template

The agent receives a generic prompt for each instance. No per-instance hints, tips, or customized instructions are provided.

```
Fix this GitHub issue.

## Setup
```bash
if [ ! -d /code/{repo} ]; then git clone --filter=blob:none https://github.com/{repo}.git /code/{repo}; fi
cd /code/{repo} && git fetch origin && git checkout -B fix {base_commit} && git clean -fdx
```

{install_instructions}

## Issue
{problem_statement}

## Notes
- Fix the root cause in the library source code, not in tests or config files
- Do not modify files under `tests/` or any file matching `test_*.py` or `*_test.py`
- Run the failing tests and iterate until they pass before submitting

## When done
Output your patch:
```bash
cd /code/{repo} && git add -A && git commit --allow-empty -m patch && git diff {base_commit} HEAD
```
Paste the full diff as your final message. Nothing else needed — no push, no PR, no fork.
```

The `{install_instructions}` section includes environment setup commands from the [SWE-bench install specs](https://github.com/swe-bench/SWE-bench/blob/main/swebench/harness/constants.py) (conda environment, pip dependencies, etc.).

## Evaluation Pipeline

### Phase 1: Session Creation & Execution

1. For each instance in the dataset, create an agent session via the Vorflux API
2. The agent runs autonomously — no human intervention, plan approvals, or mid-session guidance
3. Sessions run with a timeout (default: 2400 seconds / 40 minutes)
4. Once the session completes (or times out), extract the generated patch from the agent's final message

### Phase 2: Harness Scoring

1. Each patch is evaluated using the [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench)
2. The harness applies the patch to a clean checkout of the repository at the correct commit
3. The full test suite for the affected area is run inside an isolated Docker container
4. Scoring metrics:
   - **Resolved** (pass/fail): Did the patch make all previously-failing tests pass without breaking any previously-passing tests?
   - **f2p** (fail-to-pass): Fraction of originally-failing tests that now pass
   - **p2p** (pass-to-pass): Fraction of originally-passing tests that still pass
   - **gold**: Fraction of gold-patch test changes that pass

## Scoring Criteria

An instance is considered **resolved** if and only if:
- All tests that failed before the patch now pass (f2p = 1.0)
- All tests that passed before the patch still pass (p2p = 1.0, where applicable)

This is the standard SWE-bench resolution criteria.

## Configuration

| Parameter | Value |
|---|---|
| Session type | GENERAL (single-shot) |
| Attempts per instance | 1 |
| Timeout per instance | 2400s |
| Concurrency | 5 sessions |
| Human intervention | None |
| Per-instance hints | None |
| Test modification | Not allowed |

## Cost Tracking

All reported costs are actual API costs from the Vorflux platform, covering LLM inference, tool execution, and agent orchestration. Costs are tracked per-session and reported per-instance.

## Reproducibility

Results may vary slightly between runs due to:
- LLM sampling (temperature > 0)
- Non-deterministic tool execution ordering
- Session infrastructure timing variations

We report results from single runs without cherry-picking. Where we have observed variance across runs, we note it in the run README.

## Dataset

Our evaluations currently use a 20-instance subset of [SWE-bench Verified](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified) covering the `easy` and `easy++` difficulty splits. This subset spans 7 repositories:

- django/django
- sympy/sympy
- astropy/astropy
- sphinx-doc/sphinx
- pytest-dev/pytest
- scikit-learn/scikit-learn
- matplotlib/matplotlib

We are actively expanding to additional splits (medium, hard) and will add results as they become available.
