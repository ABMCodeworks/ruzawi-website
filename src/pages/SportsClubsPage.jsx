import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const sportsTabs = [
  {
    id: "sport-at-ruzawi",
    label: "Sport at Ruzawi",
  },
  {
    id: "clubs",
    label: "Clubs",
  },
];

const sportsCards = [
  {
    title: "Participation",
    body: "Every child at Ruzawi takes part in sport and experiences the excitement of matches.",
  },
  {
    title: "Teamwork",
    body: "Sport teaches children discipline, resilience, humility and sportsmanship.",
  },
  {
    title: "Opportunity",
    body: "Pupils are exposed to a wide range of sports, tours, clubs and activities.",
  },
  {
    title: "Belonging",
    body: "Clubs help children connect across classes and year groups while discovering new interests.",
  },
];

const staffLedClubs = [
  "Birding",
  "Sewing",
  "African Board Games",
  "Sign Language",
  "Traditional Music and Cultures",
  "Mini Masters Art Club",
  "Speech and Drama",
  "Marimba",
  "Choir",
  "Handicraft",
  "Language Club",
  "Board Games",
  "History Club",
  "Design and Make It",
  "Natural History",
  "Learning Knights",
  "Gardening",
  "Fashion",
  "Bible",
  "Fishing",
  "Chess",
  "Boys’ Tennis",
  "Squash",
  "Girls’ Cricket",
  "Soccer",
  "Sailing",
];

const paidClubs = [
  "Music",
  "Golf",
  "Horse Riding",
  "Judo",
  "Gymnastics",
  "Karate",
];

export default function SportsClubsPage() {
  const [activeTab, setActiveTab] = useState("sport-at-ruzawi");
  const location = useLocation();

  const activeLabel = useMemo(() => {
    return sportsTabs.find((tab) => tab.id === activeTab)?.label;
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
      let currentId = sportsTabs[0].id;

      for (const tab of sportsTabs) {
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
        title="Sports and Clubs"
        description="Learn about sport and clubs at Ruzawi School, where pupils build confidence, teamwork, discipline, creativity and a love for healthy activity."
        path="/sports-and-clubs"
        image="/images/sports-clubs-hero.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/sports-clubs-hero.webp"
            alt="Sports and clubs at Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-4xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Sports & Clubs
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Confidence, teamwork and discovery beyond the classroom
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              Sport and clubs give children opportunities to participate, grow,
              explore new interests and build lifelong values.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Sports & Clubs at Ruzawi
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
                  Sports & Clubs
                </p>
              </div>

              <nav className="space-y-2 p-3">
                {sportsTabs.map((tab) => {
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
              id="sport-at-ruzawi"
              className="scroll-mt-56 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    Sport at Ruzawi
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    Healthy competition, confidence and character
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      Sport plays a central role in life at Ruzawi and is valued
                      as an essential part of a child’s holistic development.
                      Through sport, children learn teamwork, discipline,
                      resilience and sportsmanship while developing physical
                      confidence and a love for healthy activity.
                    </p>

                    <p>
                      Sport at Ruzawi is designed to accommodate children with
                      different sporting abilities. Our Kippers, which are the
                      Grade One and Grade Two children, follow a fun and
                      engaging sports programme that includes tennis, cricket,
                      tag rugby and dance. The emphasis at this stage is
                      enjoyment, participation and the development of basic
                      skills.
                    </p>

                    <p>
                      We host a Grade One and Two Tag Rugby Tournament where
                      children are placed into random teams, creating an
                      atmosphere of excitement and fun. The main focus is to
                      give children a basic understanding of the different
                      sporting disciplines they will participate in from Grade
                      Three and beyond.
                    </p>
                  </div>
                </div>

                <div className="min-h-[560px]">
                  <img
                    src="/images/sport-at-ruzawi.webp"
                    alt="Sport at Ruzawi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="border-t border-black/5 bg-[#f6f1e7] p-8 md:p-10">
                <div className="space-y-6 text-lg leading-9 text-[#35443a]">
                  <p>
                    From Grade Three to Grade Seven, children play two sporting
                    disciplines each term. Every child at Ruzawi takes part in
                    matches against other schools, ensuring that sport remains
                    inclusive and that all pupils experience the excitement and
                    challenge of competition.
                  </p>

                  <p>
                    Pupils selected for First Teams have the opportunity to tour
                    South Africa annually, gaining valuable exposure and
                    experience. A wide range of clubs is offered on Monday and
                    Thursday afternoons, allowing children to explore additional
                    interests. These include golf, sailing, karate, splash ball,
                    soccer, shooting, girls’ cricket and horse riding. Our
                    golfers also enjoy an annual tour to Leopard Rock, which is
                    a highlight of the sporting calendar.
                  </p>

                  <p>
                    The strength of sport at Ruzawi lies in our dedicated and
                    passionate staff, who consistently go beyond the call of
                    duty to ensure that competitive teams are produced at all
                    levels. The focus remains on getting the small details
                    right, trusting that strong results will follow.
                  </p>

                  <p>
                    Above all, sport at Ruzawi aims to instil lifelong values.
                    Children are taught to win with humility, lose with grace
                    and approach every challenge with determination and
                    integrity. The lessons learned on the sports field often
                    extend far beyond it and remain with pupils long after they
                    leave Ruzawi.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {sportsCards.map((card) => (
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
              id="clubs"
              className="scroll-mt-56 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Clubs
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                A rich afternoon programme for exploration and growth
              </h2>

              <div className="mt-8 overflow-hidden rounded-[2rem] shadow-md">
                <img
                  src="/images/clubs.webp"
                  alt="Clubs at Ruzawi"
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              </div>

              <div className="mt-10 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  Our Afternoon Club Programme is designed to give children a
                  rich variety of opportunities beyond the classroom. Clubs
                  allow pupils to explore personal interests, develop new skills
                  and enjoy learning in a relaxed and engaging environment. The
                  programme is structured to suit different age groups, ensuring
                  that options remain balanced and developmentally appropriate
                  as children move through the school.
                </p>

                <p>
                  At the start of each term, pupils are introduced to the clubs
                  on offer through short classroom presentations explaining what
                  is available and how the system works. This is followed by a
                  sign-up session in the hall where children meet the staff
                  leading each club, ask questions and choose activities that
                  spark their curiosity and enthusiasm.
                </p>

                <p>
                  Wherever possible, children are encouraged to try something
                  new each term rather than repeating the same club, helping
                  them discover hidden talents and broaden their interests.
                </p>

                <p>
                  Our Kippers participate in two chosen clubs each term on
                  Tuesdays and Thursdays, with options such as Mini Explorers,
                  Games, History Hunters and Handicraft. All Kippers also enjoy
                  Dance on Wednesdays, which promotes movement, rhythm and
                  confidence.
                </p>

                <p>
                  Grade 3 pupils take part in one selected club on Tuesdays,
                  alongside Dance on Mondays and Cub Scouts on Thursdays,
                  encouraging teamwork, independence and outdoor learning. From
                  Grades 4 to 7, pupils take part in four club sessions each
                  week, choosing from a wide range of creative, cultural,
                  academic and physical activities. For the senior grades,
                  additional age-appropriate opportunities are included, such as
                  Sailing.
                </p>
              </div>

              <div className="mt-10 grid gap-8 xl:grid-cols-2">
                <article className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8">
                  <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                    Staff-led clubs
                  </h3>

                  <p className="mt-5 text-lg leading-9 text-[#35443a]">
                    Many clubs are led by members of staff who generously share
                    their own skills, talents and interests with the children.
                    This enriches the programme and strengthens relationships,
                    as pupils enjoy seeing staff in a different light outside
                    traditional lessons.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {staffLedClubs.map((club) => (
                      <span
                        key={club}
                        className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#00582C] ring-1 ring-black/5"
                      >
                        {club}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="rounded-[2rem] bg-[#00582C] p-7 text-white ring-1 ring-black/5 md:p-8">
                  <h3 className="font-serif text-3xl font-semibold">
                    Paid specialist clubs
                  </h3>

                  <p className="mt-5 text-lg leading-9 text-white/85">
                    In addition, we offer a range of paid clubs delivered by
                    experienced external providers who bring specialist coaching
                    and professional expertise. Some paid clubs run across both
                    afternoon sessions, while others take place during the
                    second session on Thursdays, giving families access to a
                    wide range of extracurricular opportunities within the
                    school environment.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {paidClubs.map((club) => (
                      <span
                        key={club}
                        className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20"
                      >
                        {club}
                      </span>
                    ))}
                  </div>
                </article>
              </div>

              <p className="mt-10 text-lg leading-9 text-[#35443a]">
                Clubs play an important role in a child’s holistic development.
                They build creativity, perseverance and problem-solving skills
                while also giving children opportunities to connect across
                classes and year groups. Most importantly, clubs help children
                experience the joy of learning in new ways, developing
                confidence and a strong sense of belonging as part of the Ruzawi
                community.
              </p>
            </section>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
