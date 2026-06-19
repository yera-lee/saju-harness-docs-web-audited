import { describe, expect, it } from "vitest";
import { createMemoryRepositories } from "@/adapters/memory/repositories";
import { placeholderCalculationEngine } from "@/adapters/placeholder/calculation";
import { placeholderInterpretationEngine } from "@/adapters/placeholder/interpretation";
import { safetyReviewer } from "@/domain/safety";
import type { BirthProfileInput } from "@/domain/types";
import { createBirthProfile } from "./createBirthProfile";
import { createFirstLoveReport } from "./createFirstLoveReport";

describe("createFirstLoveReport", () => {
  it("creates a safe placeholder report with required sections and CTA", async () => {
    const repositories = createMemoryRepositories();
    const input: BirthProfileInput = {
      nickname: "지민",
      birth_date: "1995-04-12",
      calendar_type: "solar",
      birth_time: null,
      birth_time_unknown: true,
      gender: null,
      interests: ["love_pattern", "relationship_pattern"]
    };

    const profile = await createBirthProfile(input, repositories.birthProfiles, "guest_test");
    expect(profile.ok).toBe(true);
    if (!profile.ok) {
      throw new Error("expected profile creation to pass");
    }

    const report = await createFirstLoveReport(
      profile.data.id,
      repositories,
      placeholderCalculationEngine,
      placeholderInterpretationEngine,
      safetyReviewer
    );

    expect(report.ok).toBe(true);
    if (!report.ok) {
      throw new Error("expected report creation to pass");
    }

    expect(report.data.nickname).toBe("지민");
    expect(report.data.sections.length).toBeGreaterThanOrEqual(5);
    expect(report.data.sections.at(-1)?.key).toBe("compatibility_cta");
    expect(report.data.safety_status).toBe("passed");

    const chart = await repositories.charts.findByBirthProfileId(profile.data.id);
    expect(chart?.chart_json.hour_pillar).toBeNull();
    expect(chart?.chart_json.calculation_warnings).toContain("birth_time_unknown");
  });
});
