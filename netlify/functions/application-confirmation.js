import { Resend } from "resend";
import Busboy from "busboy";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const APPLICATION_BACKEND_ENDPOINT =
  process.env.APPLICATION_BACKEND_ENDPOINT ||
  "https://web09823.ruzawi.com/api/applications";

const LEGAL_NOTICE_VERSION = "2026-08-21";
const REQUIRED_DECLARATION_FIELDS = [
  "certify_complete",
  "no_outstanding_fees",
  "financial_ability",
  "headmaster_class_decision",
  "withdrawal_notice",
  "assessment_confidential",
  "guardian_authority_consent",
  "sensitive_data_consent",
  "international_transfer_consent",
  "third_party_authority",
  "privacy_notice_acknowledgement",
  "terms_acceptance",
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 25000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clean(value = "") {
  return String(value || "").trim();
}

function uniqueEmails(emails = []) {
  return [
    ...new Set(
      emails.map((email) => clean(email).toLowerCase()).filter(Boolean),
    ),
  ];
}

function getContentType(event) {
  return event.headers["content-type"] || event.headers["Content-Type"] || "";
}

function getBodyBuffer(event) {
  return event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64")
    : Buffer.from(event.body || "", "utf8");
}

function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = [];

    const contentType = getContentType(event);

    if (!contentType) {
      reject(new Error("Missing content-type header."));
      return;
    }

    const busboy = Busboy({
      headers: {
        "content-type": contentType,
      },
      limits: {
        fileSize: 12 * 1024 * 1024,
        files: 20,
      },
    });

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, file, info) => {
      const chunks = [];
      const { filename, mimeType } = info;

      file.on("data", (data) => {
        chunks.push(data);
      });

      file.on("limit", () => {
        reject(
          new Error(
            `The file "${filename || name}" is too large. Please upload a smaller file.`,
          ),
        );
      });

      file.on("end", () => {
        if (!filename) return;

        files.push({
          fieldName: name,
          filename,
          contentType: mimeType,
          sizeBytes: Buffer.concat(chunks).length,
          buffer: Buffer.concat(chunks),
        });
      });
    });

    busboy.on("error", reject);

    busboy.on("finish", () => {
      resolve({
        fields,
        files,
      });
    });

    busboy.end(getBodyBuffer(event));
  });
}

async function verifyRecaptcha(token, expectedAction = "") {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY.");
  }

  if (!token) {
    return {
      ok: false,
      reason: "Missing reCAPTCHA token.",
    };
  }

  const params = new URLSearchParams();
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
  params.append("response", token);

  let response;

  try {
    response = await fetchWithTimeout(
      RECAPTCHA_VERIFY_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      },
      10000,
    );
  } catch (error) {
    if (error.name === "AbortError") {
      return {
        ok: false,
        reason: "reCAPTCHA verification timed out. Please try again.",
      };
    }

    throw error;
  }

  const result = await response.json().catch(() => ({}));

  if (!result.success) {
    return {
      ok: false,
      reason: "reCAPTCHA verification failed.",
    };
  }

  if (expectedAction && result.action && result.action !== expectedAction) {
    return {
      ok: false,
      reason: "Invalid reCAPTCHA action.",
    };
  }

  if (typeof result.score === "number" && result.score < 0.5) {
    return {
      ok: false,
      reason: "reCAPTCHA score was too low.",
    };
  }

  return {
    ok: true,
  };
}

async function forwardApplicationToBackend(fields, files) {
  const outboundForm = new FormData();

  Object.entries(fields).forEach(([name, value]) => {
    if (name === "recaptchaToken" || name === "website") return;
    outboundForm.append(name, value);
  });

  files.forEach((file) => {
    outboundForm.append(
      file.fieldName,
      new Blob([file.buffer], {
        type: file.contentType || "application/octet-stream",
      }),
      file.filename,
    );
  });

  let response;

  try {
    response = await fetchWithTimeout(
      APPLICATION_BACKEND_ENDPOINT,
      {
        method: "POST",
        body: outboundForm,
      },
      25000,
    );
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "The application database took too long to respond. Please try again with smaller files.",
      );
    }

    throw error;
  }

  const text = await response.text();

  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    result = {
      message: text || "Backend returned a non-JSON response.",
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    result,
  };
}

function getApplicantName(fields = {}) {
  return [
    clean(fields.student_name),
    clean(fields.student_middlename),
    clean(fields.student_surname),
  ]
    .filter(Boolean)
    .join(" ");
}

function redactEmailAddresses(value = "") {
  return clean(value).replace(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
    "[email redacted]",
  );
}

function getBackendFailureReason(result = {}) {
  const message =
    redactEmailAddresses(result?.message) ||
    "The admissions database rejected the submission.";
  const missingFields = Array.isArray(result?.missing)
    ? result.missing.map((field) => clean(field)).filter(Boolean)
    : [clean(result?.missingField)].filter(Boolean);

  return missingFields.length
    ? `${message} Missing fields: ${missingFields.join(", ")}.`
    : message;
}

function buildConfirmationEmail(fields) {
  const applicantName = getApplicantName(fields) || "Applicant";
  const safeApplicantName = escapeHtml(applicantName);

  const text = `
Good day

Thank you very much, your application for ${applicantName} has been submitted successfully.

Assessments are the next stage in the process and will only happen if:
1. The application process is complete.
2. There are spaces available in both the classroom and dormitory for the specified year group.

NB: If there are no spaces available, your application will go on a waiting list. As this procedure is automated, a follow-up phone call is not necessary. You will be contacted if an assessment is required.

If the application is for Grade 1 or Grade 3, you will be invited to an Open Day, possibly followed by an assessment.

Grade 1 and Grade 3 assessments happen in the year before the requested year of entry.

Kind regards,
Ruzawi School
`.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #00582C;">Application Submission Successful</h2>
      <p>Good day</p>
      <p>Thank you very much, your application for <strong>${safeApplicantName}</strong> has been submitted successfully.</p>
      <p>Assessments are the next stage in the process and will only happen if:</p>
      <ol>
        <li>The application process is complete.</li>
        <li>There are spaces available in both the classroom and dormitory for the specified year group.</li>
      </ol>
      <p><strong>NB:</strong> If there are no spaces available, your application will go on a waiting list. As this procedure is automated, a follow-up phone call is not necessary. You will be contacted if an assessment is required.</p>
      <p>If the application is for Grade 1 or Grade 3, you will be invited to an Open Day, possibly followed by an assessment.</p>
      <p>Grade 1 and Grade 3 assessments happen in the year before the requested year of entry.</p>
      <p>Kind regards,<br />Ruzawi School</p>
    </div>
  `;

  return {
    applicantName,
    text,
    html,
  };
}

function buildAdminEmail(fields) {
  const applicantName = getApplicantName(fields) || "Applicant";
  const safeApplicantName = escapeHtml(applicantName);

  const text = `
New online application submitted

Applicant: ${applicantName}

The application was stored successfully. Sign in to the admissions database to review it.
`.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #00582C;">New Online Application Submitted</h2>
      <p><strong>Applicant:</strong> ${safeApplicantName}</p>
      <p>The application was stored successfully. Sign in to the admissions database to review it.</p>
    </div>
  `;

  return {
    text,
    html,
  };
}

function buildFailedApplicationAttemptEmail({
  applicantName = "Applicant",
  stage = "Submission processing",
  reason = "The submission could not be completed.",
}) {
  const submittedAt = new Date().toISOString();
  const displayApplicantName = clean(applicantName) || "Applicant";
  const safeApplicantName = escapeHtml(displayApplicantName);
  const safeReason = escapeHtml(redactEmailAddresses(reason));

  const text = `
Failed online application attempt

Applicant: ${displayApplicantName}
Submitted at: ${submittedAt}
Stage: ${stage}
Reason: ${redactEmailAddresses(reason)}

No other applicant information, uploaded-file information or database response is included in this email.
`.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #b42318;">Failed Online Application Attempt</h2>

      <p>
        A parent/guardian attempted to submit an online application, but the process failed.
      </p>

      <div style="background: #fff1f0; border: 1px solid #ffccc7; padding: 18px; border-radius: 14px; margin: 22px 0;">
        <p style="margin: 0 0 8px;"><strong>Applicant:</strong> ${safeApplicantName}</p>
        <p style="margin: 0 0 8px;"><strong>Submitted at:</strong> ${escapeHtml(submittedAt)}</p>
        <p style="margin: 0 0 8px;"><strong>Stage:</strong> ${escapeHtml(stage)}</p>
        <p style="margin: 0;"><strong>Reason:</strong> ${safeReason}</p>
      </div>
      <p>No other applicant information, uploaded-file information or database response is included in this email.</p>
    </div>
  `;

  return {
    text,
    html,
  };
}

async function sendFailedApplicationAttemptEmail({
  applicantName,
  stage,
  reason,
}) {
  const to =
    process.env.APPLICATION_FAILED_EMAIL || process.env.APPLICATION_ADMIN_EMAIL;

  if (!to) {
    console.error(
      "Failed application attempt could not be emailed because APPLICATION_FAILED_EMAIL or APPLICATION_ADMIN_EMAIL is not set.",
    );
    return;
  }

  const failedEmail = buildFailedApplicationAttemptEmail({
    applicantName,
    stage,
    reason,
  });

  const sendResult = await resend.emails.send({
    from:
      process.env.RESEND_FROM ||
      "Ruzawi Website <website@your-verified-domain.com>",
    to,
    replyTo: "registrar@ruzawi.com",
    subject: "Failed Online Application Attempt",
    text: failedEmail.text,
    html: failedEmail.html,
  });

  if (sendResult.error) {
    console.error("Failed application attempt email failed:", sendResult.error);
  }
}

export async function handler(event) {
  let parsedFields = {};

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, {
      message: "Method not allowed.",
    });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY.");
    }

    const { fields, files } = await parseMultipartForm(event);

    parsedFields = fields;

    const website = clean(fields.website);
    const recaptchaToken = clean(fields.recaptchaToken);

    /*
      Honeypot spam check.

      We intentionally do not email failed-attempt notifications for this,
      because bots may fill this field and could spam the school inbox.
    */
    if (website) {
      return jsonResponse(200, {
        message: "Application submitted.",
      });
    }

    const guardianEmails = uniqueEmails([
      fields.guardian1_email,
      fields.guardian2_email,
    ]);

    if (!guardianEmails.length) {
      return jsonResponse(400, {
        message: "Please provide at least one parent/guardian email address.",
      });
    }

    const requiredFields = [
      "student_name",
      "student_surname",
      "grade",
      "start_month",
      "start_year",
      "guardian1_email",
      "guardian1_name",
      "guardian1_title",
      "legal_custodian",
      "signature_date",
      "capacity_of_signatory",
    ];

    const missingField = requiredFields.find((fieldName) => {
      return !clean(fields[fieldName]);
    });

    if (missingField) {
      return jsonResponse(400, {
        message: "Please complete all required application fields.",
        missingField,
      });
    }

    const missingDeclaration = REQUIRED_DECLARATION_FIELDS.find((fieldName) => {
      return clean(fields[fieldName]) !== "1";
    });

    const consentRecordedAt = clean(fields.consent_recorded_at);
    const consentDateIsValid =
      consentRecordedAt && !Number.isNaN(Date.parse(consentRecordedAt));
    const noticeVersionIsValid =
      clean(fields.legal_notice_version) === LEGAL_NOTICE_VERSION;

    if (
      missingDeclaration ||
      !consentDateIsValid ||
      !noticeVersionIsValid
    ) {
      return jsonResponse(400, {
        message:
          "Please review and confirm every privacy, authority and terms declaration before submitting.",
      });
    }

    // The admissions API still requires these legacy fields. Keep the more
    // specific consent records above, then add the compatibility values only
    // after every declaration has been validated.
    fields.family_status_or_important_info =
      clean(fields.family_status_or_important_info) || "None";
    fields.privacy_consent = "1";
    fields.parent_authority_confirmed = "1";

    const recaptcha = await verifyRecaptcha(recaptchaToken);

    if (!recaptcha.ok) {
      return jsonResponse(400, {
        message: recaptcha.reason,
      });
    }

    fields.consent_received_at_server = new Date().toISOString();

    const backendResponse = await forwardApplicationToBackend(fields, files);

    if (!backendResponse.ok) {
      console.error("Application backend failed:", backendResponse.result);

      await sendFailedApplicationAttemptEmail({
        applicantName: getApplicantName(fields),
        stage: "Application database submission",
        reason: getBackendFailureReason(backendResponse.result),
      });

      return jsonResponse(backendResponse.status || 500, {
        message:
          backendResponse.result?.message ||
          "The application could not be submitted to the application database.",
        backend: backendResponse.result,
      });
    }

    const confirmationEmail = buildConfirmationEmail(fields);

    const guardianSendResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM ||
        "Ruzawi Website <website@your-verified-domain.com>",
      to: guardianEmails,
      replyTo: "registrar@ruzawi.com",
      subject: `Ruzawi School Application Submitted - ${confirmationEmail.applicantName}`,
      text: confirmationEmail.text,
      html: confirmationEmail.html,
    });

    if (guardianSendResult.error) {
      await sendFailedApplicationAttemptEmail({
        applicantName: getApplicantName(fields),
        stage: "Applicant confirmation email",
        reason: redactEmailAddresses(
          guardianSendResult.error.message ||
            "The confirmation email could not be delivered.",
        ),
      });

      throw new Error(
        guardianSendResult.error.message ||
          "Application was submitted, but the confirmation email could not be sent.",
      );
    }

    if (process.env.APPLICATION_ADMIN_EMAIL) {
      const adminEmail = buildAdminEmail(fields);

      const adminSendResult = await resend.emails.send({
        from:
          process.env.RESEND_FROM ||
          "Ruzawi Website <website@your-verified-domain.com>",
        to: process.env.APPLICATION_ADMIN_EMAIL,
        replyTo: "registrar@ruzawi.com",
        subject: `Online Application Submitted - ${confirmationEmail.applicantName}`,
        text: adminEmail.text,
        html: adminEmail.html,
      });

      if (adminSendResult.error) {
        console.error("Admin application email failed:", adminSendResult.error);
      }
    }

    return jsonResponse(200, {
      message: "Application submitted and confirmation email sent.",
      backend: backendResponse.result,
    });
  } catch (error) {
    console.error("Application confirmation error:", error);

    const message =
      error.name === "AbortError"
        ? "The application took too long to submit. Please try again with smaller files."
        : error.message || "There was a problem submitting the application.";

    /*
      Best-effort failed attempt email for unexpected errors.
      This will only send if we successfully parsed the form first.
    */
    const hasValidDeclarationRecord =
      REQUIRED_DECLARATION_FIELDS.every(
        (fieldName) => clean(parsedFields[fieldName]) === "1",
      ) && clean(parsedFields.legal_notice_version) === LEGAL_NOTICE_VERSION;

    if (Object.keys(parsedFields || {}).length && hasValidDeclarationRecord) {
      try {
        await sendFailedApplicationAttemptEmail({
          applicantName: getApplicantName(parsedFields),
          stage: "Application processing",
          reason: redactEmailAddresses(message),
        });
      } catch (emailError) {
        console.error(
          "Could not send failed application attempt email from catch block:",
          emailError,
        );
      }
    }

    return jsonResponse(500, {
      message,
    });
  }
}
