import { useEffect } from "react";

const SITE_NAME = "Ruzawi School";
const SITE_URL = "https://www.ruzawi.com";
const DEFAULT_IMAGE = "/images/seo-cover.jpg";

export default function SEO({
  title = "Ruzawi School",
  description = "Ruzawi School is a co-educational Anglican preparatory boarding school near Marondera, Zimbabwe.",
  path = "/",
  image = DEFAULT_IMAGE,
}) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;

    updateMeta("description", description);
    updateMeta("robots", "index, follow");

    updateLink("canonical", canonicalUrl);

    updateProperty("og:type", "website");
    updateProperty("og:title", fullTitle);
    updateProperty("og:description", description);
    updateProperty("og:url", canonicalUrl);
    updateProperty("og:site_name", SITE_NAME);
    updateProperty("og:image", imageUrl);
    updateProperty("og:image:alt", fullTitle);

    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", imageUrl);
  }, [title, description, path, image]);

  return null;
}

function updateMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function updateProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function updateLink(rel, href) {
  let tag = document.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}
