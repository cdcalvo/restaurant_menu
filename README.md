# El Rey de la Salchipapa — Demo offline del menú

Demo estático, de solo lectura, de la interfaz que corre en las tabletas del
restaurante (la misma que sirve el panel admin en `restaurant-admin`). Pensado
para GitHub Pages: **no tiene backend, no llama a ninguna API** — todo el
contenido (categorías, platos, precios, imágenes, videos del carrusel, QR)
está descargado y "horneado" en `data/snapshot.js`.

Publicado en: https://cdcalvo.github.io/restaurant_menu/

## Cómo está armado

- `index.html`, `menu.html`, `category.html`, `assets/css/`, `assets/js/`,
  `assets/fonts/` — copia exacta del código que sirve producción hoy
  (verificado por checksum), fuente: `restaurant-admin/content/`.
- `assets/js/db.js` es la **única** pieza distinta al código real: en vez de
  leer IndexedDB o el bridge nativo de Android, devuelve directamente
  `window.__SNAPSHOT__`. Todo lo demás (`menu.js`, `adapter.js`,
  `menu-engine.js`, `carousel.js`) es idéntico al de producción — no tienen
  ni idea de que están corriendo en modo demo.
- `data/snapshot.js` — el "congelado" de datos reales (categorías, platos,
  restaurante, carrusel, QR) generado por `scripts/refresh.mjs`.
- `assets/img/`, `assets/videos/` — todas las imágenes/videos del snapshot,
  descargados a disco y con rutas reescritas a relativas.

## Ver el demo en local

Cualquier servidor estático sirve. Por ejemplo:

```bash
python3 -m http.server 8123
# abrir http://localhost:8123/index.html
```

(Abrir `index.html` directamente con doble clic / `file://` también
funciona — no depende de `fetch`, todo el dato viaja en un `<script>`.)

## Actualizar los datos (precios, platos, imágenes nuevas)

```bash
node scripts/refresh.mjs
```

Vuelve a pegarle a `https://salchipapa-admin.vercel.app/api/public/sync/all`,
descarga cualquier imagen/video nuevo y regenera `data/snapshot.js`. Después:

```bash
git add -A
git commit -m "Refresh: snapshot vN"
git push
```

## Actualizar el código (HTML/CSS/JS)

Este repo **no** se actualiza solo cuando cambia `restaurant-admin/content/`.
Si se tocó el template o los estilos allá, copiar a mano:

```bash
SRC=/Users/cdcalvo/Projects/Personal/restaurant-admin
DST=/Users/cdcalvo/Projects/Personal/restaurant_menu

cp "$SRC"/content/templates/*.html "$DST"/
cp "$SRC"/content/assets/css/*.css "$DST"/assets/css/
cp "$SRC"/content/assets/js/{config,adapter,carousel,menu,menu-engine,index}.js "$DST"/assets/js/
cp "$SRC"/public/assets/fonts/*.woff2 "$DST"/assets/fonts/
```

**No** copiar `content/assets/js/db.js` — el de este repo es intencionalmente
distinto (ver arriba). Si el `db.js` real cambia su forma pública
(`save`/`get`/`getVersion`/`loadFast`), hay que replicar el cambio a mano en
`assets/js/db.js` de este repo.

## Nota

Esto es una foto fija de producción al momento del último `refresh.mjs`, no
un espejo en vivo. Puede reflejar cosas tal cual estén en producción en ese
momento (por ejemplo, algún dato pendiente de subir desde el panel admin).
