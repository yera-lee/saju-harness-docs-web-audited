import { describe, expect, it } from "vitest";
import { validateBirthProfileInput } from "./validation";
import type { BirthProfileInput } from "./types";

const validInput: BirthProfileInput = {
  nickname: "지민",
  birth_date: "1995-04-12",
  calendar_type: "solar",
  birth_time: "14:30",
  birth_time_unknown: false,
  gender: "prefer_not_to_say",
  interests: ["love_pattern"]
};

describe("validateBirthProfileInput", () => {
  it("accepts a valid onboarding payload", () => {
    expect(validateBirthProfileInput(validInput).ok).toBe(true);
  });

  it("rejects invalid date format", () => {
    const result = validateBirthProfileInput({ ...validInput, birth_date: "1995-99-99" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.some((issue) => issue.code === "invalid_birth_date")).toBe(true);
    }
  });

  it("rejects future birth dates", () => {
    const result = validateBirthProfileInput({ ...validInput, birth_date: "2999-01-01" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.issues.some((issue) => issue.code === "future_birth_date")).toBe(true);
    }
  });

  it("allows missing birth time when birth_time_unknown is true", () => {
    const result = validateBirthProfileInput({
      ...validInput,
      birth_time: null,
      birth_time_unknown: true
    });
    expect(result.ok).toBe(true);
  });
});
