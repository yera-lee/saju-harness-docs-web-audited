# FRONTEND.md

## Purpose

프론트엔드 구현 규칙과 화면 구조를 정의한다.

이 프로젝트는 네이티브 앱이 아니라 반응형 웹 서비스로 구현한다.  
초기 MVP는 모바일 웹 경험을 우선하지만, 데스크톱에서도 깨지지 않는 구조를 따른다.

## Target Platform

Primary:
- Mobile web
- Responsive web

Secondary:
- Desktop web
- Tablet web

Not included in MVP:
- Native iOS app
- Native Android app
- App store deployment
- Push notification native integration

## Required Routes for MVP

1. `/`
   - Landing page

2. `/onboarding`
   - User birth profile input flow

3. `/analyzing`
   - Loading / analysis progress screen

4. `/reports/:reportId`
   - First love pattern report result

5. `/compatibility/start`
   - Compatibility CTA start screen

6. `/error`
   - Generic retry/error screen if needed

## Landing Page

Main copy:
- 나는 어떤 연애를 반복할까?

Sub copy:
- 생년월일을 바탕으로 나의 연애 성향, 끌리는 사람, 반복되는 관계 패턴을 분석해드려요.

CTA:
- 내 연애 패턴 분석하기

## Onboarding Components

Required fields:
- NicknameInput
- BirthDateInput
- CalendarTypeToggle
- BirthTimeInput
- BirthTimeUnknownToggle
- GenderSelect
- InterestSelector
- SubmitButton

## State Requirements

Must handle:
- idle
- editing
- validating
- submitting
- generating_report
- success
- error

## Web UX Requirements

- 모바일 웹 기준으로 360px 너비에서도 사용 가능해야 한다.
- 데스크톱에서는 콘텐츠 최대 너비를 제한해 읽기 쉽게 만든다.
- 브라우저 뒤로가기를 눌러도 입력값이 가능한 한 유지되어야 한다.
- 새로고침 시 생성 완료된 리포트는 URL로 다시 접근 가능해야 한다.
- 분석 생성 중 중복 제출을 방지한다.
- 결과 페이지는 공유 가능한 URL 구조를 가진다.

## Error UI

Do not show raw technical errors to users.

Bad:
- LLM API timeout
- 500 internal server error

Good:
- 리포트를 생성하는 중 문제가 발생했어요. 다시 시도해주세요.
- 입력값을 확인해주세요.

## Responsive Requirements

- 모든 입력은 모바일 우선으로 설계한다.
- 날짜 입력은 키보드와 picker 모두 고려한다.
- CTA 버튼은 모바일에서 하단 고정 영역 사용 가능.
- 긴 리포트는 카드 단위로 분리한다.
- 데스크톱에서는 중앙 정렬된 단일 컬럼 또는 2컬럼 보조 레이아웃을 사용할 수 있다.

## Accessibility

- 입력 필드에는 label을 제공한다.
- CTA는 명확한 텍스트를 사용한다.
- 색상만으로 상태를 구분하지 않는다.
- 로딩 상태에는 텍스트 설명을 제공한다.
- 키보드 탐색이 가능해야 한다.
- form submit은 Enter 키와 버튼 클릭 모두 지원한다.
