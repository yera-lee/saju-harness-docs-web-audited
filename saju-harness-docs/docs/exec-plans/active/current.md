# Exec Plan: New User Onboarding MVP

## Objective

사용자가 생년월일 정보를 입력하고 첫 사주 기반 연애 성향 리포트를 받을 수 있는 MVP 온보딩 플로우를 구현한다.

## Scope

Included:
- 웹 랜딩 페이지
- 반응형 웹 온보딩 UI
- 생년월일 입력
- 양력/음력 선택
- 출생시간 입력 또는 모름 선택
- 성별 선택
- 관심 주제 선택
- 기본 birth profile 저장
- placeholder 또는 실제 chart_json 생성
- 첫 연애 성향 리포트 생성
- 웹 결과 페이지 표시
- 궁합 CTA 표시
- 오류/로딩/재시도 상태

Excluded:
- 결제
- 완전한 궁합 리포트
- 월간 운세
- 데일리 운세
- 고급 만세력 UI
- 전문 명리학자용 분석 도구

## Required Reading

- AGENTS.md
- CONSTITUTION.md
- ARCHITECTURE.md
- docs/PRODUCT_SENSE.md
- docs/product-specs/index.md
- docs/product-specs/new-user-onboarding.md
- docs/product-specs/first-love-pattern-report.md
- docs/domain/chart-calculation-rules.md
- docs/domain/interpretation-style.md
- docs/QUALITY_SCORE.md
- docs/SECURITY.md
- docs/security/access-control.md
- docs/security/session-and-csrf.md
- docs/security/data-retention-and-deletion.md
- docs/security/llm-security.md
- docs/security/audit-log-policy.md
- docs/RELIABILITY.md
- docs/harness/principles.md
- docs/harness/evidence-model.md
- docs/harness/implementation-readiness.md
- docs/implementation/index.md
- docs/implementation/stack-decisions.md
- docs/implementation/route-contract.md
- docs/implementation/api-contract.md
- docs/implementation/data-contracts.md
- docs/implementation/state-machine.md
- docs/implementation/module-boundaries.md
- docs/implementation/repository-interfaces.md
- docs/implementation/engine-interfaces.md
- docs/implementation/error-handling-contract.md
- docs/implementation/placeholder-engines.md
- docs/implementation/prompt-contract.md
- docs/implementation/environment.md
- docs/implementation/slice-1-plan.md

## Tasks

1. Scaffold Next.js TypeScript app
2. Add Tailwind CSS setup
3. Create routes from `docs/implementation/route-contract.md`
4. Create module boundaries from `docs/implementation/module-boundaries.md`
5. Create shared data types from `docs/implementation/data-contracts.md`
6. Create repository interfaces from `docs/implementation/repository-interfaces.md`
7. Create engine interfaces from `docs/implementation/engine-interfaces.md`
8. Create responsive landing page
9. Create responsive onboarding form
10. Add validation rules
11. Create birth profile API endpoint or local handler
12. Store birth profile with guest-session-compatible shape
13. Create placeholder chart_json generation interface
14. Implement placeholder calculation engine
15. Create placeholder report generation interface
16. Generate first love pattern report using safe placeholder interpretation
17. Apply safety scanner/filter
18. Apply error handling contract
19. Render shareable web report result page
20. Add compatibility CTA
21. Add loading state
22. Add error and retry state
23. Add basic automated tests
24. Update evidence map for implemented tests
25. Update docs if implementation differs from plan

## Acceptance Criteria

- 사용자는 출생시간을 몰라도 진행 가능하다.
- 잘못된 날짜 입력 시 에러 메시지가 표시된다.
- 제출 후 분석 로딩 화면으로 이동한다.
- 생성된 리포트는 사용자 닉네임을 포함한다.
- 리포트에는 연애 성향과 반복되는 관계 패턴이 포함된다.
- 리포트 끝에는 궁합 CTA가 표시된다.
- 생성 실패 시 재시도 버튼이 표시된다.
- 원시 API 오류가 사용자에게 노출되지 않는다.
- 단정적 예언 문장이 결과에 포함되지 않는다.

## QA Checklist

- 양력 생년월일 입력
- 음력 생년월일 입력
- 출생시간 있음
- 출생시간 모름
- 성별 미선택
- 관심 주제 기본값
- 네트워크 실패
- 리포트 생성 실패
- 모바일 웹 화면
- 긴 닉네임
- 잘못된 날짜
- 미래 날짜
- 궁합 CTA 클릭

## Handoff Notes

After implementation, update:
- docs/generated/db-schema.md
- docs/exec-plans/active/current.md
- docs/exec-plans/tech-debt-tracker.md
- harness/evidence/acceptance_map.json

Before implementation, use:
- docs/implementation/slice-1-plan.md

## Current Implementation Status

Updated: 2026-06-19

Completed:
- Next.js TypeScript app scaffold
- Tailwind setup
- required route skeletons
- responsive landing page
- responsive onboarding form
- validation helpers
- repository interfaces and in-memory adapters
- placeholder calculation engine
- placeholder interpretation engine
- safety scanner/reviewer
- report rendering page
- compatibility CTA page
- API route handlers for birth profile and first report flow
- onboarding submit calls `POST /api/birth-profiles`
- analyzing route calls `POST /api/reports/first-love` and navigates to the generated report
- report page loads by generated `reportId`
- safe API error shape
- Vitest test setup
- automated evidence for 15 acceptance criteria

Verified:
- `npm run test:evidence`: PASS
- `npm test`: PASS
- `npm run build`: PASS
- `npm audit --json`: 0 vulnerabilities
- `make harness-check`: PASS
- `make application-harness-check`: PASS
- dev HTTP smoke: `/`, `/onboarding`, `/analyzing`, `/compatibility/start`, generated `/reports/:reportId`: PASS
- dev API smoke: `POST /api/birth-profiles` -> `POST /api/reports/first-love` -> `GET /api/reports/:reportId`: PASS

Remaining:
- production persistence
- real guest session authorization
- browser E2E regression tests for the full client navigation path
- real saju calculation engine
- LLM report generation
- full compatibility report

Current risks:
- in-memory repositories are not suitable for public release
- report access control is documented but only placeholder-level in code
- analyzing retry UI is implemented, but only handler-level failure behavior is automated
