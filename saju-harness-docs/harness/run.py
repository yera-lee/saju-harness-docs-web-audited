from __future__ import annotations

from pathlib import Path
import json
import sys

from checks import (
    acceptance_coverage,
    application_contract,
    doc_graph,
    domain_contracts,
    evidence_bridge,
    safety_language,
    scope_guard,
)
from checks.common import CheckResult


ROOT = Path(__file__).resolve().parents[1]


def load_json(relative_path: str) -> dict:
    return json.loads((ROOT / relative_path).read_text(encoding="utf-8"))


def main() -> int:
    manifest = load_json("harness/spec_manifest.json")
    safety_policy = load_json("harness/policies/forbidden_expressions.json")
    scope_policy = load_json("harness/policies/allowed_scope.json")

    results = [
        doc_graph.run(ROOT, manifest),
        scope_guard.run(ROOT, scope_policy),
        safety_language.run(ROOT, safety_policy),
        acceptance_coverage.run(ROOT, manifest),
        evidence_bridge.run(ROOT, manifest),
        application_contract.run(ROOT),
        domain_contracts.run(ROOT),
    ]

    print_report(results)
    return 1 if any(result.status == "FAIL" for result in results) else 0


def print_report(results: list[CheckResult]) -> None:
    print("Repository Spec Harness Report")
    print()
    for result in results:
        print(f"{result.status:4} {result.name}")
        for message in result.messages:
            print(f"     - {message}")
    print()

    if any(result.status == "FAIL" for result in results):
        print("Result: FAIL")
    elif any(result.status == "WARN" for result in results):
        print("Result: PASS with warnings")
    else:
        print("Result: PASS")


if __name__ == "__main__":
    sys.exit(main())
