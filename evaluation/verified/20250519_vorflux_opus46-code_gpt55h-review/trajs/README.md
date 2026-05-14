# Agent Trajectories

This directory will contain the full agent trajectories for all 500 SWE-bench Verified instances.

## Status: Pending Export

Trajectories are stored in [Laminar](https://laminar.sh) and will be exported here once `runs.json` is finalized (it contains the session-to-instance mapping needed for export).

## Expected Format

One JSON file per instance, named by instance ID:

```
trajs/
├── astropy__astropy-12907.json
├── django__django-14672.json
├── ...
└── sympy__sympy-24909.json
```

Each file contains an array of message objects representing the full agent session:

```json
[
  {
    "role": "system",
    "content": "..."
  },
  {
    "role": "user",
    "content": "..."
  },
  {
    "role": "assistant",
    "content": "...",
    "tool_calls": [
      {
        "name": "read_file",
        "arguments": {"path": "..."},
        "result": "..."
      }
    ]
  }
]
```

## Source

- **LangSmith experiment**: `34f15aa8-4c43-4946-a83e-24341253ac2d`
- **Mapping**: `runs.json` → `session_id` → Laminar trace ID

Trajectories will be sanitized to exclude secrets, credentials, and proprietary prompt internals before publishing.
