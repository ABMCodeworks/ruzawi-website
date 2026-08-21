import { randomBytes } from "node:crypto";
import { Resend } from "resend";
import Busboy from "busboy";

const resend = new Resend(process.env.RESEND_API_KEY);

const PRIVACY_EMAIL = "privacy@ruzawi.com";
const PRIVACY_NOTICE_VERSION = "2026-08-21";
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const REQUEST_TYPES = {
  request_information: "Information about how my data is used",
  request_access: "Access to or a copy of my personal information",
  request_correction: "Correction of false, misleading or outdated information",
  request_deletion: "Deletion or erasure request",
  request_objection: "Object to all or part of the processing",
  request_withdraw_consent: "Withdraw consent",
  request_stop_marketing: "Stop direct marketing",
  request_complaint: "Raise a privacy concern or complaint",
  request_other: "Other privacy request",
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function clean(value = "") {
  return String(value || "").trim();
}

function cleanHeader(value = "") {
  return clean(value).replace(/[\r\n]+/g, " ");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const contentType =
      event.headers["content-type"] || event.headers["Content-Type"] || "";

    if (!contentType) {
      reject(new Error("Missing content-type header."));
      return;
    }

    const busboy = Busboy({
      headers: {
        "content-type": contentType,
      },
      limits: {
        fields: 40,
        fieldSize: 20 * 1024,
        files: 0,
      },
    });

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (_name, file) => {
      file.resume();
    });

    busboy.on("error", reject);
    busboy.on("finish", () => resolve(fields));

    const body = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64")
      : Buffer.from(event.body || "", "utf8");

    busboy.end(body);
  });
}

async function fetchWithTimeout(url, options, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function verifyRecaptcha(token) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY.");
  }

  if (!token) {
    return { ok: false, reason: "Please complete the reCAPTCHA checkbox." };
  }

  const params = new URLSearchParams();
  params.set("secret", process.env.RECAPTCHA_SECRET_KEY);
  params.set("response", token);

  let response;

  try {
    response = await fetchWithTimeout(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      return { ok: false, reason: "reCAPTCHA verification timed out." };
    }

    throw error;
  }

  const result = await response.json().catch(() => ({}));

  if (!result.success) {
    return { ok: false, reason: "reCAPTCHA verification failed." };
  }

  if (result.action && result.action !== "privacy_request") {
    return { ok: false, reason: "Invalid reCAPTCHA action." };
  }

  if (typeof result.score === "number" && result.score < 0.5) {
    return { ok: false, reason: "reCAPTCHA verification failed." };
  }

  return { ok: true };
}

function createReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `PR-${date}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, {});
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Method not allowed." });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY.");
    }

    const fields = await parseMultipartForm(event);

    if (clean(fields.website)) {
      return jsonResponse(200, { message: "Request received." });
    }

    const fullName = cleanHeader(fields.full_name);
    const email = cleanHeader(fields.email).toLowerCase();
    const phone = cleanHeader(fields.phone);
    const actingFor = clean(fields.acting_for);
    const dataSubjectName = cleanHeader(fields.data_subject_name);
    const relationship = cleanHeader(fields.relationship);
    const schoolArea = cleanHeader(fields.school_area);
    const relevantPeriod = cleanHeader(fields.relevant_period);
    const details = clean(fields.details);
    const preferredContact = clean(fields.preferred_contact);
    const recaptchaToken = clean(fields.recaptchaToken);

    const selectedRequests = Object.entries(REQUEST_TYPES)
      .filter(([fieldName]) => clean(fields[fieldName]) === "1")
      .map(([, label]) => label);

    const actingForIsValid = ["self", "child", "representative"].includes(
      actingFor,
    );
    const preferredContactIsValid = ["email", "phone"].includes(
      preferredContact,
    );
    const needsRepresentedPerson = actingFor !== "self";

    if (
      !fullName ||
      !email ||
      !actingForIsValid ||
      !preferredContactIsValid ||
      !details ||
      !selectedRequests.length
    ) {
      return jsonResponse(400, {
        message: "Please complete all required fields and choose a request type.",
      });
    }

    if (!isValidEmail(email) || email.length > 254) {
      return jsonResponse(400, {
        message: "Please enter a valid email address.",
      });
    }

    if (preferredContact === "phone" && !phone) {
      return jsonResponse(400, {
        message: "Please provide a telephone number for telephone contact.",
      });
    }

    if (
      fullName.length > 150 ||
      phone.length > 80 ||
      dataSubjectName.length > 150 ||
      relationship.length > 150 ||
      schoolArea.length > 150 ||
      relevantPeriod.length > 150 ||
      details.length > 10000
    ) {
      return jsonResponse(400, {
        message: "One or more fields are longer than permitted.",
      });
    }

    if (needsRepresentedPerson && (!dataSubjectName || !relationship)) {
      return jsonResponse(400, {
        message:
          "Please name the person whose information is involved and explain your relationship or authority.",
      });
    }

    if (
      clean(fields.authority_confirmed) !== "1" ||
      clean(fields.privacy_acknowledged) !== "1" ||
      clean(fields.notice_version) !== PRIVACY_NOTICE_VERSION
    ) {
      return jsonResponse(400, {
        message: "Please confirm the required privacy declarations.",
      });
    }

    const recaptcha = await verifyRecaptcha(recaptchaToken);

    if (!recaptcha.ok) {
      return jsonResponse(400, { message: recaptcha.reason });
    }

    const reference = createReference();
    const receivedAt = new Date().toISOString();
    const actingForLabel = {
      self: "The requester",
      child: "A child as parent/legal guardian",
      representative: "Another adult as authorised representative",
    }[actingFor];

    const text = `
New Ruzawi privacy-rights request

Reference: ${reference}
Received: ${receivedAt}
Notice version: ${PRIVACY_NOTICE_VERSION}

Requester: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
Preferred contact: ${preferredContact}
Acting for: ${actingForLabel}
Data subject: ${needsRepresentedPerson ? dataSubjectName : fullName}
Relationship/authority: ${needsRepresentedPerson ? relationship : "Self"}

Request type(s):
- ${selectedRequests.join("\n- ")}

School area or interaction: ${schoolArea || "Not provided"}
Relevant period: ${relevantPeriod || "Not provided"}

Request details:
${details}

Authority and accuracy confirmed: Yes
Privacy notice acknowledged: Yes

Identity and authority must be verified proportionately before personal information is disclosed, corrected or deleted. Do not request identity documents by ordinary email unless an approved secure method is being used.
`.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
        <h2 style="color: #00582C;">New Ruzawi privacy-rights request</h2>
        <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
        <p><strong>Received:</strong> ${escapeHtml(receivedAt)}</p>
        <p><strong>Notice version:</strong> ${escapeHtml(PRIVACY_NOTICE_VERSION)}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p><strong>Requester:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Preferred contact:</strong> ${escapeHtml(preferredContact)}</p>
        <p><strong>Acting for:</strong> ${escapeHtml(actingForLabel)}</p>
        <p><strong>Data subject:</strong> ${escapeHtml(needsRepresentedPerson ? dataSubjectName : fullName)}</p>
        <p><strong>Relationship/authority:</strong> ${escapeHtml(needsRepresentedPerson ? relationship : "Self")}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p><strong>Request type(s):</strong></p>
        <ul>${selectedRequests.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <p><strong>School area or interaction:</strong> ${escapeHtml(schoolArea || "Not provided")}</p>
        <p><strong>Relevant period:</strong> ${escapeHtml(relevantPeriod || "Not provided")}</p>
        <p><strong>Request details:</strong></p>
        <p>${escapeHtml(details).replaceAll("\n", "<br />")}</p>
        <div style="background: #f6f1e7; padding: 16px; border-radius: 10px; margin-top: 24px;">
          <strong>Verification reminder:</strong> Verify identity and authority proportionately before disclosing, correcting or deleting information. Do not request identity documents by ordinary email unless an approved secure method is being used.
        </div>
      </div>
    `;

    const internalResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM ||
        "Ruzawi Website <website@your-verified-domain.com>",
      to: PRIVACY_EMAIL,
      replyTo: email,
      subject: `[${reference}] Privacy request: ${selectedRequests[0]} — ${fullName}`,
      text,
      html,
    });

    if (internalResult.error) {
      throw new Error(
        internalResult.error.message || "The privacy request could not be sent.",
      );
    }

    const confirmationText = `
Dear ${fullName},

We have received your privacy-rights request.

Reference: ${reference}
Request type(s): ${selectedRequests.join(", ")}

Please keep this reference. The privacy team may contact you to verify your identity or, where you act for someone else, your authority. Please do not email identity documents unless the team provides an approved secure method.

We will assess the request and respond without undue delay, subject to Zimbabwean law and any information we are legally required to retain.

Ruzawi School Privacy Team
privacy@ruzawi.com
`.trim();

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
        <h2 style="color: #00582C;">We received your privacy request</h2>
        <p>Dear ${escapeHtml(fullName)},</p>
        <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
        <p><strong>Request type(s):</strong> ${selectedRequests.map(escapeHtml).join(", ")}</p>
        <p>The privacy team may contact you to verify your identity or your authority to act for someone else. Please do not email identity documents unless the team provides an approved secure method.</p>
        <p>We will assess the request and respond without undue delay, subject to Zimbabwean law and any information we are legally required to retain.</p>
        <p>Ruzawi School Privacy Team<br /><a href="mailto:${PRIVACY_EMAIL}">${PRIVACY_EMAIL}</a></p>
      </div>
    `;

    const confirmationResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM ||
        "Ruzawi Website <website@your-verified-domain.com>",
      to: email,
      replyTo: PRIVACY_EMAIL,
      subject: `${reference} — Ruzawi privacy request received`,
      text: confirmationText,
      html: confirmationHtml,
    });

    if (confirmationResult.error) {
      console.error("Privacy request confirmation email failed:", confirmationResult.error);
    }

    return jsonResponse(200, {
      message: "Your privacy request has been received.",
      reference,
      confirmationSent: !confirmationResult.error,
    });
  } catch (error) {
    console.error("Privacy request error:", error);

    return jsonResponse(500, {
      message:
        "We could not send your privacy request. Please email privacy@ruzawi.com directly.",
    });
  }
}
