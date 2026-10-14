window.__LITE_MODS_INLINE__ = 'bundle';
/*
 * lite-mods loader — подключается ОДИН раз (в админке Ида.Лайт или в HTML-блоке):
 *   <script src="https://asermiajko.github.io/lite-mods/loader.js" defer></script>
 *
 * Загружает ОДИН файл сайта sites/<hostname>.js — все включённые патчи (собирает tools/build.py).
 * Стили блока подключаются, только когда блок есть на странице.
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

  // Встроенная сборка (dist/*.bundle.js — вставка в админку, dist/*.preview.js — превью агента):
  // патчи идут сразу после загрузчика в том же файле, ничего не скачиваем
  var inline = window.__LITE_MODS_INLINE__;
  var qs = new URLSearchParams(location.search);
  if (qs.get('nomods') === '1' && inline !== 'preview') {
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
  var dev = !inline && (session('get') === '1' || qs.get('dev') === '1');

  var self = document.currentScript;
  var PROD_BASE = self && self.src ? self.src.replace(/[^/]*$/, '') : 'https://asermiajko.github.io/lite-mods/';
  var BASE = dev ? DEV_BASE : PROD_BASE;

  var registry = {};        // имя блока -> функция патча
  var enabled = {};         // имя блока -> { css }
  var injected = {};        // имя блока -> стили уже на странице
  var done = new WeakSet(); // корневые элементы, к которым патч уже применён
  var ready = false;        // Nuxt закончил гидратацию
  var initialRoots = new WeakSet(); // блоки, которые были на странице при её загрузке
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
      // true — блок был на странице с самой загрузки (уже виден посетителю),
      // false — появился позже (переход между страницами, перерисовка Vue)
      initialLoad: initialRoots.has(root),
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

  // Стили — только для блоков, которые есть на странице (и сразу, ещё до гидратации)
  function injectCss() {
    Object.keys(enabled).forEach(function (name) {
      if (injected[name] || !enabled[name].css || !document.querySelector('.' + name)) return;
      injected[name] = true;
      var style = document.createElement('style');
      style.setAttribute('data-lite-mods', name);
      style.textContent = enabled[name].css;
      document.head.appendChild(style);
    });
  }

  function apply() {
    injectCss();
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

  // Ждём, пока Nuxt 2 оживит серверную разметку: правки до гидратации Vue может затереть
  function whenHydrated(cb) {
    var started = Date.now();
    (function check() {
      if (window.$nuxt || Date.now() - started > 8000) return setTimeout(cb, 50);
      setTimeout(check, 50);
    })();
  }

  window.LiteMods = {
    version: '2',
    dev: dev,
    base: BASE,
    blocks: enabled,
    // Вызывается из файла сайта: блок включён, вот его стили
    define: function (name, opts) {
      enabled[name] = opts || {};
      injectCss();
    },
    register: function (name, fn) {
      registry[name] = fn;
      scheduleApply();
    },
    loaded: function (info) {
      log((inline ? 'встроенная сборка' : dev ? 'ЧЕРНОВИК (localhost)' : 'бой') +
        (info && info.version ? ' ' + info.version : '') + ', блоки:', Object.keys(enabled).join(', ') || 'нет');
    }
  };

  if (!inline) {
    // Кэш GitHub Pages — 10 минут; метка раз в минуту, чтобы публикация доходила быстро
    var bust = dev ? Date.now() : Math.floor(Date.now() / 60000);
    var s = document.createElement('script');
    s.src = BASE + 'sites/' + location.hostname + '.js?t=' + bust;
    s.async = true;
    s.setAttribute('data-lite-mods', '');
    s.onerror = function () { console.warn('[lite-mods] нет патчей для ' + location.hostname); };
    document.head.appendChild(s);
  }

  whenHydrated(function () {
    ready = true;
    [].forEach.call(document.querySelectorAll('section[class]'), function (el) { initialRoots.add(el); });
    apply();
    // Vue перерисовывает блоки (переходы между страницами, табы) — подхватываем новые
    new MutationObserver(scheduleApply).observe(document.body, { childList: true, subtree: true });
  });
})();

/* lite-mods: ohqmp.dev-lite.ru, версия 20261014141839 */
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
window.LiteMods && LiteMods.loaded({"version": "20261014141839"});
