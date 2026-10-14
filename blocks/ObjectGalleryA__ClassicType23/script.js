/*
 * ObjectGalleryA__ClassicType23 — главный экран (полноэкранный слайдер)
 * 1. Медленный наезд на фото активного слайда (Ken Burns)
 * 2. Параллакс при скролле (только десктоп)
 * 3. Кинематографичная смена текста слайда
 * 5. Автопрокрутка: полоска активного слайда заполняется как таймер, пауза при наведении
 *    + «перелистывание» цифры счётчика
 * 6. Карточки внизу: каскадное появление и живой hover
 * 7. «Магнитные» кнопки и блик на основной кнопке (только десктоп с мышью)
 * 8. Подсказка «листайте вниз» (только десктоп)
 *
 * Swiper платформы зациклен вручную: слайды [копия 3, 1, 2, 3, копия 1]. С копии на настоящий
 * слайд платформа прыгает мгновенно (setTransition 0) — такие прыжки не считаются сменой слайда.
 */
window.LiteMods && LiteMods.register('ObjectGalleryA__ClassicType23', function (root, ctx) {
  if (ctx.reducedMotion) return;

  var P = '.ObjectGalleryA__ClassicType23__';
  var AUTOPLAY_MS = 6000;
  var desktop = !!ctx.$('.--is-desktop');
  var mouse = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

  var container = ctx.$(P + 'Gallery__slider .swiper-container');
  if (!container) return;

  // Swiper платформа запускает лениво (на мобилке — когда блок отрисован), ждём до 30 секунд
  (function waitSwiper(tries) {
    if (container.swiper) return init(container.swiper);
    if (tries > 300) return ctx.log('swiper не найден');
    setTimeout(function () { waitSwiper(tries + 1); }, 100);
  })(0);

  function init(sw) {
    root.setAttribute('data-lm-ready', '');
    root.style.setProperty('--lm-autoplay', AUTOPLAY_MS + 'ms');

    // ---------- 1 + 3: фото и текст активного слайда ----------
    var kbStart = 0;
    var lastDuration = sw.params.speed;

    function restart(el, attr) {
      el.removeAttribute(attr);
      void el.offsetWidth; // перезапуск CSS-анимации
      el.setAttribute(attr, '');
    }

    function activate(slide, isJump) {
      if (!slide) return;
      if (isJump) {
        // Прыжок с копии: продолжаем наезд с того же места, текст не переигрываем
        slide.style.setProperty('--lm-kb-delay', -(performance.now() - kbStart) + 'ms');
        slide.setAttribute('data-lm-kb', '');
        slide.setAttribute('data-lm-text-done', '');
        return;
      }
      kbStart = performance.now();
      slide.style.setProperty('--lm-kb-delay', '0ms');
      restart(slide, 'data-lm-kb');
      slide.removeAttribute('data-lm-text-done');
      restart(slide, 'data-lm-text');
    }

    function cleanupInactive() {
      [].forEach.call(sw.slides, function (s, i) {
        if (i === sw.activeIndex) return;
        s.removeAttribute('data-lm-kb');
        s.removeAttribute('data-lm-text');
      });
    }

    sw.on('setTransition', function (a, b) {
      lastDuration = typeof a === 'number' ? a : b;
    });
    sw.on('slideChangeTransitionStart', function () {
      activate(sw.slides[sw.activeIndex], lastDuration === 0);
    });
    sw.on('slideChangeTransitionEnd', cleanupInactive);

    activate(sw.slides[sw.activeIndex], false);

    // ---------- 5: автопрокрутка, синхронная с полоской-таймером ----------
    var next = ctx.$(P + 'Controls .--right-direction');
    var bullets = ctx.$(P + 'Controls__bullets');
    var counter = ctx.$(P + 'Controls__currentValue');

    if (next && bullets) {
      root.setAttribute('data-lm-auto', '');

      // Конец анимации заполнения полоски (::after) = пора листать
      bullets.addEventListener('animationend', function (e) {
        if (e.animationName !== 'lm-hero-progress') return;
        var before = counter ? counter.textContent : '';
        next.click();
        // Если платформа только перепрыгнула с копии на оригинал — листаем ещё раз
        setTimeout(function () {
          if (counter && counter.textContent === before && !sw.animating) next.click();
        }, 80);
      });

      var hovered = false;
      var visible = true;
      function syncPause() {
        if (hovered || !visible) root.setAttribute('data-lm-paused', '');
        else root.removeAttribute('data-lm-paused');
      }
      if (mouse) {
        root.addEventListener('mouseenter', function () { hovered = true; syncPause(); });
        root.addEventListener('mouseleave', function () { hovered = false; syncPause(); });
      }
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
          syncPause();
        }, { threshold: 0.4 }).observe(root);
      }
    }

    // Цифра счётчика «перелистывается» при смене слайда
    if (counter && 'MutationObserver' in window) {
      new MutationObserver(function () { restart(counter, 'data-lm-flip'); })
        .observe(counter, { childList: true, characterData: true, subtree: true });
    }

    // ---------- 6: карточки ----------
    ctx.$$(P + 'Card').forEach(function (card, i) {
      card.style.setProperty('--lm-i', i);
    });
    root.setAttribute('data-lm-cards', '');

    if (!desktop) return; // дальше — только десктоп

    // ---------- 2: параллакс ----------
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var r = root.getBoundingClientRect();
        var p = Math.min(Math.max(-r.top / r.height, 0), 1);
        root.style.setProperty('--lm-scroll', p.toFixed(4));
        if (hint) hint.toggleAttribute('data-lm-hidden', window.scrollY > 40);
      });
    }

    // ---------- 8: подсказка «листайте вниз» ----------
    var hint = document.createElement('div');
    hint.className = 'lm-hero-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML = '<span class="lm-hero-hint__mouse"><span class="lm-hero-hint__wheel"></span></span>' +
      '<span class="lm-hero-hint__label">Листайте</span>';
    root.appendChild(hint);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---------- 7: магнитные кнопки ----------
    if (!mouse) return;
    var RADIUS = 110;
    var MAX = 8;
    root.addEventListener('mousemove', function (e) {
      var active = sw.slides[sw.activeIndex];
      if (!active) return;
      [].forEach.call(active.querySelectorAll(P + 'Slide__button, ' + P + 'Slide__secondButton'), function (btn) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var near = Math.hypot(dx, dy) < RADIUS + r.width / 2;
        btn.style.setProperty('--lm-mx', near ? Math.max(-MAX, Math.min(MAX, dx * 0.18)).toFixed(1) + 'px' : '0px');
        btn.style.setProperty('--lm-my', near ? Math.max(-MAX, Math.min(MAX, dy * 0.3)).toFixed(1) + 'px' : '0px');
      });
    });
    root.addEventListener('mouseleave', function () {
      ctx.$$(P + 'Slide__button, ' + P + 'Slide__secondButton').forEach(function (btn) {
        btn.style.setProperty('--lm-mx', '0px');
        btn.style.setProperty('--lm-my', '0px');
      });
    });
  }
});
