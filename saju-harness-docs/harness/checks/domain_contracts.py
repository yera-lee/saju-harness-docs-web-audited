from __future__ import annotations

from pathlib import Path
import json

from .common import CheckResult, read_text


REQUIRED_SCHEMA_FIELDS = {
    "year_pillar",
    "month_pillar",
    "day_pillar",
    "hour_pillar",
    "day_master",
    "five_elements_distribution",
    "ten_gods_distribution",
    "calculation_warnings",
}

REQUIRED_WARNING_CODES = {
    "birth_time_unknown",
    "lunar_conversion_uncertain",
    "timezone_defaulted",
    "edge_case_near_day_boundary",
    "unsupported_date_range",
}


def run(root: Path) -> CheckResult:
    messages: list[str] = []
    schema_path = root / "harness/policies/chart_json.schema.json"

    try:
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        return CheckResult.fail("domain contracts", [f"Invalid JSON schema: {error}"])

    required = set(schema.get("required", []))
    missing_fields = sorted(REQUIRED_SCHEMA_FIELDS - required)
    if missing_fields:
        messages.append("chart_json schema missing required fields: " + ", ".join(missing_fields))

    schema_text = json.dumps(schema, ensure_ascii=False)
    missing_warnings = sorted(code for code in REQUIRED_WARNING_CODES if code not in schema_text)
    if missing_warnings:
        messages.append("chart_json schema missing warning codes: " + ", ".join(missing_warnings))

    rules_text = read_text(root, "docs/domain/chart-calculation-rules.md")
    if "계산 엔진은 해석 문장을 생성하지 않는다" not in rules_text:
        messages.append("Calculation/interpretation separation rule is missing from chart calculation rules.")
    if "hour_pillar는 null" not in rules_text:
        messages.append("birth_time_unknown hour_pillar null rule is missing from chart calculation rules.")

    if messages:
        return CheckResult.fail("domain contracts", messages)
    return CheckResult.pass_("domain contracts", ["chart_json schema and domain rules are present."])

