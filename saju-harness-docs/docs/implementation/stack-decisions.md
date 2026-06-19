# Stack Decisions

## Purpose

이 문서는 MVP 구현에 사용할 기본 기술 스택 결정을 기록한다.

목표는 빠른 구현보다 문서 계약, 테스트, 하네스와 잘 맞는 단순한 웹 MVP를 만드는 것이다.

## Decision Summary

| Area | Decision |
|---|---|
| App platform | Responsive web |
| Language | TypeScript |
| Frontend framework | Next.js App Router |
| Styling | Tailwind CSS |
| UI components | Local components first |
| Backend surface | Next.js route handlers for MVP |
| Database | SQLite for local MVP, Prisma-compatible schema direction |
| Auth | Guest session first |
| Test runner | Vitest for unit/contract tests |
| E2E runner | Playwright when UI exists |
| Package manager | npm unless existing scaffold chooses otherwise |
| Deployment target | Nixpacks-compatible web service later |

## Rationale

### Next.js App Router

Reasons:
- supports file-based routes matching `docs/FRONTEND.md`
- can implement route handlers without a separate backend service for MVP
- keeps first vertical slice small
- works well with TypeScript and Playwright

### TypeScript

Reasons:
- contracts can be represented as types
- validation rules become easier to test
- API/data/report shapes are less likely to drift

### Tailwind CSS

Reasons:
- fast responsive UI implementation
- avoids premature custom design system
- enough for mobile-first MVP

### Guest Session First

Reasons:
- MVP goal is first report within 3 minutes
- account creation can add friction
- saved report URLs can be implemented with generated IDs before full auth

Constraints:
- guest identifiers must not be treated as secure authentication
- report access rules must be revisited before sensitive sharing or paid features

### SQLite First

Reasons:
- simple local development
- enough for MVP prototype
- can map cleanly to later relational database

Constraints:
- production database decision remains a follow-up before public launch

## Non-Decisions

These are intentionally deferred:
- production database provider
- payment provider
- full account/auth provider
- real lunar calendar library
- LLM provider
- deployment platform

Deferred decisions must be tracked in `docs/exec-plans/tech-debt-tracker.md` if implementation depends on a placeholder.

