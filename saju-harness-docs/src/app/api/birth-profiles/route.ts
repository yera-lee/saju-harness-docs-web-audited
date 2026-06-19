import { createBirthProfile } from "@/application/createBirthProfile";
import { runtime } from "@/application/runtime";
import type { BirthProfileInput } from "@/domain/types";
import { createAppError, fail, ok, readJson } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const payload = (await readJson(request)) as BirthProfileInput;
    const result = await createBirthProfile(payload, runtime.repositories.birthProfiles, "guest_demo");

    if (!result.ok) {
      return fail(result.error);
    }

    return ok({ birth_profile_id: result.data.id });
  } catch (error) {
    return fail(createAppError("internal_error", error));
  }
}
