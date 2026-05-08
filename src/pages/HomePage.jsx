import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import ImageLinkCard from "../components/ImageLinkCard";
import SectionIntro from "../components/SectionIntro";
import VideoCard from "../components/VideoCard";
import { quickLinks, featureStats } from "../data/siteData";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Ruzawi School"
        description="Ruzawi School is a co-educational Anglican preparatory boarding school near Marondera, Zimbabwe, where every boy and every girl will find a place within our world."
        path="/"
        image="/images/seo-cover.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-screen overflow-hidden bg-black">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/ruzawi-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-screen max-w-4xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]"
            >
              Ruzawi School
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="max-w-3xl font-serif text-4xl font-semibold leading-[1.08] text-white md:text-5xl lg:text-6xl"
            >
              Every Boy and Every Girl will find a place within our world
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="/online-applications"
                className="inline-flex rounded-full bg-[#00582C] px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl ring-1 ring-white/20 transition hover:bg-[#47778D] hover:text-white"
              >
                Apply Now
              </a>

              <a
                href="/why-ruzawi"
                className="inline-flex rounded-full border border-white/40 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[#00582C]"
              >
                Why Ruzawi
              </a>
            </motion.div>
          </div>
        </section>
        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Train up a child in the way he should go, And when he is old he
              will not depart from it.
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Proverbs 22:6
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {featureStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] bg-white p-7 text-center shadow-sm ring-1 ring-black/5"
              >
                <p className="font-serif text-4xl font-bold text-[#47778D]">
                  {stat.number}
                </p>

                <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#00582C]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                About Us
              </p>

              <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl">
                A small school with a strong family spirit
              </h2>

              <div className="mt-8 overflow-hidden rounded-[2rem] shadow-xl">
                <img
                  src="/images/ruzawi-campus.webp"
                  alt="Ruzawi School campus"
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 rounded-[2rem] bg-white p-8 text-lg leading-9 text-[#35443a] shadow-sm ring-1 ring-black/5 md:p-10">
              <p>
                Ruzawi School was established in 1928 by its joint founders,
                Canon Robert Grinham and Mr Maurice Carver, as a preparatory
                boarding school for boys. The school became fully co-educational
                in January 2003. Today, Ruzawi caters for children aged 6 to 12
                years. In the Infants’ Department, more commonly referred to as
                Kippers, there are two Grade One and two Grade Two classes. From
                Grade Three through to Grade Seven, there are two classes per
                grade with a maximum of 20 children in each class.
              </p>

              <p>
                The school is situated approximately five kilometres south of
                Marondera. It stands in extensive grounds surrounded by many
                hectares of indigenous woodland and eucalyptus plantations. The
                David Smith Dam, located on the northern boundary of the
                property, contributes to the school’s ideal rural setting,
                offering both space and opportunity for learning beyond the
                classroom.
              </p>

              <p>
                In addition to fourteen classrooms, the school’s facilities
                include a Chapel, a large school hall complete with a stage and
                facilities for drama performances, a well-resourced library
                including a reference classroom, an iMac lab, an art room, the
                Indigo Room for curriculum support, the Chat Room for
                counselling, an audio-visual classroom, a music centre with
                practice rooms and a school museum.
              </p>

              <p>
                On the boarding side, the school has two dining rooms and a
                sanatorium. There are specialised dormitories for infants and
                junior girls and all boys’ and girls’ dormitories have recently
                been refurbished.
              </p>

              <p>
                Ruzawi is a small school and, much like a family, it is
                sustained by a team of caring and dedicated staff who are deeply
                committed to the wellbeing, growth and development of every
                child in their care.
              </p>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionIntro
              eyebrow="Life at Ruzawi"
              title="Find your place"
              body="From academics and sport to boarding life and the Kipper Department, Ruzawi offers children a full and rounded school experience."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((item) => (
              <ImageLinkCard key={item.title} {...item} />
            ))}
          </div>
        </section>
        <section className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <a
                href="/welcome-from-the-headmaster"
                className="rounded-[2rem] bg-[#00582C] p-8 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
                  Welcome
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold">
                  Welcome from the Headmaster
                </h2>

                <p className="mt-5 text-lg leading-8 text-white/75">
                  A message of welcome, belonging and purpose from the heart of
                  Ruzawi School.
                </p>
              </a>

              <a
                href="/why-ruzawi"
                className="rounded-[2rem] bg-[#B6D7E7] p-8 text-[#00582C] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#00582C]/70">
                  Discover
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold">
                  Why Ruzawi
                </h2>

                <p className="mt-5 text-lg leading-8 text-[#00582C]/75">
                  Explore the rural setting, family atmosphere and opportunities
                  that make Ruzawi distinctive.
                </p>
              </a>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro eyebrow="Watch" title="Videos" body="" />

          <div className="grid gap-7 lg:grid-cols-3">
            <VideoCard
              title="Ruz Reflections"
              description="A glimpse at our school"
              src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D286701739578899&show_text=false&width=734"
            />

            <VideoCard
              title="Ruzawi Anthem"
              description="The School Singing our Anthem"
              src="/videos/ruzawi-anthem-open-day.mp4"
              type="video"
            />

            <VideoCard
              title="Cover of Follow You"
              description="Our cover of Follow You by Imagine Dragons"
              src="/videos/ruzawi-follow-you.mp4"
              image="/images/follow-you-video.webp"
              type="video"
            />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
