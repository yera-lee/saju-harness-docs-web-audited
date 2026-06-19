import { describe, expect, it } from "vitest";
import { POST } from "./route";
import { GET as getReport } from "../reports/[reportId]/route";
import { POST as createFirstLoveReport } from "../reports/first-love/route";

describe("POST /api/birth-profiles", () => {
  it("returns safe validation errors without raw internals", async () => {
    const request = new Request("http://localhost/api/birth-profiles", {
      method: "POST",
      body: JSON.stringify({
        nickname: "",
        birth_date: "2999-01-01",
        calendar_type: "solar",
        birth_time: null,
        birth_time_unknown: true,
        gender: null,
        interests: ["love_pattern"]
      })
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.ok).toBe(false);
    expect(body.error.message).toBeTruthy();
    expect(JSON.stringify(body)).not.toContain("stack");
    expect(JSON.stringify(body)).not.toContain("Error:");
    expect(JSON.stringify(body)).not.toContain("cause");
  });

  it("supports the onboarding to first-love report API flow", async () => {
    const profileResponse = await POST(
      new Request("http://localhost/api/birth-profiles", {
        method: "POST",
        body: JSON.stringify({
          nickname: "지민",
          birth_date: "1995-04-12",
          calendar_type: "solar",
          birth_time: "14:30",
          birth_time_unknown: false,
          gender: "female",
          interests: ["love_pattern", "relationship_pattern"]
        })
      })
    );
    const profileBody = await profileResponse.json();

    expect(profileResponse.status).toBe(200);
    expect(profileBody.ok).toBe(true);
    expect(profileBody.data.birth_profile_id).toMatch(/^bp_/);

    const reportResponse = await createFirstLoveReport(
      new Request("http://localhost/api/reports/first-love", {
        method: "POST",
        body: JSON.stringify({ birth_profile_id: profileBody.data.birth_profile_id })
      })
    );
    const reportBody = await reportResponse.json();

    expect(reportResponse.status).toBe(200);
    expect(reportBody.ok).toBe(true);
    expect(reportBody.data.report_id).toMatch(/^rpt_/);

    const readResponse = await getReport(new Request("http://localhost/api/reports/demo"), {
      params: Promise.resolve({ reportId: reportBody.data.report_id })
    });
    const readBody = await readResponse.json();

    expect(readResponse.status).toBe(200);
    expect(readBody.ok).toBe(true);
    expect(readBody.data.report.nickname).toBe("지민");
    expect(readBody.data.report.sections.length).toBeGreaterThan(0);
  });
});
