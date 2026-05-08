import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import SEO from "../components/SEO";
import Footer from "../components/Footer";

const academicTabs = [
  {
    id: "academics-at-ruzawi",
    label: "Academics at Ruzawi",
  },
  {
    id: "curriculum-support",
    label: "Curriculum Support",
  },
  {
    id: "kipper-department",
    label: "Kipper Department",
  },
  {
    id: "subject-teaching",
    label: "Subject Teaching",
  },
  {
    id: "ruzawi-library",
    label: "Ruzawi Library",
  },
];

const academicCards = [
  {
    title: "Cambridge Foundations",
    body: "English, Maths and Science form the academic foundation of learning at Ruzawi.",
  },
  {
    title: "Individual Attention",
    body: "Small class sizes allow teachers to know, guide and support each child well.",
  },
  {
    title: "Curriculum Support",
    body: "The Indigo Room provides one-to-one and small-group support for personalised learning.",
  },
  {
    title: "Outdoor Education",
    body: "Ruzawi’s estate and school trips create meaningful learning beyond the classroom.",
  },
];

const subjectAreas = [
  {
    title: "Art",
    body: [
      "Creativity is a vital part of a child’s education at Ruzawi, where Art lessons run from Grade One through to Grade Seven. Art is far more than drawing or painting. It is a subject that develops imagination, encourages self-expression and supports emotional growth. Through Art, children learn to think creatively, develop fine motor skills, express feelings and appreciate different perspectives.",
      "Our pupils are encouraged to experiment with a wide range of techniques and mediums through a curriculum that covers all the elements of Art. These include line, which helps children understand movement and direction, shape and form, which explore geometry and structure, and colour, where pupils learn about harmony, contrast and symbolism. Texture is used to create tactile and visual interest, space allows pupils to explore perspective and composition, and value encourages experimentation with light and shadow.",
      "By engaging with different forms of Art and studying the work of influential artists from a variety of cultures and time periods, children broaden their understanding of how Art reflects society and the human experience. This exposure helps them develop appreciation, empathy and curiosity.",
      "Art lessons at Ruzawi are designed not only to teach practical skills but also to inspire confidence, creativity and a lifelong appreciation for the visual arts.",
    ],
  },
  {
    title: "Music",
    body: [
      "The Music Department is a space where every child at Ruzawi is encouraged to discover the joy of musical expression. It offers pupils an opportunity to step away from the busyness of academic life and immerse themselves in creativity through music, movement and performance.",
      "Our music curriculum encompasses a variety of elements including class music lessons, individual instrumental tuition and opportunities to participate in bands and group ensembles. Children may choose any instrument and those who have developed sufficient skills through class music or individual lessons are encouraged to showcase their abilities through ensemble and group work.",
      "Music at Ruzawi plays an important role in building confidence, discipline and collaboration. Whether performing together, learning a new instrument or exploring rhythm and movement, pupils are supported in developing both their musical ability and their appreciation of music as a lifelong skill and source of enjoyment.",
    ],
  },
  {
    title: "ICT",
    body: [
      "Ruzawi School offers a dedicated ICT room equipped with 25 Mini-Mac computers, a set of 20 portable iPads and a high-quality printer, providing pupils with a modern and engaging learning environment. Each class is allocated a structured one-hour ICT lesson each week, during which pupils develop a wide range of digital skills.",
      "The ICT curriculum includes touch typing, word processing, presentations, coding, robotics and digital citizenship. Pupils are taught how to use technology responsibly and confidently, with a strong emphasis on online safety and appropriate digital behaviour.",
      "While the school primarily operates within the iOS system, pupils are also given exposure to Microsoft Office and Google Workspace platforms. This ensures that they develop adaptable and practical digital skills that can be applied across different systems and settings.",
      "Wherever possible, ICT is integrated with classroom learning so that pupils can apply their skills in meaningful and relevant contexts. This cross-curricular approach reinforces learning and helps pupils see technology as a valuable tool for research, creativity and communication.",
    ],
  },
  {
    title: "Shona",
    body: [
      "Learning the language ChiShona is such fun. In the classroom and outside, we embrace cultural diversity by learning about each other’s cultural backgrounds, helping to create a stronger sense of community for our children at Ruzawi and beyond.",
      "We engage and motivate our children through adaptive, game-based learning platforms that promote critical thinking, co-ordination and numeracy, among other important skills. All of this is achieved through songs and traditional games such as dudumuduri, tsoro, nhodo, pada and ngano, or storytelling, as well as through skits performed in Shona.",
      "Our approach encourages active participation and enjoyment while building confidence and cultural understanding. The children take great pride in learning the language and traditions and their enthusiasm is evident both in the classroom and during outdoor activities.",
      "Vakomana nevasikana vanofarira kutamba tsoro.",
    ],
  },
];

export default function AcademicLifePage() {
  const [activeTab, setActiveTab] = useState("academics-at-ruzawi");

  const activeLabel = useMemo(() => {
    return academicTabs.find((tab) => tab.id === activeTab)?.label;
  }, [activeTab]);

  useEffect(() => {
    function updateActiveTab() {
      const offset = window.innerWidth < 1024 ? 220 : 150;

      let currentId = academicTabs[0].id;

      for (const tab of academicTabs) {
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
        title="Academic Life"
        description="Learn about academic life at Ruzawi School, including the Cambridge curriculum, Curriculum Support, the Kipper Department, subject teaching and the Ruzawi Library."
        path="/academic-life"
        image="/images/academics.webp"
      />
      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/academics.webp"
            alt="Academic life at Ruzawi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-4xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-white">
              Academic Life
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              Learning that grows the whole child
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              A rich, pupil-focused and enquiry-based curriculum shaped by
              strong foundations, individual attention and learning beyond the
              classroom.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Academic Life at Ruzawi
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
                  Academic Life
                </p>
              </div>

              <nav className="space-y-2 p-3">
                {academicTabs.map((tab) => {
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
              id="academics-at-ruzawi"
              className="scroll-mt-56 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    Academics at Ruzawi
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    A strong foundation for curious, confident learners
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      Ruzawi’s academic philosophy is built on a solid
                      foundation of the Cambridge International Curriculum in
                      the core subjects of English, Maths and Science. This is
                      enhanced and expanded through the teaching of Shona, Art,
                      Social Studies, ICT, Drama, Music, Bible Life Skills and a
                      wide range of other subjects.
                    </p>

                    <p>
                      Our programme embraces a rich, pupil-focused and
                      enquiry-based curriculum where the latest trends and
                      innovations in education and international best practice
                      are implemented. At the heart of our academic approach is
                      a respect for all people and all things within our
                      Anglican Christian ethos and Zimbabwean heritage.
                    </p>
                  </div>
                </div>

                <div className="min-h-[460px]">
                  <img
                    src="/images/academic-classroom.webp"
                    alt="Ruzawi classroom learning"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {academicCards.map((card) => (
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
              id="curriculum-support"
              className="scroll-mt-56 rounded-[2rem] bg-[#00582C] p-8 text-white shadow-xl md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#B6D7E7]">
                Curriculum Support
              </p>

              <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Supporting every child’s learning journey
              </h2>

              <div className="mt-8 grid gap-8 xl:grid-cols-2">
                <div className="space-y-6 text-lg leading-9 text-white/85">
                  <p>
                    The Curriculum Support Department partners with the Academic
                    Department, working closely with class teachers to ensure
                    that children receive any required support across all areas
                    of the curriculum. Early intervention is our primary focus
                    and strong working relationships are maintained with
                    specialists who provide the necessary assessments and
                    testing.
                  </p>

                  <p>
                    Intervention programmes are implemented in both the Senior
                    and Junior Indigo Room sessions. These sessions follow
                    recognised remedial programmes and are designed to support
                    children as they progress through the year groups. Support
                    may take place on an individual basis or in small groups
                    depending on the specific needs of each child.
                  </p>
                </div>

                <div className="space-y-6 text-lg leading-9 text-white/85">
                  <p>
                    The Curriculum Support Department is multidisciplinary,
                    ensuring that children have the support they need to thrive
                    in all areas of school life. Occupational Therapy sessions
                    are offered daily and a specialist consultant visits the
                    school once a term. A Speech Therapist comes to the school
                    biweekly to assess children and implement therapy where
                    required.
                  </p>

                  <p>
                    The department remains in regular contact with a variety of
                    educational assessment specialists. This allows for a free
                    flow of information, opportunities to brainstorm ideas that
                    best support individual children and ensures that the team
                    stays up to date with the methods and approaches available.
                    Collaboration with teachers, parents and outside
                    professionals remains central to the work of the department.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="kipper-department"
              className="scroll-mt-56 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Kipper Department
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                A happy and vibrant beginning
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                <p>
                  Our Kipper Block is, without doubt, one of the happiest and
                  most vibrant corners of our school. Home to our Grade One and
                  Grade Two pupils, affectionately known as Kippers, this block
                  has been carefully designed to provide the very best
                  foundation for our youngest learners as they begin their
                  journey through school and boarding life.
                </p>

                <p>
                  Situated slightly away from the hustle and bustle of the main
                  campus, the classrooms and dormitories create a nurturing and
                  close-knit environment where children can grow in confidence.
                  This setting allows for a flexible timetable tailored to the
                  needs of the early years, ensuring that learning remains
                  engaging and developmentally appropriate.
                </p>

                <p>
                  Each grade benefits from small class sizes, with a maximum of
                  15 children per class. This intimate setting has already made
                  a significant difference to our pupils’ academic progress and
                  personal development, allowing every child to receive
                  individual attention and support. Looking ahead, our vision is
                  to expand into larger classrooms and grow to classes of up to
                  20 pupils, while still holding firmly to our commitment to
                  personalised and high-quality teaching.
                </p>

                <p>
                  One of the defining features of the Kipper Block is the strong
                  support system surrounding our children. Alongside our
                  dedicated teachers, we are fortunate to have an on-site
                  Occupational Therapist, a proactive Curriculum Support
                  Department and caring dormitory matrons. Together, they ensure
                  that every child feels secure, valued and encouraged, helping
                  school to feel as close to home as possible.
                </p>

                <p>
                  Beyond the classroom, a broad and exciting afternoon programme
                  runs from Monday to Thursday. Children are given the
                  opportunity to explore a wide range of sports and activities
                  including dance, ball skills, tennis, netball, swimming,
                  cricket, rugby, soccer and, of course, Leap Frog. These
                  activities introduce healthy habits, teamwork and enjoyment in
                  a safe and age-appropriate way.
                </p>

                <p>
                  More than just a block of classrooms, the Kipper Block is a
                  truly special place. It is a place of laughter, discovery and
                  belonging where our youngest pupils are gently nurtured
                  through the crucial early years of school and boarding life,
                  laying strong foundations not only for academic success but
                  also for a lifelong love of learning.
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-[2rem] shadow-md">
                <img
                  src="/images/kipper-department.webp"
                  alt="Kipper Department at Ruzawi"
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              </div>
            </section>

            <section
              id="subject-teaching"
              className="scroll-mt-56 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10 lg:scroll-mt-32"
            >
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Subject Teaching
              </p>

              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                Broad, balanced and creative learning
              </h2>

              <p className="mt-8 max-w-4xl text-lg leading-9 text-[#35443a]">
                Subject teaching at Ruzawi gives pupils opportunities to develop
                creativity, confidence, digital skill, cultural understanding
                and a lifelong love of learning.
              </p>

              <div className="mt-10 overflow-hidden rounded-[2rem] shadow-md">
                <img
                  src="/images/subject-teaching.webp"
                  alt="Subject teaching at Ruzawi"
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              </div>

              <div className="mt-10 grid gap-6">
                {subjectAreas.map((subject) => (
                  <article
                    key={subject.title}
                    className="rounded-[2rem] bg-[#f6f1e7] p-7 ring-1 ring-black/5 md:p-8"
                  >
                    <h3 className="font-serif text-3xl font-semibold text-[#00582C]">
                      {subject.title}
                    </h3>

                    <div className="mt-6 space-y-5 text-lg leading-9 text-[#35443a]">
                      {subject.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="ruzawi-library"
              className="scroll-mt-56 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5 lg:scroll-mt-32"
            >
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="p-8 md:p-10">
                  <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                    The Ruzawi Library
                  </p>

                  <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#00582C] md:text-5xl">
                    A calm and cosy haven for reading
                  </h2>

                  <div className="mt-8 space-y-6 text-lg leading-9 text-[#35443a]">
                    <p>
                      The Ruzawi Library is designed to be a calm and cosy haven
                      that nurtures a love of reading. With the most comfortable
                      couches on campus and inviting beanbags to sprawl out on,
                      it is the perfect space for children to lose themselves in
                      the pages of a good book. A surprising favourite among
                      readers is flipping through old school magazines, where
                      spotting familiar faces from years gone by is always a
                      hit.
                    </p>

                    <p>
                      From Grade Three upwards, each class has a dedicated
                      30-minute library slot built into their timetable. During
                      this time, pupils exchange their books and enjoy some
                      “library therapy”, using the remaining minutes to settle
                      down quietly and read.
                    </p>

                    <p>
                      Library Monitors help to run the space during rest time,
                      assisting readers with book renewals and ensuring that
                      everyone is well stocked with reading material. This
                      allows children to head into the busy afternoon of sport
                      feeling relaxed, prepared and eager to read.
                    </p>
                  </div>
                </div>

                <div className="min-h-[520px]">
                  <img
                    src="/images/ruzawi-library.webp"
                    alt="Ruzawi Library"
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
