import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const imageDir = path.resolve("public/images");

const allowedExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function getImageFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const files = await Promise.all(
        entries.map(async (entry) => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                return getImageFiles(fullPath);
            }

            const ext = path.extname(entry.name).toLowerCase();

            if (allowedExtensions.has(ext)) {
                return [fullPath];
            }

            return [];
        }),
    );

    return files.flat();
}

async function convertImages() {
    const files = await getImageFiles(imageDir);

    if (files.length === 0) {
        console.log("No JPG, JPEG or PNG files found.");
        return;
    }

    for (const file of files) {
        const output = file.replace(path.extname(file), ".webp");

        await sharp(file)
            .rotate()
            .webp({
                quality: 82,
                effort: 6,
            })
            .toFile(output);

        console.log(`Converted: ${path.relative(process.cwd(), output)}`);
    }

    console.log(`Done. Converted ${files.length} image(s) to WebP.`);
}

convertImages().catch((error) => {
    console.error(error);
    process.exit(1);
});
