# Documentation Map

## Purpose

이 문서는 문서가 많아서 길을 잃지 않도록 각 문서의 책임과 읽는 시점을 정리한다.

## Source of Truth by Topic

| Topic | Source of Truth |
|---|---|
| 최상위 원칙 | `CONSTITUTION.md` |
| Agent rules | `AGENTS.md` |
| Product direction | `docs/PRODUCT_SENSE.md` |
| MVP feature scope | `docs/product-specs/index.md` |
| Active implementation scope | `docs/exec-plans/active/current.md` |
| Frontend routes and UX | `docs/FRONTEND.md` |
| Architecture boundary | `ARCHITECTURE.md` |
| Domain calculation rules | `docs/domain/chart-calculation-rules.md` |
| Interpretation tone | `docs/domain/interpretation-style.md` |
| Security baseline | `docs/SECURITY.md` |
| Detailed security contracts | `docs/security/index.md` |
| Harness operation | `docs/harness/index.md` |
| Implementation contracts | `docs/implementation/index.md` |
| Operational workflow | `docs/operations/index.md` |
| First implementation slice | `docs/implementation/slice-1-plan.md` |

## Reading Paths

### Product Planner

1. `CONSTITUTION.md`
2. `docs/PRODUCT_SENSE.md`
3. `docs/product-specs/index.md`
4. relevant product spec
5. `docs/QUALITY_SCORE.md`

### Implementation Agent

1. `docs/BEGINNER_GUIDE.md`
2. `AGENTS.md`
3. `docs/exec-plans/active/current.md`
4. `docs/implementation/slice-1-plan.md`
5. relevant implementation contract
6. relevant security contract
7. `docs/operations/runbook.md`

### QA Agent

1. `docs/QUALITY_SCORE.md`
2. `docs/harness/release-gates.md`
3. `docs/harness/qa-report-template.md`
4. product specs
5. evidence map

### Security Reviewer

1. `docs/SECURITY.md`
2. `docs/security/index.md`
3. `docs/implementation/api-contract.md`
4. `docs/implementation/error-handling-contract.md`
5. `docs/harness/release-gates.md`

## Change Rules

When changing product behavior:
- update product spec
- update active exec-plan
- update acceptance criteria
- update evidence map

When changing API shape:
- update API contract
- update data contracts
- update error handling contract if needed
- update evidence map when tests exist

When changing security behavior:
- update security docs
- update release gates if release-blocking
- update tests or planned evidence

When changing implementation architecture:
- update module boundaries
- update repository or engine interfaces
- update slice plan if current work changes
