# Product Specs Index

## Product Summary

사주 기반 자기이해 + 연애/궁합 분석 웹 서비스.

첫 진입은 “나는 어떤 연애를 반복할까?”라는 질문에서 시작한다.  
초기 리포트는 사용자의 사주 정보를 기반으로 연애 성향과 반복되는 관계 패턴을 분석하고, 이후 궁합 분석으로 자연스럽게 확장한다.

## MVP Feature Set

### 1. New User Onboarding

Status: MVP Required

사용자의 기본 사주 정보를 입력받고 첫 리포트를 생성한다.

Required docs:
- docs/product-specs/new-user-onboarding.md

Core inputs:
- nickname
- birth_date
- calendar_type
- birth_time
- birth_time_unknown
- gender
- interests

### 2. First Love Pattern Report

Status: MVP Required

사용자의 사주 구조를 기반으로 첫 연애 성향 리포트를 제공한다.

Report sections:
- 나의 연애 성향
- 내가 끌리는 사람
- 반복되는 관계 패턴
- 관계에서 조심할 점
- 나에게 맞는 관계 방식
- 궁합 CTA

### 3. Compatibility CTA

Status: MVP Required

첫 리포트 이후 “그 사람과의 궁합도 확인해볼까요?” CTA를 제공한다.

MVP에서는 CTA와 입력 플로우의 시작점까지만 포함해도 된다.  
완전한 궁합 리포트는 다음 단계 기능으로 분리한다.

### 4. Report Save

Status: MVP Optional

사용자가 생성된 리포트를 저장하거나 다시 볼 수 있게 한다.

MVP에서는 guest session 기반 저장 또는 계정 생성 후 저장 중 하나를 선택한다.

### 5. Share Result

Status: MVP Optional

사용자가 리포트의 일부를 이미지 또는 링크로 공유할 수 있게 한다.

초기에는 공유 문구 생성만 포함해도 된다.

## Post-MVP Feature Set

### Compatibility Report

두 사람의 생년월일 정보를 기반으로 관계 흐름을 분석한다.

Sections:
- 첫 끌림 포인트
- 충돌 포인트
- 대화 방식
- 관계 속도
- 장기 관계 가능성
- 조심할 감정 패턴

### Daily Flow

오늘의 연애운, 일운, 감정 흐름을 제공한다.

### Monthly Relationship Flow

월간 관계운과 감정 리듬을 제공한다.

### Career & Work Style Report

사주 기반 업무 성향, 강점, 맞는 환경, 피해야 할 업무 패턴을 분석한다.

### Paid Deep Report

무료 리포트보다 긴 심화 분석을 제공한다.

Potential paid products:
- 연애 심층 리포트
- 궁합 심층 리포트
- 올해 관계 흐름
- 커리어 심층 리포트

## Non-Goals

- 의학적 진단
- 법률 자문
- 투자 판단
- 죽음, 사고, 질병 예언
- 절대적 결혼/이별 예언
- 전문 만세력 중심 UX
