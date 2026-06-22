import type { BirthProfileInput, CalendarType, Gender } from "./types";

export type ValidationIssue = {
  field: keyof BirthProfileInput;
  code: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; value: BirthProfileInput }
  | { ok: false; issues: ValidationIssue[] };

const calendarTypes = new Set<CalendarType>(["solar", "lunar"]);
const genders = new Set<Exclude<Gender, null>>([
  "female",
  "male",
  "other",
  "prefer_not_to_say"
]);

export function validateBirthProfileInput(input: BirthProfileInput): ValidationResult {
  const issues: ValidationIssue[] = [];
  const nickname = input.nickname.trim();

  if (nickname.length < 1 || nickname.length > 20) {
    issues.push({
      field: "nickname",
      code: "invalid_nickname",
      message: "닉네임은 1자 이상 20자 이하로 입력해주세요."
    });
  }

  if (!isValidDate(input.birth_date)) {
    issues.push({
      field: "birth_date",
      code: "invalid_birth_date",
      message: "생년월일을 YYYY-MM-DD 형식으로 입력해주세요."
    });
  } else if (isFutureDate(input.birth_date)) {
    issues.push({
      field: "birth_date",
      code: "future_birth_date",
      message: "미래 날짜는 사용할 수 없어요."
    });
  }

  if (!calendarTypes.has(input.calendar_type)) {
    issues.push({
      field: "calendar_type",
      code: "invalid_calendar_type",
      message: "양력 또는 음력을 선택해주세요."
    });
  }

  if (!input.birth_time_unknown && !isValidBirthTime(input.birth_time)) {
    issues.push({
      field: "birth_time",
      code: "invalid_birth_time",
      message: "출생시간은 HH:mm 형식으로 입력하거나 모름을 선택해주세요."
    });
  }

  if (input.birth_time_unknown && input.birth_time !== null && input.birth_time !== "") {
    issues.push({
      field: "birth_time",
      code: "invalid_birth_time",
      message: "출생시간 모름을 선택했다면 시간 입력은 비워주세요."
    });
  }

  if (input.gender !== null && !genders.has(input.gender)) {
    issues.push({
      field: "gender",
      code: "invalid_gender",
      message: "성별 선택값을 확인해주세요."
    });
  }

  if (!Array.isArray(input.interests) || input.interests.length === 0) {
    issues.push({
      field: "interests",
      code: "invalid_interests",
      message: "관심 주제를 하나 이상 선택해주세요."
    });
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return {
    ok: true,
    value: {
      ...input,
      nickname,
      birth_time: input.birth_time_unknown ? null : input.birth_time
    }
  };
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isFutureDate(value: string): boolean {
  const today = new Date();
  const todayText = today.toISOString().slice(0, 10);
  return value > todayText;
}

function isValidBirthTime(value: string | null): boolean {
  if (value === null) {
    return false;
  }
  if (!/^\d{2}:\d{2}$/.test(value)) {
    return false;
  }
  const [hourText, minuteText] = value.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}
