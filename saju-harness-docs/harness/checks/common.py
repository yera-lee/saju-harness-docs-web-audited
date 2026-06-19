from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
import re


@dataclass
class CheckResult:
    name: str
    status: str
    messages: list[str] = field(default_factory=list)

    @classmethod
    def pass_(cls, name: str, messages: list[str] | None = None) -> "CheckResult":
        return cls(name=name, status="PASS", messages=messages or [])

    @classmethod
    def warn(cls, name: str, messages: list[str]) -> "CheckResult":
        return cls(name=name, status="WARN", messages=messages)

    @classmethod
    def fail(cls, name: str, messages: list[str]) -> "CheckResult":
        return cls(name=name, status="FAIL", messages=messages)


def read_text(root: Path, relative_path: str) -> str:
    return (root / relative_path).read_text(encoding="utf-8")


def iter_markdown_files(root: Path) -> list[Path]:
    ignored_dirs = {".git", "node_modules", ".next", "coverage"}
    return sorted(path for path in root.rglob("*.md") if ignored_dirs.isdisjoint(path.parts))


def markdown_list_items(section_text: str) -> list[str]:
    items: list[str] = []
    for line in section_text.splitlines():
        stripped = line.strip()
        if stripped.startswith("- "):
            items.append(stripped[2:].strip())
        elif re.match(r"^\d+\.\s+", stripped):
            items.append(re.sub(r"^\d+\.\s+", "", stripped).strip())
    return items


def extract_section(text: str, heading: str) -> str:
    lines = text.splitlines()
    start_index: int | None = None
    heading_level = heading_level_of(heading)

    for index, line in enumerate(lines):
        if line.strip() == heading:
            start_index = index + 1
            break

    if start_index is None:
        return ""

    collected: list[str] = []
    for line in lines[start_index:]:
        stripped = line.strip()
        if stripped.startswith("#") and heading_level_of(stripped) <= heading_level:
            break
        collected.append(line)
    return "\n".join(collected).strip()


def heading_level_of(line: str) -> int:
    return len(line) - len(line.lstrip("#"))
