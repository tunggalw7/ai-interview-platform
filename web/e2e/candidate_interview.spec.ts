import { test, expect } from "@playwright/test";
import { loginAsAssessor } from "./helpers/auth";

test.describe("Candidate Interview Access & Pre-Start Hardware Check Flow", () => {
  const token = "["e75e595e", "645b1fa5", "6982272a", "f532c0a0", "651de69a", "63621aa5", "a636da52", "314478e7"].join("")";

  test("should load candidate interview pre-start page with compact HeroBanner and HardwareCheck", async ({ page }) => {
    await page.goto(`/interview/${token}`);

    // Verify compact HeroBanner on candidate page
    await expect(page.getByText(/Sesi Wawancara Teknis Interaktif/i)).toBeVisible();
    await expect(page.getByText(/Wawancara AI: Senior QA Analyst/i).or(page.getByText(/AI Technical Interview/i))).toBeVisible();

    // Verify Hardware Check items are visible
    await expect(page.getByText(/OS & browser/i)).toBeVisible();
    await expect(page.getByText(/Microphone/i)).toBeVisible();
    await expect(page.getByText(/Internet/i)).toBeVisible();
  });

  test("should show candidate invitation management in assessor portal", async ({ page }) => {
    // Log in as assessor using helper
    await loginAsAssessor(page);

    // Go to invite/sessions management page for assessment #2
    await page.goto("/assessments/2/invite");

    // Check header and compact hero banner
    await expect(page.getByRole("heading", { name: /Daftar Sesi Wawancara Kandidat/i })).toBeVisible();

    // Verify candidate session is listed (James Rodri)
    await expect(page.getByText(/James Rodri/i)).toBeVisible();

    // Verify presence of copy link action
    await expect(page.getByRole("button", { name: /Copy Invite Link/i }).or(page.getByRole("button", { name: /Copy Link/i }))).toBeVisible();
  });
});
