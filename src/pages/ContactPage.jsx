import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
} from "react-icons/fa";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const enquiryTypes = [
  {
    label: "General Enquiry",
    value: "general",
  },
  {
    label: "Admissions",
    value: "admissions",
  },
  {
    label: "Job Application",
    value: "job-application",
  },
  {
    label: "Other",
    value: "other",
  },
];

const contactCards = [
  {
    title: "General Enquiries",
    value: "admin@ruzawi.com",
    href: "mailto:admin@ruzawi.com",
    icon: FaEnvelope,
  },
  {
    title: "Admissions",
    value: "registrar@ruzawi.com",
    href: "mailto:registrar@ruzawi.com",
    icon: FaEnvelope,
  },
  {
    title: "Job Applications",
    value: "jobs@ruzawi.com",
    href: "mailto:jobs@ruzawi.com",
    icon: FaEnvelope,
  },
  {
    title: "Location",
    value: "Marondera, Zimbabwe",
    href: "https://maps.google.com/?q=Ruzawi%20School%20Marondera%20Zimbabwe",
    icon: FaMapMarkerAlt,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
];

export default function ContactPage() {
  const recaptchaRef = useRef(null);

  const [selectedEnquiryType, setSelectedEnquiryType] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isJobApplication = selectedEnquiryType === "job-application";

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const enquiryType = String(formData.get("enquiryType") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const website = String(formData.get("website") || "").trim();

    if (!firstName || !lastName || !email || !enquiryType || !message) {
      setStatus({
        type: "error",
        message: "Please complete all required fields.",
      });
      return;
    }

    if (isJobApplication) {
      const cvFile = formData.get("cv");

      if (!cvFile || !cvFile.name) {
        setStatus({
          type: "error",
          message: "Please attach your CV for job applications.",
        });
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(cvFile.type)) {
        setStatus({
          type: "error",
          message: "Please upload your CV as a PDF, DOC or DOCX file.",
        });
        return;
      }

      const maxFileSize = 5 * 1024 * 1024;

      if (cvFile.size > maxFileSize) {
        setStatus({
          type: "error",
          message: "Please upload a CV smaller than 5MB.",
        });
        return;
      }
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

      formData.set("firstName", firstName);
      formData.set("lastName", lastName);
      formData.set("email", email);
      formData.set("phone", phone);
      formData.set("enquiryType", enquiryType);
      formData.set("message", message);
      formData.set("website", website);
      formData.set("recaptchaToken", recaptchaToken);

      const response = await fetch("/.netlify/functions/contact-form", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Could not send your message.");
      }

      setStatus({
        type: "success",
        message:
          "Thank you. Your message has been sent and we will get back to you soon.",
      });

      form.reset();
      setSelectedEnquiryType("");
      recaptchaRef.current?.reset();
    } catch (error) {
      recaptchaRef.current?.reset();

      setStatus({
        type: "error",
        message:
          error.message ||
          "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Contact Ruzawi School"
        description="Contact Ruzawi School in Marondera, Zimbabwe, for admissions, general enquiries, job applications and school information."
        path="/contact"
        image="/images/seo-cover.webp"
      />

      <TopBar />

      <main className="pt-28">
        <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-14 lg:px-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#47778D]">
              Contact Us
            </p>

            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl lg:text-7xl">
              Get in touch with Ruzawi School
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-9 text-[#35443a] md:text-xl">
              Please complete the form below and we will direct your enquiry to
              the relevant department.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Ruzawi School, Marondera, Zimbabwe
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Admissions, enquiries and job applications
            </p>
          </div>
        </section>

        {status.message && (
          <section className="mx-auto max-w-[1200px] px-6 pt-10 lg:px-8">
            <div
              className={`rounded-[2rem] p-6 text-lg font-semibold shadow-sm ring-1 ring-black/5 ${
                status.type === "success"
                  ? "bg-[#00582C] text-white"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {status.message}
            </div>
          </section>
        )}

        <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Contact Details
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C]">
                We would love to hear from you
              </h2>

              <div className="mt-8 space-y-4">
                {contactCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <a
                      key={card.title}
                      href={card.href}
                      target={
                        card.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        card.href.startsWith("http") ? "noreferrer" : undefined
                      }
                      className="flex gap-4 rounded-2xl bg-[#f6f1e7] p-5 transition hover:bg-[#B6D7E7]/50"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00582C] text-white">
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#47778D]">
                          {card.title}
                        </p>

                        <p className="mt-1 font-semibold text-[#00582C]">
                          {card.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-black/10 pt-8">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#47778D]">
                  Follow Ruzawi
                </p>

                <div className="mt-5 flex gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00582C] text-white transition hover:bg-[#47778D]"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
              Send a Message
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
              Contact Form
            </h2>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <input
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                    First Name *
                  </span>

                  <input
                    name="firstName"
                    required
                    type="text"
                    className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                    Last Name *
                  </span>

                  <input
                    name="lastName"
                    required
                    type="text"
                    className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                    Email *
                  </span>

                  <input
                    name="email"
                    required
                    type="email"
                    className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                    Phone
                  </span>

                  <input
                    name="phone"
                    type="tel"
                    className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                  Enquiry Type *
                </span>

                <select
                  name="enquiryType"
                  required
                  value={selectedEnquiryType}
                  onChange={(event) =>
                    setSelectedEnquiryType(event.target.value)
                  }
                  className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                >
                  <option value="">Select an enquiry type</option>
                  {enquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                {selectedEnquiryType && (
                  <p className="mt-3 text-sm leading-6 text-[#35443a]">
                    {selectedEnquiryType === "admissions" &&
                      "Admissions enquiries will be sent to the Registrar."}
                    {selectedEnquiryType === "job-application" &&
                      "Job applications will be sent to the jobs inbox."}
                    {(selectedEnquiryType === "general" ||
                      selectedEnquiryType === "other") &&
                      "This enquiry will be sent to the school admin office."}
                  </p>
                )}
              </label>

              {isJobApplication && (
                <label className="block rounded-[2rem] bg-[#f6f1e7] p-6 ring-1 ring-black/5">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                    Attach CV *
                  </span>

                  <input
                    name="cv"
                    required={isJobApplication}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] file:mr-4 file:rounded-full file:border-0 file:bg-[#00582C] file:px-5 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#47778D]"
                  />

                  <p className="mt-3 text-sm leading-6 text-[#35443a]">
                    Please upload your CV as a PDF, DOC or DOCX file. Maximum
                    file size: 5MB.
                  </p>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                  Message *
                </span>

                <textarea
                  name="message"
                  required
                  rows="8"
                  className="w-full rounded-2xl border border-black/10 bg-[#f6f1e7] px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                />
              </label>

              <div className="space-y-3">
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />

                <p className="text-sm leading-6 text-[#35443a]">
                  Please complete the reCAPTCHA checkbox before submitting.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </section>
        </section>

        <Footer />
      </main>
    </div>
  );
}
