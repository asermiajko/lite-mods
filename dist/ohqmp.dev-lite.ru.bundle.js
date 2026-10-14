window.__LITE_MODS_BUNDLE__ = {"manifest": {"version": "0", "blocks": {"InfraBlock__ClassicType5": {"enabled": true}}}, "files": {"InfraBlock__ClassicType5": {"css": "/*\n * InfraBlock__ClassicType5 — блок «Инфраструктура»\n * Всё строго внутри .InfraBlock__ClassicType5. Цвета — из переменных темы --ui-*.\n * Скрытие «до появления» работает только при [data-lm-ready] (его ставит script.js).\n */\n\n.InfraBlock__ClassicType5 {\n  --lm-ease: cubic-bezier(.2, .7, .1, 1);\n  --lm-accent: var(--ui-main-color, #6A31EB);\n}\n\n/* ---------- 1. Табы категорий: каскад + живой hover ---------- */\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Control .ClassicTabs__item {\n  opacity: 0;\n  transform: translateY(14px) scale(.96);\n  transition:\n    opacity .5s var(--lm-ease),\n    transform .6s var(--lm-ease);\n  transition-delay: calc(var(--lm-i, 0) * 40ms + 150ms);\n}\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Control[data-lm-in] .ClassicTabs__item {\n  opacity: 1;\n  transform: none;\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton {\n  transition:\n    background-color .3s, color .3s,\n    transform .35s var(--lm-ease),\n    box-shadow .35s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton:not(.--is-active):hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px -8px var(--ui-main-color-32, rgba(106, 49, 235, .32));\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton svg {\n  transition: transform .4s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .ClassicTabs__item .IdaButton:hover svg {\n  transform: scale(1.18) rotate(-6deg);\n}\n\n/* ---------- 2. Карта: раскрывается из «карточки» на всю ширину ---------- */\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Map {\n  clip-path: inset(6% 7% round var(--map-border-radius, 24px));\n  transition: clip-path 1.2s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5[data-lm-ready] .InfraBlock__ClassicType5__Map[data-lm-in] {\n  clip-path: inset(0 0 round 0);\n}\n\n/* ---------- 3. Карточки «Элемент N»: линия-акцент + каскад ---------- */\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage {\n  position: relative;\n  padding-top: 20px;\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::before,\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  border-radius: 2px;\n}\n\n/* серая «дорожка» */\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::before {\n  background: var(--ui-font-black-color-8, rgba(7, 7, 31, .08));\n}\n\n/* акцентная линия, прорисовывается слева направо */\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage::after {\n  background: var(--lm-accent);\n  transform-origin: left center;\n  transform: scaleX(.18);\n  transition: transform .7s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage:hover::after {\n  transform: scaleX(1);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage h3 {\n  transition: color .3s, transform .45s var(--lm-ease);\n}\n\n.InfraBlock__ClassicType5 .InfraBlock__ClassicType5__Advantage:hover h3 {\n  color: var(--lm-accent);\n  transform: translateX(4px);\n}\n\n[data-lm-ready] .InfraBlock__ClassicType5__Advantage {\n  opacity: 0;\n  transform: translateY(24px);\n  transition:\n    opacity .6s var(--lm-ease),\n    transform .8s var(--lm-ease);\n  transition-delay: calc(var(--lm-i, 0) * 90ms);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage {\n  opacity: 1;\n  transform: none;\n}\n\n/* при появлении линия-акцент «пробегает» до своей базовой длины */\n[data-lm-ready] .InfraBlock__ClassicType5__Advantage::after {\n  transform: scaleX(0);\n  transition-delay: calc(var(--lm-i, 0) * 90ms + 250ms);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage::after {\n  transform: scaleX(.18);\n}\n\n[data-lm-ready] [data-lm-in] .InfraBlock__ClassicType5__Advantage:hover::after {\n  transform: scaleX(1);\n  transition-delay: 0s;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .InfraBlock__ClassicType5 *,\n  .InfraBlock__ClassicType5 *::before,\n  .InfraBlock__ClassicType5 *::after {\n    transition: none !important;\n  }\n}\n", "js": "/*\n * InfraBlock__ClassicType5 — блок «Инфраструктура»\n * Каскадное появление табов категорий и карточек «Элемент N», раскрытие карты при скролле.\n *\n * Правило: классы на элементах Vue не трогаем (Vue их перезапишет) — только data-атрибуты и CSS-переменные.\n */\nwindow.LiteMods && LiteMods.register('InfraBlock__ClassicType5', function (root, ctx) {\n  if (ctx.reducedMotion) return;\n\n  var control = ctx.$('.InfraBlock__ClassicType5__Control');\n  var advantages = ctx.part('advantages');\n  var map = ctx.$('.InfraBlock__ClassicType5__Map');\n\n  ctx.$$('.ClassicTabs__item').forEach(function (li, i) {\n    li.style.setProperty('--lm-i', i);\n  });\n  ctx.$$('.InfraBlock__ClassicType5__Advantage').forEach(function (el, i) {\n    el.style.setProperty('--lm-i', i);\n  });\n\n  // Прячем элементы только когда скрипт точно отработал — без JS блок выглядит как в оригинале\n  root.setAttribute('data-lm-ready', '');\n\n  ctx.inView([control, advantages], function (el) {\n    el.setAttribute('data-lm-in', '');\n  });\n  ctx.inView(map, function (el) {\n    el.setAttribute('data-lm-in', '');\n  }, { threshold: 0.05 });\n});\n"}}};
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
  if (qs.get('nomods') === '1') {
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

  var scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { scheduled = false; apply(); });
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
