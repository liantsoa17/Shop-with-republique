/* ==========================================================================
   Shop Republic — shared helpers and configuration
   ========================================================================== */

/* ---------------------------------------------------------------------------
   >>> THE ONE PLACE TO EDIT YOUR WHATSAPP NUMBER <<<
   Full international format, digits only — no "+", spaces, or dashes.
   Example: Uganda +256 712 345 678  ->  '256712345678'
--------------------------------------------------------------------------- */
window.SHOP = {
  name: 'Shop Republic',
  whatsappNumber: '000000000000',   // TODO: replace with the real number
  defaultCurrency: 'UGX',           // Ugandan shilling -> prices show as "USh 120,000"
  locale: 'en-UG'                   // controls the symbol and the digit grouping
};

/* Is the WhatsApp number still the placeholder? */
window.SHOP.hasWhatsapp = function () {
  return /^\d{8,15}$/.test(window.SHOP.whatsappNumber) &&
         window.SHOP.whatsappNumber !== '000000000000';
};

/* "short-sleeve" -> "Short sleeve" */
window.prettify = function (slug) {
  if (!slug) return '';
  var s = String(slug).replace(/[-_]+/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

/* Format a price, or report that there is not one yet. */
window.formatPrice = function (price, currency) {
  if (price === null || price === undefined || price === '') return null;
  var num = Number(price);
  if (!isFinite(num)) return null;
  var code = currency || window.SHOP.defaultCurrency;
  // The locale is pinned on purpose. Left to the visitor's machine, the same
  // price renders as "USh 120,000" on one phone and "UGX 1,20,000" on another.
  try {
    return new Intl.NumberFormat(window.SHOP.locale || 'en-UG', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: num % 1 === 0 ? 0 : 2
    }).format(num);
  } catch (e) {
    return code + ' ' + num.toLocaleString();
  }
};

/* Escape text before it goes anywhere near innerHTML. */
window.escapeHtml = function (value) {
  return String(value === null || value === undefined ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/* Fall back to the neutral placeholder when a product has no photo. */
window.PLACEHOLDER_IMG = 'img/placeholder.jpg';
window.firstImage = function (product) {
  return (product.images && product.images.length) ? product.images[0] : window.PLACEHOLDER_IMG;
};

/* ---------------------------------------------------------------------------
   Read the shop data.

   The data lives in data/products.js and data/banners.js, which are loaded by
   <script> tags before this file runs and park themselves on window.DATA.

   Why not fetch() a .json file? Browsers block fetch() on file:// URLs, so the
   shop would show "could not load the collection" whenever you opened
   index.html by double-clicking it. A <script> tag has no such restriction,
   so this works from your hard drive AND on GitHub Pages, with no server.

   The fetch() path below is kept only as a fallback for any future .json file.
--------------------------------------------------------------------------- */
window.DATA = window.DATA || {};

window.loadJSON = function (path) {
  var key = String(path).replace(/^.*\//, '').replace(/\.(js|json)$/, '');

  if (window.DATA && window.DATA[key]) {
    return Promise.resolve(window.DATA[key]);
  }

  if (location.protocol === 'file:') {
    return Promise.reject(new Error(
      'data/' + key + '.js did not load. Check that the <script src="data/' +
      key + '.js"> tag is present and the file name matches exactly.'
    ));
  }

  return fetch(path, { cache: 'no-cache' }).then(function (res) {
    if (!res.ok) throw new Error('Could not load ' + path + ' (' + res.status + ')');
    return res.json();
  });
};

/* --- nav + footer chrome ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  // The bar is transparent over the homepage hero and goes solid on scroll.
  // Inner pages have no hero, so they mark it .solid in the markup and opt out.
  var nav = document.querySelector('nav');
  if (nav && !nav.classList.contains('solid')) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
});
