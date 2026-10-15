/* lite-mods: ohqmp.dev-lite.ru, версия 20261015154425 */
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
window.LiteMods && LiteMods.define("lm-podbor", { css: "/*\n * lm-podbor — в дизайн-системе сайта: сетка и отступы как у штатных блоков (--ui-col, --ui-unit,\n * брейкпоинт 812px), типографика блока (заголовок ui-unit×8 / текст ×4), токены цвета --ui-*,\n * карточки r=20 с мягкой тенью, кнопки 48px r=8, «пилюли» r=500.\n */\n\n.lm-podbor {\n  --lmp-main: var(--ui-main-color, #6A31EB);\n  --lmp-main-12: var(--ui-main-color-12, rgba(106, 49, 235, .12));\n  --lmp-main-8: var(--ui-main-color-8, rgba(106, 49, 235, .08));\n  --lmp-ink: var(--ui-font-black-color, #07071F);\n  --lmp-ink-64: var(--ui-font-black-color-64, rgba(7, 7, 31, .64));\n  --lmp-ink-48: var(--ui-font-black-color-48, rgba(7, 7, 31, .48));\n  --lmp-ink-12: var(--ui-font-black-color-12, rgba(7, 7, 31, .12));\n  --lmp-ink-8: var(--ui-font-black-color-8, rgba(7, 7, 31, .08));\n  --lmp-ink-4: var(--ui-font-black-color-4, rgba(7, 7, 31, .04));\n  --lmp-white: var(--ui-base-white-color, #FCFCFC);\n  --lmp-title: var(--ui-title-font-family, inherit);\n  --lmp-text: var(--ui-main-font-family, inherit);\n  --lmp-shadow: 0 4px 24px rgba(7, 7, 31, .06);\n  --lmp-ease: cubic-bezier(.2, .7, .1, 1);\n  --lmp-good: #1F9D55;\n  font-family: var(--lmp-text);\n  color: var(--lmp-ink);\n}\n\n.lm-podbor *,\n.lm-podbor *::before,\n.lm-podbor *::after {\n  box-sizing: border-box;\n}\n\n.lm-podbor button {\n  font: inherit;\n  color: inherit;\n  cursor: pointer;\n}\n\n/* ---------- Сетка и отступы — как у штатных блоков сайта ---------- */\n/* wrapper: padding-block ui-unit×12 (моб. ×6), фон base-white; container: ui-col×32 по центру (моб. 100% − ui-unit×8) */\n\n.lm-podbor .lmp {\n  --u: var(--ui-unit, 4px);\n  --col: var(--ui-col, 40px);\n  padding-block: var(--ui-padding-top, calc(var(--u) * 12)) var(--ui-padding-bottom, calc(var(--u) * 12));\n  background-color: var(--lmp-white);\n}\n\n.lm-podbor .lmp__container {\n  width: calc(var(--col) * 32);\n  margin: 0 auto;\n}\n\n/* ---------- Шапка: «заголовок | текст», как у штатных блоков ---------- */\n\n.lm-podbor .lmp__head {\n  display: flex;\n  align-items: flex-start;\n  column-gap: calc(var(--col) * 2);\n}\n\n.lm-podbor .lmp__title {\n  flex: none;\n  width: calc(var(--col) * 10);\n  margin: 0;\n  font-family: var(--lmp-title);\n  font-size: calc(var(--u) * 8);\n  font-weight: 400;\n  line-height: 120%;\n  word-break: break-word;\n  color: var(--ui-base-black-color, var(--lmp-ink));\n}\n\n.lm-podbor .lmp__lead {\n  max-width: calc(var(--col) * 13);\n  margin: 0 0 0 auto;\n  font-size: calc(var(--u) * 4);\n  line-height: 150%;\n  color: var(--ui-base-black-color-48, var(--lmp-ink-48));\n}\n\n.lm-podbor .lmp__steps {\n  display: flex;\n  gap: calc(var(--u) * 2);\n  margin: calc(var(--u) * 10) 0 0;\n  padding: 0;\n  list-style: none;\n  counter-reset: lmp-step;\n  overflow-x: auto;\n  scrollbar-width: none;\n}\n\n.lm-podbor .lmp__steps::-webkit-scrollbar {\n  display: none;\n}\n\n.lm-podbor .lmp__steps li {\n  counter-increment: lmp-step;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: none;\n  height: 40px;\n  padding: 0 18px 0 8px;\n  border-radius: 500px;\n  background: var(--lmp-white);\n  box-shadow: var(--lmp-shadow);\n  font-size: 14px;\n  color: var(--lmp-ink-48);\n  transition: color .3s, background-color .3s;\n}\n\n.lm-podbor .lmp__steps li::before {\n  content: counter(lmp-step);\n  display: grid;\n  place-items: center;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: var(--lmp-ink-4);\n  font-size: 12px;\n}\n\n.lm-podbor .lmp__steps li.is-current {\n  background: var(--lmp-ink);\n  color: var(--lmp-white);\n}\n\n.lm-podbor .lmp__steps li.is-current::before {\n  background: var(--lmp-main);\n  color: #fff;\n}\n\n.lm-podbor .lmp__steps li.is-done {\n  color: var(--lmp-ink);\n}\n\n.lm-podbor .lmp__steps li.is-done::before {\n  content: '✓';\n  background: var(--lmp-main-12);\n  color: var(--lmp-main);\n}\n\n/* ---------- Шаги ---------- */\n\n.lm-podbor .lmp__view {\n  margin-top: calc(var(--u) * 10);\n  animation: lmp-in .5s var(--lmp-ease);\n}\n\n@keyframes lmp-in {\n  from { opacity: 0; transform: translateY(12px); }\n}\n\n.lm-podbor .lmp__loading {\n  padding: 60px 0;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__q {\n  margin: 0 0 calc(var(--u) * 6);\n  font-family: var(--lmp-title);\n  font-size: calc(var(--u) * 6);\n  font-weight: 400;\n  line-height: 120%;\n}\n\n.lm-podbor .lmp__sub {\n  margin: calc(var(--u) * 8) 0 calc(var(--u) * 3);\n  font-family: var(--lmp-title);\n  font-size: calc(var(--u) * 4);\n  font-weight: 400;\n}\n\n.lm-podbor .lmp__hint {\n  margin: calc(var(--u) * -3) 0 calc(var(--u) * 5);\n  font-size: calc(var(--u) * 3.5);\n  line-height: 150%;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__back {\n  margin: 0 0 16px;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: 14px;\n  color: var(--lmp-ink-48);\n  transition: color .2s;\n}\n\n.lm-podbor .lmp__back:hover {\n  color: var(--lmp-main);\n}\n\n.lm-podbor .lmp__cards {\n  display: grid;\n  gap: 16px;\n}\n\n.lm-podbor .lmp__cards--4 { grid-template-columns: repeat(4, 1fr); }\n.lm-podbor .lmp__cards--3 { grid-template-columns: repeat(3, 1fr); }\n\n.lm-podbor .lmp__card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 8px;\n  min-height: 180px;\n  padding: 28px 28px 24px;\n  border: 1px solid transparent;\n  border-radius: 20px;\n  background: var(--lmp-white);\n  box-shadow: var(--lmp-shadow);\n  text-align: left;\n  transition: transform .35s var(--lmp-ease), box-shadow .35s var(--lmp-ease), border-color .25s;\n}\n\n.lm-podbor .lmp__card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 40px -16px rgba(7, 7, 31, .25);\n}\n\n.lm-podbor .lmp__card.is-selected {\n  border-color: var(--lmp-main);\n}\n\n.lm-podbor .lmp__card-title {\n  font-family: var(--lmp-title);\n  font-size: 22px;\n  line-height: 1.2;\n}\n\n.lm-podbor .lmp__card-text {\n  font-size: 14px;\n  line-height: 20px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__card-arrow {\n  margin-top: auto;\n  display: grid;\n  place-items: center;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: var(--lmp-main-8);\n  color: var(--lmp-main);\n  transition: background-color .25s, color .25s, transform .35s var(--lmp-ease);\n}\n\n.lm-podbor .lmp__card:hover .lmp__card-arrow {\n  background: var(--lmp-main);\n  color: #fff;\n  transform: translateX(4px);\n}\n\n/* ---------- Чипы, сегменты, ползунок ---------- */\n\n.lm-podbor .lmp__chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.lm-podbor .lmp__chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 40px;\n  padding: 0 18px;\n  border: 1px solid var(--lmp-ink-8);\n  border-radius: 500px;\n  background: var(--lmp-white);\n  font-size: 14px;\n  transition: background-color .2s, color .2s, border-color .2s, transform .2s var(--lmp-ease);\n}\n\n.lm-podbor button.lmp__chip:hover {\n  border-color: var(--lmp-main);\n}\n\n.lm-podbor .lmp__chip.is-on {\n  border-color: var(--lmp-main);\n  background: var(--lmp-main);\n  color: #fff;\n}\n\n.lm-podbor .lmp__chip small {\n  font-size: 11px;\n  opacity: .7;\n}\n\n.lm-podbor .lmp__chip.is-disabled {\n  opacity: .45;\n  cursor: help;\n}\n\n.lm-podbor .lmp__chips--small .lmp__chip {\n  height: 32px;\n  padding: 0 12px;\n  font-size: 13px;\n}\n\n.lm-podbor .lmp__more {\n  margin-top: 16px;\n}\n\n.lm-podbor .lmp__more summary {\n  display: inline-block;\n  margin-bottom: 12px;\n  font-size: 14px;\n  color: var(--lmp-main);\n  cursor: pointer;\n  list-style: none;\n}\n\n.lm-podbor .lmp__more summary::-webkit-details-marker {\n  display: none;\n}\n\n.lm-podbor .lmp__seg {\n  display: inline-flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  padding: 4px;\n  border-radius: 500px;\n  background: var(--lmp-ink-4);\n}\n\n.lm-podbor .lmp__seg button {\n  height: 40px;\n  padding: 0 18px;\n  border: 0;\n  border-radius: 500px;\n  background: transparent;\n  font-size: 14px;\n  color: var(--lmp-ink-64);\n  transition: background-color .25s, color .25s, box-shadow .25s;\n}\n\n.lm-podbor .lmp__seg button[aria-pressed=\"true\"] {\n  background: var(--lmp-white);\n  color: var(--lmp-ink);\n  box-shadow: 0 2px 8px rgba(7, 7, 31, .08);\n}\n\n.lm-podbor .lmp__seg--small button {\n  height: 32px;\n  padding: 0 14px;\n  font-size: 13px;\n}\n\n.lm-podbor .lmp__range {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  max-width: 520px;\n  height: 4px;\n  border-radius: 4px;\n  background: linear-gradient(var(--lmp-main), var(--lmp-main)) 0 / var(--lmp-p, 100%) 100% no-repeat, var(--lmp-ink-8);\n  outline: none;\n  cursor: pointer;\n}\n\n.lm-podbor .lmp__range::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  border: 4px solid var(--lmp-main);\n  background: #fff;\n  box-shadow: 0 2px 8px rgba(7, 7, 31, .2);\n}\n\n.lm-podbor .lmp__range::-moz-range-thumb {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  border: 4px solid var(--lmp-main);\n  background: #fff;\n}\n\n.lm-podbor .lmp__actions {\n  margin-top: 40px;\n}\n\n.lm-podbor .lmp__btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 48px;\n  padding: 0 32px;\n  border: 1px solid var(--lmp-main);\n  border-radius: 8px;\n  background: var(--lmp-main);\n  color: #fff;\n  font-family: var(--lmp-title);\n  font-size: 14px;\n  text-decoration: none;\n  transition: background-color .25s, color .25s, transform .25s var(--lmp-ease), box-shadow .25s;\n}\n\n.lm-podbor .lmp__btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 24px -10px var(--ui-main-color-64, rgba(106, 49, 235, .64));\n}\n\n.lm-podbor .lmp__btn--line {\n  background: transparent;\n  color: var(--lmp-main);\n}\n\n.lm-podbor .lmp__btn--line:hover {\n  background: var(--lmp-main);\n  color: #fff;\n}\n\n.lm-podbor .lmp__btn--small {\n  height: 36px;\n  padding: 0 16px;\n  font-size: 13px;\n}\n\n.lm-podbor .lmp__link {\n  display: block;\n  margin-top: 8px;\n  padding: 0;\n  border: 0;\n  background: none;\n  font-size: 14px;\n  color: var(--lmp-main);\n  text-align: left;\n}\n\n/* ---------- Результаты ---------- */\n\n.lm-podbor .lmp__results {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 32px;\n  align-items: start;\n}\n\n.lm-podbor .lmp__results > * {\n  min-width: 0;\n}\n\n.lm-podbor .lmp__summary {\n  position: sticky;\n  top: 96px;\n  padding: 24px;\n  border-radius: 20px;\n  background: var(--lmp-white);\n  box-shadow: var(--lmp-shadow);\n}\n\n.lm-podbor .lmp__summary-label {\n  margin: 0;\n  font-size: 13px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__summary-goal {\n  margin: 4px 0 16px;\n  font-family: var(--lmp-title);\n  font-size: 18px;\n  line-height: 1.3;\n}\n\n.lm-podbor .lmp__summary-row {\n  margin: 16px 0 8px;\n  font-size: 14px;\n}\n\n.lm-podbor .lmp__list-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 20px;\n}\n\n.lm-podbor .lmp__list-head p {\n  margin: 0;\n  font-size: 16px;\n  color: var(--lmp-ink-64);\n}\n\n.lm-podbor .lmp__list-head b {\n  color: var(--lmp-ink);\n  font-weight: 500;\n}\n\n.lm-podbor .lmp__grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n\n.lm-podbor .lmp__type {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border-radius: 20px;\n  background: var(--lmp-white);\n  box-shadow: var(--lmp-shadow);\n  animation: lmp-in .5s var(--lmp-ease) both;\n  animation-delay: calc(var(--i, 0) * 40ms);\n  transition: transform .35s var(--lmp-ease), box-shadow .35s var(--lmp-ease);\n}\n\n.lm-podbor .lmp__type:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 18px 40px -18px rgba(7, 7, 31, .3);\n}\n\n.lm-podbor .lmp__type-plan {\n  position: relative;\n  display: grid;\n  place-items: center;\n  height: 220px;\n  padding: 20px;\n  background: var(--lmp-ink-4);\n}\n\n.lm-podbor .lmp__type-plan img {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n  mix-blend-mode: multiply;\n}\n\n.lm-podbor .lmp__type-noplan {\n  font-family: var(--lmp-title);\n  font-size: 28px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__match {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  padding: 6px 12px;\n  border-radius: 500px;\n  background: var(--lmp-main);\n  color: #fff;\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.lm-podbor .lmp__type-body {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  padding: 20px 24px 24px;\n}\n\n.lm-podbor .lmp__type-title {\n  margin: 0;\n  font-family: var(--lmp-title);\n  font-size: 22px;\n  font-weight: 400;\n}\n\n.lm-podbor .lmp__type-complex {\n  margin: 4px 0 0;\n  font-size: 14px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__type-price {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin: 14px 0 0;\n  font-size: 20px;\n}\n\n.lm-podbor .lmp__type-price small {\n  font-size: 13px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__type-meta {\n  margin: 6px 0 0;\n  font-size: 13px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__label {\n  margin: 16px 0 8px;\n  font-size: 12px;\n  color: var(--lmp-ink-48);\n  text-transform: uppercase;\n  letter-spacing: .06em;\n}\n\n.lm-podbor .lmp__tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.lm-podbor .lmp__tags li {\n  padding: 4px 10px;\n  border-radius: 500px;\n  font-size: 13px;\n}\n\n.lm-podbor .lmp__tags--yes li {\n  background: var(--lmp-main-8);\n  color: var(--lmp-main);\n}\n\n.lm-podbor .lmp__tags--yes li::before {\n  content: '✓ ';\n}\n\n.lm-podbor .lmp__tags--no li {\n  background: var(--lmp-ink-4);\n  color: var(--lmp-ink-64);\n}\n\n.lm-podbor .lmp__type .lmp__btn {\n  margin-top: auto;\n  align-self: stretch;\n}\n\n.lm-podbor .lmp__type-body > .lmp__tags:last-of-type {\n  margin-bottom: 20px;\n}\n\n.lm-podbor .lmp__more-btn {\n  width: 100%;\n  height: 48px;\n  margin-top: 16px;\n  border: 1px solid var(--lmp-ink-8);\n  border-radius: 8px;\n  background: transparent;\n  color: var(--lmp-main);\n}\n\n/* ---------- Панель типа ---------- */\n\n/* Панель живёт в <body> (обёртка .lm-podbor.lmp-portal), поверх липкой шапки сайта */\n.lm-podbor.lmp-portal {\n  position: relative;\n  z-index: 2147483000;\n}\n\n.lm-podbor .lmp__drawer {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483000;\n}\n\n.lm-podbor .lmp__drawer[hidden] {\n  display: none;\n}\n\n.lm-podbor .lmp__drawer-backdrop {\n  position: absolute;\n  inset: 0;\n  background: rgba(7, 7, 31, .4);\n  animation: lmp-fade .3s ease;\n}\n\n@keyframes lmp-fade {\n  from { opacity: 0; }\n}\n\n@keyframes lmp-slide {\n  from { transform: translateX(40px); opacity: 0; }\n}\n\n.lm-podbor .lmp__drawer-panel {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(820px, 100%);\n  overflow-y: auto;\n  padding: 32px;\n  background: var(--lmp-white);\n  animation: lmp-slide .45s var(--lmp-ease);\n  outline: none;\n}\n\n.lm-podbor .lmp__close {\n  position: sticky;\n  top: 0;\n  float: right;\n  width: 40px;\n  height: 40px;\n  border: 0;\n  border-radius: 50%;\n  background: var(--lmp-ink-4);\n  font-size: 22px;\n  line-height: 1;\n}\n\n.lm-podbor .lmp__panel-head {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n}\n\n.lm-podbor .lmp__panel-head img {\n  width: 120px;\n  height: 120px;\n  object-fit: contain;\n  padding: 8px;\n  border-radius: 16px;\n  background: var(--lmp-ink-4);\n  mix-blend-mode: multiply;\n}\n\n.lm-podbor .lmp__panel-head h3 {\n  margin: 0;\n  font-family: var(--lmp-title);\n  font-size: 28px;\n  font-weight: 400;\n}\n\n.lm-podbor .lmp__panel-head p {\n  margin: 6px 0 0;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__panel-lead {\n  margin: 24px 0 20px;\n  font-size: 15px;\n  line-height: 22px;\n  color: var(--lmp-ink-64);\n}\n\n.lm-podbor .lmp__flats {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.lm-podbor .lmp__flat {\n  display: grid;\n  grid-template-columns: 1.1fr 1.6fr .9fr;\n  gap: 16px;\n  align-items: start;\n  padding: 18px 20px;\n  border: 1px solid var(--lmp-ink-8);\n  border-radius: 16px;\n  background: #fff;\n}\n\n.lm-podbor .lmp__flat.is-best {\n  border-color: var(--lmp-main);\n  box-shadow: 0 0 0 1px var(--lmp-main);\n}\n\n.lm-podbor .lmp__badge {\n  display: inline-block;\n  margin-bottom: 8px;\n  padding: 3px 10px;\n  border-radius: 500px;\n  background: var(--lmp-main);\n  color: #fff;\n  font-size: 12px;\n}\n\n.lm-podbor .lmp__flat-floor {\n  margin: 0;\n  font-size: 15px;\n}\n\n.lm-podbor .lmp__flat-floor b {\n  font-weight: 500;\n}\n\n.lm-podbor .lmp__flat-meta,\n.lm-podbor .lmp__flat-diff {\n  margin: 4px 0 0;\n  font-size: 13px;\n  line-height: 18px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__flat-diff {\n  margin-top: 10px;\n  color: var(--lmp-ink-64);\n}\n\n.lm-podbor .lmp__flat-diff .is-good {\n  color: var(--lmp-good);\n  font-weight: 500;\n}\n\n.lm-podbor .lmp__factors {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px 16px;\n  margin: 0;\n}\n\n.lm-podbor .lmp__factors dt {\n  font-size: 12px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__factors dd {\n  margin: 2px 0 0;\n  font-size: 14px;\n}\n\n.lm-podbor .lmp__factors small {\n  display: block;\n  margin-top: 2px;\n  font-size: 11px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__bar {\n  display: block;\n  height: 4px;\n  margin-top: 4px;\n  border-radius: 4px;\n  background: var(--lmp-ink-8);\n  overflow: hidden;\n}\n\n.lm-podbor .lmp__bar i {\n  display: block;\n  height: 100%;\n  border-radius: 4px;\n  background: var(--lmp-main);\n}\n\n.lm-podbor .lmp__flat-price {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n  text-align: right;\n}\n\n.lm-podbor .lmp__flat-price b {\n  font-size: 17px;\n  font-weight: 500;\n}\n\n.lm-podbor .lmp__flat-price small {\n  font-size: 12px;\n  color: var(--lmp-ink-48);\n}\n\n.lm-podbor .lmp__flat-match {\n  margin: 4px 0 6px;\n  font-size: 12px;\n  color: var(--lmp-main);\n}\n\n.lm-podbor .lmp__note {\n  margin: 20px 0 0;\n  font-size: 12px;\n  line-height: 18px;\n  color: var(--lmp-ink-48);\n}\n\nhtml.lmp-lock {\n  overflow: hidden;\n}\n\n/* ---------- Адаптив: брейкпоинт сайта 812px и мобильные токены штатных блоков ---------- */\n\n@media (max-width: 1100px) {\n  .lm-podbor .lmp__cards--4 { grid-template-columns: repeat(2, 1fr); }\n  .lm-podbor .lmp__grid { grid-template-columns: 1fr; }\n}\n\n@media (max-width: 812px) {\n  .lm-podbor .lmp { padding-block: var(--ui-padding-top, calc(var(--u) * 6)) var(--ui-padding-bottom, calc(var(--u) * 6)); }\n  .lm-podbor .lmp__container { width: calc(100% - var(--u) * 8); }\n  .lm-podbor .lmp__head { flex-direction: column; align-items: stretch; row-gap: calc(var(--u) * 4); }\n  .lm-podbor .lmp__title { width: 100%; font-size: calc(var(--u) * 5); }\n  .lm-podbor .lmp__lead { max-width: none; margin: 0; font-size: calc(var(--u) * 3.5); line-height: 160%; }\n  .lm-podbor .lmp__steps { margin-top: calc(var(--u) * 6); }\n  .lm-podbor .lmp__view { margin-top: calc(var(--u) * 6); }\n  .lm-podbor .lmp__q { font-size: calc(var(--u) * 5); margin-bottom: calc(var(--u) * 4); }\n  .lm-podbor .lmp__cards--4,\n  .lm-podbor .lmp__cards--3 { grid-template-columns: 1fr; }\n  .lm-podbor .lmp__card { min-height: 0; padding: 20px; }\n  .lm-podbor .lmp__type-plan { height: 180px; }\n  .lm-podbor .lmp__results { grid-template-columns: 1fr; gap: 20px; }\n  .lm-podbor .lmp__summary { position: static; padding: 16px; }\n  .lm-podbor .lmp__summary-goal { margin-bottom: 10px; }\n  /* Критерии в одну прокручиваемую строку — выдача видна сразу */\n  .lm-podbor .lmp__summary .lmp__chips { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; margin: 0 -16px; padding: 0 16px; }\n  .lm-podbor .lmp__summary .lmp__chips::-webkit-scrollbar { display: none; }\n  .lm-podbor .lmp__summary .lmp__chip { flex: none; }\n  .lm-podbor .lmp__summary .lmp__link { display: inline-block; margin-right: 16px; }\n  .lm-podbor .lmp__flat { grid-template-columns: 1fr; }\n  .lm-podbor .lmp__flat-price { align-items: flex-start; text-align: left; }\n  .lm-podbor .lmp__drawer-panel { padding: 20px 16px; }\n  .lm-podbor .lmp__panel-head img { width: 88px; height: 88px; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .lm-podbor *,\n  .lm-podbor *::before,\n  .lm-podbor *::after {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n" });
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
    rent_ready: { label: 'Можно сразу сдавать', compromise: 'до сдачи в аренду — ремонт или ожидание',
      test: function (f) { return f.finishGrade != null && f.finishGrade >= 2 && f.monthsToReady != null && f.monthsToReady <= 6; } },
    growth: { label: 'Ранняя стадия — потенциал роста цены', compromise: 'дом почти готов, рост цены меньше',
      test: function (f) { return f.monthsToReady == null ? null : f.monthsToReady >= 12; } },
    flip: { label: 'Под ремонт и перепродажу', compromise: 'отделка уже есть — меньше маржа на ремонте',
      test: function (f) { return f.finishGrade == null ? null : f.finishGrade <= 1; } },
    mid_floor: { label: 'Средний этаж — проще перепродать', compromise: 'крайний этаж',
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
        { id: 'first', title: 'Первая своя квартира', text: 'Важен бюджет и быстрый переезд',
          rooms: [0, 1], needs: ['budget_low', 'no_repair', 'move_year', 'liquid', 'cheap_ppm'] },
        { id: 'remote', title: 'Работаю из дома', text: 'Тишина и отдельное место для работы',
          rooms: [1, 2], needs: ['remote', 'quiet', 'kitchen_living', 'high_view', 'sunny_living'] },
        { id: 'space', title: 'Простор и вид', text: 'Высокий этаж, свет, хранение',
          rooms: [1, 2], areaMin: 40, needs: ['high_view', 'space', 'sunny_living', 'balcony', 'storage'] }
      ] },
    { id: 'family', title: 'Для семьи', text: 'Место для всех и спокойный быт',
      subs: [
        { id: 'f20', title: 'Без детей', text: 'Двое взрослых (2+0)',
          rooms: [1, 2], needs: ['kitchen_living', 'no_repair', 'quiet', 'balcony', 'budget_first'] },
        { id: 'f21', title: 'С ребёнком', text: 'Двое взрослых и ребёнок (2+1)',
          rooms: [2, 3], areaMin: 50, needs: ['kids_room', 'quiet', 'space', 'two_wc', 'no_repair', 'kitchen_living', 'sunny_living', 'shade_bedrooms'] },
        { id: 'f3', title: 'С детьми', text: 'Трое и больше (3+)',
          rooms: [3, 4, 5], areaMin: 70, needs: ['two_wc', 'kids_room', 'space', 'quiet', 'kitchen_living', 'storage'] }
      ] },
    { id: 'relatives', title: 'Для родственников', text: 'Рядом, удобно и без забот',
      subs: [
        { id: 'kids', title: 'Для детей', text: 'Первая квартира для взрослого ребёнка',
          rooms: [0, 1], needs: ['budget_low', 'liquid', 'no_repair', 'move_year'] },
        { id: 'parents', title: 'Для родителей', text: 'Невысоко, тихо, готово к жизни',
          rooms: [1, 2], needs: ['easy_floor', 'no_repair', 'quiet', 'move_year', 'sunny_living', 'not_first'] }
      ] },
    { id: 'invest', title: 'Для инвестиций', text: 'Доходность, ликвидность, сохранность',
      subs: [
        { id: 'rent', title: 'Быстро купить и сдать', text: 'Горизонт 1–6 месяцев',
          rooms: [0, 1], needs: ['rent_ready', 'liquid', 'no_repair', 'cheap_ppm'], invest: true },
        { id: 'yield', title: 'Максимальная доходность', text: 'Горизонт 3–7 лет',
          rooms: [0, 1], needs: ['cheap_ppm', 'liquid', 'budget_low', 'growth'], invest: true },
        { id: 'flip', title: 'Ремонт и перепродажа', text: 'Горизонт до 3 лет',
          rooms: [1, 2, 3], needs: ['flip', 'cheap_ppm', 'growth', 'mid_floor'], invest: true },
        { id: 'capital', title: 'Сохранить капитал', text: 'Надёжность и ликвидность, 7+ лет',
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
        light: light(stack.dirs || f.directions, floor)
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

  // ---------- Совпадение с запросом ----------
  // needs: [{ id, weight }]
  function score(f, needs) {
    var sum = 0, total = 0, known = 0, all = 0, hits = [], misses = [], unknown = [];
    needs.forEach(function (n) {
      var def = NEEDS[n.id];
      if (!def || def.unavailable) return;
      all += n.weight;
      var v = def.test(f);
      if (v == null) { unknown.push(n.id); return; }
      known += n.weight;
      total += n.weight;
      if (v) { sum += n.weight; hits.push(n.id); } else misses.push(n.id);
    });
    var base = total ? sum / total : 0.5;
    var coverage = all ? known / all : 1;
    return { value: base * (0.85 + 0.15 * coverage), hits: hits, misses: misses, unknown: unknown };
  }

  function rank(types, query) {
    var needs = query.needs.map(function (id, i) { return { id: id, weight: i < 3 ? 2 : 1 }; });
    var out = [];
    types.forEach(function (t) {
      var fl = t.flats.filter(function (f) {
        if (query.rooms && query.rooms.indexOf(Math.min(f.rooms, 5)) < 0) return false;
        if (query.areaMin && f.area < query.areaMin) return false;
        if (query.budget && f.price > query.budget) return false;
        return true;
      });
      if (!fl.length) return;
      fl.forEach(function (f) { f.match = score(f, needs); });
      fl.sort(function (a, b) { return b.match.value - a.match.value || a.price - b.price; });
      var best = fl[0];
      out.push({ type: t, flats: fl, best: best, value: best.match.value });
    });
    // При близком совпадении (шаг 5%) выше тип с бо́льшим выбором квартир, затем дешевле
    function bucket(v) { return Math.round(v * 20); }
    return out.sort(function (a, b) {
      return bucket(b.value) - bucket(a.value) || b.flats.length - a.flats.length || a.best.price - b.best.price;
    });
  }

  window.LMPodborModel = {
    DEFAULTS: DEFAULTS, NEEDS: NEEDS, GOALS: GOALS, MOVE: MOVE, FINISHING: FINISHING, DIRS: DIRS,
    noise: noise, dust: dust, light: light, prepare: prepare, aggregate: aggregate, rank: rank, median: median
  };
})();

/*
 * lm-podbor — «Подбор квартиры под вашу жизнь»: цель покупки → состав семьи → что важно → типы квартир
 * → сравнение квартир внутри типа (этаж, тишина, пыль, свет, цена).
 *
 * Монтируется в HTML-блок страницы /podbor: во вкладке HTML блока — <div class="lm-podbor"></div>.
 * Данные — открытые API каталога сайта; модель (пресеты, факторы, агрегация) — model.js.
 */
window.LiteMods && LiteMods.register('lm-podbor', function (root, ctx) {
  if (root.classList.contains('lmp-portal')) return; // это наша же обёртка панели в <body>
  var M = window.LMPodborModel;
  var nuxt = window.$nuxt;
  if (!M || !nuxt) return ctx.log('нет модели или Nuxt');

  var site = nuxt.$store.state.site || {};
  var projectId = site.project && site.project.id;
  var PAGE = 12;

  // ---------- форматирование ----------
  function num(n) { return Math.round(n).toLocaleString('ru-RU'); }
  function rub(n) { return num(n) + ' ₽'; }
  function mln(n) {
    var v = n / 1e6;
    return (v >= 10 ? v.toFixed(1) : v.toFixed(2)).replace(/\.?0+$/, '').replace('.', ',') + ' млн ₽';
  }
  function area(a, b) {
    var f = function (x) { return String(Math.round(x * 10) / 10).replace('.', ','); };
    return (b == null || Math.abs(b - a) < 0.1 ? f(a) : f(a) + '–' + f(b)) + ' м²';
  }
  function roomsLabel(r, euro) {
    if (r === 0) return 'Студия';
    return r + '-комн.' + (euro ? ' евро' : '');
  }
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

  // ---------- загрузка данных ----------
  function getJson(url) {
    return fetch(url, { credentials: 'same-origin', headers: { 'x-host': location.host } }).then(function (r) {
      if (!r.ok) throw new Error(url + ' → ' + r.status);
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

  // Этажность секции: из списка этажей (включая распроданные), иначе — максимальный этаж квартир
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
  var state = readHash() || { step: 1, goal: null, sub: null, needs: [], move: null, budget: null, sort: 'match', shown: PAGE };
  var priceMax = 0;

  function goal() { return M.GOALS.filter(function (g) { return g.id === state.goal; })[0]; }
  function sub() { var g = goal(); return g && g.subs.filter(function (s) { return s.id === state.sub; })[0]; }

  function query() {
    var s = sub() || {};
    var needs = state.needs.slice();
    var mv = M.MOVE.filter(function (m) { return m.id === state.move; })[0];
    if (mv && mv.need && needs.indexOf(mv.need) < 0) needs.unshift(mv.need);
    return { rooms: s.rooms, areaMin: s.areaMin, budget: state.budget, needs: needs };
  }

  function writeHash() {
    var h = [state.goal, state.sub, state.needs.join('.'), state.move || '', state.budget || ''].join('~');
    try { history.replaceState(null, '', '#podbor=' + encodeURIComponent(h)); } catch (e) { /* ignore */ }
  }
  function readHash() {
    var m = /#podbor=([^&]+)/.exec(location.hash);
    if (!m) return null;
    var p = decodeURIComponent(m[1]).split('~');
    if (!p[0] || !p[1]) return null;
    return { step: 4, goal: p[0], sub: p[1], needs: p[2] ? p[2].split('.') : [], move: p[3] || null, budget: p[4] ? +p[4] : null, sort: 'match', shown: PAGE };
  }

  // ---------- каркас ----------
  // Разметка повторяет штатные блоки: обёртка с отступами блока → контейнер сетки сайта → шапка «заголовок | текст»
  root.innerHTML =
    '<div class="lmp"><div class="lmp__container">' +
      '<header class="lmp__head">' +
        '<h2 class="lmp__title">Квартира под вашу жизнь</h2>' +
        '<p class="lmp__lead">Расскажите, для кого покупаете — покажем подходящие планировки и объясним, чем отличаются квартиры одного типа.</p>' +
      '</header>' +
      '<ol class="lmp__steps" data-el="steps"><li>Цель</li><li>Кто будет жить</li><li>Что важно</li><li>Квартиры</li></ol>' +
      '<div class="lmp__view" data-el="view"><div class="lmp__loading">Загружаем квартиры…</div></div>' +
    '</div></div>' +
    '<div class="lmp__drawer" data-el="drawer" hidden><div class="lmp__drawer-backdrop" data-act="close"></div>' +
      '<aside class="lmp__drawer-panel" role="dialog" aria-modal="true" data-el="panel"></aside></div>';

  var view = root.querySelector('[data-el=view]');
  var stepsEl = root.querySelector('[data-el=steps]');
  var drawer = root.querySelector('[data-el=drawer]');
  var panel = root.querySelector('[data-el=panel]');

  // Панель выносим в <body>: внутри блока она оказывается под липкой шапкой сайта.
  // Обёртка с классом lm-podbor сохраняет стили, переменные темы копируем с блока.
  var portal = document.createElement('div');
  portal.className = 'lm-podbor lmp-portal';
  var cs = getComputedStyle(root);
  ['--ui-main-color', '--ui-main-color-64', '--ui-main-color-12', '--ui-main-color-8', '--ui-font-black-color',
    '--ui-font-black-color-64', '--ui-font-black-color-48', '--ui-font-black-color-12', '--ui-font-black-color-8',
    '--ui-font-black-color-4', '--ui-base-white-color', '--ui-title-font-family', '--ui-main-font-family'
  ].forEach(function (v) { var val = cs.getPropertyValue(v); if (val) portal.style.setProperty(v, val.trim()); });
  portal.appendChild(drawer);
  document.body.appendChild(portal);

  loadFlats().then(function (raw) {
    var cx = raw.map(function (f) { return f.complex_id; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; });
    return loadSectionFloors(cx).then(function (floors) {
      var flats = M.prepare(raw, floors, (window.LM_PODBOR_STACKS || {})[location.hostname]);
      types = M.aggregate(flats);
      priceMax = Math.max.apply(null, flats.map(function (f) { return f.price; }));
      render();
    });
  }).catch(function (e) {
    view.innerHTML = '<div class="lmp__loading">Не удалось загрузить квартиры. Обновите страницу.</div>';
    ctx.log(e.message);
  });

  // ---------- шаги ----------
  function render() {
    [].forEach.call(stepsEl.children, function (li, i) {
      li.classList.toggle('is-done', i + 1 < state.step);
      li.classList.toggle('is-current', i + 1 === state.step);
    });
    if (state.step === 1) renderGoals();
    else if (state.step === 2) renderSubs();
    else if (state.step === 3) renderNeeds();
    else renderResults();
    if (state.step >= 3) writeHash();
  }

  function card(act, value, title, text, selected) {
    return '<button type="button" class="lmp__card' + (selected ? ' is-selected' : '') + '" data-act="' + act + '" data-value="' + esc(value) + '">' +
      '<span class="lmp__card-title">' + esc(title) + '</span>' +
      '<span class="lmp__card-text">' + esc(text) + '</span>' +
      '<span class="lmp__card-arrow" aria-hidden="true">→</span></button>';
  }

  function renderGoals() {
    view.innerHTML = '<h3 class="lmp__q">Для чего покупаете?</h3><div class="lmp__cards lmp__cards--4">' +
      M.GOALS.map(function (g) { return card('goal', g.id, g.title, g.text, g.id === state.goal); }).join('') + '</div>';
  }

  function renderSubs() {
    var g = goal();
    view.innerHTML = '<button type="button" class="lmp__back" data-act="step" data-value="1">← ' + esc(g.title) + '</button>' +
      '<h3 class="lmp__q">' + (g.id === 'invest' ? 'Какая стратегия?' : g.id === 'single' ? 'Что для вас главное?' : 'Кто будет жить?') + '</h3>' +
      '<div class="lmp__cards lmp__cards--' + (g.subs.length > 3 ? 4 : 3) + '">' +
      g.subs.map(function (s) { return card('sub', s.id, s.title, s.text, s.id === state.sub); }).join('') + '</div>';
  }

  function renderNeeds() {
    var g = goal(), s = sub();
    var preset = s.needs;
    var others = Object.keys(M.NEEDS).filter(function (id) { return preset.indexOf(id) < 0; });
    function chip(id) {
      var n = M.NEEDS[id], on = state.needs.indexOf(id) >= 0;
      if (n.unavailable) {
        return '<span class="lmp__chip is-disabled" title="' + esc(n.unavailable) + '">' + esc(n.label) + '<small>нет данных</small></span>';
      }
      return '<button type="button" class="lmp__chip' + (on ? ' is-on' : '') + '" data-act="need" data-value="' + id + '" aria-pressed="' + on + '">' +
        esc(n.label) + (n.approx ? '<small>≈</small>' : '') + '</button>';
    }
    var count = M.rank(types, query());
    view.innerHTML =
      '<button type="button" class="lmp__back" data-act="step" data-value="2">← ' + esc(g.title) + ' · ' + esc(s.title) + '</button>' +
      '<h3 class="lmp__q">Что для вас важно?</h3>' +
      '<p class="lmp__hint">Мы уже отметили типичное для «' + esc(s.title.toLowerCase()) + '». Первые три — самые важные, их учитываем сильнее.</p>' +
      '<div class="lmp__chips">' + preset.map(chip).join('') + '</div>' +
      '<details class="lmp__more"><summary>Ещё критерии</summary><div class="lmp__chips">' + others.map(chip).join('') + '</div></details>' +
      (g.id === 'invest' ? '' :
        '<h4 class="lmp__sub">Когда планируете переезд?</h4><div class="lmp__seg">' +
        M.MOVE.map(function (m) {
          return '<button type="button" data-act="move" data-value="' + m.id + '" aria-pressed="' + (state.move === m.id) + '">' + esc(m.title) + '</button>';
        }).join('') + '</div>') +
      '<h4 class="lmp__sub">Бюджет до <b data-el="budgetLabel">' + (state.budget ? mln(state.budget) : 'любой') + '</b></h4>' +
      '<input class="lmp__range" type="range" data-act="budget" min="3000000" max="' + Math.ceil(priceMax / 1e6) * 1e6 + '" step="100000" value="' + (state.budget || Math.ceil(priceMax / 1e6) * 1e6) + '">' +
      '<div class="lmp__actions"><button type="button" class="lmp__btn" data-act="step" data-value="4" data-el="go">' + goLabel(count) + '</button></div>';
    syncRange(view.querySelector('.lmp__range'));
  }

  function goLabel(ranked) {
    var n = ranked.reduce(function (s, r) { return s + r.flats.length; }, 0);
    return ranked.length ? 'Показать ' + plural(ranked.length, 'планировку', 'планировки', 'планировок') + ' · ' + plural(n, 'квартира', 'квартиры', 'квартир') : 'Нет подходящих квартир — ослабьте условия';
  }

  function syncRange(r) {
    if (!r) return;
    r.style.setProperty('--lmp-p', ((r.value - r.min) / (r.max - r.min) * 100).toFixed(1) + '%');
  }

  // ---------- результаты ----------
  function renderResults() {
    var g = goal(), s = sub();
    if (!g || !s) { state.step = 1; return render(); }
    var ranked = M.rank(types, query());
    if (state.sort === 'price') ranked.sort(function (a, b) { return a.best.price - b.best.price; });
    var total = ranked.reduce(function (sum, r) { return sum + r.flats.length; }, 0);
    view.innerHTML =
      '<div class="lmp__results">' +
        '<aside class="lmp__summary">' +
          '<p class="lmp__summary-label">Ваш запрос</p>' +
          '<p class="lmp__summary-goal">' + esc(g.title) + ' · ' + esc(s.title) + '</p>' +
          '<div class="lmp__chips lmp__chips--small">' + state.needs.map(function (id) {
            return '<button type="button" class="lmp__chip is-on" data-act="need" data-value="' + id + '" title="Убрать">' + esc(M.NEEDS[id].label) + ' ×</button>';
          }).join('') + '</div>' +
          (state.budget ? '<p class="lmp__summary-row">Бюджет до <b>' + mln(state.budget) + '</b></p>' : '') +
          '<button type="button" class="lmp__link" data-act="step" data-value="3">Изменить критерии</button>' +
          '<button type="button" class="lmp__link" data-act="restart">Начать заново</button>' +
        '</aside>' +
        '<section class="lmp__list">' +
          '<div class="lmp__list-head"><p>' + (ranked.length
            ? 'Нашли <b>' + plural(ranked.length, 'планировку', 'планировки', 'планировок') + '</b> · ' + plural(total, 'квартира', 'квартиры', 'квартир')
            : 'Под эти условия квартир нет — уберите пару критериев или поднимите бюджет') + '</p>' +
          '<div class="lmp__seg lmp__seg--small">' +
            '<button type="button" data-act="sort" data-value="match" aria-pressed="' + (state.sort === 'match') + '">По совпадению</button>' +
            '<button type="button" data-act="sort" data-value="price" aria-pressed="' + (state.sort === 'price') + '">Дешевле</button>' +
          '</div></div>' +
          '<div class="lmp__grid">' + ranked.slice(0, state.shown).map(typeCard).join('') + '</div>' +
          (ranked.length > state.shown ? '<button type="button" class="lmp__more-btn" data-act="more">Показать ещё ' + Math.min(PAGE, ranked.length - state.shown) + '</button>' : '') +
        '</section>' +
      '</div>';
    lastRanked = ranked;
  }

  var lastRanked = [];

  function typeCard(r, i) {
    var t = r.type, best = r.best;
    var hits = best.match.hits.slice(0, 4), misses = best.match.misses.slice(0, 3);
    var priceRange = r.flats.length > 1 && r.flats[r.flats.length - 1] ? rangePrice(r.flats) : mln(best.price);
    return '<article class="lmp__type" style="--i:' + (i % PAGE) + '">' +
      '<div class="lmp__type-plan">' + (t.plan
        ? '<img src="' + esc(img(t.plan)) + '" alt="Планировка" loading="lazy">'
        : '<span class="lmp__type-noplan">' + esc(roomsLabel(t.rooms, t.euro)) + '</span>') +
        '<span class="lmp__match" title="Насколько планировка подходит под ваш запрос">' + Math.round(r.value * 100) + '%</span></div>' +
      '<div class="lmp__type-body">' +
        '<h4 class="lmp__type-title">' + esc(roomsLabel(t.rooms, t.euro)) + ', ' + area(minArea(r.flats), maxArea(r.flats)) + '</h4>' +
        '<p class="lmp__type-complex">' + esc(t.complex) + '</p>' +
        '<p class="lmp__type-price">' + priceRange + (t.mortgageMin ? '<small>от ' + rub(t.mortgageMin) + '/мес</small>' : '') + '</p>' +
        '<p class="lmp__type-meta">' + plural(r.flats.length, 'квартира', 'квартиры', 'квартир') +
          ' · этажи ' + range(r.flats, 'floor') + (t.completions.length ? ' · ' + esc(t.completions.slice(0, 2).join(', ')) : '') + '</p>' +
        (hits.length ? '<p class="lmp__label">Почему подходит</p><ul class="lmp__tags lmp__tags--yes">' + hits.map(function (id) {
          return '<li>' + esc(M.NEEDS[id].label) + (M.NEEDS[id].approx && !best.sideKnown ? ' ≈' : '') + '</li>';
        }).join('') + '</ul>' : '') +
        (misses.length ? '<p class="lmp__label">В обмен на</p><ul class="lmp__tags lmp__tags--no">' + misses.map(function (id) {
          return '<li>' + esc(M.NEEDS[id].compromise) + '</li>';
        }).join('') + '</ul>' : '') +
        '<button type="button" class="lmp__btn lmp__btn--line" data-act="open" data-value="' + i + '">' +
          (r.flats.length > 1 ? 'Сравнить ' + plural(r.flats.length, 'квартиру', 'квартиры', 'квартир') : 'Подробнее о квартире') + '</button>' +
      '</div></article>';
  }

  function minArea(fl) { return Math.min.apply(null, fl.map(function (f) { return f.area; })); }
  function maxArea(fl) { return Math.max.apply(null, fl.map(function (f) { return f.area; })); }
  function range(fl, key) {
    var a = Math.min.apply(null, fl.map(function (f) { return f[key]; }));
    var b = Math.max.apply(null, fl.map(function (f) { return f[key]; }));
    return a === b ? String(a) : a + '–' + b;
  }
  function rangePrice(fl) {
    var a = Math.min.apply(null, fl.map(function (f) { return f.price; }));
    var b = Math.max.apply(null, fl.map(function (f) { return f.price; }));
    return a === b ? mln(a) : mln(a).replace(' млн ₽', '') + ' — ' + mln(b);
  }

  // ---------- внутри типа ----------
  function openType(r) {
    var t = r.type, best = r.best;
    var med = M.median(r.flats.map(function (f) { return f.price; }));
    var anyLight = r.flats.some(function (f) { return f.light; });
    var anySideKnown = r.flats.some(function (f) { return f.sideKnown; });
    panel.innerHTML =
      '<button type="button" class="lmp__close" data-act="close" aria-label="Закрыть">×</button>' +
      '<div class="lmp__panel-head">' +
        (t.plan ? '<img src="' + esc(img(t.plan)) + '" alt="Планировка">' : '') +
        '<div><h3>' + esc(roomsLabel(t.rooms, t.euro)) + ', ' + area(minArea(r.flats), maxArea(r.flats)) + '</h3>' +
        '<p>' + esc(t.complex) + ' · ' + rangePrice(r.flats) + '</p></div>' +
      '</div>' +
      '<p class="lmp__panel-lead">Планировка та же — а жизнь в этих квартирах разная. Сравнили этаж, тишину, пыль' + (anyLight ? ', свет' : '') + ' и цену под ваш запрос.</p>' +
      '<ol class="lmp__flats">' + r.flats.map(function (f, i) { return flatRow(f, i === 0, best, med, anyLight); }).join('') + '</ol>' +
      '<p class="lmp__note">' + (anySideKnown ? '' : 'Тишина и пыль — оценка по этажу и типовым допущениям: окна на улицу спального района, 50–100 м до дороги. ') +
        'Тишина: +10 дБ ощущается вдвое громче. Пыль: налёт на окнах, 1,0 — как на 2 этаже у шоссе.</p>';
    drawer.hidden = false;
    document.documentElement.classList.add('lmp-lock');
    panel.focus && panel.focus();
  }

  function bar(score, cls) {
    return '<span class="lmp__bar ' + (cls || '') + '"><i style="width:' + Math.round(score * 100) + '%"></i></span>';
  }

  function flatRow(f, isBest, best, med, anyLight) {
    var url = flatUrl(f);
    var diff = isBest ? '' : diffText(f, best);
    var dp = med ? Math.round((f.price / med - 1) * 100) : 0;
    return '<li class="lmp__flat' + (isBest ? ' is-best' : '') + '">' +
      '<div class="lmp__flat-main">' +
        (isBest ? '<span class="lmp__badge">Лучшая для вас</span>' : '') +
        '<p class="lmp__flat-floor"><b>' + f.floor + ' этаж</b> из ' + f.floors + ' · ' + { low: 'низ дома', mid: 'середина', high: 'верх дома' }[f.floorPos] + '</p>' +
        '<p class="lmp__flat-meta">Кв. ' + esc(f.number) + ' · ' + esc(f.building) + (f.section ? ', секция ' + esc(f.section) : '') + ' · ' + area(f.area) + '</p>' +
        (diff ? '<p class="lmp__flat-diff">' + diff + '</p>' : '') +
      '</div>' +
      '<dl class="lmp__factors">' +
        '<div><dt>Тишина</dt><dd>' + f.noise.label + bar(f.noise.score) + '<small>' + (f.noise.db > 0 ? '+' + f.noise.db.toFixed(1).replace('.', ',') + ' дБ к тихому двору' : 'как в тихом дворе') + '</small></dd></div>' +
        '<div><dt>Пыль</dt><dd>' + f.dust.label + bar(f.dust.score) + '<small>×' + f.dust.coef.toFixed(2).replace('.', ',') + '</small></dd></div>' +
        (anyLight ? '<div><dt>Свет</dt><dd>' + (f.light ? f.light.label + bar(f.light.score) + '<small>' + esc(f.light.names.join(', ')) + '</small>' : '<small>нет данных</small>') + '</dd></div>' : '') +
        '<div><dt>Отделка</dt><dd>' + esc(f.finishing || '—') + '<small>' + esc(f.completion || '') + '</small></dd></div>' +
      '</dl>' +
      '<div class="lmp__flat-price"><b>' + rub(f.price) + '</b>' +
        '<small>' + num(f.ppm) + ' ₽/м²' + (dp ? ' · ' + (dp > 0 ? '+' : '−') + Math.abs(dp) + '% к типу' : '') + '</small>' +
        '<span class="lmp__flat-match">' + Math.round(f.match.value * 100) + '% совпадение</span>' +
        (url ? '<a class="lmp__btn lmp__btn--small" href="' + esc(url) + '">Открыть</a>' : '') +
      '</div></li>';
  }

  // «Чем отличается от лучшей»: самые заметные различия, коротко
  function diffText(f, best) {
    var out = [];
    var df = f.floor - best.floor;
    if (df) out.push((df > 0 ? 'на ' + plural(df, 'этаж', 'этажа', 'этажей') + ' выше' : 'на ' + plural(-df, 'этаж', 'этажа', 'этажей') + ' ниже'));
    if (f.noise.label !== best.noise.label) out.push(f.noise.score > best.noise.score ? 'тише' : 'шумнее');
    if (f.dust.label !== best.dust.label) out.push(f.dust.score > best.dust.score ? 'меньше пыли' : 'больше пыли');
    if (f.finishGrade != null && best.finishGrade != null && f.finishGrade !== best.finishGrade) out.push(f.finishGrade > best.finishGrade ? 'отделка лучше' : 'отделка проще');
    var dp = f.price - best.price;
    if (Math.abs(dp) >= 50000) out.push(dp < 0 ? '<b class="is-good">дешевле на ' + rub(-dp) + '</b>' : 'дороже на ' + rub(dp));
    return out.length ? 'По сравнению с лучшей: ' + out.join(', ') : '';
  }

  function closeDrawer() {
    drawer.hidden = true;
    document.documentElement.classList.remove('lmp-lock');
  }

  // ---------- события ----------
  function onClick(e) {
    var el = e.target.closest('[data-act]');
    if (!el || !(root.contains(el) || portal.contains(el))) return;
    var act = el.getAttribute('data-act'), v = el.getAttribute('data-value');
    if (act === 'goal') { state.goal = v; state.sub = null; state.step = 2; }
    else if (act === 'sub') {
      state.sub = v; state.step = 3;
      state.needs = sub().needs.slice();
      state.move = goal().id === 'invest' ? null : state.move;
    }
    else if (act === 'need') {
      var i = state.needs.indexOf(v);
      if (i >= 0) state.needs.splice(i, 1); else state.needs.push(v);
      if (state.step === 3) { el.classList.toggle('is-on'); el.setAttribute('aria-pressed', i < 0); updateGo(); writeHash(); return; }
    }
    else if (act === 'move') { state.move = state.move === v ? null : v; }
    else if (act === 'sort') { state.sort = v; }
    else if (act === 'more') { state.shown += PAGE; }
    else if (act === 'step') { state.step = +v; state.shown = PAGE; }
    else if (act === 'restart') { state = { step: 1, goal: null, sub: null, needs: [], move: null, budget: null, sort: 'match', shown: PAGE }; history.replaceState(null, '', location.pathname + location.search); }
    else if (act === 'open') { openType(lastRanked[+v]); return; }
    else if (act === 'close') { closeDrawer(); return; }
    else return;
    render();
    if (act === 'goal' || act === 'sub' || (act === 'step' && +v === 4)) {
      var top = root.getBoundingClientRect().top + window.scrollY - 90;
      if (window.scrollY > top) window.scrollTo({ top: top, behavior: ctx.reducedMotion ? 'auto' : 'smooth' });
    }
  }
  root.addEventListener('click', onClick);
  portal.addEventListener('click', onClick);

  root.addEventListener('input', function (e) {
    if (e.target.getAttribute('data-act') !== 'budget') return;
    var r = e.target;
    syncRange(r);
    state.budget = +r.value >= +r.max ? null : +r.value;
    root.querySelector('[data-el=budgetLabel]').textContent = state.budget ? mln(state.budget) : 'любой';
    updateGo();
  });

  var goTimer;
  function updateGo() {
    clearTimeout(goTimer);
    goTimer = setTimeout(function () {
      var go = root.querySelector('[data-el=go]');
      if (go) go.textContent = goLabel(M.rank(types, query()));
    }, 80);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
  });
});

} catch (e) { console.error('[lite-mods] ошибка в патче lm-podbor', e); }
window.LiteMods && LiteMods.loaded({"version": "20261015154425"});
