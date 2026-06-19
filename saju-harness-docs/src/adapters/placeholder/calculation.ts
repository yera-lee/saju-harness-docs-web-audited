import type { CalculationEngine } from "@/ports/engines";
import type { BirthProfileInput, ChartJson } from "@/domain/types";

const placeholderPillar = {
  heavenly_stem: "placeholder",
  earthly_branch: "placeholder"
};

export const placeholderCalculationEngine: CalculationEngine = {
  async calculateChart(input: BirthProfileInput): Promise<ChartJson> {
    return {
      year_pillar: placeholderPillar,
      month_pillar: placeholderPillar,
      day_pillar: placeholderPillar,
      hour_pillar: input.birth_time_unknown ? null : placeholderPillar,
      day_master: "placeholder",
      five_elements_distribution: {
        wood: 1,
        fire: 1,
        earth: 1,
        metal: 1,
        water: 1
      },
      ten_gods_distribution: {},
      calculation_warnings: [
        ...(input.birth_time_unknown ? ["birth_time_unknown" as const] : []),
        "timezone_defaulted"
      ]
    };
  }
};
