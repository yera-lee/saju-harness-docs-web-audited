# Slice 1 Plan: Web MVP Shell + Onboarding + Placeholder Report

## Objective

구현 첫 slice는 사용자가 landing에서 시작해 onboarding을 완료하고 placeholder 첫 리포트를 본 뒤 compatibility CTA까지 도달하는 vertical flow를 만든다.

이 slice는 실제 사주 계산 정확도보다 제품 흐름, 검증 계약, 안전 문체, 하네스 연결을 증명한다.

## Included

- Next.js app scaffold
- TypeScript setup
- Tailwind setup
- landing route `/`
- onboarding route `/onboarding`
- analyzing route `/analyzing`
- report route `/reports/:reportId`
- compatibility start route `/compatibility/start`
- generic error route `/error`
- onboarding form fields
- client-side validation
- placeholder birth profile submission
- placeholder chart_json generation
- placeholder first love pattern report
- safety expression check
- report rendering
- compatibility CTA
- basic tests
- evidence map updates for implemented tests

## Excluded

- real saju calculation engine
- real lunar conversion
- LLM report generation
- production database
- authentication
- payment
- full compatibility report
- deployment

## Implementation Steps

1. Scaffold app.
2. Add routes from route contract.
3. Add module boundaries from module-boundaries doc.
4. Add shared data types from data contracts.
5. Add repository interfaces.
6. Add onboarding validation helpers.
7. Add placeholder storage adapters behind repository interfaces.
8. Add placeholder calculation engine behind engine interface.
9. Add placeholder interpretation engine behind engine interface.
10. Add safety scanner behind safety reviewer interface.
11. Render report sections.
12. Add compatibility CTA.
13. Add unit tests for validation and safety scanner.
14. Add route or component tests for core flow.
15. Update evidence map from planned to automated for covered criteria.
16. Run repository and application harness.

## Minimum Tests for Slice 1

Automate if practical:
- invalid future birth date fails validation
- birth_time_unknown allows missing birth_time
- valid onboarding payload passes validation
- placeholder chart_json matches schema intent
- safety scanner catches forbidden expressions
- report contains nickname
- report contains required sections
- compatibility CTA exists

Manual QA acceptable for first slice:
- mobile readability
- CTA tone
- loading copy feel

## Expected Evidence Updates

Potential automated evidence:
- MVP-AC-001
- MVP-AC-002
- MVP-AC-004
- MVP-AC-005
- MVP-AC-006
- MVP-AC-008
- MVP-AC-009
- ONB-AC-001
- ONB-AC-002
- ONB-AC-005
- ONB-AC-006
- RPT-AC-001
- RPT-AC-002
- RPT-AC-003
- RPT-AC-004

## Acceptance Criteria

- user can complete onboarding without birth time
- invalid date shows friendly error
- submit shows analyzing state
- report includes nickname
- report includes love style and repeating relationship pattern
- report ends with compatibility CTA
- generation failure state has retry path
- raw technical error is not shown
- definitive prediction text is absent

## Handoff Requirements

After implementation, report:
- scaffold commands used
- routes implemented
- tests added
- evidence entries updated
- known placeholder limitations
- tech debt updates
- harness outputs
