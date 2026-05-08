import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const MAX_FILES = 2;
const MAX_FILE_SIZE_MB = 8;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function JuniorMastersMistressesPage() {
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
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Junior Masters and Mistresses"
        description="Apply to become a Junior Master or Mistress at Ruzawi School and gain valuable experience in teaching, coaching, boarding life and child development."
        path="/junior-masters-and-mistresses"
        image="/images/junior-masters-hero.webp"
      />

      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/junior-masters-hero.webp"
            alt="Junior Masters and Mistresses at Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Opportunities at Ruzawi
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Junior Masters and Mistresses
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              A unique opportunity for young adults to grow, serve and discover
              their strengths within a supportive school environment.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Make a meaningful impact in the lives of children
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Apply to be a JM
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src="/images/junior-masters.webp"
                  alt="Junior Masters and Mistresses"
                  className="h-[520px] w-full object-cover"
                />

                <div className="bg-[#00582C] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
                    Junior Master & Mistress Programme
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Serve, learn and grow
                  </h2>

                  <p className="mt-4 leading-7 text-white/80">
                    A structured opportunity to gain confidence, responsibility
                    and experience in school life.
                  </p>
                </div>
              </div>
            </aside>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Junior Masters and Mistresses
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                A chance to discover strengths and make a difference
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  Ruzawi offers a unique opportunity to young people who have
                  recently left high school and are keen to experience what
                  working life feels like within a supportive and structured
                  environment. The Junior Master and Mistress programme allows
                  young adults to discover interests and strengths they may not
                  yet realise they have, whether that be coaching a sport in the
                  afternoon or simply spending time engaging with children.
                </p>

                <p>
                  Being a Junior Master or Mistress provides countless
                  opportunities to make a meaningful impact in the lives of the
                  children. This may be on the sports field while playing touch
                  rugby, in the dormitories during games such as musical statues
                  or through shared moments like movie nights. These everyday
                  interactions play an important role in building trust,
                  confidence and connection.
                </p>

                <p>
                  Working in the classroom is often a highlight of the role.
                  Junior Masters and Mistresses gain valuable insight into
                  teaching methods and classroom management, particularly
                  through involvement in music lessons and play rehearsals.
                  Seeing the enjoyment and enthusiasm of the children makes the
                  experience both rewarding and memorable.
                </p>

                <p>
                  Beyond supporting the children, the programme also supports
                  the personal development of the Junior Masters and Mistresses
                  themselves. The system at Ruzawi encourages young adults to
                  learn how to balance responsibility, priorities and personal
                  wellbeing. Along the way, they develop vital life skills that
                  prepare them for future studies, careers and the wider world.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Apply to be a JM
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Junior Master or Mistress Application
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#35443a]">
                Complete the form below and upload your CV. Your application
                will be sent directly to Ruzawi School.
              </p>
            </div>

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
              className="rounded-[2rem] bg-[#f6f1e7] p-6 shadow-sm ring-1 ring-black/5 md:p-10"
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
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
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
                    className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
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
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
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
                  className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
                  CV *
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-[#47778D]/40 bg-white px-6 py-10 text-center transition hover:border-[#00582C] hover:bg-[#B6D7E7]/25">
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
                    Choose files to upload. You can upload up to {MAX_FILES}{" "}
                    files.
                  </span>

                  <span className="mt-2 text-sm text-[#35443a]/80">
                    Accepted formats: PDF, DOC and DOCX. Maximum{" "}
                    {MAX_FILE_SIZE_MB}MB per file.
                  </span>

                  <span className="mt-4 rounded-full bg-[#00582C] px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-white">
                    Choose Files
                  </span>
                </label>

                {files.length > 0 && (
                  <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
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

        <Footer />
      </main>
    </div>
  );
}
