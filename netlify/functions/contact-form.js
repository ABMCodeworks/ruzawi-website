import { Resend } from "resend";
import Busboy from "busboy";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const ENQUIRY_DESTINATIONS = {
  general: "administrator@ruzawi.com",
  other: "administrator@ruzawi.com",
  admissions: "marketing@ruzawi.com",
  "job-application": "jobs@ruzawi.com",
};

const ENQUIRY_LABELS = {
  general: "General Enquiry",
  other: "Other",
  admissions: "Admissions",
  "job-application": "Job Application",
};

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
        fileSize: 5 * 1024 * 1024,
        files: 1,
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
        reject(new Error("CV file is too large. Maximum file size is 5MB."));
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

    const { fields, files } = await parseMultipartForm(event);

    const firstName = clean(fields.firstName);
    const lastName = clean(fields.lastName);
    const email = clean(fields.email);
    const phone = clean(fields.phone);
    const enquiryType = clean(fields.enquiryType);
    const message = clean(fields.message);
    const website = clean(fields.website);
    const recaptchaToken = clean(fields.recaptchaToken);

    if (website) {
      return jsonResponse(200, {
        message: "Message sent.",
      });
    }

    if (!firstName || !lastName || !email || !enquiryType || !message) {
      return jsonResponse(400, {
        message: "Please complete all required fields.",
      });
    }

    const toEmail = ENQUIRY_DESTINATIONS[enquiryType];

    if (!toEmail) {
      return jsonResponse(400, {
        message: "Please select a valid enquiry type.",
      });
    }

    const recaptcha = await verifyRecaptcha(recaptchaToken, "contact_form");

    if (!recaptcha.ok) {
      return jsonResponse(400, {
        message: recaptcha.reason,
      });
    }

    const enquiryLabel = ENQUIRY_LABELS[enquiryType] || "Website Enquiry";

    let attachments = [];

    if (enquiryType === "job-application") {
      const cvFile = files.find((file) => file.fieldName === "cv");

      if (!cvFile) {
        return jsonResponse(400, {
          message: "Please attach your CV for job applications.",
        });
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(cvFile.contentType)) {
        return jsonResponse(400, {
          message: "Please upload your CV as a PDF, DOC or DOCX file.",
        });
      }

      attachments = [
        {
          filename: cvFile.filename,
          content: cvFile.buffer,
        },
      ];
    }

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeEnquiryLabel = escapeHtml(enquiryLabel);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const text = `
New Ruzawi website enquiry

Enquiry Type: ${enquiryLabel}

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}
`.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #10251c;">
        <h2 style="color: #00582C;">New Ruzawi website enquiry</h2>

        <p><strong>Enquiry Type:</strong> ${safeEnquiryLabel}</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

        <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />

        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `;

    await resend.emails.send({
      from:
        process.env.RESEND_FROM ||
        "Ruzawi Website <website@your-verified-domain.com>",
      to: toEmail,
      replyTo: email,
      subject: `Ruzawi ${enquiryLabel}: ${firstName} ${lastName}`,
      text,
      html,
      attachments,
    });

    return jsonResponse(200, {
      message: "Message sent.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return jsonResponse(500, {
      message: error.message || "There was a problem sending the message.",
    });
  }
}
