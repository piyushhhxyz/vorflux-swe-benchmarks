#!/usr/bin/env python3
"""Export agent trajectories from Laminar for SWE-bench instances.

Fetches spans from Laminar SQL API for each session, reconstructs the
agent conversation (main agent + judge/reviewer), strips system prompts,
and writes one JSON file per instance into the trajs/ directory.

Usage:
    # Export specific instances (for testing)
    python scripts/export_trajectories.py --instances astropy__astropy-12907 django__django-10554

    # Export all instances
    python scripts/export_trajectories.py --all

    # Dry run (show what would be exported)
    python scripts/export_trajectories.py --all --dry-run

Environment:
    STAGING_LMNR_PROJECT_API_KEY or LMNR_PROJECT_API_KEY must be set.
"""
import argparse
import json
import os
import sys
import time
from typing import Any

import requests

LAMINAR_SQL_URL = "https://api.lmnr.ai:443/v1/sql/query"
HARNESS_DIR = "evaluation/verified/20250519_vorflux_opus46-code_gpt55h-review"

# Span types to include in trajectories
MAIN_AGENT_SPANS = {"llm_call_stream"}
TOOL_CALL_PREFIX = "mcp_tool_call"
JUDGE_SPANS = {"openai.chat"}

# Span types to exclude entirely
EXCLUDE_SPANS = {
    "agent_session",
    "llm_call",  # title generation, not main agent
    "run_agent_with_messages",
    "post_turn_learning [main]",
    "reflection_post_processor [main]",
    "response_continuity_adapter",
    "response_continuity_fetch_messages",
    "response_continuity_parse",
    "response_continuity_processor",
}


def get_api_key() -> str:
    key = (
        os.environ.get("STAGING_LMNR_PROJECT_API_KEY")
        or os.environ.get("LMNR_PROJECT_API_KEY")
    )
    if not key:
        print("Error: STAGING_LMNR_PROJECT_API_KEY or LMNR_PROJECT_API_KEY must be set")
        sys.exit(1)
    return key


def query_laminar(
    query: str, api_key: str, max_retries: int = 3
) -> list[dict[str, Any]]:
    """Execute a Laminar SQL query with retry on 429 rate limits."""
    for attempt in range(max_retries + 1):
        try:
            resp = requests.post(
                LAMINAR_SQL_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={"query": query},
                timeout=60,
            )
            if resp.status_code == 429:
                if attempt < max_retries:
                    wait = 2 ** (attempt + 1)  # 2s, 4s, 8s
                    print(f"  Rate limited (429), retrying in {wait}s...")
                    time.sleep(wait)
                    continue
                else:
                    print(f"  Rate limited (429), exhausted retries")
                    return []
            resp.raise_for_status()
            body = resp.json()
            return body.get("data", []) if isinstance(body, dict) else []
        except requests.exceptions.HTTPError:
            raise  # re-raise non-429 HTTP errors
        except Exception as exc:
            print(f"  Laminar query failed: {exc}")
            return []
    return []


def strip_system_prompt(messages: list[dict]) -> list[dict]:
    """Remove system prompt messages from the conversation."""
    return [m for m in messages if m.get("role") != "system"]


def parse_json_field(value: Any) -> Any:
    """Parse a JSON string field, or return as-is if already parsed."""
    if isinstance(value, str):
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value
    return value


def format_llm_span(span: dict) -> dict:
    """Format an LLM call span into a trajectory entry.

    Only includes the assistant's output (response + tool calls), not the
    full input message history. The input history grows with each turn and
    would make files 10-50x larger with redundant data. The conversation
    can be reconstructed from the sequence of outputs + tool results.
    """
    output_data = parse_json_field(span.get("output"))

    entry = {
        "type": "llm_call",
        "timestamp": span.get("start_time"),
    }

    # Extract assistant response from output
    if isinstance(output_data, list) and output_data:
        for msg in output_data:
            if isinstance(msg, dict) and msg.get("role") == "assistant":
                entry["output"] = {
                    "content": msg.get("content", ""),
                    "tool_calls": msg.get("tool_calls", []),
                }
                break
    elif isinstance(output_data, dict):
        choices = output_data.get("choices", [])
        if choices:
            msg = choices[0].get("message", {})
            entry["output"] = {
                "content": msg.get("content", ""),
                "tool_calls": msg.get("tool_calls", []),
            }

    return entry


def format_tool_span(span: dict) -> dict:
    """Format a tool call span into a trajectory entry."""
    input_data = parse_json_field(span.get("input"))
    output_data = parse_json_field(span.get("output"))

    tool_name = span["name"].replace("mcp_tool_call [", "").rstrip("]")

    entry = {
        "type": "tool_call",
        "tool": tool_name,
        "timestamp": span.get("start_time"),
    }

    if isinstance(input_data, dict):
        entry["arguments"] = input_data.get("arguments", input_data)
    else:
        entry["arguments"] = input_data

    entry["result"] = output_data

    return entry


def format_judge_span(span: dict) -> dict:
    """Format a judge/reviewer span into a trajectory entry."""
    input_data = parse_json_field(span.get("input"))
    output_data = parse_json_field(span.get("output"))

    entry = {
        "type": "judge_call",
        "model": "gpt-5.5-high",
        "timestamp": span.get("start_time"),
    }

    # Strip system prompt from judge input
    if isinstance(input_data, dict) and "messages" in input_data:
        entry["input_messages"] = strip_system_prompt(
            input_data.get("messages", [])
        )
    elif isinstance(input_data, list):
        entry["input_messages"] = strip_system_prompt(input_data)

    if isinstance(output_data, dict):
        choices = output_data.get("choices", [])
        if choices:
            msg = choices[0].get("message", {})
            entry["output"] = {
                "content": msg.get("content", ""),
            }

    return entry


def export_session(
    session_id: str, instance_id: str, api_key: str
) -> dict[str, Any] | None:
    """Export a single session's trajectory from Laminar."""
    sid = session_id.replace("'", "''")

    # Fetch all spans for this session
    query = (
        f"SELECT name, input, output, start_time, end_time, parent_span_id "
        f"FROM spans "
        f"WHERE trace_id IN (SELECT id FROM traces WHERE session_id = '{sid}') "
        f"ORDER BY start_time ASC"
    )
    spans = query_laminar(query, api_key)

    if not spans:
        return None

    # Build trajectory entries in chronological order
    trajectory = []
    is_first_llm = True
    for span in spans:
        name = span.get("name", "")

        if name in MAIN_AGENT_SPANS:
            entry = format_llm_span(span)
            # Include the user's task prompt from the first LLM call only
            if is_first_llm:
                input_data = parse_json_field(span.get("input"))
                user_messages = []
                if isinstance(input_data, list):
                    user_messages = strip_system_prompt(input_data)
                elif isinstance(input_data, dict) and "messages" in input_data:
                    user_messages = strip_system_prompt(input_data["messages"])
                if user_messages:
                    entry["task_prompt"] = user_messages
                is_first_llm = False
            trajectory.append(entry)
        elif name.startswith(TOOL_CALL_PREFIX):
            trajectory.append(format_tool_span(span))
        elif name in JUDGE_SPANS:
            trajectory.append(format_judge_span(span))
        # Skip excluded spans silently

    return {
        "instance_id": instance_id,
        "session_id": session_id,
        "total_spans": len(spans),
        "trajectory_entries": len(trajectory),
        "trajectory": trajectory,
    }


def load_runs() -> dict[str, dict]:
    """Load runs.json and return a dict keyed by instance_id."""
    runs_file = os.path.join(HARNESS_DIR, "runs.json")
    with open(runs_file) as f:
        data = json.load(f)
    return {r["instance_id"]: r for r in data["runs"]}


def main():
    parser = argparse.ArgumentParser(
        description="Export agent trajectories from Laminar"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--instances", nargs="+", help="Specific instance IDs to export"
    )
    group.add_argument("--all", action="store_true", help="Export all instances")
    parser.add_argument(
        "--dry-run", action="store_true", help="Show what would be exported"
    )
    parser.add_argument(
        "--parallelism",
        type=int,
        default=3,
        help="Max concurrent requests (default: 3, keep low to avoid rate limits)",
    )
    args = parser.parse_args()

    api_key = get_api_key()
    runs = load_runs()

    if args.instances:
        instance_ids = args.instances
        # Validate
        for iid in instance_ids:
            if iid not in runs:
                print(f"Error: instance {iid} not found in runs.json")
                sys.exit(1)
    else:
        instance_ids = sorted(runs.keys())

    trajs_dir = os.path.join(HARNESS_DIR, "trajs")
    os.makedirs(trajs_dir, exist_ok=True)

    print(f"Exporting {len(instance_ids)} trajectories")
    if args.dry_run:
        for iid in instance_ids:
            r = runs[iid]
            print(f"  {iid}: session={r['session_id']}")
        return

    success = 0
    failed = 0
    for i, iid in enumerate(instance_ids):
        r = runs[iid]
        session_id = r["session_id"]
        print(f"[{i+1}/{len(instance_ids)}] {iid} (session={session_id[:8]}...)")

        result = export_session(session_id, iid, api_key)
        if result is None:
            print(f"  FAILED: no spans found")
            failed += 1
            continue

        output_file = os.path.join(trajs_dir, f"{iid}.json")
        with open(output_file, "w") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)

        print(
            f"  OK: {result['trajectory_entries']} entries "
            f"({result['total_spans']} total spans)"
        )
        success += 1

        # Rate limit: pause between requests to avoid 429s
        if i < len(instance_ids) - 1:
            time.sleep(1.0)

    print(f"\nDone: {success} exported, {failed} failed")


if __name__ == "__main__":
    main()
