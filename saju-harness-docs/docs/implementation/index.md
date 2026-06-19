# Implementation Docs Index

## Purpose

이 디렉터리는 실제 앱 구현 직전에 필요한 기술 결정, 계약, 첫 구현 slice를 정리한다.

이 문서들은 구현 Agent가 주요 결정을 임의로 만들지 않도록 돕는다.

## Current Implementation Docs

- beginner-slice-1-checklist.md
- stack-decisions.md
- route-contract.md
- api-contract.md
- data-contracts.md
- state-machine.md
- module-boundaries.md
- repository-interfaces.md
- engine-interfaces.md
- error-handling-contract.md
- placeholder-engines.md
- prompt-contract.md
- environment.md
- slice-1-plan.md

## Implementation Rule

구현 전에 다음 조건을 만족해야 한다.

- active exec-plan이 현재 slice와 맞다.
- stack decision이 문서화되어 있다.
- route/API/data/state 계약이 문서화되어 있다.
- placeholder와 real engine의 경계가 문서화되어 있다.
- harness가 통과한다.
