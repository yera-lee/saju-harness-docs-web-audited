# Route Contract

## Purpose

이 문서는 MVP 웹 라우트와 각 라우트의 책임을 정의한다.

Routes must align with `docs/FRONTEND.md` and `harness/policies/application_contract.json`.

## Routes

### `/`

Purpose:
- landing page
- communicate the core question
- send user to onboarding

Required content:
- main copy: `나는 어떤 연애를 반복할까?`
- sub copy: `생년월일을 바탕으로 나의 연애 성향, 끌리는 사람, 반복되는 관계 패턴을 분석해드려요.`
- primary CTA: `내 연애 패턴 분석하기`

Primary action:
- navigate to `/onboarding`

### `/onboarding`

Purpose:
- collect minimal birth profile and interest inputs
- validate before submission
- submit to report creation flow

Required fields:
- nickname
- birth_date
- calendar_type
- birth_time
- birth_time_unknown
- gender
- interests

Success action:
- create or store birth profile
- begin report generation
- navigate to `/analyzing`

Validation failure:
- show field-level friendly error
- preserve entered values

### `/analyzing`

Purpose:
- show report generation progress
- prevent duplicate submit
- recover from generation failure

Required messages:
- `사주 흐름을 정리하고 있어요.`
- `연애 성향을 분석하고 있어요.`
- `반복되는 관계 패턴을 찾고 있어요.`

Long loading:
- after about 10 seconds, show: `조금만 더 기다려주세요. 리포트를 정리하고 있어요.`

Success action:
- navigate to `/reports/:reportId`

Failure action:
- show retry button
- do not show raw technical error

### `/reports/:reportId`

Purpose:
- show first love pattern report
- allow URL revisit after generation
- present compatibility CTA

Required sections:
- one-line summary
- love style
- attraction pattern
- repeating relationship pattern
- relationship advice
- compatibility CTA

Required behavior:
- include user nickname
- end with compatibility CTA
- avoid forbidden expressions
- show fallback if report is pending or unavailable

### `/compatibility/start`

Purpose:
- start compatibility flow from first report CTA

MVP behavior:
- route exists
- explain that compatibility flow starts here
- full compatibility report is not required in MVP

### `/error`

Purpose:
- generic recoverable error screen

Required behavior:
- friendly user-facing message
- retry or return action
- no raw error details

## Route Testing Minimum

Before MVP release:
- landing CTA navigates to onboarding
- onboarding valid submit reaches analyzing
- report success reaches report route
- report route renders required sections
- compatibility CTA navigates to `/compatibility/start`
- error route hides raw error details

