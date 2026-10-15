/* lite-mods: ohqmp.dev-lite.ru, версия 20261015183841 */
window.LiteMods && LiteMods.define("InfraBlock__ClassicType5", { css: "/*\n * InfraBlock__ClassicType5 — блок «Инфраструктура»\n * Всё строго внутри .InfraBlock__ClassicType5. Цвета — из переменных темы --ui-*.\n * Скрытие «до появления» работает только при [data-lm-ready] (его ставит script.js).\n */\n\n.InfraBlock__ClassicType5 {\n  --lm-ease: cubic-bezier(.2, .7, .1, 1);\n  --lm-accent: var(--ui-main-color, #6A31EB);\n}\n\n/* ---------- 1. Табы категорий: каскад + живой hover ---------- */\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Control .ClassicTabs__item {\n  opacity: 0;\n  transform: translateY(14px) scale(.96);\n  transition:\n    opacity .5s var(--lm-ease),\n    transform .6s var(--lm-ease);\n  transition-delay: calc(var(--lm-i, 0) * 40ms + 150ms);\n}\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Control[data-lm-in] .ClassicTabs__item {\n  opacity: 1;\n  transform: none;\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton {\n  transition:\n    background-color .3s, color .3s,\n    transform .35s var(--lm-ease),\n    box-shadow .35s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton:not(.--is-active):hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px -8px var(--ui-main-color-32, rgba(106, 49, 235, .32));\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton svg {\n  transition: transform .4s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton:hover svg {\n  transform: scale(1.18) rotate(-6deg);\n}\n\n/* ---------- 2. Карта: раскрывается из «карточки» на всю ширину ---------- */\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Map {\n  clip-path: inset(6% 7% round var(--map-border-radius, 24px));\n  transition: clip-path 1.2s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Map[data-lm-in] {\n  clip-path: inset(0 0 round 0);\n}\n\n/* ---------- 3. Карточки «Элемент N»: линия-акцент + каскад ---------- */\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage {\n  position: relative;\n  padding-top: 20px;\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::before,\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  border-radius: 2px;\n}\n\n/* серая «дорожка» */\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::before {\n  background: var(--ui-font-black-color-8, rgba(7, 7, 31, .08));\n}\n\n/* акцентная линия, прорисовывается слева направо */\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::after {\n  background: var(--lm-accent);\n  transform-origin: left center;\n  transform: scaleX(.18);\n  transition: transform .7s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage:hover::after {\n  transform: scaleX(1);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage h3 {\n  transition: color .3s, transform .45s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage:hover h3 {\n  color: var(--lm-accent);\n  transform: translateX(4px);\n}\n\n[data-lm-ready] .InfraBlock__ClassicType5__Advantage {\n  opacity: 0;\n  transform: translateY(24px);\n  transition:\n    opacity .6s var(--lm-ease),\n    transform .8s var(--lm-ease);\n  transition-delay: calc(var(--lm-i, 0) * 90ms);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage {\n  opacity: 1;\n  transform: none;\n}\n\n/* при появлении линия-акцент «пробегает» до своей базовой длины */\n[data-lm-ready] .InfraBlock__ClassicType5__Advantage::after {\n  transform: scaleX(0);\n  transition-delay: calc(var(--lm-i, 0) * 90ms + 250ms);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage::after {\n  transform: scaleX(.18);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage:hover::after {\n  transform: scaleX(1);\n  transition-delay: 0s;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .InfraBlock__ClassicType5 *,\n  .InfraBlock__ClassicType5 *::before,\n  .InfraBlock__ClassicType5 *::after {\n    transition: none !important;\n  }\n}\n" });
try {
/*
 * InfraBlock__ClassicType5 — блок «Инфраструктура»
 * Каскадное появление табов категорий и карточек «Элемент N», раскрытие карты при скролле.
 *
 * Правило: классы на элементах Vue не трогаем (Vue их перезапишет) — только data-атрибуты и CSS-переменные.
 */
window.LiteMods && LiteMods.register('InfraBlock__ClassicType5', function (root, ctx) {
  if (ctx.reducedMotion) return;

  var control = ctx.$('.InfraBlock__ClassicType5__Control');
  var advantages = ctx.part('advantages');
  var map = ctx.$('.InfraBlock__ClassicType5__Map');

  ctx.$$('.ClassicTabs__item').forEach(function (li, i) {
    li.style.setProperty('--lm-i', i);
  });
  ctx.$$('.InfraBlock__ClassicType5__Advantage').forEach(function (el, i) {
    el.style.setProperty('--lm-i', i);
  });

  // То, что посетитель уже видит (перезагрузил страницу на этом месте), не прячем — иначе мигнёт
  function onScreen(el) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }
  [control, advantages, map].forEach(function (el) {
    if (el && onScreen(el)) el.setAttribute('data-lm-in', '');
  });

  // Прячем элементы только когда скрипт точно отработал — без JS блок выглядит как в оригинале
  root.setAttribute('data-lm-ready', '');

  ctx.inView([control, advantages], function (el) {
    el.setAttribute('data-lm-in', '');
  });
  ctx.inView(map, function (el) {
    el.setAttribute('data-lm-in', '');
  }, { threshold: 0.05 });
});

} catch (e) { console.error('[lite-mods] ошибка в патче InfraBlock__ClassicType5', e); }
window.LiteMods && LiteMods.define("ObjectGalleryA__ClassicType23", { css: "/*\n * ObjectGalleryA__ClassicType23 — главный экран\n * Анимации — через @keyframes (перебивают transition платформы у IdaAppear на время проигрывания).\n * Всё «скрытое» — только под атрибутами, которые ставит script.js.\n */\n\n.ObjectGalleryA__ClassicType23 {\n  --lm-ease: cubic-bezier(.2, .7, .1, 1);\n  --lm-scroll: 0;\n  position: relative;\n}\n\n/* ---------- 1. Ken Burns: медленный наезд на фото ---------- */\n\n@keyframes lm-hero-kb {\n  from { transform: scale(1); }\n  to   { transform: scale(1.08); }\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-kb] .ObjectGalleryA__ClassicType23__Slide__image .IdaImage__wrapper {\n  animation: lm-hero-kb 9s cubic-bezier(.25, .1, .25, 1) var(--lm-kb-delay, 0ms) both;\n  transform-origin: 60% 45%;\n}\n\n/* ---------- 2. Параллакс (переменную --lm-scroll ставит script.js только на десктопе) ---------- */\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__image {\n  transform: translate3d(0, calc(var(--lm-scroll) * 28%), 0);\n  will-change: transform;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__contentWrapper {\n  opacity: calc(1 - var(--lm-scroll) * 1.8);\n  transform: translate3d(0, calc(var(--lm-scroll) * -90px), 0);\n}\n\n/* ---------- 3. Смена текста слайда ---------- */\n\n@keyframes lm-hero-title {\n  from { clip-path: inset(-20% -5% 100% -5%); transform: translateY(36px); opacity: 0; }\n  20%  { opacity: 1; }\n  to   { clip-path: inset(-20% -5% -20% -5%); transform: none; opacity: 1; }\n}\n\n@keyframes lm-hero-rise {\n  from { transform: translateY(24px); opacity: 0; }\n  to   { transform: none; opacity: 1; }\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-text]:not([data-lm-text-done]) .ObjectGalleryA__ClassicType23__Slide__title {\n  animation: lm-hero-title 1.1s var(--lm-ease) .25s both;\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-text]:not([data-lm-text-done]) .ObjectGalleryA__ClassicType23__Slide__text {\n  animation: lm-hero-rise .9s var(--lm-ease) .55s both;\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-text]:not([data-lm-text-done]) .ObjectGalleryA__ClassicType23__Slide__buttonWrapper {\n  animation: lm-hero-rise .9s var(--lm-ease) .75s both;\n}\n\n/* ---------- 5. Автопрокрутка: полоска-таймер ---------- */\n\n@keyframes lm-hero-progress {\n  from { transform: scaleX(0); }\n  to   { transform: scaleX(1); }\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-auto] .ObjectGalleryA__ClassicType23__Controls__bullets .swiper-pagination-bullet {\n  position: relative;\n  overflow: hidden;\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-auto] .ObjectGalleryA__ClassicType23__Controls__bullets .swiper-pagination-bullet.--is-active::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: var(--ui-base-white-color, #FCFCFC);\n  transform-origin: left center;\n  animation: lm-hero-progress var(--lm-autoplay, 6000ms) linear both;\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-paused] .ObjectGalleryA__ClassicType23__Controls__bullets .swiper-pagination-bullet.--is-active::after {\n  animation-play-state: paused;\n}\n\n/* «Перелистывание» цифры счётчика */\n@keyframes lm-hero-flip {\n  from { transform: translateY(60%); opacity: 0; }\n  to   { transform: none; opacity: 1; }\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Controls__currentValue {\n  display: inline-block;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Controls__currentValue[data-lm-flip] {\n  animation: lm-hero-flip .5s var(--lm-ease) both;\n}\n\n/* ---------- 6. Карточки внизу ---------- */\n\n@keyframes lm-hero-card {\n  from { transform: translateY(40px); opacity: 0; }\n  to   { transform: none; opacity: 1; }\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-cards] .ObjectGalleryA__ClassicType23__Card {\n  animation: lm-hero-card .9s var(--lm-ease) both;\n  animation-delay: calc(1s + var(--lm-i, 0) * 120ms);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card__wrapper {\n  transition:\n    transform .45s var(--lm-ease),\n    box-shadow .45s var(--lm-ease);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card:hover .ObjectGalleryA__ClassicType23__Card__wrapper {\n  transform: translateY(-6px);\n  box-shadow: 0 18px 40px -18px rgba(7, 7, 31, .45);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card__image,\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card__icon {\n  transition: transform .6s var(--lm-ease);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card:hover .ObjectGalleryA__ClassicType23__Card__image {\n  transform: scale(1.1);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card:hover .ObjectGalleryA__ClassicType23__Card__icon {\n  transform: scale(1.15) rotate(-8deg);\n}\n\n/* ---------- 7. Магнитные кнопки + блик ---------- */\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button,\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__secondButton {\n  translate: var(--lm-mx, 0px) var(--lm-my, 0px);\n  transition:\n    translate .35s var(--lm-ease),\n    background-color .3s, color .3s, border-color .3s;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button {\n  position: relative;\n  overflow: hidden;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: -60%;\n  width: 45%;\n  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .45), transparent);\n  transform: skewX(-20deg);\n  pointer-events: none;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button:hover::after {\n  left: 130%;\n  transition: left .7s var(--lm-ease);\n}\n\n/* ---------- 8. Подсказка «листайте вниз» ---------- */\n\n@keyframes lm-hero-wheel {\n  0%   { transform: translateY(0); opacity: 1; }\n  70%  { transform: translateY(10px); opacity: 0; }\n  100% { transform: translateY(0); opacity: 0; }\n}\n\n@keyframes lm-hero-hint-in {\n  from { opacity: 0; transform: translateY(12px); }\n  to   { opacity: 1; transform: none; }\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint {\n  position: absolute;\n  right: 40px;\n  top: 300px;\n  z-index: 5;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  color: var(--ui-base-white-color, #FCFCFC);\n  pointer-events: none;\n  animation: lm-hero-hint-in .8s var(--lm-ease) 1.6s both;\n  transition: opacity .4s, transform .4s var(--lm-ease);\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint[data-lm-hidden] {\n  opacity: 0 !important;\n  transform: translateY(12px);\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint__mouse {\n  width: 22px;\n  height: 34px;\n  border: 1.5px solid currentColor;\n  border-radius: 12px;\n  display: flex;\n  justify-content: center;\n  padding-top: 6px;\n  box-sizing: border-box;\n  opacity: .85;\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint__wheel {\n  width: 3px;\n  height: 7px;\n  border-radius: 2px;\n  background: currentColor;\n  animation: lm-hero-wheel 1.6s ease-in-out infinite;\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint__label {\n  font-size: 11px;\n  letter-spacing: .14em;\n  text-transform: uppercase;\n  opacity: .7;\n  writing-mode: vertical-rl;\n}\n" });
try {
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

    function activate(slide, isJump, keepText) {
      if (!slide) return;
      if (keepText) {
        // Блок уже виден с загрузки страницы: текст не прячем и не переигрываем (иначе мигнёт),
        // наезд на фото начинается с исходного масштаба — без скачка
        kbStart = performance.now();
        slide.style.setProperty('--lm-kb-delay', '0ms');
        slide.setAttribute('data-lm-kb', '');
        slide.setAttribute('data-lm-text-done', '');
        return;
      }
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

    activate(sw.slides[sw.activeIndex], false, ctx.initialLoad);

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
    // Въезд карточек — только если блок появился позже (переход между страницами);
    // при загрузке они уже видны, и «въезд» выглядел бы как мигание
    if (!ctx.initialLoad) root.setAttribute('data-lm-cards', '');

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

} catch (e) { console.error('[lite-mods] ошибка в патче ObjectGalleryA__ClassicType23', e); }
window.LiteMods && LiteMods.define("lm-podbor", { css: "/*\n * lm-podbor — в дизайн-системе сайта. Источники (сняты со страниц сайта):\n *  - сетка и отступы блока: *-wrapper / *-container-* штатных блоков (ui-col×32, ui-unit×12, брейкпоинт 812px);\n *  - шапка блока: заголовок ui-unit×8 | текст ×4;\n *  - кнопки-опции, подписи полей, диапазон: фильтр каталога /flats (Classic__Realty__Filter__*);\n *  - карточка и теги: карточка квартиры каталога (Classic__Realty__Flats__Item__*);\n *  - заглушка плана: ClassicPlanNew__state.\n */\n\n.lm-podbor {\n  --u: var(--ui-unit, 4px);\n  --col: var(--ui-col, 40px);\n  --main: var(--ui-main-color, #6A31EB);\n  --main-64: var(--ui-main-color-64, rgba(106, 49, 235, .64));\n  --main-12: var(--ui-main-color-12, rgba(106, 49, 235, .12));\n  --main-8: var(--ui-main-color-8, rgba(106, 49, 235, .08));\n  --main-4: var(--ui-main-color-4, rgba(106, 49, 235, .04));\n  --black: var(--ui-base-black-color, #07071F);\n  --black-80: var(--ui-base-black-color-80, rgba(7, 7, 31, .8));\n  --black-48: var(--ui-base-black-color-48, rgba(7, 7, 31, .48));\n  --black-12: var(--ui-base-black-color-12, rgba(7, 7, 31, .12));\n  --black-4: var(--ui-base-black-color-4, rgba(7, 7, 31, .04));\n  --ink: var(--ui-font-black-color, #07071F);\n  --ink-48: var(--ui-font-black-color-48, rgba(7, 7, 31, .48));\n  --on-dark: var(--ui-font-white-color, #FCFCFC);\n  --white: var(--ui-base-white-color, #FCFCFC);\n  --title: var(--ui-title-font-family, inherit);\n  --text: var(--ui-main-font-family, inherit);\n  --ease: cubic-bezier(.2, .7, .1, 1);\n  --good: #1F9D55;\n  font-family: var(--text);\n  color: var(--ink);\n}\n\n.lm-podbor *,\n.lm-podbor *::before,\n.lm-podbor *::after {\n  box-sizing: border-box;\n}\n\n.lm-podbor button {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\n\n.lm-podbor p {\n  margin: 0;\n}\n\n/* ---------- Сетка блока ---------- */\n\n.lm-podbor .lmp {\n  background-color: var(--white);\n}\n\n.lm-podbor .lmp > .lmp__container {\n  padding-block: var(--ui-padding-top, calc(var(--u) * 12)) calc(var(--u) * 10);\n}\n\n.lm-podbor .lmp__container {\n  width: calc(var(--col) * 32);\n  margin: 0 auto;\n}\n\n/* Полоса выдачи на фоне main-4, как список в каталоге */\n.lm-podbor .lmp__band {\n  padding-block: calc(var(--u) * 10) var(--ui-padding-bottom, calc(var(--u) * 12));\n  background-color: var(--main-4);\n}\n\n.lm-podbor .lmp__band[hidden] {\n  display: none;\n}\n\n/* ---------- Шапка блока ---------- */\n\n.lm-podbor .lmp__head {\n  display: flex;\n  align-items: flex-start;\n  column-gap: calc(var(--col) * 2);\n}\n\n.lm-podbor .lmp__title {\n  flex: none;\n  width: calc(var(--col) * 10);\n  margin: 0;\n  font-family: var(--title);\n  font-size: calc(var(--u) * 8);\n  font-weight: 400;\n  line-height: 120%;\n  word-break: break-word;\n  color: var(--black);\n}\n\n.lm-podbor .lmp__lead {\n  max-width: calc(var(--col) * 13);\n  margin-left: auto;\n  font-size: calc(var(--u) * 4);\n  line-height: 150%;\n  color: var(--black-48);\n}\n\n/* Шаги — спокойная строка текста, без своих «пилюль» */\n.lm-podbor .lmp__steps {\n  display: flex;\n  flex-wrap: wrap;\n  gap: calc(var(--u) * 2) calc(var(--u) * 6);\n  margin: calc(var(--u) * 10) 0 0;\n  padding: 0;\n  list-style: none;\n  counter-reset: lmp-step;\n  font-size: calc(var(--u) * 3.5);\n  line-height: 130%;\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__steps li {\n  counter-increment: lmp-step;\n  display: flex;\n  align-items: center;\n  gap: calc(var(--u) * 2);\n  transition: color .3s;\n}\n\n.lm-podbor .lmp__steps li::before {\n  content: counter(lmp-step);\n  display: grid;\n  place-items: center;\n  width: calc(var(--u) * 6);\n  height: calc(var(--u) * 6);\n  border-radius: 50%;\n  background: var(--main-4);\n  font-size: calc(var(--u) * 3);\n  transition: background-color .3s, color .3s;\n}\n\n.lm-podbor .lmp__steps li.is-current,\n.lm-podbor .lmp__steps li.is-done {\n  color: var(--ink);\n}\n\n.lm-podbor .lmp__steps li.is-current::before {\n  background: var(--black);\n  color: var(--on-dark);\n}\n\n.lm-podbor .lmp__steps li.is-done::before {\n  content: '';\n  background: var(--main) url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5l4 4 8-9' fill='none' stroke='white' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") center / 14px no-repeat;\n}\n\n/* ---------- Шаги квиза ---------- */\n\n.lm-podbor .lmp__view {\n  margin-top: calc(var(--u) * 10);\n  animation: lmp-in .45s var(--ease);\n}\n\n@keyframes lmp-in {\n  from { opacity: 0; transform: translateY(8px); }\n}\n\n.lm-podbor .lmp__loading {\n  padding: calc(var(--u) * 10) 0;\n  font-size: calc(var(--u) * 4);\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__q {\n  margin: 0 0 calc(var(--u) * 6);\n  font-family: var(--title);\n  font-size: calc(var(--u) * 6);\n  font-weight: 400;\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__back {\n  display: inline-flex;\n  align-items: center;\n  gap: calc(var(--u) * 1.5);\n  margin: 0 0 calc(var(--u) * 4);\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: calc(var(--u) * 3.5);\n  color: var(--black-48);\n  transition: color .2s;\n}\n\n.lm-podbor .lmp__back svg {\n  width: 16px;\n  height: 16px;\n}\n\n.lm-podbor .lmp__back:hover {\n  color: var(--main);\n}\n\n/* Карточки выбора — как карточки сайта: белые, r=16, мягкая тень */\n.lm-podbor .lmp__cards {\n  display: grid;\n  gap: calc(var(--u) * 4);\n}\n\n.lm-podbor .lmp__cards--4 { grid-template-columns: repeat(4, 1fr); }\n.lm-podbor .lmp__cards--3 { grid-template-columns: repeat(3, 1fr); }\n\n.lm-podbor .lmp__card {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: calc(var(--u) * 2);\n  min-height: calc(var(--u) * 44);\n  padding: calc(var(--u) * 7) calc(var(--u) * 6) calc(var(--u) * 6);\n  border: 0;\n  border-radius: calc(var(--u) * 4);\n  outline: 2px solid transparent;\n  background: var(--white);\n  box-shadow: 0 4px 24px rgba(7, 7, 31, .06);\n  text-align: left;\n  transition: transform .35s var(--ease), box-shadow .35s var(--ease), outline-color .25s;\n}\n\n.lm-podbor .lmp__card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 40px -16px rgba(7, 7, 31, .22);\n}\n\n.lm-podbor .lmp__card.is-selected {\n  outline-color: var(--main);\n}\n\n.lm-podbor .lmp__card-title {\n  font-family: var(--title);\n  font-size: calc(var(--u) * 5);\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__card-text {\n  font-size: calc(var(--u) * 3.5);\n  line-height: 150%;\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__card-arrow {\n  display: grid;\n  place-items: center;\n  width: calc(var(--u) * 10);\n  height: calc(var(--u) * 10);\n  margin-top: auto;\n  border-radius: 50%;\n  background: var(--main-4);\n  color: var(--main);\n  transition: background-color .25s, color .25s, transform .35s var(--ease);\n}\n\n.lm-podbor .lmp__card-arrow svg {\n  width: 18px;\n  height: 18px;\n}\n\n.lm-podbor .lmp__card:hover .lmp__card-arrow {\n  background: var(--main);\n  color: var(--on-dark);\n  transform: translateX(4px);\n}\n\n/* ---------- Поля и кнопки-опции: как фильтр каталога ---------- */\n\n.lm-podbor .lmp__field {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--u) * 2);\n  min-width: 0;\n}\n\n.lm-podbor .lmp__label {\n  font-size: calc(var(--u) * 3);\n  line-height: 130%;\n  color: var(--ink-48);\n}\n\n.lm-podbor .lmp__opts {\n  display: flex;\n  flex-wrap: wrap;\n  gap: calc(var(--u) * 1);\n}\n\n.lm-podbor .lmp__opt {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: calc(var(--u) * 12);\n  padding: 0 calc(var(--u) * 4);\n  border: 0;\n  border-radius: calc(var(--u) * 2);\n  background-color: var(--main-4);\n  color: var(--ink);\n  font-size: calc(var(--u) * 3.5);\n  line-height: 130%;\n  white-space: nowrap;\n  transition: background-color .3s, color .3s;\n}\n\n@media (hover: hover) {\n  .lm-podbor .lmp__opt:hover {\n    background-color: var(--main);\n    color: var(--on-dark);\n  }\n  .lm-podbor .lmp__opt.is-active:hover {\n    background-color: var(--black-80);\n  }\n}\n\n.lm-podbor .lmp__opt.is-active {\n  background-color: var(--black);\n  color: var(--on-dark);\n}\n\n.lm-podbor .lmp__more {\n  margin-top: calc(var(--u) * 4);\n}\n\n.lm-podbor .lmp__more summary {\n  display: inline-flex;\n  align-items: center;\n  gap: calc(var(--u) * 1);\n  margin-bottom: calc(var(--u) * 3);\n  font-size: calc(var(--u) * 3.5);\n  cursor: pointer;\n  list-style: none;\n}\n\n.lm-podbor .lmp__more summary::after {\n  content: '';\n  width: 8px;\n  height: 8px;\n  margin-top: -3px;\n  border-right: 1.5px solid currentColor;\n  border-bottom: 1.5px solid currentColor;\n  transform: rotate(45deg);\n  transition: transform .25s;\n}\n\n.lm-podbor .lmp__more[open] summary::after {\n  margin-top: 3px;\n  transform: rotate(-135deg);\n}\n\n.lm-podbor .lmp__more summary::-webkit-details-marker {\n  display: none;\n}\n\n.lm-podbor .lmp__row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  gap: calc(var(--u) * 6) calc(var(--col) * 1);\n  margin-top: calc(var(--u) * 8);\n}\n\n.lm-podbor .lmp__field--range {\n  width: calc(var(--col) * 8);\n}\n\n/* Диапазон: поле 48px с «от | до», линия 2px и ручки 12px по нижнему краю */\n.lm-podbor .lmp__range {\n  position: relative;\n  display: flex;\n  height: calc(var(--u) * 12);\n  border-radius: calc(var(--u) * 2);\n  background-color: var(--main-4);\n  font-size: calc(var(--u) * 3.5);\n}\n\n.lm-podbor .lmp__range-value {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 calc(var(--u) * 5);\n  font-variant-numeric: tabular-nums;\n}\n\n.lm-podbor .lmp__range-value + .lmp__range-value {\n  justify-content: flex-end;\n}\n\n.lm-podbor .lmp__range-track {\n  position: absolute;\n  left: calc(var(--u) * 7);\n  right: calc(var(--u) * 7);\n  bottom: -1px;\n  height: 2px;\n  background: var(--black-12);\n}\n\n.lm-podbor .lmp__range-track i {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  background: var(--main);\n}\n\n.lm-podbor .lmp__range-track input {\n  -webkit-appearance: none;\n  appearance: none;\n  position: absolute;\n  left: -6px;\n  right: -6px;\n  top: -11px;\n  width: calc(100% + 12px);\n  height: 24px;\n  margin: 0;\n  background: none;\n  pointer-events: none;\n  outline: none;\n}\n\n.lm-podbor .lmp__range-track input::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 12px;\n  height: 12px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--main);\n  cursor: pointer;\n  pointer-events: auto;\n}\n\n.lm-podbor .lmp__range-track input::-moz-range-thumb {\n  width: 12px;\n  height: 12px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--main);\n  cursor: pointer;\n  pointer-events: auto;\n}\n\n.lm-podbor .lmp__actions {\n  margin-top: calc(var(--u) * 10);\n}\n\n/* Кнопки — как ClassicButton сайта: 48px, r=8, основной цвет */\n.lm-podbor .lmp__btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: calc(var(--u) * 12);\n  padding: 0 calc(var(--u) * 8);\n  border: 0;\n  border-radius: calc(var(--u) * 2);\n  background: var(--main);\n  color: var(--on-dark);\n  font-family: var(--title);\n  font-size: calc(var(--u) * 3.5);\n  text-decoration: none;\n  transition: background-color .3s, color .3s;\n}\n\n@media (hover: hover) {\n  .lm-podbor .lmp__btn:hover {\n    background: var(--black);\n  }\n}\n\n.lm-podbor .lmp__btn--light {\n  background: var(--white);\n  color: var(--main);\n}\n\n.lm-podbor .lmp__btn--small {\n  height: calc(var(--u) * 9);\n  padding: 0 calc(var(--u) * 4);\n  font-size: calc(var(--u) * 3.25);\n}\n\n.lm-podbor .lmp__link {\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: calc(var(--u) * 3.5);\n  color: var(--main);\n}\n\n.lm-podbor .lmp__link:hover {\n  color: var(--black);\n}\n\n/* ---------- Запрос над выдачей ---------- */\n\n.lm-podbor .lmp__query {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--u) * 5);\n}\n\n.lm-podbor .lmp__query-head {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: calc(var(--u) * 4);\n  flex-wrap: wrap;\n}\n\n.lm-podbor .lmp__query-goal {\n  font-family: var(--title);\n  font-size: calc(var(--u) * 6);\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__query-links {\n  display: flex;\n  gap: calc(var(--u) * 6);\n}\n\n/* ---------- Выдача ---------- */\n\n.lm-podbor [data-el=list] {\n  transition: opacity .18s ease;\n}\n\n.lm-podbor [data-el=list].is-leaving {\n  opacity: 0;\n}\n\n.lm-podbor [data-el=list].is-entering .lmp__type {\n  opacity: 0;\n  transform: translateY(16px);\n}\n\n.lm-podbor .lmp__list-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: calc(var(--u) * 4);\n  flex-wrap: wrap;\n  margin-bottom: calc(var(--u) * 6);\n}\n\n.lm-podbor .lmp__count {\n  font-size: calc(var(--u) * 4);\n  line-height: 150%;\n}\n\n.lm-podbor .lmp__sort {\n  display: flex;\n  align-items: center;\n  gap: calc(var(--u) * 4);\n}\n\n.lm-podbor .lmp__sort-btn {\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: calc(var(--u) * 3.5);\n  color: var(--ink);\n  transition: color .2s;\n}\n\n.lm-podbor .lmp__sort-btn.is-active,\n.lm-podbor .lmp__sort-btn:hover {\n  color: var(--main);\n}\n\n.lm-podbor .lmp__types {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--u) * 4);\n}\n\n/* Карточка типа, как у Арбана: слева планировка, справа квартиры этого типа */\n.lm-podbor .lmp__type {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: calc(var(--u) * 6);\n  padding: calc(var(--u) * 4);\n  border-radius: calc(var(--u) * 4);\n  background: var(--white);\n  transition: opacity .45s var(--ease), transform .55s var(--ease);\n  transition-delay: calc(var(--i, 0) * 45ms);\n}\n\n.lm-podbor .lmp__type-main {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--u) * 5);\n  min-width: 0;\n  padding: calc(var(--u) * 3) calc(var(--u) * 2) calc(var(--u) * 2) calc(var(--u) * 3);\n}\n\n.lm-podbor .lmp__type-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: calc(var(--u) * 4);\n}\n\n.lm-podbor .lmp__type-title {\n  margin: 0;\n  font-family: var(--title);\n  font-size: calc(var(--u) * 6);\n  font-weight: 400;\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__type-price {\n  margin-top: calc(var(--u) * 1);\n  font-family: var(--title);\n  font-size: calc(var(--u) * 6);\n  line-height: 120%;\n  color: var(--main);\n}\n\n.lm-podbor .lmp__type-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: calc(var(--u) * 1) calc(var(--u) * 4);\n  margin-top: calc(var(--u) * 3);\n  font-size: calc(var(--u) * 3.5);\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__type-meta span:first-child {\n  color: var(--ink);\n  text-transform: uppercase;\n  letter-spacing: .02em;\n}\n\n.lm-podbor .lmp__match {\n  flex: none;\n  padding: calc(var(--u) * 1.5) calc(var(--u) * 2.5);\n  border-radius: calc(var(--u) * 1.5);\n  background: var(--main-8);\n  color: var(--main);\n  font-size: calc(var(--u) * 3);\n  line-height: 1;\n}\n\n/* Flex + фиксированная высота: в grid-ячейке max-height в % не работает, и план «уезжал» */\n.lm-podbor .lmp__type-plan {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: calc(var(--u) * 80);\n  overflow: hidden;\n}\n\n.lm-podbor .lmp__type-plan img,\n.lm-podbor .lmp__panel-plan img {\n  display: block;\n  width: auto;\n  height: auto;\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n\n/* Заглушка плана — как ClassicPlanNew__state */\n.lm-podbor .lmp__plan-state {\n  display: inline-flex;\n  align-items: center;\n  gap: calc(var(--u) * 2);\n  padding: calc(var(--u) * 2) calc(var(--u) * 2.5);\n  border: 1px solid var(--main);\n  border-radius: calc(var(--u) * 1.5);\n  background-color: var(--white);\n  color: var(--main);\n  font-size: calc(var(--u) * 3);\n  line-height: 160%;\n  white-space: nowrap;\n}\n\n.lm-podbor .lmp__plan-state svg {\n  width: calc(var(--u) * 3);\n  height: calc(var(--u) * 3);\n}\n\n.lm-podbor .lmp__plan-state.is-small span {\n  display: none;\n}\n\n/* Теги — как теги карточки квартиры: 12px, r=4, фон base-black-4 */\n.lm-podbor .lmp__type-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: calc(var(--u) * 1.5);\n  margin-top: auto;\n}\n\n.lm-podbor .lmp__tag {\n  padding: calc(var(--u) * 1.5) calc(var(--u) * 2);\n  border-radius: calc(var(--u) * 1);\n  background-color: var(--black-4);\n  color: var(--ink-48);\n  font-size: calc(var(--u) * 3);\n  line-height: 1;\n}\n\n.lm-podbor .lmp__tag.is-yes {\n  background-color: var(--main-8);\n  color: var(--main);\n}\n\n.lm-podbor .lmp__type-side {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--u) * 2);\n  min-width: 0;\n  padding: calc(var(--u) * 6);\n  border-radius: calc(var(--u) * 4);\n  background: var(--main-4);\n}\n\n.lm-podbor .lmp__side-title {\n  margin-bottom: calc(var(--u) * 2);\n  font-family: var(--title);\n  font-size: calc(var(--u) * 5);\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__rows {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--u) * 2);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.lm-podbor .lmp__line {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1.5fr) .7fr .8fr 1.2fr 1.1fr 1fr;\n  align-items: center;\n  gap: calc(var(--u) * 3);\n  min-height: calc(var(--u) * 14);\n  padding: calc(var(--u) * 3) calc(var(--u) * 4);\n  border-radius: calc(var(--u) * 3);\n  background: var(--white);\n  color: var(--ink);\n  font-size: calc(var(--u) * 3.5);\n  text-decoration: none;\n  transition: box-shadow .3s var(--ease), transform .3s var(--ease);\n}\n\n.lm-podbor a.lmp__line:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 24px -16px rgba(7, 7, 31, .35);\n}\n\n.lm-podbor .lmp__line span {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.lm-podbor .lmp__line-b,\n.lm-podbor .lmp__line-ppm,\n.lm-podbor .lmp__line-c {\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__line-price {\n  font-weight: 500;\n}\n\n.lm-podbor .lmp__line.is-best {\n  outline: 1px solid var(--main);\n}\n\n.lm-podbor .lmp__line-best {\n  position: absolute;\n  top: -8px;\n  left: calc(var(--u) * 4);\n  padding: 2px 6px;\n  border-radius: 4px;\n  background: var(--main);\n  color: var(--on-dark);\n  font-size: 11px;\n  font-style: normal;\n  line-height: 1.3;\n}\n\n.lm-podbor .lmp__side-btn {\n  width: 100%;\n  margin-top: auto;\n}\n\n.lm-podbor .lmp__rows + .lmp__side-btn {\n  margin-top: calc(var(--u) * 4);\n}\n\n.lm-podbor .lmp__more-btn {\n  width: 100%;\n  margin-top: calc(var(--u) * 4);\n}\n\n/* ---------- Сравнение внутри типа ---------- */\n\n.lm-podbor.lmp-portal {\n  position: relative;\n  z-index: 2147483000;\n}\n\n.lm-podbor .lmp__drawer {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n}\n\n.lm-podbor .lmp__drawer[hidden] {\n  display: none;\n}\n\n.lm-podbor .lmp__drawer-backdrop {\n  position: absolute;\n  inset: 0;\n  background: rgba(7, 7, 31, .4);\n  animation: lmp-fade .3s ease;\n}\n\n@keyframes lmp-fade {\n  from { opacity: 0; }\n}\n\n@keyframes lmp-slide {\n  from { transform: translateX(32px); opacity: 0; }\n}\n\n.lm-podbor .lmp__drawer-panel {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(calc(var(--col) * 21), 100%);\n  overflow-y: auto;\n  padding: calc(var(--u) * 8);\n  background: var(--white);\n  animation: lmp-slide .45s var(--ease);\n  outline: none;\n}\n\n.lm-podbor .lmp__close {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  float: right;\n  display: grid;\n  place-items: center;\n  width: calc(var(--u) * 10);\n  height: calc(var(--u) * 10);\n  border: 0;\n  border-radius: 50%;\n  background: var(--main-4);\n  transition: background-color .25s, color .25s;\n}\n\n.lm-podbor .lmp__close svg {\n  width: 18px;\n  height: 18px;\n}\n\n.lm-podbor .lmp__close:hover {\n  background: var(--main);\n  color: var(--on-dark);\n}\n\n.lm-podbor .lmp__panel-head {\n  display: flex;\n  gap: calc(var(--u) * 5);\n  align-items: center;\n}\n\n.lm-podbor .lmp__panel-plan {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  flex: none;\n  width: calc(var(--u) * 30);\n  height: calc(var(--u) * 30);\n  padding: calc(var(--u) * 2);\n  border-radius: calc(var(--u) * 3);\n  background: var(--main-4);\n}\n\n.lm-podbor .lmp__panel-head h3 {\n  margin: 0;\n  font-family: var(--title);\n  font-size: calc(var(--u) * 6);\n  font-weight: 400;\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__panel-lead {\n  margin: calc(var(--u) * 6) 0 calc(var(--u) * 5);\n  font-size: calc(var(--u) * 4);\n  line-height: 150%;\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__flats {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--u) * 3);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.lm-podbor .lmp__flat {\n  display: grid;\n  grid-template-columns: 1.1fr 1.6fr .9fr;\n  gap: calc(var(--u) * 4);\n  align-items: start;\n  padding: calc(var(--u) * 5);\n  border-radius: calc(var(--u) * 4);\n  outline: 2px solid transparent;\n  background: var(--main-4);\n}\n\n.lm-podbor .lmp__flat.is-best {\n  outline-color: var(--main);\n  background: var(--white);\n}\n\n.lm-podbor .lmp__badge {\n  display: inline-block;\n  margin-bottom: calc(var(--u) * 2);\n  padding: calc(var(--u) * 1.5) calc(var(--u) * 2);\n  border-radius: calc(var(--u) * 1);\n  background: var(--main);\n  color: var(--on-dark);\n  font-size: calc(var(--u) * 3);\n  line-height: 1;\n}\n\n.lm-podbor .lmp__flat-floor {\n  font-family: var(--title);\n  font-size: calc(var(--u) * 4.5);\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__flat-meta {\n  margin-top: calc(var(--u) * 1);\n  font-size: calc(var(--u) * 3.25);\n  line-height: 140%;\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__flat-diff {\n  margin-top: calc(var(--u) * 3);\n  font-size: calc(var(--u) * 3.25);\n  line-height: 140%;\n}\n\n.lm-podbor .lmp__flat-diff .is-good {\n  color: var(--good);\n  font-weight: 500;\n}\n\n.lm-podbor .lmp__factors {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: calc(var(--u) * 3) calc(var(--u) * 4);\n  margin: 0;\n}\n\n.lm-podbor .lmp__factors dt {\n  font-size: calc(var(--u) * 3);\n  color: var(--ink-48);\n}\n\n.lm-podbor .lmp__factors dd {\n  margin: calc(var(--u) * 1) 0 0;\n  font-size: calc(var(--u) * 3.5);\n}\n\n.lm-podbor .lmp__bar {\n  display: block;\n  height: 2px;\n  margin-top: calc(var(--u) * 1.5);\n  background: var(--black-12);\n}\n\n.lm-podbor .lmp__bar i {\n  display: block;\n  height: 100%;\n  background: var(--main);\n}\n\n.lm-podbor .lmp__flat-price {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: calc(var(--u) * 1);\n  text-align: right;\n}\n\n.lm-podbor .lmp__flat-price b {\n  font-family: var(--title);\n  font-size: calc(var(--u) * 4.5);\n  font-weight: 400;\n}\n\n.lm-podbor .lmp__flat-price small {\n  font-size: calc(var(--u) * 3);\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__flat-price .lmp__btn {\n  margin-top: calc(var(--u) * 2);\n}\n\nhtml.lmp-lock {\n  overflow: hidden;\n}\n\n/* ---------- Адаптив: брейкпоинт сайта 812px ---------- */\n\n@media (max-width: 1100px) {\n  .lm-podbor .lmp__cards--4 { grid-template-columns: repeat(2, 1fr); }\n  .lm-podbor .lmp__type { grid-template-columns: 1fr; }\n  .lm-podbor .lmp__line { grid-template-columns: minmax(0, 1.4fr) .7fr .8fr 1.2fr 1fr; }\n  .lm-podbor .lmp__line-c { display: none; }\n}\n\n@media (max-width: 812px) {\n  .lm-podbor .lmp > .lmp__container { padding-block: var(--ui-padding-top, calc(var(--u) * 6)) calc(var(--u) * 6); }\n  .lm-podbor .lmp__band { padding-block: calc(var(--u) * 6) var(--ui-padding-bottom, calc(var(--u) * 6)); }\n  .lm-podbor .lmp__container { width: calc(100% - var(--u) * 8); }\n  .lm-podbor .lmp__head { flex-direction: column; align-items: stretch; row-gap: calc(var(--u) * 4); }\n  .lm-podbor .lmp__title { width: 100%; font-size: calc(var(--u) * 5); }\n  .lm-podbor .lmp__lead { max-width: none; margin: 0; font-size: calc(var(--u) * 3.5); line-height: 160%; }\n  .lm-podbor .lmp__steps { margin-top: calc(var(--u) * 6); gap: calc(var(--u) * 2) calc(var(--u) * 4); font-size: calc(var(--u) * 3); }\n  .lm-podbor .lmp__steps li:not(.is-current) { font-size: 0; gap: 0; }\n  .lm-podbor .lmp__steps li:not(.is-current)::before { font-size: calc(var(--u) * 3); }\n  .lm-podbor .lmp__view { margin-top: calc(var(--u) * 6); }\n  .lm-podbor .lmp__q,\n  .lm-podbor .lmp__query-goal { font-size: calc(var(--u) * 5); }\n  .lm-podbor .lmp__cards--4,\n  .lm-podbor .lmp__cards--3 { grid-template-columns: 1fr; }\n  .lm-podbor .lmp__card { min-height: 0; padding: calc(var(--u) * 5); }\n  .lm-podbor .lmp__card-title { font-size: calc(var(--u) * 4.5); }\n  .lm-podbor .lmp__field--range { width: 100%; }\n  .lm-podbor .lmp__opts--joined .lmp__opt { flex: 1 1 auto; }\n  /* Опции запроса в одну прокручиваемую строку — выдача видна сразу */\n  .lm-podbor .lmp__opts--scroll { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; margin: 0 calc(var(--u) * -4); padding: 0 calc(var(--u) * 4); }\n  .lm-podbor .lmp__opts--scroll::-webkit-scrollbar { display: none; }\n  .lm-podbor .lmp__opts--scroll .lmp__opt { flex: none; }\n  .lm-podbor .lmp__btn { width: 100%; }\n  .lm-podbor .lmp__type { padding: calc(var(--u) * 3); gap: calc(var(--u) * 3); }\n  .lm-podbor .lmp__type-main { padding: calc(var(--u) * 2); }\n  .lm-podbor .lmp__type-title,\n  .lm-podbor .lmp__type-price { font-size: calc(var(--u) * 4.5); }\n  .lm-podbor .lmp__type-plan { height: calc(var(--u) * 50); }\n  .lm-podbor .lmp__type-side { padding: calc(var(--u) * 4); }\n  .lm-podbor .lmp__side-title { font-size: calc(var(--u) * 4); }\n  .lm-podbor .lmp__line { grid-template-columns: .8fr .9fr 1.3fr; row-gap: calc(var(--u) * 1); }\n  .lm-podbor .lmp__line-b { grid-column: 1 / -1; }\n  .lm-podbor .lmp__line-ppm { display: none; }\n  .lm-podbor .lmp__drawer-panel { padding: calc(var(--u) * 5) calc(var(--u) * 4); }\n  .lm-podbor .lmp__panel-plan { width: calc(var(--u) * 22); height: calc(var(--u) * 22); }\n  .lm-podbor .lmp__panel-head h3 { font-size: calc(var(--u) * 5); }\n  .lm-podbor .lmp__flat { grid-template-columns: 1fr; }\n  .lm-podbor .lmp__flat-price { align-items: flex-start; text-align: left; }\n  .lm-podbor .lmp__flat-price .lmp__btn { width: auto; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .lm-podbor *,\n  .lm-podbor *::before,\n  .lm-podbor *::after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n\n/* Почему эта квартира «Лучшая» */\n.lm-podbor .lmp__why {\n  margin-top: calc(var(--u) * 2);\n  font-size: calc(var(--u) * 3.25);\n  line-height: 140%;\n  color: var(--black-48);\n}\n\n.lm-podbor .lmp__flat .lmp__why {\n  margin: 0 0 calc(var(--u) * 2);\n  color: var(--main);\n}\n" });
try {
/*
 * lm-podbor — модель: пресеты, потребности, факторы квартиры (тишина, пыль, свет), агрегация по типам.
 * Чистые функции без DOM — их использует script.js. Экспорт: window.LMPodborModel.
 *
 * Где у сайта нет данных — типовые допущения (DEFAULTS), в интерфейсе помечаются «≈».
 */
(function () {
  'use strict';

  // ---------- Допущения, пока стояки не размечены ----------
  var DEFAULTS = {
    windowSide: 'local',  // 'yard' — двор-колодец, 'local' — улица-спальник 1×1, 'highway' — шоссе 3×3
    roadDistance: 75      // метров до кромки проезжей части (диапазон 50–100 м → Kd = 1.0)
  };

  // ---------- Тишина: на сколько дБ громче, чем в тихом дворе на среднем этаже ----------
  // Закрытое окно: шоссе vs колодец 5–12 дБ, спальник vs колодец 3–8 дБ (берём середину)
  // Открытое окно: шоссе 10–20 дБ, спальник 8–15 дБ. +10 дБ ощущается вдвое громче.
  var NOISE_SIDE = {
    closed: { yard: 0, local: 5.5, highway: 8.5 },
    open: { yard: 0, local: 11.5, highway: 15 }
  };

  function noiseFloorAdj(floor, side) {
    if (floor <= 2) return 3;            // пешеходы, машины у подъезда, коммерция, контейнеры
    if (floor <= 5) return 1;
    if (floor <= 12) return 0;
    return side === 'highway' ? 1 : -1; // шоссе: прямая видимость сверху; иначе — дальше от двора
  }

  function noise(floor, side, mode) {
    var db = NOISE_SIDE[mode || 'closed'][side] + noiseFloorAdj(floor, side);
    var score = clamp(1 - db / 12, 0, 1);
    return {
      db: db,
      score: score,
      label: score >= 0.75 ? 'Тихо' : score >= 0.45 ? 'Умеренно' : 'Шумно'
    };
  }

  // ---------- Пыль (оседающая: налёт на окнах и подоконнике) ----------
  // Нормировка: 1.00 = улица (шоссе 3×3), 2 этаж
  var DUST_HIGHWAY_BY_FLOOR = [
    [1, 1.15], [2, 1.0], [3, 0.9], [5, 0.78], [8, 0.62], [12, 0.5], [17, 0.42], [999, 0.38]
  ];
  var DUST_SIDE = { highway: 1, local: 0.6, yard: 0.4 };

  function kd(distance) {
    var d = distance == null ? DEFAULTS.roadDistance : distance;
    if (d <= 30) return 1.3;
    if (d <= 50) return 1.1;
    if (d <= 100) return 1.0;
    if (d <= 150) return 0.8;
    if (d <= 250) return 0.65;
    if (d <= 400) return 0.55;
    if (d <= 600) return 0.45;
    return 0.4;
  }

  function dust(floor, side, distance) {
    var base = DUST_HIGHWAY_BY_FLOOR.find(function (r) { return floor <= r[0]; })[1];
    var k = kd(distance);
    if (side === 'local') k *= 0.9;
    if (side === 'yard') k = 1 + (k - 1) * 0.3; // во дворе расстояние до дороги влияет слабо
    var coef = base * DUST_SIDE[side] * k;
    return {
      coef: coef,
      score: clamp(1 - coef / 1.1, 0, 1),
      label: coef <= 0.3 ? 'Мало' : coef <= 0.6 ? 'Средне' : 'Много'
    };
  }

  // ---------- Свет: стороны света ----------
  var DIRS = {
    south: { name: 'юг', sun: 1, heat: 0.7, text: 'максимум солнца, тепло зимой; летом нужны шторы' },
    south_east: { name: 'юго-восток', sun: 0.9, heat: 0.4, text: 'солнце утром и днём, без вечернего перегрева' },
    south_west: { name: 'юго-запад', sun: 0.9, heat: 0.9, text: 'много солнца, самый жаркий вариант летом' },
    east: { name: 'восток', sun: 0.7, heat: 0.3, text: 'светло с утра, вечером прохладно' },
    west: { name: 'запад', sun: 0.7, heat: 1, text: 'яркое вечернее солнце, летом жарко' },
    north_east: { name: 'северо-восток', sun: 0.45, heat: 0.15, text: 'мягкий утренний свет, не перегревается' },
    north_west: { name: 'северо-запад', sun: 0.45, heat: 0.5, text: 'вечерний свет, слабее запада' },
    north: { name: 'север', sun: 0.25, heat: 0, text: 'ровный рассеянный свет, прохладно' }
  };

  // Свет только по числу сторон с окнами (сторона света неизвестна)
  function lightByFacades(facades, floor) {
    if (!facades) return null;
    var sun = facades >= 2 ? 0.75 : 0.45;
    if (floor <= 3) sun *= 0.85;
    return {
      score: sun, sunny: null, shadeSide: null, names: [],
      label: facades >= 2 ? 'Окна на две стороны' : 'Окна на одну сторону'
    };
  }

  // Соседство: что за стеной спальни (дБ бытового шума через стену)
  var WALL = {
    outer: { db: 0, label: 'Наружная стена' },
    neighbor_bedroom: { db: 0.5, label: 'Спальня соседей' },
    neighbor_living: { db: 2, label: 'Кухня-гостиная соседей' },
    corridor: { db: 2.5, label: 'Общий коридор' },
    stair: { db: 3, label: 'Лестница' },
    lift: { db: 4, label: 'Шахта лифта' }
  };

  function neighbours(wall) {
    var w = WALL[wall];
    if (!w) return null;
    var score = clamp(1 - w.db / 4, 0, 1);
    return { score: score, label: w.label };
  }

  // Вход: дверь напротив соседа и сколько дверей рядом (хлопки, разговоры, курьеры)
  function entrance(near, opp) {
    if (near == null) return null;
    var score = clamp(1 - (opp ? 0.3 : 0) - Math.min(near, 3) * 0.15, 0, 1);
    return {
      score: score,
      label: opp ? 'Дверь напротив соседа' : near >= 3 ? 'Много дверей рядом' : near >= 2 ? 'Рядом две двери' : 'Спокойный вход'
    };
  }

  function light(dirs, floor) {
    if (!dirs || !dirs.length) return null;
    var known = dirs.filter(function (d) { return DIRS[d]; });
    if (!known.length) return null;
    var sun = Math.max.apply(null, known.map(function (d) { return DIRS[d].sun; }));
    if (floor <= 3) sun *= 0.85; // соседние дома и деревья затеняют нижние этажи
    var hasShade = known.some(function (d) { return DIRS[d].sun <= 0.45 || d === 'east'; });
    return {
      score: sun,
      sunny: known.some(function (d) { return DIRS[d].sun >= 0.7; }),
      shadeSide: hasShade && known.length > 1,
      names: known.map(function (d) { return DIRS[d].name; }),
      text: known.map(function (d) { return DIRS[d].name + ': ' + DIRS[d].text; }).join('; '),
      label: sun >= 0.85 ? 'Солнечно' : sun >= 0.6 ? 'Светло' : 'Мягкий свет'
    };
  }

  // ---------- Отделка ----------
  var FINISHING = {
    no: { grade: 0, name: 'без отделки' },
    rough: { grade: 0, name: 'черновая' },
    white_box: { grade: 1, name: 'white box' },
    pre_fine: { grade: 1, name: 'предчистовая' },
    fine: { grade: 2, name: 'чистовая' },
    euro: { grade: 3, name: 'евроремонт' },
    fully_completed: { grade: 3, name: 'под ключ' },
    design: { grade: 3, name: 'дизайнерская' }
  };

  // ---------- Потребности: правило → true / false / null (нет данных) ----------
  var NEEDS = {
    no_repair: { label: 'Заехать без ремонта', compromise: 'отделку делать самим',
      test: function (f) { return f.finishGrade == null ? null : f.finishGrade >= 2; } },
    move_fast: { label: 'Переезд в ближайший месяц', compromise: 'дом ещё строится',
      test: function (f) { return f.monthsToReady == null ? null : f.monthsToReady <= 1; } },
    move_year: { label: 'Заселение в течение года', compromise: 'сдача позже, чем через год',
      test: function (f) { return f.monthsToReady == null ? null : f.monthsToReady <= 12; } },
    quiet: { label: 'Тихий сон', compromise: 'может быть шумнее', approx: true,
      test: function (f) { return f.floor >= 6 && f.noise.score >= 0.5; } },
    space: { label: 'Больше пространства и хранения', compromise: 'меньше метраж',
      test: function (f) { return f.hasWardrobe === true || f.areaPerRoom >= 24; } },
    kids_room: { label: 'Удобно под детскую', compromise: 'компактные комнаты',
      test: function (f) { return f.rooms >= 2 && f.areaPerRoom >= 22; } },
    remote: { label: 'Место для работы из дома', compromise: 'нет отдельного угла для работы',
      test: function (f) {
        if (f.rooms >= 3) return true;
        if (f.rooms === 2) return f.kitchenLiving === true && (f.kitchenArea == null || f.kitchenArea >= 18);
        if (f.rooms <= 1) return f.kitchenLiving === true && f.area >= 38;
        return false;
      } },
    storage: { label: 'Гардеробная', compromise: 'нет гардеробной',
      test: function (f) { return f.hasWardrobe; } },
    kitchen_living: { label: 'Кухня-гостиная с местом для игр', compromise: 'отдельная кухня',
      test: function (f) {
        if (f.kitchenLiving == null) return null;
        return f.kitchenLiving && (f.kitchenArea == null || f.kitchenArea >= 16);
      } },
    two_wc: { label: 'Санузел без очереди', compromise: 'один санузел',
      test: function (f) { return f.wcCount >= 2; } },
    budget_first: { label: 'Сначала зайти в бюджет', compromise: 'дороже аналогов',
      test: function (f) { return f.ppmVsType == null ? null : f.ppmVsType <= 1.0; } },
    sunny_living: { label: 'Солнечная гостиная', compromise: 'меньше прямого солнца',
      test: function (f) { return f.light ? f.light.sunny : null; } },
    shade_bedrooms: { label: 'Спальни без жаркого солнца', compromise: 'все окна на солнце',
      test: function (f) { return f.light ? f.light.shadeSide : null; } },
    high_view: { label: 'Высокий этаж и вид', compromise: 'невысокий этаж',
      test: function (f) { return f.withView === true || f.floorPos === 'high'; } },
    balcony: { label: 'Балкон или лоджия', compromise: 'без балкона',
      test: function (f) { return f.hasBalcony; } },
    easy_floor: { label: 'Невысоко, но не первый этаж', compromise: 'этаж выше комфортного для пожилых',
      test: function (f) { return f.floor >= 2 && f.floor <= 6; } },
    not_first: { label: 'Не первый этаж', compromise: 'первый этаж',
      test: function (f) { return f.floor > 1; } },
    budget_low: { label: 'Цена в нижней трети', compromise: 'дороже большинства вариантов',
      test: function (f) { return f.priceRank == null ? null : f.priceRank <= 0.35; } },
    liquid: { label: 'Ликвидный формат', compromise: 'менее ходовой формат',
      test: function (f) { return (f.rooms <= 1 && f.area <= 45) || (f.rooms === 2 && f.area <= 60); } },
    cheap_ppm: { label: 'Цена за м² ниже рынка ЖК', compromise: '₽/м² выше медианы ЖК',
      test: function (f) { return f.ppmVsComplex == null ? null : f.ppmVsComplex <= 0.97; } },
    rent_ready: { label: 'Можно сразу сдавать', compromise: 'перед сдачей нужен ремонт или ожидание',
      test: function (f) { return f.finishGrade != null && f.finishGrade >= 2 && f.monthsToReady != null && f.monthsToReady <= 6; } },
    growth: { label: 'Ранняя стадия, цена может вырасти', compromise: 'дом почти готов, рост цены меньше',
      test: function (f) { return f.monthsToReady == null ? null : f.monthsToReady >= 12; } },
    flip: { label: 'Под ремонт и перепродажу', compromise: 'отделка уже есть, меньше выгода от ремонта',
      test: function (f) { return f.finishGrade == null ? null : f.finishGrade <= 1; } },
    mid_floor: { label: 'Средний этаж, проще перепродать', compromise: 'крайний этаж',
      test: function (f) { return f.floorPos === 'mid'; } },
    // Нет данных на сайте — показываются выключенными до разметки стояков / данных о паркинге
    parking: { label: 'Быстро из машины в квартиру', compromise: '', unavailable: 'нет данных о паркинге в секции',
      test: function () { return null; } },
    transport: { label: 'Транспорт рядом', compromise: '', unavailable: 'нет данных о транспорте',
      test: function () { return null; } }
  };

  // ---------- Пресеты ----------
  var GOALS = [
    { id: 'single', title: 'Буду жить один', text: 'Своё пространство под ваш ритм',
      subs: [
        { id: 'first', profile: 'budget', title: 'Первая своя квартира', text: 'Важен бюджет и быстрый переезд',
          rooms: [0, 1], needs: ['budget_low', 'no_repair', 'move_year', 'liquid', 'cheap_ppm'] },
        { id: 'remote', profile: 'remote', title: 'Работаю из дома', text: 'Тишина и отдельное место для работы',
          rooms: [1, 2], needs: ['remote', 'quiet', 'kitchen_living', 'high_view', 'sunny_living'] },
        { id: 'space', profile: 'view', title: 'Простор и вид', text: 'Высокий этаж, свет, хранение',
          rooms: [1, 2], areaMin: 40, needs: ['high_view', 'space', 'sunny_living', 'balcony', 'storage'] }
      ] },
    { id: 'family', title: 'Для семьи', text: 'Место для всех и спокойный быт',
      subs: [
        { id: 'f20', profile: 'family', title: 'Без детей', text: 'Двое взрослых (2+0)',
          rooms: [1, 2], needs: ['kitchen_living', 'no_repair', 'quiet', 'balcony', 'budget_first'] },
        { id: 'f21', profile: 'family', title: 'С ребёнком', text: 'Двое взрослых и ребёнок (2+1)',
          rooms: [2, 3], areaMin: 50, needs: ['kids_room', 'quiet', 'space', 'two_wc', 'no_repair', 'kitchen_living', 'sunny_living', 'shade_bedrooms'] },
        { id: 'f3', profile: 'family', title: 'С детьми', text: 'Трое и больше (3+)',
          rooms: [3, 4, 5], areaMin: 70, needs: ['two_wc', 'kids_room', 'space', 'quiet', 'kitchen_living', 'storage'] }
      ] },
    { id: 'relatives', title: 'Для родственников', text: 'Рядом, удобно и без забот',
      subs: [
        { id: 'kids', profile: 'budget', title: 'Для детей', text: 'Первая квартира для взрослого ребёнка',
          rooms: [0, 1], needs: ['budget_low', 'liquid', 'no_repair', 'move_year'] },
        { id: 'parents', profile: 'parents', title: 'Для родителей', text: 'Невысоко, тихо, готово к жизни',
          rooms: [1, 2], needs: ['easy_floor', 'no_repair', 'quiet', 'move_year', 'sunny_living', 'not_first'] }
      ] },
    { id: 'invest', title: 'Для инвестиций', text: 'Доходность, ликвидность, сохранность',
      subs: [
        { id: 'rent', profile: 'invest', title: 'Быстро купить и сдать', text: 'Горизонт 1–6 месяцев',
          rooms: [0, 1], needs: ['rent_ready', 'liquid', 'no_repair', 'cheap_ppm'], invest: true },
        { id: 'yield', profile: 'invest', title: 'Максимальная доходность', text: 'Горизонт 3–7 лет',
          rooms: [0, 1], needs: ['cheap_ppm', 'liquid', 'budget_low', 'growth'], invest: true },
        { id: 'flip', profile: 'invest', title: 'Ремонт и перепродажа', text: 'Горизонт до 3 лет',
          rooms: [1, 2, 3], needs: ['flip', 'cheap_ppm', 'growth', 'mid_floor'], invest: true },
        { id: 'capital', profile: 'invest', title: 'Сохранить капитал', text: 'Надёжность и ликвидность, 7+ лет',
          rooms: [1, 2], needs: ['liquid', 'mid_floor', 'move_year', 'not_first', 'no_repair'], invest: true }
      ] }
  ];

  var MOVE = [
    { id: 'asap', title: 'Как можно быстрее', need: 'move_fast' },
    { id: 'year', title: 'В течение года', need: 'move_year' },
    { id: 'later', title: 'Через 1–3 года', need: null },
    { id: 'any', title: 'Не важно', need: null }
  ];

  // ---------- Подготовка квартир ----------
  function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }
  function median(arr) {
    var a = arr.filter(function (v) { return v != null; }).sort(function (x, y) { return x - y; });
    if (!a.length) return null;
    var m = Math.floor(a.length / 2);
    return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
  }

  function monthsTo(f, now) {
    if (f.is_ready) return 0;
    if (!f.completion_year) return null;
    var q = f.completion_quarter || 4;
    var end = new Date(f.completion_year, q * 3, 0); // последний день квартала
    return Math.max(0, Math.round((end - now) / (30.4 * 864e5)));
  }

  /*
   * raw — квартиры из API каталога; sectionFloors — { section_id: этажность }; stacks — разметка стояков
   * (на будущее: { "<section_id>:<axis>": { side, distance, dirs } }).
   */
  function prepare(raw, sectionFloors, stacks) {
    var now = new Date();
    stacks = stacks || {};
    var flats = raw.filter(function (f) { return f.status === 'free' && f.price > 0 && f.total_area > 0; }).map(function (f) {
      var floor = parseInt(f.floor_number, 10) || 1;
      var floors = Math.max(sectionFloors[f.section_id] || 0, floor);
      var stack = stacks[f.section_id + ':' + f.axis] || {};
      var side = stack.side || DEFAULTS.windowSide;
      var rooms = f.rooms || 0;
      var fin = FINISHING[f.finishing_type];
      var wc = (f.combined_wcs_count || 0) + (f.separate_wcs_count || 0);
      var flat = {
        raw: f,
        id: f.id,
        complexId: f.complex_id,
        complex: f.project_name,
        building: f.building_number,
        section: f.section_number,
        number: f.number,
        rooms: rooms,
        euro: !!f.is_euro,
        area: f.total_area,
        areaPerRoom: f.total_area / Math.max(rooms, 1),
        price: f.price,
        oldPrice: f.old_price,
        ppm: f.ppm || f.price / f.total_area,
        floor: floor,
        floors: floors,
        floorPos: floors < 4 ? 'mid' : floor <= Math.max(2, Math.round(floors * 0.25)) ? 'low' : floor > Math.round(floors * 0.7) ? 'high' : 'mid',
        finishing: fin ? fin.name : null,
        finishGrade: fin ? fin.grade : null,
        monthsToReady: monthsTo(f, now),
        completion: f.is_ready ? 'Дом сдан' : f.completion_title,
        kitchenArea: f.kitchen_area,
        kitchenLiving: f.kitchen_livingroom != null ? f.kitchen_livingroom : (f.is_euro ? true : null),
        hasWardrobe: f.has_wardrobe,
        withView: f.with_a_view,
        hasBalcony: !!f.has_balcony_or_loggia,
        wcCount: wc,
        plan: f.layout_plan,
        mortgage: f.special_mortgage_payment || f.mortgage_payment,
        promo: f.has_discount || f.has_promo,
        side: side,
        sideKnown: !!stack.side,
        noise: noise(floor, side, 'closed'),
        noiseOpen: noise(floor, side, 'open'),
        dust: dust(floor, side, stack.distance),
        light: light(stack.dirs || f.directions, floor) || lightByFacades(stack.facades, floor),
        facades: stack.facades || null,
        wall: neighbours(stack.wall),
        entrance: entrance(stack.near, stack.opp)
      };
      return flat;
    });

    // Цена относительно ЖК и всего сайта
    var byComplex = {};
    flats.forEach(function (f) { (byComplex[f.complexId] = byComplex[f.complexId] || []).push(f.ppm); });
    var cMed = {};
    Object.keys(byComplex).forEach(function (k) { cMed[k] = median(byComplex[k]); });
    var prices = flats.map(function (f) { return f.price; }).sort(function (a, b) { return a - b; });
    flats.forEach(function (f) {
      f.ppmVsComplex = cMed[f.complexId] ? f.ppm / cMed[f.complexId] : null;
      f.priceRank = prices.length > 1 ? lowerBound(prices, f.price) / (prices.length - 1) : null;
    });
    return flats;
  }

  function lowerBound(arr, v) {
    var lo = 0, hi = arr.length;
    while (lo < hi) { var m = (lo + hi) >> 1; if (arr[m] < v) lo = m + 1; else hi = m; }
    return lo;
  }

  // ---------- Типы: однотипная планировка внутри ЖК ----------
  // Картинки планов на сайте привязаны к стояку, а не к планировке, поэтому тип =
  // ЖК + комнатность + евро + площадь в пределах AREA_TOLERANCE (кластеризация, а не округление)
  var AREA_TOLERANCE = 1.5;

  function aggregate(flats) {
    var groups = {};
    flats.forEach(function (f) {
      var k = f.complexId + '|r' + f.rooms + (f.euro ? 'e' : '');
      (groups[k] = groups[k] || []).push(f);
    });
    var clusters = [];
    Object.keys(groups).forEach(function (k) {
      var list = groups[k].sort(function (a, b) { return a.area - b.area; });
      var cur = null;
      list.forEach(function (f) {
        if (!cur || f.area - cur.start > AREA_TOLERANCE) {
          cur = { key: k + '|a' + f.area.toFixed(1), start: f.area, flats: [] };
          clusters.push(cur);
        }
        cur.flats.push(f);
      });
    });
    return clusters.map(function (t) {
      var fl = t.flats;
      var med = median(fl.map(function (f) { return f.ppm; }));
      fl.forEach(function (f) { f.ppmVsType = med ? f.ppm / med : null; });
      var first = fl[0];
      t.complex = first.complex;
      t.complexId = first.complexId;
      t.rooms = first.rooms;
      t.euro = first.euro;
      t.plan = mostCommon(fl.map(function (f) { return f.plan; }).filter(Boolean));
      t.areaMin = Math.min.apply(null, fl.map(function (f) { return f.area; }));
      t.areaMax = Math.max.apply(null, fl.map(function (f) { return f.area; }));
      t.priceMin = Math.min.apply(null, fl.map(function (f) { return f.price; }));
      t.priceMax = Math.max.apply(null, fl.map(function (f) { return f.price; }));
      t.floorMin = Math.min.apply(null, fl.map(function (f) { return f.floor; }));
      t.floorMax = Math.max.apply(null, fl.map(function (f) { return f.floor; }));
      t.ppmMedian = med;
      t.mortgageMin = Math.min.apply(null, fl.map(function (f) { return f.mortgage || Infinity; }));
      if (!isFinite(t.mortgageMin)) t.mortgageMin = null;
      t.buildings = uniq(fl.map(function (f) { return f.building; }));
      t.completions = uniq(fl.map(function (f) { return f.completion; }).filter(Boolean));
      t.finishings = uniq(fl.map(function (f) { return f.finishing; }).filter(Boolean));
      t.hasLight = fl.some(function (f) { return f.light; });
      return t;
    });
  }

  function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }

  function mostCommon(a) {
    var c = {}, best = null;
    a.forEach(function (v) { c[v] = (c[v] || 0) + 1; if (best == null || c[v] > c[best]) best = v; });
    return best;
  }

  // ---------- Совпадение с запросом (процент на карточке типа) ----------
  // Каждая потребность: да = 1, нет = 0, нет данных = 0,5 (нейтрально, полнота данных не даёт бонуса).
  // needs: [{ id, weight }]
  var UNKNOWN = 0.5;

  function score(f, needs) {
    var sum = 0, total = 0, hits = [], misses = [], unknown = [];
    needs.forEach(function (n) {
      var def = NEEDS[n.id];
      if (!def || def.unavailable) return;
      var v = def.test(f);
      total += n.weight;
      if (v == null) { sum += n.weight * UNKNOWN; unknown.push(n.id); }
      else if (v) { sum += n.weight; hits.push(n.id); }
      else misses.push(n.id);
    });
    return { value: total ? sum / total : UNKNOWN, hits: hits, misses: misses, unknown: unknown };
  }

  // ---------- Выбор лучшей квартиры внутри типа ----------
  // Планировка у квартир одного типа одна, поэтому сравниваем то, чем они реально отличаются:
  // этаж, тишину, пыль, свет и цену относительно типа. Веса — под цель покупки.
  var PROFILES = {
    family:  { floor: 'mid',  w: { noise: .3,  floor: .15, light: .15, dust: .1,  price: .3,  wall: .1,  entrance: .05 } },
    parents: { floor: 'low',  w: { noise: .25, floor: .3,  light: .15, dust: .05, price: .25, wall: .1,  entrance: .1 } },
    remote:  { floor: 'high', w: { noise: .35, floor: .15, light: .15, dust: .05, price: .3,  wall: .15, entrance: .05 } },
    view:    { floor: 'high', w: { noise: .1,  floor: .35, light: .2,  dust: .05, price: .3,  wall: .05, entrance: .03 } },
    budget:  { floor: 'any',  w: { noise: .15, floor: .1,  light: .1,  dust: .05, price: .6,  wall: .05, entrance: .03 } },
    invest:  { floor: 'mid',  w: { noise: .1,  floor: .25, light: .1,  dust: .05, price: .5,  wall: .03, entrance: .03 } }
  };

  // Насколько этаж подходит цели: 1 — в оптимальном диапазоне, дальше — плавно хуже
  function floorFit(f, target) {
    if (target === 'any') return f.floor === 1 ? 0.4 : 1;
    if (target === 'low') {
      if (f.floor === 1) return 0.5;
      return f.floor <= 6 ? 1 : clamp(1 - (f.floor - 6) * 0.1, 0, 1);
    }
    var pos = f.floors > 1 ? (f.floor - 1) / (f.floors - 1) : 0.5;
    var lo = target === 'high' ? 0.65 : 0.25, hi = target === 'high' ? 1 : 0.7;
    var d = pos < lo ? lo - pos : pos > hi ? pos - hi : 0;
    var fit = clamp(1 - d * 2.5, 0, 1);
    return f.floor === 1 ? Math.min(fit, 0.3) : fit;
  }

  // Цена относительно медианы типа: на 10% дешевле → 1, на 10% дороже → 0
  function priceFit(f) {
    return f.ppmVsType == null ? UNKNOWN : clamp(0.5 - (f.ppmVsType - 1) * 5, 0, 1);
  }

  function factors(f, profile) {
    return {
      noise: f.noise.score,
      dust: f.dust.score,
      light: f.light ? f.light.score : UNKNOWN,
      floor: floorFit(f, profile.floor),
      price: priceFit(f),
      wall: f.wall ? f.wall.score : UNKNOWN,
      entrance: f.entrance ? f.entrance.score : UNKNOWN
    };
  }

  function fitScore(fx, profile) {
    var s = 0;
    Object.keys(profile.w).forEach(function (k) { s += profile.w[k] * fx[k]; });
    return s;
  }

  var FACTOR_TEXT = {
    noise: 'тише других',
    dust: 'меньше пыли',
    light: 'светлее',
    price: 'выгоднее по цене за м²',
    wall: 'тише за стеной спальни',
    entrance: 'спокойнее у входа',
    floor: { mid: 'удобный средний этаж', high: 'высокий этаж', low: 'невысоко, но не на первом', any: 'не первый этаж' }
  };

  // Почему лучшая: самые весомые преимущества перед средним по типу
  function explainBest(flats, profile) {
    if (flats.length < 2) return '';
    var best = flats[0];
    var spread = best.fit - Math.min.apply(null, flats.map(function (f) { return f.fit; }));
    if (spread < 0.03) return 'Квартиры почти одинаковы, выбрали самую выгодную по цене';
    var cheaper = flats.filter(function (f) { return f.price < best.price; }).length;
    var cheapRank = cheaper / (flats.length - 1); // 0 — самая дешёвая в типе, 1 — самая дорогая
    var avg = {};
    Object.keys(profile.w).forEach(function (k) {
      avg[k] = flats.reduce(function (s, f) { return s + f.fx[k]; }, 0) / flats.length;
    });
    var gains = Object.keys(profile.w)
      .map(function (k) { return { k: k, g: (best.fx[k] - avg[k]) * profile.w[k] }; })
      .filter(function (x) { return x.g > 0.01 && (x.k !== 'price' || cheapRank <= 0.34); })
      .sort(function (a, b) { return b.g - a.g; })
      .slice(0, 2)
      .map(function (x) { return x.k === 'floor' ? FACTOR_TEXT.floor[profile.floor] : FACTOR_TEXT[x.k]; });
    var text = gains.length ? 'Лучшее сочетание под вашу цель: ' + gains.join(' и ') : 'Лучшее сочетание этажа, тишины и цены';
    if (!cheaper) return text;
    var m10 = cheaper % 10, m100 = cheaper % 100;
    var word = m10 === 1 && m100 !== 11 ? 'квартира' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'квартиры' : 'квартир';
    return text + '. ' + (cheaper === 1
      ? 'Есть одна квартира дешевле, но она уступает по этим параметрам'
      : 'Есть ' + cheaper + ' ' + word + ' дешевле, но они уступают по этим параметрам');
  }

  /*
   * query: { rooms, areaMin, budget, needs: [id…] в порядке важности, extraNeed: id срока переезда, profile }
   * Вес: первые три потребности ×2, остальные ×1; срок переезда — отдельно ×2 и никого не сдвигает.
   */
  function rank(types, query) {
    var needs = query.needs.map(function (id, i) { return { id: id, weight: i < 3 ? 2 : 1 }; });
    if (query.extraNeed && query.needs.indexOf(query.extraNeed) < 0) needs.push({ id: query.extraNeed, weight: 2 });
    var profile = PROFILES[query.profile] || PROFILES.family;
    var out = [];
    types.forEach(function (t) {
      var fl = t.flats.filter(function (f) {
        if (query.rooms && query.rooms.indexOf(Math.min(f.rooms, 5)) < 0) return false;
        if (query.areaMin && f.area < query.areaMin) return false;
        if (query.budget && f.price > query.budget) return false;
        if (query.budgetFrom && f.price < query.budgetFrom) return false;
        return true;
      });
      if (!fl.length) return;
      fl.forEach(function (f) {
        f.match = score(f, needs);
        f.fx = factors(f, profile);
        f.fit = fitScore(f.fx, profile);
        // Внутри типа: совпадение с запросом (шаг 5%), затем факторы квартиры (шаг 0,02 —
        // меньшая разница незаметна для человека), при равенстве решает цена
        f.rankKey = Math.round(f.match.value * 20) * 100 + Math.round(f.fit * 50);
      });
      fl.sort(function (a, b) { return b.rankKey - a.rankKey || a.price - b.price; });
      out.push({ type: t, flats: fl, best: fl[0], value: fl[0].match.value, why: explainBest(fl, profile) });
    });
    // Типы: совпадение (шаг 5%), затем больше выбора, затем дешевле
    function bucket(v) { return Math.round(v * 20); }
    return out.sort(function (a, b) {
      return bucket(b.value) - bucket(a.value) || b.flats.length - a.flats.length || a.best.price - b.best.price;
    });
  }

  window.LMPodborModel = {
    DEFAULTS: DEFAULTS, NEEDS: NEEDS, GOALS: GOALS, MOVE: MOVE, FINISHING: FINISHING, DIRS: DIRS,
    noise: noise, dust: dust, light: light, prepare: prepare, aggregate: aggregate, rank: rank, median: median, PROFILES: PROFILES
  };
})();

/*
 * lm-podbor — разметка стояков (секция + ось) по планам этажей, 2026-10-15.
 *  facades — сколько сторон с окнами (1 — окна на одну сторону, 2+ — угловая);
 *  wall    — что за стеной спальни: outer | neighbor_bedroom | neighbor_living | corridor | stair | lift;
 *  near    — сколько чужих входных дверей рядом на площадке; opp — дверь напротив соседа;
 *  dirs    — стороны света окон (только где известен азимут севера на плане).
 * Двор или улица и расстояние до дороги по планам секций не определяются — остаются допущения model.js.
 * Как размечено и где не размечено — blocks/lm-podbor/notes.md.
 */
window.LM_PODBOR_STACKS = window.LM_PODBOR_STACKS || {};
window.LM_PODBOR_STACKS['ohqmp.dev-lite.ru'] = {
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:1": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living",
  "dirs": [
   "north"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:2": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "neighbor_bedroom",
  "dirs": [
   "east",
   "north"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:3": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom",
  "dirs": [
   "south",
   "east"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:4": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living",
  "dirs": [
   "south"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:5": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom",
  "dirs": [
   "south"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:6": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer",
  "dirs": [
   "south",
   "west"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:7": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer",
  "dirs": [
   "west",
   "north"
  ]
 },
 "00ce8a46-0b3c-4dd1-b3a2-ab392c99d001:8": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living",
  "dirs": [
   "north"
  ]
 },
 "9957db46-65d0-4fba-b483-37da7d729845:1": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:2": {
  "facades": 1,
  "near": 3,
  "opp": false,
  "wall": "outer"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:3": {
  "facades": 2,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:4": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:5": {
  "facades": 1,
  "near": 2,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:6": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:7": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:8": {
  "facades": 1,
  "near": 3,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:9": {
  "facades": 2,
  "near": 3,
  "opp": false,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:10": {
  "facades": 1,
  "near": 3,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:11": {
  "facades": 2,
  "near": 3,
  "opp": true,
  "wall": "neighbor_living"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:12": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "9957db46-65d0-4fba-b483-37da7d729845:13": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:1": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "outer"
 },
 "561b8838-1126-4685-82ec-59113bae3833:2": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:3": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "561b8838-1126-4685-82ec-59113bae3833:4": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "561b8838-1126-4685-82ec-59113bae3833:5": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:6": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "561b8838-1126-4685-82ec-59113bae3833:7": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "561b8838-1126-4685-82ec-59113bae3833:8": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "outer"
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:1": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:2": {
  "facades": 1,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:3": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:4": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:5": {
  "facades": 1,
  "near": 2,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:6": {
  "facades": 1,
  "near": 2,
  "opp": false
 },
 "6b903d16-d1ba-49e8-b41a-0bdd9dec77b5:7": {
  "facades": 2,
  "near": 1,
  "opp": false
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:1": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:2": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_living"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:3": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_living"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:4": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:5": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "corridor"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:6": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "3cce9ecc-d8d3-40a4-9f17-39d8813e17be:7": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:1": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:2": {
  "facades": 2,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:3": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:4": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:5": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:6": {
  "facades": 2,
  "near": 1,
  "opp": false,
  "wall": "neighbor_living"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:7": {
  "facades": 1,
  "near": 2,
  "opp": true,
  "wall": "outer"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:8": {
  "facades": 1,
  "near": 1,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "c031aae6-29d8-4e9d-9059-7f8e99f88600:9": {
  "facades": 1,
  "near": 2,
  "opp": true,
  "wall": "neighbor_bedroom"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:1": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:2": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:5": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:6": {
  "facades": 1,
  "near": 2,
  "opp": false,
  "wall": "neighbor_bedroom"
 },
 "7093215f-bcb3-4f97-80fe-354ecb0e9c51:7": {
  "facades": 2,
  "near": 1,
  "opp": true,
  "wall": "outer"
 },
 "b42cb203-60e9-446a-973a-66a44f3a26c7:2": {
  "facades": 2,
  "near": 2,
  "opp": false,
  "wall": "outer"
 },
 "b42cb203-60e9-446a-973a-66a44f3a26c7:4": {
  "facades": 2,
  "near": 2,
  "opp": false,
  "wall": "neighbor_living"
 },
 "b42cb203-60e9-446a-973a-66a44f3a26c7:10": {
  "facades": 1,
  "near": 1,
  "opp": false,
  "wall": "neighbor_bedroom"
 }
};

/*
 * lm-podbor — «Подбор квартиры под вашу жизнь»: цель покупки → кто будет жить → что важно → типы квартир
 * → сравнение квартир внутри типа (этаж, тишина, пыль, свет, цена).
 *
 * Монтируется в HTML-блок страницы /podbor: во вкладке HTML блока — <div class="lm-podbor"></div>.
 * Данные — открытые API каталога сайта; модель (пресеты, факторы, агрегация) — model.js.
 * Элементы повторяют фильтр каталога сайта: кнопки-опции, подписи полей, диапазон, карточки.
 */
window.LiteMods && LiteMods.register('lm-podbor', function (root, ctx) {
  if (root.classList.contains('lmp-portal')) return; // это наша же обёртка панели в <body>
  var M = window.LMPodborModel;
  var nuxt = window.$nuxt;
  if (!M || !nuxt) return ctx.log('нет модели или Nuxt');

  var site = nuxt.$store.state.site || {};
  var projectId = site.project && site.project.id;
  var PAGE = 8;       // типов на странице
  var ROWS = 5;       // квартир прямо в карточке типа

  // ---------- форматирование ----------
  function num(n) { return Math.round(n).toLocaleString('ru-RU'); }
  function rub(n) { return num(n) + ' ₽'; }
  function mlnValue(n) {
    var v = n / 1e6;
    return (v >= 10 ? v.toFixed(1) : v.toFixed(2)).replace(/\.?0+$/, '').replace('.', ',');
  }
  function mln(n) { return mlnValue(n) + ' млн ₽'; }
  function dec(x) { return String(Math.round(x * 10) / 10).replace('.', ','); }
  function area(a, b) { return (b == null || Math.abs(b - a) < 0.1 ? dec(a) : dec(a) + '–' + dec(b)) + ' м²'; }
  function priceRange(a, b) { return a === b ? mln(a) : mlnValue(a) + '–' + mln(b); }
  function roomsLabel(r, euro) { return r === 0 ? 'Студия' : r + '-комн.' + (euro ? ' евро' : ''); }
  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    return n + ' ' + (m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many);
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function img(path) {
    if (!path) return '';
    try { if (nuxt.$static && nuxt.$static.gen) return nuxt.$static.gen(path); } catch (e) { /* fallback */ }
    return 'https://cdn.idalite.ru/s/' + path.replace(/^\//, '');
  }
  var flatPaths = {};
  (site.pages || []).forEach(function (p) {
    if (p.type === 'flat_detail' && p.complex_id) flatPaths[p.complex_id] = p.path.replace('*', '');
  });
  function flatUrl(f) { return flatPaths[f.complexId] ? flatPaths[f.complexId] + f.id : null; }

  // Штатная заглушка платформы для квартиры без плана (ClassicPlanNew__state)
  var PLAN_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M6.6 17.6l2.8 2.8 1.9-1.9-2.8-2.8 2.8-2.8 3.8 3.8 1.9-1.9-3.8-3.8L16 8.2l2.8 2.8 1.9-1.9-2.8-2.8 3.8-3.8a1.3 1.3 0 0 1 1.9 0l6.6 6.6a1.3 1.3 0 0 1 0 1.9L10.1 30.1a1.3 1.3 0 0 1-1.9 0l-6.6-6.6a1.3 1.3 0 0 1 0-1.9z"/></svg>';
  function planHtml(path, big) {
    if (path) return '<img src="' + esc(img(path)) + '" alt="Планировка" loading="lazy" decoding="async">';
    return '<span class="lmp__plan-state' + (big ? '' : ' is-small') + '">' + PLAN_ICON + '<span>Готовим планировку</span></span>';
  }

  // ---------- загрузка данных ----------
  function getJson(url) {
    return fetch(url, { credentials: 'same-origin', headers: { 'x-host': location.host } }).then(function (r) {
      if (!r.ok) throw new Error(url + ' ' + r.status);
      return r.json();
    });
  }

  function loadFlats() {
    var all = [];
    function page(offset) {
      var q = new URLSearchParams({ project_id: projectId, offer_type: 'sale', limit: '100', offset: String(offset) });
      return getJson('/api/realty-filter/residential/real-estates?' + q).then(function (list) {
        if (!Array.isArray(list)) return all;
        all = all.concat(list);
        return list.length === 100 && offset < 5000 ? page(offset + 100) : all;
      });
    }
    return page(0);
  }

  // Этажность секции: из списка этажей (включая распроданные), иначе по квартирам
  function loadSectionFloors(complexIds) {
    var map = {};
    return Promise.all(complexIds.map(function (cx) {
      var q = new URLSearchParams({ project_id: projectId, complex_id: cx });
      return getJson('/api/realty-filter/residential/sections?' + q).then(function (list) {
        (list || []).forEach(function (s) {
          var max = 0;
          (s.floors || []).forEach(function (fl) { var n = parseInt(fl.floor_number, 10); if (n > max) max = n; });
          if (s.total_floors) max = Math.max(max, s.total_floors);
          if (max) map[s.section_id] = max;
        });
      }).catch(function () { /* нет секций — посчитаем по квартирам */ });
    })).then(function () { return map; });
  }

  // ---------- состояние ----------
  var types = [];
  var priceMin = 0, priceMax = 0;
  function freshState() {
    return { step: 1, goal: null, sub: null, needs: [], move: null, budgetFrom: null, budgetTo: null, sort: 'match', shown: PAGE };
  }
  var state = readHash() || freshState();

  function goal() { return M.GOALS.filter(function (g) { return g.id === state.goal; })[0]; }
  function sub() { var g = goal(); return g && g.subs.filter(function (s) { return s.id === state.sub; })[0]; }

  function query() {
    var s = sub() || {};
    var mv = M.MOVE.filter(function (m) { return m.id === state.move; })[0];
    return {
      rooms: s.rooms, areaMin: s.areaMin, budget: state.budgetTo, budgetFrom: state.budgetFrom,
      needs: state.needs.slice(), extraNeed: mv && mv.need, profile: s.profile
    };
  }

  function ranked() {
    var list = M.rank(types, query());
    if (state.sort === 'price') list.sort(function (a, b) { return a.best.price - b.best.price; });
    return list;
  }

  function writeHash() {
    var h = [state.goal, state.sub, state.needs.join('.'), state.move || '', state.budgetFrom || '', state.budgetTo || ''].join('~');
    try { history.replaceState(null, '', '#podbor=' + encodeURIComponent(h)); } catch (e) { /* ignore */ }
  }
  function readHash() {
    var m = /#podbor=([^&]+)/.exec(location.hash);
    if (!m) return null;
    var p = decodeURIComponent(m[1]).split('~');
    if (!p[0] || !p[1]) return null;
    var s = freshState();
    s.step = 4; s.goal = p[0]; s.sub = p[1];
    s.needs = p[2] ? p[2].split('.') : [];
    s.move = p[3] || null;
    s.budgetFrom = p[4] ? +p[4] : null;
    s.budgetTo = p[5] ? +p[5] : null;
    return s;
  }

  // ---------- каркас: как у штатных блоков (обёртка → контейнер → шапка «заголовок | текст») ----------
  root.innerHTML =
    '<div class="lmp">' +
      '<div class="lmp__container">' +
        '<header class="lmp__head">' +
          '<h2 class="lmp__title">Квартира под вашу жизнь</h2>' +
          '<p class="lmp__lead">Расскажите, для кого покупаете. Покажем подходящие планировки и объясним, чем отличаются квартиры одного типа.</p>' +
        '</header>' +
        '<ol class="lmp__steps" data-el="steps"><li>Цель</li><li>Кто будет жить</li><li>Что важно</li><li>Квартиры</li></ol>' +
        '<div class="lmp__view" data-el="view"><p class="lmp__loading">Загружаем квартиры</p></div>' +
      '</div>' +
      '<div class="lmp__band" data-el="band" hidden><div class="lmp__container" data-el="list"></div></div>' +
    '</div>' +
    '<div class="lmp__drawer" data-el="drawer" hidden><div class="lmp__drawer-backdrop" data-act="close"></div>' +
      '<aside class="lmp__drawer-panel" role="dialog" aria-modal="true" tabindex="-1" data-el="panel"></aside></div>';

  var view = root.querySelector('[data-el=view]');
  var stepsEl = root.querySelector('[data-el=steps]');
  var band = root.querySelector('[data-el=band]');
  var listEl = root.querySelector('[data-el=list]');
  var drawer = root.querySelector('[data-el=drawer]');
  var panel = root.querySelector('[data-el=panel]');

  // Панель сравнения — в <body>: внутри блока она оказывается под липкой шапкой сайта.
  // Обёртка с классом lm-podbor сохраняет стили, переменные темы копируем с блока.
  var portal = document.createElement('div');
  portal.className = 'lm-podbor lmp-portal';
  var cs = getComputedStyle(root);
  ['--ui-main-color', '--ui-main-color-64', '--ui-main-color-12', '--ui-main-color-8', '--ui-main-color-4',
    '--ui-font-black-color', '--ui-font-black-color-64', '--ui-font-black-color-48', '--ui-font-black-color-12',
    '--ui-font-black-color-8', '--ui-font-black-color-4', '--ui-font-white-color', '--ui-base-white-color',
    '--ui-base-black-color', '--ui-base-black-color-80', '--ui-base-black-color-48', '--ui-base-black-color-12',
    '--ui-base-black-color-4', '--ui-title-font-family', '--ui-main-font-family', '--ui-unit', '--ui-col'
  ].forEach(function (v) { var val = cs.getPropertyValue(v); if (val) portal.style.setProperty(v, val.trim()); });
  portal.appendChild(drawer);
  document.body.appendChild(portal);

  loadFlats().then(function (raw) {
    var cx = raw.map(function (f) { return f.complex_id; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; });
    return loadSectionFloors(cx).then(function (floors) {
      var flats = M.prepare(raw, floors, (window.LM_PODBOR_STACKS || {})[location.hostname]);
      types = M.aggregate(flats);
      var prices = flats.map(function (f) { return f.price; });
      priceMin = Math.floor(Math.min.apply(null, prices) / 1e5) * 1e5;
      priceMax = Math.ceil(Math.max.apply(null, prices) / 1e5) * 1e5;
      render();
    });
  }).catch(function (e) {
    view.innerHTML = '<p class="lmp__loading">Не удалось загрузить квартиры. Обновите страницу.</p>';
    ctx.log(e.message);
  });

  // ---------- шаги ----------
  function render() {
    [].forEach.call(stepsEl.children, function (li, i) {
      li.classList.toggle('is-done', i + 1 < state.step);
      li.classList.toggle('is-current', i + 1 === state.step);
    });
    band.hidden = state.step !== 4;
    if (state.step === 1) renderGoals();
    else if (state.step === 2) renderSubs();
    else if (state.step === 3) renderNeeds();
    else { renderQuery(); renderList(false); }
    if (state.step >= 3) writeHash();
  }

  function card(act, value, title, text, selected) {
    return '<button type="button" class="lmp__card' + (selected ? ' is-selected' : '') + '" data-act="' + act + '" data-value="' + esc(value) + '">' +
      '<span class="lmp__card-title">' + esc(title) + '</span>' +
      '<span class="lmp__card-text">' + esc(text) + '</span>' +
      '<span class="lmp__card-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>';
  }

  function back(step, text) {
    return '<button type="button" class="lmp__back" data-act="step" data-value="' + step + '">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6m5-5-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' + esc(text) + '</button>';
  }

  function renderGoals() {
    view.innerHTML = '<h3 class="lmp__q">Для чего покупаете?</h3><div class="lmp__cards lmp__cards--4">' +
      M.GOALS.map(function (g) { return card('goal', g.id, g.title, g.text, g.id === state.goal); }).join('') + '</div>';
  }

  function renderSubs() {
    var g = goal();
    view.innerHTML = back(1, g.title) +
      '<h3 class="lmp__q">' + (g.id === 'invest' ? 'Какая стратегия?' : g.id === 'single' ? 'Что для вас главное?' : 'Кто будет жить?') + '</h3>' +
      '<div class="lmp__cards lmp__cards--' + (g.subs.length > 3 ? 4 : 3) + '">' +
      g.subs.map(function (s) { return card('sub', s.id, s.title, s.text, s.id === state.sub); }).join('') + '</div>';
  }

  // Кнопка-опция как в фильтре каталога (ButtonList): фон main-4, выбранная — base-black
  function option(act, value, label, on, extraCls) {
    return '<button type="button" class="lmp__opt' + (on ? ' is-active' : '') + (extraCls ? ' ' + extraCls : '') + '" data-act="' + act + '" data-value="' + esc(value) + '" aria-pressed="' + !!on + '">' + esc(label) + '</button>';
  }

  function needOption(id) {
    var n = M.NEEDS[id];
    if (n.unavailable) return '';
    return option('need', id, n.label, state.needs.indexOf(id) >= 0);
  }

  function renderNeeds() {
    var g = goal(), s = sub();
    var preset = s.needs;
    var others = Object.keys(M.NEEDS).filter(function (id) { return preset.indexOf(id) < 0 && !M.NEEDS[id].unavailable; });
    view.innerHTML =
      back(2, g.title + ', ' + s.title.toLowerCase()) +
      '<h3 class="lmp__q">Что для вас важно?</h3>' +
      '<div class="lmp__field">' +
        '<span class="lmp__label">Отметили типичное для вашего выбора. Первые три учитываем сильнее</span>' +
        '<div class="lmp__opts">' + preset.map(needOption).join('') + '</div>' +
      '</div>' +
      '<details class="lmp__more"><summary>Ещё критерии</summary><div class="lmp__opts">' + others.map(needOption).join('') + '</div></details>' +
      '<div class="lmp__row">' +
        (g.id === 'invest' ? '' :
          '<div class="lmp__field"><span class="lmp__label">Когда планируете переезд</span><div class="lmp__opts lmp__opts--joined">' +
          M.MOVE.map(function (m) { return option('move', m.id, m.title, state.move === m.id); }).join('') + '</div></div>') +
        '<div class="lmp__field lmp__field--range"><span class="lmp__label">Стоимость, ₽</span>' + rangeHtml() + '</div>' +
      '</div>' +
      '<div class="lmp__actions"><button type="button" class="lmp__btn" data-act="step" data-value="4" data-el="go">' + goLabel(ranked()) + '</button></div>';
    syncRange();
  }

  // Диапазон как «Стоимость, руб» в фильтре каталога: поле 48px, «от | до», линия 2px с ручками 12px
  function rangeHtml() {
    var from = state.budgetFrom || priceMin, to = state.budgetTo || priceMax;
    return '<div class="lmp__range">' +
      '<span class="lmp__range-value" data-el="from">' + num(from) + '</span>' +
      '<span class="lmp__range-value" data-el="to">' + num(to) + '</span>' +
      '<div class="lmp__range-track"><i data-el="fill"></i>' +
        '<input type="range" data-act="from" aria-label="Стоимость от" min="' + priceMin + '" max="' + priceMax + '" step="100000" value="' + from + '">' +
        '<input type="range" data-act="to" aria-label="Стоимость до" min="' + priceMin + '" max="' + priceMax + '" step="100000" value="' + to + '">' +
      '</div></div>';
  }

  function syncRange() {
    var f = root.querySelector('[data-act=from]'), t = root.querySelector('[data-act=to]');
    if (!f) return;
    var a = +f.value, b = +t.value, span = priceMax - priceMin || 1;
    var fill = root.querySelector('[data-el=fill]');
    fill.style.left = ((a - priceMin) / span * 100) + '%';
    fill.style.right = (100 - (b - priceMin) / span * 100) + '%';
    root.querySelector('[data-el=from]').textContent = num(a);
    root.querySelector('[data-el=to]').textContent = num(b);
  }

  function goLabel(list) {
    var n = list.reduce(function (s, r) { return s + r.flats.length; }, 0);
    return list.length
      ? 'Показать ' + plural(list.length, 'планировку', 'планировки', 'планировок') + ', ' + plural(n, 'квартира', 'квартиры', 'квартир')
      : 'Нет подходящих квартир. Ослабьте условия';
  }

  // ---------- результаты ----------
  // Запрос сверху строкой опций, как фильтр каталога
  function renderQuery() {
    var g = goal(), s = sub();
    if (!g || !s) { state.step = 1; return render(); }
    view.innerHTML =
      '<div class="lmp__query">' +
        '<div class="lmp__query-head">' +
          '<p class="lmp__query-goal">' + esc(g.title) + ', ' + esc(s.title.toLowerCase()) + '</p>' +
          '<div class="lmp__query-links">' +
            '<button type="button" class="lmp__link" data-act="step" data-value="3">Изменить критерии</button>' +
            '<button type="button" class="lmp__link" data-act="restart">Начать заново</button>' +
          '</div>' +
        '</div>' +
        '<div class="lmp__field"><span class="lmp__label">Что важно</span><div class="lmp__opts lmp__opts--scroll">' +
          s.needs.concat(state.needs.filter(function (id) { return s.needs.indexOf(id) < 0; })).map(needOption).join('') +
        '</div></div>' +
      '</div>';
  }

  function renderList(animate) {
    var list = ranked();
    var total = list.reduce(function (sum, r) { return sum + r.flats.length; }, 0);
    var html =
      '<div class="lmp__list-head">' +
        '<p class="lmp__count">' + (list.length
          ? 'Найдено ' + plural(list.length, 'планировка', 'планировки', 'планировок') + ', ' + plural(total, 'квартира', 'квартиры', 'квартир')
          : 'Под эти условия квартир нет. Уберите пару критериев или расширьте бюджет') + '</p>' +
        '<div class="lmp__sort"><span class="lmp__label">Сортировать</span>' +
          '<button type="button" class="lmp__sort-btn' + (state.sort === 'match' ? ' is-active' : '') + '" data-act="sort" data-value="match">По совпадению</button>' +
          '<button type="button" class="lmp__sort-btn' + (state.sort === 'price' ? ' is-active' : '') + '" data-act="sort" data-value="price">Сначала дешевле</button>' +
        '</div>' +
      '</div>' +
      '<div class="lmp__types">' + list.slice(0, state.shown).map(typeCard).join('') + '</div>' +
      (list.length > state.shown ? '<button type="button" class="lmp__btn lmp__btn--light lmp__more-btn" data-act="more">Показать ещё ' + Math.min(PAGE, list.length - state.shown) + '</button>' : '');
    lastRanked = list;
    swap(listEl, html, animate);
  }

  // Плавная смена выдачи: старое гаснет, новое проявляется каскадом
  var swapTimer;
  function swap(el, html, animate) {
    clearTimeout(swapTimer);
    if (!animate || ctx.reducedMotion) { el.innerHTML = html; el.classList.remove('is-leaving'); return; }
    var h = el.offsetHeight;
    el.style.minHeight = h + 'px';
    el.classList.add('is-leaving');
    swapTimer = setTimeout(function () {
      el.innerHTML = html;
      el.classList.remove('is-leaving');
      el.classList.add('is-entering');
      void el.offsetWidth;
      el.classList.remove('is-entering');
      setTimeout(function () { el.style.minHeight = ''; }, 500);
    }, 180);
  }

  var lastRanked = [];

  function typeCard(r, i) {
    var t = r.type, best = r.best;
    var hits = best.match.hits.slice(0, 4), misses = best.match.misses.slice(0, 3);
    var aMin = Math.min.apply(null, r.flats.map(function (f) { return f.area; }));
    var aMax = Math.max.apply(null, r.flats.map(function (f) { return f.area; }));
    var pMin = Math.min.apply(null, r.flats.map(function (f) { return f.price; }));
    var pMax = Math.max.apply(null, r.flats.map(function (f) { return f.price; }));
    var rest = r.flats.length - Math.min(ROWS, r.flats.length);
    return '<article class="lmp__type" style="--i:' + (i % PAGE) + '">' +
      '<div class="lmp__type-main">' +
        '<div class="lmp__type-head">' +
          '<div><h4 class="lmp__type-title">' + esc(roomsLabel(t.rooms, t.euro)) + ', ' + area(aMin, aMax) + '</h4>' +
          '<p class="lmp__type-price">' + priceRange(pMin, pMax) + '</p>' +
          '<p class="lmp__type-meta"><span>' + esc(t.complex) + '</span>' + (t.mortgageMin ? '<span>от ' + rub(t.mortgageMin) + '/мес</span>' : '') + '</p></div>' +
          '<span class="lmp__match" title="Насколько планировка подходит под ваш запрос">' + Math.round(r.value * 100) + '%</span>' +
        '</div>' +
        '<div class="lmp__type-plan">' + planHtml(t.plan, true) + '</div>' +
        (hits.length || misses.length ? '<div class="lmp__type-tags">' +
          hits.map(function (id) { return '<span class="lmp__tag is-yes">' + esc(M.NEEDS[id].label) + '</span>'; }).join('') +
          misses.map(function (id) { return '<span class="lmp__tag">' + esc(M.NEEDS[id].compromise) + '</span>'; }).join('') +
        '</div>' : '') +
      '</div>' +
      '<div class="lmp__type-side">' +
        '<p class="lmp__side-title">' + plural(r.flats.length, 'квартира', 'квартиры', 'квартир') + ' этого типа</p>' +
        '<ol class="lmp__rows">' + r.flats.slice(0, ROWS).map(function (f, k) { return flatLine(f, k === 0); }).join('') + '</ol>' +
        (r.why ? '<p class="lmp__why">' + esc(r.why) + '</p>' : '') +
        '<button type="button" class="lmp__btn lmp__side-btn" data-act="open" data-value="' + i + '">' +
          (rest > 0 ? 'Сравнить все ' + r.flats.length : 'Сравнить квартиры') + '</button>' +
      '</div>' +
    '</article>';
  }

  function buildingLabel(b) {
    b = String(b || '').trim();
    return /^\d+[а-яa-z]?$/i.test(b) ? 'корп. ' + b : b;
  }

  // Строка квартиры в карточке типа, как у Арбана: корпус, этаж, площадь, цена, ₽/м², сдача
  function flatLine(f, isBest) {
    var url = flatUrl(f);
    var tag = url ? 'a' : 'div';
    return '<li><' + tag + ' class="lmp__line' + (isBest ? ' is-best' : '') + '"' + (url ? ' href="' + esc(url) + '"' : '') + '>' +
      '<span class="lmp__line-b" title="' + esc(f.building) + '">' + esc(buildingLabel(f.building)) + '</span>' +
      '<span>' + f.floor + ' эт.</span>' +
      '<span>' + dec(f.area) + ' м²</span>' +
      '<span class="lmp__line-price">' + rub(f.price) + '</span>' +
      '<span class="lmp__line-ppm">' + num(f.ppm) + ' ₽/м²</span>' +
      '<span class="lmp__line-c">' + esc(f.completion || '') + '</span>' +
      (isBest ? '<em class="lmp__line-best">Лучшая</em>' : '') +
    '</' + tag + '></li>';
  }

  // ---------- сравнение внутри типа ----------
  function openType(r) {
    var t = r.type;
    var med = M.median(r.flats.map(function (f) { return f.price; }));
    var anyLight = r.flats.some(function (f) { return f.light; });
    var anyWall = r.flats.some(function (f) { return f.wall; });
    var anyEntrance = r.flats.some(function (f) { return f.entrance; });
    var aMin = Math.min.apply(null, r.flats.map(function (f) { return f.area; }));
    var aMax = Math.max.apply(null, r.flats.map(function (f) { return f.area; }));
    var pMin = Math.min.apply(null, r.flats.map(function (f) { return f.price; }));
    var pMax = Math.max.apply(null, r.flats.map(function (f) { return f.price; }));
    panel.innerHTML =
      '<button type="button" class="lmp__close" data-act="close" aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>' +
      '<div class="lmp__panel-head">' +
        '<div class="lmp__panel-plan">' + planHtml(t.plan, false) + '</div>' +
        '<div><h3>' + esc(roomsLabel(t.rooms, t.euro)) + ', ' + area(aMin, aMax) + '</h3>' +
        '<p class="lmp__type-price">' + priceRange(pMin, pMax) + '</p>' +
        '<p class="lmp__type-meta"><span>' + esc(t.complex) + '</span></p></div>' +
      '</div>' +
      '<p class="lmp__panel-lead">Планировка та же, а квартиры разные. Сравнили этаж, тишину, пыль' + (anyLight ? ', свет' : '') + (anyWall ? ', соседей за стеной спальни' : '') + (anyEntrance ? ', вход' : '') + ' и цену под ваш запрос.</p>' +
      '<ol class="lmp__flats">' + r.flats.map(function (f, i) { return flatRow(f, i === 0, r.best, med, { light: anyLight, wall: anyWall, entrance: anyEntrance }, i === 0 ? r.why : ''); }).join('') + '</ol>';
    drawer.hidden = false;
    document.documentElement.classList.add('lmp-lock');
    panel.scrollTop = 0;
    panel.focus({ preventScroll: true });
  }

  function bar(score) {
    return '<span class="lmp__bar"><i style="width:' + Math.round(score * 100) + '%"></i></span>';
  }

  function flatRow(f, isBest, best, med, show, why) {
    var url = flatUrl(f);
    var diff = isBest ? '' : diffText(f, best);
    var dp = med ? Math.round((f.price / med - 1) * 100) : 0;
    var pos = { low: 'нижняя часть дома', mid: 'середина дома', high: 'верхняя часть дома' }[f.floorPos];
    return '<li class="lmp__flat' + (isBest ? ' is-best' : '') + '">' +
      '<div class="lmp__flat-main">' +
        (isBest ? '<span class="lmp__badge">Лучшая для вас</span>' + (why ? '<p class="lmp__why">' + esc(why) + '</p>' : '') : '') +
        '<p class="lmp__flat-floor">' + f.floor + ' этаж из ' + f.floors + '</p>' +
        '<p class="lmp__flat-meta">' + pos + '</p>' +
        '<p class="lmp__flat-meta">Кв. ' + esc(f.number) + ', ' + esc(buildingLabel(f.building)) + ', ' + area(f.area) + '</p>' +
        (diff ? '<p class="lmp__flat-diff">' + diff + '</p>' : '') +
      '</div>' +
      '<dl class="lmp__factors">' +
        '<div><dt>Тишина</dt><dd>' + f.noise.label + bar(f.noise.score) + '</dd></div>' +
        '<div><dt>Пыль</dt><dd>' + f.dust.label + bar(f.dust.score) + '</dd></div>' +
        (show.light ? '<div><dt>Свет</dt><dd>' + (f.light ? f.light.label + bar(f.light.score) : 'Не указано') + '</dd></div>' : '') +
        (show.wall ? '<div><dt>За стеной спальни</dt><dd>' + (f.wall ? f.wall.label + bar(f.wall.score) : 'Не указано') + '</dd></div>' : '') +
        (show.entrance ? '<div><dt>Вход</dt><dd>' + (f.entrance ? f.entrance.label + bar(f.entrance.score) : 'Не указано') + '</dd></div>' : '') +
        '<div><dt>Отделка</dt><dd>' + esc(f.finishing ? f.finishing.charAt(0).toUpperCase() + f.finishing.slice(1) : 'Не указано') + '</dd></div>' +
        (f.completion ? '<div><dt>Сдача</dt><dd>' + esc(f.completion) + '</dd></div>' : '') +
      '</dl>' +
      '<div class="lmp__flat-price"><b>' + rub(f.price) + '</b>' +
        '<small>' + num(f.ppm) + ' ₽/м²</small>' +
        (dp ? '<small>' + (dp > 0 ? 'дороже' : 'дешевле') + ' среднего по типу на ' + Math.abs(dp) + '%</small>' : '') +
        (url ? '<a class="lmp__btn lmp__btn--small" href="' + esc(url) + '">Открыть</a>' : '') +
      '</div></li>';
  }

  // Чем квартира отличается от лучшей: самые заметные различия
  function diffText(f, best) {
    var out = [];
    var df = f.floor - best.floor;
    if (df) out.push((df > 0 ? 'выше' : 'ниже') + ' на ' + plural(Math.abs(df), 'этаж', 'этажа', 'этажей'));
    if (f.noise.label !== best.noise.label) out.push(f.noise.score > best.noise.score ? 'тише' : 'шумнее');
    if (f.dust.label !== best.dust.label) out.push(f.dust.score > best.dust.score ? 'меньше пыли' : 'больше пыли');
    if (f.wall && best.wall && f.wall.label !== best.wall.label) out.push(f.wall.score > best.wall.score ? 'тише за стеной спальни' : 'шумнее за стеной спальни');
    if (f.light && best.light && f.light.label !== best.light.label) out.push(f.light.score > best.light.score ? 'светлее' : 'темнее');
    if (f.finishGrade != null && best.finishGrade != null && f.finishGrade !== best.finishGrade) out.push(f.finishGrade > best.finishGrade ? 'отделка лучше' : 'отделка проще');
    var dp = f.price - best.price;
    if (Math.abs(dp) >= 50000) out.push(dp < 0 ? '<b class="is-good">дешевле на ' + rub(-dp) + '</b>' : 'дороже на ' + rub(dp));
    return out.length ? 'В сравнении с лучшей: ' + out.join(', ') : '';
  }

  function closeDrawer() {
    drawer.hidden = true;
    document.documentElement.classList.remove('lmp-lock');
  }

  // ---------- события ----------
  function scrollToTop(el) {
    var top = el.getBoundingClientRect().top + window.scrollY - 100;
    if (window.scrollY > top) window.scrollTo({ top: top, behavior: ctx.reducedMotion ? 'auto' : 'smooth' });
  }

  function onClick(e) {
    var el = e.target.closest('[data-act]');
    if (!el || !(root.contains(el) || portal.contains(el))) return;
    var act = el.getAttribute('data-act'), v = el.getAttribute('data-value');
    if (act === 'from' || act === 'to') return;

    if (act === 'need') {
      var i = state.needs.indexOf(v);
      if (i >= 0) state.needs.splice(i, 1); else state.needs.push(v);
      // Порядок = вес (первые три важнее): критерии пресета держим в его порядке, добавленные — следом
      var preset = (sub() || {}).needs || [];
      state.needs = preset.filter(function (id) { return state.needs.indexOf(id) >= 0; })
        .concat(state.needs.filter(function (id) { return preset.indexOf(id) < 0; }));
      [].forEach.call(root.querySelectorAll('[data-act=need][data-value="' + v + '"]'), function (b) {
        b.classList.toggle('is-active', i < 0);
        b.setAttribute('aria-pressed', i < 0);
      });
      writeHash();
      if (state.step === 3) updateGo(); else { state.shown = PAGE; renderList(true); }
      return;
    }
    if (act === 'sort') {
      state.sort = v;
      [].forEach.call(root.querySelectorAll('[data-act=sort]'), function (b) { b.classList.toggle('is-active', b === el); });
      renderList(true);
      return;
    }
    if (act === 'more') { state.shown += PAGE; renderList(false); return; }
    if (act === 'open') { openType(lastRanked[+v]); return; }
    if (act === 'close') { closeDrawer(); return; }

    if (act === 'goal') { state.goal = v; state.sub = null; state.step = 2; }
    else if (act === 'sub') {
      state.sub = v; state.step = 3;
      state.needs = sub().needs.slice();
      if (goal().id === 'invest') state.move = null;
    }
    else if (act === 'move') {
      state.move = state.move === v ? null : v;
      [].forEach.call(root.querySelectorAll('[data-act=move]'), function (b) {
        var on = b.getAttribute('data-value') === state.move;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on);
      });
      updateGo();
      return;
    }
    else if (act === 'step') { state.step = +v; state.shown = PAGE; }
    else if (act === 'restart') {
      state = freshState();
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e2) { /* ignore */ }
    }
    else return;
    render();
    scrollToTop(root);
  }
  root.addEventListener('click', onClick);
  portal.addEventListener('click', onClick);

  root.addEventListener('input', function (e) {
    var act = e.target.getAttribute('data-act');
    if (act !== 'from' && act !== 'to') return;
    var f = root.querySelector('[data-act=from]'), t = root.querySelector('[data-act=to]');
    if (+f.value > +t.value) { if (act === 'from') f.value = t.value; else t.value = f.value; }
    state.budgetFrom = +f.value <= priceMin ? null : +f.value;
    state.budgetTo = +t.value >= priceMax ? null : +t.value;
    syncRange();
    updateGo();
  });

  var goTimer;
  function updateGo() {
    clearTimeout(goTimer);
    goTimer = setTimeout(function () {
      var go = root.querySelector('[data-el=go]');
      if (go) go.textContent = goLabel(ranked());
    }, 80);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
  });
});

} catch (e) { console.error('[lite-mods] ошибка в патче lm-podbor', e); }
window.LiteMods && LiteMods.loaded({"version": "20261015183841"});
