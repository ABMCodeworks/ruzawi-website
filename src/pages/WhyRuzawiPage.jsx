import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const reasons = [
  {
    title: "A Strong Family Ethos",
    body: "Built on faith in Christ, Ruzawi is a true family community where staff, pupils and parents work together. Children are celebrated for their individuality and supported within a culture of honesty, humility, teamwork, sportsmanship and care.",
  },
  {
    title: "Holistic Education",
    body: "Ruzawi believes education is about far more than academics. Children are guided in developing grit, perseverance, responsibility, emotional awareness, friendships and leadership, so that they leave school not only well taught, but well prepared for life.",
  },
  {
    title: "A Place to Thrive",
    body: "Whether in the classroom, on the sports field, in the boarding houses or through special traditions and opportunities, children thrive at Ruzawi. Even sensitive children grow in confidence, independence and joy, supported by a caring pastoral structure and a rich range of experiences.",
  },
];

export default function WhyRuzawiPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Why Ruzawi"
        description="Discover why Ruzawi School is a family-centred preparatory boarding school near Marondera, Zimbabwe, built on faith, care, character and holistic education."
        path="/why-ruzawi"
        image="/images/why-ruzawi-hero.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/why-ruzawi-hero.webp"
            alt="Why Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Why Ruzawi
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              A place where every child can belong, grow and thrive
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              A family-centred school built on faith, character, care and the
              development of the whole child.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              “There is a special feeling when you enter Ruzawi”
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Something far beyond what you see on an open day
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.2fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src="/images/why-ruzawi.webp"
                  alt="Children at Ruzawi"
                  className="h-[520px] w-full object-cover"
                />

                <div className="bg-[#00582C] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
                    Ruzawi School
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    A true family community
                  </h2>

                  <p className="mt-4 leading-7 text-white/80">
                    Faith, care, opportunity and belonging are woven into daily
                    life.
                  </p>
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <article
                  key={reason.title}
                  className={`rounded-[2rem] p-8 shadow-sm ring-1 ring-black/5 md:p-10 ${
                    index === 1
                      ? "bg-[#00582C] text-white"
                      : "bg-white text-[#10251c]"
                  }`}
                >
                  <p
                    className={`text-sm font-bold uppercase tracking-[0.26em] ${
                      index === 1 ? "text-[#B6D7E7]" : "text-[#47778D]"
                    }`}
                  >
                    Reason {index + 1}
                  </p>

                  <h2
                    className={`mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl ${
                      index === 1 ? "text-white" : "text-[#00582C]"
                    }`}
                  >
                    {reason.title}
                  </h2>

                  <p
                    className={`mt-6 text-lg leading-9 ${
                      index === 1 ? "text-white/85" : "text-[#35443a]"
                    }`}
                  >
                    {reason.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 md:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                  The Ruzawi Feeling
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                  More than a school, a place of belonging
                </h2>

                <p className="mt-8 text-lg leading-9 text-[#35443a]">
                  Ruzawi’s strength lies in the way children are known,
                  supported and encouraged. From the classroom to the boarding
                  houses, from Chapel to sport and outdoor learning, each child
                  is given space to discover who they are and what they can
                  become.
                </p>

                <a
                  href="/online-applications"
                  className="mt-9 inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D] hover:text-white"
                >
                  Apply Now
                </a>
              </div>

              <div className="min-h-[380px]">
                <img
                  src="/images/why-ruzawi-landscape.webp"
                  alt="Ruzawi school life"
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
