# SECURITY.md

## Purpose

사주분석 웹 서비스에서 수집·저장·처리하는 민감 정보를 안전하게 관리하기 위한 기준을 정의한다.

## Sensitive Data

The following data must be treated as sensitive:

- birth date
- birth time
- calendar type
- gender
- relationship concerns
- compatibility target data
- generated fortune reports
- payment history
- user email or login identifier

## Rules

1. 사용자의 생년월일과 출생시간은 불필요하게 로그에 남기지 않는다.
2. 결제 정보는 직접 저장하지 않고 결제 제공자의 토큰/상태만 저장한다.
3. AI 프롬프트에는 필요한 최소 정보만 전달한다.
4. 사용자가 리포트 삭제를 요청하면 관련 리포트를 삭제할 수 있어야 한다.
5. 운세 결과는 의료, 법률, 투자 판단을 대체하지 않는다는 고지를 포함한다.
6. 궁합 대상자의 정보는 사용자 본인의 책임하에 입력된 정보로 취급하되, 저장 범위를 최소화한다.

Detailed security contracts:
- docs/security/access-control.md
- docs/security/session-and-csrf.md
- docs/security/data-retention-and-deletion.md
- docs/security/llm-security.md
- docs/security/audit-log-policy.md

## Data Minimization

MVP에서 반드시 필요한 정보만 수집한다.

Required:
- nickname
- birth_date
- calendar_type
- birth_time_unknown
- interests

Optional:
- birth_time
- gender

## Prompt Safety

LLM에 전달하는 데이터는 다음 원칙을 따른다.

- 원본 개인정보 대신 구조화된 chart_json을 우선 사용한다.
- nickname 외 직접 식별 정보는 전달하지 않는다.
- 결제 정보는 전달하지 않는다.
- 사용자의 민감한 고민은 요약 또는 카테고리화해서 전달한다.

## User Notices

리포트 화면 또는 약관 영역에 다음 취지의 고지를 포함한다.

- 본 서비스의 사주 분석은 자기이해와 엔터테인먼트 목적이다.
- 의료, 법률, 투자, 중대한 인생 결정을 대체하지 않는다.
- 결과는 절대적인 예언이 아니라 해석과 참고용 조언이다.
