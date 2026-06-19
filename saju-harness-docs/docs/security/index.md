# Security Docs Index

## Purpose

이 디렉터리는 민감한 사주 입력, 리포트, 게스트 세션, LLM 사용, 감사 로그를 안전하게 다루기 위한 구현 전 보안 계약을 정의한다.

## Current Security Docs

- access-control.md
- session-and-csrf.md
- data-retention-and-deletion.md
- llm-security.md
- audit-log-policy.md

## Security Priority

Before public MVP release, the following must be implemented or explicitly blocked:
- report access control
- guest session cookie security
- report deletion path
- retention policy
- audit log allowlist
- LLM prompt/output security if LLM is enabled

