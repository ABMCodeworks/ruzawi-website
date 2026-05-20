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
      "The Centre for Total Transformation, or CTT, is a school for disadvantaged children in Harare that supports children through their schooling. Over the course of the last few years, Ruzawi has collected clothing, stationery and furniture which are delivered to CTT.",
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
      const yOffset = window.innerWidth < 1024 ? -130 : -120;
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
      const offset = window.innerWidth < 1024 ? 140 : 150;
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
      const yOffset = window.innerWidth < 1024 ? -130 : -120;
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

        <section className="mx-auto grid max-w-[1500px] gap-6 px-6 py-8 lg:grid-cols-[300px_1fr] lg:gap-10 lg:px-8 lg:py-16 2xl:px-10">
          <aside className="sticky top-20 z-30 self-start lg:top-28">
            <div className="lg:hidden">
              <div className="rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5">
                <label
                  htmlFor="school-life-section-select"
                  className="mb-2 block text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#47778D]"
                >
                  School Life
                </label>

                <select
                  id="school-life-section-select"
                  value={activeTab}
                  onChange={(event) => handleTabClick(event.target.value)}
                  className="w-full rounded-xl border border-[#B6D7E7] bg-[#f6f1e7] px-4 py-3 text-sm font-bold text-[#00582C] outline-none focus:border-[#47778D] focus:ring-2 focus:ring-[#B6D7E7]"
                >
                  {schoolLifeTabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hidden max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[1.5rem] bg-white shadow-xl ring-1 ring-black/5 lg:block lg:rounded-[2rem]">
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
              className="scroll-mt-40 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    Chapel & Assembly
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
                      Children attend Chapel daily and services are designed to
                      be meaningful, inclusive and age appropriate. Through
                      prayer, scripture, hymns and thoughtful messages, pupils
                      are encouraged to reflect on their actions, consider their
                      relationships with others and grow in faith and character.
                    </p>

                    <p>
                      School Assemblies also provide an opportunity to celebrate
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
              className="scroll-mt-40 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
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
              className="scroll-mt-40 rounded-[2rem] bg-[#00582C] p-8 text-white shadow-xl md:p-10 lg:scroll-mt-32"
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
                    support and have specific roles to fulfil. Each receives a
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
              className="scroll-mt-40 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Learning Knights Award
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Growth, service and personal progress
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  The Learning Knights Award is a special Grade 7 programme at
                  Ruzawi School designed to recognise pupils who demonstrate
                  courage, commitment, resilience, responsibility and service
                  beyond the usual expectations of school life. It celebrates
                  children who willingly challenge themselves physically,
                  mentally and socially while growing into capable and
                  compassionate young people.
                </p>

                <p>
                  The award is presented to pupils who act as true ambassadors
                  for Ruzawi. These are children who serve others, develop new
                  skills, organise meaningful projects and persevere through
                  demanding personal challenges.
                </p>

                <p>
                  The programme encourages pupils to move outside of their
                  comfort zones and discover strengths, passions and abilities
                  that they may not otherwise have explored.
                </p>

                <h3 className="pt-4 font-serif text-3xl font-semibold text-[#00582C]">
                  Core Areas of the Award
                </h3>

                <p>
                  To complete the Learning Knights Award, pupils must take part
                  in four main sections.
                </p>

                <div className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5">
                  <h4 className="font-serif text-2xl font-semibold text-[#00582C]">
                    1. Community Service
                  </h4>

                  <div className="mt-5 space-y-5">
                    <p>
                      Pupils are required to complete a minimum of 25 hours of
                      service.
                    </p>

                    <p>
                      At least 5 hours must take place in each service sector
                      and should go beyond the normal community service carried
                      out at school.
                    </p>

                    <p>
                      The aim of this section is to develop empathy, generosity,
                      awareness and a spirit of giving.
                    </p>

                    <p>Examples of community service include:</p>

                    <ul className="list-disc space-y-2 pl-6">
                      <li>Recycling initiatives and environmental projects</li>
                      <li>
                        Visiting and assisting at hospitals, old age homes and
                        orphanages
                      </li>
                      <li>Gardening, tree planting and litter collection</li>
                      <li>Supporting charities and fundraising initiatives</li>
                      <li>
                        Serving the wider Ruzawi and Marondera communities
                      </li>
                    </ul>

                    <p>
                      The award encourages pupils to understand that service is
                      not simply about completing hours, but about learning to
                      care for others and contribute positively to the wider
                      community.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5">
                  <h4 className="font-serif text-2xl font-semibold text-[#00582C]">
                    2. Skills Development
                  </h4>

                  <div className="mt-5 space-y-5">
                    <p>
                      Pupils must learn and develop a new skill that is
                      different from the activities in which they would normally
                      excel.
                    </p>

                    <p>
                      The skill may be self-taught, developed through
                      instruction or learnt through practical experience.
                    </p>

                    <p>
                      The focus is on growth, perseverance and broadening
                      horizons.
                    </p>

                    <p>Examples of skills include:</p>

                    <ul className="list-disc space-y-2 pl-6">
                      <li>Cooking, baking and food preparation</li>
                      <li>Sewing, knitting and crochet</li>
                      <li>Photography and musical instruments</li>
                      <li>First aid, sign language and calligraphy</li>
                      <li>Scuba diving, car mechanics and tree propagation</li>
                    </ul>

                    <p>
                      The programme encourages pupils to discover new interests
                      while learning patience, discipline and confidence.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5">
                  <h4 className="font-serif text-2xl font-semibold text-[#00582C]">
                    3. Personal Challenge
                  </h4>

                  <div className="mt-5 space-y-5">
                    <p>
                      The challenge section requires pupils to complete a
                      demanding physical or personal objective that stretches
                      them beyond what they would normally achieve.
                    </p>

                    <p>
                      The challenge should be individual to the child and suited
                      to their abilities while still requiring determination and
                      resilience.
                    </p>

                    <p>Examples of challenges include:</p>

                    <ul className="list-disc space-y-2 pl-6">
                      <li>The Imire Bike Ride and Turaco Trail adventures</li>
                      <li>Long distance runs and walks</li>
                      <li>Cycling and endurance riding events</li>
                      <li>Triathlons and mountain climbs</li>
                      <li>Significant improvement in a chosen sport</li>
                    </ul>

                    <p>
                      This section develops grit, endurance, perseverance and
                      mental toughness while helping pupils experience the
                      satisfaction of overcoming difficulty.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5">
                  <h4 className="font-serif text-2xl font-semibold text-[#00582C]">
                    4. Organisational Skills and Leadership
                  </h4>

                  <div className="mt-5 space-y-5">
                    <p>
                      Pupils are encouraged to organise, lead and take
                      responsibility for projects or events.
                    </p>

                    <p>
                      This section focuses on planning, communication,
                      initiative and execution.
                    </p>

                    <p>Examples include:</p>

                    <ul className="list-disc space-y-2 pl-6">
                      <li>Organising Grandparents’ Day activities</li>
                      <li>Planning Sports Day stalls or events</li>
                      <li>Running quizzes, bingo evenings or fundraisers</li>
                      <li>Coordinating charity initiatives and drives</li>
                      <li>Assisting with community or school functions</li>
                    </ul>

                    <p>
                      All planning and organisation should be led by the child
                      wherever possible.
                    </p>
                  </div>
                </div>

                <h3 className="pt-4 font-serif text-3xl font-semibold text-[#00582C]">
                  Portfolio Submission
                </h3>

                <p>
                  At the completion of the programme, pupils submit a portfolio
                  to the Headmaster for consideration.
                </p>

                <p>The portfolio should include:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>Evidence of participation</li>
                  <li>Photographs and reflections</li>
                  <li>Records of hours completed</li>
                  <li>Details of skills learnt and challenges undertaken</li>
                  <li>Evidence of organisational and leadership involvement</li>
                </ul>

                <p>
                  The portfolio should clearly demonstrate commitment, maturity
                  and effort across all four sections of the award.
                </p>

                <h3 className="pt-4 font-serif text-3xl font-semibold text-[#00582C]">
                  The Purpose of the Award
                </h3>

                <p>
                  The Learning Knights Award is far more than a badge of
                  achievement.
                </p>

                <p>It is designed to help children:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>Develop resilience and confidence</li>
                  <li>Learn responsibility and leadership</li>
                  <li>Discover compassion and service</li>
                  <li>Broaden their experiences and interests</li>
                  <li>Grow in maturity and perseverance</li>
                </ul>

                <p>
                  The programme recognises that true education extends beyond
                  the classroom and that meaningful growth often happens when
                  children are challenged, stretched and encouraged to serve
                  others.
                </p>

                <p>
                  The award aims to produce young people who are capable,
                  thoughtful, adventurous and grounded in strong values.
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
              id="ruzchats-life-skills-and-the-chat-room"
              className="scroll-mt-40 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
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
                    opportunity to engage with a range of relevant parenting and
                    life skill topics. Guest speakers are invited to share
                    practical advice, professional insight and lived experience,
                    creating a supportive space for discussion and reflection.
                    These sessions strengthen the partnership between home and
                    school and reinforce the shared responsibility of raising
                    confident, resilient children.
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
                    children can speak openly and confidentially with the School
                    Counsellor. It plays an important role in supporting pupils
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
              className="scroll-mt-40 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
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
