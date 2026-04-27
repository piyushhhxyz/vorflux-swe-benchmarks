# Vorflux SWE-Bench Results

Evaluation results for the [Vorflux](https://vorflux.com) autonomous software engineering agent on [SWE-bench](https://www.swebench.com/) benchmarks.

This repository contains per-instance predictions, patches, and results following the [swe-bench/experiments](https://github.com/swe-bench/experiments) format.

## Results

### SWE-bench Verified

| Submission | Model | Instances | % Resolved | Date |
|---|---|---|---|---|
| [Vorflux Agent v2](evaluation/verified/20250427_vorflux_agent_v2/) | Claude Sonnet 4 | 50 (easy + easy++) | **92.0%** | 2025-04-27 |
| [Vorflux Agent v1](evaluation/verified/20250424_vorflux_agent_v1/) | Claude Sonnet 4 | 20 (easy) | **85.0%** | 2025-04-24 |

> Evaluations on a custom split of [SWE-bench Verified](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified). Full Verified benchmark evaluation coming soon.

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering agent that investigates codebases, implements features, fixes bugs, writes tests, and creates pull requests — all without human intervention.

- Single attempt per instance, no retries
- No per-instance hints or customized instructions
- Standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench) for evaluation

## Repository Structure

```
evaluation/
  verified/                                    # SWE-bench Verified
    20250427_vorflux_agent_v2/                 # Latest submission (50 instances)
      metadata.yaml                            # Agent info, model, configuration
      README.md                                # Description and results summary
      results/
        results.json                           # Resolved instance list
        resolved_by_repo.json                  # Results by repository
      patches/                                 # Generated patches (.diff per instance)
    20250424_vorflux_agent_v1/                 # First submission (20 instances)
```

Follows the [swe-bench/experiments](https://github.com/swe-bench/experiments) directory convention.

## License

[MIT](LICENSE)
