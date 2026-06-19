import { expect, test } from "@playwright/test";

test("shows a safe validation message for invalid onboarding input", async ({ page }) => {
  await page.goto("/onboarding");

  await page.getByRole("button", { name: "분석 시작하기" }).click();

  await expect(page.getByText("닉네임은 1자 이상 20자 이하로 입력해주세요.")).toBeVisible();
  await expect(page.getByText("Error:")).toHaveCount(0);
});

test("moves from onboarding through analyzing to the generated report", async ({ page }) => {
  await page.goto("/onboarding");

  await page.getByLabel("닉네임").fill("지민");
  await page.getByLabel("생년월일").fill("1995-04-12");
  await page.getByRole("textbox", { name: "출생시간" }).fill("14:30");
  await page.getByLabel("성별").selectOption("female");
  await page.getByRole("button", { name: "분석 시작하기" }).click();

  await expect(page).toHaveURL(/\/analyzing\?birth_profile_id=bp_/);
  await expect(page.getByRole("heading", { name: "사주 흐름을 정리하고 있어요." })).toBeVisible();
  await expect(page).toHaveURL(/\/reports\/rpt_/, { timeout: 15_000 });
  await expect(page.getByRole("heading", { name: "지민님의 관계 패턴" })).toBeVisible();
  await expect(page.getByRole("link", { name: "그 사람과의 궁합 보기" })).toHaveAttribute(
    "href",
    "/compatibility/start"
  );
});

test("shows retry action when report generation cannot find the profile", async ({ page }) => {
  await page.goto("/analyzing?birth_profile_id=bp_missing");

  await expect(page.getByText("입력 정보를 찾을 수 없어요.")).toBeVisible();
  await expect(page.getByRole("button", { name: "다시 시도하기" })).toBeVisible();
});
