# Beginner Slice 1 Checklist

## Purpose

이 문서는 Slice 1 구현을 작은 작업 단위로 나눈 체크리스트다.

각 단계는 혼자 끝낼 수 있을 정도로 작아야 한다.

## Rule

한 번에 한 단계만 진행한다.  
각 단계가 끝나면 테스트 또는 수동 확인을 남긴다.

## Step 0. Readiness

- [ ] Read `docs/BEGINNER_GUIDE.md`
- [ ] Read `docs/implementation/slice-1-plan.md`
- [ ] Run `make harness-check`
- [ ] Run `make application-harness-check`

Done when:
- both commands pass

## Step 1. Scaffold

- [ ] Create Next.js TypeScript app
- [ ] Add Tailwind CSS
- [ ] Confirm app starts locally
- [ ] Add basic test command

Done when:
- local dev server opens
- test command runs

## Step 2. Routes

- [ ] Add `/`
- [ ] Add `/onboarding`
- [ ] Add `/analyzing`
- [ ] Add `/reports/:reportId`
- [ ] Add `/compatibility/start`
- [ ] Add `/error`

Done when:
- each route renders a basic page
- landing CTA links to onboarding

## Step 3. Types

- [ ] Add `BirthProfile` type
- [ ] Add `ChartJson` type or schema bridge
- [ ] Add `ReportSection` type
- [ ] Add `FirstLovePatternReport` type
- [ ] Add `ErrorCode` type

Done when:
- types match `docs/implementation/data-contracts.md`

## Step 4. Validation

- [ ] Validate nickname
- [ ] Validate birth_date
- [ ] Reject future birth_date
- [ ] Validate calendar_type
- [ ] Allow missing birth_time when birth_time_unknown is true
- [ ] Validate gender
- [ ] Validate interests

Done when:
- validation tests cover valid input, invalid date, future date, and unknown birth time

## Step 5. Repository Interfaces

- [ ] Add repository interfaces
- [ ] Add in-memory birth profile repository
- [ ] Add in-memory chart repository
- [ ] Add in-memory report repository

Done when:
- use cases depend on interfaces, not concrete adapters

## Step 6. Engines

- [ ] Add `CalculationEngine`
- [ ] Add placeholder calculation engine
- [ ] Add `InterpretationEngine`
- [ ] Add placeholder interpretation engine
- [ ] Add `SafetyReviewer`
- [ ] Add safety scanner/reviewer

Done when:
- placeholder chart is valid
- unknown birth time produces warning
- unsafe phrase is blocked or fails closed

## Step 7. Use Cases

- [ ] Add `createBirthProfile`
- [ ] Add `createFirstLoveReport`
- [ ] Add `getFirstLoveReport`
- [ ] Add `retryFirstLoveReport`

Done when:
- route handlers call use cases
- use cases do not return raw infrastructure errors

## Step 8. API Handlers

- [ ] Add `POST /api/birth-profiles`
- [ ] Add `POST /api/reports/first-love`
- [ ] Add `GET /api/reports/:reportId`
- [ ] Add `POST /api/reports/:reportId/retry`
- [ ] Add safe error shape

Done when:
- report read requires current session or placeholder owner check
- raw errors are not returned

## Step 9. UI Flow

- [ ] Build landing copy
- [ ] Build onboarding form
- [ ] Show analyzing state
- [ ] Render report sections
- [ ] Render compatibility CTA
- [ ] Add retry UI for report failure

Done when:
- user can complete happy path manually

## Step 10. Tests and Evidence

- [ ] Add validation tests
- [ ] Add safety scanner tests
- [ ] Add report structure tests
- [ ] Add route/component smoke tests if available
- [ ] Update `harness/evidence/acceptance_map.json`
- [ ] Run `make harness-check`
- [ ] Run `make application-harness-check`

Done when:
- harness passes
- newly automated evidence commands run

## Stop Conditions

Stop and update docs before continuing if:
- you need a new feature
- behavior is not documented
- security rule is unclear
- test must be skipped
- route handler is growing business logic
- storage adapter leaks into UI or route code

