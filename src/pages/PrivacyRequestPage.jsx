import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const PRIVACY_NOTICE_VERSION = "2026-08-21";
const PRIVACY_REQUEST_ENDPOINT = "/.netlify/functions/privacy-request";

const requestTypes = [
  {
    name: "request_information",
    title: "Understand how information is used",
    description: "Ask what information is used for and who receives it.",
  },
  {
    name: "request_access",
    title: "Access or obtain a copy",
    description: "Ask whether Ruzawi holds your information and request access.",
  },
  {
    name: "request_correction",
    title: "Correct information",
    description: "Correct information that is false, misleading or outdated.",
  },
  {
    name: "request_deletion",
    title: "Request deletion or erasure",
    description:
      "Ask for false or misleading information to be deleted, or explain why other information should no longer be retained.",
  },
  {
    name: "request_objection",
    title: "Object to processing",
    description: "Object to all or part of the processing of personal information.",
  },
  {
    name: "request_withdraw_consent",
    title: "Withdraw consent",
    description: "Withdraw consent previously given for a stated activity.",
  },
  {
    name: "request_stop_marketing",
    title: "Stop direct marketing",
    description: "Object to direct marketing and request that it stops.",
  },
  {
    name: "request_complaint",
    title: "Raise a privacy concern",
    description: "Report a privacy concern, suspected misuse or unresolved request.",
  },
  {
    name: "request_other",
    title: "Other privacy request",
    description: "Submit another request concerning personal information.",
  },
];

function TextInput({ label, name, type = "text", required = false, helper = "" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
        {label} {required && "*"}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={type === "email" ? 254 : 150}
        className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
      />
      {helper && <p className="mt-2 text-sm leading-6 text-[#35443a]">{helper}</p>}
    </label>
  );
}

function SelectInput({ label, name, required = false, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
        {label} {required && "*"}
      </span>
      <select
        name={name}
        required={required}
        className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
      >
        {children}
      </select>
    </label>
  );
}

function RequiredConfirmation({ name, children }) {
  return (
    <label className="flex gap-3 rounded-2xl bg-white p-5 text-[#35443a] ring-1 ring-black/5">
      <input
        type="checkbox"
        name={name}
        required
        className="mt-1 h-5 w-5 shrink-0 accent-[#00582C]"
      />
      <span className="leading-7">{children}</span>
    </label>
  );
}

export default function PrivacyRequestPage() {
  const recaptchaRef = useRef(null);
  const [actingFor, setActingFor] = useState("self");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "", reference: "" });

  const isRepresentingSomeone = actingFor !== "self";

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedRequestCount = requestTypes.filter(({ name }) =>
      formData.has(name),
    ).length;

    if (!selectedRequestCount) {
      setStatus({
        type: "error",
        message: "Please choose at least one request type.",
        reference: "",
      });
      return;
    }

    if (
      isRepresentingSomeone &&
      (!String(formData.get("data_subject_name") || "").trim() ||
        !String(formData.get("relationship") || "").trim())
    ) {
      setStatus({
        type: "error",
        message:
          "Please name the person whose information is involved and explain your relationship or authority.",
        reference: "",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: "", message: "", reference: "" });

      if (!RECAPTCHA_SITE_KEY) {
        throw new Error("Missing VITE_RECAPTCHA_SITE_KEY.");
      }

      const recaptchaToken = recaptchaRef.current?.getValue();

      if (!recaptchaToken) {
        throw new Error("Please complete the reCAPTCHA checkbox.");
      }

      requestTypes.forEach(({ name }) => {
        if (formData.has(name)) formData.set(name, "1");
      });
      formData.set("authority_confirmed", "1");
      formData.set("privacy_acknowledged", "1");
      formData.set("notice_version", PRIVACY_NOTICE_VERSION);
      formData.set("recaptchaToken", recaptchaToken);

      const response = await fetch(PRIVACY_REQUEST_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Your request could not be sent.");
      }

      form.reset();
      setActingFor("self");
      recaptchaRef.current?.reset();
      setStatus({
        type: "success",
        message: result.confirmationSent
          ? "Your privacy request has been sent to privacy@ruzawi.com. A confirmation email has been sent to you."
          : "Your privacy request has been sent to privacy@ruzawi.com. Please keep the reference shown below; the confirmation email could not be delivered.",
        reference: result.reference || "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      recaptchaRef.current?.reset();
      setStatus({
        type: "error",
        message:
          error.message ||
          "We could not send your request. Please email privacy@ruzawi.com directly.",
        reference: "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Exercise Your Privacy Rights"
        description="Submit a request to access, correct, delete or object to the processing of personal information held by Ruzawi School."
        path="/privacy-request"
        image="/images/seo-cover.webp"
      />

      <TopBar />

      <main>
        <section className="bg-[#00582C] px-6 pb-20 pt-36 text-white lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#B6D7E7]">
              Your information rights
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              Submit a Privacy Request
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Ask what information Ruzawi holds, request access or correction,
              object to processing, withdraw consent, request deletion, or raise
              a privacy concern.
            </p>
          </div>
        </section>

        {status.message && (
          <section className="mx-auto max-w-5xl px-6 pt-10 lg:px-8">
            <div
              role={status.type === "error" ? "alert" : "status"}
              className={`rounded-[2rem] p-6 text-lg shadow-sm ring-1 ring-black/5 ${
                status.type === "success"
                  ? "bg-[#00582C] text-white"
                  : "bg-red-50 text-red-800"
              }`}
            >
              <p className="font-semibold">{status.message}</p>
              {status.reference && (
                <p className="mt-2">
                  Your reference is <strong>{status.reference}</strong>. Please
                  keep it for follow-up.
                </p>
              )}
            </div>
          </section>
        )}

        <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                Before you submit
              </h2>
              <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-[#35443a]">
                <li>You may make more than one request in the same form.</li>
                <li>
                  Give enough detail to locate the information, but do not send
                  passwords, PINs, full payment-card details or unnecessary
                  medical information.
                </li>
                <li>
                  Do not upload or email identity documents now. The privacy team
                  will provide a suitable verification method if needed.
                </li>
                <li>
                  A parent or legal guardian may exercise a child’s rights.
                  Another representative must show authority before information
                  is disclosed or changed.
                </li>
                <li>
                  Deletion is not automatic. Ruzawi may retain information it is
                  legally required to keep or still lawfully needs, and will
                  explain the outcome.
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-[#47778D] p-8 text-white shadow-sm">
              <h2 className="font-serif text-3xl font-semibold">Other options</h2>
              <p className="mt-4 leading-7 text-white/85">
                You may email{" "}
                <a
                  href="mailto:privacy@ruzawi.com"
                  className="font-bold text-white underline underline-offset-4"
                >
                  privacy@ruzawi.com
                </a>{" "}
                or write to Ruzawi School, Ruzawi Road, Marondera, Zimbabwe.
              </p>
              <p className="mt-4 leading-7 text-white/85">
                You may also complain to the Data Protection Authority, POTRAZ.
                Contacting Ruzawi first may allow the concern to be resolved more
                quickly, but does not remove your right to approach the Authority.
              </p>
            </div>
          </aside>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
            <div className="rounded-2xl bg-[#B6D7E7]/35 p-6 leading-7 text-[#35443a] ring-1 ring-[#47778D]/20">
              <p className="font-bold text-[#00582C]">Form privacy notice</p>
              <p className="mt-2">
                Ruzawi School uses the information below to authenticate, assess,
                record and respond to your request, meet legal duties and protect
                other people’s information. It will be received by the privacy
                team at privacy@ruzawi.com and processed by our website hosting,
                anti-abuse and transactional-email providers. Some providers may
                process data outside Zimbabwe subject to the safeguards described
                in our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#00582C] underline underline-offset-4"
                >
                  Privacy Policy
                </a>
                . Required fields are needed to identify and respond to the
                request. Request records are retained only as long as necessary
                to demonstrate and administer compliance and resolve disputes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-10">
              <input
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <fieldset className="space-y-5">
                <legend className="font-serif text-3xl font-semibold text-[#00582C]">
                  1. Your details
                </legend>
                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput label="Full name" name="full_name" required />
                  <TextInput label="Email address" name="email" type="email" required />
                  <TextInput
                    label="Telephone number"
                    name="phone"
                    type="tel"
                    helper="Optional unless you prefer a telephone response."
                  />
                  <SelectInput label="Preferred contact" name="preferred_contact" required>
                    <option value="email">Email</option>
                    <option value="phone">Telephone</option>
                  </SelectInput>
                </div>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="font-serif text-3xl font-semibold text-[#00582C]">
                  2. Who the request concerns
                </legend>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                    Select who you are acting for *
                  </span>
                  <select
                    name="acting_for"
                    required
                    value={actingFor}
                    onChange={(event) => setActingFor(event.target.value)}
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                  >
                    <option value="self">Myself</option>
                    <option value="child">A child as parent/legal guardian</option>
                    <option value="representative">Another adult as authorised representative</option>
                  </select>
                </label>

                {isRepresentingSomeone && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <TextInput
                      label="Name of the person"
                      name="data_subject_name"
                      required
                    />
                    <TextInput
                      label="Relationship or authority"
                      name="relationship"
                      required
                      helper="For example: parent, legal guardian, or authorised representative."
                    />
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className="font-serif text-3xl font-semibold text-[#00582C]">
                  3. What would you like Ruzawi to do? *
                </legend>
                <p className="mt-3 leading-7 text-[#35443a]">
                  Choose every option that applies.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {requestTypes.map((request) => (
                    <label
                      key={request.name}
                      className="flex gap-3 rounded-2xl bg-[#f6f1e7] p-5 ring-1 ring-black/5"
                    >
                      <input
                        type="checkbox"
                        name={request.name}
                        className="mt-1 h-5 w-5 shrink-0 accent-[#00582C]"
                      />
                      <span>
                        <strong className="block text-[#00582C]">{request.title}</strong>
                        <span className="mt-1 block text-sm leading-6 text-[#35443a]">
                          {request.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-6">
                <legend className="font-serif text-3xl font-semibold text-[#00582C]">
                  4. Help us locate the information
                </legend>
                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput
                    label="School area or interaction"
                    name="school_area"
                    helper="For example: admissions, pupil records, employment, alumni, website enquiry or marketing."
                  />
                  <TextInput
                    label="Relevant date or period"
                    name="relevant_period"
                    helper="An approximate year or date range is sufficient."
                  />
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                    Request details *
                  </span>
                  <textarea
                    name="details"
                    required
                    rows={8}
                    maxLength={10000}
                    placeholder="Describe the information or processing involved and the outcome you want. For a correction, identify what is inaccurate and provide the correct information."
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                  />
                  <span className="mt-2 block text-sm leading-6 text-[#35443a]">
                    Do not include passwords, PINs, complete payment-card details
                    or unnecessary sensitive information.
                  </span>
                </label>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-serif text-3xl font-semibold text-[#00582C]">
                  5. Confirm and send
                </legend>
                <RequiredConfirmation name="authority_confirmed">
                  I confirm that the information in this request is accurate and
                  that I am the data subject, the child’s parent/legal guardian,
                  or otherwise authorised to act for the person named. I
                  understand that Ruzawi must verify identity and authority before
                  disclosing, correcting or deleting personal information.
                </RequiredConfirmation>
                <RequiredConfirmation name="privacy_acknowledged">
                  I have read the form privacy notice and the{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#00582C] underline underline-offset-4"
                  >
                    Privacy Policy
                  </a>
                  , and understand that Ruzawi will use these details to verify,
                  administer and respond to this request.
                </RequiredConfirmation>
              </fieldset>

              <div className="space-y-3">
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />
                <p className="text-sm leading-6 text-[#35443a]">
                  reCAPTCHA is used to protect this request channel from automated abuse.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending request..." : "Send privacy request"}
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
