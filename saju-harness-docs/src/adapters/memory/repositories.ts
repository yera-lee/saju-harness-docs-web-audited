import type {
  BirthProfileRepository,
  ChartRepository,
  CreateBirthProfileRecord,
  ReportRepository,
  SajuChart
} from "@/ports/repositories";
import type { BirthProfile, FirstLovePatternReport } from "@/domain/types";

export function createMemoryBirthProfileRepository(): BirthProfileRepository {
  const records = new Map<string, BirthProfile>();

  return {
    async create(input: CreateBirthProfileRecord) {
      const now = new Date().toISOString();
      const record: BirthProfile = {
        ...input,
        id: `bp_${crypto.randomUUID()}`,
        created_at: now,
        updated_at: now
      };
      records.set(record.id, record);
      return record;
    },
    async findById(id: string) {
      return records.get(id) ?? null;
    },
    async findByGuestSessionId(guestSessionId: string) {
      return [...records.values()].filter((record) => record.guest_session_id === guestSessionId);
    }
  };
}

export function createMemoryChartRepository(): ChartRepository {
  const records = new Map<string, SajuChart>();

  return {
    async create(input) {
      const record: SajuChart = {
        ...input,
        id: `chart_${crypto.randomUUID()}`,
        created_at: new Date().toISOString()
      };
      records.set(record.id, record);
      return record;
    },
    async findByBirthProfileId(birthProfileId: string) {
      return [...records.values()].find((record) => record.birth_profile_id === birthProfileId) ?? null;
    }
  };
}

export function createMemoryReportRepository(): ReportRepository {
  const records = new Map<string, FirstLovePatternReport>();

  return {
    async create(input) {
      records.set(input.id, input);
      return input;
    },
    async findById(id: string) {
      return records.get(id) ?? null;
    },
    async saveCompletedReport(input) {
      if (input.status !== "completed" || input.safety_status === "failed") {
        throw new Error("Unsafe report cannot be saved as completed");
      }
      records.set(input.id, input);
      return input;
    }
  };
}

export function createMemoryRepositories() {
  return {
    birthProfiles: createMemoryBirthProfileRepository(),
    charts: createMemoryChartRepository(),
    reports: createMemoryReportRepository()
  };
}
