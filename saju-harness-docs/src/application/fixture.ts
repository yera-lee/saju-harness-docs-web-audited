import { createMemoryRepositories } from "@/adapters/memory/repositories";
import { placeholderCalculationEngine } from "@/adapters/placeholder/calculation";
import { placeholderInterpretationEngine } from "@/adapters/placeholder/interpretation";
import { safetyReviewer } from "@/domain/safety";
import { createBirthProfile } from "./createBirthProfile";
import { createFirstLoveReport } from "./createFirstLoveReport";
import type { BirthProfileInput } from "@/domain/types";

export async function createPlaceholderReportFixture() {
  const repositories = createMemoryRepositories();
  const input: BirthProfileInput = {
    nickname: "지민",
    birth_date: "1995-04-12",
    calendar_type: "solar",
    birth_time: null,
    birth_time_unknown: true,
    gender: "prefer_not_to_say",
    interests: ["love_pattern", "relationship_pattern"]
  };

  const profile = await createBirthProfile(input, repositories.birthProfiles, "guest_demo");
  if (!profile.ok) {
    throw new Error(profile.error.safeMessage);
  }

  const report = await createFirstLoveReport(
    profile.data.id,
    repositories,
    placeholderCalculationEngine,
    placeholderInterpretationEngine,
    safetyReviewer
  );

  if (!report.ok) {
    throw new Error(report.error.safeMessage);
  }

  return report.data;
}
