// ================================================================
// INDEX.JS — Página principal
// Las imágenes del carrusel se leen desde IndexedDB (location === 'main').
// La lógica del carrusel vive en carousel.js (compartida con menu.html).
// ================================================================

document.addEventListener('DOMContentLoaded', async function () {
    const stored = await MenuDB.loadFast();

    // Título dinámico por restaurante (mismo patrón que menu.js)
    if (stored && stored.restaurant && stored.restaurant.name) {
        document.title = stored.restaurant.name;
    }

    const now = new Date();
    const mainImages = (stored?.carouselImages || [])
        .filter(img => img.location === 'main')
        .filter(img => (!img.startDate || new Date(img.startDate) <= now)
                    && (!img.endDate   || new Date(img.endDate)   >= now));

    carouselInit(mainImages.length > 0 ? mainImages : []);

    const btn = document.querySelector('.cta-button');
    if (btn) {
        setInterval(() => {
            btn.style.transform = 'scale(1.03)';
            setTimeout(() => { btn.style.transform = ''; }, 220);
        }, 5000);
    }
});
