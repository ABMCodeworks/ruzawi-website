export default function SectionIntro({
  eyebrow,
  title,
  body,
  light = false,
  centered = false,
}) {
  return (
    <div
      className={`mb-10 ${
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }`}
    >
      {eyebrow && (
        <p
          className={`text-sm font-bold uppercase tracking-[0.26em] ${
            light ? "text-[#B6D7E7]" : "text-[#47778D]"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl ${
          light ? "text-white" : "text-[#00582C]"
        }`}
      >
        {title}
      </h2>

      {body && (
        <p
          className={`mt-5 text-lg leading-8 ${
            light ? "text-white/75" : "text-[#32433a]"
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
