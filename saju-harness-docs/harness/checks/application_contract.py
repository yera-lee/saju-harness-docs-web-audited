from __future__ import annotations

from pathlib import Path
import json

from .common import CheckResult, read_text


def run(root: Path) -> CheckResult:
    messages: list[str] = []
    contract_path = root / "harness/policies/application_contract.json"

    try:
        contract = json.loads(contract_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        return CheckResult.fail("application contract", [f"Invalid application contract JSON: {error}"])

    frontend_text = read_text(root, "docs/FRONTEND.md")
    onboarding_text = read_text(root, "docs/product-specs/new-user-onboarding.md")
    report_text = read_text(root, "docs/product-specs/first-love-pattern-report.md")

    for route in contract["required_routes"]:
        if route not in frontend_text:
            messages.append(f"Required route missing from FRONTEND.md: {route}")

    for state in contract["required_states"]:
        if state not in frontend_text:
            messages.append(f"Required UI state missing from FRONTEND.md: {state}")

    for field in contract["required_onboarding_fields"]:
        if field not in onboarding_text and field not in frontend_text:
            messages.append(f"Required onboarding field missing from specs: {field}")

    report_section_terms = {
        "one_line_summary": "One-Line Summary",
        "love_style": "Love Style",
        "attraction_pattern": "Attraction Pattern",
        "repeating_relationship_pattern": "Repeating Relationship Pattern",
        "relationship_advice": "Relationship Advice",
        "compatibility_cta": "Compatibility CTA",
    }
    for section, term in report_section_terms.items():
        if section in contract["required_report_sections"] and term not in report_text:
            messages.append(f"Required report section missing from first report spec: {section}")

    for raw_error in contract["user_error_policy"]["must_not_expose"]:
        if raw_error in frontend_text and "Bad:" not in frontend_text:
            messages.append(f"Raw error copy appears without example context: {raw_error}")

    if messages:
        return CheckResult.fail("application contract", messages)
    return CheckResult.pass_("application contract", ["Frontend routes, states, fields, and report sections are contract-backed."])
