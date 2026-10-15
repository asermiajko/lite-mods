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
  root.innerHTML =
    '<div class="lmp">' +
      '<header class="lmp__head">' +
        '<p class="lmp__eyebrow">Подбор квартиры</p>' +
        '<h2 class="lmp__title">Квартира под вашу жизнь</h2>' +
        '<p class="lmp__lead">Расскажите, для кого покупаете — покажем подходящие планировки и объясним, чем отличаются квартиры одного типа.</p>' +
        '<ol class="lmp__steps" data-el="steps"><li>Цель</li><li>Кто будет жить</li><li>Что важно</li><li>Квартиры</li></ol>' +
      '</header>' +
      '<div class="lmp__view" data-el="view"><div class="lmp__loading">Загружаем квартиры…</div></div>' +
      '<div class="lmp__drawer" data-el="drawer" hidden><div class="lmp__drawer-backdrop" data-act="close"></div>' +
        '<aside class="lmp__drawer-panel" role="dialog" aria-modal="true" data-el="panel"></aside></div>' +
    '</div>';

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
