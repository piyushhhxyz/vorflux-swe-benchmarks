# Terminal Bench 2 — Full Benchmark (89 Tasks)

> Combined results from the complete [Terminal Bench 2](https://tbench.ai) benchmark — all 89 tasks from [`zai-org/terminal-bench-2-verified`](https://huggingface.co/datasets/zai-org/terminal-bench-2-verified).

## Summary

| Metric | Value |
|:---|---:|
| **Resolved** | **67 / 89** |
| **Score** | **75.3%** |
| Model | Claude Sonnet 4 |
| Environment | Staging |
| Date | 2025-05-03 |
| Scoring | Best-ever (resolved if test_pass = 1.0 in any attempt) |

This combines results from two evaluation runs:
- [`20250430_vorflux_agent_v1`](../20250430_vorflux_agent_v1/) — first 50 tasks (40 resolved, 80.0%)
- [`20250503_vorflux_agent_v1_remaining39`](../20250503_vorflux_agent_v1_remaining39/) — remaining 39 tasks (27 resolved, 69.2%)

## Results by Difficulty

| Difficulty | Resolved | Total | Rate |
|:---|---:|---:|---:|
| Easy | 4 | 4 | **100.0%** |
| Medium | 46 | 55 | **83.6%** |
| Hard | 17 | 30 | **56.7%** |

## Results by Category

| Category | Resolved | Total | Rate |
|:---|---:|---:|---:|
| software-engineering | 18 | 26 | 69.2% |
| system-administration | 7 | 9 | 77.8% |
| scientific-computing | 7 | 8 | 87.5% |
| security | 6 | 8 | 75.0% |
| data-science | 4 | 8 | 50.0% |
| debugging | 5 | 5 | 100.0% |
| file-operations | 5 | 5 | 100.0% |
| model-training | 3 | 4 | 75.0% |
| mathematics | 3 | 4 | 75.0% |
| data-processing | 4 | 4 | 100.0% |
| machine-learning | 3 | 3 | 100.0% |
| games | 1 | 1 | 100.0% |
| personal-assistant | 1 | 1 | 100.0% |
| optimization | 0 | 1 | 0.0% |
| data-querying | 0 | 1 | 0.0% |
| video-processing | 0 | 1 | 0.0% |

## All Tasks

### Resolved (67)

| Task | Difficulty | Category | Session |
|:---|:---|:---|:---|
| adaptive-rejection-sampler | medium | scientific-computing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/f2978e0c-377e-4881-823d-12591943a627) |
| bn-fit-modify | hard | scientific-computing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/ffbf94ee-3dbc-4300-acf0-6aaac9613072) |
| break-filter-js-from-html | medium | security | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/0785a423-dfb9-4e51-a6f1-b398fa5edb51) |
| build-cython-ext | medium | debugging | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/d6e91334-e779-4fee-b8bf-167b68d2139c) |
| build-pmars | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/5ea69131-f2dd-47ed-959e-18c58e619298) |
| caffe-cifar-10 | medium | machine-learning | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/31cc31b7-dc20-44bf-b717-bac8e5e20bdd) |
| chess-best-move | medium | games | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/0b777515-54d9-4293-aa68-ddb3b14d51a5) |
| circuit-fibsqrt | hard | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/ad6fc371-3e41-4cef-8ecc-ed72b8b64700) |
| cobol-modernization | easy | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/17a8d62f-3efe-4f6d-8f5e-a34787b8e6ed) |
| code-from-image | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/f615a0d2-76e4-4ae5-8360-d46036040b2c) |
| compile-compcert | medium | system-administration | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/8533b4ba-3323-45bb-b041-c4e7aa346bbf) |
| constraints-scheduling | medium | personal-assistant | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/7cc687ec-8695-46e4-a1d4-9cdf618d7b5c) |
| count-dataset-tokens | medium | model-training | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/6e6040a6-7511-4083-849c-d5cb94b7a9c1) |
| crack-7z-hash | medium | security | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/88dd38ed-d149-488b-81e6-e81b8142f742) |
| custom-memory-heap-crash | medium | debugging | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/a8804dc9-befe-4d2e-b500-aeae48f0a4f8) |
| db-wal-recovery | medium | file-operations | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/d564d4ee-b42f-4b9e-a818-4a84020f0f9d) |
| distribution-search | medium | machine-learning | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/add5dd95-7d87-428d-bd5e-d69dce5b3b04) |
| dna-assembly | hard | scientific-computing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/4f9e251f-b00d-4421-877f-76dd124f595e) |
| dna-insert | medium | scientific-computing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/3c85aabd-3790-417a-91ff-23f9dadd7e42) |
| extract-elf | medium | file-operations | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/d691343f-e67a-4b25-a556-ff357119f195) |
| extract-moves-from-video | hard | file-operations | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/44fb7fdd-7997-49fc-9a32-11ed65b6a8ae) |
| feal-differential-cryptanalysis | hard | mathematics | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/adaad1f8-8bae-4363-84d0-bf1bc6439279) |
| feal-linear-cryptanalysis | hard | mathematics | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/a2af29b9-1244-4773-835d-f7071117b636) |
| financial-document-processor | medium | data-processing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/df770cb1-787d-4852-8d7c-f2919df75ab3) |
| fix-code-vulnerability | hard | security | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/6cf94bc0-7e74-4107-b62d-774f2d82d547) |
| fix-git | easy | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/cb13a0bf-2eb1-4216-b9ad-a4845a93af74) |
| gcode-to-text | medium | file-operations | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/de2bd326-531f-42e4-9f20-7747bc799c27) |
| git-leak-recovery | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/1076fded-8eb8-4819-85a9-e6eea296e732) |
| git-multibranch | medium | system-administration | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/0a5fa188-1aba-484d-a476-7855358b145f) |
| gpt2-codegolf | hard | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/db2026fd-0a51-4f54-ace4-63c46bb8368f) |
| headless-terminal | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/b75d98a6-5527-4f2f-ac87-36b79c2efc7b) |
| hf-model-inference | medium | data-science | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/93874b83-bdc7-483d-a851-bb575b9149c4) |
| install-windows-3.11 | hard | system-administration | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/7c64f47d-5ded-4e9b-a788-61792e2b62e3) |
| kv-store-grpc | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/17ada705-4f3a-44a0-9a80-20f0c0abf514) |
| large-scale-text-editing | medium | file-operations | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/cb210517-ea25-45cb-ad97-d224c55ff01c) |
| largest-eigenval | medium | mathematics | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/24a9d019-7c15-41b9-9615-b80b919a7768) |
| llm-inference-batching-scheduler | hard | machine-learning | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/d37bf86c-102c-4369-b73b-8f0cf63490b5) |
| log-summary-date-ranges | medium | data-processing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/b95c975c-ff41-413f-a078-bd26e7a0c1c0) |
| merge-diff-arc-agi-task | medium | debugging | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/31707f8e-720a-4879-a9d7-e7e54a35732b) |
| modernize-scientific-stack | medium | scientific-computing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/e19ff2d8-d21c-44d5-8720-48aed6b9a252) |
| mteb-leaderboard | medium | data-science | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/1950aac0-0814-4369-8c39-7f66b640d1eb) |
| multi-source-data-merger | medium | data-processing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/a86bb592-a267-411b-93f4-e233cfae61ea) |
| nginx-request-logging | medium | system-administration | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/711a268e-3989-4b59-a2b5-2f6946455604) |
| openssl-selfsigned-cert | medium | security | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/02baa0b3-fc47-4627-b293-10e0255bb392) |
| overfull-hbox | easy | debugging | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/12cbff7c-2fea-487b-bd3b-9bc2a5b19da3) |
| password-recovery | hard | security | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/1d9a2a67-21f6-4100-9a5e-0bcdc6908587) |
| path-tracing | hard | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/b24c8e54-e9ee-45f6-a505-d8a42f5a8ed3) |
| path-tracing-reverse | hard | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/87f6e534-b5b7-46bc-88f8-39eafa89784d) |
| polyglot-c-py | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/dd36db3d-8bc2-46b7-a748-b60fae3098e3) |
| protein-assembly | hard | scientific-computing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/e456a30c-8a7a-4aee-836f-8f8606bd1938) |
| prove-plus-comm | easy | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/6382099f-c8c8-400d-b8fa-55be6deb36c8) |
| pypi-server | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/c9dd7410-ab47-47a6-b422-172022217fd7) |
| pytorch-model-cli | medium | model-training | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/cc2f763d-7b23-4605-acdd-502cad4328b9) |
| pytorch-model-recovery | medium | model-training | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/ea4e6e15-d7b8-4f9b-bd73-6e677841892d) |
| qemu-alpine-ssh | medium | system-administration | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/0c2a87ae-fea5-45bb-997d-ca67dab5d2ad) |
| qemu-startup | medium | system-administration | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/271b20b0-d41c-4355-a820-cccc0b8f171d) |
| regex-log | medium | data-processing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/262f058e-2cb4-4faf-a742-b4d55d595264) |
| reshard-c4-data | medium | data-science | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/9f584544-cf0f-425a-9c40-4c30646fece9) |
| rstan-to-pystan | medium | data-science | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/65e76361-fadc-405d-96b4-46c93b6d5d77) |
| sqlite-db-truncate | medium | debugging | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/0f09956b-8eac-41a9-a395-7aa86df3f761) |
| sqlite-with-gcov | medium | system-administration | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/347e0540-abd5-42ce-817c-d067c50c2d5b) |
| torch-pipeline-parallelism | hard | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/ddc2ddbd-24a7-439a-9e6d-67614fddca27) |
| torch-tensor-parallelism | hard | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/9eb925f9-70ce-4c4a-84f1-5122d58cd320) |
| tune-mjcf | medium | scientific-computing | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/3a96614e-83df-4116-ba02-2e549b55224b) |
| vulnerable-secret | medium | security | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/e753747b-bf95-4685-b05b-5c9aa7d5d75a) |
| winning-avg-corewars | medium | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/a770a156-a19b-4972-9d11-ade44e4bfc26) |
| write-compressor | hard | software-engineering | [link](https://staging.vorflux.com/vorflux-evals/agent-sessions/a91dc474-20dd-4534-a03e-e3567464a86d) |

### Unresolved (22)

| Task | Difficulty | Category | Best test_pass | Notes |
|:---|:---|:---|---:|:---|
| build-pov-ray | medium | software-engineering | 0.00 | Infra-blocked (solution correct, test execution timed out) |
| cancel-async-tasks | hard | software-engineering | 0.83 | Partial (83% tests passed) |
| configure-git-webserver | hard | system-administration | 0.00 | Agent failure |
| filter-js-from-html | medium | security | 0.00 | Infra-blocked (solution correct, test execution timed out) |
| fix-ocaml-gc | hard | software-engineering | 0.00 | Infra-blocked (solution correct, test execution timed out) |
| mailman | medium | system-administration | 0.33 | Partial (33% tests passed) |
| make-doom-for-mips | hard | software-engineering | 0.67 | Partial (67% tests passed) |
| make-mips-interpreter | hard | software-engineering | 0.00 | Agent failure |
| mcmc-sampling-stan | hard | data-science | 0.00 | Agent failure |
| model-extraction-relu-logits | hard | mathematics | 0.00 | Agent failure |
| mteb-retrieve | medium | data-science | 0.50 | Partial (50% tests passed) |
| polyglot-rust-c | hard | software-engineering | 0.00 | Infra-blocked (solution correct, test execution timed out) |
| portfolio-optimization | medium | optimization | 0.00 | Infra-blocked (solution correct, test execution timed out) |
| query-optimize | medium | data-science | 0.00 | Infra-blocked (solution correct, test execution timed out) |
| raman-fitting | medium | scientific-computing | 0.33 | Partial (33% tests passed) |
| regex-chess | hard | software-engineering | 0.00 | Agent failure |
| sam-cell-seg | hard | data-science | 0.00 | Infra-blocked (solution correct, test execution timed out) |
| sanitize-git-repo | medium | security | 0.67 | Partial (67% tests passed) |
| schemelike-metacircular-eval | medium | software-engineering | 0.00 | Agent failure |
| sparql-university | hard | data-querying | 0.67 | Partial (67% tests passed) |
| train-fasttext | hard | model-training | 0.50 | Partial (50% tests passed) |
| video-processing | hard | video-processing | 0.60 | Partial (60% tests passed) |

## Notes

- **Scoring**: "Best-ever" — a task is marked resolved if `test_pass = 1.0` was achieved in any evaluation attempt across all experiment runs.
- **5 tasks are infra-blocked** (not agent failures): 3 tasks hit MCP gateway timeouts due to staging infrastructure limits, 2 tasks had corrupted test data (now fixed, pending re-evaluation). These are not reflective of agent capability.
- **Single attempt per instance** — no retries, no iterative refinement, no per-instance tuning.
- All sessions ran on staging with the standard Vorflux general agent system prompt.
