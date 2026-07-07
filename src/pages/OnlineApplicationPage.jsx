import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const APPLICATION_ENDPOINT = "/.netlify/functions/application-confirmation";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const MAX_FILE_SIZE_MB = 2;
const MAX_TOTAL_UPLOAD_SIZE_MB = 4;

const APPLICATION_PARENT_MESSAGE =
  "After submitting this form, Grade 1 and Grade 3 applicants, being the intake years, will be contacted by the school prior to their assessment. Applications for other grades will be automatically entered into our database and placed on our waitlist. You will be contacted if an assessment opportunity arises.";

const declarationCheckboxNames = [
  "certify_complete",
  "no_outstanding_fees",
  "financial_ability",
  "headmaster_class_decision",
  "withdrawal_notice",
  "assessment_confidential",
];

const uploadFieldNames = [
  "photo",
  "family_photo",
  "birth_certificate_copy",
  "recent_report",
  "proof_of_payment",
];

function fetchWithTimeout(url, options = {}, timeoutMs = 45000) {
  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => {
    window.clearTimeout(timeoutId);
  });
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "0 MB";

  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function getFilesForField(form, fieldName) {
  return Array.from(form.querySelector(`[name="${fieldName}"]`)?.files || []);
}

function validateFileCount(form, fieldName, max) {
  const files = getFilesForField(form, fieldName);

  if (files.length > max) {
    throw new Error(`${fieldName} can only have up to ${max} files.`);
  }
}

function validateFileSize(form, fieldName, maxMb) {
  const files = getFilesForField(form, fieldName);
  const maxBytes = maxMb * 1024 * 1024;

  const oversizedFile = files.find((file) => file.size > maxBytes);

  if (oversizedFile) {
    throw new Error(
      `${oversizedFile.name} is too large. Please upload files smaller than ${maxMb}MB each.`,
    );
  }
}

function validateTotalUploadSize(form, fieldNames, maxMb) {
  const maxBytes = maxMb * 1024 * 1024;

  const totalBytes = fieldNames.reduce((total, fieldName) => {
    const files = getFilesForField(form, fieldName);
    const fieldTotal = files.reduce((sum, file) => sum + file.size, 0);

    return total + fieldTotal;
  }, 0);

  if (totalBytes > maxBytes) {
    throw new Error(
      `Your uploaded files are too large in total. The current total is ${formatBytes(
        totalBytes,
      )}. Please keep all uploads together under ${maxMb}MB.`,
    );
  }
}

function TextInput({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  min,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
        {label} {required && "*"}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  required = false,
  rows = 4,
  placeholder = "",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
        {label} {required && "*"}
      </span>

      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] outline-none transition focus:border-[#47778D] focus:ring-4 focus:ring-[#B6D7E7]/50"
      />
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

function GuardianTitleSelect({ label, name, required = false }) {
  return (
    <SelectInput label={label} name={name} required={required}>
      <option value="">Select</option>
      <option>Father</option>
      <option>Mother</option>
      <option>Guardian</option>
    </SelectInput>
  );
}

function FileInput({
  label,
  name,
  required = false,
  accept = "image/*,.heic,.heif,.pdf",
  multiple = false,
  helper = "",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-[#00582C]">
        {label} {required && "*"}
      </span>

      <input
        name={name}
        type="file"
        required={required}
        accept={accept}
        multiple={multiple}
        className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-[#10251c] file:mr-4 file:rounded-full file:border-0 file:bg-[#00582C] file:px-5 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#47778D]"
      />

      {helper && <p className="mt-2 text-sm text-[#35443a]">{helper}</p>}
    </label>
  );
}

function CheckboxInput({ name, children }) {
  return (
    <label className="flex gap-3 rounded-2xl bg-white p-4 text-[#35443a] ring-1 ring-black/5">
      <input
        name={name}
        type="checkbox"
        required
        className="mt-1 h-5 w-5 shrink-0 accent-[#00582C]"
      />

      <span className="leading-7">{children}</span>
    </label>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="border-b border-black/10 pb-4 font-serif text-3xl font-semibold text-[#00582C] md:text-4xl">
      {children}
    </h2>
  );
}

function ApplicationProcessNotice() {
  return (
    <div className="rounded-[2rem] bg-[#B6D7E7]/45 p-6 text-[#00582C] ring-1 ring-[#47778D]/20">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#47778D]">
        What happens after you submit
      </p>

      <p className="mt-3 text-lg leading-8">{APPLICATION_PARENT_MESSAGE}</p>
    </div>
  );
}

export default function OnlineApplicationPage() {
  const recaptchaRef = useRef(null);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    const form = event.currentTarget;

    setSubmitting(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      if (!RECAPTCHA_SITE_KEY) {
        throw new Error("Missing VITE_RECAPTCHA_SITE_KEY.");
      }

      validateFileCount(form, "photo", 2);
      validateFileCount(form, "family_photo", 2);
      validateFileCount(form, "birth_certificate_copy", 3);
      validateFileCount(form, "recent_report", 3);
      validateFileCount(form, "proof_of_payment", 3);

      validateFileSize(form, "photo", MAX_FILE_SIZE_MB);
      validateFileSize(form, "family_photo", MAX_FILE_SIZE_MB);
      validateFileSize(form, "birth_certificate_copy", MAX_FILE_SIZE_MB);
      validateFileSize(form, "recent_report", MAX_FILE_SIZE_MB);
      validateFileSize(form, "proof_of_payment", MAX_FILE_SIZE_MB);

      validateTotalUploadSize(form, uploadFieldNames, MAX_TOTAL_UPLOAD_SIZE_MB);

      const recaptchaToken = recaptchaRef.current?.getValue();

      if (!recaptchaToken) {
        throw new Error("Please complete the reCAPTCHA checkbox.");
      }

      const formData = new FormData(form);

      declarationCheckboxNames.forEach((name) => {
        if (!formData.has(name)) {
          throw new Error("Please confirm all declaration checkboxes.");
        }

        formData.set(name, "1");
      });

      formData.append("parentConfirmationMessage", APPLICATION_PARENT_MESSAGE);
      formData.append("recaptchaToken", recaptchaToken);

      const response = await fetchWithTimeout(
        APPLICATION_ENDPOINT,
        {
          method: "POST",
          body: formData,
        },
        45000,
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "The application could not be submitted.",
        );
      }

      form.reset();
      recaptchaRef.current?.reset();

      setStatus({
        type: "success",
        message:
          "Thank you. Your application has been submitted successfully. A confirmation email has been sent to the parent/guardian email addresses provided.",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);

      recaptchaRef.current?.reset();

      const message =
        error.name === "AbortError"
          ? "The application is taking too long to submit. Please check that your uploaded files are not too large, then try again."
          : error.message || "Something went wrong.";

      setStatus({
        type: "error",
        message,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Online Application"
        description="Complete the Ruzawi School online application form and upload the required documents for your child’s application."
        path="/online-applications"
        image="/images/seo-cover.webp"
      />

      <TopBar />

      <main className="pt-28">
        <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-14 lg:px-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#47778D]">
              Admissions
            </p>

            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl lg:text-7xl">
              Online Application
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-9 text-[#35443a] md:text-xl">
              Complete the electronic application form and upload the required
              documents. Please contact{" "}
              <a
                href="mailto:registrar@ruzawi.com"
                className="font-bold text-[#00582C] underline decoration-[#B6D7E7] decoration-4 underline-offset-4"
              >
                registrar@ruzawi.com
              </a>{" "}
              with any queries.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Electronic Application Process
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Please read the requirements before submitting
            </p>
          </div>
        </section>

        {status.message && (
          <section className="mx-auto max-w-[1200px] px-6 pt-10 lg:px-8">
            <div
              className={`rounded-[2rem] p-6 text-lg font-semibold shadow-sm ring-1 ring-black/5 ${status.type === "success"
                  ? "bg-[#00582C] text-white"
                  : "bg-red-50 text-red-800"
                }`}
            >
              {status.message}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <section className="mb-10 rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                  Before you apply
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                  Required documents and important information
                </h2>

                <p className="mt-6 text-lg leading-8 text-[#35443a]">
                  Please prepare the following documents before completing the
                  form. You will need to upload them as part of the online
                  application.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#00582C]">
                    Required documents
                  </h3>

                  <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-[#35443a]">
                    <li>A copy of your child’s birth certificate</li>
                    <li>Your child’s two most recent school reports</li>
                    <li>Any educational assessment reports</li>
                    <li>
                      Recent portrait photograph of your child and a family
                      photo
                    </li>
                    <li>
                      Proof of payment for the US$50 registration fee per family
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#00582C]">
                    Important notes
                  </h3>

                  <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-[#35443a]">
                    <li>
                      Medical aid is mandatory for pupils attending Ruzawi.
                    </li>
                    <li>Our current all-inclusive fee is US$5450-00.</li>
                    <li>
                      Please use a payment reference such as Surname/Year of
                      enrolment, for example Hale26.
                    </li>
                    <li>
                      Changes to your contact details should be communicated to
                      the Registrar.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <ApplicationProcessNotice />
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-black/10">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-[#47778D] text-white">
                  <tr>
                    <th className="p-4"></th>
                    <th className="p-4">Ruzawi School</th>
                    <th className="p-4">Ruzawi School</th>
                    <th className="p-4">Ruzawi School</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-black/10 bg-white">
                  <tr>
                    <th className="p-4 text-[#00582C]">Bank Name</th>
                    <td className="p-4 text-[#35443a]">Stanbic Bank</td>
                    <td className="p-4 text-[#35443a]">CABS Platinum</td>
                    <td className="p-4 text-[#35443a]">BancABC</td>
                  </tr>

                  <tr>
                    <th className="p-4 text-[#00582C]">Branch</th>
                    <td className="p-4 text-[#35443a]">Borrowdale</td>
                    <td className="p-4 text-[#35443a]">Marondera</td>
                    <td className="p-4 text-[#35443a]">Msasa</td>
                  </tr>

                  <tr>
                    <th className="p-4 text-[#00582C]">A/c No. (ZWG)</th>
                    <td className="p-4 text-[#35443a]">9140000817286</td>
                    <td className="p-4 text-[#35443a]">1003065872</td>
                    <td className="p-4 text-[#35443a]">56101045502015</td>
                  </tr>

                  <tr>
                    <th className="p-4 text-[#00582C]">A/c No. (Nostro)</th>
                    <td className="p-4 text-[#35443a]">9140000900515</td>
                    <td className="p-4 text-[#35443a]">1125278315</td>
                    <td className="p-4 text-[#35443a]">56101046633019</td>
                  </tr>

                  <tr>
                    <th className="p-4 text-[#00582C]">Branch Code</th>
                    <td className="p-4 text-[#35443a]">1019</td>
                    <td className="p-4 text-[#35443a]"></td>
                    <td className="p-4 text-[#35443a]"></td>
                  </tr>

                  <tr>
                    <th className="p-4 text-[#00582C]">Swift Code</th>
                    <td className="p-4 text-[#35443a]">SBICZWHX</td>
                    <td className="p-4 text-[#35443a]"></td>
                    <td className="p-4 text-[#35443a]"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              <section className="space-y-6">
                <SectionTitle>Child Details</SectionTitle>

                <div className="grid gap-6 md:grid-cols-2">
                  <FileInput
                    label="Photo of Child"
                    name="photo"
                    accept="image/*,.heic,.heif"
                    multiple
                    required
                    helper={`You can upload up to 2 files. Each file must be under ${MAX_FILE_SIZE_MB}MB.`}
                  />

                  <FileInput
                    label="Photo of Child with Family"
                    name="family_photo"
                    accept="image/*,.heic,.heif"
                    multiple
                    helper={`You can upload up to 2 files. Each file must be under ${MAX_FILE_SIZE_MB}MB.`}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <TextInput label="First Name" name="student_name" required />

                  <TextInput label="Middle Name" name="student_middlename" />

                  <TextInput
                    label="Last Name"
                    name="student_surname"
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <SelectInput
                    label="Month of Required Entry"
                    name="start_month"
                    required
                  >
                    <option value="">Select month</option>
                    <option>January</option>
                    <option>May</option>
                    <option>September</option>
                  </SelectInput>

                  <TextInput
                    label="Start Year"
                    name="start_year"
                    type="number"
                    min="2026"
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    required
                  />

                  <SelectInput label="Grade Applying For" name="grade" required>
                    <option value="">Select grade</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                  </SelectInput>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <SelectInput label="Girl/Boy" name="sex" required>
                    <option value="">Select</option>
                    <option>Girl</option>
                    <option>Boy</option>
                  </SelectInput>

                  <TextInput label="Religion" name="religion" required />
                </div>

                <SelectInput
                  label="Boarding Preference"
                  name="boarding_preference"
                  required
                >
                  <option value="">Select preference</option>
                  <option>Weekly Boarding</option>
                  <option>Daily Boarding</option>
                </SelectInput>

                <TextInput
                  label="Current School"
                  name="previous_or_current_school"
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput label="ID Number" name="id_number" required />

                  <TextInput
                    label="Birth Certificate Number"
                    name="birth_certificate"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FileInput
                    label="Birth Certificate"
                    name="birth_certificate_copy"
                    accept="image/*,.heic,.heif,.pdf"
                    multiple
                    required
                    helper={`You can upload up to 3 files. Each file must be under ${MAX_FILE_SIZE_MB}MB.`}
                  />

                  <FileInput
                    label="Recent School Report, Grade 2 - 7"
                    name="recent_report"
                    accept="image/*,.heic,.heif,.pdf"
                    multiple
                    helper={`You can upload up to 3 files. Each file must be under ${MAX_FILE_SIZE_MB}MB.`}
                  />
                </div>

                <TextArea label="Medical History" name="medical_history" />

                <SelectInput
                  label="Living Situation"
                  name="living_situation"
                  required
                >
                  <option value="">Select</option>
                  <option>Lives With Both Parents</option>
                  <option>Mainly With Mother</option>
                  <option>Mainly With Father</option>
                  <option>Other</option>
                </SelectInput>

                <TextArea
                  label="Living Situation Description"
                  name="living_situation_description"
                  rows={3}
                />

                <TextArea
                  label="Physical Address of Child"
                  name="physical_address"
                  rows={3}
                  required
                />
              </section>

              <section className="space-y-6">
                <SectionTitle>Parent/Guardian and Family Details</SectionTitle>

                <div className="space-y-4">
                  <p className="rounded-2xl bg-[#B6D7E7]/50 p-5 leading-7 text-[#00582C]">
                    NB: A confirmation email will be sent to both
                    Parent/Guardian email addresses entered below.
                  </p>
                </div>

                <TextArea
                  label="Siblings"
                  name="siblings"
                  rows={3}
                  placeholder="Please separate each sibling with a comma."
                />

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-[2rem] bg-[#f6f1e7] p-6 ring-1 ring-black/5">
                    <h3 className="mb-6 font-serif text-3xl font-semibold text-[#00582C]">
                      Parent/Guardian 1
                    </h3>

                    <div className="space-y-5">
                      <GuardianTitleSelect
                        label="Title"
                        name="guardian1_title"
                        required
                      />

                      <TextInput label="Name" name="guardian1_name" required />

                      <TextInput
                        label="Email"
                        name="guardian1_email"
                        type="email"
                        required
                      />

                      <TextInput
                        label="Cell"
                        name="guardian1_cell"
                        type="tel"
                      />

                      <TextInput
                        label="Occupation and Workplace"
                        name="guardian1_occupation"
                      />

                      <TextArea
                        label="Physical Address"
                        name="guardian1_physical_address"
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#f6f1e7] p-6 ring-1 ring-black/5">
                    <h3 className="mb-6 font-serif text-3xl font-semibold text-[#00582C]">
                      Parent/Guardian 2
                    </h3>

                    <div className="space-y-5">
                      <GuardianTitleSelect
                        label="Title"
                        name="guardian2_title"
                        required
                      />

                      <TextInput label="Name" name="guardian2_name" required />

                      <TextInput
                        label="Email"
                        name="guardian2_email"
                        type="email"
                        required
                      />

                      <TextInput
                        label="Cell"
                        name="guardian2_cell"
                        type="tel"
                      />

                      <TextInput
                        label="Occupation and Workplace"
                        name="guardian2_occupation"
                      />

                      <TextArea
                        label="Physical Address"
                        name="guardian2_physical_address"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <SectionTitle>
                  Ruzawi Connections and Future Schooling
                </SectionTitle>

                <TextInput
                  label="Family/Parent - Past Pupil"
                  name="connection"
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput label="House" name="house" />

                  <TextInput
                    label="High School to Prepare For"
                    name="senior_school_prepared_for"
                  />
                </div>
              </section>

              <section className="space-y-6">
                <SectionTitle>References</SectionTitle>

                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput
                    label="Full Name of Reference 1"
                    name="reference_person_1"
                    required
                  />

                  <TextInput
                    label="Full Name of Reference 2"
                    name="reference_person_2"
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput
                    label="Contact For Above Reference"
                    name="reference_person_1_contact"
                  />

                  <TextInput
                    label="Contact For Above Reference 2"
                    name="reference_person_2_contact"
                  />
                </div>
              </section>

              <section className="space-y-6">
                <SectionTitle>Fees and Important Information</SectionTitle>

                <div className="grid gap-6 md:grid-cols-2">
                  <TextInput
                    label="Person Responsible for Paying School Fees"
                    name="person_school_fees"
                    required
                  />

                  <TextInput
                    label="Contact For Above Person"
                    name="person_school_fees_contact"
                  />
                </div>

                <TextArea
                  label="Family Status or Important Information"
                  name="family_status_or_important_info"
                  rows={5}
                  required
                />

                <FileInput
                  label="Proof of Payment"
                  name="proof_of_payment"
                  accept="image/*,.heic,.heif,.pdf"
                  multiple
                  required
                  helper={`You can upload up to 3 files. Each file must be under ${MAX_FILE_SIZE_MB}MB. All uploads together should stay under ${MAX_TOTAL_UPLOAD_SIZE_MB}MB.`}
                />
              </section>

              <section className="space-y-5">
                <SectionTitle>Declarations</SectionTitle>

                <CheckboxInput name="certify_complete">
                  I certify that the information given on this application is
                  complete and accurate.
                </CheckboxInput>

                <CheckboxInput name="no_outstanding_fees">
                  I understand that my child will not be admitted if there are
                  any outstanding fees.
                </CheckboxInput>

                <CheckboxInput name="financial_ability">
                  I declare that I/we have the financial ability to pay the
                  fees.
                </CheckboxInput>

                <CheckboxInput name="headmaster_class_decision">
                  I am willing to abide by the decision of the Headmaster as to
                  the class in which my child will be placed.
                </CheckboxInput>

                <CheckboxInput name="withdrawal_notice">
                  If I intend to withdraw my child, I agree to give one full
                  term&apos;s notice before the end of my child&apos;s final
                  term at the school.
                </CheckboxInput>

                <CheckboxInput name="assessment_confidential">
                  I acknowledge that my child&apos;s admission is subject to,
                  among other things, the result of the assessment. I also
                  accept that the actual assessment results are confidential.
                </CheckboxInput>

                <div className="grid gap-6 md:grid-cols-3">
                  <TextInput
                    label="Legal Custodian of Child"
                    name="legal_custodian"
                    required
                  />

                  <TextInput
                    label="Date"
                    name="signature_date"
                    type="date"
                    required
                  />

                  <TextInput
                    label="Capacity of Signatory"
                    name="capacity_of_signatory"
                    placeholder="i.e. Parent/Guardian"
                    required
                  />
                </div>
              </section>

              <div className="space-y-3">
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />

                <p className="text-sm leading-6 text-[#35443a]">
                  Please complete the reCAPTCHA checkbox before submitting.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
