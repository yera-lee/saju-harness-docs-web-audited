# RELIABILITY.md

## Purpose

사주분석 웹 서비스의 실패 처리, 재시도, 사용자 안내, 운영 안정성 기준을 정의한다.

## Failure Modes

### Onboarding Validation Failure

Causes:
- 잘못된 날짜
- 미래 날짜
- 누락된 필수값
- 잘못된 시간 형식

Response:
- 해당 필드 근처에 사용자 친화적 오류 메시지를 표시한다.
- 전체 플로우를 초기화하지 않는다.

### Saju Calculation Failure

Causes:
- 음력 변환 실패
- 지원하지 않는 날짜 범위
- 날짜 경계 케이스
- 내부 계산 오류

Response:
- 입력값 확인 메시지를 제공한다.
- calculation_warnings 또는 error_code를 기록한다.
- 가능한 경우 fallback report를 제공한다.

### Report Generation Failure

Causes:
- LLM API timeout
- invalid response format
- safety filter failure
- backend timeout

Response:
- 최대 2회 재시도한다.
- 실패 시 재시도 버튼을 제공한다.
- 결제 리포트라면 생성 상태를 pending으로 저장한다.

### Payment Verification Failure

Causes:
- provider timeout
- callback delay
- status mismatch

Response:
- pending 상태로 저장 후 재확인한다.
- 중복 결제를 방지한다.
- 사용자에게 원시 오류를 노출하지 않는다.

## Retry Policy

- LLM report generation: retry up to 2 times
- Payment verification: retry up to 3 times
- DB write failure: do not silently ignore
- Safety filter failure: do not publish unsafe text

## User-Facing Error Principles

- 기술적 오류를 그대로 노출하지 않는다.
- 사용자가 다음 행동을 알 수 있게 안내한다.
- 결제 관련 오류는 중복 결제 위험을 방지한다.
- 사주 계산 실패를 사용자의 잘못처럼 표현하지 않는다.

## Logging Rules

Do not log:
- full birth date with name together
- payment details
- raw personal concern text unless necessary

May log:
- error_code
- report_generation_status
- calculation_warning_codes
- request_id
