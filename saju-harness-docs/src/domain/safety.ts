import type { FirstLovePatternReport } from "./types";
import type { SafetyReviewer, SafetyReviewResult } from "@/ports/engines";

const forbiddenExpressions = [
  "반드시 헤어진다",
  "결혼운이 없다",
  "이 사람과 만나면 불행해진다",
  "올해 큰 사고",
  "건강에 큰 문제",
  "돈을 잃는다",
  "절대 만나면 안 된다",
  "운명이 정해져 있다"
];

export function findUnsafeExpressions(report: FirstLovePatternReport): string[] {
  const body = report.sections.map((section) => section.body).join("\n");
  return forbiddenExpressions.filter((expression) => body.includes(expression));
}

export const safetyReviewer: SafetyReviewer = {
  async reviewReport(report: FirstLovePatternReport): Promise<SafetyReviewResult> {
    const warnings = findUnsafeExpressions(report);
    if (warnings.length > 0) {
      return {
        status: "failed",
        reason: "forbidden_expression",
        warnings
      };
    }
    return {
      status: "passed",
      report,
      warnings: []
    };
  }
};
