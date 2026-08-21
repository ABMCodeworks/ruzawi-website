import TopBar from "../components/TopBar";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const linkClass = "font-bold text-[#00582C] underline underline-offset-4";

export default function CookiePolicyPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Cookie Policy | Ruzawi School"
        description="Learn which cookies and similar technologies Ruzawi School uses and manage your optional analytics choices."
        path="/cookie-policy"
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
              Cookie Policy
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              This policy explains the technologies used on our website and
              gives you control over optional analytics.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-12">
            <div className="space-y-10 text-base leading-8 text-[#35443a]">
              <div className="rounded-2xl bg-[#B6D7E7]/35 p-6 ring-1 ring-[#47778D]/20">
                <p className="font-bold text-[#00582C]">Your choice</p>
                <p className="mt-2">
                  Necessary technologies support the website and secure forms.
                  Google Analytics and Microsoft Clarity are optional and are
                  delayed unless you allow analytics.
                </p>
                <button
                  type="button"
                  className="ch2-open-settings-btn mt-5 inline-flex rounded-full bg-[#00582C] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#47778D]"
                >
                  Open cookie settings
                </button>
              </div>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  1. What cookies are
                </h2>
                <p className="mt-4">
                  Cookies are small text files stored on a browser or device.
                  Similar technologies include pixels, local storage, tags and
                  scripts that recognise a device, remember a choice, secure a
                  form or measure use of a website. Some expire when the browser
                  closes; others remain for a stated period or until deleted.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  2. Categories we use
                </h2>
                <div className="mt-5 overflow-x-auto rounded-2xl border border-black/10">
                  <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="bg-[#47778D] text-white">
                      <tr>
                        <th className="p-4">Category</th>
                        <th className="p-4">Purpose</th>
                        <th className="p-4">Choice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/10 bg-white">
                      <tr>
                        <th className="p-4 text-[#00582C]">Necessary</th>
                        <td className="p-4">
                          Records cookie choices, supports core delivery and
                          protects forms from automated abuse.
                        </td>
                        <td className="p-4">
                          Always active because the requested service cannot
                          operate reliably without them.
                        </td>
                      </tr>
                      <tr>
                        <th className="p-4 text-[#00582C]">Analytics</th>
                        <td className="p-4">
                          Measures visits and interactions so we can understand
                          and improve the website.
                        </td>
                        <td className="p-4">
                          Off until you consent; you may withdraw consent at any
                          time.
                        </td>
                      </tr>
                      <tr>
                        <th className="p-4 text-[#00582C]">
                          Preferences / marketing
                        </th>
                        <td className="p-4">
                          May support optional personalisation or advertising if
                          introduced and disclosed in the consent tool.
                        </td>
                        <td className="p-4">
                          We do not currently use these categories for Ruzawi
                          advertising; any future optional use requires the
                          relevant choice.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  3. Current services
                </h2>
                <ul className="mt-4 list-disc space-y-3 pl-6">
                  <li>
                    <strong>CookieHub:</strong> stores and applies your consent
                    choices. Its consent record is necessary.
                  </li>
                  <li>
                    <strong>Google reCAPTCHA:</strong> is loaded on forms to
                    distinguish genuine submissions from automated abuse. It is
                    treated as necessary for form security and may receive
                    device, browser and interaction information under Google’s
                    terms.
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> if allowed, measures
                    visits, pages, device/browser attributes, approximate
                    location and referral or campaign information.
                  </li>
                  <li>
                    <strong>Microsoft Clarity:</strong> if allowed, provides
                    aggregated behavioural metrics, heatmaps and session-replay
                    information. Form fields intended for personal information
                    should be masked or excluded from recordings.
                  </li>
                </ul>
                <p className="mt-4">
                  The cookie settings panel is the current service-and-cookie
                  inventory and may show specific cookie names, providers and
                  lifetimes identified by the latest scan. Provider-set
                  lifetimes may change; withdrawing consent stops future
                  optional collection and deletion through your browser removes
                  existing browser cookies.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  4. How consent works
                </h2>
                <p className="mt-4">
                  On a first visit, CookieHub asks whether optional categories
                  may be used. Rejecting analytics must be as easy as accepting
                  it. Google Analytics and Microsoft Clarity tags on this site
                  are marked for consent-based loading and should not execute
                  before analytics consent. Your choice is remembered so that
                  we do not ask on every page.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  5. Change or withdraw your choice
                </h2>
                <p className="mt-4">
                  Use “Cookie settings” in the footer or the button above at any
                  time. You may also delete or block cookies in browser settings,
                  although blocking necessary storage can cause consent prompts
                  to repeat or forms to work less reliably. Withdrawing consent
                  does not make earlier consented processing unlawful.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  6. Provider information
                </h2>
                <p className="mt-4">
                  These services may process information outside Zimbabwe. Read
                  the{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Google Privacy Policy
                  </a>
                  ,{" "}
                  <a
                    href="https://privacy.microsoft.com/privacystatement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Microsoft Privacy Statement
                  </a>{" "}
                  and our{" "}
                  <a href="/privacy-policy" className={linkClass}>
                    Privacy Policy
                  </a>{" "}
                  for more information.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-3xl font-semibold text-[#00582C]">
                  7. Contact and updates
                </h2>
                <p className="mt-4">
                  Questions about cookies or consent choices may be sent to{" "}
                  <a href="mailto:admin@ruzawi.com" className={linkClass}>
                    admin@ruzawi.com
                  </a>
                  . We may update this policy and the consent-tool inventory as
                  services change.
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
