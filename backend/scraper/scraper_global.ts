import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function downloadImage(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function scrapeImages() {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  
  await page.goto('https://www.entirestudios.com/product/surge-skirt-koi');

  const imageUrls = await page.evaluate(() => {
    const images = document.querySelectorAll('.es-character-image img');
    return Array.from(images).map(img => {
      return (img as HTMLImageElement).src || 
             (img as HTMLImageElement).getAttribute('data-src') || 
             (img as HTMLImageElement).currentSrc;
    }).filter(url => url);
  });

  // Directorio de pruebas
  const downloadDir = path.join(__dirname, 'downloaded_images');
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }

  console.log(`Encontradas ${imageUrls.length} imágenes`);
  for (let [index, url] of imageUrls.entries()) {
    if (url) {
      const filename = path.join(downloadDir, `surge_skirt_${index}.webp`);
      console.log(`Descargando (${index + 1}/${imageUrls.length}): ${url}`);
      try {
        await downloadImage(url, filename);
        console.log(`✓ Descargada: ${filename}`);
      } catch (error) {
        console.error(`✗ Error descargando ${url}:`, error);
      }
    }
  }

  await browser.close();
  console.log('¡Descarga completada!');
}

scrapeImages().catch(console.error);