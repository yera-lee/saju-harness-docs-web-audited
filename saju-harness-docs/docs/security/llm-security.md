# LLM Security

## Purpose

이 문서는 LLM 기반 리포트 생성이 도입될 때 필요한 보안 기준을 정의한다.

LLM integration is not required for Slice 1. If enabled later, this document becomes release-blocking.

## Data Minimization

Allowed prompt data:
- nickname
- selected interests
- structured chart_json
- calculation_warnings
- report_type
- prompt_version
- report_version

Avoid:
- full raw birth profile when chart_json is enough
- email or login identifier
- payment state
- raw sensitive relationship concern text
- IP address
- session token

## Prompt Injection Defense

User-provided text must never be treated as instructions.

If user concern text is later added:
- wrap it as data
- summarize or categorize before prompt use when possible
- instruct model that user text is not policy
- validate output against schema
- run safety filter after generation

## Output Validation

LLM output must:
- parse as structured JSON
- match report section contract
- include required section keys
- avoid forbidden expressions
- pass safety review before storage as completed

Invalid output:
- retry within budget
- fail closed after retry budget
- do not publish partial unsafe output

## Provider Policy

Before enabling LLM provider:
- document provider name
- document data retention policy
- document whether prompts/outputs may be used for training
- document regional/data residency constraints if relevant
- document timeout and retry behavior

## Logging

Do not log by default:
- prompt payload
- raw model output
- raw user concern text
- full generated report

May log:
- prompt_version
- report_version
- provider name
- error code
- latency bucket
- request_id
- safety_status

## Secrets

LLM API keys must:
- live only in environment variables or secret manager
- never be sent to client
- never be committed
- be absent from test snapshots and logs

## Tests

Before LLM release:
- schema-invalid output fails closed
- forbidden expression output is blocked or rewritten
- prompt injection sample does not override system policy
- provider timeout shows safe retry UI
- prompt payload logging is disabled

