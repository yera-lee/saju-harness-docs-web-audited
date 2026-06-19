# API Contract

## Purpose

이 문서는 MVP API surface를 정의한다.

MVP는 Next.js route handlers 또는 equivalent backend API로 구현할 수 있다. API shape는 프레임워크와 독립적으로 유지한다.

## Common Rules

All API responses should be JSON.

Do not expose:
- stack traces
- raw provider errors
- raw LLM errors
- sensitive birth profile data beyond what the client needs

Use stable error codes for client behavior.

Protected resource APIs must follow `docs/security/access-control.md`.
Mutating APIs must follow `docs/security/session-and-csrf.md`.

## Error Shape

```json
{
  "ok": false,
  "error": {
    "code": "invalid_birth_date",
    "message": "입력값을 확인해주세요.",
    "retryable": false,
    "request_id": "req_123"
  }
}
```

Rules:
- `message` is safe for users.
- `code` is stable for client logic.
- `retryable` controls retry UI.
- `request_id` supports support/debugging without exposing raw internals.
- raw technical details stay server-side.
- See `docs/implementation/error-handling-contract.md` for HTTP status mapping.

## `POST /api/birth-profiles`

Purpose:
- validate and store a birth profile
- return birth_profile_id

Request:

```json
{
  "nickname": "지민",
  "birth_date": "1995-04-12",
  "calendar_type": "solar",
  "birth_time": "14:30",
  "birth_time_unknown": false,
  "gender": "female",
  "interests": ["love_pattern", "relationship_pattern"]
}
```

Validation:
- nickname required, 1 to 20 characters
- birth_date required, valid `YYYY-MM-DD`
- future birth_date disallowed
- calendar_type must be `solar` or `lunar`
- birth_time optional
- birth_time required only when birth_time_unknown is false if UI chooses strict mode
- birth_time must be `HH:mm` when present
- gender may be `female`, `male`, `other`, `prefer_not_to_say`, or null
- interests must include at least one value

Success:

```json
{
  "ok": true,
  "birth_profile_id": "bp_123"
}
```

Errors:
- invalid_nickname
- invalid_birth_date
- future_birth_date
- invalid_calendar_type
- invalid_birth_time
- invalid_gender
- invalid_interests

## `POST /api/reports/first-love`

Purpose:
- create chart_json
- generate first love pattern report
- apply safety filter
- return report_id

Request:

```json
{
  "birth_profile_id": "bp_123"
}
```

Success:

```json
{
  "ok": true,
  "report_id": "rpt_123",
  "status": "completed"
}
```

Pending success, if async generation is used:

```json
{
  "ok": true,
  "report_id": "rpt_123",
  "status": "pending"
}
```

Errors:
- birth_profile_not_found
- calculation_failed
- report_generation_failed
- safety_filter_failed

Retry:
- report generation may retry up to 2 times
- safety filter failure must not publish unsafe text

## `GET /api/reports/:reportId`

Purpose:
- load report for `/reports/:reportId`

Authorization:
- report must belong to current user or guest session
- valid share token may be used only when share flow is implemented
- unauthorized and unknown reports should not reveal different details by default

Success:

```json
{
  "ok": true,
  "report": {
    "id": "rpt_123",
    "nickname": "지민",
    "status": "completed",
    "report_type": "first_love_pattern",
    "sections": [
      {
        "key": "one_line_summary",
        "title": "한 줄 요약",
        "body": "지민님은 마음이 움직이면 깊게 몰입하지만 관계의 속도와 안정감도 중요하게 보는 타입이에요."
      }
    ],
    "compatibility_cta": {
      "label": "그 사람과의 궁합 보기",
      "href": "/compatibility/start"
    }
  }
}
```

Errors:
- report_not_found
- report_pending
- report_unavailable
- access_denied

## `POST /api/reports/:reportId/retry`

Purpose:
- retry failed report generation

Authorization:
- report must belong to current user or guest session

Success:

```json
{
  "ok": true,
  "report_id": "rpt_123",
  "status": "completed"
}
```

Errors:
- report_not_found
- access_denied
- retry_limit_exceeded
- report_generation_failed
- safety_filter_failed
