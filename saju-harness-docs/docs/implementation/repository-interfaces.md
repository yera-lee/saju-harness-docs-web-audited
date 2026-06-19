# Repository Interfaces

## Purpose

이 문서는 storage를 직접 구현에 묶지 않기 위한 repository interface를 정의한다.

Slice 1은 in-memory 저장소로 시작할 수 있지만, application use case는 in-memory 구현을 직접 알아서는 안 된다.

## Rules

Repositories must:
- expose domain-oriented methods
- return typed results or throw only mapped internal errors
- avoid leaking database client objects
- avoid logging sensitive data
- support replacement by SQLite or production database adapters

Repositories must not:
- contain report generation logic
- contain safety policy
- contain UI copy
- expose raw SQL errors to route handlers

## BirthProfileRepository

```ts
type BirthProfileRepository = {
  create(input: CreateBirthProfileRecord): Promise<BirthProfile>;
  findById(id: string): Promise<BirthProfile | null>;
  findByGuestSessionId(guestSessionId: string): Promise<BirthProfile[]>;
};
```

`CreateBirthProfileRecord` should include:
- user_id
- guest_session_id
- nickname
- birth_date
- birth_time
- birth_time_unknown
- calendar_type
- timezone
- gender
- interests

## ChartRepository

```ts
type ChartRepository = {
  create(input: CreateChartRecord): Promise<SajuChart>;
  findByBirthProfileId(birthProfileId: string): Promise<SajuChart | null>;
};
```

`CreateChartRecord` should include:
- birth_profile_id
- chart_json
- calculation_version
- calculation_warnings

Rules:
- `chart_json` must satisfy the chart_json schema.
- `calculation_warnings` must be queryable or recoverable from chart_json.

## ReportRepository

```ts
type ReportRepository = {
  create(input: CreateReportRecord): Promise<FirstLovePatternReport>;
  findById(id: string): Promise<FirstLovePatternReport | null>;
  updateStatus(input: UpdateReportStatus): Promise<FirstLovePatternReport>;
  saveCompletedReport(input: SaveCompletedReport): Promise<FirstLovePatternReport>;
};
```

Rules:
- failed safety status must not be saved as completed.
- completed reports must have required sections.
- prompt_version and report_version are required.

## GuestSessionRepository

Slice 1 may avoid a full guest session table, but the interface should be planned.

```ts
type GuestSessionRepository = {
  create(): Promise<GuestSession>;
  findById(id: string): Promise<GuestSession | null>;
};
```

If no table exists in Slice 1:
- use signed cookie or local placeholder only
- document the limitation in handoff notes
- keep repository boundary ready for later hardening

## In-Memory Adapter Rules

Allowed for:
- local MVP slice
- tests
- prototype flow validation

Must:
- implement the same interfaces
- be deterministic in tests
- avoid pretending to provide production persistence

Must not:
- be used for public launch without explicit release decision
- bypass safety or validation rules

## DB Schema Alignment

Current DB schema must be updated before persistent implementation to include:
- `guest_session_id` on `birth_profiles` or a separate `guest_sessions` entity
- `interests` storage for birth profile inputs
- report `status`
- report retry count or generation attempt record if async retry is implemented

