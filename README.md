# Vorflux SWE-Bench Results

Evaluation results for the [Vorflux](https://vorflux.com) autonomous software engineering agent on [SWE-bench](https://www.swebench.com/) benchmarks.

This repository contains per-instance predictions, patches, and results following the [swe-bench/experiments](https://github.com/swe-bench/experiments) format.

## Results

### SWE-bench Verified

| Submission | Model | % Resolved | Date |
|---|---|---|---|
| [Vorflux Agent v1](evaluation/verified/20250424_vorflux_agent_v1/) | Claude Sonnet 4 | **85.0%** | 2025-04-24 |

> Initial evaluation on [SWE-bench Verified](https://huggingface.co/datasets/princeton-nlp/SWE-bench_Verified). Full evaluation coming soon.

## About Vorflux

[Vorflux](https://vorflux.com) is an autonomous software engineering agent that investigates codebases, implements features, fixes bugs, writes tests, and creates pull requests — all without human intervention.

- Single attempt per instance, no retries
- No per-instance hints or customized instructions
- Standard [SWE-bench Docker harness](https://github.com/swe-bench/SWE-bench) for evaluation

## Repository Structure

```
evaluation/
  verified/                                    # SWE-bench Verified
    20250424_vorflux_agent_v1/                 # Submission
      metadata.yaml                            # Agent info, model, configuration
      README.md                                # Description and results summary
      results/
        results.json                           # Resolved instance list
        resolved_by_repo.json                  # Results by repository
      patches/                                 # Generated patches (.diff per instance)
```

Follows the [swe-bench/experiments](https://github.com/swe-bench/experiments) directory convention.

## License

[MIT](LICENSE)
