import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const governors = [
  {
    name: "Mrs M. Warren-Codrington",
    role: "Chairman",
  },
  {
    name: "Mr W. Kambwanji",
    role: "Vice-Chair",
  },
  {
    name: "Mrs L. Arnold",
    role: "",
  },
  {
    name: "Mr N. Grant",
    role: "",
  },
  {
    name: "Mrs S. Marriot-Dodington",
    role: "",
  },
  {
    name: "Mr J. Worsfold",
    role: "",
  },
  {
    name: "Mr G. Smith",
    role: "",
  },
  {
    name: "Mr P. Grinham",
    role: "",
  },
  {
    name: "Mr S. Hosack",
    role: "",
  },
  {
    name: "Mrs M. Mukonoweshuro",
    role: "",
  },
  {
    name: "Mr E. Mbofana",
    role: "Chair of Human Capital Development Committee",
  },
  {
    name: "Mr D. Charters",
    role: "Chair of Resources Committee",
  },
  {
    name: "Mr M. James",
    role: "Chair of Ruzawi Old Pupils Association",
  },
  {
    name: "Mr W. Kambwanji",
    role: "Chair of Financial Committee",
  },
  {
    name: "Mrs C. Howes",
    role: "Chair of Ruzawi Parents Association",
  },
  {
    name: "Mr C. Beattie",
    role: "Finance Controller and Projects Manager",
  },
];

export default function GovernancePage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Governance"
        description="Meet the Headmaster and Board of Governors of Ruzawi School, who guide the school with leadership, stewardship and shared purpose."
        path="/governance"
        image="/images/governance-hero.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/governance-hero.webp"
            alt="Ruzawi Headmaster and Board of Governors"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Governance
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Leadership, stewardship and shared purpose
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Ruzawi School is guided by experienced leadership and a committed
              Board of Governors who serve the long-term interests of the school
              community.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Governance at Ruzawi
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Headmaster and Board of Governors
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.2fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src="/images/headmaster.webp"
                  alt="Mr Brendon Brider, Headmaster of Ruzawi School"
                  className="h-[560px] w-full object-cover"
                />

                <div className="bg-[#00582C] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
                    Our Headmaster
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Mr Brendon Brider
                  </h2>

                  <p className="mt-4 leading-7 text-white/80">
                    Leading Ruzawi with passion, vision, care and shared
                    purpose.
                  </p>
                </div>
              </div>
            </aside>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Our Headmaster
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Mr Brendon Brider
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  Our Headmaster, Mr Brendon Brider, is a dedicated and
                  experienced Christian educator who leads Ruzawi School with
                  passion and vision. He holds an MSc in Educational Leadership
                  from the University of Leicester and a BSc (Hons) in Sports
                  Science from Manchester Metropolitan University. Brendon
                  brings a strong academic foundation to his role, along with a
                  genuine love of sport and of working with children.
                </p>

                <p>
                  Before joining Ruzawi, he served as Deputy Headmaster and
                  Divisional Head at St George’s College in Harare, where he was
                  also a teacher and coach. His leadership is driven by a
                  commitment to nurturing young minds and fostering a culture of
                  excellence, integrity and compassion, values that align
                  closely with Ruzawi’s ethos.
                </p>

                <p>
                  Brendon is married to Phillippa and their three children are
                  being educated at Ruzawi. He values family life deeply and
                  believes that a strong school community is built on care,
                  trust and shared purpose.
                </p>
              </div>

              <div className="mt-10 rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5">
                <p className="font-serif text-2xl leading-relaxed text-[#00582C]">
                  “A strong school community is built on care, trust and shared
                  purpose.”
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-10 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                  Board of Governors
                </p>

                <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl">
                  Serving the long-term good of Ruzawi
                </h2>
              </div>

              <p className="text-lg leading-9 text-[#35443a]">
                The Board of Governors supports the school through wise
                stewardship, strategic oversight and a commitment to Ruzawi’s
                values, heritage and future development.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src="/images/governors.webp"
                alt="Ruzawi Board of Governors"
                className="h-[360px] w-full object-cover md:h-[520px]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {governors.map((governor, index) => {
              const role = governor.role || "Board Member";

              return (
                <article
                  key={`${governor.name}-${index}`}
                  className="rounded-[2rem] bg-white p-7 text-[#10251c] shadow-sm ring-1 ring-black/5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#47778D]">
                    {role}
                  </p>

                  <h3 className="mt-4 font-serif text-2xl font-semibold text-[#00582C]">
                    {governor.name}
                  </h3>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[#47778D] shadow-xl">
            <div className="p-8 text-white md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#B6D7E7]">
                Shared stewardship
              </p>

              <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Guided by care, accountability and purpose
              </h2>

              <p className="mt-8 max-w-5xl text-lg leading-9 text-white/85">
                Ruzawi’s governance structure brings together educational
                leadership, strategic oversight and community representation to
                ensure that decisions are made with the wellbeing of pupils,
                staff and the school’s future at heart.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
