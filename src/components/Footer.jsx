import SectionIntro from "./SectionIntro";
import ImageLinkCard from "./ImageLinkCard";
import { footerButtons } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="bg-[#47778D] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="More from Ruzawi"
          title="Explore More from Ruzawi"
          body="Learn more about working at Ruzawi, keeping up with school life through our magazines, and staying connected through ROPA, the Ruzawi Old Pupils’ Association."
          light
        />

        <div className="grid gap-6 md:grid-cols-3">
          {footerButtons.map((item) => (
            <ImageLinkCard key={item.title} {...item} large />
          ))}
        </div>
      </div>
    </footer>
  );
}
