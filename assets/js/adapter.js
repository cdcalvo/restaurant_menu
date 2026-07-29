// ================================================================
// MENÚ ADAPTER — convierte formato RestHub → formato MenuEngine
//
// RestHub API:
//   { version, categories: [{ name, nameEn, slug, emoji, color,
//       dishes: [...], subcategories: [{ name, nameEn, slug, dishes }] }] }
//
// MenuEngine espera:
//   { [slug]: [{ title, description, price, priceLabels, image, emoji, tags }] }
// ================================================================
const MenuAdapter = (() => {

  function adaptDish(dish, fallbackEmoji) {
    const variants = Array.isArray(dish.variants) && dish.variants.length > 0
      ? dish.variants
      : null;

    return {
      title:       (dish.nameEn || dish.name || '').toUpperCase(),
      // description (legacy): la mantiene el código viejo cacheado en tablets.
      // El engine actual usa descriptionEn/descriptionEs + la config de idioma.
      description:   dish.descriptionEs || dish.description || '',
      descriptionEn: dish.description || '',
      descriptionEs: dish.descriptionEs || '',
      price:       variants
                     ? variants.map(v => parseFloat(v.price).toFixed(2))
                     : (dish.price != null ? parseFloat(dish.price).toFixed(2) : ''),
      priceLabels: variants ? variants.map(v => (v.label || '').toUpperCase()) : [],
      image:       dish.imageUrl || '',
      emoji:       fallbackEmoji || '🍽️',
      tags:        dish.tags || [],
    };
  }

  return {
    /**
     * Devuelve { data, labels } para una categoría principal (por slug).
     *
     * - Sin subcategorías: { data: { [slug]: [...] }, labels: { [slug]: 'Name' } }
     * - Con subcategorías: { data: { [sub.slug]: [...], ... }, labels: { ... } }
     */
    getCategoryData(categories, mainSlug) {
      const cat = (categories || []).find(c => c.slug === mainSlug);
      if (!cat) return { data: {}, labels: {} };

      const data   = {};
      const labels = {};

      const hasSubs = cat.subcategories && cat.subcategories.length > 0;

      if (hasSubs) {
        // Platos directos de la categoría padre (si los hay)
        if (cat.dishes && cat.dishes.length > 0) {
          data[cat.slug]   = cat.dishes.map(d => adaptDish(d, cat.emoji));
          labels[cat.slug] = cat.nameEn || cat.name;
        }
        // Subcategorías
        cat.subcategories.forEach(sub => {
          data[sub.slug]   = (sub.dishes || []).map(d => adaptDish(d, sub.emoji || cat.emoji));
          labels[sub.slug] = sub.nameEn || sub.name;
        });
      } else {
        data[cat.slug]   = (cat.dishes || []).map(d => adaptDish(d, cat.emoji));
        labels[cat.slug] = cat.nameEn || cat.name;
      }

      return { data, labels };
    },

    /**
     * Devuelve el listado de categorías principales para menu.html.
     * Formato: [{ slug, name, nameEn, emoji, hideEmoji, hideArrow, color }]
     */
    getCategoriesList(categories) {
      return (categories || []).map(cat => ({
        slug:      cat.slug,
        name:      cat.name,
        nameEn:    cat.nameEn || '',
        emoji:     cat.emoji || '🍽️',
        hideEmoji: !!cat.hideEmoji,
        hideArrow: !!cat.hideArrow,
        color:     cat.color || '255, 195, 0',
      }));
    },
  };
})();
