# runs.json Schema

## Root Object

| Field | Type | Description |
|:---|:---|:---|
| `metadata` | object | Global metadata for this evaluation run |
| `runs` | array | Per-instance results and trace links |

## metadata

| Field | Type | Description |
|:---|:---|:---|
| `harness` | string | Harness identifier |
| `benchmark` | string | Benchmark name (e.g., `swe-bench-verified`) |
| `total_instances` | int | Total instances evaluated |
| `resolved` | int | Number of resolved instances |
| `resolve_rate` | string | Resolve rate as percentage |
| `eval_date` | string | Date of evaluation (YYYY-MM-DD) |
| `langsmith_experiment_id` | string | LangSmith experiment UUID |
| `laminar_project_url` | string | Laminar project URL for traces |
| `status` | string | `complete` or `pending_final_trace_mapping` |

## runs[] (per-instance)

| Field | Type | Description |
|:---|:---|:---|
| `instance_id` | string | SWE-bench instance ID (e.g., `django__django-14672`) |
| `example_id` | string | LangSmith example UUID |
| `session_id` | string | Vorflux session ID |
| `session_url` | string | Vorflux session URL |
| `langsmith_run_url` | string | Direct link to the LangSmith trace for this instance |
| `resolved` | int | `1` if resolved, `0` if not |
| `contamination_status` | string | `pass` or `fail` |
| `contamination_link` | string | URL to contamination check evidence |
