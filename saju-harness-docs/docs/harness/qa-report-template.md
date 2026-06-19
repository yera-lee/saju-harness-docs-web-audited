# QA Report Template

## Purpose

이 문서는 QA Agent가 릴리즈 또는 주요 변경 검증 후 작성할 표준 보고서 형식을 정의한다.

QA report는 단순 체크리스트가 아니라, 릴리즈 판단에 필요한 evidence와 리스크를 기록하는 문서다.

## Template

```md
# QA Report

## Summary

- Scope:
- Date:
- Reviewer:
- Release candidate:
- Recommendation: Ship / Ship with fixes / Do not ship

## Harness Results

- `make harness-check`:
- `make application-harness-check`:
- Notes:

## Quality Score

- Product Fit:
- UX Quality:
- Technical Correctness:
- Safety & Trust:
- Maintainability:
- Total:

## Evidence Status

- Automated evidence:
- Manual evidence:
- Planned evidence:
- Release-bound planned evidence:

## Tested Flows

- Landing:
- Onboarding:
- Analyzing/loading:
- First report:
- Compatibility CTA:
- Error/retry:
- Mobile layout:

## Safety Review

- Definitive prediction check:
- Forbidden expression check:
- High-risk topics check:
- Unknown birth time handling:
- Raw error exposure check:
- Notes:

## Privacy Review

- Sensitive logging:
- Prompt minimization:
- Payment data handling:
- Report deletion:
- Notes:

## Blocking Issues

| ID | Severity | Area | Issue | Evidence | Required Fix |
|---|---|---|---|---|---|

## Non-Blocking Issues

| ID | Severity | Area | Issue | Evidence | Suggested Follow-up |
|---|---|---|---|---|---|

## Regression Risks

- 

## Deferred Work

- 

## Final Recommendation

Ship / Ship with fixes / Do not ship

Reason:
```

## Scoring Guidance

Use `docs/QUALITY_SCORE.md` as the scoring source.

### Product Fit

Look for:
- alignment with "나는 왜 비슷한 연애를 반복할까?"
- relationship-first MVP flow
- natural compatibility CTA
- no drift into post-MVP features

### UX Quality

Look for:
- short onboarding
- clear validation
- mobile readability
- recoverable failure states
- non-coercive CTA

### Technical Correctness

Look for:
- spec compliance
- consistent data structures
- calculation/interpretation separation
- retry and error handling
- route behavior

### Safety & Trust

Look for:
- no fear-selling
- no definitive prediction
- no sensitive data leakage
- safe prompt usage
- clear user-facing notices

### Maintainability

Look for:
- docs updated
- evidence updated
- simple readable code
- handoff notes
- tests or manual QA records

## QA Rules

QA must not:
- mark unrun tests as passing
- ignore safety failures as copy issues
- accept missing evidence for release-bound criteria
- treat planned evidence as release evidence
- downgrade blocking privacy or safety issues without documenting why

