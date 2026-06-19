# Audit Log Policy

## Purpose

이 문서는 audit logs가 민감정보 우회 저장소가 되지 않도록 허용 이벤트와 metadata 기준을 정의한다.

## Allowed Events

Allowed event types:
- birth_profile_created
- report_generation_started
- report_generation_completed
- report_generation_failed
- safety_filter_failed
- report_deleted
- birth_profile_deleted
- access_denied
- retry_limit_exceeded

## Metadata Allowlist

Allowed metadata fields:
- request_id
- resource_type
- resource_id_hash
- event_status
- error_code
- retryable
- warning_codes
- prompt_version
- report_version
- calculation_version
- safety_status
- latency_bucket

## Forbidden Metadata

Do not store:
- nickname
- email
- full birth date
- birth time
- gender
- raw relationship concerns
- report text
- report_json
- chart_json
- payment details
- session token
- IP address unless explicitly required and retention-limited

## Resource IDs

Prefer:
- hashed or redacted resource identifiers in logs
- request_id for support correlation

Avoid:
- direct report IDs in broad logs
- direct birth_profile IDs in analytics tools

## Retention

Default audit log retention:
- 90 days

Longer retention requires:
- documented purpose
- minimization review
- security approval

## Tests and Harness

Before public MVP release:
- audit logger rejects forbidden metadata keys
- audit metadata allowlist is tested
- safety failure logs do not contain unsafe generated text
- deletion logs do not preserve deleted personal data

