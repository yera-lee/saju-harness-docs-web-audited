# Session and CSRF

## Purpose

이 문서는 guest session과 mutating API 요청을 안전하게 다루기 위한 기준을 정의한다.

## Guest Session Cookie

Guest session cookie must be:
- signed
- `HttpOnly`
- `Secure` in production
- `SameSite=Lax` or stricter
- scoped to the application path
- rotated when privilege level changes

Cookie must not contain:
- birth date
- birth time
- nickname
- report text
- chart_json
- raw concerns

Cookie may contain:
- opaque guest_session_id
- signature or session reference

## Session Lifetime

Recommended MVP defaults:
- guest session idle lifetime: 24 hours
- guest session absolute lifetime: 30 days or less
- report access after session expiration requires stronger recovery or account link

If these defaults change, update this document and release gates.

## CSRF Rules

Mutating endpoints include:
- `POST /api/birth-profiles`
- `POST /api/reports/first-love`
- `POST /api/reports/:reportId/retry`
- future delete endpoints

Protection options:
- SameSite cookie plus origin check for MVP
- CSRF token for broader browser/client support

Minimum requirement:
- reject mutating requests with unexpected `Origin` or `Referer` in production
- use JSON content-type checks
- do not allow state-changing GET requests

## Client Storage

Do not store sensitive data in localStorage by default.

Avoid storing:
- birth date
- birth time
- generated report
- chart_json
- raw concerns

Allowed:
- short-lived UI state if not sensitive
- report_id only if access still requires session authorization

## Tests

Before public MVP release, add tests or manual evidence for:
- guest cookie flags in production mode
- mutating API rejects cross-origin request
- state-changing actions are not implemented as GET
- localStorage does not contain sensitive birth/report data

