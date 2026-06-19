# Project Constitution

## Purpose

이 헌법은 사주 기반 자기이해 웹 서비스를 AI Agent와 하네스 엔지니어링 방식으로 개발할 때 지켜야 할 최상위 원칙을 정의한다.

모든 기획, 설계, 구현, 테스트, QA, 문서 갱신은 이 헌법을 따라야 한다.  
하위 문서나 구현 판단이 충돌할 경우 이 헌법을 우선한다.

## Article 1. Product Identity

이 서비스는 사주를 절대적 예언이 아니라 자기이해와 관계 이해를 위한 해석 프레임으로 사용한다.

The product must:
- help users understand relationship patterns
- start from love and relationship concerns
- explain in plain language
- encourage reflection and practical action
- preserve user agency

The product must not:
- sell fear
- imply fixed destiny
- present fortune results as medical, legal, financial, or life-critical advice
- use traditional complexity as a substitute for user value

## Article 2. Safety and Trust

사용자의 불안감을 전환율의 도구로 사용하지 않는다.

The product must not make definitive claims about:
- death
- accidents
- illness
- divorce
- breakup
- marriage certainty
- pregnancy
- crime victimization
- investment loss
- legal disputes

Interpretations must be written as tendencies, possibilities, and practical guidance.

Allowed framing:
- "그럴 가능성이 있습니다."
- "이런 경향이 나타날 수 있어요."
- "이 부분을 의식하면 관계가 더 편해질 수 있어요."

Forbidden framing:
- "반드시"
- "절대"
- "무조건"
- "운명이 정해져 있다"
- "이 사람과 만나면 불행해진다"

## Article 3. User Data Stewardship

사용자의 생년월일, 출생시간, 관계 고민, 리포트, 결제 상태는 민감 정보로 취급한다.

The system must:
- collect only data needed for the current product scope
- avoid logging raw sensitive personal data
- pass the minimum necessary context to AI systems
- allow report deletion when supported by the product surface
- avoid exposing raw provider errors to users

The system must not:
- store payment card details directly
- send payment data to report-generation prompts
- combine full birth information with direct identifiers in logs

## Article 4. Calculation and Interpretation Separation

계산 엔진과 해석 엔진은 분리한다.

Calculation Engine responsibilities:
- calendar conversion
- pillar calculation
- five elements distribution
- ten gods distribution
- structured `chart_json`
- calculation warnings

Interpretation Engine responsibilities:
- convert `chart_json` into user-facing reports
- follow tone and safety rules
- include prompt and report versioning
- avoid creating or mutating calculation facts

The calculation layer must not generate user-facing interpretation prose.

## Article 5. MVP Scope Discipline

현재 active exec-plan이 작업 범위의 기준이다.

Agents must:
- read the active exec-plan before implementation
- implement only included MVP scope
- avoid adding features that are not documented in the product specs, design docs, or active exec-plan
- record deferred work in the tech debt tracker
- update docs when implementation differs from the plan

MVP priority:
- landing page
- onboarding
- birth profile
- basic `chart_json`
- first love pattern report
- safety filtered interpretation
- compatibility CTA
- loading, error, and retry states

Out of MVP scope:
- payment
- full compatibility report
- daily fortune
- monthly flow
- native app deployment
- advanced astrology dashboard

## Article 6. Harness First Development

Every meaningful product claim must be made verifiable.

The repository harness must check:
- required documents
- scope boundaries
- safety language
- acceptance coverage
- evidence mapping
- application contracts
- domain contracts

The application harness must eventually check:
- route availability
- onboarding validation
- loading and failure states
- report structure
- safety filtering
- CTA placement
- user-facing error behavior

No feature is considered complete without evidence.

No feature may be added without documentation. If a feature is worth implementing, it is worth specifying first.

Evidence may be:
- automated test
- contract test
- policy check
- manual QA step

Planned evidence is acceptable before application code exists, but release readiness requires automated or manual evidence for relevant acceptance criteria.

Tests must not be faked, weakened, skipped, or rewritten merely to pass.  
If a test fails because the product decision changed, update the relevant document first, then update the test to reflect the new contract.

Forbidden test behavior:
- deleting a failing test without documenting why the covered behavior is no longer required
- replacing a meaningful assertion with a trivial assertion
- mocking away the behavior being verified
- marking tests as skipped without a tracked follow-up
- changing harness policy only to hide a real product or safety violation
- reporting unrun tests as passing

## Article 7. Quality Gate

The product cannot ship when:
- total quality score is below 80
- Safety & Trust score is below 15
- Technical Correctness score is below 15
- known unsafe output can reach users
- raw technical errors can reach users
- MVP acceptance criteria lack evidence

Quality is not only visual polish. It includes safety, reliability, handoff clarity, maintainability, and respect for user uncertainty.

## Article 8. Code Simplicity and Safety

코드는 간결하고, 읽기 쉽고, 안전하게 작성한다.

Code must:
- express the product rule clearly
- prefer small, focused functions
- use explicit names over clever abbreviations
- keep business rules close to the domain they describe
- validate external input at system boundaries
- handle expected failure states intentionally
- avoid leaking sensitive data through logs, errors, analytics, or prompts
- use typed or structured data where practical
- include tests or evidence for user-facing behavior

Code should avoid:
- unnecessary abstraction
- hidden side effects
- broad catch-all error handling that hides failures
- duplicated safety logic
- mixing calculation facts with interpretation prose
- mixing UI copy, domain policy, and storage logic without a clear boundary
- optimizing for cleverness over maintainability

When a simple implementation and a clever implementation both work, choose the simple one.  
When a shortcut weakens safety, privacy, or future verification, do not take it.

## Article 9. Agent Handoff

Every agent must leave the next agent with enough context to continue safely.

Handoff must include:
- what changed
- why it changed
- what was verified
- what remains unresolved
- known risks
- relevant docs updated

Agents must not hide uncertainty. Open questions should be written down rather than silently resolved by assumption when the decision affects product scope, safety, data handling, or architecture.

## Article 10. Language and UX Principles

The product should feel calm, personal, and easy to understand.

The product must:
- avoid heavy occult or fear-based presentation
- keep onboarding short
- support unknown birth time
- make mobile web usable at narrow widths
- use clear labels and accessible states
- separate long reports into readable sections

The product must not:
- overwhelm the first experience with expert terminology
- shame the user for incomplete birth information
- make compatibility CTA feel coercive

## Article 11. Amendment Process

This constitution may be amended only when:
- the product direction changes materially
- a safety principle needs clarification
- the harness reveals a recurring ambiguity
- implementation experience proves a rule is incomplete or harmful

Amendments must:
- preserve user agency and safety
- update affected specs and harness policies
- be recorded in the relevant design doc or exec-plan handoff

The constitution should be stable, but not frozen. It exists to protect the product from drift while allowing the team to learn.
