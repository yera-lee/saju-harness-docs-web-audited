# First Love Pattern Report

## Goal

사용자의 사주 정보를 기반으로 첫 연애 성향 리포트를 제공한다.

이 리포트는 사용자가 웹 서비스의 가치를 처음 체감하는 핵심 경험이다.

## Report Positioning

이 리포트는 정통 명리학 해설서가 아니라, 사주 기반 자기이해 리포트다.

목표는 사용자가 다음 반응을 하도록 만드는 것이다.

> 아, 이거 내 얘기 같은데?

## Inputs

- birth_profile
- chart_json
- selected_interests
- nickname
- report_version
- prompt_version

## Required Sections

### 1. One-Line Summary

사용자의 관계 성향을 한 문장으로 요약한다.

Example:
> 지민님은 마음이 움직이면 깊게 몰입하지만, 관계의 속도와 안정감을 동시에 중요하게 보는 타입이에요.

### 2. Love Style

사용자의 연애 방식과 감정 표현 패턴을 설명한다.

Must include:
- 감정 표현 방식
- 관계에서 중요하게 여기는 것
- 가까워지는 속도
- 안정감/자유로움에 대한 선호

### 3. Attraction Pattern

사용자가 끌리기 쉬운 사람의 특징을 설명한다.

Must include:
- 성격적 끌림
- 대화 방식
- 분위기
- 주의할 점

### 4. Repeating Relationship Pattern

반복되기 쉬운 관계 패턴을 설명한다.

Must include:
- 반복되는 감정 반응
- 갈등이 생기기 쉬운 지점
- 관계가 힘들어지는 패턴
- 개선 가이드

### 5. Relationship Advice

사용자가 관계에서 더 편해지기 위한 조언을 제공한다.

Must include:
- 실천 가능한 행동
- 대화 방식
- 감정 조절 팁
- 관계 속도 조절

### 6. Compatibility CTA

궁합 분석으로 이어지는 CTA를 제공한다.

Example:
> 내 연애 패턴을 확인했다면, 이제 그 사람과의 관계 흐름도 확인해볼까요?

## Tone

- 따뜻하지만 과장하지 않는다.
- 단정하지 않는다.
- 불안을 만들지 않는다.
- 전문 용어는 최소화한다.
- 사용자가 이해할 수 있는 일상어를 사용한다.

## Forbidden Expressions

- 반드시 헤어진다
- 결혼운이 없다
- 이 사람과 만나면 불행해진다
- 올해 큰 사고가 있다
- 건강에 큰 문제가 생긴다
- 돈을 잃는다
- 절대 만나면 안 된다

## Acceptance Criteria

- 리포트는 최소 5개 섹션을 포함한다.
- 리포트는 사용자 닉네임을 포함한다.
- 리포트는 궁합 CTA로 끝난다.
- 모든 문장은 단정적 예언이 아니라 해석형 표현이어야 한다.
- 전문 용어를 사용할 경우 쉬운 설명을 붙인다.

## QA Checklist

- 최소 5개 리포트 섹션 표시
- 사용자 닉네임 개인화 표시
- 궁합 CTA 마지막 섹션 표시
- 단정적 예언 표현 미포함
- 금지 표현 미포함
- 전문 용어 사용 시 쉬운 설명 포함
- 출생시간 모름 케이스에서 시간주 기반 단정 표현 미포함
- 모바일 화면에서 리포트 카드 가독성 확인
