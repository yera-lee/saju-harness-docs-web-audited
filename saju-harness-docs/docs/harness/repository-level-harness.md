# Repository Level Harness

## Purpose

Repository level harness는 앱 코드가 생기기 전에도 저장소의 문서 계약이 구현 가능한 상태인지 검증한다.

이 하네스의 목적은 "문서가 있다"가 아니라 "Agent가 문서를 읽고 안전하게 구현할 수 있다"를 확인하는 것이다.

## Current Command

```sh
make harness-check
```

## Current Checks

### doc graph

Checks:
- 필수 문서 존재
- markdown 링크 유효성
- 문서 안의 bare path 참조 존재
- active exec-plan의 Required Reading 문서 존재

Failure means:
- Agent가 필요한 기준 문서를 읽을 수 없다.

### scope guard

Checks:
- MVP 제외 범위가 허용되지 않은 문서에 등장하는지 확인

Examples of excluded scope:
- payment
- paid report
- full compatibility report
- daily fortune
- monthly flow
- native iOS/Android
- advanced astrology dashboard

Warning means:
- MVP 범위가 흔들릴 가능성이 있다.

### safety language

Checks:
- 금지 표현이 정책/예시 문서 밖에 등장하는지 확인

Failure means:
- 사용자에게 불안을 유발하거나 단정적 예언으로 읽힐 위험이 있다.

### acceptance coverage

Checks:
- active exec-plan과 product specs에 acceptance criteria가 있는지 확인
- QA checklist가 있는지 확인

Warning means:
- 구현 후 검증 방법이 부족할 수 있다.

### evidence bridge

Checks:
- acceptance criteria가 evidence map에 정확히 연결되어 있는지 확인
- evidence id, status, type, target 형식을 확인
- automated evidence에는 command가 있는지 확인

Failure means:
- 기능 완료 여부를 추적할 수 없다.

### application contract

Checks:
- required routes
- required UI states
- onboarding fields
- report sections
- user-facing error policy

Failure means:
- 앱 구현이 따라야 할 계약과 문서가 어긋나 있다.

### domain contracts

Checks:
- `chart_json` schema 필수 필드
- calculation warning codes
- 계산/해석 분리 규칙
- 출생시간 모름 처리 규칙

Failure means:
- 사주 계산 엔진과 해석 엔진의 경계가 흐려질 수 있다.

## Expected Result

Current expected output:

```text
Result: PASS
```

Application code가 아직 없을 때도 repository level harness는 통과해야 한다.

## When to Update

Update repository harness when:
- 새 product spec이 추가된다.
- active exec-plan이 바뀐다.
- MVP 범위가 바뀐다.
- 새로운 안전 금지 표현이 발견된다.
- 새로운 domain contract가 생긴다.
- application contract가 확장된다.

