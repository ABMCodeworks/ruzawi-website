import TopBar from "../components/TopBar";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const linkClass = "font-bold text-[#00582C] underline underline-offset-4";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Privacy Policy | Ruzawi School"
        description="How Ruzawi School collects, uses, shares, protects and retains personal information, and how data subjects may exercise their rights."
        path="/privacy-policy"
        image="/images/seo-cover.webp"
      />

      <TopBar />

      <main>
        <section className="bg-[#00582C] px-6 pb-20 pt-36 text-white lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#B6D7E7]">
              Ruzawi School
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              This notice explains, in clear terms, how we handle personal
              information through our website, admissions and other digital
              services.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-12">
            <div className="space-y-10 text-base leading-8 text-[#35443a]">
              <div className="rounded-2xl bg-[#B6D7E7]/35 p-6 ring-1 ring-[#47778D]/20">
                <p className="font-bold text-[#00582C]">At a glance</p>
                <p className="mt-2">
                  Ruzawi School is the data controller. We do not sell personal
                  information. We use children’s and sensitive information only
                  for stated school purposes and with the consent or other legal
                  authority required by Zimbabwean law. Optional analytics are
                  controlled through cookie choices.
                </p>
              </div>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  1. Who we are and how to contact us
                </h2>
                <p className="mt-4">
                  Ruzawi School, Ruzawi Road, Marondera, Zimbabwe, determines
                  why and how the personal information described in this notice
                  is processed and is therefore the data controller.
                </p>
                <p className="mt-4">
                  Privacy and data-subject requests may be sent to the Data
                  Protection Officer through{" "}
                  <a href="mailto:admin@ruzawi.com" className={linkClass}>
                    admin@ruzawi.com
                  </a>{" "}
                  with the subject “Data Protection Request”. Admissions
                  enquiries may be sent to{" "}
                  <a href="mailto:registrar@ruzawi.com" className={linkClass}>
                    registrar@ruzawi.com
                  </a>
                  . We may ask for proportionate proof of identity or authority
                  before acting on a request.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  2. Scope of this notice
                </h2>
                <p className="mt-4">
                  This notice applies to visitors, prospective and current
                  pupils, parents and guardians, job and Junior Master or
                  Mistress applicants, referees, alumni and other people who use
                  our website or communicate with us through a digital form. It
                  should be read with our{" "}
                  <a href="/cookie-policy" className={linkClass}>
                    Cookie Policy
                  </a>{" "}
                  and{" "}
                  <a href="/terms-of-use" className={linkClass}>
                    Terms of Use
                  </a>
                  . A more specific notice given on a form will apply to that
                  collection as well.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  3. Personal information we collect
                </h2>
                <p className="mt-4">Depending on your interaction, we collect:</p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>
                    identity and contact details, including names, dates of
                    birth, identification or birth-certificate numbers,
                    addresses, email addresses and telephone numbers;
                  </li>
                  <li>
                    pupil and admissions details, including intended entry,
                    current school, school reports, assessments, photographs,
                    family or living arrangements and references;
                  </li>
                  <li>
                    sensitive information requested for admissions or pupil
                    welfare, which may include age, sex, religion, family
                    status, health, educational and financial information;
                  </li>
                  <li>
                    payment-administration information, such as proof of payment
                    and the person responsible for fees. The website does not
                    ask for payment-card passwords or PINs;
                  </li>
                  <li>
                    recruitment information, such as CVs, qualifications,
                    employment history and supporting messages; and
                  </li>
                  <li>
                    technical information, such as IP address, browser and
                    device information, security logs, cookie choices and, only
                    where permitted, analytics and interaction information.
                  </li>
                </ul>
                <p className="mt-4">
                  Please provide only information relevant to the stated
                  purpose. Do not include unrequested medical, financial or
                  other sensitive details in free-text fields.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  4. Where information comes from
                </h2>
                <p className="mt-4">
                  We collect information directly from the person completing a
                  form and from the documents they upload. For admissions, a
                  parent or legal guardian may provide information about a
                  child, another guardian, siblings, a fee payer, referees and a
                  current or former school. We may verify relevant information
                  with those people or organisations where authorised or
                  otherwise permitted by law. Website systems and service
                  providers also generate security, delivery and technical logs.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  5. Why we process information and our authority
                </h2>
                <p className="mt-4">We process information to:</p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>
                    receive, verify, assess and administer applications,
                    assessments, waiting lists and admissions;
                  </li>
                  <li>
                    respond to enquiries and communicate about requested school
                    services or opportunities;
                  </li>
                  <li>
                    administer application fees and reconcile proof of payment;
                  </li>
                  <li>
                    evaluate recruitment applications and contact referees;
                  </li>
                  <li>
                    operate, secure, troubleshoot and improve the website; and
                  </li>
                  <li>
                    keep appropriate records, protect legal rights, prevent
                    misuse and comply with legal or regulatory duties.
                  </li>
                </ul>
                <p className="mt-4">
                  Our legal authority depends on the activity. It may be the
                  specific, informed consent of the data subject or, for a
                  child, a competent parent or legal guardian; steps requested
                  before a possible contract; compliance with law; protection
                  of vital interests; or a legitimate school interest that is
                  not overridden by the data subject’s rights. Optional
                  analytics are used only after the relevant cookie consent.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  6. Children’s and sensitive information
                </h2>
                <p className="mt-4">
                  A child is a person under 18. A child’s rights under the{" "}
                  <a
                    href="https://www.potraz.gov.zw/wp-content/uploads/2026/02/ACT-CDPA.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Cyber and Data Protection Act [Chapter 12:07]
                  </a>{" "}
                  are exercised by a parent or legal guardian. Online pupil applications must be
                  submitted by a parent or legal guardian, who is asked to
                  identify their capacity and expressly consent to the stated
                  processing.
                </p>
                <p className="mt-4">
                  The Act treats several ordinary admissions fields as
                  sensitive information. We therefore ask separately for
                  written electronic consent to process the child’s health,
                  religion, age, sex, family status, education, financial and
                  other sensitive information for admissions, safeguarding and
                  related school administration. Consent may be withdrawn free
                  of charge by contacting us, but withdrawal does not invalidate
                  processing already lawfully completed and may prevent us from
                  continuing an application where the information is necessary.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  7. Required and optional information
                </h2>
                <p className="mt-4">
                  Fields marked with an asterisk are required for the relevant
                  request. If they or the required admissions consents are not
                  provided, we cannot submit or properly assess the application.
                  Unmarked fields are optional unless we later explain why they
                  are needed. A decision not to allow optional analytics does
                  not affect access to the core website or an admissions
                  decision.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  8. Who receives information
                </h2>
                <p className="mt-4">
                  Access is limited according to role and need. Recipients may
                  include authorised admissions, finance, pastoral, medical,
                  IT, recruitment and school leadership personnel; a current
                  school or referee where verification is authorised;
                  professional advisers, auditors, insurers, regulators or law
                  enforcement where permitted or required; and contracted
                  technology providers.
                </p>
                <p className="mt-4">
                  Website providers currently include Netlify for hosting and
                  serverless form handling, Resend for transactional email,
                  Google reCAPTCHA for abuse prevention, CookieHub for consent
                  management, Google Analytics and Microsoft Clarity for
                  consented analytics, and the school’s application database
                  provider. Providers must act only for authorised purposes and
                  be subject to appropriate confidentiality, security and data
                  processing terms. We do not sell or rent personal information.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  9. Processing outside Zimbabwe
                </h2>
                <p className="mt-4">
                  Some hosting, email, security and analytics suppliers may
                  process or route information in countries outside Zimbabwe.
                  Before making such transfers, we must use a destination or
                  recipient providing adequate protection or another safeguard
                  or legal condition permitted by sections 28 and 29 of the Act.
                  The online application separately asks for unambiguous consent
                  to necessary overseas processing. Contact us for information
                  about the safeguard applicable to a particular transfer.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  10. Retention
                </h2>
                <p className="mt-4">
                  We keep identifiable information only for as long as needed
                  for the stated purpose. Retention is determined by the status
                  and duration of an application or school relationship, the
                  continuing need to operate a waiting list or answer an
                  enquiry, safeguarding and accounting requirements, applicable
                  limitation periods, legal obligations and the need to resolve
                  disputes. When the applicable period ends, information is
                  securely deleted, destroyed or anonymised. Cookie lifetimes
                  are described in the Cookie Policy and consent tool.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  11. Security and incident response
                </h2>
                <p className="mt-4">
                  We use proportionate technical and organisational controls
                  designed to protect confidentiality, integrity and
                  availability, including access restrictions, staff and
                  supplier controls, secure transmission, monitoring, backups
                  and incident procedures as appropriate to the risk. No online
                  system can be guaranteed completely secure.
                </p>
                <p className="mt-4">
                  Suspected personal-data incidents should be reported promptly
                  to admin@ruzawi.com. Where required, Ruzawi will notify the
                  Data Protection Authority within 24 hours of becoming aware
                  of a breach and affected individuals within the period
                  required for a likely high-risk breach.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  12. Your rights
                </h2>
                <p className="mt-4">
                  Subject to the Act and appropriate identity verification, a
                  data subject may ask to be informed about use of their
                  information; access information held about them; object to all
                  or part of the processing; correct false, misleading or
                  outdated information; delete false or misleading information;
                  withdraw consent without charge; and object free of charge to
                  direct marketing. A parent or legal guardian may exercise
                  these rights for a child.
                </p>
                <p className="mt-4">
                  Admissions decisions are not made solely by automated
                  processing. To exercise a right, contact us using section 1.
                  If a concern is not resolved, you may complain to the Data
                  Protection Authority, which is the Postal and
                  Telecommunications Regulatory Authority of Zimbabwe (POTRAZ),
                  through{" "}
                  <a
                    href="https://www.potraz.gov.zw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    potraz.gov.zw
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  13. Cookies, analytics and direct marketing
                </h2>
                <p className="mt-4">
                  Necessary cookies and technologies support core functions,
                  consent records and form security. Google Analytics and
                  Microsoft Clarity scripts are categorised as analytics and
                  are delayed unless analytics consent is given through
                  CookieHub. Consent may be changed at any time through the
                  footer’s cookie settings link. See our{" "}
                  <a href="/cookie-policy" className={linkClass}>
                    Cookie Policy
                  </a>{" "}
                  for details.
                </p>
                <p className="mt-4">
                  We will not use application details for unrelated direct
                  marketing without the consent or other authority required by
                  law. Marketing choices do not affect an application.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  14. Changes to this notice
                </h2>
                <p className="mt-4">
                  We may update this notice when our processing or legal duties
                  change. Material changes will be highlighted where
                  appropriate. The version displayed when an online application
                  is submitted is recorded with its consent declarations.
                </p>
              </section>

              <p className="border-t border-black/10 pt-8 text-sm text-[#35443a]/70">
                Version 21 August 2026 · Effective and last updated: 21 August
                2026
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
