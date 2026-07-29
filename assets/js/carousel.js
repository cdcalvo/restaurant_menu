// ================================================================
// CAROUSEL.JS — carrusel compartido por index.html y menu.html
// Cada página lo instancia con carouselInit(items); la lógica vive
// solo aquí (antes estaba duplicada en index.js y menu.js).
// Requiere en el DOM: #carouselTrack y #carouselDots.
// ================================================================
let _carouselIndex = 0;
let _carouselTimer;
let _carouselItems = [];

function carouselInit(items) {
    _carouselItems = items || [];
    const track = document.getElementById('carouselTrack');
    const dots  = document.getElementById('carouselDots');
    if (!track || !dots) return;

    // Estilos para slides (video + fade-in) — inyectados una sola vez.
    // El fade-in convierte el "pop" de decodificación de imágenes pesadas
    // en una transición suave sobre el fondo oscuro del slide.
    if (!document.getElementById('carousel-video-styles')) {
        const style = document.createElement('style');
        style.id = 'carousel-video-styles';
        style.textContent =
            '.carousel-slide--video video{width:100%;height:100%;object-fit:cover;display:block;}' +
            '.carousel-slide img,.carousel-slide--video video{opacity:0;transition:opacity 0.35s ease;}' +
            '.carousel-slide img.carousel-media-loaded,.carousel-slide--video video.carousel-media-loaded{opacity:1;}';
        document.head.appendChild(style);
    }

    track.innerHTML = _carouselItems
        .filter(item => item.imageUrl)
        .map(item => item.mediaType === 'video' ? `
        <div class="carousel-slide carousel-slide--video">
            <video autoplay muted loop playsinline src="${item.imageUrl}"></video>
        </div>` : `
        <div class="carousel-slide" style="--slide-bg: url('${item.imageUrl}')">
            <img src="${item.imageUrl}" alt="Promoción">
        </div>`).join('');

    // Fade-in: cada media aparece cuando su decode terminó (o ya estaba lista)
    track.querySelectorAll('img').forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('carousel-media-loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('carousel-media-loaded'), { once: true });
            img.addEventListener('error', () => img.classList.add('carousel-media-loaded'), { once: true });
        }
    });
    track.querySelectorAll('video').forEach(video => {
        if (video.readyState >= 2) {
            video.classList.add('carousel-media-loaded');
        } else {
            video.addEventListener('loadeddata', () => video.classList.add('carousel-media-loaded'), { once: true });
            video.addEventListener('error', () => video.classList.add('carousel-media-loaded'), { once: true });
        }
    });

    dots.innerHTML = _carouselItems.map((_, i) =>
        `<button class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="carouselGoTo(${i})"></button>`
    ).join('');

    if (_carouselItems.length <= 1) {
        document.querySelectorAll('.carousel-btn').forEach(b => b.style.display = 'none');
        dots.style.display = 'none';
    }

    _carouselSyncVideoPlayback();

    // Swipe táctil
    let _swipeStartX = 0;
    track.addEventListener('touchstart', function(e) {
        _swipeStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function(e) {
        const dx = e.changedTouches[0].clientX - _swipeStartX;
        if (Math.abs(dx) > 50) carouselMove(dx < 0 ? 1 : -1);
    }, { passive: true });

    _carouselAutoPlay();
}

function carouselGoTo(index) {
    if (!_carouselItems.length) return;
    _carouselIndex = (index + _carouselItems.length) % _carouselItems.length;
    const track = document.getElementById('carouselTrack');
    if (track) track.style.transform = `translateX(-${_carouselIndex * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === _carouselIndex));
    _carouselSyncVideoPlayback();
    clearInterval(_carouselTimer);
    _carouselAutoPlay();
}

function carouselMove(dir) { carouselGoTo(_carouselIndex + dir); }

// Pausa el video de cualquier slide que no sea el activo (y reanuda el
// activo). Sin esto, un <video autoplay loop> queda reproduciendo para
// siempre aunque el carrusel ya lo haya desplazado fuera de pantalla, y
// Chromium retiene su wake lock interno mientras tanto (evita que la
// tablet apague la pantalla por inactividad).
function _carouselSyncVideoPlayback() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    track.querySelectorAll('.carousel-slide').forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (!video) return;
        if (i === _carouselIndex) {
            video.play().catch(() => {});
        } else if (!video.paused) {
            video.pause();
        }
    });
}

function _carouselAutoPlay() {
    if (_carouselItems.length > 1) {
        _carouselTimer = setInterval(() => carouselMove(1), 10000);
    }
}
