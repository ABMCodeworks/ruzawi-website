import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Page Not Found"
        description="The page you are looking for could not be found on the Ruzawi School website."
        path="/404"
        image="/images/seo-cover.webp"
      />

      <TopBar />

      <main className="pt-28">
        <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-12 lg:p-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#B6D7E7]/40" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#47778D]/10" />

            <div className="relative z-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="rounded-[2rem] bg-[#47778D] p-8 text-white shadow-lg md:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
                  Error 404
                </p>

                <h1 className="mt-5 font-serif text-7xl font-semibold leading-none md:text-8xl lg:text-9xl">
                  404
                </h1>

                <p className="mt-6 font-serif text-2xl leading-relaxed md:text-3xl">
                  This page seems to have wandered off.
                </p>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                  Page not found
                </p>

                <h2 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl">
                  We could not find the page you were looking for.
                </h2>

                <p className="mt-7 max-w-3xl text-lg leading-9 text-[#35443a] md:text-xl">
                  The page may have moved, the link may be out of date, or the
                  address may have been typed incorrectly. Please return to the
                  homepage or use the main menu to continue exploring Ruzawi.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/"
                    className="inline-flex justify-center rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D]"
                  >
                    Return Home
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex justify-center rounded-full border-2 border-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#00582C] transition hover:bg-[#00582C] hover:text-white"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Every Boy and Every Girl will find a place within our world.
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Ruzawi School
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
