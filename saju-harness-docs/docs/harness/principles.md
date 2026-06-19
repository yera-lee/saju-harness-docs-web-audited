# Harness Principles

## Purpose

이 문서는 하네스 엔지니어링의 기본 원칙을 정의한다.

하네스는 단순한 테스트 묶음이 아니라, 문서·제품·구현·QA 사이의 계약을 유지하는 장치다.

## Principles

### 1. Documentation Before Implementation

문서 없이 기능을 추가하지 않는다.

기능을 구현할 가치가 있다면 먼저 명세할 가치가 있다.

Required before implementation:
- product spec or exec-plan item
- acceptance criteria
- QA checklist or planned evidence
- scope decision if the feature may affect MVP boundaries

### 2. Evidence Before Completion

기능은 구현만으로 완료되지 않는다.

완료 조건:
- acceptance criteria가 존재한다.
- evidence map에 연결되어 있다.
- 자동 테스트, 수동 QA, 정책 체크 중 하나로 검증된다.
- 미검증 항목은 planned evidence로 명시된다.

### 3. Do Not Fake Tests

테스트를 속여서 통과시키지 않는다.

Forbidden:
- 실패한 테스트를 이유 없이 삭제하기
- 의미 있는 assertion을 trivial assertion으로 바꾸기
- 검증해야 할 동작 자체를 mock으로 제거하기
- 테스트를 skip하고 follow-up을 남기지 않기
- 실행하지 않은 테스트를 통과했다고 보고하기
- 하네스 정책을 실제 위반을 숨기기 위해 완화하기

If a test fails because the product contract changed, update the product document first.

### 4. Keep Code Simple and Safe

코드는 간결하고, 읽기 쉽고, 안전하게 작성한다.

Code should:
- use clear names
- prefer small focused functions
- validate external input at boundaries
- handle expected failures intentionally
- avoid leaking sensitive data through logs, errors, analytics, or prompts
- keep calculation facts separate from interpretation prose
- use structured data where practical

Avoid:
- unnecessary abstraction
- clever code that obscures product rules
- hidden side effects
- broad error swallowing
- duplicated safety logic

### 5. Safety Is a Product Requirement

사주 해석의 안전성은 부가 품질이 아니라 핵심 요구사항이다.

The service must not:
- sell fear
- imply fixed destiny
- make definitive claims about death, illness, accident, divorce, breakup, marriage, investment loss, or legal disputes
- expose raw technical errors to users

The service should:
- preserve user agency
- frame outputs as tendencies and guidance
- make uncertainty explicit

### 6. Scope Drift Must Be Visible

active exec-plan에 없는 기능은 임의로 추가하지 않는다.

When scope changes:
- update product specs or exec-plan
- record deferred work in tech-debt-tracker
- update harness policy if the new scope is accepted

### 7. Handoff Is Part of Quality

다음 Agent가 이어받을 수 있어야 한다.

Every meaningful change should leave:
- what changed
- why it changed
- what was verified
- what remains unresolved
- known risks

