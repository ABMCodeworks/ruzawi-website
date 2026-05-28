import { Resend } from "resend";
import Busboy from "busboy";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const APPLICATION_BACKEND_ENDPOINT =
  process.env.APPLICATION_BACKEND_ENDPOINT ||
  "https://web09823.ruzawi.com/api/applications";

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
  const seen = new Set();

  return emails
    .map((email) => clean(email).toLowerCase())
    .filter((email) => {
      if (!email) return false;
      if (seen.has(email)) return false;

      seen.add(email);
      return true;
    });
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

async function forwardApplicationToBackend(event) {
  const contentType = getContentType(event);
  const bodyBuffer = getBodyBuffer(event);

  if (!contentType) {
    throw new Error("Missing content-type header.");
  }

  let response;

  try {
    response = await fetchWithTimeout(
      APPLICATION_BACKEND_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": contentType,
        },
        body: bodyBuffer,
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

function getStudentName(fields = {}) {
  return [
    clean(fields.student_name),
    clean(fields.student_middlename),
    clean(fields.student_surname),
  ]
    .filter(Boolean)
    .join(" ");
}

function getRequiredEntry(fields = {}) {
  return [clean(fields.start_month), clean(fields.start_year)]
    .filter(Boolean)
    .join(" ");
}

function buildConfirmationEmail(fields) {
  const studentName = getStudentName(fields);
  const grade = clean(fields.grade) || "Not provided";
  const requiredEntry = getRequiredEntry(fields);

  const safeStudentName = escapeHtml(studentName || "your child");
  const safeGrade = escapeHtml(grade);
  const safeRequiredEntry = escapeHtml(requiredEntry || "Not provided");

  const text = `
Good day

Thank you very much, your application submission has been successful.

Application details:
Child: ${studentName || "Not provided"}
Grade applying for: ${grade}
Required entry: ${requiredEntry || "Not provided"}

Assessments are the next stage in the process and will only happen if:
1) The application process is complete.
2) There are spaces available both in the classroom and dormitory for the specified year group.

NB: If there are no spaces available, your application will go on a waiting list. As this procedure is automated, a follow-up phone call is not necessary. You will be contacted if an assessment is required at any stage.

If this application is for our natural intake years of Grade 1 and Grade 3, you will be invited to an Open Day, possibly followed by an assessment.

Assessments for Grade 1 and Grade 3 happen in the year prior to the year that you have applied for.

Kind regards,
Ruzawi School
`.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #00582C;">Ruzawi School Application Submission Successful</h2>

      <p>Good day</p>

      <p>
        Thank you very much, your application submission has been successful.
      </p>

      <div style="background: #f6f1e7; padding: 18px; border-radius: 14px; margin: 22px 0;">
        <p style="margin: 0 0 8px;"><strong>Child:</strong> ${safeStudentName}</p>
        <p style="margin: 0 0 8px;"><strong>Grade applying for:</strong> ${safeGrade}</p>
        <p style="margin: 0;"><strong>Required entry:</strong> ${safeRequiredEntry}</p>
      </div>

      <p>
        Assessments are the next stage in the process and will only happen if:
      </p>

      <ol>
        <li>The application process is complete.</li>
        <li>There are spaces available both in the classroom and dormitory for the specified year group.</li>
      </ol>

      <p>
        <strong>NB:</strong> If there are no spaces available, your application will go on a waiting list.
        As this procedure is automated, a follow-up phone call is not necessary.
        You will be contacted if an assessment is required at any stage.
      </p>

      <p>
        If this application is for our natural intake years of <strong>Grade 1 and Grade 3</strong>,
        you will be invited to an Open Day, possibly followed by an assessment.
      </p>

      <p>
        Assessments for Grade 1 and Grade 3 happen in the year prior to the year that you have applied for.
      </p>

      <p>Kind regards,<br />Ruzawi School</p>
    </div>
  `;

  return {
    studentName,
    grade,
    text,
    html,
  };
}

function buildAdminEmail(fields, backendResult) {
  const studentName = getStudentName(fields);
  const requiredEntry = getRequiredEntry(fields);

  const safeStudentName = escapeHtml(studentName || "Not provided");
  const safeGrade = escapeHtml(fields.grade || "Not provided");
  const safeGuardian1 = escapeHtml(fields.guardian1_email || "Not provided");
  const safeGuardian2 = escapeHtml(fields.guardian2_email || "Not provided");
  const safeStart = escapeHtml(requiredEntry || "Not provided");
  const safeBackendMessage = escapeHtml(
    backendResult?.message || "Application submitted to backend successfully.",
  );

  const text = `
New online application submitted

Child: ${studentName || "Not provided"}
Grade: ${fields.grade || "Not provided"}
Required entry: ${requiredEntry || "Not provided"}

Guardian 1 Email: ${fields.guardian1_email || "Not provided"}
Guardian 2 Email: ${fields.guardian2_email || "Not provided"}

Backend result:
${backendResult?.message || "Application submitted to backend successfully."}
`.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #00582C;">New Online Application Submitted</h2>

      <p><strong>Child:</strong> ${safeStudentName}</p>
      <p><strong>Grade:</strong> ${safeGrade}</p>
      <p><strong>Required entry:</strong> ${safeStart}</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

      <p><strong>Guardian 1 Email:</strong> ${safeGuardian1}</p>
      <p><strong>Guardian 2 Email:</strong> ${safeGuardian2}</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

      <p><strong>Backend result:</strong> ${safeBackendMessage}</p>
    </div>
  `;

  return {
    text,
    html,
  };
}

function buildFailedApplicationAttemptEmail({
  fields = {},
  files = [],
  reason = "Unknown error.",
  backend = null,
}) {
  const studentName = getStudentName(fields);
  const requiredEntry = getRequiredEntry(fields);

  const guardianEmails = uniqueEmails([
    fields.guardian1_email,
    fields.guardian2_email,
  ]);

  const submittedAt = new Date().toISOString();

  const fileSummary = files.length
    ? files
        .map((file) => {
          const sizeMb = file.sizeBytes
            ? `${(file.sizeBytes / 1024 / 1024).toFixed(2)} MB`
            : "Unknown size";

          return `${file.fieldName}: ${file.filename} (${file.contentType || "unknown type"}, ${sizeMb})`;
        })
        .join("\n")
    : "No files received or files could not be read.";

  const backendSummary = backend
    ? JSON.stringify(backend, null, 2)
    : "No backend response available.";

  const text = `
Failed online application attempt

Submitted at: ${submittedAt}

Failure reason:
${reason}

Child: ${studentName || "Not provided"}
Grade: ${fields.grade || "Not provided"}
Required entry: ${requiredEntry || "Not provided"}

Guardian 1 Name: ${fields.guardian1_name || "Not provided"}
Guardian 1 Email: ${fields.guardian1_email || "Not provided"}
Guardian 1 Phone: ${fields.guardian1_phone || "Not provided"}

Guardian 2 Name: ${fields.guardian2_name || "Not provided"}
Guardian 2 Email: ${fields.guardian2_email || "Not provided"}
Guardian 2 Phone: ${fields.guardian2_phone || "Not provided"}

Parent/guardian emails detected:
${guardianEmails.length ? guardianEmails.join(", ") : "None"}

Files received:
${fileSummary}

Backend response:
${backendSummary}
`.trim();

  const htmlFiles = files.length
    ? files
        .map((file) => {
          const sizeMb = file.sizeBytes
            ? `${(file.sizeBytes / 1024 / 1024).toFixed(2)} MB`
            : "Unknown size";

          return `
            <li>
              <strong>${escapeHtml(file.fieldName)}:</strong>
              ${escapeHtml(file.filename)}
              <br />
              <span style="color: #666;">
                ${escapeHtml(file.contentType || "unknown type")} — ${escapeHtml(sizeMb)}
              </span>
            </li>
          `;
        })
        .join("")
    : "<li>No files received or files could not be read.</li>";

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #b42318;">Failed Online Application Attempt</h2>

      <p>
        A parent/guardian attempted to submit an online application, but the process failed.
      </p>

      <div style="background: #fff1f0; border: 1px solid #ffccc7; padding: 18px; border-radius: 14px; margin: 22px 0;">
        <p style="margin: 0 0 8px;"><strong>Submitted at:</strong> ${escapeHtml(submittedAt)}</p>
        <p style="margin: 0;"><strong>Failure reason:</strong> ${escapeHtml(reason)}</p>
      </div>

      <h3 style="color: #00582C;">Application details</h3>

      <p><strong>Child:</strong> ${escapeHtml(studentName || "Not provided")}</p>
      <p><strong>Grade:</strong> ${escapeHtml(fields.grade || "Not provided")}</p>
      <p><strong>Required entry:</strong> ${escapeHtml(requiredEntry || "Not provided")}</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

      <h3 style="color: #00582C;">Parent/guardian details</h3>

      <p><strong>Guardian 1 Name:</strong> ${escapeHtml(fields.guardian1_name || "Not provided")}</p>
      <p><strong>Guardian 1 Email:</strong> ${escapeHtml(fields.guardian1_email || "Not provided")}</p>
      <p><strong>Guardian 1 Phone:</strong> ${escapeHtml(fields.guardian1_phone || "Not provided")}</p>

      <p><strong>Guardian 2 Name:</strong> ${escapeHtml(fields.guardian2_name || "Not provided")}</p>
      <p><strong>Guardian 2 Email:</strong> ${escapeHtml(fields.guardian2_email || "Not provided")}</p>
      <p><strong>Guardian 2 Phone:</strong> ${escapeHtml(fields.guardian2_phone || "Not provided")}</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

      <h3 style="color: #00582C;">Files received</h3>
      <ul>
        ${htmlFiles}
      </ul>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

      <h3 style="color: #00582C;">Backend response</h3>

      <pre style="white-space: pre-wrap; background: #f6f1e7; padding: 14px; border-radius: 10px; font-size: 13px;">${escapeHtml(
        backendSummary,
      )}</pre>
    </div>
  `;

  return {
    studentName,
    grade: clean(fields.grade),
    guardianEmails,
    text,
    html,
  };
}

async function sendFailedApplicationAttemptEmail({
  fields = {},
  files = [],
  reason = "Unknown error.",
  backend = null,
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
    fields,
    files,
    reason,
    backend,
  });

  const subjectName =
    failedEmail.studentName || failedEmail.grade || "Unknown applicant";

  const sendResult = await resend.emails.send({
    from:
      process.env.RESEND_FROM ||
      "Ruzawi Website <website@your-verified-domain.com>",
    to,
    replyTo: failedEmail.guardianEmails[0] || "registrar@ruzawi.com",
    subject: `Failed Online Application Attempt - ${subjectName}`,
    text: failedEmail.text,
    html: failedEmail.html,
  });

  if (sendResult.error) {
    console.error("Failed application attempt email failed:", sendResult.error);
  }
}

export async function handler(event) {
  let parsedFields = {};
  let parsedFiles = [];

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
    parsedFiles = files;

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
      await sendFailedApplicationAttemptEmail({
        fields,
        files,
        reason: "No parent/guardian email address was provided.",
      });

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
      "guardian2_email",
      "guardian2_name",
      "guardian2_title",
      "legal_custodian",
      "signature_date",
      "capacity_of_signatory",
    ];

    const missingField = requiredFields.find((fieldName) => {
      return !clean(fields[fieldName]);
    });

    if (missingField) {
      await sendFailedApplicationAttemptEmail({
        fields,
        files,
        reason: `Missing required field: ${missingField}`,
      });

      return jsonResponse(400, {
        message: "Please complete all required application fields.",
        missingField,
      });
    }

    const recaptcha = await verifyRecaptcha(recaptchaToken);

    if (!recaptcha.ok) {
      await sendFailedApplicationAttemptEmail({
        fields,
        files,
        reason: recaptcha.reason,
      });

      return jsonResponse(400, {
        message: recaptcha.reason,
      });
    }

    const backendResponse = await forwardApplicationToBackend(event);

    if (!backendResponse.ok) {
      console.error("Application backend failed:", backendResponse.result);

      await sendFailedApplicationAttemptEmail({
        fields,
        files,
        reason:
          backendResponse.result?.message ||
          "The application could not be submitted to the application database.",
        backend: backendResponse.result,
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
      subject: `Ruzawi School Application Submission Successful - ${
        confirmationEmail.studentName || confirmationEmail.grade
      }`,
      text: confirmationEmail.text,
      html: confirmationEmail.html,
    });

    if (guardianSendResult.error) {
      await sendFailedApplicationAttemptEmail({
        fields,
        files,
        reason:
          guardianSendResult.error.message ||
          "Application was submitted to the backend, but the confirmation email could not be sent.",
        backend: backendResponse.result,
      });

      throw new Error(
        guardianSendResult.error.message ||
          "Application was submitted, but the confirmation email could not be sent.",
      );
    }

    if (process.env.APPLICATION_ADMIN_EMAIL) {
      const adminEmail = buildAdminEmail(fields, backendResponse.result);

      const adminSendResult = await resend.emails.send({
        from:
          process.env.RESEND_FROM ||
          "Ruzawi Website <website@your-verified-domain.com>",
        to: process.env.APPLICATION_ADMIN_EMAIL,
        replyTo: guardianEmails[0],
        subject: `Online Application Submitted - ${
          confirmationEmail.studentName || confirmationEmail.grade
        }`,
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
    if (Object.keys(parsedFields || {}).length) {
      try {
        await sendFailedApplicationAttemptEmail({
          fields: parsedFields,
          files: parsedFiles,
          reason: message,
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
