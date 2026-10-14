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
