# Test Strategy

## Purpose

이 문서는 MVP 구현 시 어떤 테스트를 어떤 계층에서 작성할지 정의한다.

테스트 전략의 목표는 빠른 구현이 아니라, 제품 계약을 안전하게 반복 검증할 수 있게 만드는 것이다.

## Test Layers

### Repository Tests

Command:

```sh
make harness-check
```

Purpose:
- 문서 계약 검증
- scope drift 감지
- safety language 감지
- evidence map 검증
- domain/application contract 검증

Run:
- every documentation change
- before implementation handoff
- before release QA

### Application Evidence Runner

Command:

```sh
make application-harness-check
```

Purpose:
- evidence map의 automated command 실행
- acceptance criteria 단위 검증 상태 확인

Run:
- after implementing tests
- before QA
- before release

### Unit Tests

Use for:
- input validation
- date parsing
- birth_time_unknown handling
- report section builders
- safety rewrite helpers
- chart_json schema helpers

Should avoid:
- testing framework internals
- duplicating implementation details
- weak assertions

### Contract Tests

Use for:
- API request/response shape
- `chart_json` schema
- calculation warning codes
- report_json structure
- safety filter result shape

Contract tests should fail when:
- required field disappears
- enum changes without document update
- calculation result includes interpretation prose
- report output omits required sections

### Integration Tests

Use for:
- onboarding submit flow
- birth profile creation
- chart generation interface
- report generation interface
- safety filter before publish
- retry behavior

Integration tests should include:
- happy path
- invalid input
- network or backend failure
- report generation failure
- unknown birth time

### End-to-End Tests

Use for:
- landing to onboarding
- onboarding to analyzing
- analyzing to report
- report to compatibility CTA
- retry after failure
- mobile viewport behavior

Recommended scenarios:
- solar date with birth time
- lunar date with birth time unknown
- invalid future date
- long nickname
- generation failure and retry

### Safety Tests

Use for:
- forbidden expressions
- high-risk topics
- definitive prediction phrasing
- unknown birth time certainty
- raw error exposure

Safety tests should be easy to extend when new risky phrases are found.

## Test Data

Test data should:
- avoid real personal data
- use clearly fake nicknames
- cover calendar_type solar and lunar
- include birth_time_unknown true and false
- include edge cases near date boundaries when calculation engine exists

Do not:
- commit real birth profiles
- commit real relationship concerns
- commit raw production reports

## Minimum MVP Test Set

Before MVP release, the project should have evidence for:
- valid onboarding submit
- invalid birth date error
- birth time unknown flow
- report generation success
- report generation failure retry
- report contains nickname
- report contains required sections
- compatibility CTA appears
- forbidden expression blocked or absent
- raw API error not exposed
- mobile layout smoke check

## Test Integrity Rules

Tests must not be changed only to make the build green.

When a test fails:
1. Determine whether implementation or spec is wrong.
2. If implementation is wrong, fix implementation.
3. If spec changed, update docs first.
4. Update evidence map after test command exists.

Forbidden:
- trivial assertion replacement
- skipping without tracker entry
- mocking away target behavior
- reporting command success without running it
- narrowing test input to avoid a known bug

