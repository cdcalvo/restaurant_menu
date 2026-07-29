// ================================================================
// MENÚ DB — variante ESTÁTICA para el demo offline.
//
// El db.js real (restaurant-admin/content/assets/js/db.js) lee de
// IndexedDB o del bridge nativo Android. Este demo no tiene backend
// (GitHub Pages / file://), así que en su lugar sirve directamente
// el snapshot congelado por scripts/refresh.mjs (data/snapshot.js,
// cargado antes que este archivo y expuesto en window.__SNAPSHOT__).
//
// Misma API pública que el db.js real — menu.js/index.js/category.html
// no necesitan saber la diferencia.
// ================================================================
const MenuDB = (() => {
  return {
    async save() {
      // No-op: el snapshot es de solo lectura en el demo.
    },
    async get() {
      return window.__SNAPSHOT__ || null;
    },
    async getVersion() {
      return (window.__SNAPSHOT__ && window.__SNAPSHOT__.version) || 0;
    },
    async loadFast() {
      return window.__SNAPSHOT__ || null;
    },
  };
})();
