/* ============================================================
 *  MENU.JS — Genera categorías, logo y QR codes dinámicamente
 *  desde los datos sincronizados en IndexedDB.
 *  La lógica del carrusel vive en carousel.js (compartida).
 * ============================================================ */

// Escape para interpolar datos del admin dentro de innerHTML.
// Cubre & < > " ' — un nombre como «Combo <b>2x1</b> & más» se
// muestra literal en vez de romper el markup.
function _esc(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ── Inicialización principal ──────────────────────────────────
document.addEventListener('DOMContentLoaded', async function () {
    const stored = await MenuDB.loadFast();

    if (!stored || !stored.categories || !stored.categories.length) {
        document.getElementById('categories-grid').innerHTML =
            '<p style="color:rgba(255,255,255,0.5);text-align:center;padding:40px 20px;grid-column:1/-1;">Sin datos disponibles.<br>Conecta a internet para sincronizar.</p>';
        return;
    }

    // ── Logo ─────────────────────────────────────────────────
    const logoImg = document.getElementById('header-logo');
    const logoPath = stored.restaurant && stored.restaurant.logoPath;
    if (logoImg && logoPath) {
        logoImg.src = logoPath;
        logoImg.alt = (stored.restaurant && stored.restaurant.name) || 'Logo';
        logoImg.style.display = '';
    }

    // ── Título de página ──────────────────────────────────────
    const restaurantName = stored.restaurant && stored.restaurant.name;
    if (restaurantName) {
        document.title = restaurantName;
        const titleEl = document.getElementById('qr-title');
        if (titleEl) titleEl.textContent = 'Conéctate con ' + restaurantName;
    }

    // ── Eslogan (Ajustes → Apariencia) ────────────────────────
    // Sin configurar → el bloque completo permanece oculto (display:none
    // ya viene inline en el HTML); nunca se muestra un texto de respaldo.
    const slogan = stored.restaurant && stored.restaurant.slogan;
    if (slogan && slogan.trim()) {
        const section = document.getElementById('brandAccentSection');
        const textEl  = document.getElementById('brandAccentText');
        if (section && textEl) {
            textEl.textContent = slogan;
            section.style.display = '';
        }
    }

    // ── Categorías ──────────────────────────────────────────
    const categories = MenuAdapter.getCategoriesList(stored.categories);
    const menuConfig = (stored.restaurant && stored.restaurant.menuConfig) || {};
    renderMenuCategories(categories, menuConfig);

    // ── Carrusel (solo imágenes con location === 'menu') ─────
    const now = new Date();
    const menuImages = (stored.carouselImages || [])
        .filter(function(img) { return img.location === 'menu'; })
        .filter(function(img) {
            return (!img.startDate || new Date(img.startDate) <= now)
                && (!img.endDate   || new Date(img.endDate)   >= now);
        });
    carouselInit(menuImages);

    // ── QR Codes ─────────────────────────────────────────────
    renderQrCodes(stored.qrCodes || []);
});

// Título/subtítulo de la card de categoría según el idioma configurado
// (Ajustes → Apariencia → "Idioma de categorías"). `name` (español) siempre
// existe; `nameEn` es una traducción opcional. Si el idioma elegido está
// vacío, el título cae al otro — y entonces no queda texto para el
// subtítulo (evita mostrar el mismo texto duplicado en título y subtítulo).
function pickCategoryTitle(cat, categoryTitleLang) {
    const es = cat.name || '';
    const en = cat.nameEn || '';
    if (categoryTitleLang === 'es') {
        return { title: es || en, subtitle: (es && en) ? en : '' };
    }
    return { title: en || es, subtitle: (es && en) ? es : '' };
}

// ── Renderizador de categorías ────────────────────────────────
function renderMenuCategories(categories, menuConfig) {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';
    const categoryTitleLang = (menuConfig && menuConfig.categoryTitleLang) || 'en';

    categories.forEach((cat, index) => {
        const card = document.createElement('div');
        card.className = 'category-card loading';
        card.style.animationDelay = (index + 1) * 0.1 + 's';

        if (cat.color) {
            card.style.setProperty('--card-color', cat.color);
        }

        const { title, subtitle } = pickCategoryTitle(cat, categoryTitleLang);

        // Icono y flecha se pueden ocultar por categoría desde el admin
        // (hideEmoji / hideArrow). Al omitir el div, .category-text
        // (flex: 1) absorbe el espacio automáticamente.
        card.innerHTML = `
            <div class="category-content">
                ${cat.hideEmoji ? '' : `<div class="category-icon">${_esc(cat.emoji)}</div>`}
                <div class="category-text">
                    <h3>${_esc(title)}</h3>
                    ${subtitle ? `<p>${_esc(subtitle)}</p>` : ''}
                </div>
                ${cat.hideArrow ? '' : '<div class="category-arrow">→</div>'}
            </div>`;

        card.addEventListener('click', function () {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => { this.style.transform = ''; }, 200);
            window.location.href = 'category.html#' + cat.slug;
        });

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

        grid.appendChild(card);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.category-card').forEach(card => observer.observe(card));
}


// ── Renderizador de QR Codes ──────────────────────────────────
// Construido con createElement + addEventListener (no strings de
// onclick): un label con apóstrofe ya no rompe el handler.
function renderQrCodes(qrCodes) {
    const grid = document.getElementById('qr-grid');
    if (!grid) return;
    grid.innerHTML = '';
    (qrCodes || []).forEach(qr => {
        if (!qr.imageUrl) return;
        const label = qr.label || '';

        const card = document.createElement('div');
        card.className = 'qr-card';

        if (qr.logoUrl) {
            const logoWrap = document.createElement('div');
            logoWrap.className = 'qr-social-logo';
            const logoImg = document.createElement('img');
            logoImg.src = qr.logoUrl;
            logoImg.alt = label;
            logoWrap.appendChild(logoImg);
            card.appendChild(logoWrap);
        }

        const imgWrap = document.createElement('div');
        imgWrap.className = 'qr-image-wrapper';
        const img = document.createElement('img');
        img.src = qr.imageUrl;
        img.alt = label;
        imgWrap.appendChild(img);
        card.appendChild(imgWrap);

        const hint = document.createElement('div');
        hint.className = 'qr-tap-hint';
        hint.textContent = 'Toca para escanear →';
        card.appendChild(hint);

        card.addEventListener('click', () => openQrModal(qr.imageUrl, label));
        grid.appendChild(card);
    });
}

// ── Modal QR ──────────────────────────────────────────────────
// El markup del modal vive únicamente en menu.html (fuente de verdad
// única); aquí solo se llena y se muestra.
function openQrModal(imageUrl, label) {
    const modal = document.getElementById('qrModal');
    if (!modal) return;
    document.getElementById('qrModalImage').src = imageUrl;
    document.getElementById('qrModalLabel').textContent = label;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQrModal() {
    const modal = document.getElementById('qrModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}
