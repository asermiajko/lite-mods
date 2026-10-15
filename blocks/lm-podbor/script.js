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
    var needs = state.needs.slice();
    var mv = M.MOVE.filter(function (m) { return m.id === state.move; })[0];
    if (mv && mv.need && needs.indexOf(mv.need) < 0) needs.unshift(mv.need);
    return { rooms: s.rooms, areaMin: s.areaMin, budget: state.budgetTo, budgetFrom: state.budgetFrom, needs: needs };
  }

  function ranked() {
    var q = query();
    var list = M.rank(types, q);
    if (q.budgetFrom) {
      list = list.map(function (r) {
        var fl = r.flats.filter(function (f) { return f.price >= q.budgetFrom; });
        return fl.length ? { type: r.type, flats: fl, best: fl[0], value: fl[0].match.value } : null;
      }).filter(Boolean);
    }
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
      '<p class="lmp__panel-lead">Планировка та же, а квартиры разные. Сравнили этаж, тишину, пыль' + (anyLight ? ', свет' : '') + ' и цену под ваш запрос.</p>' +
      '<ol class="lmp__flats">' + r.flats.map(function (f, i) { return flatRow(f, i === 0, r.best, med, anyLight); }).join('') + '</ol>';
    drawer.hidden = false;
    document.documentElement.classList.add('lmp-lock');
    panel.scrollTop = 0;
    panel.focus({ preventScroll: true });
  }

  function bar(score) {
    return '<span class="lmp__bar"><i style="width:' + Math.round(score * 100) + '%"></i></span>';
  }

  function flatRow(f, isBest, best, med, anyLight) {
    var url = flatUrl(f);
    var diff = isBest ? '' : diffText(f, best);
    var dp = med ? Math.round((f.price / med - 1) * 100) : 0;
    var pos = { low: 'нижняя часть дома', mid: 'середина дома', high: 'верхняя часть дома' }[f.floorPos];
    return '<li class="lmp__flat' + (isBest ? ' is-best' : '') + '">' +
      '<div class="lmp__flat-main">' +
        (isBest ? '<span class="lmp__badge">Лучшая для вас</span>' : '') +
        '<p class="lmp__flat-floor">' + f.floor + ' этаж из ' + f.floors + '</p>' +
        '<p class="lmp__flat-meta">' + pos + '</p>' +
        '<p class="lmp__flat-meta">Кв. ' + esc(f.number) + ', ' + esc(buildingLabel(f.building)) + ', ' + area(f.area) + '</p>' +
        (diff ? '<p class="lmp__flat-diff">' + diff + '</p>' : '') +
      '</div>' +
      '<dl class="lmp__factors">' +
        '<div><dt>Тишина</dt><dd>' + f.noise.label + bar(f.noise.score) + '</dd></div>' +
        '<div><dt>Пыль</dt><dd>' + f.dust.label + bar(f.dust.score) + '</dd></div>' +
        (anyLight ? '<div><dt>Свет</dt><dd>' + (f.light ? f.light.label + bar(f.light.score) : 'Не указано') + '</dd></div>' : '') +
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
