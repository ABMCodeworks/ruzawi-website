// pdf-whole-website.cjs
const { chromium } = require("playwright");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:5173";

const pages = [
  "/",
  "/governance",
  "/boarding-life",
  "/sports-and-clubs",
  "/academic-life",
  "/school-life",
  "/contact",
  "/online-application",
  "/welcome-from-the-headmaster",
  "/why-ruzawi",
  "/tradition-at-ruzawi",
  "/ropa",
  "/magazines",
  "/projects-and-venture-capital",
  "/junior-masters-and-mistresses",
];

const outputDir = path.join(__dirname, "website-pdfs");
const finalPdfPath = path.join(__dirname, "whole-website.pdf");

function safeFileName(urlPath) {
  if (urlPath === "/") return "home.pdf";

  return (
    urlPath
      .replace(/^\/+/, "")
      .replace(/\/+$/, "")
      .replace(/[^\w-]+/g, "-") + ".pdf"
  );
}

async function createPagePdfs() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 1200,
    },
  });

  const pdfFiles = [];

  for (const pagePath of pages) {
    const url = `${BASE_URL}${pagePath}`;
    const fileName = safeFileName(pagePath);
    const filePath = path.join(outputDir, fileName);

    console.log(`Creating PDF: ${url}`);

    try {
      await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 90000,
      });

      await page.emulateMedia({
        media: "print",
      });

      await page.pdf({
        path: filePath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
          top: "10mm",
          right: "8mm",
          bottom: "10mm",
          left: "8mm",
        },
      });

      pdfFiles.push(filePath);
    } catch (error) {
      console.error(`Failed to PDF: ${url}`);
      console.error(error.message);
    }
  }

  await browser.close();

  return pdfFiles;
}

async function mergePdfs(pdfFiles) {
  const mergedPdf = await PDFDocument.create();

  for (const pdfFile of pdfFiles) {
    const pdfBytes = fs.readFileSync(pdfFile);
    const pdf = await PDFDocument.load(pdfBytes);

    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

    for (const copiedPage of copiedPages) {
      mergedPdf.addPage(copiedPage);
    }
  }

  const mergedPdfBytes = await mergedPdf.save();

  fs.writeFileSync(finalPdfPath, mergedPdfBytes);

  console.log("");
  console.log(`Done: ${finalPdfPath}`);
}

async function main() {
  const pdfFiles = await createPagePdfs();

  if (pdfFiles.length === 0) {
    console.log("No PDFs were created.");
    return;
  }

  await mergePdfs(pdfFiles);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
