export default function VideoCard({
  title,
  src,
  description,
  type = "embed",
  image = "/images/video-placeholder.webp",
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-black/5">
      <div className="aspect-video bg-black">
        {type === "video" ? (
          <video
            src={src}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
          />
        ) : type === "external" ? (
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-full w-full overflow-hidden"
          >
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-60"
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#00582C] shadow-xl transition group-hover:bg-[#B6D7E7]">
                <span className="ml-1 text-2xl">▶</span>
              </div>
            </div>
          </a>
        ) : (
          <iframe
            src={src}
            title={title}
            className="h-full w-full"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl font-semibold text-[#00582C]">
          {title}
        </h3>

        {description && (
          <p className="mt-3 leading-7 text-[#3f5148]">{description}</p>
        )}
      </div>
    </div>
  );
}
