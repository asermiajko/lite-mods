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
