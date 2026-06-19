from __future__ import annotations

from pathlib import Path
import json
import shlex
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    evidence_map = json.loads((ROOT / "harness/evidence/acceptance_map.json").read_text(encoding="utf-8"))
    automated = []
    planned = 0
    manual = 0

    for source, entries in evidence_map.get("sources", {}).items():
        for entry in entries:
            evidence = entry.get("evidence", {})
            status = evidence.get("status")
            if status == "automated":
                automated.append((source, entry))
            elif status == "manual":
                manual += 1
            elif status == "planned":
                planned += 1

    print("Application Harness Report")
    print()

    failures = []
    command_groups = {}
    for source, entry in automated:
        command = entry["evidence"].get("command")
        if not command:
            failures.append(f"{entry['id']} is automated but has no command.")
            continue
        command_groups.setdefault(command, []).append((source, entry))

    for command, entries in command_groups.items():
        ids = ", ".join(entry["id"] for _, entry in entries)
        print(f"RUN  {ids}")
        print(f"     command: {command}")
        completed = subprocess.run(
            shlex.split(command),
            cwd=ROOT,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=False,
        )
        if completed.stdout.strip():
            print(indent(completed.stdout.strip()))
        if completed.returncode != 0:
            failures.append(f"{ids} failed with exit code {completed.returncode}: {command}")

    print(f"Automated evidence: {len(automated)}")
    print(f"Manual evidence: {manual}")
    print(f"Planned evidence: {planned}")
    print()

    if failures:
        for failure in failures:
            print(f"FAIL {failure}")
        print()
        print("Result: FAIL")
        return 1

    if not automated:
        print("Result: PASS")
        print("No automated application evidence is registered yet.")
        return 0

    print("Result: PASS")
    return 0


def indent(text: str) -> str:
    return "\n".join(f"     {line}" for line in text.splitlines())


if __name__ == "__main__":
    sys.exit(main())
