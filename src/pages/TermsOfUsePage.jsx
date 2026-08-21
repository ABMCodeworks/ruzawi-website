import TopBar from "../components/TopBar";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const linkClass = "font-bold text-[#00582C] underline underline-offset-4";

export default function TermsOfUsePage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Terms of Use | Ruzawi School"
        description="Terms governing access to the Ruzawi School website, electronic applications, submitted content and online information."
        path="/terms-of-use"
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
              Terms of Use
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              These terms govern access to our website and the use of its online
              information, forms and application services.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-12">
            <div className="space-y-10 text-base leading-8 text-[#35443a]">
              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  1. About these terms
                </h2>
                <p className="mt-4">
                  This website is operated by Ruzawi School, Ruzawi Road,
                  Marondera, Zimbabwe. By accessing the website, you agree to
                  these Terms of Use. If you submit an application, you also
                  make the specific declarations shown beside the submission
                  button. Our{" "}
                  <a href="/privacy-policy" className={linkClass}>
                    Privacy Policy
                  </a>{" "}
                  explains how personal information is handled.
                </p>
                <p className="mt-4">
                  If you submit information for another person, you confirm
                  that you are at least 18, have legal capacity to do so and
                  have the authority and permissions described on the form.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  2. Information, not an offer
                </h2>
                <p className="mt-4">
                  Website content is general information and an invitation to
                  enquire or apply. Unless Ruzawi confirms otherwise in a formal
                  written agreement, it is not an offer, guarantee or binding
                  commitment. Dates, fees, programmes, places, policies,
                  facilities and procedures may change. Please confirm
                  time-sensitive or material information with the school before
                  relying on it or making payment.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  3. Admissions and electronic applications
                </h2>
                <p className="mt-4">
                  Submitting an application records a request for consideration;
                  it does not guarantee acknowledgement by a particular time,
                  assessment, a place, entry in a particular grade or boarding
                  arrangement, or admission. Applications remain subject to the
                  school’s admissions process, verification, assessments,
                  availability and any formal enrolment terms.
                </p>
                <p className="mt-4">
                  You must review entries before submission and provide complete,
                  accurate and current information. The typed legal-custodian
                  name, capacity, date, required checkboxes, notice version and
                  submission timestamp form part of the electronic application
                  record. Contact the Registrar promptly to correct a material
                  error. We may reject or pause a submission that is incomplete,
                  misleading, unauthorised, unsafe or technically corrupted.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  4. Application fees and payments
                </h2>
                <p className="mt-4">
                  Any registration or application fee, accepted payment method
                  and banking instructions are those displayed on the
                  application page or confirmed by the school at the time of
                  payment. Use the requested reference and upload proof of
                  payment only through the designated process. Verify any
                  unexpected request to change bank details directly with the
                  Registrar before paying.
                </p>
                <p className="mt-4">
                  Payment of an application fee does not guarantee admission.
                  Any applicable cancellation or refund position must be
                  confirmed with the Registrar and remains subject to rights
                  that cannot be excluded under Zimbabwean consumer law.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  5. Acceptable use
                </h2>
                <p className="mt-4">You must not:</p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>break any law or infringe another person’s rights;</li>
                  <li>
                    gain or attempt unauthorised access, probe security, evade
                    controls, overload the service or introduce harmful code;
                  </li>
                  <li>
                    impersonate another person or submit false, misleading,
                    unlawful or unnecessary sensitive information;
                  </li>
                  <li>
                    scrape, copy or use the website or its data at scale without
                    written permission; or
                  </li>
                  <li>
                    use photographs, names or other content in a way that harms
                    the privacy, dignity or safety of pupils, families or staff.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  6. Uploads and information you submit
                </h2>
                <p className="mt-4">
                  You retain ownership of material you submit. You give Ruzawi a
                  limited permission to receive, copy, store, review, verify and
                  communicate that material only as reasonably needed for the
                  form’s stated purpose, school administration, security and
                  legal compliance. You confirm that you have the right to
                  submit it and that it does not contain malware or unlawfully
                  disclose another person’s information.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  7. Ruzawi content and intellectual property
                </h2>
                <p className="mt-4">
                  Unless stated otherwise, website text, design, logos,
                  photographs, audio, video, graphics and other materials are
                  owned by Ruzawi or used with permission and are protected by
                  applicable intellectual-property law. You may view and print
                  a reasonable amount for personal, non-commercial information.
                  No other copying, alteration, republication, commercial use or
                  removal of rights notices is permitted without prior written
                  permission.
                </p>
                <p className="mt-4">
                  Contact admin@ruzawi.com if you believe material infringes
                  rights or if an image involving you or your child should be
                  reviewed.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  8. Third-party services and links
                </h2>
                <p className="mt-4">
                  Links and third-party tools are provided for functionality or
                  convenience. Their own terms and privacy notices may apply.
                  Ruzawi does not control external content and does not endorse
                  every statement on a linked site. Nothing here excludes
                  responsibility for our selection or use of a provider where
                  the law makes us responsible.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  9. Availability and security
                </h2>
                <p className="mt-4">
                  We take reasonable steps to maintain and secure the website,
                  but do not promise that it will always be available, error-free
                  or compatible with every device. We may maintain, change,
                  suspend or withdraw features. You are responsible for your own
                  device, connectivity, backups and safe handling of account or
                  payment communications.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  10. Responsibility and mandatory rights
                </h2>
                <p className="mt-4">
                  To the extent permitted by law, Ruzawi is not liable for
                  indirect or consequential loss caused solely by reliance on
                  general website content, an external site, or circumstances
                  outside our reasonable control. Nothing in these terms limits
                  liability for fraud, wilful misconduct, death or personal
                  injury caused by negligence, breach of data-protection duties,
                  or any consumer or other right that Zimbabwean law does not
                  allow us to exclude or limit.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  11. Privacy and cookies
                </h2>
                <p className="mt-4">
                  Personal information is handled under our{" "}
                  <a href="/privacy-policy" className={linkClass}>
                    Privacy Policy
                  </a>
                  . Our{" "}
                  <a href="/cookie-policy" className={linkClass}>
                    Cookie Policy
                  </a>{" "}
                  describes necessary technologies and optional analytics and
                  explains how to change choices.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  12. Governing law and concerns
                </h2>
                <p className="mt-4">
                  These terms are governed by the laws of Zimbabwe. Please first
                  send a concern to admin@ruzawi.com so that we can try to
                  resolve it. If it cannot be resolved, the courts or other
                  competent authorities of Zimbabwe may hear the matter. This
                  does not remove a mandatory right to approach a regulator,
                  consumer body or court.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  13. Changes and general provisions
                </h2>
                <p className="mt-4">
                  We may update these terms prospectively by publishing a new
                  version and date. The terms recorded when an application is
                  submitted govern that electronic submission unless law or a
                  later signed agreement requires otherwise. If a provision is
                  unlawful or unenforceable, the remaining provisions continue
                  to the extent permitted. A delay in enforcing a provision is
                  not a waiver.
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
