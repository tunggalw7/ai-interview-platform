import { test, expect } from "@playwright/test";
import { loginAsAssessor, createCandidateSession } from "./helpers/auth";

test.describe("Candidate Interview Access & Pre-Start Hardware Check Flow", () => {
  test("should load candidate interview pre-start page with compact HeroBanner and HardwareCheck", async ({ page }) => {
    // Generate fresh session token
    const token = await createCandidateSession("Pre-Start Candidate");
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

    // Verify candidate sessions are listed
    await expect(page.getByText(/Candidate Sessions/i)).toBeVisible();

    // Verify presence of invite candidate trigger button
    await expect(page.getByRole("button", { name: /Undang Kandidat/i })).toBeVisible();
  });

  test("should successfully complete hardware check and proceed to live AI interview session", async ({ page }) => {
    // Generate fresh session token
    const token = await createCandidateSession("Live Session Candidate");
    await page.goto(`/interview/${token}`);

    // Wait for hardware check to complete with fake media stream and Start Interview button to become enabled
    const startBtn = page.getByRole("button", { name: /Start Interview/i });
    await expect(startBtn).toBeEnabled({ timeout: 15000 });
    await startBtn.click();

    // Verify transition into the live AI interview room
    await expect(page.getByText("AI Interview", { exact: true })).toBeVisible();

    // Timer or VoiceBars or Akhiri Wawancara should be present
    await expect(page.getByRole("button", { name: /Akhiri Wawancara/i }).or(page.getByText(/Connecting/i)).or(page.getByText(/AI speaking/i)).or(page.getByText(/Listening/i))).toBeVisible();
  });
});
