import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import MainMenu from "./MainMenu";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-[#47778D]/95 shadow-xl backdrop-blur"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="/" className="flex items-center">
            <img
              src="/images/ruzawi-logo.webp"
              alt="Ruzawi School"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-16"
                }`}
            />
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-3 text-white md:flex">
              <a
                href="https://www.facebook.com/"
                aria-label="Ruzawi School Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-[#B6D7E7] hover:text-[#00582C]"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.instagram.com/"
                aria-label="Ruzawi School Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-[#B6D7E7] hover:text-[#00582C]"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="https://www.linkedin.com/"
                aria-label="Ruzawi School LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-[#B6D7E7] hover:text-[#00582C]"
              >
                <FaLinkedinIn size={16} />
              </a>
            </nav>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#00582C] shadow-lg transition hover:bg-[#B6D7E7]"
            >
              <HiMenuAlt3 size={28} />
            </button>
          </div>
        </div>
      </header>

      <MainMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
