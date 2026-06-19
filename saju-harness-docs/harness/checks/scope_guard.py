from __future__ import annotations

from pathlib import Path

from .common import CheckResult, iter_markdown_files


def run(root: Path, policy: dict) -> CheckResult:
    messages: list[str] = []
    excluded_terms = [term.lower() for term in policy["mvp_excluded"]]
    allowed_files = set(policy["allowed_excluded_mentions"])

    for path in iter_markdown_files(root):
        relative = path.relative_to(root).as_posix()
        if relative in allowed_files:
            continue
        text = path.read_text(encoding="utf-8").lower()
        for term in excluded_terms:
            if term in text:
                messages.append(f"Out-of-scope term '{term}' appears in {relative}")

    if messages:
        return CheckResult.warn("scope guard", messages)
    return CheckResult.pass_("scope guard", ["No out-of-scope MVP terms found outside allowed policy docs."])

