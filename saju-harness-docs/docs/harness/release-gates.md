# Release Gates

## Purpose

릴리즈 게이트는 MVP를 배포해도 되는지 판단하는 최소 기준이다.

이 문서는 "기능이 대체로 동작한다"가 아니라 "사용자에게 안전하고 검증 가능한 상태로 나갈 수 있다"를 확인한다.

## Gate Summary

MVP release requires:
- repository harness passes
- application harness passes
- quality score minimum bar is met
- safety-related acceptance criteria have evidence
- onboarding and first report core flows have evidence
- known blocking issues are resolved
- release QA report is written

## Gate 1. Repository Contract

Command:

```sh
make harness-check
```

Required result:

```text
Result: PASS
```

Blocking if:
- required documents are missing
- active exec-plan references missing docs
- safety language hard failure exists
- acceptance criteria are not mapped to evidence
- application contract contradicts product docs
- domain contract is incomplete

## Gate 2. Application Evidence

Command:

```sh
make application-harness-check
```

Before application code exists:
- planned evidence is acceptable

Before MVP release:
- core MVP evidence must be automated or manual
- safety evidence should be automated where possible
- planned evidence must be limited to explicitly deferred work

Blocking if release-bound criteria remain planned:
- unknown birth time flow
- invalid date validation
- loading state after submit
- report success navigation
- report nickname personalization
- report section structure
- compatibility CTA
- retry on report generation failure
- no raw API error exposure
- no definitive prediction output

## Gate 3. Quality Score

Minimum bar:
- total score must be at least 80
- Safety & Trust must be at least 15
- Technical Correctness must be at least 15

Blocking if:
- Safety & Trust is below 15
- Technical Correctness is below 15
- total score is below 80
- QA Agent recommends "Do not ship"

## Gate 4. Safety Review

Safety review must verify:
- no definitive prediction phrasing
- no fear-based conversion copy
- no medical, legal, investment, death, illness, accident, or fixed relationship outcome claims
- unknown birth time does not produce time-pillar-based certainty
- unsafe report generation failure does not publish output
- user-facing errors do not expose raw provider details

Blocking if:
- unsafe text can reach users
- safety filter can fail open
- high-risk topic guidance is framed as prediction or instruction

## Gate 5. Privacy and Logging

Must verify:
- full birth date and direct identifier are not logged together
- payment details are not stored directly
- raw relationship concern text is not logged unless necessary
- prompts use minimum necessary data
- report deletion path is documented or deferred explicitly
- report access control is enforced
- guest session cookie security is documented and implemented
- audit logs use allowlisted metadata only

Blocking if:
- sensitive data is logged by default
- payment data is sent to prompts
- raw technical errors expose sensitive details
- report can be read by ID alone without owner session or valid share token
- deletion or retention policy is undefined before public release

## Gate 6. UX Reliability

Must verify:
- mobile width around 360px is usable
- labels exist for inputs
- loading state has text
- retry is available for generation failure
- duplicate submit is prevented
- report URL can be revisited after success

Blocking if:
- user loses entered data on validation failure
- user cannot recover from report generation failure
- primary CTA path is broken

## Gate 7. Handoff

Release handoff must include:
- what shipped
- what was verified
- harness outputs
- quality score
- known limitations
- deferred work with tracker references
- release recommendation

## Release Decisions

### Ship

Allowed when:
- all gates pass
- no blocking issue remains
- evidence is sufficient for MVP scope

### Ship with fixes

Allowed only when:
- issues are non-blocking
- safety and technical correctness bars pass
- follow-up owners are clear

### Do not ship

Required when:
- safety gate fails
- technical correctness gate fails
- core onboarding/report flow lacks evidence
- known data leak risk remains
