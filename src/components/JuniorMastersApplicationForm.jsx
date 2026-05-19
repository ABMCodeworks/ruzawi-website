import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const MAX_FILES = 2;
const MAX_FILE_SIZE_MB = 8;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function JuniorMastersApplicationForm() {
  const recaptchaRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []).slice(
      0,
      MAX_FILES,
    );

    const oversizedFile = selectedFiles.find(
      (file) => file.size > MAX_FILE_SIZE_BYTES,
    );

    if (oversizedFile) {
      setStatus({
        type: "error",
        message: `Each file must be smaller than ${MAX_FILE_SIZE_MB}MB.`,
      });

      event.target.value = "";
      setFiles([]);
      return;
    }

    setStatus({
      type: "",
      message: "",
    });

    setFiles(selectedFiles);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || "").trim();

    if (!firstName || !lastName || !email || !message || files.length === 0) {
      setStatus({
        type: "error",
        message: "Please complete all required fields and upload your CV.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      setStatus({
        type: "",
        message: "",
      });

      if (!RECAPTCHA_SITE_KEY) {
        throw new Error("Missing VITE_RECAPTCHA_SITE_KEY.");
      }

      const recaptchaToken = recaptchaRef.current?.getValue();

      if (!recaptchaToken) {
        throw new Error("Please complete the reCAPTCHA checkbox.");
      }

      const submitData = new FormData();
      submitData.append("firstName", firstName);
      submitData.append("lastName", lastName);
      submitData.append("email", email);
      submitData.append("message", message);
      submitData.append("website", website);
      submitData.append("recaptchaToken", recaptchaToken);

      files.forEach((file) => {
        submitData.append("cv", file);
      });

      const response = await fetch("/.netlify/functions/junior-masters-form", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Could not submit your application.");
      }

      setStatus({
        type: "success",
        message: "Thank you. Your application has been submitted successfully.",
      });

      setFiles([]);
      form.reset();
      recaptchaRef.current?.reset();
    } catch (error) {
      recaptchaRef.current?.reset();

      setStatus({
        type: "error",
        message:
          error.message ||
          "There was a problem submitting your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="px-6 pb-20 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        {status.message && (
          <div
            className={`mb-8 rounded-[2rem] p-6 text-lg font-semibold shadow-sm ring-1 ring-black/5 ${
              status.type === "success"
                ? "bg-[#00582C] text-white"
                : "bg-red-50 text-red-800"
            }`}
          >
            {status.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10"
        >
          <input
            type="text"
            name="website"
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                First Name *
              </label>

              <input
                required
                name="firstName"
                type="text"
                placeholder="First"
                className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                Last Name *
              </label>

              <input
                required
                name="lastName"
                type="text"
                placeholder="Last"
                className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
              Email *
            </label>

            <input
              required
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
              Comment or Message *
            </label>

            <textarea
              required
              name="message"
              rows="7"
              placeholder="Write your message here"
              className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
              CV *
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-[#47778D]/40 bg-[#f6f1e7] px-6 py-10 text-center transition hover:border-[#00582C] hover:bg-[#B6D7E7]/25">
              <input
                required
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <span className="font-serif text-2xl font-semibold text-[#00582C]">
                Drag & Drop Files
              </span>

              <span className="mt-2 text-[#35443a]">
                Choose files to upload. You can upload up to {MAX_FILES} files.
              </span>

              <span className="mt-2 text-sm text-[#35443a]/80">
                Accepted formats: PDF, DOC and DOCX. Maximum {MAX_FILE_SIZE_MB}
                MB per file.
              </span>

              <span className="mt-4 rounded-full bg-[#00582C] px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-white">
                Choose Files
              </span>
            </label>

            {files.length > 0 && (
              <div className="mt-4 rounded-2xl bg-[#f6f1e7] p-4 ring-1 ring-black/5">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-[#47778D]">
                  Selected files
                </p>

                <ul className="space-y-1 text-[#35443a]">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}`}>
                      {file.name}{" "}
                      <span className="text-sm text-[#35443a]/70">
                        ({(file.size / 1024 / 1024).toFixed(2)}MB)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />

            <p className="text-sm leading-6 text-[#35443a]">
              Please complete the reCAPTCHA checkbox before submitting.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
}
