# Access Control

## Purpose

이 문서는 birth profile, chart, report, compatibility data에 대한 조회·수정·삭제 권한 기준을 정의한다.

MVP는 guest session first로 시작하지만, guest session은 인증 계정과 같은 보안 수준으로 취급하면 안 된다.

## Protected Resources

Protected:
- birth profiles
- saju charts
- first love pattern reports
- compatibility reports
- generated report text/json
- payment history when payment exists later

Public:
- landing page
- onboarding page
- generic product copy
- compatibility start page without personal data

## Access Rule Summary

| Resource | Create | Read | Delete |
|---|---|---|---|
| BirthProfile | current guest session or user | owner session/user only | owner session/user only |
| SajuChart | server use case only | owner session/user only | deleted with birth profile |
| Report | server use case only | owner session/user or valid share token | owner session/user only |
| CompatibilityReport | server use case only | owner session/user or valid share token | owner session/user only |

## Guest Session Rules

Guest session may:
- create a birth profile
- create a first report
- read reports created in the same session
- delete reports created in the same session

Guest session must not:
- read report by ID alone
- access another guest session's data
- be treated as durable account identity
- authorize paid or sensitive sharing features without stronger controls

## Report URL Rules

Report IDs must:
- be opaque
- be unguessable
- not be sequential integers

`GET /api/reports/:reportId` must verify one of:
- authenticated owner user
- matching guest session
- valid share token for shareable subset

If authorization fails:
- return `404` for unknown or unauthorized report by default
- do not reveal whether a report exists

## Share Token Rules

If report sharing is implemented:
- share token must be separate from report ID
- share token must be unguessable
- shared view should expose only intended report sections
- share token revocation must be possible before public launch

MVP Slice 1:
- share token is not required
- report revisit is session-bound

## API Requirements

Protected APIs must call authorization before returning resource data.

Required checks:
- `POST /api/reports/first-love`: birth_profile belongs to current session/user
- `GET /api/reports/:reportId`: report belongs to current session/user or valid share token
- `POST /api/reports/:reportId/retry`: report belongs to current session/user
- deletion APIs: resource belongs to current session/user

## Tests

Before public MVP release, add tests for:
- report cannot be read without matching session
- unknown report and unauthorized report do not reveal different details
- retry cannot be called for another session's report
- deletion cannot delete another session's report

