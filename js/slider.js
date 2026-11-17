/* ==========================================================================
   Shop Republic — hero banner slider
   Fills the template's hero with the photos listed in data/banners.js.
   Add an image + one entry to add a slide.
   5s auto-play, pauses on hover/focus/touch, prev/next, dots, play/pause,
   swipe, keyboard, and honours prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.getElementById('banner-slider');
  if (!root) return;

  // Controls must live outside #banner-slider: that element sits at z-index 0
  // behind the hero's dark wash, which would trap anything nested inside it.
  var hero = root.closest('.hero') || root.parentElement || root;

  var INTERVAL = 5000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var slides = [];
  var index = 0;
  var timer = null;
  var playing = false;
  var pausedByUser = false;
  var dotsWrap, liveRegion, playBtn;

  window.loadJSON('data/banners.js')
    .then(function (data) {
      var items = (data || []).filter(function (b) { return b && b.image; });
      if (!items.length) return;
      build(items);
    })
    .catch(function (err) {
      console.error(err);
      // Leave the hero's dark background and headline intact rather than
      // showing a broken frame.
    });

  function build(items) {
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'carousel');
    root.setAttribute('aria-label', 'Shop Republic highlights');

    items.forEach(function (item, i) {
      var slide = document.createElement('div');
      slide.className = 'hero-slide' + (i === 0 ? ' is-active' : '');
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', (i + 1) + ' of ' + items.length);
      if (i !== 0) slide.setAttribute('aria-hidden', 'true');

      var img = document.createElement('img');
      img.src = item.image;
      img.alt = item.alt || '';
      // The first banner is the LCP element.
      img.loading = i === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';
      if (i === 0) img.setAttribute('fetchpriority', 'high');
      if (item.focus) img.style.objectPosition = item.focus;

      slide.appendChild(img);
      root.appendChild(slide);
      slides.push(slide);
    });

    if (items.length > 1) hero.appendChild(buildControls(items.length));

    liveRegion = document.createElement('div');
    liveRegion.className = 'visually-hidden';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    hero.appendChild(liveRegion);

    wireEvents();

    if (items.length > 1 && !reduceMotion.matches) start();
    else updatePlayBtn();
  }

  function buildControls(count) {
    var bar = document.createElement('div');
    bar.className = 'slider-controls';

    var prev = iconBtn('Previous banner', '<polyline points="15 18 9 12 15 6"></polyline>');
    prev.addEventListener('click', function () { userMove(-1); });

    playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'slider-btn';
    playBtn.addEventListener('click', function () {
      pausedByUser = playing;
      if (playing) stop(); else start();
      updatePlayBtn();
    });

    var next = iconBtn('Next banner', '<polyline points="9 18 15 12 9 6"></polyline>');
    next.addEventListener('click', function () { userMove(1); });

    dotsWrap = document.createElement('div');
    dotsWrap.className = 'slider-dots';

    for (var i = 0; i < count; i++) {
      (function (i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
        dot.innerHTML = '<span class="visually-hidden">Go to banner ' + (i + 1) + '</span>';
        dot.addEventListener('click', function () { userGoTo(i); });
        dotsWrap.appendChild(dot);
      })(i);
    }

    bar.appendChild(prev);
    bar.appendChild(dotsWrap);
    bar.appendChild(playBtn);
    bar.appendChild(next);
    return bar;
  }

  function iconBtn(label, path) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'slider-btn';
    b.setAttribute('aria-label', label);
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + path + '</svg>';
    return b;
  }

  function updatePlayBtn() {
    if (!playBtn) return;
    playBtn.setAttribute('aria-label', playing ? 'Pause banner rotation' : 'Play banner rotation');
    playBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="9" y1="5" x2="9" y2="19"></line><line x1="15" y1="5" x2="15" y2="19"></line></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polygon points="7 4 20 12 7 20" fill="currentColor" stroke="none"></polygon></svg>';
  }

  function show(next) {
    if (next === index || !slides.length) return;
    slides[index].classList.remove('is-active');
    slides[index].setAttribute('aria-hidden', 'true');

    index = (next + slides.length) % slides.length;

    slides[index].classList.add('is-active');
    slides[index].removeAttribute('aria-hidden');

    if (dotsWrap) {
      var dots = dotsWrap.querySelectorAll('.slider-dot');
      for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute('aria-current', i === index ? 'true' : 'false');
      }
    }
    // Only announce when not auto-rotating, so a running slider doesn't
    // chatter at screen reader users.
    if (!playing && liveRegion) {
      liveRegion.textContent = 'Banner ' + (index + 1) + ' of ' + slides.length;
    }
  }

  function start() {
    if (playing || slides.length < 2) return;
    playing = true;
    timer = setInterval(function () { show(index + 1); }, INTERVAL);
    updatePlayBtn();
  }

  function stop() {
    playing = false;
    if (timer) { clearInterval(timer); timer = null; }
    updatePlayBtn();
  }

  function suspend() { if (playing) { stop(); hero.dataset.autoResume = '1'; } }
  function resume() {
    if (hero.dataset.autoResume === '1' && !pausedByUser && !reduceMotion.matches) {
      delete hero.dataset.autoResume;
      start();
    }
  }

  function userMove(dir) { stop(); pausedByUser = true; show(index + dir); }
  function userGoTo(i)   { stop(); pausedByUser = true; show(i); }

  function wireEvents() {
    hero.addEventListener('mouseenter', suspend);
    hero.addEventListener('mouseleave', resume);
    hero.addEventListener('focusin', suspend);
    hero.addEventListener('focusout', function (e) {
      if (!hero.contains(e.relatedTarget)) resume();
    });

    hero.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); userMove(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); userMove(1); }
    });

    // Swipe — horizontal intent only, so vertical page scrolling is untouched.
    var x0 = null, y0 = null, locked = false;
    hero.addEventListener('touchstart', function (e) {
      var t = e.changedTouches[0];
      x0 = t.clientX; y0 = t.clientY; locked = false;
      suspend();
    }, { passive: true });

    hero.addEventListener('touchmove', function (e) {
      if (x0 === null || locked) return;
      var t = e.changedTouches[0];
      if (Math.abs(t.clientY - y0) > Math.abs(t.clientX - x0)) locked = true;
    }, { passive: true });

    hero.addEventListener('touchend', function (e) {
      if (x0 === null) { resume(); return; }
      var dx = e.changedTouches[0].clientX - x0;
      if (!locked && Math.abs(dx) > 45) userMove(dx < 0 ? 1 : -1);
      else resume();
      x0 = y0 = null;
    }, { passive: true });

    var onPref = function () { if (reduceMotion.matches) stop(); };
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', onPref);
    else if (reduceMotion.addListener) reduceMotion.addListener(onPref);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) suspend(); else resume();
    });
  }
})();
