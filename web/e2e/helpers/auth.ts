import { Page } from "@playwright/test";

const rawHeader = '{"alg":"HS256"}';
const rawPayload = '{"user_id":1,"role":"admin","scheme":"test-corp","exp":1792322294}';
const signature = "KGc9U2v86JMrIG5jH5ut1N-UFxjV7fgo6Qi9i8abSgE";
export const TEST_TOKEN = `${Buffer.from(rawHeader).toString("base64url")}.${Buffer.from(rawPayload).toString("base64url")}.${signature}`;

export async function loginAsAssessor(page: Page) {
  // Pre-seed the localStorage auth token to avoid flaky network wait in beforeEach
  await page.addInitScript((token) => {
    localStorage.setItem("auth_token", token);
  }, TEST_TOKEN);
}
