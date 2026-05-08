import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function WelcomeHeadmasterPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Welcome from the Headmaster"
        description="Read a welcome message from the Headmaster of Ruzawi School, sharing the school’s values-driven approach to faith, learning, character and community."
        path="/welcome-from-the-headmaster"
        image="/images/headmaster-hero.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/headmaster-hero.webp"
            alt="Welcome from the Headmaster"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Welcome
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Welcome from the Headmaster
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              A values-driven message from the heart of Ruzawi School.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Built on the Rock of Faith in Christ
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Ruzawi School
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.2fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src="/images/headmaster.webp"
                  alt="Headmaster of Ruzawi School"
                  className="h-[520px] w-full object-cover"
                />

                <div className="bg-[#00582C] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
                    Headmaster
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Ruzawi School
                  </h2>

                  <p className="mt-4 leading-7 text-white/80">
                    Every boy and every girl is given the opportunity to
                    flourish.
                  </p>
                </div>
              </div>
            </aside>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Welcome from the Headmaster
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                We never stop learning
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  As Headmaster of Ruzawi School, I believe that we never stop
                  learning. As educators, we must continually strive to take
                  ourselves and our pupils to places we have not yet been. As
                  captured in our school anthem, “Built on the Rock of Faith in
                  Christ,” we strive to ensure that all we do at Ruzawi is
                  grounded in this foundation and guided by our core values.
                  This values-based approach enables our school community to
                  grow on a strong and positive footing, where every boy and
                  girl is given the opportunity to flourish. We aim to equip
                  each child with a moral compass that will serve them well
                  beyond their years at Ruzawi.
                </p>

                <p>
                  Leading Ruzawi with this as part of our mission allows me to
                  take a values-driven approach to leadership, with a deep
                  commitment to developing the whole child. I believe strongly
                  in balancing academic excellence with character formation and
                  I am passionate about creating an environment where every
                  pupil is known, supported and encouraged to grow in confidence
                  and independence.
                </p>

                <p>
                  We honour our rich heritage while embracing innovation in
                  teaching and learning. The strength of our community is
                  central to all we do and by fostering meaningful partnerships
                  between staff, pupils and parents we sustain a nurturing
                  boarding environment that is both structured and homely.
                </p>

                <p>
                  My wife and I are privileged to have our own children grow up
                  as part of the Ruzawi community and as pupils at the school. I
                  am immensely proud to serve as Headmaster of Ruzawi School.
                </p>
              </div>

              <div className="mt-10 rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5">
                <p className="font-serif text-2xl leading-relaxed text-[#00582C]">
                  “Every boy and girl is given the opportunity to flourish.”
                </p>
              </div>
            </article>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
