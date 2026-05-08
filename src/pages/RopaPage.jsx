import { FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
const ropaLinks = [
  {
    label: "Email ROPA",
    value: "ropa@ruzawi.com",
    href: "mailto:ropa@ruzawi.com",
    icon: FaEnvelope,
  },
  {
    label: "Facebook",
    value: "Ruzawi Old Pupils",
    href: "https://www.facebook.com/ruzoldpupils/",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    value: "ruzawi.old.pupils.association",
    href: "https://www.instagram.com/ruzawi.old.pupils.association/",
    icon: FaInstagram,
  },
];

export default function RopaPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Ruzawi Old Pupils Association"
        description="Learn about the Ruzawi Old Pupils Association, commonly known as ROPA, and how old Ruzawians stay connected to the school and one another."
        path="/ropa-and-alumni"
        image="/images/ropa-hero.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/ropa-hero.webp"
            alt="Ruzawi Old Pupils Association"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              ROPA
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Ruzawi Old Pupils Association
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Keeping old Ruzawians connected to one another and to the school
              that helped shape them.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Once a Ruzawian, always part of the Ruzawi family
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Alumni, friendship and shared tradition
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.2fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src="/images/ropa.webp"
                  alt="Ruzawi Old Pupils Association"
                  className="h-[520px] w-full object-cover"
                />

                <div className="bg-[#00582C] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
                    Ruzawi Old Pupils Association
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Stay connected
                  </h2>

                  <p className="mt-4 leading-7 text-white/80">
                    Reunions, events, communication and lifelong relationships
                    among old Ruzawians.
                  </p>
                </div>
              </div>
            </aside>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Ruzawi Old Pupils Association
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                A lasting connection to Ruzawi
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  The Ruzawi Old Pupils Association, commonly known as ROPA,
                  plays an important role in maintaining the strong connection
                  between past pupils and the school. It exists to foster
                  lifelong relationships among old Ruzawians and to support the
                  continued growth and development of Ruzawi School.
                </p>

                <p>
                  ROPA provides a platform for former pupils to remain connected
                  with one another and with the school, regardless of where life
                  may take them. Through reunions, events and ongoing
                  communication, old pupils are encouraged to maintain
                  friendships formed during their time at Ruzawi and to pass on
                  the values and traditions that shaped them.
                </p>

                <p>
                  The association also plays a supportive role in the life of
                  the school. Old pupils contribute in a variety of ways,
                  including mentoring, sharing experiences, assisting with
                  projects and supporting initiatives that benefit current
                  pupils. This connection between past and present strengthens
                  the sense of community and continuity that is so central to
                  Ruzawi.
                </p>

                <p>
                  Being part of ROPA means remaining part of the wider Ruzawi
                  family. It is a reminder that Ruzawi is not simply a school
                  attended for a few years, but a place that leaves a lasting
                  imprint on those who pass through its gates.
                </p>
              </div>

              <div className="mt-10 rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5">
                <p className="font-serif text-2xl leading-relaxed text-[#00582C]">
                  “Ruzawi is not simply a school attended for a few years, but a
                  place that leaves a lasting imprint.”
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Connect with ROPA
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Keep in touch with the Old Pupils Association
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#35443a]">
                Follow ROPA online or get in touch by email to stay connected
                with news, reunions and the wider old pupils’ community.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {ropaLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto:") ? undefined : "noreferrer"
                    }
                    className="group rounded-[2rem] bg-[#f6f1e7] p-7 text-center shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:bg-[#00582C] hover:text-white hover:shadow-xl"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00582C] text-white transition group-hover:bg-white group-hover:text-[#00582C]">
                      <Icon size={24} />
                    </div>

                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#00582C] transition group-hover:text-white">
                      {link.label}
                    </h3>

                    <p className="mt-3 break-words text-sm font-semibold leading-6 text-[#35443a] transition group-hover:text-white/85">
                      {link.value}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
