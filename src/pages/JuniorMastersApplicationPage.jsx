import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import JuniorMastersApplicationForm from "../components/JuniorMastersApplicationForm";

export default function JuniorMastersApplicationPage() {
  return (
    <div className="bg-[#f6f1e7] text-[#10251c]">
      <SEO
        title="Apply to be a Junior Master or Mistress"
        description="Submit your Junior Master or Mistress application to Ruzawi School and upload your CV."
        path="/junior-masters-and-mistresses/apply"
        image="/images/junior-masters-hero.webp"
      />

      <TopBar />

      <main className="pt-28">
        <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-14 lg:px-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#47778D]">
              Apply to be a JM
            </p>

            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-semibold leading-tight text-[#00582C] md:text-6xl lg:text-7xl">
              Junior Master or Mistress Application
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-9 text-[#35443a] md:text-xl">
              Complete the application form below and upload your CV. Your
              application will be sent directly to Ruzawi School.
            </p>
          </div>
        </section>

        <JuniorMastersApplicationForm />

        <Footer />
      </main>
    </div>
  );
}
