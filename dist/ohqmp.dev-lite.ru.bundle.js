window.__LITE_MODS_BUNDLE__ = {"manifest": {"version": "20261014141839", "blocks": {"InfraBlock__ClassicType5": {"enabled": true}, "ObjectGalleryA__ClassicType23": {"enabled": true}}}, "files": {"InfraBlock__ClassicType5": {"css": "/*\n * InfraBlock__ClassicType5 — блок «Инфраструктура»\n * Всё строго внутри .InfraBlock__ClassicType5. Цвета — из переменных темы --ui-*.\n * Скрытие «до появления» работает только при [data-lm-ready] (его ставит script.js).\n */\n\n.InfraBlock__ClassicType5 {\n  --lm-ease: cubic-bezier(.2, .7, .1, 1);\n  --lm-accent: var(--ui-main-color, #6A31EB);\n}\n\n/* ---------- 1. Табы категорий: каскад + живой hover ---------- */\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Control .ClassicTabs__item {\n  opacity: 0;\n  transform: translateY(14px) scale(.96);\n  transition:\n    opacity .5s var(--lm-ease),\n    transform .6s var(--lm-ease);\n  transition-delay: calc(var(--lm-i, 0) * 40ms + 150ms);\n}\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Control[data-lm-in] .ClassicTabs__item {\n  opacity: 1;\n  transform: none;\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton {\n  transition:\n    background-color .3s, color .3s,\n    transform .35s var(--lm-ease),\n    box-shadow .35s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton:not(.--is-active):hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px -8px var(--ui-main-color-32, rgba(106, 49, 235, .32));\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton svg {\n  transition: transform .4s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton:hover svg {\n  transform: scale(1.18) rotate(-6deg);\n}\n\n/* ---------- 2. Карта: раскрывается из «карточки» на всю ширину ---------- */\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Map {\n  clip-path: inset(6% 7% round var(--map-border-radius, 24px));\n  transition: clip-path 1.2s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Map[data-lm-in] {\n  clip-path: inset(0 0 round 0);\n}\n\n/* ---------- 3. Карточки «Элемент N»: линия-акцент + каскад ---------- */\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage {\n  position: relative;\n  padding-top: 20px;\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::before,\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  border-radius: 2px;\n}\n\n/* серая «дорожка» */\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::before {\n  background: var(--ui-font-black-color-8, rgba(7, 7, 31, .08));\n}\n\n/* акцентная линия, прорисовывается слева направо */\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::after {\n  background: var(--lm-accent);\n  transform-origin: left center;\n  transform: scaleX(.18);\n  transition: transform .7s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage:hover::after {\n  transform: scaleX(1);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage h3 {\n  transition: color .3s, transform .45s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage:hover h3 {\n  color: var(--lm-accent);\n  transform: translateX(4px);\n}\n\n[data-lm-ready] .InfraBlock__ClassicType5__Advantage {\n  opacity: 0;\n  transform: translateY(24px);\n  transition:\n    opacity .6s var(--lm-ease),\n    transform .8s var(--lm-ease);\n  transition-delay: calc(var(--lm-i, 0) * 90ms);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage {\n  opacity: 1;\n  transform: none;\n}\n\n/* при появлении линия-акцент «пробегает» до своей базовой длины */\n[data-lm-ready] .InfraBlock__ClassicType5__Advantage::after {\n  transform: scaleX(0);\n  transition-delay: calc(var(--lm-i, 0) * 90ms + 250ms);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage::after {\n  transform: scaleX(.18);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage:hover::after {\n  transform: scaleX(1);\n  transition-delay: 0s;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .InfraBlock__ClassicType5 *,\n  .InfraBlock__ClassicType5 *::before,\n  .InfraBlock__ClassicType5 *::after {\n    transition: none !important;\n  }\n}\n", "js": "/*\n * InfraBlock__ClassicType5 — блок «Инфраструктура»\n * Каскадное появление табов категорий и карточек «Элемент N», раскрытие карты при скролле.\n *\n * Правило: классы на элементах Vue не трогаем (Vue их перезапишет) — только data-атрибуты и CSS-переменные.\n */\nwindow.LiteMods && LiteMods.register('InfraBlock__ClassicType5', function (root, ctx) {\n  if (ctx.reducedMotion) return;\n\n  var control = ctx.$('.InfraBlock__ClassicType5__Control');\n  var advantages = ctx.part('advantages');\n  var map = ctx.$('.InfraBlock__ClassicType5__Map');\n\n  ctx.$$('.ClassicTabs__item').forEach(function (li, i) {\n    li.style.setProperty('--lm-i', i);\n  });\n  ctx.$$('.InfraBlock__ClassicType5__Advantage').forEach(function (el, i) {\n    el.style.setProperty('--lm-i', i);\n  });\n\n  // Прячем элементы только когда скрипт точно отработал — без JS блок выглядит как в оригинале\n  root.setAttribute('data-lm-ready', '');\n\n  ctx.inView([control, advantages], function (el) {\n    el.setAttribute('data-lm-in', '');\n  });\n  ctx.inView(map, function (el) {\n    el.setAttribute('data-lm-in', '');\n  }, { threshold: 0.05 });\n});\n"}, "ObjectGalleryA__ClassicType23": {"css": "/*\n * ObjectGalleryA__ClassicType23 — главный экран\n * Анимации — через @keyframes (перебивают transition платформы у IdaAppear на время проигрывания).\n * Всё «скрытое» — только под атрибутами, которые ставит script.js.\n */\n\n.ObjectGalleryA__ClassicType23 {\n  --lm-ease: cubic-bezier(.2, .7, .1, 1);\n  --lm-scroll: 0;\n  position: relative;\n}\n\n/* ---------- 1. Ken Burns: медленный наезд на фото ---------- */\n\n@keyframes lm-hero-kb {\n  from { transform: scale(1); }\n  to   { transform: scale(1.08); }\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-kb] .ObjectGalleryA__ClassicType23__Slide__image .IdaImage__wrapper {\n  animation: lm-hero-kb 9s cubic-bezier(.25, .1, .25, 1) var(--lm-kb-delay, 0ms) both;\n  transform-origin: 60% 45%;\n}\n\n/* ---------- 2. Параллакс (переменную --lm-scroll ставит script.js только на десктопе) ---------- */\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__image {\n  transform: translate3d(0, calc(var(--lm-scroll) * 28%), 0);\n  will-change: transform;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__contentWrapper {\n  opacity: calc(1 - var(--lm-scroll) * 1.8);\n  transform: translate3d(0, calc(var(--lm-scroll) * -90px), 0);\n}\n\n/* ---------- 3. Смена текста слайда ---------- */\n\n@keyframes lm-hero-title {\n  from { clip-path: inset(-20% -5% 100% -5%); transform: translateY(36px); opacity: 0; }\n  20%  { opacity: 1; }\n  to   { clip-path: inset(-20% -5% -20% -5%); transform: none; opacity: 1; }\n}\n\n@keyframes lm-hero-rise {\n  from { transform: translateY(24px); opacity: 0; }\n  to   { transform: none; opacity: 1; }\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-text]:not([data-lm-text-done]) .ObjectGalleryA__ClassicType23__Slide__title {\n  animation: lm-hero-title 1.1s var(--lm-ease) .25s both;\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-text]:not([data-lm-text-done]) .ObjectGalleryA__ClassicType23__Slide__text {\n  animation: lm-hero-rise .9s var(--lm-ease) .55s both;\n}\n\n.ObjectGalleryA__ClassicType23 [data-lm-text]:not([data-lm-text-done]) .ObjectGalleryA__ClassicType23__Slide__buttonWrapper {\n  animation: lm-hero-rise .9s var(--lm-ease) .75s both;\n}\n\n/* ---------- 5. Автопрокрутка: полоска-таймер ---------- */\n\n@keyframes lm-hero-progress {\n  from { transform: scaleX(0); }\n  to   { transform: scaleX(1); }\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-auto] .ObjectGalleryA__ClassicType23__Controls__bullets .swiper-pagination-bullet {\n  position: relative;\n  overflow: hidden;\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-auto] .ObjectGalleryA__ClassicType23__Controls__bullets .swiper-pagination-bullet.--is-active::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: var(--ui-base-white-color, #FCFCFC);\n  transform-origin: left center;\n  animation: lm-hero-progress var(--lm-autoplay, 6000ms) linear both;\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-paused] .ObjectGalleryA__ClassicType23__Controls__bullets .swiper-pagination-bullet.--is-active::after {\n  animation-play-state: paused;\n}\n\n/* «Перелистывание» цифры счётчика */\n@keyframes lm-hero-flip {\n  from { transform: translateY(60%); opacity: 0; }\n  to   { transform: none; opacity: 1; }\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Controls__currentValue {\n  display: inline-block;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Controls__currentValue[data-lm-flip] {\n  animation: lm-hero-flip .5s var(--lm-ease) both;\n}\n\n/* ---------- 6. Карточки внизу ---------- */\n\n@keyframes lm-hero-card {\n  from { transform: translateY(40px); opacity: 0; }\n  to   { transform: none; opacity: 1; }\n}\n\n.ObjectGalleryA__ClassicType23[data-lm-cards] .ObjectGalleryA__ClassicType23__Card {\n  animation: lm-hero-card .9s var(--lm-ease) both;\n  animation-delay: calc(1s + var(--lm-i, 0) * 120ms);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card__wrapper {\n  transition:\n    transform .45s var(--lm-ease),\n    box-shadow .45s var(--lm-ease);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card:hover .ObjectGalleryA__ClassicType23__Card__wrapper {\n  transform: translateY(-6px);\n  box-shadow: 0 18px 40px -18px rgba(7, 7, 31, .45);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card__image,\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card__icon {\n  transition: transform .6s var(--lm-ease);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card:hover .ObjectGalleryA__ClassicType23__Card__image {\n  transform: scale(1.1);\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Card:hover .ObjectGalleryA__ClassicType23__Card__icon {\n  transform: scale(1.15) rotate(-8deg);\n}\n\n/* ---------- 7. Магнитные кнопки + блик ---------- */\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button,\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__secondButton {\n  translate: var(--lm-mx, 0px) var(--lm-my, 0px);\n  transition:\n    translate .35s var(--lm-ease),\n    background-color .3s, color .3s, border-color .3s;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button {\n  position: relative;\n  overflow: hidden;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: -60%;\n  width: 45%;\n  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .45), transparent);\n  transform: skewX(-20deg);\n  pointer-events: none;\n}\n\n.ObjectGalleryA__ClassicType23 .ObjectGalleryA__ClassicType23__Slide__button:hover::after {\n  left: 130%;\n  transition: left .7s var(--lm-ease);\n}\n\n/* ---------- 8. Подсказка «листайте вниз» ---------- */\n\n@keyframes lm-hero-wheel {\n  0%   { transform: translateY(0); opacity: 1; }\n  70%  { transform: translateY(10px); opacity: 0; }\n  100% { transform: translateY(0); opacity: 0; }\n}\n\n@keyframes lm-hero-hint-in {\n  from { opacity: 0; transform: translateY(12px); }\n  to   { opacity: 1; transform: none; }\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint {\n  position: absolute;\n  right: 40px;\n  top: 300px;\n  z-index: 5;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  color: var(--ui-base-white-color, #FCFCFC);\n  pointer-events: none;\n  animation: lm-hero-hint-in .8s var(--lm-ease) 1.6s both;\n  transition: opacity .4s, transform .4s var(--lm-ease);\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint[data-lm-hidden] {\n  opacity: 0 !important;\n  transform: translateY(12px);\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint__mouse {\n  width: 22px;\n  height: 34px;\n  border: 1.5px solid currentColor;\n  border-radius: 12px;\n  display: flex;\n  justify-content: center;\n  padding-top: 6px;\n  box-sizing: border-box;\n  opacity: .85;\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint__wheel {\n  width: 3px;\n  height: 7px;\n  border-radius: 2px;\n  background: currentColor;\n  animation: lm-hero-wheel 1.6s ease-in-out infinite;\n}\n\n.ObjectGalleryA__ClassicType23 .lm-hero-hint__label {\n  font-size: 11px;\n  letter-spacing: .14em;\n  text-transform: uppercase;\n  opacity: .7;\n  writing-mode: vertical-rl;\n}\n", "js": "/*\n * ObjectGalleryA__ClassicType23 — главный экран (полноэкранный слайдер)\n * 1. Медленный наезд на фото активного слайда (Ken Burns)\n * 2. Параллакс при скролле (только десктоп)\n * 3. Кинематографичная смена текста слайда\n * 5. Автопрокрутка: полоска активного слайда заполняется как таймер, пауза при наведении\n *    + «перелистывание» цифры счётчика\n * 6. Карточки внизу: каскадное появление и живой hover\n * 7. «Магнитные» кнопки и блик на основной кнопке (только десктоп с мышью)\n * 8. Подсказка «листайте вниз» (только десктоп)\n *\n * Swiper платформы зациклен вручную: слайды [копия 3, 1, 2, 3, копия 1]. С копии на настоящий\n * слайд платформа прыгает мгновенно (setTransition 0) — такие прыжки не считаются сменой слайда.\n */\nwindow.LiteMods && LiteMods.register('ObjectGalleryA__ClassicType23', function (root, ctx) {\n  if (ctx.reducedMotion) return;\n\n  var P = '.ObjectGalleryA__ClassicType23__';\n  var AUTOPLAY_MS = 6000;\n  var desktop = !!ctx.$('.--is-desktop');\n  var mouse = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;\n\n  var container = ctx.$(P + 'Gallery__slider .swiper-container');\n  if (!container) return;\n\n  // Swiper платформа запускает лениво (на мобилке — когда блок отрисован), ждём до 30 секунд\n  (function waitSwiper(tries) {\n    if (container.swiper) return init(container.swiper);\n    if (tries > 300) return ctx.log('swiper не найден');\n    setTimeout(function () { waitSwiper(tries + 1); }, 100);\n  })(0);\n\n  function init(sw) {\n    root.setAttribute('data-lm-ready', '');\n    root.style.setProperty('--lm-autoplay', AUTOPLAY_MS + 'ms');\n\n    // ---------- 1 + 3: фото и текст активного слайда ----------\n    var kbStart = 0;\n    var lastDuration = sw.params.speed;\n\n    function restart(el, attr) {\n      el.removeAttribute(attr);\n      void el.offsetWidth; // перезапуск CSS-анимации\n      el.setAttribute(attr, '');\n    }\n\n    function activate(slide, isJump) {\n      if (!slide) return;\n      if (isJump) {\n        // Прыжок с копии: продолжаем наезд с того же места, текст не переигрываем\n        slide.style.setProperty('--lm-kb-delay', -(performance.now() - kbStart) + 'ms');\n        slide.setAttribute('data-lm-kb', '');\n        slide.setAttribute('data-lm-text-done', '');\n        return;\n      }\n      kbStart = performance.now();\n      slide.style.setProperty('--lm-kb-delay', '0ms');\n      restart(slide, 'data-lm-kb');\n      slide.removeAttribute('data-lm-text-done');\n      restart(slide, 'data-lm-text');\n    }\n\n    function cleanupInactive() {\n      [].forEach.call(sw.slides, function (s, i) {\n        if (i === sw.activeIndex) return;\n        s.removeAttribute('data-lm-kb');\n        s.removeAttribute('data-lm-text');\n      });\n    }\n\n    sw.on('setTransition', function (a, b) {\n      lastDuration = typeof a === 'number' ? a : b;\n    });\n    sw.on('slideChangeTransitionStart', function () {\n      activate(sw.slides[sw.activeIndex], lastDuration === 0);\n    });\n    sw.on('slideChangeTransitionEnd', cleanupInactive);\n\n    activate(sw.slides[sw.activeIndex], false);\n\n    // ---------- 5: автопрокрутка, синхронная с полоской-таймером ----------\n    var next = ctx.$(P + 'Controls .--right-direction');\n    var bullets = ctx.$(P + 'Controls__bullets');\n    var counter = ctx.$(P + 'Controls__currentValue');\n\n    if (next && bullets) {\n      root.setAttribute('data-lm-auto', '');\n\n      // Конец анимации заполнения полоски (::after) = пора листать\n      bullets.addEventListener('animationend', function (e) {\n        if (e.animationName !== 'lm-hero-progress') return;\n        var before = counter ? counter.textContent : '';\n        next.click();\n        // Если платформа только перепрыгнула с копии на оригинал — листаем ещё раз\n        setTimeout(function () {\n          if (counter && counter.textContent === before && !sw.animating) next.click();\n        }, 80);\n      });\n\n      var hovered = false;\n      var visible = true;\n      function syncPause() {\n        if (hovered || !visible) root.setAttribute('data-lm-paused', '');\n        else root.removeAttribute('data-lm-paused');\n      }\n      if (mouse) {\n        root.addEventListener('mouseenter', function () { hovered = true; syncPause(); });\n        root.addEventListener('mouseleave', function () { hovered = false; syncPause(); });\n      }\n      if ('IntersectionObserver' in window) {\n        new IntersectionObserver(function (entries) {\n          visible = entries[0].isIntersecting;\n          syncPause();\n        }, { threshold: 0.4 }).observe(root);\n      }\n    }\n\n    // Цифра счётчика «перелистывается» при смене слайда\n    if (counter && 'MutationObserver' in window) {\n      new MutationObserver(function () { restart(counter, 'data-lm-flip'); })\n        .observe(counter, { childList: true, characterData: true, subtree: true });\n    }\n\n    // ---------- 6: карточки ----------\n    ctx.$$(P + 'Card').forEach(function (card, i) {\n      card.style.setProperty('--lm-i', i);\n    });\n    root.setAttribute('data-lm-cards', '');\n\n    if (!desktop) return; // дальше — только десктоп\n\n    // ---------- 2: параллакс ----------\n    var ticking = false;\n    function onScroll() {\n      if (ticking) return;\n      ticking = true;\n      requestAnimationFrame(function () {\n        ticking = false;\n        var r = root.getBoundingClientRect();\n        var p = Math.min(Math.max(-r.top / r.height, 0), 1);\n        root.style.setProperty('--lm-scroll', p.toFixed(4));\n        if (hint) hint.toggleAttribute('data-lm-hidden', window.scrollY > 40);\n      });\n    }\n\n    // ---------- 8: подсказка «листайте вниз» ----------\n    var hint = document.createElement('div');\n    hint.className = 'lm-hero-hint';\n    hint.setAttribute('aria-hidden', 'true');\n    hint.innerHTML = '<span class=\"lm-hero-hint__mouse\"><span class=\"lm-hero-hint__wheel\"></span></span>' +\n      '<span class=\"lm-hero-hint__label\">Листайте</span>';\n    root.appendChild(hint);\n\n    window.addEventListener('scroll', onScroll, { passive: true });\n    onScroll();\n\n    // ---------- 7: магнитные кнопки ----------\n    if (!mouse) return;\n    var RADIUS = 110;\n    var MAX = 8;\n    root.addEventListener('mousemove', function (e) {\n      var active = sw.slides[sw.activeIndex];\n      if (!active) return;\n      [].forEach.call(active.querySelectorAll(P + 'Slide__button, ' + P + 'Slide__secondButton'), function (btn) {\n        var r = btn.getBoundingClientRect();\n        var dx = e.clientX - (r.left + r.width / 2);\n        var dy = e.clientY - (r.top + r.height / 2);\n        var near = Math.hypot(dx, dy) < RADIUS + r.width / 2;\n        btn.style.setProperty('--lm-mx', near ? Math.max(-MAX, Math.min(MAX, dx * 0.18)).toFixed(1) + 'px' : '0px');\n        btn.style.setProperty('--lm-my', near ? Math.max(-MAX, Math.min(MAX, dy * 0.3)).toFixed(1) + 'px' : '0px');\n      });\n    });\n    root.addEventListener('mouseleave', function () {\n      ctx.$$(P + 'Slide__button, ' + P + 'Slide__secondButton').forEach(function (btn) {\n        btn.style.setProperty('--lm-mx', '0px');\n        btn.style.setProperty('--lm-my', '0px');\n      });\n    });\n  }\n});\n"}}};
/*
 * lite-mods loader — подключается ОДИН раз в админке Ида.Лайт:
 *   <script src="https://asermiajko.github.io/lite-mods/loader.js" defer></script>
 *
 * Флаги в адресе страницы:
 *   ?dev=1    — черновик: патчи грузятся с http://localhost:3400 (запоминается до закрытия вкладки)
 *   ?dev=0    — выйти из режима черновика
 *   ?nomods=1 — показать страницу без патчей (оригинал платформы)
 */
(function () {
  'use strict';
  if (window.LiteMods) return;

  var DEV_BASE = 'http://localhost:3400/';
  var DEV_KEY = 'litemods-dev';

  var qs = new URLSearchParams(location.search);
  var preview = window.__LITE_MODS_BUNDLE__ && window.__LITE_MODS_BUNDLE__.preview;
  if (qs.get('nomods') === '1' && !preview) {
    console.info('[lite-mods] выключены (?nomods=1)');
    return;
  }

  function session(op, value) {
    try {
      if (op === 'get') return sessionStorage.getItem(DEV_KEY);
      if (op === 'set') sessionStorage.setItem(DEV_KEY, value);
      if (op === 'del') sessionStorage.removeItem(DEV_KEY);
    } catch (e) { /* storage недоступен — работаем без запоминания */ }
    return null;
  }
  if (qs.get('dev') === '1') session('set', '1');
  if (qs.get('dev') === '0') session('del');
  var dev = session('get') === '1' || qs.get('dev') === '1';

  var self = document.currentScript;
  var PROD_BASE = self && self.src ? self.src.replace(/[^/]*$/, '') : 'https://asermiajko.github.io/lite-mods/';
  var BASE = dev ? DEV_BASE : PROD_BASE;

  var registry = {};        // имя блока -> функция патча
  var enabled = {};         // имя блока -> конфиг из манифеста
  var done = new WeakSet(); // корневые элементы, к которым патч уже применён
  var ready = false;        // Nuxt закончил гидратацию
  var reducedMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function log() {
    var args = ['[lite-mods]'].concat([].slice.call(arguments));
    console.info.apply(console, args);
  }

  function makeCtx(root, name) {
    return {
      root: root,
      name: name,
      dev: dev,
      reducedMotion: reducedMotion,
      $: function (sel) { return root.querySelector(sel); },
      $$: function (sel) { return [].slice.call(root.querySelectorAll(sel)); },
      // CSS-модули платформы: "src-components-production-InfraBlock-header-2Jmz" -> part('header')
      part: function (cssModuleName) {
        return root.querySelector('[class*="-' + cssModuleName + '-"]');
      },
      // Вызывает cb(el) один раз, когда элемент попадает в экран
      inView: function (els, cb, opts) {
        els = [].concat(els).filter(Boolean);
        if (!('IntersectionObserver' in window)) { els.forEach(cb); return; }
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); }
          });
        }, opts || { threshold: 0.15 });
        els.forEach(function (el) { io.observe(el); });
      },
      log: function () { log.apply(null, [name].concat([].slice.call(arguments))); }
    };
  }

  function apply() {
    if (!ready) return;
    Object.keys(enabled).forEach(function (name) {
      var fn = registry[name];
      if (!fn) return;
      document.querySelectorAll('.' + name).forEach(function (root) {
        if (done.has(root)) return;
        done.add(root);
        try {
          fn(root, makeCtx(root, name));
        } catch (e) {
          console.error('[lite-mods] ошибка в патче ' + name, e);
        }
      });
    });
  }

  // setTimeout, а не requestAnimationFrame: rAF стоит на паузе в фоновых вкладках
  var scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () { scheduled = false; apply(); }, 16);
  }

  function addCss(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-lite-mods', '');
    document.head.appendChild(link);
  }

  function addJs(src) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.setAttribute('data-lite-mods', '');
    s.onerror = function () { console.error('[lite-mods] не загрузился ' + src); };
    document.head.appendChild(s);
  }

  // Ждём, пока Nuxt 2 оживит серверную разметку: правки до гидратации Vue может затереть
  function whenHydrated(cb) {
    var started = Date.now();
    (function check() {
      if (window.$nuxt || Date.now() - started > 8000) return setTimeout(cb, 50);
      setTimeout(check, 50);
    })();
  }

  window.LiteMods = {
    version: '1',
    dev: dev,
    base: BASE,
    register: function (name, fn) {
      registry[name] = fn;
      scheduleApply();
    },
    blocks: enabled
  };

  // Бандл (dist/*.bundle.js) — всё в одном файле: для вставки прямо в админку и для превью
  var bundle = window.__LITE_MODS_BUNDLE__;
  if (bundle) {
    Object.keys(bundle.manifest.blocks || {}).forEach(function (name) {
      var cfg = bundle.manifest.blocks[name];
      if (!cfg || cfg.enabled === false) return;
      enabled[name] = cfg;
      var files = bundle.files[cfg.path || name] || {};
      if (files.css) {
        var style = document.createElement('style');
        style.setAttribute('data-lite-mods', name);
        style.textContent = files.css;
        document.head.appendChild(style);
      }
      if (files.js) {
        try { new Function(files.js)(); } catch (e) { console.error('[lite-mods] ошибка в патче ' + name, e); }
      }
    });
    log('бандл ' + bundle.manifest.version + ', блоки:', Object.keys(enabled).join(', ') || 'нет');
  } else {
    var bust = dev ? Date.now() : Math.floor(Date.now() / 60000); // манифест обновляется не реже раза в минуту
    fetch(BASE + 'sites/' + location.hostname + '.json?t=' + bust, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (manifest) {
        var v = dev ? Date.now() : manifest.version;
        Object.keys(manifest.blocks || {}).forEach(function (name) {
          var cfg = manifest.blocks[name];
          if (!cfg || cfg.enabled === false) return;
          enabled[name] = cfg;
          var dir = BASE + 'blocks/' + (cfg.path || name) + '/';
          if (cfg.css !== false) addCss(dir + 'style.css?v=' + v);
          if (cfg.js !== false) addJs(dir + 'script.js?v=' + v);
        });
        log((dev ? 'ЧЕРНОВИК (localhost)' : 'бой') + ', блоки:', Object.keys(enabled).join(', ') || 'нет');
      })
      .catch(function (e) {
        console.warn('[lite-mods] манифест для ' + location.hostname + ' не загружен:', e.message);
      });
  }

  whenHydrated(function () {
    ready = true;
    apply();
    // Vue перерисовывает блоки (переходы между страницами, табы) — подхватываем новые
    new MutationObserver(scheduleApply).observe(document.body, { childList: true, subtree: true });
  });
})();
