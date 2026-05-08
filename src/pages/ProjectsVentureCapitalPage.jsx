import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const projectItems = [
  {
    title: "Gum plantation",
    detail: "281 ha",
    body: "This is an existing project that has been very successfully managed by Curverid over the last 10 years. The lease was renegotiated in 2023 for another 10 years to ensure that the project continues to bring full value to both parties.",
  },
  {
    title: "Cattle project",
    detail: "Ruzawi herd",
    body: "This project is well underway and the “Ruzawi herd” has settled well into a fenced area on the Ruzawi estate, utilising all the grazing areas of the property. Ruzawi is working closely with a current parent and local farmer who has helped ensure that this project has become a reality. It will take time for the herd to grow, but there is much potential in the next few years for this to benefit the school in a wide variety of areas.",
  },
  {
    title: "Sale of Ruzawi Estate Land",
    detail: "Education Matters, 93 ha",
    body: "The sale of the land to Education Matters was finally concluded following the successful attainment of a Certificate of No Present Interest from the Zimbabwean Government. The idea is fully aligned to the principles and ethos of our founders, as Education Matters is a non-profit organisation that identifies Zimbabwean gifted children whose families do not have the financial means to educate them. They are educated for their A Level years in Zimbabwe and then the vast majority are placed into red-brick universities in the USA, with the aim of returning to Zimbabwe to give back to the community.",
    extra:
      "The funds realised from the sale have been used for infrastructural development including upgrading all public toilet facilities, Grade 1 and 2 classroom extensions including reading rooms, the Gibbs girls’ dorm extension with a new wing and an extra 20 beds, complete refurbishment of the Petty Cote Lane flats, completion of Winchester Pavilion, and partial refurbishment of the Headmaster’s Lodge, which is ongoing.",
  },
  {
    title: "Solar Park",
    detail: "7 ha, 5MW project",
    body: "This 5MW project has completed all geotechnical and topographical studies and has now been granted all the necessary approvals, such as GIA and SPV registration. Construction is now aimed to be completed by the end of 2026, following the further granting of Prescribed Asset Status, a Government Project Support Agreement and a Reserve Bank Letter of Comfort. All that remains to be achieved in the remainder of 2025 is project financial close.",
  },
  {
    title: "Residential eco-estate",
    detail: "Including staff retirement village",
    body: "The housing project, consisting of 35 units, aims to generate funds to build an extra 10 houses for staff, either retired or current, protect the boundary from Marondera town encroachment, and preserve the Miombo woodland environment.",
  },
];

const highlights = [
  {
    number: "281 ha",
    label: "Gum plantation",
  },
  {
    number: "5MW",
    label: "Solar Park project",
  },
  {
    number: "93 ha",
    label: "Education Matters land sale",
  },
  {
    number: "35",
    label: "Eco-estate housing units",
  },
];

export default function ProjectsVentureCapitalPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Projects and Venture Capital"
        description="Learn about Ruzawi School’s Projects and Venture Capital portfolio, including long-term development, estate projects, the solar park, cattle project and Vision 2020 and Beyond."
        path="/projects-and-venture-capital"
        image="/images/projects-venture-capital.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/projects-venture-capital.webp"
            alt="Ruzawi Projects and Venture Capital"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Projects & Venture Capital
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Planning responsibly for Ruzawi’s future
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Thoughtful, sustainable and purposeful development that supports
              pupils, staff and future generations.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Ruzawi Projects & Venture Capital
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Vision 2020 and Beyond
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Long-term development
              </p>

              <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl">
                Progress and tradition working hand in hand
              </h2>

              <div className="mt-8 overflow-hidden rounded-[2rem] shadow-xl">
                <img
                  src="/images/ruzawi-estate.webp"
                  alt="Ruzawi Estate"
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 rounded-[2rem] bg-white p-8 text-lg leading-9 text-[#35443a] shadow-sm ring-1 ring-black/5 md:p-10">
              <p>
                Ruzawi’s development is guided by a long-term vision that
                ensures the school continues to grow in a thoughtful,
                sustainable and purposeful manner. The Projects and Venture
                Capital portfolio exists to support this vision by identifying,
                planning and managing capital developments that enhance the
                learning environment and overall experience for pupils and
                staff.
              </p>

              <p>
                Over the years, Ruzawi has invested in a number of significant
                infrastructure projects aimed at improving facilities while
                preserving the character and heritage of the school. These
                projects are carefully considered and aligned with the school’s
                ethos, ensuring that progress and tradition work hand in hand.
              </p>

              <p>
                Capital development at Ruzawi is supported through a combination
                of careful financial planning, fundraising initiatives and the
                generosity of donors and old pupils. All projects are overseen
                with a strong emphasis on accountability, transparency and
                long-term benefit to the school community.
              </p>

              <p>
                The Projects and Venture Capital programme ensures that Ruzawi
                remains well equipped to meet the needs of current pupils while
                planning responsibly for future generations. Through this work,
                the school continues to provide an environment that supports
                academic excellence, pastoral care and the holistic development
                of every child.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] bg-white p-7 text-center shadow-sm ring-1 ring-black/5"
              >
                <p className="font-serif text-4xl font-bold text-[#47778D]">
                  {item.number}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#00582C]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                  Vision 2020 and Beyond
                </p>

                <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl">
                  Making full and careful use of the Ruzawi Estate
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  Ruzawi’s “Vision 2020 and Beyond” included consideration of a
                  variety of projects and additional income streams in order to
                  better utilise the school’s land holdings, both the
                  agricultural and institutional zoned properties, and to
                  supplement efforts in raising money through benefactor funding
                  for the school’s future development.
                </p>

                <p>
                  With the above in mind, the Board of Governors approved and
                  fully supported the possibility of the following projects on
                  the Ruzawi Estate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
              Estate projects
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
              Projects under consideration and development
            </h2>
          </div>

          <div className="grid gap-6">
            {projectItems.map((item, index) => (
              <article
                key={item.title}
                className={`overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-black/5 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#00582C] text-white"
                }`}
              >
                <div className="grid gap-0 lg:grid-cols-[0.45fr_1fr]">
                  <div
                    className={`flex flex-col justify-between p-8 md:p-10 ${
                      index % 2 === 0 ? "bg-[#B6D7E7]" : "bg-[#47778D]"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-black uppercase tracking-[0.22em] ${
                          index % 2 === 0 ? "text-[#00582C]" : "text-[#B6D7E7]"
                        }`}
                      >
                        Project {index + 1}
                      </p>

                      <h3
                        className={`mt-5 font-serif text-4xl font-semibold leading-tight ${
                          index % 2 === 0 ? "text-[#00582C]" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className={`mt-8 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] ${
                        index % 2 === 0
                          ? "bg-white text-[#00582C]"
                          : "bg-white/15 text-white"
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>

                  <div className="p-8 md:p-10">
                    <div
                      className={`space-y-6 text-lg leading-9 ${
                        index % 2 === 0 ? "text-[#35443a]" : "text-white/85"
                      }`}
                    >
                      <p>{item.body}</p>
                      {item.extra && <p>{item.extra}</p>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[#00582C] shadow-xl">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 text-white md:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#B6D7E7]">
                  Future generations
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
                  A school estate planned with purpose
                </h2>

                <p className="mt-8 text-lg leading-9 text-white/85">
                  Through careful planning, strategic partnerships and
                  responsible stewardship, Ruzawi continues to protect its
                  heritage while developing facilities and opportunities that
                  will benefit pupils and staff for years to come.
                </p>
              </div>

              <div className="min-h-[360px]">
                <img
                  src="/images/ruzawi-projects-landscape.webp"
                  alt="Ruzawi development projects"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
