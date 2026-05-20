import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const boardingTabs = [
  {
    id: "dorm-life",
    label: "Dorm Life",
  },
  {
    id: "kitchen-housekeeping-laundry",
    label: "Kitchen, Housekeeping & Laundry",
  },
  {
    id: "pastoral-care",
    label: "Pastoral Care",
  },
  {
    id: "ruzawi-families",
    label: "Ruzawi Families",
  },
  {
    id: "ruzawi-sanatorium",
    label: "Ruzawi Sanatorium",
  },
];

const boardingCards = [
  {
    title: "Home Away from Home",
    body: "Dormitory life helps children grow in independence, responsibility and confidence.",
  },
  {
    title: "Daily Care",
    body: "Matrons, pastoral staff, the San Sister and the School Counsellor work together to support each child.",
  },
  {
    title: "Healthy Routines",
    body: "Meals, laundry, rest, activity and care all contribute to the rhythm of boarding life.",
  },
  {
    title: "Belonging",
    body: "Ruzawi Families, house spirit and shared experiences help children build lasting relationships.",
  },
];

export default function BoardingLifePage() {
  const [activeTab, setActiveTab] = useState("dorm-life");

  const activeLabel = useMemo(() => {
    return boardingTabs.find((tab) => tab.id === activeTab)?.label;
  }, [activeTab]);

  useEffect(() => {
    function updateActiveTab() {
      const offset = window.innerWidth < 1024 ? 140 : 150;
      let currentId = boardingTabs[0].id;

      for (const tab of boardingTabs) {
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
        title="Boarding Life"
        description="Explore boarding life at Ruzawi School, including dorm life, pastoral care, Ruzawi Families, the Sanatorium, kitchen, housekeeping and laundry."
        path="/boarding-life"
        image="/images/boarding-life.webp"
      />

      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/boarding-life.webp"
            alt="Boarding life at Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-4xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Boarding Life
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              A caring home where children grow together
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              Boarding life at Ruzawi helps children develop independence,
              friendship, responsibility and a strong sense of belonging.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Boarding Life at Ruzawi
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
                  htmlFor="boarding-section-select"
                  className="mb-2 block text-[0.65rem] font-black uppercase tracking-[0.22em] text-[#47778D]"
                >
                  Boarding Life
                </label>

                <select
                  id="boarding-section-select"
                  value={activeTab}
                  onChange={(event) => handleTabClick(event.target.value)}
                  className="w-full rounded-xl border border-[#B6D7E7] bg-[#f6f1e7] px-4 py-3 text-sm font-bold text-[#00582C] outline-none focus:border-[#47778D] focus:ring-2 focus:ring-[#B6D7E7]"
                >
                  {boardingTabs.map((tab) => (
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
                  Boarding Life
                </p>
              </div>

              <nav className="space-y-2 p-3">
                {boardingTabs.map((tab) => {
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
              id="dorm-life"
              className="scroll-mt-40 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    Dorm Life
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    Independence, friendship and a sense of home
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      Time spent in the dormitories plays an important role in
                      daily life at Ruzawi and is a time when children learn
                      valuable lessons about independence, responsibility and
                      living alongside others.
                    </p>

                    <p>
                      For the boys, evenings in the dormitories are filled with
                      both structure and fun. Before activities begin, necessary
                      duties are completed, including the distribution of clean
                      laundry, balcony inspections and locker and bed
                      inspections. These routines help to instill responsibility
                      and accountability.
                    </p>

                    <p>
                      Once duties are completed, the boys move into their
                      evening activities, which vary throughout the week. Monday
                      is Tidy-Up Night where dormitory spaces are organised and
                      cleaned. Tuesday is Chat Night, focusing on the current
                      Pastoral Care theme. Wednesday is Game Night, with
                      activities such as musical statues, broken telephone and
                      dancing. Thursday is Movie Night and Friday is Chill
                      Night, where the boys enjoy free time and choose how they
                      would like to relax. For boys in Grades Three to Five, a
                      bedtime story is often read.
                    </p>
                  </div>
                </div>

                <div className="min-h-[520px]">
                  <img
                    src="/images/dorm-life.webp"
                    alt="Dorm life at Ruzawi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="border-t border-black/5 bg-[#f6f1e7] p-8 md:p-10">
                <div className="space-y-6 text-lg leading-9 text-[#35443a]">
                  <p>
                    For the girls, the dormitories are designed to feel like a
                    true home away from home. Bringing their own duvets from
                    home, along with a favourite teddy, helps create cheerful
                    and welcoming spaces. While daily chores such as tidying
                    lockers and putting away laundry are part of dorm life,
                    there is also plenty of time for enjoyment.
                  </p>

                  <p>
                    Evenings are often filled with skits, fashion shows,
                    dressing up, storytelling and bonding time. These shared
                    experiences support the development of the social and
                    emotional skills needed when living in a communal
                    environment. The dormitories are frequently where lifelong
                    friendships begin, formed through shared experiences and
                    mutual support during their journey at Ruzawi.
                  </p>

                  <p>
                    Our matrons provide the structure needed to help children
                    thrive in dormitory life while also offering care and
                    nurturing as children move through different developmental
                    stages. They are available whenever the children are in the
                    dormitories and work closely with other members of staff to
                    ensure that each child’s needs are met. This includes close
                    collaboration with the San Sister and the School Counsellor.
                    Transition times are built into the move from Bob Williams
                    dorm to Gibbs dorm, allowing girls the opportunity to spend
                    time with the senior matron and become familiar with the
                    slightly different routines and expectations.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {boardingCards.map((card) => (
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
              id="kitchen-housekeeping-laundry"
              className="scroll-mt-40 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Kitchen, Housekeeping & Laundry
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Nourishment, care and daily routines
              </h2>

              <div className="mt-8 overflow-hidden rounded-[2rem] shadow-md">
                <img
                  src="/images/kitchen-dining.webp"
                  alt="The Ruzawi Kitchen and Dining Rooms"
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              </div>

              <div className="mt-10 grid gap-8 xl:grid-cols-2">
                <article className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8">
                  <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                    The Ruzawi Kitchen and Dining
                  </h3>

                  <div className="mt-6 space-y-5 text-lg leading-9 text-[#35443a]">
                    <p>
                      At Ruzawi, mealtimes are an important part of daily life
                      and play a key role in supporting the health, wellbeing
                      and development of our children. The kitchen works to
                      three core principles: balanced nutrition, quality
                      ingredients and enjoyable meals.
                    </p>

                    <p>
                      Each day, pupils are provided with three carefully
                      prepared two-course meals, along with morning cocoa and
                      wholesome mid-morning and afternoon teas. Menus are
                      thoughtfully planned to ensure children receive the
                      nourishment and energy they need to engage fully in the
                      classroom, perform well on the sports field and develop
                      positive and healthy relationships with food.
                    </p>

                    <p>
                      Menus operate on a three-week cycle and are adjusted
                      seasonally to ensure variety and freshness. Wherever
                      possible, ingredients are sourced from trusted local
                      suppliers and farmers, allowing meals to be both
                      nutritious and flavoursome.
                    </p>

                    <p>
                      Behind the scenes, a dedicated team of chefs and waiters
                      work together to deliver every meal. Under the leadership
                      of Dylan Taylor, whose culinary experience spans both
                      Zimbabwe and the United Kingdom, the kitchen maintains
                      high standards while continually evolving menus to meet
                      the needs of growing children.
                    </p>

                    <p>
                      All catering is managed in-house, allowing flexibility,
                      consistency and a personal approach. This ensures that the
                      dining experience at Ruzawi remains an integral part of
                      the school’s warm and caring environment.
                    </p>
                  </div>
                </article>

                <article className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8">
                  <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                    Housekeeping, Laundry & Recycling
                  </h3>

                  <div className="mt-6 space-y-5 text-lg leading-9 text-[#35443a]">
                    <p>
                      The Housekeeping and Laundry Department at Ruzawi is made
                      up of a dedicated team of staff who play an essential role
                      in ensuring that the school remains a clean, safe and
                      welcoming environment for both children and staff. The
                      department works with a strong sense of responsibility,
                      teamwork and pride in the care of the school.
                    </p>

                    <p>
                      Housekeeping staff are responsible for maintaining high
                      standards of cleanliness throughout the campus. This
                      includes classrooms, dormitories, bathrooms, offices and
                      shared spaces, all of which are cleaned and sanitised
                      daily. Particular care is taken to ensure that the
                      dormitories feel comfortable and homely, providing
                      children with a safe and pleasant environment in which to
                      live.
                    </p>

                    <p>
                      Laundry is collected daily and clothing and linen are
                      washed, dried, ironed and returned in an organised and
                      timely manner. This service supports the smooth running of
                      boarding life and helps children develop routines and
                      responsibility around their personal belongings.
                    </p>

                    <p>
                      Recycling forms an important part of daily life at Ruzawi.
                      The department oversees the sorting and collection of
                      waste into designated categories including paper, plastic,
                      glass, organic waste and general refuse. Through this
                      process, children are encouraged to understand the
                      importance of caring for their environment and taking
                      responsibility for the impact of their actions.
                    </p>
                  </div>
                </article>
              </div>
            </section>

            <section
              id="pastoral-care"
              className="scroll-mt-40 rounded-[2rem] bg-[#00582C] p-8 text-white shadow-xl md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#B6D7E7]">
                Pastoral Care
              </p>

              <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Nurturing hearts as well as minds
              </h2>

              <div className="mt-8 grid gap-8 xl:grid-cols-2">
                <div className="space-y-6 text-lg leading-9 text-white/85">
                  <p>
                    At Ruzawi, we believe that education is not only about
                    developing children’s minds but also about nurturing their
                    hearts. To ensure holistic development, the school has a
                    dedicated Pastoral Care Team that provides support, guidance
                    and a nurturing environment for everyone.
                  </p>

                  <p>
                    The team includes the School Counsellor, the Chapel
                    spiritual leaders, the San Sister and the Head of Curriculum
                    Support, ensuring that all aspects of our children’s
                    wellbeing are safeguarded.
                  </p>
                </div>

                <div className="space-y-6 text-lg leading-9 text-white/85">
                  <p>
                    The Pastoral Care Team meets weekly to reflect on the life
                    of the school community and to plan activities that help
                    children grow in kindness, resilience and faith. Each school
                    term is themed, allowing a more focused approach to
                    exploring key values and principles.
                  </p>

                  <p>
                    Through Chapel services, discussions and moments of
                    reflection, the Pastoral Care Team encourages both staff and
                    children to explore what it means to live with integrity and
                    purpose. These shared experiences help to strengthen
                    relationships and reinforce the importance of care, respect
                    and understanding within the school community.
                  </p>

                  <p>
                    At the heart of Pastoral Care at Ruzawi is a desire to
                    ensure that every child feels known, supported and valued.
                    Faith, kindness and understanding underpin daily life and
                    remain central to what makes Ruzawi a very special school.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="ruzawi-families"
              className="scroll-mt-40 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Ruzawi Families
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Belonging across the grades
              </h2>

              <div className="mt-8 overflow-hidden rounded-[2rem] shadow-md">
                <img
                  src="/images/ruzawi-families.webp"
                  alt="Ruzawi Families"
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              </div>

              <div className="mt-10 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  The concept of Ruzawi Families was introduced in 2014 after
                  one of our staff members attended a “Connecting Classrooms”
                  programme at Wynberg Girls’ School in the Cape. It has since
                  evolved and taken on a uniquely Ruzawi flavour.
                </p>

                <p>
                  Family meetings take place twice a term and incorporate a
                  range of ideas and activities. The objective for each meeting
                  is presented to the Grade Seven pupils, who are responsible
                  for preparing and planning the session. There are 18 families
                  in total, nine from each house. This structure helps to
                  nurture loyalty and house spirit, particularly during sporting
                  events and school activities.
                </p>

                <p>
                  Each family has its own name and flag, chosen by the founding
                  members. The flag is displayed at the start of meetings under
                  the selected family tree and allows the children to find their
                  group. Many families have also developed their own handshakes,
                  adding to the sense of identity and belonging.
                </p>

                <p>
                  This programme is beneficial on several fronts. From a
                  leadership perspective, it allows every Grade Seven pupil to
                  take responsibility for a family unit, direct its members in a
                  variety of activities and plan how tasks are shared, while
                  listening to and valuing the input of younger children. From a
                  social perspective, the meetings encourage children across the
                  grades to interact and form friendships with age groups they
                  may not normally encounter. It also allows all children to
                  contribute their thoughts and ideas on a wide range of topics,
                  teaching them to value others and respect different opinions.
                </p>

                <p>
                  Each family is made up of one or two children from each grade.
                  Children are encouraged to care for, respect and cherish their
                  family members throughout the school day. A member of staff is
                  assigned to each family in an advisory role should the Grade
                  Sevens need support. Towards the end of the year, the Grade
                  Six pupils work alongside the Grade Sevens in preparation for
                  stepping into leadership roles themselves the following year.
                </p>
              </div>
            </section>

            <section
              id="ruzawi-sanatorium"
              className="scroll-mt-40 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    Ruzawi Sanatorium
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    Health, care and reassurance
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      The Ruzawi Sanatorium is staffed by a qualified nurse on
                      duty twenty-four hours a day, ensuring that the health and
                      wellbeing of all pupils are carefully monitored at all
                      times. The Sanatorium is supported by a nearby private
                      hospital which provides essential backup when required.
                      The clinic includes a twelve-bed observation ward and
                      offers a calm and appropriate environment for rest and
                      recovery. The school doctor visits the Sanatorium every
                      Tuesday or as required.
                    </p>

                    <p>
                      Ruzawi also works closely with a local medical doctor and
                      dentist for referral cases. Clear protocols and guidelines
                      are in place to manage health-related matters, including
                      illness outbreaks. The Ministry of Health and Child Care
                      provides additional support when needed and the Sanatorium
                      works in collaboration with the Ministry during health
                      campaigns such as mass drug administration and
                      vaccinations.
                    </p>
                  </div>
                </div>

                <div className="min-h-[520px]">
                  <img
                    src="/images/ruzawi-sanatorium.webp"
                    alt="Ruzawi Sanatorium"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="border-t border-black/5 bg-[#f6f1e7] p-8 md:p-10">
                <div className="space-y-6 text-lg leading-9 text-[#35443a]">
                  <p>
                    The Sanatorium clinic cellphone number is open to all
                    stakeholders and parents are kept fully informed whenever a
                    pupil needs to visit the school doctor or hospital. During
                    sporting events, the Sanatorium receives additional support
                    from local ambulance services to ensure that any required
                    transfers are carried out promptly and safely.
                  </p>

                  <p>
                    The Sanatorium works closely with the school caterer to
                    ensure that pupils with medically prescribed dietary
                    requirements are fully supported. It also stocks
                    over-the-counter medication and assists with the
                    administration of medicine prescribed by medical
                    professionals.
                  </p>
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
