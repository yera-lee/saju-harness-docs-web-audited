import type { FirstLovePatternReport, Result } from "@/domain/types";
import type { CalculationEngine, InterpretationEngine, SafetyReviewer } from "@/ports/engines";
import type { Repositories } from "@/ports/repositories";

export async function createFirstLoveReport(
  birthProfileId: string,
  repositories: Repositories,
  calculationEngine: CalculationEngine,
  interpretationEngine: InterpretationEngine,
  safetyReviewer: SafetyReviewer
): Promise<Result<FirstLovePatternReport>> {
  const birthProfile = await repositories.birthProfiles.findById(birthProfileId);
  if (!birthProfile) {
    return {
      ok: false,
      error: {
        code: "birth_profile_not_found",
        safeMessage: "입력 정보를 찾을 수 없어요.",
        retryable: false,
        requestId: crypto.randomUUID()
      }
    };
  }

  const chartJson = await calculationEngine.calculateChart(birthProfile);
  const chart = await repositories.charts.create({
    birth_profile_id: birthProfile.id,
    chart_json: chartJson,
    calculation_version: "placeholder-v1",
    calculation_warnings: chartJson.calculation_warnings
  });

  const reportDraft = await interpretationEngine.generateFirstLoveReport({
    birthProfile,
    chartJson,
    selectedInterests: birthProfile.interests,
    reportVersion: "first-love-placeholder-v1",
    promptVersion: "placeholder-v1"
  });

  const review = await safetyReviewer.reviewReport({
    ...reportDraft,
    saju_chart_id: chart.id
  });

  if (review.status === "failed") {
    return {
      ok: false,
      error: {
        code: "safety_filter_failed",
        safeMessage: "리포트를 안전하게 정리하는 중 문제가 발생했어요. 다시 시도해주세요.",
        retryable: false,
        requestId: crypto.randomUUID()
      }
    };
  }

  const report = await repositories.reports.saveCompletedReport({
    ...review.report,
    saju_chart_id: chart.id,
    safety_status: review.status
  });

  return { ok: true, data: report };
}
