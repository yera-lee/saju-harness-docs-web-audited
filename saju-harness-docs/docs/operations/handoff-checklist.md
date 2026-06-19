# Handoff Checklist

## Purpose

이 문서는 다음 Agent나 개발자가 안전하게 이어받을 수 있는 인수인계 조건을 정의한다.

## Required Handoff Fields

Every handoff must include:
- objective
- files changed
- behavior changed
- docs changed
- tests or checks run
- evidence updated
- remaining planned evidence
- risks
- open questions
- next recommended step

## Handoff Quality Bar

A good handoff lets the next person answer:
- What changed?
- Why did it change?
- How was it verified?
- What is still unsafe or uncertain?
- What should be done next?

## Verification Evidence

Include command output summary:

```text
make harness-check: PASS / FAIL / not run
make application-harness-check: PASS / FAIL / not run
```

If not run:
- explain why
- state whether the task is blocked or partially verified

## Risk Labels

Use these labels:

- `security`
- `privacy`
- `scope`
- `data`
- `api`
- `ui`
- `test`
- `handoff`
- `release`

Example:

```md
Risks:
- security: report read authorization still needs automated test
- test: e2e smoke test not added yet
```

## Open Question Format

```md
Open questions:
- [scope] Should report sharing be session-only in MVP?
- [data] Should guest reports expire after 30 days or sooner?
```

Open questions must not be hidden in prose.

## Incomplete Work

If work is incomplete:
- say what is complete
- say what is not complete
- say what blocks completion
- say which file or doc should be touched next

Do not mark incomplete work as done.

