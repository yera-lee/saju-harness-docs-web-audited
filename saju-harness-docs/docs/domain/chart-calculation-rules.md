# Chart Calculation Rules

## Purpose

사주 원국 계산 로직의 기준을 정의한다.

이 문서는 Calculation Engine이 따라야 할 규칙을 정의한다.  
해석 문장 작성 규칙은 docs/domain/interpretation-style.md를 따른다.

## Required Inputs

- birth_date
- birth_time
- birth_time_unknown
- calendar_type
- timezone
- gender

## calendar_type

Allowed values:
- solar
- lunar

## timezone

Default:
- Asia/Seoul

MVP에서는 한국 사용자 기준으로 Asia/Seoul을 기본값으로 사용한다.  
향후 해외 출생자 지원 시 timezone과 location 입력을 확장한다.

## birth_time Handling

출생시간을 아는 경우:
- hour_pillar를 계산한다.
- 시간대별 지지 계산을 수행한다.

출생시간을 모르는 경우:
- hour_pillar는 null로 둔다.
- calculation_warnings에 birth_time_unknown을 추가한다.
- 해석 엔진은 시간주 기반 해석을 약화하거나 제외한다.

## Required Outputs

Calculation Engine은 다음 구조를 반환해야 한다.

```json
{
  "year_pillar": {
    "heavenly_stem": "",
    "earthly_branch": ""
  },
  "month_pillar": {
    "heavenly_stem": "",
    "earthly_branch": ""
  },
  "day_pillar": {
    "heavenly_stem": "",
    "earthly_branch": ""
  },
  "hour_pillar": {
    "heavenly_stem": "",
    "earthly_branch": ""
  },
  "day_master": "",
  "five_elements_distribution": {
    "wood": 0,
    "fire": 0,
    "earth": 0,
    "metal": 0,
    "water": 0
  },
  "ten_gods_distribution": {},
  "calculation_warnings": []
}
```

## Calculation Warnings

Allowed warning codes:
- birth_time_unknown
- lunar_conversion_uncertain
- timezone_defaulted
- edge_case_near_day_boundary
- unsupported_date_range

## Rules

1. 계산 결과는 자연어가 아니라 구조화된 JSON으로 저장한다.
2. 계산 엔진은 해석 문장을 생성하지 않는다.
3. 해석 엔진은 chart_json만 보고 사용자 리포트를 생성한다.
4. birth_time_unknown인 경우 시간주 기반 해석을 단정하지 않는다.
5. 날짜 경계 근처 출생 정보는 calculation_warnings에 기록한다.

## Open Questions

- 음력 윤달 입력 지원 방식
- 절기 기준 월주 계산 라이브러리 선택
- 지원 가능한 최소/최대 생년월일 범위
