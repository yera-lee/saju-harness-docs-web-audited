import type { BirthProfile, BirthProfileInput, ChartJson, FirstLovePatternReport } from "@/domain/types";

export type CalculationEngine = {
  calculateChart(input: BirthProfileInput): Promise<ChartJson>;
};

export type GenerateFirstLoveReportInput = {
  birthProfile: BirthProfile;
  chartJson: ChartJson;
  selectedInterests: string[];
  reportVersion: string;
  promptVersion: string;
};

export type InterpretationEngine = {
  generateFirstLoveReport(input: GenerateFirstLoveReportInput): Promise<FirstLovePatternReport>;
};

export type SafetyReviewResult =
  | { status: "passed"; report: FirstLovePatternReport; warnings: string[] }
  | { status: "rewritten"; report: FirstLovePatternReport; warnings: string[] }
  | { status: "failed"; reason: string; warnings: string[] };

export type SafetyReviewer = {
  reviewReport(report: FirstLovePatternReport): Promise<SafetyReviewResult>;
};
