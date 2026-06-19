# Beginner Guide

## Purpose

이 문서는 초보 개발자가 이 저장소를 읽고 구현을 시작하기 위한 최소 경로를 안내한다.

모든 문서를 한 번에 읽으려고 하지 않는다. 먼저 큰 그림을 잡고, 필요한 순간에 세부 계약 문서를 읽는다.

## What This Repository Is

이 저장소는 아직 앱 코드가 아니라, 앱을 안전하게 구현하기 위한 문서와 하네스다.

You are expected to:
- read the product goal
- follow the active exec-plan
- implement only the documented slice
- run harness checks
- update evidence when tests are added

You are not expected to:
- invent new product features
- build payment
- build full compatibility report
- build real saju calculation first
- use LLM before the prompt/security contracts are ready

## 30-Minute Reading Path

Read these first, in order:

1. `README.md`
2. `CONSTITUTION.md`
3. `docs/PRODUCT_SENSE.md`
4. `docs/exec-plans/active/current.md`
5. `docs/implementation/slice-1-plan.md`
6. `docs/operations/runbook.md`

After that, read only the contract needed for the file you are about to edit.

## Contract Lookup

| If you are working on | Read |
|---|---|
| routes/pages | `docs/implementation/route-contract.md` |
| API handlers | `docs/implementation/api-contract.md` |
| types/models | `docs/implementation/data-contracts.md` |
| app states | `docs/implementation/state-machine.md` |
| folder/module structure | `docs/implementation/module-boundaries.md` |
| storage | `docs/implementation/repository-interfaces.md` |
| calculation/report/safety engines | `docs/implementation/engine-interfaces.md` |
| placeholder engines | `docs/implementation/placeholder-engines.md` |
| errors | `docs/implementation/error-handling-contract.md` |
| security/session/report access | `docs/security/index.md` |
| tests/evidence | `docs/harness/evidence-model.md` |
| handoff or blocked work | `docs/operations/handoff-checklist.md` |
| unclear or conflicting docs | `docs/operations/ambiguity-resolution.md` |

## First Implementation Order

Follow this order for Slice 1:

1. Scaffold the app.
2. Add the route files.
3. Add shared domain types.
4. Add validation helpers.
5. Add repository interfaces.
6. Add in-memory repository adapters.
7. Add placeholder calculation engine.
8. Add placeholder interpretation engine.
9. Add safety scanner.
10. Wire the use cases.
11. Build the pages.
12. Add tests.
13. Update evidence map.
14. Write handoff.
15. Run harness.

Do not start with styling or LLM integration.

## What To Do When You Are Unsure

If you do not know what behavior should be:

1. Check the relevant contract document.
2. Check the active exec-plan.
3. Check product specs.
4. If still unclear, add an open question to the exec-plan or tech-debt tracker.

Do not silently invent behavior.

## Commands

Run before implementation:

```sh
make harness-check
make application-harness-check
```

Run after implementation changes:

```sh
make harness-check
make application-harness-check
```

Application tests will be added after scaffold. When they exist, update `harness/evidence/acceptance_map.json`.

## Common Mistakes

Avoid:
- adding a feature that is not in the active exec-plan
- putting business logic inside route handlers
- storing birth data in localStorage
- returning raw errors to the browser
- making report IDs readable without session authorization
- changing tests only to make them pass
- treating placeholder calculation as real saju accuracy

## Definition of Done for Slice 1

Slice 1 is not done until:
- documented routes exist
- onboarding can be completed without birth time
- invalid birth date shows safe error
- placeholder report includes nickname
- report has required sections
- compatibility CTA appears
- raw errors are not shown
- safety scanner exists
- relevant tests exist
- evidence map is updated
- harness passes
