from __future__ import annotations

from collections import Counter
from pathlib import Path
import json
import re

from .common import CheckResult, extract_section, markdown_list_items, read_text


VALID_STATUSES = {"planned", "manual", "automated"}
VALID_TYPES = {"application-test", "policy-check", "manual-qa", "contract-test"}
ID_RE = re.compile(r"^[A-Z][A-Z0-9]+-AC-\d{3}$")


def run(root: Path, manifest: dict) -> CheckResult:
    map_path = root / "harness/evidence/acceptance_map.json"
    messages: list[str] = []

    try:
        evidence_map = json.loads(map_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        return CheckResult.fail("evidence bridge", [f"Invalid acceptance evidence map: {error}"])

    sources = evidence_map.get("sources", {})
    expected_sources = [manifest["active_exec_plan"], *manifest["product_specs"]]

    mapped_count = 0
    automated_count = 0
    status_counts: Counter[str] = Counter()

    for source in expected_sources:
        documented_criteria = markdown_list_items(
            extract_section(read_text(root, source), manifest["acceptance_heading"])
        )
        mapped_entries = sources.get(source, [])
        mapped_criteria = [entry.get("criterion", "") for entry in mapped_entries]

        missing = [criterion for criterion in documented_criteria if criterion not in mapped_criteria]
        extra = [criterion for criterion in mapped_criteria if criterion not in documented_criteria]

        for criterion in missing:
            messages.append(f"Missing evidence mapping for {source}: {criterion}")
        for criterion in extra:
            messages.append(f"Evidence map has stale criterion for {source}: {criterion}")

        for entry in mapped_entries:
            mapped_count += 1
            entry_id = entry.get("id", "")
            evidence = entry.get("evidence", {})
            status = evidence.get("status", "")
            evidence_type = evidence.get("type", "")

            if not ID_RE.match(entry_id):
                messages.append(f"Invalid evidence id in {source}: {entry_id}")
            if status not in VALID_STATUSES:
                messages.append(f"Invalid evidence status for {entry_id}: {status}")
            if evidence_type not in VALID_TYPES:
                messages.append(f"Invalid evidence type for {entry_id}: {evidence_type}")
            if not evidence.get("target"):
                messages.append(f"Missing evidence target for {entry_id}")
            if status == "automated" and not evidence.get("command"):
                messages.append(f"Automated evidence missing command for {entry_id}")

            status_counts[status] += 1
            if status == "automated":
                automated_count += 1

    if messages:
        return CheckResult.fail("evidence bridge", messages)

    return CheckResult.pass_(
        "evidence bridge",
        [
            f"{mapped_count} acceptance criteria mapped.",
            f"{automated_count} automated, {status_counts['manual']} manual, {status_counts['planned']} planned.",
        ],
    )
