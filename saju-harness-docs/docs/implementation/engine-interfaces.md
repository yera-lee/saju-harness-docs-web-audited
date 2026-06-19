# Engine Interfaces

## Purpose

이 문서는 계산 엔진, 해석 엔진, 안전 리뷰어의 교체 가능한 인터페이스를 정의한다.

Placeholder engine과 real engine은 같은 interface 뒤에 있어야 한다.

## CalculationEngine

```ts
type CalculationEngine = {
  calculateChart(input: CalculateChartInput): Promise<ChartJson>;
};
```

`CalculateChartInput`:
- birth_date
- birth_time
- birth_time_unknown
- calendar_type
- timezone
- gender

Rules:
- must return structured `ChartJson`
- must not return user-facing prose
- must include warning codes when precision is reduced
- must set `hour_pillar` to null when birth time is unknown

## InterpretationEngine

```ts
type InterpretationEngine = {
  generateFirstLoveReport(input: GenerateFirstLoveReportInput): Promise<ReportDraft>;
};
```

`GenerateFirstLoveReportInput`:
- nickname
- chart_json
- selected_interests
- calculation_warnings
- report_version
- prompt_version

Rules:
- must return structured sections
- must include required report sections
- must not publish directly
- must not mutate chart facts

## SafetyReviewer

```ts
type SafetyReviewer = {
  reviewReport(input: ReportDraft): Promise<SafetyReviewResult>;
};
```

`SafetyReviewResult`:

```ts
type SafetyReviewResult =
  | {
      status: "passed";
      report: ReportDraft;
      warnings: string[];
    }
  | {
      status: "rewritten";
      report: ReportDraft;
      warnings: string[];
    }
  | {
      status: "failed";
      reason: string;
      warnings: string[];
    };
```

Rules:
- failed review must not publish output
- rewritten review must preserve section structure
- warnings should be stored for audit/debugging without exposing sensitive text

## Use Case Flow

```text
BirthProfile
  -> CalculationEngine.calculateChart
  -> ChartRepository.create
  -> InterpretationEngine.generateFirstLoveReport
  -> SafetyReviewer.reviewReport
  -> ReportRepository.saveCompletedReport
```

## Replacement Rules

When replacing placeholder engines:
- keep interfaces stable
- add contract tests before adapter replacement
- update version fields
- update tech debt tracker
- run repository and application harness

