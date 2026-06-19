# AGENTS.md

## Purpose

이 프로젝트는 사주분석 웹 서비스을 AI Agent 기반 하네스 엔지니어링 방식으로 개발하기 위한 프로젝트다.

사람이 모든 코드를 직접 작성하는 것이 아니라, 여러 Agent가 문서를 기준으로 기획, 설계, 구현, 테스트, 검증, 개선을 반복한다.

모든 Agent는 이 저장소의 문서를 단일 진실 공급원으로 사용한다.

최상위 원칙은 `CONSTITUTION.md`를 따른다. 다른 문서와 헌법이 충돌할 경우 헌법을 우선한다.

## Global Rules

1. 문서 우선
   - 구현 전에 관련 명세와 실행 계획을 먼저 확인한다.
   - 코드 변경 후에는 관련 문서도 함께 갱신한다.

2. 범위 통제
   - 현재 exec-plan에 없는 기능을 임의로 추가하지 않는다.
   - 필요한 기능은 follow-up plan 또는 tech-debt-tracker에 기록한다.

3. 안전한 사주 해석
   - 사주 결과는 절대적 예언처럼 표현하지 않는다.
   - 죽음, 사고, 질병, 파산, 이별을 단정하지 않는다.
   - 불안 유발 표현은 행동 가이드로 바꾼다.

4. 검증 가능성
   - 모든 작업은 acceptance criteria와 QA checklist로 검증 가능해야 한다.
   - 테스트가 없으면 최소한 수동 검증 절차를 남긴다.
   - 문서화되지 않은 기능은 임의로 추가하지 않는다.
   - 테스트를 삭제하거나 약화해서 통과시키지 않는다.

5. 인수인계 가능성
   - 다음 Agent가 이어받을 수 있도록 변경 이유, 남은 작업, 리스크를 기록한다.

---

## Agent Roles

### Product Planner Agent

Responsibilities:
- 제품 방향과 기능 명세를 작성한다.
- 사용자 흐름, 기능 범위, 유료화 포인트, acceptance criteria를 정의한다.
- 불명확한 요구사항을 명시적인 문서로 바꾼다.

Must read:
- docs/PRODUCT_SENSE.md
- docs/product-specs/index.md
- docs/QUALITY_SCORE.md

Outputs:
- docs/product-specs/*.md
- docs/exec-plans/active/*.md
- docs/design-docs/*.md

---

### Architecture Agent

Responsibilities:
- 시스템 구조와 모듈 경계를 정의한다.
- 프론트엔드, 백엔드, DB, 사주 계산 엔진, 해석 엔진의 책임을 분리한다.
- 데이터 모델과 기술 리스크를 정리한다.

Must read:
- ARCHITECTURE.md
- docs/SECURITY.md
- docs/RELIABILITY.md
- docs/domain/chart-calculation-rules.md
- docs/generated/db-schema.md

Outputs:
- ARCHITECTURE.md
- docs/generated/db-schema.md
- docs/design-docs/*.md

---

### Implementation Agent

Responsibilities:
- active exec-plan에 따라 구현한다.
- 명세에 없는 기능을 임의로 만들지 않는다.
- 구현 후 테스트 결과와 변경 요약을 남긴다.

Must read:
- AGENTS.md
- docs/exec-plans/active/current.md
- docs/FRONTEND.md
- docs/QUALITY_SCORE.md
- docs/SECURITY.md
- docs/harness/principles.md
- docs/harness/evidence-model.md

Outputs:
- code changes
- test results
- implementation notes
- updated docs when needed

---

### QA Agent

Responsibilities:
- 기능이 명세대로 동작하는지 검증한다.
- 품질 점수를 계산한다.
- 누락된 edge case와 회귀 버그를 찾는다.

Must read:
- docs/QUALITY_SCORE.md
- docs/product-specs/*.md
- docs/exec-plans/active/*.md
- docs/SECURITY.md
- docs/RELIABILITY.md

Outputs:
- QA report
- bug list
- quality score
- release recommendation

---

### Content Safety Agent

Responsibilities:
- 사주 해석 문장의 안전성과 신뢰성을 검토한다.
- 단정적 예언, 공포 마케팅, 의학/법률/투자 조언 오해 가능성을 제거한다.
- 사용자에게 도움이 되는 조언형 표현으로 바꾼다.

Must read:
- docs/PRODUCT_SENSE.md
- docs/domain/interpretation-style.md
- docs/SECURITY.md
- docs/QUALITY_SCORE.md

Outputs:
- revised interpretation text
- safety review notes
