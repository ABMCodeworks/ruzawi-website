import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const schoolLifeTabs = [
  {
    id: "chapel",
    label: "Chapel",
  },
  {
    id: "charities-we-support",
    label: "Charities We Support",
  },
  {
    id: "leadership-at-ruzawi",
    label: "Leadership at Ruzawi",
  },
  {
    id: "learning-knights-award",
    label: "Learning Knights Award",
  },
  {
    id: "outdoor-education",
    label: "Outdoor Education",
  },
  {
    id: "ruzchats-life-skills-and-the-chat-room",
    label: "RuzChats, Life Skills and The Chat Room",
  },
  {
    id: "world-peace-games",
    label: "World Peace Games",
  },
];

const schoolLifeCards = [
  {
    title: "Faith & Reflection",
    body: "Chapel provides space for worship, reflection and the teaching of Christian values.",
  },
  {
    title: "Service & Compassion",
    body: "Charity work helps pupils learn generosity, kindness and responsibility.",
  },
  {
    title: "Leadership",
    body: "Grade Seven pupils are encouraged to lead through service, responsibility and example.",
  },
  {
    title: "Growth Beyond Classrooms",
    body: "Outdoor Education, Life Skills and the World Peace Game support holistic development.",
  },
];

const charities = [
  {
    title: "KidzCan",
    body: [
      "KidzCan supports children with cancer and their families. This is our largest charity at Ruzawi and it is one that the children take real ownership of. Pupils raise money through their own initiatives, often coming up with creative ways to build awareness and encourage others to support the cause.",
      "An award is presented to the child who has put in the most effort to raise funds and awareness for KidzCan. This is always a meaningful moment, celebrating compassion, initiative and perseverance.",
    ],
  },
  {
    title: "Island Hospice",
    body: [
      "Island Hospice is a palliative care organisation that supports people who are seriously ill and helps families through their loved one’s illness and the loss that follows. Ruzawi supports the Marondera branch and runs events across the year to raise money for their important work.",
      "It is a cause that reminds all of us of the value of care, dignity and community during life’s most difficult seasons.",
    ],
  },
  {
    title: "Borradaile Trust",
    body: [
      "The Borradaile Trust is our local old age home in Marondera. Ruzawi supports the Trust in a number of practical ways. We collect goodies for Christmas hampers and invite residents to come and enjoy our plays and music concerts.",
      "As part of the Learning Knights Award, our Grade Seven pupils visit the Trust for community service and help wherever they can. These visits are often deeply meaningful, teaching respect, kindness and the importance of giving time, not only resources.",
    ],
  },
  {
    title: "Centre for Total Transformation",
    body: [
      "The Centre for Total Transformation, or CTT, is an orphanage in Harare that supports children through their schooling. Towards the end of the year, Ruzawi collects clothing, stationery and furniture which are delivered to CTT.",
      "Pupils taking part in the Learning Knights Award help to deliver these donations at the end of the year, reinforcing the value of service and the impact of practical support.",
    ],
  },
  {
    title: "SPCA",
    body: [
      "The SPCA supports animals who cannot speak for themselves. Ruzawi has fundraised for the SPCA to help them establish a branch in Marondera.",
      "Although we do not raise money for them every year, they remain close to our hearts and we get involved in anything we can to support the Marondera branch.",
    ],
  },
];

export default function SchoolLifePage() {
  const [activeTab, setActiveTab] = useState("chapel");
  const location = useLocation();

  const activeLabel = useMemo(() => {
    return schoolLifeTabs.find((tab) => tab.id === activeTab)?.label;
  }, [activeTab]);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);

    if (!element) return;

    setActiveTab(id);

    setTimeout(() => {
      const yOffset = window.innerWidth < 1024 ? -210 : -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 100);
  }, [location.hash]);

  useEffect(() => {
    function updateActiveTab() {
      const offset = window.innerWidth < 1024 ? 220 : 150;
      let currentId = schoolLifeTabs[0].id;

      for (const tab of schoolLifeTabs) {
        const section = document.getElementById(tab.id);

        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= offset) {
          currentId = tab.id;
        }
      }

      setActiveTab(currentId);
    }

    updateActiveTab();

    window.addEventListener("scroll", updateActiveTab, { passive: true });
    window.addEventListener("resize", updateActiveTab);

    return () => {
      window.removeEventListener("scroll", updateActiveTab);
      window.removeEventListener("resize", updateActiveTab);
    };
  }, []);

  function handleTabClick(id) {
    setActiveTab(id);

    const element = document.getElementById(id);

    if (element) {
      const yOffset = window.innerWidth < 1024 ? -210 : -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="School Life"
        description="Discover school life at Ruzawi, including Chapel, charities, leadership, the Learning Knights Award, Outdoor Education, RuzChats, Life Skills and the World Peace Game."
        path="/school-life"
        image="/images/school-life.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/school-life.webp"
            alt="School life at Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-4xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              School Life
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Faith, service, leadership and character
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              School life at Ruzawi helps children grow in confidence,
              compassion, responsibility and purpose.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              School Life at Ruzawi
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              {activeLabel}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1500px] gap-10 px-6 py-10 lg:grid-cols-[300px_1fr] lg:px-8 lg:py-16 2xl:px-10">
          <aside className="sticky top-20 z-30 self-start lg:top-28">
            <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[1.5rem] bg-white shadow-xl ring-1 ring-black/5 lg:rounded-[2rem]">
              <div className="bg-[#00582C] px-5 py-4 lg:px-6 lg:py-5">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white">
                  School Life
                </p>
              </div>

              <nav className="space-y-2 p-3">
                {schoolLifeTabs.map((tab) => {
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-xs font-bold transition sm:text-sm lg:px-5 lg:py-4 ${
                        isActive
                          ? "bg-[#47778D] text-white shadow-md"
                          : "bg-[#f6f1e7] text-[#00582C] hover:bg-[#B6D7E7]"
                      }`}
                    >
                      <span>{tab.label}</span>

                      <span
                        className={`ml-3 shrink-0 transition ${
                          isActive ? "translate-x-1" : ""
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="space-y-12">
            <section
              id="chapel"
              className="scroll-mt-56 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    Chapel
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    At the heart of life at Ruzawi
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      The Chapel lies at the heart of life at Ruzawi and plays a
                      central role in nurturing the spiritual wellbeing of our
                      school community. Rooted in the Anglican tradition, Chapel
                      provides a space for reflection, worship and the teaching
                      of Christian values that guide daily life at the school.
                    </p>

                    <p>
                      Children attend Chapel regularly and services are designed
                      to be meaningful, inclusive and age appropriate. Through
                      prayer, scripture, hymns and thoughtful messages, pupils
                      are encouraged to reflect on their actions, consider their
                      relationships with others and grow in faith and character.
                    </p>

                    <p>
                      Chapel services also provide an opportunity to celebrate
                      achievements, mark important moments in the school
                      calendar and come together as a community.
                    </p>
                  </div>
                </div>

                <div className="min-h-[520px]">
                  <img
                    src="/images/chapel.webp"
                    alt="Ruzawi Chapel"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {schoolLifeCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="font-serif text-2xl font-semibold text-[#00582C]">
                    {card.title}
                  </h3>

                  <p className="mt-4 leading-7 text-[#3f5148]">{card.body}</p>
                </div>
              ))}
            </section>

            <section
              id="charities-we-support"
              className="scroll-mt-56 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Charities We Support
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Teaching service, generosity and compassion
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  At Ruzawi we believe that raising children well includes
                  teaching them to look beyond themselves. Service, generosity
                  and compassion are values woven into school life and our
                  pupils are encouraged to give with purpose, not just because
                  it is expected, but because it matters.
                </p>

                <p>
                  Throughout the year the school community supports a number of
                  charities and causes that are close to our hearts.
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-[2rem] shadow-md">
                <img
                  src="/images/charities-we-support.webp"
                  alt="Charities supported by Ruzawi"
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              </div>

              <div className="mt-10 grid gap-6">
                {" "}
                {charities.map((charity) => (
                  <article
                    key={charity.title}
                    className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8"
                  >
                    <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                      {charity.title}
                    </h3>

                    <div className="mt-6 space-y-5 text-lg leading-9 text-[#35443a]">
                      {charity.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <p className="mt-10 text-lg leading-9 text-[#35443a]">
                We are grateful to our pupils, parents and staff for supporting
                these causes with such generosity. These moments of giving help
                to shape children who grow into thoughtful, responsible and
                compassionate young people.
              </p>
            </section>

            <section
              id="leadership-at-ruzawi"
              className="scroll-mt-56 rounded-[2rem] bg-[#00582C] p-8 text-white shadow-xl md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#B6D7E7]">
                Leadership at Ruzawi
              </p>

              <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Leadership through responsibility and service
              </h2>

              <div className="mt-8 grid gap-8 xl:grid-cols-2">
                <div className="space-y-6 text-lg leading-9 text-white/85">
                  <p>
                    During their Grade Seven year, all pupils at Ruzawi are
                    expected to fulfil a leadership role. Each child is given
                    responsibilities that contribute to the smooth and effective
                    running of daily school life. These duties include ringing
                    the bell, overseeing tables during mealtimes, lighting
                    candles in the Chapel and collecting lost property at the
                    end of the day.
                  </p>

                  <p>
                    Through these responsibilities, it quickly becomes clear
                    which children understand the importance of reliability,
                    initiative and efficiency.
                  </p>

                  <p>
                    To extend leadership further, a trial period takes place in
                    which all Grade Seven pupils are exposed to the duties of
                    the Senior Monitors who serve during the second and third
                    terms. These pupils assist in key areas of the school such
                    as the Chapel, Dining Room, Hall and dormitories and support
                    standards of manners, dress, punctuality and organisation.
                  </p>

                  <p>
                    During this period, children are given the opportunity to
                    demonstrate their ability to manage time effectively and
                    take on additional responsibility.
                  </p>

                  <p>
                    Leadership also plays an important role on the sports field.
                    In their final year, Grade Seven pupils are given
                    opportunities to serve as team captains and leaders within
                    their sporting codes. Their progress is closely observed and
                    pupils are encouraged to reflect on their experiences and
                    growth.
                  </p>
                </div>

                <div className="space-y-6 text-lg leading-9 text-white/85">
                  <p>
                    Senior Monitors are selected during the Second Term after
                    all members of staff have had the opportunity to share their
                    views. Once appointed, monitors are allocated classes to
                    support and specific roles to fulfil. Each receives a
                    leadership file containing relevant information and attends
                    weekly meetings with the Deputy Head and senior staff to
                    discuss responsibilities and experiences.
                  </p>

                  <p>
                    Leadership at Ruzawi is modelled on the example of Jesus
                    Christ and is underpinned by values such as honesty,
                    integrity, service, responsibility, initiative, industry and
                    sensitivity to others.
                  </p>

                  <p>
                    In recent years, leadership opportunities have been
                    broadened to include a wider range of pupils. The
                    introduction of Chapel, Music, IT, Sports, Science, Art and
                    Library Monitors has allowed children to lead in areas that
                    suit their individual strengths.
                  </p>

                  <p>
                    Pupils not selected for these roles serve as Rotating
                    Monitors, spending two weeks on duty followed by two weeks
                    off. This system ensures that responsibility is shared and
                    balanced.
                  </p>

                  <p>
                    The introduction of Ruzawi Families has created further
                    leadership opportunities, with every Grade Seven pupil given
                    the chance to lead a Family group for the year.
                  </p>

                  <p>
                    We recognise the importance of teaching leadership from a
                    young age. As Proverbs 22 verse 6 reminds us, “Train a child
                    in the way he should go and when he is old he will not turn
                    from it.” Leadership structures at Ruzawi are continually
                    reviewed and strengthened with the aim of developing
                    confident, responsible and compassionate young people.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="learning-knights-award"
              className="scroll-mt-56 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Learning Knights Award
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Growth, service and personal progress
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  The Learning Knights Award is a culminating programme designed
                  for our Grade Seven pupils and reflects the values and ethos
                  at the heart of Ruzawi. The award encourages pupils to develop
                  leadership, responsibility, service and personal organisation
                  as they prepare to move on to senior school.
                </p>

                <p>
                  Through the Learning Knights Award, children are challenged to
                  step beyond their comfort zones and take ownership of their
                  growth. Pupils work towards a range of requirements that
                  promote independence, commitment and perseverance.
                </p>

                <p>
                  These include setting personal goals, contributing
                  meaningfully to the school community and demonstrating
                  consistent effort across academic, sporting and cultural
                  areas.
                </p>

                <p>
                  The award places strong emphasis on service and character
                  development. Pupils are encouraged to reflect on their actions
                  and decisions and to recognise the impact they have on others.
                  This process helps them develop a deeper understanding of
                  accountability, empathy and integrity.
                </p>

                <p>
                  The Learning Knights Award is not about competition but about
                  personal progress. Each child’s journey is unique and success
                  is measured by growth, effort and attitude. The programme
                  provides a fitting conclusion to a pupil’s time at Ruzawi,
                  equipping them with confidence, values and life skills that
                  will serve them well beyond their primary school years.
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-[2rem] shadow-md">
                <img
                  src="/images/learning-knights.webp"
                  alt="Learning Knights Award"
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              </div>
            </section>

            <section
              id="outdoor-education"
              className="scroll-mt-56 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="min-h-[620px]">
                  <img
                    src="/images/outdoor-education.webp"
                    alt="Outdoor Education at Ruzawi"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    Outdoor Education
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    Learning from the natural world
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      Blessed with a beautiful estate, Ruzawi is in a unique
                      position to offer Outdoor Education to its pupils. With
                      abundant bird life, many indigenous tree species and the
                      varied ecosystems provided by the dam, the opportunities
                      for learning are extensive. Outdoor Education also plays
                      an important role in supplementing and supporting lessons
                      taught in the classroom.
                    </p>

                    <p>
                      The emphasis of the programme is not on children being
                      able to identify every bird, tree or living creature that
                      calls Ruzawi home, but rather on creating an awareness and
                      appreciation of the natural world. This awareness often
                      sparks curiosity and leads to a deeper interest in nature,
                      which in turn fosters a desire to care for and protect the
                      environment both at school and at home.
                    </p>

                    <p>
                      Through Outdoor Education, children begin to understand
                      that they can have a positive impact on their
                      surroundings. In many cases, they take this learning
                      beyond the school gates, encouraging greater awareness and
                      responsibility among adults and parents. They may even
                      teach others that littering is simply not acceptable.
                    </p>

                    <p>
                      The children’s excitement and enthusiasm for being
                      outdoors is often enough to demonstrate the value of this
                      programme. Outdoor Education is an important part of the
                      Ruzawi curriculum and one that we continue to nurture and
                      develop.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="ruzchats-life-skills-and-the-chat-room"
              className="scroll-mt-56 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                RuzChats, Life Skills and The Chat Room
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Conversation, guidance and emotional wellbeing
              </h2>

              <div className="mt-8 grid gap-8 xl:grid-cols-3">
                <article className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8">
                  <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                    RuzChats
                  </h3>

                  <p className="mt-6 text-lg leading-9 text-[#35443a]">
                    RuzChats are held twice a term and offer parents the
                    opportunity to engage with a range of relevant topics. Guest
                    speakers are invited to share practical advice, professional
                    insight and lived experience, creating a supportive space
                    for discussion and reflection. These sessions strengthen the
                    partnership between home and school and reinforce the shared
                    responsibility of raising confident, resilient children.
                  </p>
                </article>

                <article className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8">
                  <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                    Life Skills
                  </h3>

                  <p className="mt-6 text-lg leading-9 text-[#35443a]">
                    Life Skills lessons form part of the curriculum for senior
                    pupils and focus on equipping children with the tools they
                    need to navigate relationships, responsibility and personal
                    challenges. Topics are carefully selected to be age
                    appropriate and relevant, encouraging open conversation and
                    self-awareness while reinforcing the values taught at
                    Ruzawi.
                  </p>
                </article>

                <article className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8">
                  <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                    The Chat Room
                  </h3>

                  <p className="mt-6 text-lg leading-9 text-[#35443a]">
                    The Chat Room provides a safe and welcoming space where
                    children can speak openly and confidentially with the school
                    counsellor. It plays an important role in supporting pupils
                    through emotional, social and personal challenges. Whether
                    children need a listening ear, guidance or reassurance, the
                    Chat Room offers a calm environment where they feel heard,
                    supported and understood.
                  </p>
                </article>
              </div>

              <p className="mt-10 text-lg leading-9 text-[#35443a]">
                Together, RuzChats, Life Skills and the Chat Room form a vital
                part of Ruzawi’s holistic approach to education, ensuring that
                care, communication and emotional wellbeing remain central to
                school life.
              </p>
            </section>

            <section
              id="world-peace-games"
              className="scroll-mt-56 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    The World Peace Game
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    A powerful lesson in leadership and global responsibility
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      The World Peace Game is a unique and immersive learning
                      experience offered to our Grade Seven pupils. It is
                      designed to challenge children to think critically,
                      collaborate effectively and develop empathy as they
                      navigate complex global scenarios.
                    </p>

                    <p>
                      During the game, pupils are assigned roles as leaders of
                      countries, international organisations and global
                      institutions. They are tasked with resolving a series of
                      interconnected crises that span political, economic,
                      environmental and humanitarian issues.
                    </p>

                    <p>
                      The game requires constant negotiation, compromise and
                      strategic thinking, encouraging children to consider the
                      wider consequences of their decisions.
                    </p>

                    <p>
                      As the game unfolds, pupils learn that leadership involves
                      listening, understanding different perspectives and making
                      choices that benefit the greater good. They are encouraged
                      to manage conflict peacefully, communicate clearly and
                      work together under pressure.
                    </p>

                    <p>
                      The World Peace Game provides a powerful platform for
                      developing confidence, resilience and problem-solving
                      skills. It allows pupils to experience the complexities of
                      leadership and global responsibility in a safe and
                      supportive environment. For many children, it is one of
                      the most memorable and transformative experiences of their
                      time at Ruzawi.
                    </p>
                  </div>
                </div>

                <div className="min-h-[560px]">
                  <img
                    src="/images/world-peace-game.webp"
                    alt="World Peace Game at Ruzawi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
