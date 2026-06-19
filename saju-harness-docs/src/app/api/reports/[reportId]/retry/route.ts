import { runtime } from "@/application/runtime";
import { createAppError, fail, ok } from "@/lib/api";

export async function POST(_request: Request, context: { params: Promise<{ reportId: string }> }) {
  try {
    const { reportId } = await context.params;
    const report = await runtime.repositories.reports.findById(reportId);

    if (!report) {
      return fail(createAppError("report_not_found"));
    }

    return ok({
      report_id: report.id,
      status: report.status
    });
  } catch (error) {
    return fail(createAppError("internal_error", error));
  }
}
