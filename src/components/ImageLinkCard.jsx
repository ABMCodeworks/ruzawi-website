export default function ImageLinkCard({ title, href, image, large = false }) {
  return (
    <a
      href={href}
      className={`group relative block overflow-hidden rounded-[2rem] bg-[#00582C] shadow-xl ${
        large ? "min-h-[360px]" : "min-h-[260px]"
      }`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#B6D7E7]">
          Explore
        </p>

        <h3 className="font-serif text-3xl font-semibold leading-tight text-white">
          {title}
        </h3>
      </div>
    </a>
  );
}
