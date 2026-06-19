# Tech Debt Tracker

## Purpose

현재 구현에서 의도적으로 미룬 작업, 임시 구현, 향후 개선 필요 사항을 기록한다.

## Items

### TD-001: Real Saju Calculation Engine

Status: open

Current:
- MVP에서는 placeholder calculation engine을 사용할 수 있다.

Needed:
- 음력 변환
- 절기 기준 월주 계산
- 일주 계산
- 시간주 계산
- 오행/십신 분포 계산

Priority:
- High before paid report launch

### TD-002: Compatibility Report Full Spec

Status: open

Current:
- MVP에서는 궁합 CTA까지만 포함한다.

Needed:
- partner input flow
- compatibility chart comparison
- compatibility report sections
- safety rules for relationship advice

Priority:
- Medium

### TD-003: Paid Report Definition

Status: open

Current:
- 무료/유료 리포트의 차이가 아직 구체화되지 않았다.

Needed:
- free report length
- paid report sections
- pricing hypothesis
- preview strategy

Priority:
- Medium

### TD-004: International Birth Support

Status: open

Current:
- Asia/Seoul timezone 기본값 사용.

Needed:
- birth location
- timezone conversion
- daylight saving handling

Priority:
- Low for Korean MVP

### TD-005: Production Database Provider

Status: open

Current:
- Slice 1 may use local SQLite-compatible structure or in-memory placeholder storage.

Needed:
- production database provider decision
- migration strategy
- persistence and backup expectations

Priority:
- High before public launch

### TD-006: Auth and Guest Session Hardening

Status: open

Current:
- MVP first slice uses guest session first.

Needed:
- account creation decision
- guest report access rules
- saved report ownership model

Priority:
- High before saved report sharing launch

### TD-007: LLM Provider and Prompt Runtime

Status: open

Current:
- Slice 1 uses placeholder interpretation engine.

Needed:
- LLM provider decision
- prompt execution path
- structured output validation
- retry and timeout handling

Priority:
- High before dynamic report generation launch

### TD-008: Deployment Platform

Status: open

Current:
- Nixpacks-compatible direction is documented.

Needed:
- production deployment target
- build/start commands
- environment variable management
- database deployment plan

Priority:
- Medium before public MVP
