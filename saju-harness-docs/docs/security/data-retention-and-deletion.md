# Data Retention and Deletion

## Purpose

이 문서는 birth profile, chart, report, audit log, prompt/output data의 보존과 삭제 기준을 정의한다.

## Retention Defaults

Recommended MVP defaults:

| Data | Retention |
|---|---|
| Guest birth profile | 30 days |
| Guest first report | 30 days |
| Failed report job | 7 days |
| Calculation warnings | same as chart/report |
| Audit logs | 90 days |
| Prompt payloads | do not store by default |
| Raw LLM outputs | do not store before safety filtering |

Retention may change only with product/security review.

## Deletion Requirements

User-requested report deletion must delete or render inaccessible:
- report row
- report_text
- report_json
- associated chart if no other report depends on it
- birth profile if user requests full profile deletion

Deletion should preserve only minimal audit event:
- deletion event type
- request_id
- timestamp
- non-sensitive resource type

Do not preserve:
- birth date
- birth time
- nickname
- report text
- chart_json

## API Surface

Before public MVP release, define one of:
- `DELETE /api/reports/:reportId`
- `DELETE /api/birth-profiles/:birthProfileId`
- account-level deletion if auth exists

If deletion is not implemented:
- public release should be blocked unless explicitly accepted as a legal/product risk
- UI must not claim deletion is available

## Cleanup Jobs

Before public launch, define cleanup for:
- expired guest sessions
- expired guest reports
- failed report jobs
- stale retry attempts

Slice 1 may skip scheduled cleanup only if:
- storage is local/in-memory
- not publicly launched
- limitation is documented in handoff

## Tests

Before public MVP release:
- deleting report prevents future read
- deleting birth profile removes dependent chart/report or blocks access
- deletion cannot be performed by another session
- expired guest report cannot be read

