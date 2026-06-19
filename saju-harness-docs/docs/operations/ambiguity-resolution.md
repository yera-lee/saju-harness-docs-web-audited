# Ambiguity Resolution

## Purpose

이 문서는 문서나 구현 기준이 모호하거나 충돌할 때 처리하는 규칙을 정의한다.

## Priority Order

When documents conflict, use this order:

1. `CONSTITUTION.md`
2. security docs
3. active exec-plan
4. product specs
5. implementation contracts
6. harness docs
7. design docs
8. tech debt tracker

If the conflict affects safety, privacy, data handling, or scope, stop and update the relevant document before implementation.

## Ambiguity Levels

### Level 1. Local Clarification

Examples:
- wording mismatch
- missing cross-link
- unclear doc reference

Action:
- update the doc directly
- run harness
- record in handoff

### Level 2. Contract Ambiguity

Examples:
- API shape unclear
- data field unclear
- module boundary unclear
- evidence status unclear

Action:
- update the relevant contract doc
- update tests or evidence if needed
- run harness

### Level 3. Product or Safety Ambiguity

Examples:
- new feature request
- unclear privacy behavior
- uncertain report access rule
- unsafe output edge case

Action:
- stop implementation
- update product/security docs or active exec-plan
- add acceptance criteria
- add evidence mapping
- then implement

## Do Not Resolve Silently

Never silently decide:
- new MVP scope
- sensitive data storage
- report access behavior
- deletion behavior
- safety exception
- test weakening
- payment or auth behavior

## Documentation Patch Rule

If the implementation needs a behavior not in docs:
- first patch the relevant doc
- then implement
- then verify

If the doc change is speculative:
- put it in tech-debt tracker or open questions instead of implementation contract

