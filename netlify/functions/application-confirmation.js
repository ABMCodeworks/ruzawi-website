import { Resend } from "resend";
import Busboy from "busboy";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const APPLICATION_PARENT_MESSAGE =
  "After submitting this form, Grade 1 and Grade 3 applicants, being the intake years, will be contacted by the school prior to their assessment. Applications for other grades will be automatically entered into our database and placed on our waitlist. You will be contacted if an assessment opportunity arises.";

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
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

function parseMultipartForm(event) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = [];

    const contentType =
      event.headers["content-type"] || event.headers["Content-Type"];

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

      file.on("end", () => {
        if (!filename) return;

        files.push({
          fieldName: name,
          filename,
          contentType: mimeType,
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

    const bodyBuffer = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64")
      : Buffer.from(event.body || "", "utf8");

    busboy.end(bodyBuffer);
  });
}

async function verifyRecaptcha(token, expectedAction) {
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

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const result = await response.json();

  if (!result.success) {
    return {
      ok: false,
      reason: "reCAPTCHA verification failed.",
    };
  }

  if (result.action && result.action !== expectedAction) {
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

function getApplicationMessageByGrade(grade) {
  const normalisedGrade = clean(grade).toLowerCase();

  if (normalisedGrade === "grade 1" || normalisedGrade === "grade 3") {
    return "Grade 1 and Grade 3 are Ruzawi’s intake years. The school will contact you prior to your child’s assessment.";
  }

  return "Your child’s application has been automatically entered into our database and placed on our waitlist. You will be contacted if an assessment opportunity arises.";
}

function buildConfirmationEmail(fields) {
  const studentName = [
    clean(fields.student_name),
    clean(fields.student_middlename),
    clean(fields.student_surname),
  ]
    .filter(Boolean)
    .join(" ");

  const grade = clean(fields.grade) || "Not provided";
  const startMonth = clean(fields.start_month);
  const startYear = clean(fields.start_year);
  const requiredEntry = [startMonth, startYear].filter(Boolean).join(" ");

  const message =
    clean(fields.parentConfirmationMessage) ||
    getApplicationMessageByGrade(grade) ||
    APPLICATION_PARENT_MESSAGE;

  const safeStudentName = escapeHtml(studentName || "your child");
  const safeGrade = escapeHtml(grade);
  const safeRequiredEntry = escapeHtml(requiredEntry || "Not provided");
  const safeMessage = escapeHtml(message);

  const text = `
Dear Parent/Guardian,

Thank you for submitting an online application to Ruzawi School.

Application details:
Child: ${studentName || "Not provided"}
Grade applying for: ${grade}
Required entry: ${requiredEntry || "Not provided"}

${message}

Please contact registrar@ruzawi.com if you have any queries.

Kind regards,
Ruzawi School
`.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #00582C;">Ruzawi School Application Received</h2>

      <p>Dear Parent/Guardian,</p>

      <p>
        Thank you for submitting an online application to Ruzawi School.
      </p>

      <div style="background: #f6f1e7; padding: 18px; border-radius: 14px; margin: 22px 0;">
        <p style="margin: 0 0 8px;"><strong>Child:</strong> ${safeStudentName}</p>
        <p style="margin: 0 0 8px;"><strong>Grade applying for:</strong> ${safeGrade}</p>
        <p style="margin: 0;"><strong>Required entry:</strong> ${safeRequiredEntry}</p>
      </div>

      <p>${safeMessage}</p>

      <p>
        Please contact
        <a href="mailto:registrar@ruzawi.com" style="color: #00582C; font-weight: bold;">
          registrar@ruzawi.com
        </a>
        if you have any queries.
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

function buildAdminEmail(fields) {
  const studentName = [
    clean(fields.student_name),
    clean(fields.student_middlename),
    clean(fields.student_surname),
  ]
    .filter(Boolean)
    .join(" ");

  const safeStudentName = escapeHtml(studentName || "Not provided");
  const safeGrade = escapeHtml(fields.grade || "Not provided");
  const safeGuardian1 = escapeHtml(fields.guardian1_email || "Not provided");
  const safeGuardian2 = escapeHtml(fields.guardian2_email || "Not provided");
  const safeStart = escapeHtml(
    [fields.start_month, fields.start_year].filter(Boolean).join(" ") ||
      "Not provided",
  );

  const text = `
New online application confirmation submitted

Child: ${studentName || "Not provided"}
Grade: ${fields.grade || "Not provided"}
Required entry: ${
    [fields.start_month, fields.start_year].filter(Boolean).join(" ") ||
    "Not provided"
  }

Guardian 1 Email: ${fields.guardian1_email || "Not provided"}
Guardian 2 Email: ${fields.guardian2_email || "Not provided"}
`.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
      <h2 style="color: #00582C;">New Online Application Confirmation</h2>

      <p><strong>Child:</strong> ${safeStudentName}</p>
      <p><strong>Grade:</strong> ${safeGrade}</p>
      <p><strong>Required entry:</strong> ${safeStart}</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

      <p><strong>Guardian 1 Email:</strong> ${safeGuardian1}</p>
      <p><strong>Guardian 2 Email:</strong> ${safeGuardian2}</p>
    </div>
  `;

  return {
    text,
    html,
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(200, {
      message: "OK",
    });
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

    const { fields } = await parseMultipartForm(event);

    const website = clean(fields.website);
    const recaptchaToken = clean(fields.recaptchaToken);

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
    ];

    const missingField = requiredFields.find((fieldName) => {
      return !clean(fields[fieldName]);
    });

    if (missingField) {
      return jsonResponse(400, {
        message: "Please complete all required application fields.",
      });
    }

    const recaptcha = await verifyRecaptcha(
      recaptchaToken,
      "online_application",
    );

    if (!recaptcha.ok) {
      return jsonResponse(400, {
        message: recaptcha.reason,
      });
    }

    const confirmationEmail = buildConfirmationEmail(fields);

    const guardianSendResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM ||
        "Ruzawi Website <website@your-verified-domain.com>",
      to: guardianEmails,
      replyTo: "registrar@ruzawi.com",
      subject: `Ruzawi School Application Received - ${
        confirmationEmail.studentName || confirmationEmail.grade
      }`,
      text: confirmationEmail.text,
      html: confirmationEmail.html,
    });

    if (guardianSendResult.error) {
      throw new Error(
        guardianSendResult.error.message ||
          "Could not send confirmation email.",
      );
    }

    if (process.env.APPLICATION_ADMIN_EMAIL) {
      const adminEmail = buildAdminEmail(fields);

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
      message: "Application confirmation email sent.",
    });
  } catch (error) {
    console.error("Application confirmation error:", error);

    return jsonResponse(500, {
      message:
        error.message ||
        "There was a problem sending the application confirmation email.",
    });
  }
}
