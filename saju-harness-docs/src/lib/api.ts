import { NextResponse } from "next/server";
import type { AppError, ErrorCode } from "@/domain/types";

const safeMessages: Record<ErrorCode, string> = {
  invalid_nickname: "입력값을 확인해주세요.",
  invalid_birth_date: "입력값을 확인해주세요.",
  future_birth_date: "미래 날짜는 사용할 수 없어요.",
  invalid_calendar_type: "입력값을 확인해주세요.",
  invalid_birth_time: "입력값을 확인해주세요.",
  invalid_gender: "입력값을 확인해주세요.",
  invalid_interests: "입력값을 확인해주세요.",
  birth_profile_not_found: "입력 정보를 찾을 수 없어요.",
  calculation_failed: "사주 흐름을 정리하는 중 문제가 발생했어요.",
  report_generation_failed: "리포트를 생성하는 중 문제가 발생했어요. 다시 시도해주세요.",
  safety_filter_failed: "리포트를 안전하게 정리하는 중 문제가 발생했어요. 다시 시도해주세요.",
  report_not_found: "리포트를 찾을 수 없어요.",
  report_pending: "리포트를 아직 정리하고 있어요.",
  report_unavailable: "리포트를 불러오는 중 문제가 발생했어요. 다시 시도해주세요.",
  access_denied: "리포트를 찾을 수 없어요.",
  retry_limit_exceeded: "다시 시도 횟수를 초과했어요.",
  internal_error: "잠시 후 다시 시도해주세요."
};

const retryableCodes = new Set<ErrorCode>([
  "report_generation_failed",
  "report_pending",
  "report_unavailable",
  "internal_error"
]);

const statusByCode: Record<ErrorCode, number> = {
  invalid_nickname: 400,
  invalid_birth_date: 400,
  future_birth_date: 400,
  invalid_calendar_type: 400,
  invalid_birth_time: 400,
  invalid_gender: 400,
  invalid_interests: 400,
  birth_profile_not_found: 404,
  calculation_failed: 422,
  report_generation_failed: 503,
  safety_filter_failed: 422,
  report_not_found: 404,
  report_pending: 202,
  report_unavailable: 503,
  access_denied: 404,
  retry_limit_exceeded: 429,
  internal_error: 500
};

export function createAppError(code: ErrorCode, cause?: unknown): AppError {
  return {
    code,
    safeMessage: safeMessages[code],
    retryable: retryableCodes.has(code),
    requestId: crypto.randomUUID(),
    cause
  };
}

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(error: AppError) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: error.code,
        message: error.safeMessage,
        retryable: error.retryable,
        request_id: error.requestId
      }
    },
    { status: statusByCode[error.code] }
  );
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch (error) {
    throw createAppError("invalid_interests", error);
  }
}
