# New User Onboarding

## Goal

사용자가 최소한의 입력으로 첫 사주 기반 연애 성향 리포트를 받을 수 있게 한다.

## Entry Message

첫 화면의 핵심 메시지:

> 나는 어떤 연애를 반복할까?

보조 문구:

> 생년월일을 바탕으로 나의 연애 성향, 끌리는 사람, 반복되는 관계 패턴을 분석해드려요.

## User Flow

1. 랜딩 화면 진입
2. 닉네임 입력
3. 생년월일 입력
4. 양력/음력 선택
5. 출생시간 입력 또는 “몰라요” 선택
6. 성별 선택
7. 관심 주제 선택
8. 분석 생성 로딩 화면
9. 첫 리포트 결과 화면
10. 궁합 CTA 노출

## Required Inputs

| Field | Required | Notes |
|---|---:|---|
| nickname | yes | 결과 화면에서 개인화 표현에 사용 |
| birth_date | yes | YYYY-MM-DD |
| calendar_type | yes | solar 또는 lunar |
| birth_time | no | HH:mm |
| birth_time_unknown | yes | 출생시간 모름 처리 |
| gender | no | 해석 개인화 참고값 |
| interests | yes | 기본값은 love_pattern |

## Interest Options

MVP 관심 주제:

- 연애 성향
- 끌리는 사람
- 반복되는 관계 패턴
- 궁합
- 인간관계
- 커리어

기본 추천 조합:

- 연애 성향
- 반복되는 관계 패턴

## UX Requirements

- 출생시간을 몰라도 진행 가능해야 한다.
- 음력/양력 선택을 명확히 제공해야 한다.
- 입력 과정은 3분 이내에 끝나야 한다.
- 첫 결과는 너무 길지 않아야 한다.
- 전문 용어를 첫 화면에서 과도하게 노출하지 않는다.
- 첫 결과에서 궁합 기능으로 자연스럽게 이어져야 한다.

## Validation Rules

### nickname

- required
- 1~20 characters
- 금칙어 필터 적용 가능

### birth_date

- required
- valid date
- future date disallowed
- 너무 과거 날짜는 확인 메시지 제공

### calendar_type

Allowed:
- solar
- lunar

### birth_time

- optional
- birth_time_unknown이 true이면 null 허용
- HH:mm format

### gender

Allowed:
- female
- male
- other
- prefer_not_to_say
- null

## Loading Screen

분석 생성 중 표시할 메시지:

- 사주 흐름을 정리하고 있어요.
- 연애 성향을 분석하고 있어요.
- 반복되는 관계 패턴을 찾고 있어요.

로딩이 길어질 경우:
- 10초 이상: “조금만 더 기다려주세요. 리포트를 정리하고 있어요.”
- 실패 시: 재시도 버튼 제공

## Result Screen Requirements

첫 리포트는 다음 섹션을 포함한다.

1. 한 줄 요약
2. 나의 연애 성향
3. 내가 끌리는 사람
4. 반복되는 관계 패턴
5. 관계에서 조심할 점
6. 나에게 맞는 관계 방식
7. 궁합 CTA

## Acceptance Criteria

- 사용자는 출생시간을 몰라도 진행할 수 있다.
- 잘못된 날짜 입력 시 명확한 에러 메시지가 표시된다.
- 제출 후 분석 로딩 화면이 표시된다.
- 분석 완료 후 첫 리포트 화면으로 이동한다.
- 리포트에는 사용자 닉네임이 반영된다.
- 리포트 말미에 궁합 CTA가 표시된다.
- 생성 실패 시 재시도 버튼이 표시된다.

## QA Checklist

- 양력 생년월일 입력
- 음력 생년월일 입력
- 출생시간 있음
- 출생시간 모름
- 성별 미선택
- 관심 주제 기본값
- 네트워크 실패
- 리포트 생성 실패
- 모바일 화면
- 긴 닉네임
- 잘못된 날짜
