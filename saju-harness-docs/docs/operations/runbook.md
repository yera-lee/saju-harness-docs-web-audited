# Operations Runbook

## Purpose

이 문서는 Agent 또는 개발자가 작업을 시작하고, 검증하고, 인수인계하는 운영 절차를 정의한다.

## Standard Work Loop

Use this loop for every meaningful task:

1. Read the active scope.
2. Identify the relevant contract docs.
3. Make the smallest coherent change.
4. Run the required checks.
5. Update evidence or docs.
6. Leave handoff notes.

## Start of Work

Before editing code or docs:
- read `README.md`
- read `CONSTITUTION.md`
- read `docs/exec-plans/active/current.md`
- read the relevant contract document
- run `make harness-check`

If application code exists:
- run `make application-harness-check`

## During Work

Keep the work bounded:
- one task should map to one clear objective
- one task should have one verification path
- one task should update evidence if it changes tested behavior

Stop and update docs before continuing if:
- the feature is not documented
- acceptance criteria are missing
- security behavior is unclear
- the implementation needs a new API shape
- the route handler is taking business logic
- tests must be skipped or weakened

## End of Work

Before handing off:
- run `make harness-check`
- run `make application-harness-check` if app code exists
- summarize changed files
- summarize behavior changes
- list tests run
- list remaining planned evidence
- list risks or open questions

## Required Handoff Format

```md
## Handoff

Objective:

Changed:

Verified:

Evidence updated:

Remaining planned evidence:

Risks:

Open questions:

Next recommended step:
```

## Failure Handling

If `make harness-check` fails:
- fix documentation or policy mismatch first
- do not proceed to implementation handoff

If `make application-harness-check` fails:
- identify failed evidence command
- fix implementation or contract
- do not mark the task complete

If checks cannot be run:
- say exactly why
- record the command that should be run
- treat the task as not fully verified

