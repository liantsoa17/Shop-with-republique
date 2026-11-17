/* ==========================================================================
   Shop Republic — single product detail
   One product.html reads ?id= from the URL, so there is no per-product file
   and no build step. Works from any GitHub Pages subpath.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('product-root');
  if (!root) return;

  var RELATED_MAX = 4;
  var id = new URLSearchParams(location.search).get('id');

  window.loadJSON('data/products.js')
    .then(function (data) {
      var all = Array.isArray(data) ? data : [];
      var product = null;
      for (var i = 0; i < all.length; i++) {
        if (all[i] && all[i].id === id) { product = all[i]; break; }
      }
      if (!product) { renderNotFound(); return; }
      renderProduct(product, all);
    })
    .catch(function (err) {
      console.error(err);
      renderError();
    });

  /* ---------------------------------------------------------------- head */
  function setMeta(title, description) {
    document.title = title;
    var tags = [
      ['meta[name="description"]', 'content', description],
      ['meta[property="og:title"]', 'content', title],
      ['meta[property="og:description"]', 'content', description],
      ['meta[property="og:url"]', 'content', location.href]
    ];
    tags.forEach(function (t) {
      var el = document.querySelector(t[0]);
      if (el) el.setAttribute(t[1], t[2]);
    });
  }

  /* ------------------------------------------------------------- states */
  function renderNotFound() {
    setMeta('Product not found — ' + window.SHOP.name,
            'We could not find that product. Browse the full Shop Republic collection instead.');
    root.innerHTML =
      '<div class="state">' +
        '<h2>We could not find that product</h2>' +
        '<p>The link may be out of date, or the piece may have been taken down. ' +
        'Everything we currently stock is one tap away.</p>' +
        '<a class="btn" href="products.html">Browse all products</a>' +
      '</div>';
  }

  function renderError() {
    root.innerHTML =
      '<div class="state" role="alert">' +
        '<h2>Something went wrong</h2>' +
        '<p>We could not load this product right now. Please check your connection and try again.</p>' +
        '<button type="button" class="btn" onclick="location.reload()">Retry</button>' +
      '</div>';
  }

  /* ------------------------------------------------------------ product */
  function renderProduct(p, all) {
    var name  = p.name || 'Untitled product';
    var price = window.formatPrice(p.price, p.currency);
    var desc  = (p.description || '').trim();

    setMeta(name + ' — ' + window.SHOP.name,
            desc || (name + ' from the ' + window.SHOP.name + ' ' +
                     window.prettify(p.category) + ' collection.'));

    var images = (p.images && p.images.length) ? p.images : [window.PLACEHOLDER_IMG];

    root.innerHTML =
      breadcrumb(p, name) +
      '<div class="product-detail">' +
        '<div>' + gallery(images, name) + '</div>' +
        '<div>' +
          '<h1>' + window.escapeHtml(name) + '</h1>' +
          '<p class="detail-price">' +
            (price ? window.escapeHtml(price)
                   : '<span class="on-request">Price on request</span>') +
          '</p>' +
          description(desc) +
          specs(p) +
          actions(p, name) +
        '</div>' +
      '</div>' +
      related(p, all);

    wireGallery();
  }

  function breadcrumb(p, name) {
    var crumbs = [
      '<li><a href="index.html">Home</a></li>',
      '<li><a href="products.html?category=' + encodeURIComponent(p.category) + '">' +
        window.escapeHtml(window.prettify(p.category)) + '</a></li>'
    ];
    if (p.subcategory) {
      crumbs.push('<li><a href="products.html?category=' + encodeURIComponent(p.category) +
        '&sub=' + encodeURIComponent(p.subcategory) + '">' +
        window.escapeHtml(window.prettify(p.subcategory)) + '</a></li>');
    }
    crumbs.push('<li><span aria-current="page">' + window.escapeHtml(name) + '</span></li>');
    return '<nav class="breadcrumb" aria-label="Breadcrumb"><ol>' + crumbs.join('') + '</ol></nav>';
  }

  function gallery(images, name) {
    var main =
      '<div class="gallery-main">' +
        '<img id="gallery-main-img" src="' + window.escapeHtml(images[0]) + '" ' +
             'alt="' + window.escapeHtml(name) + '" width="1200" height="1200" ' +
             'decoding="async" fetchpriority="high">' +
      '</div>';

    if (images.length < 2) return main;

    var thumbs = images.map(function (src, i) {
      return '<li><button type="button" class="gallery-thumb" data-src="' +
        window.escapeHtml(src) + '" aria-current="' + (i === 0) + '">' +
        '<img src="' + window.escapeHtml(src) + '" alt="" loading="lazy" decoding="async">' +
        '<span class="visually-hidden">Show image ' + (i + 1) + ' of ' + images.length + '</span>' +
        '</button></li>';
    }).join('');

    return main + '<ul class="gallery-thumbs" aria-label="Product images">' + thumbs + '</ul>';
  }

  function description(desc) {
    if (desc) {
      return '<div class="detail-desc"><p>' + window.escapeHtml(desc) + '</p></div>';
    }
    return '<div class="detail-desc"><p class="todo">No description has been added for this piece yet. ' +
           'Message us on WhatsApp and we will tell you everything about it.</p></div>';
  }

  function specs(p) {
    var out = '<dl class="spec">';

    if (p.sizes && p.sizes.length) {
      out += '<dt>Sizes</dt><dd><ul class="chip-list">' +
        p.sizes.map(function (s) {
          return '<li class="chip">' + window.escapeHtml(s) + '</li>';
        }).join('') + '</ul></dd>';
    }

    if (p.colors && p.colors.length) {
      out += '<dt>Colours</dt><dd><ul class="chip-list">' +
        p.colors.map(function (c) {
          return '<li class="chip">' + window.escapeHtml(c) + '</li>';
        }).join('') + '</ul></dd>';
    }

    var inStock = p.inStock !== false;
    out += '<dt>Availability</dt><dd>' +
      '<span class="stock' + (inStock ? '' : ' out') + '">' +
      (inStock ? 'In stock' : 'Currently sold out') + '</span></dd>';

    return out + '</dl>';
  }

  function actions(p, name) {
    var out = '<div class="detail-actions">';

    var waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.1 15.1l-.3-.17-3.1.9.9-3-.2-.3A8.1 8.1 0 0 1 12.04 3.8Zm4.5 10.2c-.25-.13-1.45-.72-1.67-.8-.22-.08-.38-.12-.55.12s-.63.8-.77.96c-.14.17-.28.19-.53.06a6.6 6.6 0 0 1-3.3-2.88c-.25-.43.25-.4.71-1.32a.45.45 0 0 0 0-.42c-.06-.13-.55-1.33-.76-1.82-.2-.47-.4-.4-.55-.41h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03c0 1.2.87 2.36 1 2.52.12.17 1.7 2.6 4.12 3.65 1.53.66 2.13.72 2.9.6.46-.06 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.17-.47-.3Z"/></svg>';

    if (window.SHOP.hasWhatsapp()) {
      var msg = 'Hello ' + window.SHOP.name + ', I would like to order: ' +
                name + '\n' + location.href;
      out += '<a class="btn btn-order" href="https://wa.me/' + window.SHOP.whatsappNumber +
             '?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' +
             waIcon + 'Order on WhatsApp</a>';
    } else {
      out += '<button type="button" class="btn btn-order" disabled ' +
             'aria-describedby="wa-note">' + waIcon + 'Order on WhatsApp</button>';
    }

    out += '<a class="btn btn-ghost" href="products.html?category=' +
           encodeURIComponent(p.category) + '">Back to products</a>';
    out += '</div>';

    if (!window.SHOP.hasWhatsapp()) {
      out += '<p class="source-note" id="wa-note">Ordering turns on as soon as the shop’s ' +
             'WhatsApp number is set in <code>js/site.js</code>.</p>';
    }
    return out;
  }

  function related(p, all) {
    var list = all.filter(function (x) {
      return x && x.id !== p.id && x.category === p.category;
    });
    // Prefer pieces from the same subcategory, then fill from the category.
    list.sort(function (a, b) {
      var sa = a.subcategory === p.subcategory ? 0 : 1;
      var sb = b.subcategory === p.subcategory ? 0 : 1;
      return sa - sb;
    });
    list = list.slice(0, RELATED_MAX);
    if (!list.length) return '';

    var cards = list.map(function (item) {
      var nm = window.escapeHtml(item.name || 'Untitled product');
      var pr = window.formatPrice(item.price, item.currency);
      return '<article class="product-card">' +
        '<div class="product-image">' +
          '<img src="' + window.escapeHtml(window.firstImage(item)) + '" alt="' + nm +
          '" loading="lazy" decoding="async" width="1200" height="1200">' +
        '</div>' +
        '<div class="product-info">' +
          '<h3><a href="product.html?id=' + encodeURIComponent(item.id) + '">' + nm + '</a></h3>' +
          '<p class="product-price">' +
            (pr ? pr : '<span class="on-request">Price on request</span>') +
          '</p>' +
        '</div>' +
      '</article>';
    }).join('');

    return '<section class="section" aria-labelledby="related-heading">' +
      '<div class="section-inner">' +
        '<div class="section-header">' +
          '<h2 id="related-heading">More from ' +
          window.escapeHtml(window.prettify(p.category)) + '</h2>' +
        '</div>' +
        '<div class="product-grid">' + cards + '</div>' +
      '</div></section>';
  }

  /* Thumbnails swap the main image without reloading the page. */
  function wireGallery() {
    var main = document.getElementById('gallery-main-img');
    var thumbs = root.querySelectorAll('.gallery-thumb');
    if (!main || !thumbs.length) return;

    Array.prototype.forEach.call(thumbs, function (btn) {
      btn.addEventListener('click', function () {
        main.src = btn.getAttribute('data-src');
        Array.prototype.forEach.call(thumbs, function (b) {
          b.setAttribute('aria-current', String(b === btn));
        });
      });
    });
  }
})();
