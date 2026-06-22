import { createFirstLoveReport } from "@/application/createFirstLoveReport";
import { runtime } from "@/application/runtime";
import { createAppError, fail, ok, readJson } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const payload = (await readJson(request)) as { birth_profile_id?: string };
    if (!payload.birth_profile_id) {
      return fail(createAppError("birth_profile_not_found"));
    }

    const result = await createFirstLoveReport(
      payload.birth_profile_id,
      runtime.repositories,
      runtime.calculationEngine,
      runtime.interpretationEngine,
      runtime.safetyReviewer
    );

    if (!result.ok) {
      return fail(result.error);
    }

    return ok({
      report_id: result.data.id,
      status: result.data.status
    });
  } catch (error) {
    return fail(createAppError("internal_error", error));
  }
}
