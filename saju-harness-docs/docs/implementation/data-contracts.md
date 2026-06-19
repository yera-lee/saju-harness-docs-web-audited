# Data Contracts

## Purpose

이 문서는 MVP 구현에서 사용할 주요 데이터 구조를 정의한다.

Database schema는 `docs/generated/db-schema.md`를 따른다. 이 문서는 application-level type shape와 저장 규칙을 보완한다.

## BirthProfile

```ts
type CalendarType = "solar" | "lunar";
type Gender = "female" | "male" | "other" | "prefer_not_to_say" | null;

type BirthProfile = {
  id: string;
  user_id: string | null;
  guest_session_id: string | null;
  nickname: string;
  birth_date: string;
  birth_time: string | null;
  birth_time_unknown: boolean;
  calendar_type: CalendarType;
  timezone: "Asia/Seoul";
  gender: Gender;
  interests: string[];
  created_at: string;
  updated_at: string;
};
```

Rules:
- `birth_date` uses `YYYY-MM-DD`.
- `birth_time` uses `HH:mm` or null.
- `timezone` defaults to `Asia/Seoul`.
- if `birth_time_unknown` is true, `birth_time` should be null.
- guest_session_id is allowed before account creation.

## ChartJson

Use `harness/policies/chart_json.schema.json` as the contract source.

Additional implementation rule:
- placeholder calculation must still return valid `ChartJson`.
- if birth time is unknown, `hour_pillar` must be null.
- `calculation_warnings` must include `birth_time_unknown` when applicable.

## ReportSection

```ts
type ReportSectionKey =
  | "one_line_summary"
  | "love_style"
  | "attraction_pattern"
  | "repeating_relationship_pattern"
  | "relationship_advice"
  | "compatibility_cta";

type ReportSection = {
  key: ReportSectionKey;
  title: string;
  body: string;
};
```

Rules:
- first report must contain at least 5 sections.
- compatibility CTA must be present at the end.
- section body must be user-safe text.

## FirstLovePatternReport

```ts
type FirstLovePatternReport = {
  id: string;
  user_id: string | null;
  birth_profile_id: string;
  saju_chart_id: string;
  report_type: "first_love_pattern";
  nickname: string;
  status: "pending" | "completed" | "failed";
  sections: ReportSection[];
  prompt_version: string;
  report_version: string;
  safety_status: "passed" | "failed" | "rewritten";
  created_at: string;
};
```

Rules:
- completed report must have `safety_status` passed or rewritten.
- failed safety status must not be published as completed.
- prompt_version and report_version are required.

## CompatibilityCTA

```ts
type CompatibilityCTA = {
  label: string;
  href: "/compatibility/start";
  body: string;
};
```

Rules:
- CTA must invite curiosity without pressure.
- CTA must not imply fixed relationship outcome.

## ErrorCode

```ts
type ErrorCode =
  | "invalid_nickname"
  | "invalid_birth_date"
  | "future_birth_date"
  | "invalid_calendar_type"
  | "invalid_birth_time"
  | "invalid_gender"
  | "invalid_interests"
  | "birth_profile_not_found"
  | "calculation_failed"
  | "report_generation_failed"
  | "safety_filter_failed"
  | "report_not_found"
  | "report_pending"
  | "report_unavailable"
  | "access_denied"
  | "retry_limit_exceeded";
```

User-facing messages must be mapped separately from raw error details.
