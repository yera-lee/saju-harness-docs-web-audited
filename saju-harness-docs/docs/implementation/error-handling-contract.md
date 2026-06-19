# Error Handling Contract

## Purpose

이 문서는 API, use case, adapter 오류를 일관되게 다루기 위한 계약을 정의한다.

목표:
- 사용자에게 안전한 메시지만 노출
- 클라이언트가 retry 가능 여부를 판단
- raw technical error가 route handler 밖으로 새지 않게 함
- 로그에 민감정보가 남지 않게 함

## Error Response Shape

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
- `message` must be safe for users.
- `code` must be stable.
- `retryable` controls retry UI.
- `request_id` may be shown or logged for support.
- raw internal details must not be returned.

## Success Response Shape

```json
{
  "ok": true,
  "data": {}
}
```

New APIs should prefer wrapping success payload in `data` to keep response shape consistent.

For already documented examples using top-level fields, implementation may adapt them, but API docs should be updated before release.

## HTTP Status Mapping

| Error Code | HTTP Status | Retryable |
|---|---:|---|
| invalid_nickname | 400 | false |
| invalid_birth_date | 400 | false |
| future_birth_date | 400 | false |
| invalid_calendar_type | 400 | false |
| invalid_birth_time | 400 | false |
| invalid_gender | 400 | false |
| invalid_interests | 400 | false |
| birth_profile_not_found | 404 | false |
| report_not_found | 404 | false |
| access_denied | 404 | false |
| report_pending | 202 | true |
| report_unavailable | 503 | true |
| calculation_failed | 422 | false |
| report_generation_failed | 503 | true |
| safety_filter_failed | 422 | false |
| retry_limit_exceeded | 429 | false |
| internal_error | 500 | true |

## Application Error Type

```ts
type AppError = {
  code: ErrorCode;
  safeMessage: string;
  retryable: boolean;
  cause?: unknown;
  requestId: string;
};
```

Rules:
- `cause` is never serialized to the client.
- `safeMessage` is the only user-facing message.
- adapters must map raw errors to AppError or equivalent typed result.

## Logging Rules

May log:
- request_id
- error code
- retryable flag
- route name
- generation status
- warning codes

Must not log:
- full birth date with nickname or email
- raw relationship concerns
- payment details
- raw generated reports by default
- prompt payloads with sensitive data
- secrets

## Retry Rules

Retryable:
- report_generation_failed
- report_pending polling
- report_unavailable
- internal_error if safe and idempotent

Not retryable:
- validation errors
- unsupported input
- safety_filter_failed unless a safe rewrite path exists
- retry_limit_exceeded

## Client Behavior

Client should:
- show retry button only for retryable errors
- show field-level errors for validation failures
- show generic safe message for unknown errors
- preserve form state on recoverable failures

Client should not:
- branch on raw error message
- show stack traces
- show provider errors
