from __future__ import annotations

from pathlib import Path
import re

from .common import CheckResult, extract_section, markdown_list_items, read_text


MARKDOWN_LINK_RE = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
BARE_DOC_PATH_RE = re.compile(r"(?<![\w/.-])(?:docs|harness)/[\w./-]+\.(?:md|txt|json)|(?<![\w/.-])(?:AGENTS|ARCHITECTURE|README)\.md")


def run(root: Path, manifest: dict) -> CheckResult:
    messages: list[str] = []

    for relative_path in manifest["required_documents"]:
        if not (root / relative_path).is_file():
            messages.append(f"Missing required document: {relative_path}")

    ignored_dirs = {".git", "node_modules", ".next", "coverage"}
    for source_path in root.rglob("*.md"):
        if not ignored_dirs.isdisjoint(source_path.parts):
            continue
        source_text = source_path.read_text(encoding="utf-8")
        for target in markdown_targets(source_text):
            normalized = target.split("#", 1)[0]
            if not normalized or normalized.startswith(("http://", "https://", "mailto:")):
                continue
            target_path = (source_path.parent / normalized).resolve()
            if not target_path.exists():
                messages.append(f"Broken markdown link in {source_path.relative_to(root)}: {target}")

        for target in bare_doc_targets(source_text):
            if not (root / target).exists():
                messages.append(f"Missing referenced path in {source_path.relative_to(root)}: {target}")

    active_plan = read_text(root, manifest["active_exec_plan"])
    required_reading = extract_section(active_plan, manifest["required_reading_heading"])
    missing_reading = []
    for item in markdown_list_items(required_reading):
        doc_path = item.strip("` ")
        if doc_path and not (root / doc_path).is_file():
            missing_reading.append(doc_path)
    if missing_reading:
        messages.append("Missing active-plan required reading: " + ", ".join(missing_reading))

    if messages:
        return CheckResult.fail("doc graph", messages)
    return CheckResult.pass_("doc graph", ["Required docs and references are present."])


def markdown_targets(text: str) -> list[str]:
    return [match.group(1) for match in MARKDOWN_LINK_RE.finditer(text)]


def bare_doc_targets(text: str) -> list[str]:
    return sorted(set(match.group(0) for match in BARE_DOC_PATH_RE.finditer(text)))
