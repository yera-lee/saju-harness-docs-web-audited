# Application Level Harness

## Purpose

Application level harness는 실제 앱 구현이 문서 계약을 만족하는지 검증한다.

현재 저장소에는 앱 코드가 없으므로 application harness는 evidence map에 등록된 automated evidence만 실행한다.

## Current Command

```sh
make application-harness-check
```

## Current Behavior

If no automated evidence exists:

```text
Automated evidence: 0
Manual evidence: 0
Planned evidence: 21

Result: PASS
No automated application evidence is registered yet.
```

이 결과는 앱 코드가 없는 현재 단계에서는 정상이다.

## Target Coverage

앱 코드가 생기면 application harness는 다음 영역을 검증해야 한다.

### Routes

Required:
- `/`
- `/onboarding`
- `/analyzing`
- `/reports/:reportId`
- `/compatibility/start`
- `/error`

### Onboarding

Must verify:
- nickname required
- birth_date valid date
- future birth_date rejected
- calendar_type is solar or lunar
- birth_time can be omitted when birth_time_unknown is true
- gender can be null
- interests has a default value
- duplicate submit is prevented

### Report Generation Flow

Must verify:
- submit moves to loading/analyzing state
- generation success moves to report page
- generation failure shows retry
- raw API errors are not shown to users
- completed report can be reached by URL

### First Love Pattern Report

Must verify:
- at least 5 sections
- nickname appears
- love style appears
- repeating relationship pattern appears
- compatibility CTA appears at the end
- forbidden expressions do not appear
- domain terms include plain-language explanation

### Safety Layer

Must verify:
- definitive prediction text is blocked or rewritten
- high-risk topics are softened or excluded
- unsafe text is not published after safety filter failure
- report output includes entertainment/self-understanding framing where required

### Reliability

Must verify:
- retry limits are respected
- DB write failures are not silently ignored
- payment errors do not expose raw provider errors when payment exists in later phases
- calculation warnings are preserved

## Evidence Registration

When a test exists, update `harness/evidence/acceptance_map.json`.

Example:

```json
{
  "id": "ONB-AC-002",
  "criterion": "잘못된 날짜 입력 시 명확한 에러 메시지가 표시된다.",
  "evidence": {
    "status": "automated",
    "type": "application-test",
    "target": "invalid birth_date message",
    "command": "npm test -- birth-date-validation"
  }
}
```

## Release Expectation

Before MVP release:
- all required MVP acceptance criteria should be automated or manually verified
- planned evidence should be limited to explicitly deferred non-release work
- safety-related criteria should prefer automated checks

