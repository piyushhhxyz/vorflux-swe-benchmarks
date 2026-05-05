# Agent Configuration — GPT-5.5 x GPT-5.5 Harness

## Model Assignments

| Role | Model | Provider | Purpose |
|:---|:---|:---|:---|
| **Plan** | GPT-5.5 | OpenAI | Reads the issue, plans the approach |
| **Explore** | GPT-5.5 (x N) | OpenAI | Parallel codebase investigation subagents |
| **Build** | GPT-5.5 | OpenAI | Implements the fix (code generation) |
| **Simplify** | GPT-5.5 | OpenAI | Refactors for clarity and minimalism |
| **Review** | GPT-5.5 | OpenAI | Code review for correctness |
| **Test** | GPT-5.5 | OpenAI | Applies feedback, runs verification |

## Evaluation Parameters

```yaml
dataset: vorflux-swe-bench-v1
dataset_id: 881258bb-15b2-479b-b0f5-309711fc0b25
total_instances: 500
instances_evaluated: 500
concurrency: 100
num_repetitions: 1
retry_on_failure: false
timeout_per_instance: 30m
max_tokens_per_turn: 16384
temperature: 0.0
```

## Agent Behavior

- **Single pass**: Each instance is attempted exactly once. No retries, no iterative refinement.
- **No per-instance tuning**: The same system prompt and configuration is used for all 500 instances.
- **No human intervention**: Zero manual fixes at any point in the pipeline.
- **Parallel execution**: 100 instances run concurrently. No instance has access to results from other instances.

## System Prompt Summary

The agent receives:
1. The GitHub issue description (title + body)
2. The repository name and base commit SHA
3. Instructions to produce a minimal patch that resolves the issue
4. Access to the full repository via file read/search/edit tools

The agent does NOT receive:
- The failing test names or test file contents
- The gold patch or any hints about the solution
- Information about which files need to be modified
- Access to other instances' results

## Scoring Pipeline

After the agent produces a patch:
1. The patch is applied to the repository at the base commit
2. The SWE-bench Docker harness runs the project's test suite
3. **fail-to-pass (f2p)**: Tests that should now pass are checked
4. **pass-to-pass (p2p)**: Tests that should still pass are verified
5. An instance is "resolved" only if both f2p and p2p pass completely

## Infrastructure

- **Orchestration**: Vorflux evaluation framework (GitHub Actions + LangSmith)
- **Scoring**: SWE-bench Docker harness (containerized, isolated per instance)
- **Tracing**: Full LangSmith traces with token usage, timing, and intermediate outputs
- **Storage**: All patches stored in this repository for independent verification
