# Prompt Contract

## Purpose

이 문서는 LLM 기반 리포트 생성이 도입될 때 따라야 할 prompt 입력, 출력, 안전 규칙을 정의한다.

MVP first slice may use static placeholder text. LLM integration is allowed only when this contract can be satisfied.

## Prompt Input

Allowed input:
- nickname
- selected interests
- structured `chart_json`
- calculation_warnings
- report_type
- report_version
- prompt_version

Avoid input:
- raw full birth profile when chart_json is enough
- user email
- payment status
- raw sensitive relationship concern text unless summarized or categorized

## Prompt Output Shape

The model must return structured JSON equivalent to:

```json
{
  "sections": [
    {
      "key": "one_line_summary",
      "title": "한 줄 요약",
      "body": "..."
    }
  ],
  "compatibility_cta": {
    "label": "그 사람과의 궁합 보기",
    "body": "내 연애 패턴을 확인했다면, 이제 그 사람과의 관계 흐름도 확인해볼까요?"
  }
}
```

Rules:
- no markdown-only free text as final storage format
- required sections must be present
- section keys must match data contract
- CTA must be last

## Tone Requirements

Use:
- warm
- practical
- easy language
- tendency and guidance framing

Avoid:
- fear-based phrasing
- definitive prediction
- expert jargon without explanation
- pressure to use compatibility CTA

## Safety Requirements

Prompt must instruct:
- no definitive claims about high-risk topics
- no medical, legal, investment advice
- no fixed breakup or marriage claims
- no shame for unknown birth time
- no raw calculation uncertainty hidden as certainty

Output must pass safety filter before publishing.

## Versioning

Every generated report must store:
- prompt_version
- report_version
- safety_status

Version changes required when:
- prompt instructions materially change
- report section structure changes
- safety rules change
- LLM provider changes in a way that affects output format

## Failure Handling

Invalid model output:
- retry if retry budget remains
- otherwise fail report generation safely

Safety filter failure:
- rewrite if safe rewrite path exists
- otherwise fail closed
- do not publish unsafe text

Timeout:
- retry up to configured limit
- show user-safe retry UI

