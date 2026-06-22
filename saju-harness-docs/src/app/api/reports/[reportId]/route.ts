import { runtime } from "@/application/runtime";
import { createAppError, fail, ok } from "@/lib/api";

export async function GET(_request: Request, context: { params: Promise<{ reportId: string }> }) {
  try {
    const { reportId } = await context.params;
    const report = await runtime.repositories.reports.findById(reportId);

    if (!report) {
      return fail(createAppError("report_not_found"));
    }

    return ok({
      report: {
        id: report.id,
        nickname: report.nickname,
        status: report.status,
        report_type: report.report_type,
        sections: report.sections,
        compatibility_cta: {
          label: "그 사람과의 궁합 보기",
          href: "/compatibility/start"
        }
      }
    });
  } catch (error) {
    return fail(createAppError("internal_error", error));
  }
}
