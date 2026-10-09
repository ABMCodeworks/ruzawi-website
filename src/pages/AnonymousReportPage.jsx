import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const MAX_LENGTH = 10000;

export default function AnonymousReportPage() {
  const captchaRef = useRef(null);
  const reportRef = useRef(null);
  const statusRef = useRef(null);
  const submittingRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const report = String(fields.get("report") || "").trim();
    if (!report) {
      reportRef.current.setCustomValidity("Please enter your report.");
      reportRef.current.reportValidity();
      return;
    }

    const recaptchaToken = captchaRef.current?.getValue();
    if (!recaptchaToken) {
      setStatus({ type: "error", message: "Please complete the CAPTCHA before submitting." });
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setStatus(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("/.netlify/functions/anon-report", {
        method: "POST",
        credentials: "omit",
        referrerPolicy: "no-referrer",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report, recaptchaToken, website: fields.get("website") || "" }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || "Your report could not be sent. Please try again.");
      }
      form.reset();
      setStatus({
        type: "success",
        message: "Thank you. Your anonymous report has been sent to the school. We cannot reply directly because no contact details are collected.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.name === "AbortError"
          ? "We could not confirm delivery. Your report is still in the form. Please try again later; retrying may send a duplicate."
          : error.message || "Your report could not be sent. Please try again.",
      });
    } finally {
      window.clearTimeout(timeout);
      captchaRef.current?.reset();
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-10 text-[#10251c] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center gap-4">
          <img src="/images/ruzawi-logo.webp" alt="Ruzawi School" className="h-20 w-auto" />
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#00582C]">Ruzawi School</p>
        </header>

        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#47778D]">Share a concern</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-[#00582C] sm:text-5xl">Anonymous report</h1>
          <p className="mt-5 text-lg leading-8 text-[#35443a]">
            Use this form to report a concern or share information with the school.
            You do not need to give your name, email address or phone number.
          </p>

          <div id="privacy-note" className="mt-6 rounded-2xl bg-[#B6D7E7]/30 p-5 text-sm leading-7 text-[#35443a]">
            <p>Only what you write in your report is sent to the school. Avoid including details that identify you if you wish to remain anonymous.</p>
          </div>

          <form onSubmit={handleSubmit} autoComplete="off" className="mt-8 space-y-6">
            <div hidden aria-hidden="true">
              <label>Leave this blank<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <label className="block">
              <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">Your report *</span>
              <textarea
                ref={reportRef}
                name="report"
                required
                maxLength={MAX_LENGTH}
                rows={9}
                disabled={submitting}
                aria-describedby="report-help privacy-note"
                onInput={(event) => event.currentTarget.setCustomValidity("")}
                className="w-full rounded-2xl border border-black/15 bg-[#f6f1e7]/50 px-4 py-4 outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
              />
            </label>
            <p id="report-help" className="text-sm leading-6 text-[#35443a]">Include what happened, when and where, and any details that would help the school understand. Maximum 10,000 characters.</p>

            {SITE_KEY ? (
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={SITE_KEY}
                size="compact"
                onExpired={() => setStatus({ type: "error", message: "The CAPTCHA expired. Please complete it again." })}
                onErrored={() => setStatus({ type: "error", message: "The CAPTCHA could not load. Please check your connection and try again." })}
              />
            ) : (
              <p role="alert" className="text-red-800">Reporting is temporarily unavailable. Please try again later.</p>
            )}

            {status && (
              <div
                ref={statusRef}
                tabIndex={-1}
                role={status.type === "error" ? "alert" : "status"}
                className={`rounded-2xl p-5 leading-7 ${status.type === "error" ? "bg-red-50 text-red-800" : "bg-[#00582C] text-white"}`}
              >{status.message}</div>
            )}

            <button type="submit" disabled={submitting || !SITE_KEY} className="rounded-full bg-[#00582C] px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#47778D] disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Sending report…" : "Send anonymous report"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
