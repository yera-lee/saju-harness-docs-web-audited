# Harness Docs Index

## Purpose

이 디렉터리는 사주 웹 서비스를 하네스 엔지니어링 방식으로 개발하기 위한 검증 체계를 설명한다.

하네스는 Agent가 문서를 읽고 구현하는 과정에서 제품 방향, 안전 원칙, 범위, 품질 기준이 흐트러지지 않도록 돕는 자동·수동 검증 계층이다.

## Current Harness Docs

- principles.md
- repository-level-harness.md
- application-level-harness.md
- evidence-model.md
- agent-workflow.md
- release-gates.md
- qa-report-template.md
- test-strategy.md
- safety-evaluation.md
- implementation-readiness.md

## Harness Layers

### Repository Level Harness

문서 저장소 자체를 검증한다.

Responsibilities:
- 필수 문서 존재 여부 확인
- 문서 간 참조 확인
- active exec-plan 범위 확인
- 안전 문구 정책 확인
- acceptance criteria와 QA checklist 확인
- acceptance criteria와 evidence map 연결 확인
- application contract와 문서 일치 여부 확인

### Application Level Harness

앱 구현이 문서 계약을 만족하는지 검증한다.

Responsibilities:
- 라우트 존재 여부 확인
- 온보딩 입력 검증 확인
- 로딩/오류/재시도 상태 확인
- 리포트 구조 확인
- 안전 필터 적용 여부 확인
- 궁합 CTA 위치 확인
- 사용자에게 원시 오류가 노출되지 않는지 확인

### Domain Contract Harness

사주 계산과 해석의 경계를 검증한다.

Responsibilities:
- `chart_json` 구조 확인
- warning code enum 확인
- 출생시간 모름 처리 확인
- 계산 엔진과 해석 엔진 분리 확인
