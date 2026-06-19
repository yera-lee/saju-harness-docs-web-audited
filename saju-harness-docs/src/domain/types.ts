export type CalendarType = "solar" | "lunar";
export type Gender = "female" | "male" | "other" | "prefer_not_to_say" | null;

export type BirthProfileInput = {
  nickname: string;
  birth_date: string;
  calendar_type: CalendarType;
  birth_time: string | null;
  birth_time_unknown: boolean;
  gender: Gender;
  interests: string[];
};

export type BirthProfile = BirthProfileInput & {
  id: string;
  user_id: string | null;
  guest_session_id: string | null;
  timezone: "Asia/Seoul";
  created_at: string;
  updated_at: string;
};

export type Pillar = {
  heavenly_stem: string;
  earthly_branch: string;
};

export type CalculationWarning =
  | "birth_time_unknown"
  | "lunar_conversion_uncertain"
  | "timezone_defaulted"
  | "edge_case_near_day_boundary"
  | "unsupported_date_range";

export type ChartJson = {
  year_pillar: Pillar;
  month_pillar: Pillar;
  day_pillar: Pillar;
  hour_pillar: Pillar | null;
  day_master: string;
  five_elements_distribution: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  ten_gods_distribution: Record<string, number>;
  calculation_warnings: CalculationWarning[];
};

export type ReportSectionKey =
  | "one_line_summary"
  | "love_style"
  | "attraction_pattern"
  | "repeating_relationship_pattern"
  | "relationship_advice"
  | "compatibility_cta";

export type ReportSection = {
  key: ReportSectionKey;
  title: string;
  body: string;
};

export type FirstLovePatternReport = {
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

export type ErrorCode =
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
  | "retry_limit_exceeded"
  | "internal_error";

export type AppError = {
  code: ErrorCode;
  safeMessage: string;
  retryable: boolean;
  requestId: string;
  cause?: unknown;
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };
