import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImage(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const fileStream = fs.createWriteStream(filename);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });
      })
      .on("error", reject);
  });
}

async function scrapeImages() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.entirestudios.com/collection/drop-10/tag:leather",
  );

  const imageUrls = await page.evaluate(() => {
    const images = document.querySelectorAll(".lazyloaded-simple");
    return Array.from(images).map((img) => {
      return (
        (img as HTMLImageElement).src ||
        (img as HTMLImageElement).getAttribute("data-src") ||
        (img as HTMLImageElement).currentSrc
      );
    });
  });

  // Directorio de pruebas ignorado
  const downloadDir = path.join(__dirname, "simple_images");
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }

  for (let [index, url] of imageUrls.entries()) {
    if (url) {
      const filename = path.join(downloadDir, `image_${index}.webp`);
      console.log(`Descargando: ${url}`);
      await downloadImage(url, filename);
    }
  }

  await browser.close();
  console.log("¡Descarga completada!");
}

scrapeImages().catch(console.error);
