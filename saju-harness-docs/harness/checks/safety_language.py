from __future__ import annotations

from pathlib import Path

from .common import CheckResult, iter_markdown_files


def run(root: Path, policy: dict) -> CheckResult:
    hard_messages: list[str] = []
    warn_messages: list[str] = []
    ignored = set(policy["ignored_files"])

    for path in iter_markdown_files(root):
        relative = path.relative_to(root).as_posix()
        if relative in ignored:
            continue
        text = path.read_text(encoding="utf-8")
        for expression in policy["hard_forbidden"]:
            if expression in text:
                hard_messages.append(f"Hard-forbidden expression '{expression}' appears in {relative}")
        for expression in policy["soft_forbidden"]:
            if expression in text:
                warn_messages.append(f"Soft-forbidden expression '{expression}' appears in {relative}")

    if hard_messages:
        return CheckResult.fail("safety language", hard_messages + warn_messages)
    if warn_messages:
        return CheckResult.warn("safety language", warn_messages)
    return CheckResult.pass_("safety language", ["No forbidden safety expressions found outside policy/example docs."])

