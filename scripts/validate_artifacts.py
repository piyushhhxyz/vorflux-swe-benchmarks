#!/usr/bin/env python3
"""Validate SWE-bench artifacts against the official schema.

Usage:
    python scripts/validate_artifacts.py evaluation/verified/20250519_vorflux_opus46-code_gpt55h-review
"""
import json
import os
import sys

import yaml


def validate(harness_dir: str) -> list[str]:
    errors = []

    # --- all_preds.jsonl ---
    preds_file = os.path.join(harness_dir, "all_preds.jsonl")
    if not os.path.isfile(preds_file):
        errors.append(f"MISSING: {preds_file}")
    else:
        preds = []
        with open(preds_file) as f:
            for i, line in enumerate(f, 1):
                try:
                    obj = json.loads(line)
                except json.JSONDecodeError:
                    errors.append(f"all_preds.jsonl line {i}: invalid JSON")
                    continue
                for key in ("instance_id", "model_patch", "model_name_or_path"):
                    if key not in obj:
                        errors.append(f"all_preds.jsonl line {i}: missing key '{key}'")
                preds.append(obj)

        if len(preds) != 500:
            errors.append(f"all_preds.jsonl: expected 500 lines, got {len(preds)}")

        instance_ids = [p.get("instance_id") for p in preds]
        if len(instance_ids) != len(set(instance_ids)):
            errors.append("all_preds.jsonl: duplicate instance_ids found")

        model_names = set(p.get("model_name_or_path") for p in preds)
        if len(model_names) > 1:
            errors.append(f"all_preds.jsonl: inconsistent model_name_or_path: {model_names}")

        # Cross-check with patches/
        patches_dir = os.path.join(harness_dir, "patches")
        if os.path.isdir(patches_dir):
            for pred in preds:
                iid = pred.get("instance_id", "")
                diff_file = os.path.join(patches_dir, f"{iid}.diff")
                if not os.path.isfile(diff_file):
                    errors.append(f"all_preds.jsonl: no matching patch file for {iid}")
                else:
                    with open(diff_file) as f:
                        diff_content = f.read()
                    if pred.get("model_patch") != diff_content:
                        errors.append(f"all_preds.jsonl: model_patch mismatch for {iid}")

    # --- results/results.json ---
    results_file = os.path.join(harness_dir, "results", "results.json")
    if not os.path.isfile(results_file):
        errors.append(f"MISSING: {results_file}")
    else:
        with open(results_file) as f:
            results = json.load(f)
        for key in ("resolved", "no_generation", "no_logs"):
            if key not in results:
                errors.append(f"results.json: missing key '{key}'")
        resolved_count = len(results.get("resolved", []))
        if resolved_count != 413:
            errors.append(f"results.json: expected 413 resolved, got {resolved_count}")

    # --- results/resolved_by_repo.json ---
    repo_file = os.path.join(harness_dir, "results", "resolved_by_repo.json")
    if not os.path.isfile(repo_file):
        errors.append(f"MISSING: {repo_file}")
    else:
        with open(repo_file) as f:
            by_repo = json.load(f)
        total_sum = sum(v.get("total", 0) for v in by_repo.values())
        resolved_sum = sum(v.get("resolved", 0) for v in by_repo.values())
        if total_sum != 500:
            errors.append(f"resolved_by_repo.json: total sum is {total_sum}, expected 500")
        if resolved_sum != 413:
            errors.append(f"resolved_by_repo.json: resolved sum is {resolved_sum}, expected 413")

    # --- results/resolved_by_time.json ---
    time_file = os.path.join(harness_dir, "results", "resolved_by_time.json")
    if not os.path.isfile(time_file):
        errors.append(f"MISSING: {time_file}")
    else:
        with open(time_file) as f:
            by_time = json.load(f)
        total_sum = sum(v.get("total", 0) for v in by_time.values())
        resolved_sum = sum(v.get("resolved", 0) for v in by_time.values())
        if total_sum != 500:
            errors.append(f"resolved_by_time.json: total sum is {total_sum}, expected 500")
        if resolved_sum != 413:
            errors.append(f"resolved_by_time.json: resolved sum is {resolved_sum}, expected 413")

    # --- metadata.yaml ---
    meta_file = os.path.join(harness_dir, "metadata.yaml")
    if not os.path.isfile(meta_file):
        errors.append(f"MISSING: {meta_file}")
    else:
        with open(meta_file) as f:
            meta = yaml.safe_load(f)
        for path in [
            ("info", "name"),
            ("info", "site"),
            ("tags", "model"),
            ("tags", "system", "attempts"),
        ]:
            obj = meta
            for key in path:
                if not isinstance(obj, dict) or key not in obj:
                    errors.append(f"metadata.yaml: missing key path {'.'.join(path)}")
                    break
                obj = obj[key]

    # --- README.md ---
    readme_file = os.path.join(harness_dir, "README.md")
    if not os.path.isfile(readme_file):
        errors.append(f"MISSING: {readme_file}")
    else:
        with open(readme_file) as f:
            readme = f.read()
        if "## Checklist" not in readme:
            errors.append("README.md: missing Checklist section")
        if "## Results" not in readme:
            errors.append("README.md: missing Results section")

    # --- patches/ ---
    patches_dir = os.path.join(harness_dir, "patches")
    if not os.path.isdir(patches_dir):
        errors.append(f"MISSING: {patches_dir}")
    else:
        diff_files = [f for f in os.listdir(patches_dir) if f.endswith(".diff")]
        if len(diff_files) != 500:
            errors.append(f"patches/: expected 500 .diff files, got {len(diff_files)}")

    return errors


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/validate_artifacts.py <harness_dir>")
        sys.exit(1)

    harness_dir = sys.argv[1]
    if not os.path.isdir(harness_dir):
        print(f"Error: directory not found: {harness_dir}")
        sys.exit(1)

    print(f"Validating: {harness_dir}")
    print()

    errors = validate(harness_dir)

    if errors:
        print(f"FAILED: {len(errors)} error(s) found\n")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("ALL CHECKS PASSED")
        print()
        print("  - all_preds.jsonl: 500 lines, valid JSON, unique IDs, consistent model name")
        print("  - all_preds.jsonl <-> patches/: byte-for-byte match")
        print("  - results/results.json: 413 resolved, schema valid")
        print("  - results/resolved_by_repo.json: sums to 413/500")
        print("  - results/resolved_by_time.json: sums to 413/500")
        print("  - metadata.yaml: valid YAML, required fields present")
        print("  - README.md: Checklist and Results sections present")
        print("  - patches/: 500 .diff files")


if __name__ == "__main__":
    main()
