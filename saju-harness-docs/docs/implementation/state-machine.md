# State Machine

## Purpose

이 문서는 온보딩부터 첫 리포트까지의 사용자 흐름 상태를 정의한다.

State names must align with `docs/FRONTEND.md` and `harness/policies/application_contract.json`.

## States

### idle

Initial state before user edits the form.

Allowed transitions:
- editing

### editing

User is entering or changing values.

Allowed transitions:
- validating
- idle if form is reset

### validating

Client or server validation is running.

Allowed transitions:
- editing if validation fails
- submitting if validation passes

### submitting

Birth profile is being submitted.

Allowed transitions:
- generating_report
- error

Rules:
- duplicate submit must be prevented.
- entered values should be preserved on recoverable failure.

### generating_report

Chart and report generation are running.

Allowed transitions:
- success
- error

Rules:
- show analyzing messages.
- if long loading, show extended wait message.
- report generation may retry up to 2 times.

### success

Report is available.

Allowed transitions:
- report page display
- compatibility CTA route

### error

Recoverable error occurred.

Allowed transitions:
- editing for validation errors
- generating_report for retry
- landing or onboarding if session cannot recover

Rules:
- show user-safe message.
- do not show raw technical error.
- provide next action.

## Flow

```text
idle
  -> editing
  -> validating
  -> submitting
  -> generating_report
  -> success
```

Failure paths:

```text
validating -> editing
submitting -> error
generating_report -> error
error -> generating_report
error -> editing
```

## State Persistence

Implementation should preserve:
- form values during validation failure
- birth_profile_id after successful submit
- report_id after generation starts

Implementation may store these in:
- local component state for short-lived form state
- route state or URL for report_id
- local storage/session storage only if privacy rules are respected

## Testing Minimum

Tests should verify:
- invalid input returns to editing
- valid submit reaches generating_report
- success reaches report route
- generation failure reaches error with retry
- retry returns to generating_report
- duplicate submit is blocked

