import { describe, expect, it } from "vitest";
import { findUnsafeExpressions, safetyReviewer } from "./safety";
import type { FirstLovePatternReport } from "./types";

const safeReport: FirstLovePatternReport = {
  id: "rpt_test",
  user_id: null,
  birth_profile_id: "bp_test",
  saju_chart_id: "chart_test",
  report_type: "first_love_pattern",
  nickname: "지민",
  status: "completed",
  sections: [
    {
      key: "one_line_summary",
      title: "한 줄 요약",
      body: "지민님은 관계에서 안정감과 대화를 중요하게 여길 수 있어요."
    }
  ],
  prompt_version: "test",
  report_version: "test",
  safety_status: "passed",
  created_at: "2026-06-19T00:00:00.000Z"
};

describe("safetyReviewer", () => {
  it("passes safe report text", async () => {
    const result = await safetyReviewer.reviewReport(safeReport);
    expect(result.status).toBe("passed");
  });

  it("detects forbidden expressions", async () => {
    const unsafeReport: FirstLovePatternReport = {
      ...safeReport,
      sections: [
        {
          key: "one_line_summary",
          title: "한 줄 요약",
          body: "이 사람과 만나면 불행해진다"
        }
      ]
    };

    expect(findUnsafeExpressions(unsafeReport)).toContain("이 사람과 만나면 불행해진다");
    const result = await safetyReviewer.reviewReport(unsafeReport);
    expect(result.status).toBe("failed");
  });
});
