# QUALITY_SCORE.md

## Purpose

모든 산출물은 아래 기준으로 평가한다.

## Score Categories

### Product Fit — 25 points

- 사용자의 실제 고민을 해결하는가?
- 사주 웹 서비스의 핵심 가치와 연결되는가?
- 연애/관계 기반 진입 흐름과 맞는가?
- 재방문 이유를 만드는가?

### UX Quality — 20 points

- 사용자가 쉽게 이해할 수 있는가?
- 입력 과정이 짧고 명확한가?
- 결과 화면이 부담스럽지 않은가?
- 궁합 CTA가 자연스러운가?

### Technical Correctness — 20 points

- 명세대로 구현되었는가?
- 에러 상태가 처리되었는가?
- 데이터 구조가 일관적인가?
- 계산 엔진과 해석 엔진이 분리되어 있는가?

### Safety & Trust — 20 points

- 불안 조장 표현을 피하는가?
- 민감한 개인정보를 안전하게 다루는가?
- 운세 결과를 절대적 예언처럼 표현하지 않는가?
- 의료/법률/투자 판단으로 오해되지 않는가?

### Maintainability — 15 points

- 코드와 문서가 함께 갱신되었는가?
- 테스트가 존재하는가?
- 다른 Agent가 이어받을 수 있는가?
- 변경 이유가 기록되어 있는가?

## Minimum Bar

- 총점 80점 미만이면 배포 불가
- Safety & Trust 15점 미만이면 배포 불가
- Technical Correctness 15점 미만이면 배포 불가

## QA Output Format

```md
# QA Report

## Summary

## Score

- Product Fit:
- UX Quality:
- Technical Correctness:
- Safety & Trust:
- Maintainability:
- Total:

## Blocking Issues

## Non-Blocking Issues

## Recommended Follow-ups

## Release Recommendation

- Ship
- Ship with fixes
- Do not ship
```
