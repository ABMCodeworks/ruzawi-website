import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function JuniorMastersMistressesPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Junior Masters and Mistresses"
        description="Learn about becoming a Junior Master or Mistress at Ruzawi School and the opportunity to gain experience in teaching, coaching, boarding life and child development."
        path="/junior-masters-and-mistresses"
        image="/images/junior-masters-hero.webp"
      />

      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/junior-masters-hero.webp"
            alt="Junior Masters and Mistresses at Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Opportunities at Ruzawi
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Junior Masters and Mistresses
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              A unique opportunity for young adults to grow, serve and discover
              their strengths within a supportive school environment.
            </p>

            <div className="mt-9">
              <Link
                to="/junior-masters-and-mistresses/apply"
                className="inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D]"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Make a meaningful impact in the lives of children
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Junior Master & Mistress Programme
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src="/images/junior-masters.webp"
                  alt="Junior Masters and Mistresses"
                  className="h-[520px] w-full object-cover"
                />

                <div className="bg-[#00582C] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
                    Junior Master & Mistress Programme
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Serve, learn and grow
                  </h2>

                  <p className="mt-4 leading-7 text-white/80">
                    A structured opportunity to gain confidence, responsibility
                    and experience in school life.
                  </p>
                </div>
              </div>
            </aside>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Junior Masters and Mistresses
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                A chance to discover strengths and make a difference
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  Ruzawi offers a unique opportunity to young people who have
                  recently left high school and are keen to experience what
                  working life feels like within a supportive and structured
                  environment. The Junior Master and Mistress programme allows
                  young adults to discover interests and strengths they may not
                  yet realise they have, whether that be coaching a sport in the
                  afternoon or simply spending time engaging with children.
                </p>

                <p>
                  Being a Junior Master or Mistress provides countless
                  opportunities to make a meaningful impact in the lives of the
                  children. This may be on the sports field while playing touch
                  rugby, in the dormitories during games such as musical statues
                  or through shared moments like movie nights. These everyday
                  interactions play an important role in building trust,
                  confidence and connection.
                </p>

                <p>
                  Working in the classroom is often a highlight of the role.
                  Junior Masters and Mistresses gain valuable insight into
                  teaching methods and classroom management, particularly
                  through involvement in music lessons and play rehearsals.
                  Seeing the enjoyment and enthusiasm of the children makes the
                  experience both rewarding and memorable.
                </p>

                <p>
                  Beyond supporting the children, the programme also supports
                  the personal development of the Junior Masters and Mistresses
                  themselves. The system at Ruzawi encourages young adults to
                  learn how to balance responsibility, priorities and personal
                  wellbeing. Along the way, they develop vital life skills that
                  prepare them for future studies, careers and the wider world.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to="/junior-masters-and-mistresses/apply"
                  className="inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-[#47778D]"
                >
                  Apply to be a JM
                </Link>
              </div>
            </article>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
