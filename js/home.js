/* ==========================================================================
   Shop Republic — homepage product rows
   Fills every <div class="product-grid" data-products="men" data-limit="6">
   from data/products.js, so the homepage never hard-codes a product.
   ========================================================================== */
(function () {
  'use strict';

  var grids = document.querySelectorAll('[data-products]');
  if (!grids.length) return;

  window.loadJSON('data/products.js')
    .then(function (data) {
      var all = Array.isArray(data) ? data : [];

      Array.prototype.forEach.call(grids, function (grid) {
        var cat = grid.getAttribute('data-products');
        var limit = parseInt(grid.getAttribute('data-limit'), 10) || 6;

        var list = all.filter(function (p) {
          return p && p.category === cat;
        }).slice(0, limit);

        if (!list.length) {
          grid.innerHTML = '<p class="product-meta">Nothing in this category yet — ' +
                           'new pieces are added regularly.</p>';
          return;
        }
        grid.innerHTML = list.map(card).join('');
      });
    })
    .catch(function (err) {
      console.error(err);
      Array.prototype.forEach.call(grids, function (grid) {
        grid.innerHTML = '<p class="product-meta">We could not load these products. ' +
                         'Please refresh the page.</p>';
      });
    });

  function card(item) {
    var name  = window.escapeHtml(item.name || 'Untitled product');
    var href  = 'product.html?id=' + encodeURIComponent(item.id);
    var img   = window.escapeHtml(window.firstImage(item));
    var price = window.formatPrice(item.price, item.currency);

    return '' +
      '<article class="product-card">' +
        '<div class="product-image">' +
          (item.inStock === false
            ? '<span class="product-badge">Sold out</span>'
            : '') +
          '<img src="' + img + '" alt="' + name + '" loading="lazy" decoding="async" width="1200" height="1200">' +
        '</div>' +
        '<div class="product-info">' +
          '<h3><a href="' + href + '">' + name + '</a></h3>' +
          '<div class="product-price">' +
            (price ? price : '<span class="on-request">Price on request</span>') +
          '</div>' +
        '</div>' +
      '</article>';
  }
})();
