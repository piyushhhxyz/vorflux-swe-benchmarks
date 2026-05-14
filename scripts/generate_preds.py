#!/usr/bin/env python3
"""Generate all_preds.jsonl from patches directory.

Usage:
    python scripts/generate_preds.py evaluation/verified/20250519_vorflux_opus46-code_gpt55h-review
"""
import json
import os
import sys


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/generate_preds.py <harness_dir>")
        sys.exit(1)

    harness_dir = sys.argv[1]
    patches_dir = os.path.join(harness_dir, "patches")
    output_file = os.path.join(harness_dir, "all_preds.jsonl")

    model_name = "vorflux_opus46-code_gpt55h-review"

    if not os.path.isdir(patches_dir):
        print(f"Error: patches directory not found: {patches_dir}")
        sys.exit(1)

    predictions = []
    for filename in sorted(os.listdir(patches_dir)):
        if not filename.endswith(".diff"):
            continue
        instance_id = filename[:-5]  # strip .diff
        filepath = os.path.join(patches_dir, filename)
        with open(filepath, "r") as f:
            model_patch = f.read()
        predictions.append({
            "instance_id": instance_id,
            "model_patch": model_patch,
            "model_name_or_path": model_name,
        })

    predictions.sort(key=lambda x: x["instance_id"])

    with open(output_file, "w") as f:
        for pred in predictions:
            f.write(json.dumps(pred, ensure_ascii=False) + "\n")

    print(f"Generated {output_file} with {len(predictions)} predictions")

    # Validate
    instance_ids = [p["instance_id"] for p in predictions]
    assert len(instance_ids) == len(set(instance_ids)), "Duplicate instance_ids found!"
    assert all(
        p["model_name_or_path"] == model_name for p in predictions
    ), "Inconsistent model_name_or_path!"
    print("Validation passed: no duplicates, consistent model name")


if __name__ == "__main__":
    main()
