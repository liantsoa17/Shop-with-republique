/* ==========================================================================
   Shop Republic — products listing
   Reads data/products.js and filters on ?category= and ?sub=.
   Adding a product never requires touching this file or any HTML.
   ========================================================================== */
(function () {
  'use strict';

  var CATEGORIES = ['ladies', 'men'];

  var grid        = document.getElementById('product-grid');
  var catFilters  = document.getElementById('filter-category');
  var subFilters  = document.getElementById('filter-sub');
  var subGroup    = document.getElementById('filter-sub-group');
  var heading     = document.getElementById('listing-heading');
  var countEl     = document.getElementById('result-count');

  if (!grid) return;

  var ALL = [];

  window.loadJSON('data/products.js')
    .then(function (data) {
      ALL = Array.isArray(data) ? data : [];
      render();
      window.addEventListener('popstate', render);
    })
    .catch(function (err) {
      console.error(err);
      grid.innerHTML = '';
      grid.insertAdjacentHTML('afterend',
        '<div class="state" role="alert">' +
          '<h2>We could not load the collection</h2>' +
          '<p>Something went wrong fetching the product list. Please refresh the page and try again.</p>' +
          '<button type="button" class="btn" onclick="location.reload()">Retry</button>' +
        '</div>');
    });

  function params() {
    var q = new URLSearchParams(location.search);
    var cat = (q.get('category') || '').toLowerCase();
    var sub = (q.get('sub') || '').toLowerCase();
    if (CATEGORIES.indexOf(cat) === -1) cat = '';
    return { cat: cat, sub: sub };
  }

  function subcategoriesFor(cat) {
    var seen = {};
    var out = [];
    ALL.forEach(function (p) {
      if (p.category === cat && p.subcategory && !seen[p.subcategory]) {
        seen[p.subcategory] = true;
        out.push(p.subcategory);
      }
    });
    return out.sort();
  }

  function url(cat, sub) {
    var q = new URLSearchParams();
    if (cat) q.set('category', cat);
    if (sub) q.set('sub', sub);
    var s = q.toString();
    return 'products.html' + (s ? '?' + s : '');
  }

  function render() {
    var p = params();

    // ---- category filters
    catFilters.innerHTML = '';
    addFilter(catFilters, 'All', url('', ''), !p.cat);
    CATEGORIES.forEach(function (c) {
      addFilter(catFilters, window.prettify(c), url(c, ''), p.cat === c);
    });

    // ---- subcategory filters (generated from the data)
    var subs = p.cat ? subcategoriesFor(p.cat) : [];
    if (subs.length > 1) {
      subGroup.hidden = false;
      subFilters.innerHTML = '';
      addFilter(subFilters, 'All', url(p.cat, ''), !p.sub);
      subs.forEach(function (s) {
        addFilter(subFilters, window.prettify(s), url(p.cat, s), p.sub === s);
      });
    } else {
      subGroup.hidden = true;
      subFilters.innerHTML = '';
    }

    // ---- results
    var list = ALL.filter(function (item) {
      if (p.cat && item.category !== p.cat) return false;
      if (p.sub && item.subcategory !== p.sub) return false;
      return true;
    });

    heading.textContent = p.cat ? window.prettify(p.cat) : 'All products';
    document.title = (p.cat ? window.prettify(p.cat) : 'All products') +
                     ' — ' + window.SHOP.name;

    countEl.textContent = list.length === 1
      ? '1 product'
      : list.length + ' products';

    var old = document.getElementById('empty-state');
    if (old) old.remove();

    if (!list.length) {
      grid.innerHTML = '';
      grid.insertAdjacentHTML('afterend', emptyState(p));
      return;
    }

    grid.innerHTML = list.map(card).join('');
  }

  function addFilter(parent, label, href, active) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.className = 'filter-btn';
    a.href = href;
    a.textContent = label;
    if (active) a.setAttribute('aria-current', 'true');
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      history.pushState({}, '', href);
      render();
    });
    li.appendChild(a);
    parent.appendChild(li);
  }

  function emptyState(p) {
    var where = p.sub
      ? window.prettify(p.sub) + ' in ' + window.prettify(p.cat)
      : (p.cat ? window.prettify(p.cat) : 'this selection');
    return '<div class="state" id="empty-state">' +
      '<h2>Nothing here just yet</h2>' +
      '<p>We have no products in ' + window.escapeHtml(where) +
      ' at the moment. New pieces are added regularly — try another category in the meantime.</p>' +
      '<a class="btn" href="products.html">Browse everything</a>' +
      '</div>';
  }

  function card(item) {
    var id    = window.escapeHtml(item.id);
    var name  = window.escapeHtml(item.name || 'Untitled product');
    var href  = 'product.html?id=' + encodeURIComponent(item.id);
    var img   = window.escapeHtml(window.firstImage(item));
    var price = window.formatPrice(item.price, item.currency);
    var meta  = [item.category, item.subcategory]
                  .filter(Boolean).map(window.prettify).join(' · ');

    return '' +
      '<article class="product-card">' +
        '<div class="product-image">' +
          (item.inStock === false ? '<span class="product-badge">Sold out</span>' : '') +
          '<img src="' + img + '" alt="' + name + '" loading="lazy" decoding="async" width="1200" height="1200">' +
        '</div>' +
        '<div class="product-info">' +
          '<h3><a href="' + href + '">' + name + '</a></h3>' +
          '<div class="product-price">' +
            (price ? price : '<span class="on-request">Price on request</span>') +
          '</div>' +
          '<p class="product-meta">' + window.escapeHtml(meta) + '</p>' +
        '</div>' +
      '</article>';
  }
})();
