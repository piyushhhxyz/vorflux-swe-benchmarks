# Vorflux Agent v3 — SWE-bench Verified (Easy Split, 100 instances)

## Summary

| Metric | Value |
|:---|---:|
| **Resolved** | **92 / 100** |
| **Score** | **92.0%** |
| **Model (code)** | Claude Opus 4.6 |
| **Model (review)** | GPT 5.5 High |
| **Attempts** | 3 (1 original + 2 retries on failures) |
| **Date** | 2025-05-05 |
| **Environment** | Staging |

## Methodology

- **100 instances** from the `easy` split (<15 min estimated human fix time) of SWE-bench Verified
- **Harness**: Opus 4.6 code + GPT 5.5 High review (Vorflux default harness)
- **Concurrency**: 100 sessions running simultaneously
- **Timeout**: 6 hours per session
- **Retries**: 10 failed instances were retried twice with independent sessions. An instance counts as resolved if it passed in any attempt.
- **Scoring**: Standard SWE-bench Docker harness — fail-to-pass and pass-to-pass test verification

## Results by Repository

| Repository | Resolved | Total | Rate |
|:---|---:|---:|---:|
| django/django | 76 | 81 | 93.8% |
| matplotlib/matplotlib | 11 | 14 | 78.6% |
| astropy/astropy | 3 | 3 | 100.0% |
| pallets/flask | 1 | 1 | 100.0% |
| psf/requests | 1 | 1 | 100.0% |

## Run Details

| Run | Experiment | Instances | Resolved | GHA Run |
|:---|:---|---:|---:|:---|
| Original | `easy-100-opus46-v1-d7dd456d` | 100 | 90 | [#25348861131](https://github.com/vorflux-eng/cosmos/actions/runs/25348861131) |
| Retry 1 | `easy-retry1-opus46-v1-a6eb9225` | 10 | 1 | [#25362366511](https://github.com/vorflux-eng/cosmos/actions/runs/25362366511) |
| Retry 2 | `easy-retry2-opus46-v1-f8e1afc3` | 10 | 2 | [#25362367174](https://github.com/vorflux-eng/cosmos/actions/runs/25362367174) |

## Unresolved Instances (8)

| Instance | Failure Mode |
|:---|:---|
| django__django-10097 | Deterministic — nearly passes (f2p=0.984), same patch every attempt |
| django__django-11820 | Deterministic — partial fix (f2p=0.5) |
| django__django-12308 | Non-deterministic — varying patches, none pass |
| django__django-13794 | Non-deterministic — varying patches, none pass |
| django__django-14315 | Deterministic — same patch, partial fix (f2p=0.636) |
| matplotlib__matplotlib-20676 | Non-deterministic — varying patches, none pass |
| matplotlib__matplotlib-20859 | Deterministic — identical 759-char patch every attempt |
| matplotlib__matplotlib-25479 | Deterministic — identical ~396-char patch every attempt |

## Performance Stats

- **Total cost**: $178.07 (original run) + ~$35 (retries) ≈ $213
- **Average session time**: 9.7 minutes
- **Phase 1 (100 sessions)**: ~35 minutes wall time
- **Phase 2 (scoring)**: ~2 hours

## LangSmith

- [Experiment link](https://smith.langchain.com/o/3281731c-9530-4ddd-b07b-dfea235bd01a/datasets/881258bb-15b2-479b-b0f5-309711fc0b25/compare?selectedSessions=e4160fb7-96dd-476a-8847-c1f2b638d536)
