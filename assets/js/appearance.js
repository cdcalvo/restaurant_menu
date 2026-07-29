// ================================================================
// APPEARANCE — variante web del inyector nativo de Android.
//
// En la app real, MainActivity.kt lee Setting.menu_bg_* / accent_color
// y las inyecta como <style id="app-appearance"> con --menu-bg-color,
// --menu-bg-image y --menu-accent (leídas por menu.css/menu-list.css
// vía var(...)). El navegador no tiene ese bridge nativo, así que este
// script hace lo mismo a partir de window.__SNAPSHOT__.appearance.
//
// Se carga en <head>, antes de los <link rel="stylesheet">, para que
// las custom properties existan antes del primer paint (evita el
// flash de fondo negro sólido → imagen).
// ================================================================
(function () {
  const appearance = window.__SNAPSHOT__ && window.__SNAPSHOT__.appearance;
  if (!appearance) return;

  const vars = {};
  if (appearance.accentColor) vars['--menu-accent'] = appearance.accentColor;

  if (appearance.bgType === 'color' && appearance.bgColor) {
    vars['--menu-bg-color'] = appearance.bgColor;
  } else if (appearance.bgType === 'image' && appearance.bgImageUrl) {
    if (appearance.bgColor) vars['--menu-bg-color'] = appearance.bgColor;
    // URL absoluta: una custom property con url() relativa se resuelve
    // contra la hoja de estilos que la CONSUME (assets/css/menu.css),
    // no contra este documento — con una ruta relativa "assets/img/..."
    // buscaría assets/css/assets/img/... y fallaría. Resolverla aquí
    // contra la página actual lo evita, sirva desde donde se sirva
    // (GitHub Pages en subruta, dominio propio, o file://).
    const absoluteUrl = new URL(appearance.bgImageUrl, document.baseURI).href;
    vars['--menu-bg-image'] = `url('${absoluteUrl}')`;
  }

  const decls = Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join(' ');
  if (!decls) return;

  const style = document.createElement('style');
  style.id = 'app-appearance';
  style.textContent = `:root { ${decls} }`;
  document.head.appendChild(style);
})();
