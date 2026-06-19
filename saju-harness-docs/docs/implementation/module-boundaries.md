# Module Boundaries

## Purpose

이 문서는 MVP 구현 시 코드가 어떤 모듈 경계를 가져야 하는지 정의한다.

목표는 Next.js route handler가 비대해지는 것을 막고, placeholder 구현을 실제 DB·계산 엔진·LLM으로 교체할 때 변경 범위를 작게 유지하는 것이다.

## Dependency Direction

Dependencies should flow inward:

```text
route handlers / pages
  -> application use cases
  -> domain services
  -> ports / interfaces
  -> adapters
```

UI and route handlers may depend on use cases.  
Use cases may depend on interfaces.  
Domain services should not depend on Next.js, React, database clients, or HTTP response objects.

## Recommended Structure

```text
src/
  app/
    page.tsx
    onboarding/page.tsx
    analyzing/page.tsx
    reports/[reportId]/page.tsx
    compatibility/start/page.tsx
    error/page.tsx
    api/
      birth-profiles/route.ts
      reports/first-love/route.ts
      reports/[reportId]/route.ts
      reports/[reportId]/retry/route.ts
  components/
  features/
    onboarding/
    reports/
  application/
    createBirthProfile.ts
    createFirstLoveReport.ts
    getFirstLoveReport.ts
    retryFirstLoveReport.ts
  domain/
    birthProfile.ts
    chart.ts
    report.ts
    safety.ts
    validation.ts
  ports/
    repositories.ts
    engines.ts
    clock.ts
    ids.ts
  adapters/
    memory/
    sqlite/
    placeholder/
  lib/
    errors.ts
    result.ts
```

The exact folder names may change, but the boundaries must remain clear.

## Route Handlers

Route handlers should:
- parse request
- call one application use case
- convert result to HTTP response

Route handlers should not:
- contain business rules
- generate chart_json directly
- generate report text directly
- run safety policy inline
- know database implementation details
- expose raw errors

## Application Use Cases

Use cases coordinate work across modules.

Examples:
- `createBirthProfile`
- `createFirstLoveReport`
- `getFirstLoveReport`
- `retryFirstLoveReport`

Use cases may:
- validate input
- call repositories
- call calculation engine
- call interpretation engine
- call safety reviewer
- decide retry behavior
- return typed success or typed error

Use cases must not:
- import React components
- return framework-specific HTTP responses
- log sensitive data directly

## Domain Services

Domain services contain product rules.

Examples:
- onboarding validation
- chart_json warning rules
- report section requirements
- safety policy
- CTA policy

Domain services must be deterministic where possible and easy to unit test.

## Ports

Ports define interfaces used by application use cases.

Required ports:
- repositories
- calculation engine
- interpretation engine
- safety reviewer
- clock
- ID generator

Ports let placeholder adapters be replaced without rewriting use cases.

## Adapters

Adapters implement ports.

Examples:
- in-memory repositories
- SQLite repositories
- placeholder calculation engine
- real calculation engine
- placeholder interpretation engine
- LLM interpretation engine

Adapters may depend on infrastructure libraries. They should not contain product policy that belongs in domain services.

## Boundary Tests

Before MVP release, tests should verify:
- route handlers call use cases
- use cases can run with in-memory adapters
- placeholder engine can be swapped behind the same interface
- raw adapter errors are mapped to safe domain/application errors

