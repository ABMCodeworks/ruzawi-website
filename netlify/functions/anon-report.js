import { Resend } from "resend";
import { Buffer } from "node:buffer";
import process from "node:process";
import { getReportError } from "../../src/utils/anonymousReportValidation.js";

const MAX_BODY_BYTES = 64000;

function response(statusCode, message, success = false) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
    body: JSON.stringify({ success, message }),
  };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") return response(405, "Method not allowed.");
  const contentType = event.headers?.["content-type"] || event.headers?.["Content-Type"] || "";
  if (contentType.split(";")[0].trim().toLowerCase() !== "application/json") {
    return response(415, "Please submit the reporting form.");
  }

  const body = Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "utf8");
  if (body.length > MAX_BODY_BYTES) return response(413, "The report is too long.");

  let fields;
  try {
    fields = JSON.parse(body.toString("utf8"));
  } catch {
    return response(400, "Invalid report. Please try again.");
  }
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    return response(400, "Invalid report. Please try again.");
  }
  if (fields.website) return response(200, "Report received.", true);

  const allowedFields = ["report", "recaptchaToken", "website"];
  if (Object.keys(fields).some((key) => !allowedFields.includes(key))) {
    return response(400, "Only the report text and CAPTCHA are accepted. Files cannot be attached.");
  }

  const report = typeof fields.report === "string" ? fields.report.trim() : "";
  const token = typeof fields.recaptchaToken === "string" ? fields.recaptchaToken.trim() : "";
  const reportError = getReportError(report);
  if (reportError) return response(400, reportError);
  if (!token || token.length > 10000) return response(400, "Please complete the CAPTCHA.");

  if (!process.env.RECAPTCHA_SECRET_KEY || !process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    return response(503, "Reporting is temporarily unavailable. Please try again later.");
  }

  try {
    // Do not forward the visitor's IP, cookies, user agent or other request metadata.
    const verification = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(10000),
    });
    if (!verification.ok) throw new Error("CAPTCHA service unavailable");
    const captcha = await verification.json();
    if (captcha.success !== true) {
      return response(400, "CAPTCHA verification failed or expired. Please complete it again.");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.ANON_REPORT_TO_EMAIL || "administrator@ruzawi.com",
      subject: "Anonymous report — Ruzawi School",
      text: `An anonymous report was submitted through the school website.\n\n${report}\n\nNo sender contact details were requested.`,
    });
    if (error || !data?.id) throw new Error("Report delivery failed");
    return response(200, "Your report has been sent to the school.", true);
  } catch {
    // Never log report contents, CAPTCHA tokens, headers or provider errors.
    return response(502, "We could not confirm delivery. Please try again later; retrying may send a duplicate.");
  }
}
