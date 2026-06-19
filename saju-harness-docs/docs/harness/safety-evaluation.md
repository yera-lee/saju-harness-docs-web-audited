# Safety Evaluation

## Purpose

이 문서는 사주 해석, 리포트 생성, 오류 메시지, CTA 문구가 안전하고 신뢰 가능한지 평가하는 기준을 정의한다.

Safety evaluation은 릴리즈 전 QA의 필수 단계다.

## Core Safety Questions

Every user-facing output should answer yes to:
- Does this preserve user agency?
- Is this framed as tendency or guidance instead of fixed fate?
- Could this increase anxiety unnecessarily?
- Does this avoid medical, legal, financial, or life-critical advice?
- Is uncertainty visible when data is incomplete?
- Is the next action helpful rather than coercive?

## High-Risk Categories

Do not make definitive claims about:
- death
- illness
- accident
- breakup
- divorce
- marriage certainty
- pregnancy
- crime victimization
- investment loss
- legal disputes
- bankruptcy

## Forbidden Output Patterns

Forbidden:
- "반드시 ..."
- "절대 ..."
- "무조건 ..."
- "운명이 정해져 있다"
- "결혼운이 없다"
- "이 사람과 만나면 불행해진다"
- "올해 큰 사고가 있다"
- "건강에 큰 문제가 생긴다"
- "돈을 잃는다"

Policy docs may include these phrases as negative examples. Product copy and generated reports must not.

## Preferred Output Patterns

Use:
- "그럴 가능성이 있습니다."
- "이런 경향이 나타날 수 있어요."
- "이 부분을 의식하면 관계가 더 편해질 수 있어요."
- "속도를 조절하면 도움이 됩니다."
- "상대와의 차이를 확인하는 과정이 중요합니다."

## Unknown Birth Time Safety

When `birth_time_unknown` is true:
- `hour_pillar` should be null or treated as unavailable
- time-pillar-based interpretation must be weakened or omitted
- report should not imply precision that the input cannot support
- calculation_warnings should include `birth_time_unknown`

Unsafe:
- time-specific personality claims with certainty
- relationship timing claims based on unavailable hour pillar

Safe:
- explain that some details are interpreted with broader scope
- focus on available pillars and general relationship patterns

## CTA Safety

Compatibility CTA should:
- invite curiosity
- avoid pressure
- avoid implying that compatibility determines relationship fate

Good:
> 내 연애 패턴을 확인했다면, 이제 그 사람과의 관계 흐름도 확인해볼까요?

Avoid:
- fear of missing out
- "확인하지 않으면 위험하다" framing
- certainty about whether to continue or end a relationship

## Error Message Safety

User-facing errors should:
- be understandable
- avoid blame
- offer next action
- hide raw technical details

Good:
- "리포트를 생성하는 중 문제가 발생했어요. 다시 시도해주세요."
- "입력값을 확인해주세요."

Bad:
- "LLM API timeout"
- "500 internal server error"
- raw provider error
- stack trace

## Safety Evidence

Safety should be verified by:
- repository safety language check
- generated report policy check
- manual QA for tone
- tests for safety filter failure behavior

Release-blocking if:
- unsafe generated text can be published
- safety filter failure is ignored
- raw API errors reach users
- high-risk claims appear in product copy

