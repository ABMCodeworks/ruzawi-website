export function slugify(text) {
  return `/${text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/\./g, "")
    .replace(/’/g, "")
    .replace(/'/g, "")
    .replace(/\s+/g, "-")}`;
}
