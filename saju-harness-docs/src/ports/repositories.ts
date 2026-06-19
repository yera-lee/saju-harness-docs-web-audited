import type { BirthProfile, ChartJson, FirstLovePatternReport } from "@/domain/types";

export type CreateBirthProfileRecord = Omit<BirthProfile, "id" | "created_at" | "updated_at">;

export type BirthProfileRepository = {
  create(input: CreateBirthProfileRecord): Promise<BirthProfile>;
  findById(id: string): Promise<BirthProfile | null>;
  findByGuestSessionId(guestSessionId: string): Promise<BirthProfile[]>;
};

export type SajuChart = {
  id: string;
  birth_profile_id: string;
  chart_json: ChartJson;
  calculation_version: string;
  calculation_warnings: string[];
  created_at: string;
};

export type ChartRepository = {
  create(input: Omit<SajuChart, "id" | "created_at">): Promise<SajuChart>;
  findByBirthProfileId(birthProfileId: string): Promise<SajuChart | null>;
};

export type ReportRepository = {
  create(input: FirstLovePatternReport): Promise<FirstLovePatternReport>;
  findById(id: string): Promise<FirstLovePatternReport | null>;
  saveCompletedReport(input: FirstLovePatternReport): Promise<FirstLovePatternReport>;
};

export type Repositories = {
  birthProfiles: BirthProfileRepository;
  charts: ChartRepository;
  reports: ReportRepository;
};
