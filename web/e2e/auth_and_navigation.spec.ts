import { test, expect } from "@playwright/test";

test.describe("Authentication and Layout Navigation Flow", () => {
  test("should render the Login page with Rakamin branding and quick demo button", async ({ page }) => {
    await page.goto("/login");

    // Check Rakamin logo and branding
    const logo = page.locator("img[alt='Rakamin']");
    await expect(logo).toBeVisible();

    // Check header pill
    await expect(page.getByText("Talent Assessment Suite")).toBeVisible();

    // Check Quick Demo Login pill
    await expect(page.getByText("admin@rakamin.com • admin123")).toBeVisible();
    await expect(page.getByRole("button", { name: /1-Click Sign In/i })).toBeVisible();

    // Check email & password inputs
    const emailInput = page.locator("#email");
    const passwordInput = page.locator("#password");
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test("should authenticate successfully using 1-Click Demo Login and navigate to Assessments", async ({ page }) => {
    await page.goto("/login");

    // Click 1-Click Sign In
    await page.getByRole("button", { name: /1-Click Sign In/i }).click();

    // Should redirect to /assessments
    await page.waitForURL("**/assessments");
    await expect(page).toHaveURL(/.*\/assessments/);

    // Header should show Rakamin branding and navigation
    const headerLogo = page.locator("header img[alt='Rakamin']");
    await expect(headerLogo).toBeVisible();
    await expect(page.getByRole("link", { name: /Assessments/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Role Vacancies/i })).toBeVisible();

    // Sign out button should be present
    const signOutBtn = page.getByRole("button", { name: /Sign Out/i });
    await expect(signOutBtn).toBeVisible();
  });

  test("should log out and redirect back to /login when Sign Out is clicked", async ({ page }) => {
    // Perform login first
    await page.goto("/login");
    await page.getByRole("button", { name: /1-Click Sign In/i }).click();
    await page.waitForURL("**/assessments");

    // Click Sign Out
    const signOutBtn = page.getByRole("button", { name: /Sign Out/i });
    await signOutBtn.click();

    // Should redirect to /login
    await page.waitForURL("**/login");
    await expect(page).toHaveURL(/.*\/login/);
  });
});
