document.addEventListener("DOMContentLoaded", function() {
  function openModal(card) {
    const item = card;
    const modal = document.getElementById('dish-modal');
    const modalImg = document.getElementById('dish-modal-img');
    modalImg.src = item.dataset.img || 'assets/img/default-plato.jpg';
    modalImg.alt = item.dataset.name || '';
    document.getElementById('dish-modal-title').textContent = item.dataset.name || '';
    document.getElementById('dish-modal-price').textContent = item.dataset.price || '';
    document.getElementById('dish-modal-desc').textContent = item.dataset.desc || '';

    // Tags
    const tags = (item.dataset.tags || '').split(',').filter(Boolean);
    const tagsCont = document.getElementById('dish-modal-tags');
    tagsCont.innerHTML = '';
    tags.forEach(tag => {
      const el = document.createElement('span');
      el.className = 'dish-modal-tag';
      el.textContent = tag;
      tagsCont.appendChild(el);
    });

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  window.openModalFromBtn = function(event, btn) {
    event.stopPropagation();
    openModal(btn.closest('.food-item'));
  };

  window.closeModal = function() {
    document.getElementById('dish-modal').classList.remove('show');
    document.body.style.overflow = '';
  };

  // Cierra el modal si se hace click fuera del contenido, del botón VER o de la card
  document.addEventListener('click', function(e) {
    const modal = document.getElementById('dish-modal');
    if (modal.classList.contains('show')) {
      // No cerrar si el click es en el modal, en el botón VER o en la card
      if (e.target.closest('.dish-modal-content') || e.target.closest('.see-btn') || e.target.closest('.food-item')) {
        return;
      }
      window.closeModal();
    }
  });

  // Cierra con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") window.closeModal();
  });

  // Abre el modal al hacer click en la card (menos el botón "VER")
  document.querySelectorAll('.food-item').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.see-btn')) return;
      openModal(card);
    });
  });
});

// ScrollTop Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// --- Scroll suave y lento a secciones desde filter-bar y scroll top ---
// Offset para que el título no quede tapado por la barra fija (ajusta a tu barra)
const SCROLL_OFFSET = 70;

function smoothScrollTo(target, duration = 900, offset = SCROLL_OFFSET) {
  const startY = window.scrollY;
  const targetY = typeof target === 'number'
    ? target
    : target.getBoundingClientRect().top + window.scrollY - offset;
  const distance = targetY - startY;
  let startTime = null;
  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    // easeInOutCubic
    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const progress = Math.min(timeElapsed / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

// Scroll suave al inicio con el botón scrollTopBtn
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    smoothScrollTo(0, 900, 0); // scroll lento al inicio, sin offset
  });
}

// Si tus botones usan data-section para navegar por secciones, activa scroll lento con offset
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Cambia la clase activa visualmente
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const section = btn.getAttribute('data-section');
    if (section) {
      const target = document.getElementById(section);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target, 900, SCROLL_OFFSET); // offset para no tapar el título
      }
    }
  });
});

// --- Filtro de platos por categoría (si lo usas) ---
// Si tienes lógica de filtro, puedes agregar aquí (opcional)
// Ejemplo básico (descomenta si necesitas filtrar los platos)
/*
const filterButtons = document.querySelectorAll('.filter-btn');
const foodItems = document.querySelectorAll('.food-item');
filterButtons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtro = btn.textContent.trim().toLowerCase();
    foodItems.forEach(item => {
      if (filtro === 'todos') {
        item.style.display = '';
      } else {
        const nombre = item.getAttribute('data-name')?.toLowerCase();
        if (nombre && nombre.includes(filtro)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});
*/