# Evidence Model

## Purpose

Evidence model은 acceptance criteria와 검증 수단을 연결한다.

이 모델은 "무엇을 만들었는가"보다 "무엇을 증명했는가"를 추적한다.

## Source File

```text
harness/evidence/acceptance_map.json
```

## Evidence Entry

Each entry contains:

- id
- criterion
- evidence.status
- evidence.type
- evidence.target
- evidence.command for automated evidence

## Status

### planned

검증 계획은 있지만 아직 실행 가능한 evidence가 없다.

Allowed when:
- application code does not exist yet
- feature is planned but not implemented
- test strategy is known but not written

Not enough for:
- release readiness
- safety-critical verification

### manual

수동 QA로 검증한다.

Allowed when:
- subjective UX judgement is required
- visual review is required
- automation is not yet cost-effective

Manual evidence should include:
- clear steps
- expected result
- reviewer or date in QA report when release-bound

### automated

명령어로 실행 가능한 evidence다.

Required fields:
- command
- target

Preferred for:
- validation rules
- route behavior
- report structure
- safety language checks
- error state behavior
- domain contract checks

## Evidence Types

### application-test

앱 구현을 실행하거나 테스트 프레임워크로 검증한다.

Examples:
- unit test
- integration test
- Playwright test
- API contract test

### policy-check

정책 파일이나 문서 규칙으로 검증한다.

Examples:
- forbidden expression check
- MVP scope guard
- sensitive logging pattern check

### manual-qa

사람이 직접 확인한다.

Examples:
- 모바일 가독성
- CTA가 강매처럼 느껴지지 않는지
- 리포트 톤이 과하게 신비주의적이지 않은지

### contract-test

스키마와 데이터 계약을 검증한다.

Examples:
- `chart_json` schema
- API response shape
- warning code enum

## Rules

### No Orphan Acceptance Criteria

모든 acceptance criteria는 evidence map에 있어야 한다.

### No Stale Evidence

문서에서 사라진 acceptance criteria가 evidence map에 남아 있으면 안 된다.

### No Fake Evidence

Evidence command는 실제로 검증해야 하는 동작을 확인해야 한다.

Bad:
- command only echoes success
- assertion checks that true is true
- test mocks away the behavior under test

Good:
- command exercises the target behavior
- assertion checks user-visible or contract-visible outcome
- failure would catch a real regression

## Release Use

QA Agent should read evidence status before release recommendation.

Release-blocking concerns:
- safety criteria remain planned
- core onboarding criteria remain planned
- report generation failure behavior lacks evidence
- raw technical error exposure lacks evidence

