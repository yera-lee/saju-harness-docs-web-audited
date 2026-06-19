import { describe, expect, it } from "vitest";
import { POST } from "./route";

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
});
