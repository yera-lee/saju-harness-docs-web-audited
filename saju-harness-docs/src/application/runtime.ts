import { createMemoryRepositories } from "@/adapters/memory/repositories";
import { placeholderCalculationEngine } from "@/adapters/placeholder/calculation";
import { placeholderInterpretationEngine } from "@/adapters/placeholder/interpretation";
import { safetyReviewer } from "@/domain/safety";

type AppRuntime = {
  repositories: ReturnType<typeof createMemoryRepositories>;
  calculationEngine: typeof placeholderCalculationEngine;
  interpretationEngine: typeof placeholderInterpretationEngine;
  safetyReviewer: typeof safetyReviewer;
};

const globalRuntime = globalThis as typeof globalThis & {
  __sajuHarnessRuntime?: AppRuntime;
};

export const runtime = (globalRuntime.__sajuHarnessRuntime ??= {
  repositories: createMemoryRepositories(),
  calculationEngine: placeholderCalculationEngine,
  interpretationEngine: placeholderInterpretationEngine,
  safetyReviewer
});
