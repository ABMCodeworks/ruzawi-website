import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import process from "node:process";
import { test } from "node:test";
import { handler } from "../netlify/functions/anon-report.js";

test("anonymous reporting validates CAPTCHA and sends only the report", async (t) => {
  const savedEnv = { ...process.env };
  process.env.RECAPTCHA_SECRET_KEY = "test-secret";
  process.env.RESEND_API_KEY = "test-key";
  process.env.RESEND_FROM = "School <website@example.com>";
  delete process.env.ANON_REPORT_TO_EMAIL;
  t.after(() => { process.env = savedEnv; });

  const calls = [];
  let captchaValid = true;
  let emailFails = false;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url: String(url), options });
    if (String(url).includes("recaptcha/api/siteverify")) {
      return Response.json({ success: captchaValid });
    }
    assert.equal(String(url), "https://api.resend.com/emails");
    return emailFails
      ? Response.json({ name: "validation_error", message: "Private provider error" }, { status: 422 })
      : Response.json({ id: "test-message" });
  });

  const submit = (overrides = {}, eventOverrides = {}) => handler({
    httpMethod: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "192.0.2.1", cookie: "identity=private" },
    body: JSON.stringify({ report: "A concern to investigate", recaptchaToken: "test-token", ...overrides }),
    ...eventOverrides,
  });

  for (const report of ["", "   ", "a".repeat(10001), {}, null]) {
    assert.equal((await submit({ report })).statusCode, 400);
  }
  assert.equal((await submit({ recaptchaToken: "" })).statusCode, 400);
  assert.equal((await submit({}, { body: "invalid" })).statusCode, 400);
  assert.equal((await submit({}, { body: "null" })).statusCode, 400);
  assert.equal((await submit({}, { body: "x".repeat(64001) })).statusCode, 413);
  assert.equal((await submit({}, { httpMethod: "GET" })).statusCode, 405);
  assert.equal((await submit({}, { headers: { "content-type": "text/plain" } })).statusCode, 415);
  assert.equal((await submit({ website: "spam" })).statusCode, 200);
  assert.equal(calls.length, 0);

  captchaValid = false;
  assert.equal((await submit()).statusCode, 400);
  assert.equal(calls.length, 1);
  captchaValid = true;
  calls.length = 0;
  const result = await submit({ email: "private@example.com", name: "Private name", ip: "192.0.2.1" });
  assert.equal(result.statusCode, 200);
  assert.equal(JSON.parse(result.body).success, true);
  assert.equal(result.headers["Cache-Control"], "no-store");
  assert.equal(calls.length, 2);
  assert.deepEqual([...calls[0].options.body.keys()].sort(), ["response", "secret"]);
  const email = JSON.parse(calls[1].options.body);
  assert.equal(email.to, "administrator@ruzawi.com");
  assert.equal(email.reply_to, undefined);
  assert.equal(email.replyTo, undefined);
  assert.match(email.text, /A concern to investigate/);
  assert.doesNotMatch(JSON.stringify(email), /private@example|Private name|192\.0\.2\.1|test-token|identity/);

  emailFails = true;
  const failed = await submit();
  assert.equal(failed.statusCode, 502);
  assert.equal(JSON.parse(failed.body).success, false);
  assert.doesNotMatch(failed.body, /Private provider error/);
  delete process.env.RESEND_FROM;
  assert.equal((await submit()).statusCode, 503);
});

test("report entry is noindex and separate from tracking and public navigation", async () => {
  const html = await readFile(new URL("../anon-report.html", import.meta.url), "utf8");
  assert.match(html, /name="robots" content="noindex, nofollow, noarchive"/);
  assert.doesNotMatch(html, /cookiehub|clarity|googletagmanager|canonical|application\/ld\+json/);
  for (const path of ["public/sitemap.xml", "src/components/MainMenu.jsx", "src/components/Footer.jsx", "src/utils/menuHref.js"]) {
    assert.doesNotMatch(await readFile(new URL(`../${path}`, import.meta.url), "utf8"), /anon-report/);
  }
});
