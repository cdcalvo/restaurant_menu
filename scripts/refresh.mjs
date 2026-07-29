#!/usr/bin/env node
// ================================================================
// REFRESH — vuelve a congelar el snapshot offline con los datos
// reales de producción (El Rey de la Salchipapa).
//
// Qué hace:
//   1. Llama a /api/public/sync/all en producción.
//   2. Descarga cada imagen/video referenciado (platos, carrusel,
//      logo, QR) a disco, deduplicando por URL.
//   3. Reescribe esas URLs a rutas locales relativas.
//   4. Escribe data/snapshot.js con `window.__SNAPSHOT__ = {...}`.
//
// Qué NO hace: actualizar el HTML/CSS/JS (index.html, menu.html,
// category.html, assets/css, assets/js). Ese código vive en
// restaurant-admin/content/ — si cambió, cópialo a mano desde ahí
// (ver README.md → "Actualizar el código").
//
// Uso: node scripts/refresh.mjs [prodUrl]
//   node scripts/refresh.mjs
//   node scripts/refresh.mjs https://salchipapa-admin.vercel.app
// ================================================================

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROD_URL = process.argv[2] || 'https://salchipapa-admin.vercel.app';

function localPathFromUrl(url) {
  // "https://pub-xxx.r2.dev/assets/img/entradas/foo.webp" → "assets/img/entradas/foo.webp"
  return new URL(url).pathname.replace(/^\//, '');
}

async function downloadOnce(url, cache) {
  if (!url) return url;
  if (cache.has(url)) return cache.get(url);

  const localPath = localPathFromUrl(url);
  const diskPath = join(ROOT, localPath);

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ⚠️  ${res.status} al descargar ${url} — se deja la URL original`);
    cache.set(url, url);
    return url;
  }

  await mkdir(dirname(diskPath), { recursive: true });
  await writeFile(diskPath, Buffer.from(await res.arrayBuffer()));
  cache.set(url, localPath);
  console.log(`  ✓ ${localPath}`);
  return localPath;
}

async function main() {
  console.log(`→ Descargando datos de ${PROD_URL}/api/public/sync/all ...`);
  const res = await fetch(`${PROD_URL}/api/public/sync/all`);
  if (!res.ok) throw new Error(`sync/all respondió ${res.status}`);
  const data = await res.json();

  const cache = new Map(); // url -> localPath, evita descargar dos veces la misma imagen

  console.log('→ Restaurante y logo...');
  if (data.restaurant) {
    if (data.restaurant.logoUrl) {
      data.restaurant.logoPath = await downloadOnce(data.restaurant.logoUrl, cache);
      data.restaurant.logoUrl = data.restaurant.logoPath;
    }
  }

  console.log('→ Carrusel...');
  for (const img of data.carouselImages || []) {
    img.imageUrl = await downloadOnce(img.imageUrl, cache);
  }

  console.log('→ QR codes...');
  for (const qr of data.qrCodes || []) {
    if (qr.imageUrl) qr.imageUrl = await downloadOnce(qr.imageUrl, cache);
    if (qr.logoUrl)  qr.logoUrl  = await downloadOnce(qr.logoUrl, cache);
  }

  console.log('→ Platos...');
  let dishCount = 0;
  for (const cat of data.categories || []) {
    const groups = [cat, ...(cat.subcategories || [])];
    for (const group of groups) {
      for (const dish of group.dishes || []) {
        if (dish.imageUrl) dish.imageUrl = await downloadOnce(dish.imageUrl, cache);
        dishCount++;
      }
    }
  }

  console.log('→ Apariencia (fondo del menú)...');
  if (data.appearance) {
    if (data.appearance.bgType === 'image' && data.appearance.bgImageUrl) {
      data.appearance.bgImageUrl = await downloadOnce(data.appearance.bgImageUrl, cache);
    }
  }

  const snapshot = {
    version: data.version,
    restaurant: data.restaurant,
    categories: data.categories,
    carouselImages: data.carouselImages,
    qrCodes: data.qrCodes,
    appearance: data.appearance,
    generatedAt: new Date().toISOString(),
    sourceUrl: PROD_URL,
  };

  const outPath = join(ROOT, 'data', 'snapshot.js');
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(
    outPath,
    `// Generado por scripts/refresh.mjs — no editar a mano.\n` +
    `// Fuente: ${PROD_URL} — ${snapshot.generatedAt}\n` +
    `window.__SNAPSHOT__ = ${JSON.stringify(snapshot, null, 2)};\n`
  );

  console.log(`\n✅ Listo. v${snapshot.version} — ${data.categories?.length ?? 0} categorías, ${dishCount} platos, ${cache.size} archivos descargados.`);
  console.log(`   data/snapshot.js actualizado.`);
}

main().catch((err) => {
  console.error('❌ Falló el refresh:', err);
  process.exit(1);
});
