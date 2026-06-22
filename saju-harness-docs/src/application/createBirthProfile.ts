import { validateBirthProfileInput } from "@/domain/validation";
import type { BirthProfile, BirthProfileInput, ErrorCode, Result } from "@/domain/types";
import type { BirthProfileRepository } from "@/ports/repositories";

export async function createBirthProfile(
  input: BirthProfileInput,
  repository: BirthProfileRepository,
  guestSessionId: string | null
): Promise<Result<BirthProfile>> {
  const validation = validateBirthProfileInput(input);
  if (!validation.ok) {
    const issue = validation.issues[0];
    return {
      ok: false,
      error: {
        code: toErrorCode(issue?.code),
        safeMessage: issue?.message ?? "입력값을 확인해주세요.",
        retryable: false,
        requestId: crypto.randomUUID()
      }
    };
  }

  const record = await repository.create({
    ...validation.value,
    user_id: null,
    guest_session_id: guestSessionId,
    timezone: "Asia/Seoul"
  });

  return { ok: true, data: record };
}

function toErrorCode(code: string | undefined): ErrorCode {
  switch (code) {
    case "invalid_nickname":
    case "invalid_birth_date":
    case "future_birth_date":
    case "invalid_calendar_type":
    case "invalid_birth_time":
    case "invalid_gender":
    case "invalid_interests":
      return code;
    default:
      return "invalid_birth_date";
  }
}
