import { createMemoryRepositories } from "@/adapters/memory/repositories";
import { placeholderCalculationEngine } from "@/adapters/placeholder/calculation";
import { placeholderInterpretationEngine } from "@/adapters/placeholder/interpretation";
import { safetyReviewer } from "@/domain/safety";

export const runtime = {
  repositories: createMemoryRepositories(),
  calculationEngine: placeholderCalculationEngine,
  interpretationEngine: placeholderInterpretationEngine,
  safetyReviewer
};
