import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const traditionHighlights = [
  {
    title: "Founded in 1928",
    body: "Ruzawi School was founded on 3 February 1928, and many traditions still connect today’s pupils with the earliest days of the school.",
  },
  {
    title: "Flag Ceremony",
    body: "Flag Up and Flag Down teach pupils respect, honour, stillness, pride and responsibility.",
  },
  {
    title: "The Colour Party",
    body: "The pupils chosen to carry and raise the flag are entrusted with an important and meaningful school duty.",
  },
];

export default function TraditionRuzawiPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Tradition at Ruzawi"
        description="Explore the traditions of Ruzawi School, including the Flag Ceremony, Colour Party and customs that have shaped school life since 1928."
        path="/tradition-at-ruzawi"
        image="/images/tradition-hero.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/tradition-hero.webp"
            alt="Tradition at Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Tradition at Ruzawi
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Honouring the traditions that shape who we are
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              From the earliest days of Ruzawi, tradition has helped pupils
              understand pride, respect, honour and belonging.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Founded on 3 February 1928
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Flag Up and Flag Down
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.2fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src="/images/flag-ceremony.webp"
                  alt="Ruzawi Flag Ceremony"
                  className="h-[540px] w-full object-cover"
                />

                <div className="bg-[#00582C] p-8 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
                    A living tradition
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Flag Up and Flag Down
                  </h2>

                  <p className="mt-4 leading-7 text-white/80">
                    A ceremony of respect, stillness, pride and belonging.
                  </p>
                </div>
              </div>
            </aside>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Tradition at Ruzawi
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Traditions with meaning and purpose
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  Ruzawi School was founded on 3 February 1928 and from the very
                  beginning tradition has played an important role in shaping
                  the school we know today. Some traditions may seem unnecessary
                  at first glance, yet each one holds meaning and purpose. The
                  daily Flag Ceremony is one such tradition.
                </p>

                <p>
                  It can seem pointless to stand still, be inspected by the
                  Headmaster, currently Mr Brider, and then watch a flag being
                  raised or lowered before carrying on with the day. However,
                  flags have great significance throughout the world and it is
                  important that our children learn how to honour and respect
                  them.
                </p>

                <p>
                  Each day Mr Chimwayange raises the Zimbabwe Flag on Flag Lawn.
                  Almost as important to us is our Ruzawi Flag, which is raised
                  on a Monday and lowered on a Friday. In earlier years, when
                  Ruzawi was a full boarding school, this ceremony took place on
                  Sundays.
                </p>

                <p>
                  The three pupils chosen to march to the flagpole are known as
                  the Colour Party. Another name for a flag is “Colours” and it
                  is a great honour to carry the carefully folded flag, attach
                  it to the halyard and raise it to fly from the top of the
                  pole.
                </p>

                <p>
                  At this wonderful school of ours, the ceremony of Flag Up and
                  Flag Down started right at the beginning of Ruzawi in 1928.
                  Early photographs show groups of boys digging a large hole and
                  others pushing a flagpole into place. From those earliest
                  days, pupils stood exactly as they do now, dressed smartly in
                  Number Ones, shoes polished and proud to be at Ruzawi.
                </p>

                <p>
                  The school would stand around the perimeter of Flag Lawn,
                  first at ease, absolutely still with no fidgeting or talking,
                  waiting for the important moment when the Headmaster, then
                  Canon Grinham and now Mr Brider, inspected each pupil. They
                  would then stand to attention, again perfectly still, arms by
                  their sides and feet together, as the Colour Party marched
                  forward and raised the Ruzawi Flag while the school watched it
                  flutter in the breeze.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {traditionHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5 md:p-8"
              >
                <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                  {item.title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-[#35443a]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-[#00582C] shadow-xl">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 text-white md:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#B6D7E7]">
                  Pride and belonging
                </p>

                <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-5xl">
                  Standing still, standing proud
                </h2>

                <p className="mt-8 text-lg leading-9 text-white/85">
                  The Flag Ceremony is more than a daily routine. It is a moment
                  of shared identity, discipline and respect, linking present
                  pupils with generations of Ruzawians who have stood on Flag
                  Lawn before them.
                </p>
              </div>

              <div className="min-h-[360px]">
                <img
                  src="/images/tradition-landscape.webp"
                  alt="Ruzawi tradition"
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
