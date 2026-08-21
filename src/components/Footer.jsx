import SectionIntro from "./SectionIntro";
import ImageLinkCard from "./ImageLinkCard";
import { footerButtons } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="bg-[#47778D] px-6 py-20 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="More from Ruzawi"
          title="Explore More from Ruzawi"
          body="Learn more about working at Ruzawi, keeping up with school life through our magazines, and staying connected through ROPA, the Ruzawi Old Pupils’ Association."
          light
        />

        <div className="grid gap-6 md:grid-cols-3">
          {footerButtons.map((item) => (
            <ImageLinkCard key={item.title} {...item} large />
          ))}
        </div>

        <div className="mt-12 border-t border-white/20 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/75">
              © {new Date().getFullYear()} Ruzawi School. All rights reserved.
            </p>

            <nav
              aria-label="Footer legal links"
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/80"
            >
              <a
                href="/privacy-policy"
                className="underline-offset-4 transition hover:text-white hover:underline"
              >
                Privacy Policy
              </a>

              <a
                href="/terms-of-use"
                className="underline-offset-4 transition hover:text-white hover:underline"
              >
                Terms of Use
              </a>

              <a
                href="/privacy-request"
                className="underline-offset-4 transition hover:text-white hover:underline"
              >
                Your Privacy Rights
              </a>

              <a
                href="/cookie-policy"
                className="underline-offset-4 transition hover:text-white hover:underline"
              >
                Cookie Policy
              </a>

              <button
                type="button"
                className="ch2-open-settings-btn underline-offset-4 transition hover:text-white hover:underline"
              >
                Cookie settings
              </button>
            </nav>
          </div>

          <p className="mt-4 max-w-4xl text-xs leading-6 text-white/70">
            Optional analytics, including Google Analytics and Microsoft
            Clarity, load only when you allow analytics cookies. You can change
            that choice at any time using “Cookie settings”.{" "}
            <a
              href="/privacy-policy"
              className="font-semibold underline underline-offset-4 transition hover:text-white"
            >
              Read our Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
