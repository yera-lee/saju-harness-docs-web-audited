# Placeholder Engines

## Purpose

MVP may begin with placeholder calculation and report generation while preserving the final architecture boundary.

Placeholder engines must be honest, structured, and easy to replace.

Interfaces are defined in `docs/implementation/engine-interfaces.md`.

## Placeholder Calculation Engine

Responsibilities:
- accept BirthProfile
- return valid ChartJson
- record calculation warnings
- avoid natural language interpretation

Must not:
- generate user-facing report prose
- pretend to be accurate real saju calculation
- omit warnings when data is incomplete

Behavior:
- use deterministic placeholder values
- set `hour_pillar` to null when `birth_time_unknown` is true
- include `birth_time_unknown` warning when applicable
- include `timezone_defaulted` if timezone is defaulted

Example output:

```json
{
  "year_pillar": {
    "heavenly_stem": "placeholder",
    "earthly_branch": "placeholder"
  },
  "month_pillar": {
    "heavenly_stem": "placeholder",
    "earthly_branch": "placeholder"
  },
  "day_pillar": {
    "heavenly_stem": "placeholder",
    "earthly_branch": "placeholder"
  },
  "hour_pillar": null,
  "day_master": "placeholder",
  "five_elements_distribution": {
    "wood": 1,
    "fire": 1,
    "earth": 1,
    "metal": 1,
    "water": 1
  },
  "ten_gods_distribution": {},
  "calculation_warnings": ["birth_time_unknown", "timezone_defaulted"]
}
```

## Placeholder Interpretation Engine

Responsibilities:
- accept BirthProfile, ChartJson, selected interests
- return FirstLovePatternReport shape
- include required sections
- use safe non-definitive language

Must not:
- claim precise saju accuracy
- include forbidden expressions
- produce high-risk life advice
- ignore safety filter

Required sections:
- one_line_summary
- love_style
- attraction_pattern
- repeating_relationship_pattern
- relationship_advice
- compatibility_cta

## Safety Filter

Placeholder safety filter may begin as:
- forbidden expression scanner
- high-risk topic scanner
- raw error text blocker

Rules:
- if unsafe expression appears, rewrite or fail closed
- failed safety status must not publish report
- safety status must be saved on report

## Replacement Path

When replacing placeholder engines:
1. Keep public interfaces stable.
2. Add contract tests before replacement.
3. Update tech-debt tracker item status.
4. Update calculation_version or prompt_version.
5. Run harness and application evidence.
