from __future__ import annotations

from pathlib import Path

from .common import CheckResult, extract_section, markdown_list_items, read_text


def run(root: Path, manifest: dict) -> CheckResult:
    messages: list[str] = []

    paths = [manifest["active_exec_plan"], *manifest["product_specs"]]
    for relative_path in paths:
        text = read_text(root, relative_path)
        acceptance_items = markdown_list_items(extract_section(text, manifest["acceptance_heading"]))
        qa_items = markdown_list_items(extract_section(text, manifest["qa_heading"]))

        if not acceptance_items:
            messages.append(f"No acceptance criteria found in {relative_path}")
        if not qa_items:
            messages.append(f"No QA checklist found in {relative_path}")
        if acceptance_items and qa_items and len(qa_items) < max(3, len(acceptance_items) // 2):
            messages.append(
                f"QA checklist may be too thin in {relative_path}: "
                f"{len(qa_items)} QA items for {len(acceptance_items)} acceptance criteria"
            )

    if messages:
        return CheckResult.warn("acceptance coverage", messages)
    return CheckResult.pass_("acceptance coverage", ["Acceptance criteria and QA checklists are present."])

