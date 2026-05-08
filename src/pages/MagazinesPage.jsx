import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import { FaFilePdf, FaDownload, FaEye } from "react-icons/fa";
import SEO from "../components/SEO";

const magazineFiles = import.meta.glob("../assets/magazines/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

function formatMagazineTitle(path) {
  const fileName = path.split("/").pop() || "";

  return fileName
    .replace(".pdf", "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getMagazineYear(path) {
  const match = path.match(/(20\d{2}|19\d{2})/);
  return match ? match[0] : "Magazine";
}

const magazines = Object.entries(magazineFiles)
  .map(([path, url]) => ({
    title: formatMagazineTitle(path),
    year: getMagazineYear(path),
    url,
    fileName: path.split("/").pop(),
  }))
  .sort((a, b) => {
    const yearA = Number(a.year);
    const yearB = Number(b.year);

    if (!Number.isNaN(yearA) && !Number.isNaN(yearB)) {
      return yearB - yearA;
    }

    return a.title.localeCompare(b.title);
  });

export default function MagazinesPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Ruzawi Magazines"
        description="Browse and download Ruzawi School magazines, featuring stories, memories, events, achievements and moments from school life."
        path="/magazines"
        image="/images/magazines.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/magazines.webp"
            alt="Ruzawi Magazines"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Ruzawi Magazines
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Stories, memories and moments from school life
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Browse Ruzawi magazines and look back at the people, events,
              achievements and traditions that shape life at the school.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Ruzawi School Magazines
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              View or download available PDFs
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Archive
              </p>

              <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl">
                Magazine Library
              </h2>
            </div>

            <p className="text-lg leading-9 text-[#35443a]">
              Each magazine opens as a PDF in a new tab. You can also download a
              copy directly from the card.
            </p>
          </div>

          {magazines.length === 0 ? (
            <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#B6D7E7] text-[#00582C]">
                <FaFilePdf size={32} />
              </div>

              <h3 className="mt-6 font-serif text-3xl font-semibold text-[#00582C]">
                No magazines found
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#35443a]">
                Add PDF files to{" "}
                <span className="font-bold text-[#00582C]">
                  src/assets/magazines
                </span>{" "}
                and they will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {magazines.map((magazine) => (
                <article
                  key={magazine.fileName}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="bg-[#00582C] p-8 text-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B6D7E7]">
                          {magazine.year}
                        </p>

                        <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                          {magazine.title}
                        </h3>
                      </div>

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                        <FaFilePdf size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="break-words text-sm leading-6 text-[#35443a]">
                      {magazine.fileName}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={magazine.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#00582C] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#47778D]"
                      >
                        <FaEye size={14} />
                        View
                      </a>

                      <a
                        href={magazine.url}
                        download={magazine.fileName}
                        className="inline-flex items-center gap-2 rounded-full border border-[#00582C]/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#00582C] transition hover:bg-[#B6D7E7]"
                      >
                        <FaDownload size={14} />
                        Download
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <Footer />
      </main>
    </div>
  );
}
