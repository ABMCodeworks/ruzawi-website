import { Resend } from "resend";
import multipart from "parse-multipart-data";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MAX_FILES = 2;
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

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

function getHeaderValue(headers, name) {
  const foundKey = Object.keys(headers || {}).find(
    (key) => key.toLowerCase() === name.toLowerCase(),
  );

  return foundKey ? headers[foundKey] : "";
}

function parseMultipartEvent(event) {
  const contentType = getHeaderValue(event.headers, "content-type");
  const boundary = multipart.getBoundary(contentType);

  if (!boundary) {
    throw new Error("Missing multipart boundary.");
  }

  const bodyBuffer = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64")
    : Buffer.from(event.body || "");

  return multipart.parse(bodyBuffer, boundary);
}

function getField(parts, name) {
  const part = parts.find((item) => item.name === name && !item.filename);

  if (!part) return "";

  return String(part.data || "").trim();
}

function getFiles(parts, name) {
  return parts.filter((item) => item.name === name && item.filename);
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

    const parts = parseMultipartEvent(event);

    const firstName = getField(parts, "firstName");
    const lastName = getField(parts, "lastName");
    const email = getField(parts, "email");
    const message = getField(parts, "message");
    const website = getField(parts, "website");
    const recaptchaToken = getField(parts, "recaptchaToken");
    const files = getFiles(parts, "cv");

    if (website) {
      return jsonResponse(200, {
        message: "Application submitted.",
      });
    }

    if (!firstName || !lastName || !email || !message) {
      return jsonResponse(400, {
        message: "Please complete all required fields.",
      });
    }

    if (!files.length) {
      return jsonResponse(400, {
        message: "Please upload your CV.",
      });
    }

    if (files.length > MAX_FILES) {
      return jsonResponse(400, {
        message: `You can upload up to ${MAX_FILES} files.`,
      });
    }

    for (const file of files) {
      if (file.data.length > MAX_FILE_SIZE_BYTES) {
        return jsonResponse(400, {
          message: "Each file must be smaller than 8MB.",
        });
      }

      if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
        return jsonResponse(400, {
          message: "Only PDF, DOC and DOCX files are allowed.",
        });
      }
    }

    const recaptcha = await verifyRecaptcha(
      recaptchaToken,
      "junior_master_form",
    );

    if (!recaptcha.ok) {
      return jsonResponse(400, {
        message: recaptcha.reason,
      });
    }

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const text = `
New Junior Master or Mistress application

Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}

Attached files:
${files.map((file) => `- ${file.filename}`).join("\n")}
`.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
        <h2 style="color: #00582C;">New Junior Master or Mistress application</h2>

        <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

        <p><strong>Attached files:</strong></p>
        <ul>
          ${files.map((file) => `<li>${escapeHtml(file.filename)}</li>`).join("")}
        </ul>
      </div>
    `;

    await resend.emails.send({
      from:
        process.env.RESEND_FROM ||
        "Ruzawi Website <website@your-verified-domain.com>",
      to: process.env.JM_TO_EMAIL || "vengsmash@ruzawi.com",
      replyTo: email,
      subject: `Junior Master/Mistress Application: ${firstName} ${lastName}`,
      text,
      html,
      attachments: files.map((file) => ({
        filename: file.filename,
        content: file.data,
      })),
    });

    return jsonResponse(200, {
      message: "Application submitted.",
    });
  } catch (error) {
    console.error("Junior Masters form error:", error);

    return jsonResponse(500, {
      message: "There was a problem submitting the application.",
    });
  }
}
