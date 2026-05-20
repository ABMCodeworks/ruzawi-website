import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const staffMembers = [
  {
    name: "Mr B Brider",
    title: "Headmaster",
    image: "/images/staff/brendon-brider.webp",
  },
  {
    name: "Mr S Scott Elliot",
    title: "Deputy Headmaster & Grade 7A Teacher",
    image: "/images/staff/simon-scott-elliot.webp",
  },
  {
    name: "Mrs N Gray",
    title: "School Counselor & Head of Pastoral Care",
    image: "/images/staff/nerys-gray.webp",
  },
  {
    name: "Mrs A Bisset",
    title: "Head of Indigo Room & Girls' Discipline",
    image: "/images/staff/auralyn-bisset.webp",
  },
  {
    name: "Mr W Stenala",
    title: "Sports' Director",
    image: "/images/staff/willard-stenala.webp",
  },
  {
    name: "Mrs C Reed",
    title: "Head of Academics",
    image: "/images/staff/carol-reed.webp",
  },
  {
    name: "Mrs B Billing",
    title: "Head of Kipper Academics & Grade 1B Teacher",
    image: "/images/staff/bridget-billing.webp",
  },
  {
    name: "Mr V Mashungu",
    title: "Head of Chapel & Safeguarding",
    image: "/images/staff/vengai-mashungu.webp",
  },
  {
    name: "Mr I Mushaninga",
    title: "Grade 7B Teacher",
    image: "/images/staff/innocent-mushaninga.webp",
  },
  {
    name: "Mrs B Eksteen",
    title: "Grade 6A Teacher",
    image: "/images/staff/barrie-eksteen.webp",
  },
  {
    name: "Mr B Hofmeyr",
    title: "Grade 6B Teacher",
    image: "/images/staff/blaize-hofmeyr.webp",
  },
  {
    name: "Mrs S Kwari",
    title: "Grade 5K Teacher",
    image: "/images/staff/shingi-kwari.webp",
  },
  {
    name: "Mrs N Hofmeyr",
    title: "Grade 5H Teacher",
    image: "/images/staff/nikki-hofmeyr.webp",
  },
  {
    name: "Mrs S Walraven",
    title: "Grade 4W Teacher",
    image: "/images/staff/stephanie-walraven.webp",
  },
  {
    name: "Miss T Tomoka",
    title: "Grade 4T Teacher",
    image: "/images/staff/thandiwe-tomoka.webp",
  },
  {
    name: "Ms J Ballantyne",
    title: "Grade 3B Teacher",
    image: "/images/staff/jaimie-ballantyne.webp",
  },
  {
    name: "Mrs C Stenala",
    title: "Grade 3S Teacher",
    image: "/images/staff/chiedza-stenala.webp",
  },
  {
    name: "Mrs C Savory",
    title: "Grade 2S Teacher",
    image: "/images/staff/cath-savory.webp",
  },
  {
    name: "Mrs C Lindsay",
    title: "Grade 2L Teacher",
    image: "/images/staff/carrie-lindsay.webp",
  },
  {
    name: "Miss T Hunzwi",
    title: "Grade 1H Teacher",
    image: "/images/staff/tamisa-hunzwi.webp",
  },
  {
    name: "Mrs S Taylor",
    title: "Junior Indigo Room",
    image: "/images/staff/steph-taylor.webp",
  },
  {
    name: "Mrs M Mutuke",
    title: "Junior Indigo & Stnley Dorm",
    image: "/images/staff/mufaro-mutuke.webp",
  },
  {
    name: "Mr C Eksteen",
    title: "Outdoor Education",
    image: "/images/staff/clint-eksteen.webp",
  },
  {
    name: "Mr T Duwa",
    title: "I.T. Department",
    image: "/images/staff/tendai-duwa.webp",
  },
  {
    name: "Mr E Herema",
    title: "Music Department",
    image: "/images/staff/elisha-herema.webp",
  },
  {
    name: "Mrs K Mangenah",
    title: "Shona Teacher",
    image: "/images/staff/kudzi-mangenah.webp",
  },
  {
    name: "Mr J Ndlovu",
    title: "Shona Teacher",
    image: "/images/staff/julian-ndlovu.webp",
  },
  {
    name: "Mrs A Mashungu",
    title: "Library",
    image: "/images/staff/arina-mashungu.webp",
  },
  {
    name: "Mr G Dabbs",
    title: "Estates Manager",
    image: "/images/staff/graham-dabbs.webp",
  },
  {
    name: "Mrs H Taylor",
    title: "Head of Housekeeping",
    image: "/images/staff/hayley-taylor.webp",
  },
  {
    name: "Mr D Taylor",
    title: "Head of Catering",
    image: "/images/staff/dylan-taylor.webp",
  },
  {
    name: "Sr T Ncomanzi",
    title: "Head of Sanatorium",
    image: "/images/staff/tendai-ncomanzi.webp",
  },
  {
    name: "Sr M Gottwald",
    title: "Assistant San Sister & Boys Matron Assistant",
    image: "/images/staff/melody-gottwald.webp",
  },
  {
    name: "Ms L Neves",
    title: "Gibbs Dorm",
    image: "/images/staff/lynn-neeves.webp",
  },
  {
    name: "Ms E Gillot",
    title: "Bob Williams Dorm",
    image: "/images/staff/elaine-gillot.webp",
  },
  {
    name: "Mr R Biyason",
    title: "Boys Dormitory",
    image: "/images/staff/russel-biyason.webp",
  },
  {
    name: "Mr M Matema",
    title: "Sports' Department",
    image: "/images/staff/munyaradzi-matema.webp",
  },
  {
    name: "Mrs M Cooper",
    title: "Head of Marketing & Registrar",
    image: "/images/staff/michelle-cooper.webp",
  },
  {
    name: "Mr B Billing",
    title: "Head of I.T.",
    image: "/images/staff/bryce-billing.webp",
  },
  {
    name: "Mrs S Shattock",
    title: "Front Office",
    image: "/images/staff/shannon-shattock.webp",
  },
  {
    name: "Mr P Chimwayange",
    title: "Reception",
    image: "/images/staff/peter-chimwayange.webp",
  },
  {
    name: "Mrs T Herema",
    title: "Bursar",
    image: "/images/staff/tanaka-herema.webp",
  },
  {
    name: "Mrs B Chimusoro",
    title: "Assistant Bursar",
    image: "/images/staff/bertha-chimusoro.webp",
  },
  {
    name: "Mr C Beattie",
    title: "Finance & Projects",
    image: "/images/staff/colin-beattie.webp",
  },
];

export default function StaffPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Staff"
        description="Meet the dedicated staff team at Ruzawi School, who guide, care for and inspire the children each day."
        path="/staff"
        image="/images/staff-hero.webp"
      />

      <TopBar />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden bg-black">
          <img
            src="/images/staff-hero.webp"
            alt="Ruzawi School staff"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

          <div className="relative z-10 flex min-h-[72vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 lg:ml-12 lg:px-8 xl:ml-20">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-[#B6D7E7]">
              Our Staff
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.08] text-white md:text-6xl lg:text-7xl">
              The people who shape daily life at Ruzawi
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Meet the dedicated team who guide, care for and inspire the
              children at Ruzawi School.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#47778D] px-6 py-8 text-center text-white lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-serif text-xl leading-relaxed md:text-2xl lg:text-3xl">
              Our Staff Team
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-[#B6D7E7]">
              Dedicated to care, learning and growth
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-8">
          <div className="mb-12 grid gap-10 lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.26em] text-[#47778D]">
                Meet the team
              </p>

              <h2 className="mt-4 max-w-5xl font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl">
                Staff who know, nurture and guide each child
              </h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staffMembers.map((staffMember, index) => (
              <article
                key={`${staffMember.name}-${staffMember.title}-${index}`}
                className="group grid grid-cols-[72px_1fr] overflow-hidden rounded-xl bg-[#47778D] text-white shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-center bg-[#47778D] px-2 py-5">
                  <h3 className="font-serif text-2xl font-semibold leading-tight text-white [writing-mode:vertical-rl] rotate-180">
                    {staffMember.name}
                  </h3>
                </div>

                <div className="p-4">
                  <div className="aspect-[4/5] overflow-hidden rounded-lg bg-white/15">
                    <img
                      src={staffMember.image}
                      alt={`${staffMember.name}, ${
                        staffMember.title || "Ruzawi staff member"
                      }`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {staffMember.title && (
                    <p className="px-2 pb-2 pt-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-[#B6D7E7]">
                      {staffMember.title}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
