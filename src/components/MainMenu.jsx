import { motion, AnimatePresence } from "framer-motion";
import { menuGroups } from "../data/siteData";
import { getMenuHref } from "../utils/menuHref";

const groupHeadingLinks = {
  "Academic Life": "/academic-life",
  "Boarding Life": "/boarding-life",
  "School Life": "/school-life",
  "Sports & Clubs": "/sports-and-clubs",
  "Future Development": "/projects-and-venture-capital",
};

function getGroupHeadingHref(title) {
  return groupHeadingLinks[title] || null;
}

export default function MainMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[100] h-[100dvh] overflow-y-auto overscroll-contain bg-[#47778D] text-white shadow-2xl"
        >
          <div className="mx-auto flex min-h-[100dvh] max-w-7xl flex-col px-6 py-6 lg:px-8">
            <div className="sticky top-0 z-20 -mx-6 flex items-center justify-between border-b border-white/15 bg-[#47778D] px-6 pb-5 pt-1 lg:-mx-8 lg:px-8">
              <a href="/" onClick={onClose} className="flex items-center gap-4">
                <img
                  src="/images/ruzawi-logo.webp"
                  alt="Ruzawi School"
                  className="h-12 w-auto sm:h-14"
                />

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B6D7E7]">
                    Ruzawi School
                  </p>
                  <p className="font-serif text-xl font-semibold sm:text-2xl">
                    Main Menu
                  </p>
                </div>
              </a>

              <button
                onClick={onClose}
                className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#47778D] sm:px-5 sm:text-sm"
              >
                Close
              </button>
            </div>

            <div className="grid flex-1 gap-10 py-10 lg:grid-cols-[1.1fr_2fr] lg:items-start lg:py-12">
              <div>
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-[#B6D7E7]">
                  Every child belongs
                </p>

                <h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                  Every Boy and Every Girl will find a place within our world
                </h2>

                <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
                  Explore the people, places and programmes that shape life at
                  Ruzawi.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/online-applications"
                    onClick={onClose}
                    className="rounded-full bg-[#00582C] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#47778D]"
                  >
                    Apply Now
                  </a>

                  <a
                    href="/contact"
                    onClick={onClose}
                    className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#47778D]"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {menuGroups.map((group) => {
                  const headingHref = getGroupHeadingHref(group.title);

                  return (
                    <div key={group.title}>
                      {headingHref ? (
                        <a
                          href={headingHref}
                          onClick={onClose}
                          className="group mb-4 flex items-center justify-between border-b border-white/15 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B6D7E7] transition hover:text-white"
                        >
                          <span>{group.title}</span>

                          <span className="translate-x-0 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100">
                            →
                          </span>
                        </a>
                      ) : (
                        <h3 className="mb-4 border-b border-white/15 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#B6D7E7]">
                          {group.title}
                        </h3>
                      )}

                      <ul className="space-y-2">
                        {group.links.map((link) => (
                          <li key={link}>
                            <a
                              href={getMenuHref(link)}
                              onClick={onClose}
                              className="group flex items-center justify-between rounded-xl px-3 py-2 text-white/85 transition hover:bg-white/10 hover:text-white"
                            >
                              <span>{link}</span>

                              <span className="translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                                →
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-white/15 pb-8 pt-5 text-sm text-white/70 md:flex-row">
              <p>Ruzawi School, Marondera, Zimbabwe</p>

              <div className="flex gap-5">
                <a
                  href="https://www.facebook.com/"
                  className="transition hover:text-white"
                >
                  Facebook
                </a>

                <a
                  href="https://www.instagram.com/"
                  className="transition hover:text-white"
                >
                  Instagram
                </a>

                <a
                  href="https://www.linkedin.com/"
                  className="transition hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
