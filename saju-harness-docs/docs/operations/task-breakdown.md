# Task Breakdown

## Purpose

이 문서는 작업을 너무 크게 만들지 않기 위한 기준을 정의한다.

좋은 작업 단위는 이해, 구현, 검증, 인수인계가 모두 가능해야 한다.

## Good Task Shape

A task should have:
- one objective
- one primary area
- clear inputs
- clear outputs
- acceptance criteria
- verification command or manual QA step
- handoff note

## Task Size Rules

Prefer a smaller task when:
- more than one module boundary changes
- both API and UI change
- security behavior changes
- persistence behavior changes
- report generation behavior changes
- evidence map needs multiple unrelated updates

Split the task if it includes more than two of:
- route changes
- API changes
- data model changes
- storage adapter changes
- engine behavior changes
- safety policy changes
- UI changes
- test infrastructure changes

## Slice 1 Recommended Task Order

### Task 1. Scaffold and Tooling

Output:
- app scaffold
- test command
- dev command

Verification:
- dev server starts
- test command runs

### Task 2. Routes Skeleton

Output:
- required routes render placeholder pages
- landing CTA navigates to onboarding

Verification:
- route smoke test or manual route check

### Task 3. Types and Validation

Output:
- data types
- onboarding validation helpers

Verification:
- validation unit tests

### Task 4. Ports and In-Memory Adapters

Output:
- repository interfaces
- engine interfaces
- in-memory adapters

Verification:
- use case tests can run against in-memory adapters

### Task 5. Placeholder Engines and Safety

Output:
- placeholder calculation engine
- placeholder interpretation engine
- safety reviewer

Verification:
- chart contract test
- safety scanner test
- report section test

### Task 6. Use Cases and API

Output:
- createBirthProfile
- createFirstLoveReport
- getFirstLoveReport
- retryFirstLoveReport
- API handlers

Verification:
- API/use case tests
- raw error not exposed

### Task 7. UI Flow

Output:
- onboarding form
- analyzing state
- report rendering
- compatibility CTA
- retry UI

Verification:
- happy path manual QA
- component or e2e smoke test

### Task 8. Evidence and Handoff

Output:
- evidence map updates
- handoff notes

Verification:
- `make harness-check`
- `make application-harness-check`

## Definition of Ready

A task is ready when:
- relevant docs are identified
- acceptance criteria are known
- security impact is known
- verification path is known
- dependencies are not blocking

## Definition of Done

A task is done when:
- implementation or doc change is complete
- relevant tests or manual QA are recorded
- evidence map is updated if behavior is covered
- harness passes
- handoff is written

