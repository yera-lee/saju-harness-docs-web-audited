# Agent Workflow

## Purpose

이 문서는 Agent가 하네스 기반으로 작업하는 표준 흐름을 정의한다.

## Before Implementation

Agent must read:
- `AGENTS.md`
- active exec-plan
- relevant product spec
- relevant domain docs
- `docs/harness/principles.md`
- `docs/harness/evidence-model.md`
- `docs/operations/runbook.md`

Agent must check:
- feature is in scope
- acceptance criteria exist
- QA checklist exists
- evidence map can represent the work

## During Implementation

Agent should:
- keep code changes scoped to the active plan
- prefer simple readable implementation
- separate calculation from interpretation
- avoid adding undocumented features
- update docs if implementation differs from the plan
- add or update evidence entries as tests are created

## After Implementation

Agent must run relevant checks:

```sh
make harness-check
```

If application code exists:

```sh
make application-harness-check
```

Agent should report:
- files changed
- product behavior changed
- docs changed
- tests or harness commands run
- remaining planned evidence
- risks or open questions
- next recommended step

## If Scope Changes

Do not silently implement.

Steps:
1. Update product spec or active exec-plan.
2. Update acceptance criteria.
3. Update QA checklist.
4. Update evidence map.
5. Update harness policy if needed.
6. Implement.

## If Tests Fail

Do not fake the pass.

Steps:
1. Understand whether the implementation or the document contract is wrong.
2. If implementation is wrong, fix the implementation.
3. If product contract changed, update the relevant document first.
4. Update tests only after the contract is clear.
5. Leave handoff notes if uncertainty remains.

## If Safety Policy Blocks Output

Treat it as a product issue, not a nuisance.

Steps:
1. Identify the unsafe expression or behavior.
2. Rewrite toward tendency, possibility, and practical guidance.
3. Add a policy example if the pattern may recur.
4. Add or update automated safety evidence when possible.
