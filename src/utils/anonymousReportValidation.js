export function getReportError(report) {
  if (typeof report !== "string" || !report.trim() || report.trim().length > 10000) {
    return "Please enter a report of up to 10,000 characters.";
  }

  // Normalise common disguised URL characters before checking. The original
  // report is never interpreted as HTML or used to fetch external resources.
  let text = report.normalize("NFKC").replace(/\p{Cf}/gu, "");
  for (let i = 0; i < 2; i++) {
    text = text.replace(/%([0-9a-f]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }
  const links = /[a-z][a-z0-9+.-]*:\/\/|\b(?:mailto|tel|data|javascript|vbscript|file|blob):|www\s*\.|(?:[\p{L}\p{N}-]+\.)+[\p{L}]{2,}(?![\p{L}\p{N}])|\b(?:\d{1,3}\.){3}\d{1,3}\b|(?:^|\s)(?:\/\/|\\\\)\S+|\[[^\]]*\]\s*\([^)]*\)/iu;
  if (links.test(text) || /<\/?[a-z][^>]*>/i.test(text)) {
    return "Please remove links and HTML from your report. Only plain text is allowed; files cannot be attached.";
  }
  return "";
}
