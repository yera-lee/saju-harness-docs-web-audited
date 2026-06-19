# Implementation Readiness

## Purpose

이 문서는 Agent가 실제 앱 구현을 시작해도 되는지 판단하는 준비도 체크리스트다.

Readiness는 완벽한 문서를 의미하지 않는다. 구현에 필요한 결정과 검증 기준이 충분히 명확한 상태를 의미한다.

## Required Before Starting MVP Implementation

### Product Readiness

Must have:
- MVP objective
- included scope
- excluded scope
- first user flow
- acceptance criteria
- QA checklist
- compatibility CTA decision

Current source docs:
- `docs/PRODUCT_SENSE.md`
- `docs/product-specs/index.md`
- `docs/product-specs/new-user-onboarding.md`
- `docs/product-specs/first-love-pattern-report.md`
- `docs/exec-plans/active/current.md`

### Architecture Readiness

Must have:
- component responsibilities
- calculation and interpretation boundary
- initial database entities
- reliability expectations
- security expectations

Current source docs:
- `ARCHITECTURE.md`
- `docs/generated/db-schema.md`
- `docs/RELIABILITY.md`
- `docs/SECURITY.md`
- `docs/domain/chart-calculation-rules.md`
- `docs/domain/interpretation-style.md`

### Harness Readiness

Must have:
- repository harness passing
- application contract defined
- evidence map populated
- release gates documented
- test strategy documented

Current commands:

```sh
make harness-check
make application-harness-check
```

Current implementation docs:
- `docs/implementation/index.md`
- `docs/implementation/stack-decisions.md`
- `docs/implementation/route-contract.md`
- `docs/implementation/api-contract.md`
- `docs/implementation/data-contracts.md`
- `docs/implementation/state-machine.md`
- `docs/implementation/module-boundaries.md`
- `docs/implementation/repository-interfaces.md`
- `docs/implementation/engine-interfaces.md`
- `docs/implementation/error-handling-contract.md`
- `docs/implementation/placeholder-engines.md`
- `docs/implementation/prompt-contract.md`
- `docs/implementation/environment.md`
- `docs/implementation/slice-1-plan.md`

### Open Questions Before Implementation

Resolved for Slice 1:
- app framework choice: Next.js App Router
- backend framework choice: Next.js route handlers for MVP
- database choice: SQLite-compatible direction; in-memory acceptable only for first placeholder slice
- guest session vs required account: guest session first
- placeholder calculation engine format: deterministic valid `chart_json`
- LLM provider and prompt execution path: deferred; placeholder interpretation first
- deployment target: deferred; Nixpacks-compatible direction
- test framework: Vitest for unit/contract tests, Playwright when UI exists

Source:
- `docs/implementation/stack-decisions.md`
- `docs/implementation/placeholder-engines.md`
- `docs/implementation/slice-1-plan.md`

Remaining open questions:
- production database provider
- full auth provider
- real saju calculation library
- LLM provider
- deployment platform

These remaining questions do not block Slice 1 because they are explicitly excluded or placeholder-backed.

## Ready Criteria

Implementation is ready when:
- active exec-plan is current
- MVP scope is stable
- required docs exist
- harness passes
- core acceptance criteria are mapped to evidence
- open questions are either decided or explicitly tracked

## Not Ready Criteria

Implementation is not ready when:
- feature scope is unclear
- acceptance criteria are missing
- safety rules are unclear
- data handling rules are unclear
- harness fails
- Agent would need to invent major product behavior

## Recommended Next Implementation Slice

Use `docs/implementation/slice-1-plan.md`.

This slice avoids premature payment, full compatibility, and deep calculation work while proving the core MVP flow.

## Handoff Note Template

```md
## Implementation Readiness Handoff

Ready / Not Ready:

Decisions made:

Open questions:

Harness results:

Recommended first slice:

Risks:
```
