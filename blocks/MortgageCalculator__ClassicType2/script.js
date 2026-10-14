/*
 * MortgageCalculator__ClassicType2 → «Ипотечный навигатор» (замена штатного калькулятора)
 *
 * Данные — то же API, что у платформы: /api/mortgage/offers/published (+ /specs), заголовок x-host.
 *  - без параметров API отдаёт ВСЕ предложения → считаем доступность и платежи сами, мгновенно;
 *  - стандартные предложения: аннуитет по ставке и сроку из фильтра (совпадает с платформой до рубля);
 *  - транши (type: tranche): точные платежи берём у API с текущими параметрами (с задержкой 300 мс).
 * Штатный блок не удаляем: прячем его контент (заголовок остаётся), кнопка «Оставить заявку» жмёт штатную.
 * Если данные не загрузились — ничего не прячем, работает штатный калькулятор.
 */
window.LiteMods && LiteMods.register('MortgageCalculator__ClassicType2', function (root, ctx) {
  var API = '/api/mortgage/offers/published';
  var VISIBLE_ROWS = 6;
  var vm = root.__vue__ || {};
  var props = vm.$props || {};
  var container = ctx.$('[class*="MortgageCalculator-container-"]');
  var nuxt = window.$nuxt;
  if (!container || !nuxt) return;

  var site = nuxt.$store && nuxt.$store.state.site || {};
  var projectId = site.project && site.project.id;
  if (!projectId) return ctx.log('нет project_id');

  // ---------- запросы ----------
  function propertyTypes() {
    if (props.property_types && props.property_types.length) return props.property_types;
    if (!props.property_type || props.property_type === 'residential') return ['flat', 'apartment'];
    return [props.property_type];
  }

  function query(extra) {
    var p = new URLSearchParams();
    p.append('project_id', projectId);
    propertyTypes().forEach(function (t) { p.append('property_type', t); });
    if (props.complex_id) p.append('complex_id', props.complex_id);
    (props.program_ids || []).forEach(function (id) { p.append('program_id', id); });
    Object.keys(extra || {}).forEach(function (k) { p.append(k, extra[k]); });
    return p.toString();
  }

  function get(path, extra) {
    return fetch(API + path + '?' + query(extra), { headers: { 'x-host': location.host } })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
  }

  // ---------- форматирование и расчёты ----------
  function rub(n) { return Math.round(n).toLocaleString('ru-RU') + ' ₽'; }
  function num(n) { return Math.round(n).toLocaleString('ru-RU'); }
  function years(n) {
    var m10 = n % 10, m100 = n % 100;
    var w = m10 === 1 && m100 !== 11 ? 'год' : (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'года' : 'лет');
    return n + ' ' + w;
  }
  // «до 21 года», «от 5 лет» — родительный падеж
  function yearsGen(n) {
    return n + ' ' + (n % 10 === 1 && n % 100 !== 11 ? 'года' : 'лет');
  }
  function annuity(credit, rate, termYears) {
    var r = rate / 100 / 12, n = termYears * 12;
    if (!r) return credit / n;
    return credit * r / (1 - Math.pow(1 + r, -n));
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function staticUrl(path) {
    if (!path) return '';
    try { if (nuxt.$static && nuxt.$static.gen) return nuxt.$static.gen(path); } catch (e) { /* fallback ниже */ }
    return 'https://cdn.idalite.ru/s' + path;
  }
  function monthYear(iso) {
    var d = new Date(iso);
    return isNaN(d) ? '' : ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
  }

  // ---------- состояние ----------
  var specs, offers, complexes = [];
  var trancheApi = {}; // id → { payment, special_payment, overpayment } для текущих параметров
  var platformValues = vm.$data && vm.$data.values || {};
  var state = {
    complex: props.complex_id || '',
    price: 0,
    deposit: 0,
    term: 0,
    sort: 'payment',
    showAll: false
  };

  Promise.all([get('/specs'), get('')]).then(function (res) {
    specs = res[0];
    offers = Array.isArray(res[1]) ? res[1] : [];
    if (!offers.length) throw new Error('пустой список предложений');
    complexes = specs.complex_id || [];
    state.price = clamp(platformValues.price || specs.price.initial || specs.price.min, specs.price.min, specs.price.max);
    state.deposit = clamp(platformValues.deposit || specs.deposit.initial || specs.deposit.min, specs.deposit.min, specs.deposit.max);
    state.term = clamp(platformValues.term || specs.term.initial || 20, specs.term.min, specs.term.max);
    mount();
  }).catch(function (e) {
    ctx.log('навигатор не запущен, остаётся штатный калькулятор:', e.message);
  });

  function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }

  // ---------- расчёт предложений ----------
  function evaluate(o) {
    var credit = state.price * (1 - state.deposit / 100);
    var tranche = o.type === 'tranche' && o.special_min_rate;
    var res = { o: o, credit: credit, tranche: !!tranche, issues: [] };

    if (state.deposit < o.min_deposit) {
      res.issues.push({ kind: 'deposit', value: o.min_deposit,
        text: 'Нужен взнос от ' + o.min_deposit + '% — ещё ' + rub((o.min_deposit - state.deposit) / 100 * state.price),
        action: 'Взнос ' + o.min_deposit + '%' });
    }
    if (o.max_term && state.term > o.max_term) {
      res.issues.push({ kind: 'term', value: o.max_term, text: 'Срок до ' + yearsGen(o.max_term), action: 'Срок ' + years(o.max_term) });
    }
    if (o.min_term && state.term < o.min_term) {
      res.issues.push({ kind: 'term', value: o.min_term, text: 'Срок от ' + yearsGen(o.min_term), action: 'Срок ' + years(o.min_term) });
    }
    if (o.max_credit_amount && credit > o.max_credit_amount) {
      res.issues.push({ kind: 'credit', text: 'Кредит не больше ' + rub(o.max_credit_amount) });
    }
    res.available = !res.issues.length;

    var api = trancheApi[o.id];
    if (tranche) {
      res.firstPayment = api && api.special_payment ? api.special_payment : annuity(credit, o.special_min_rate, state.term);
      res.payment = api && api.payment ? api.payment : annuity(credit, o.min_rate, state.term);
      res.overpayment = api && api.overpayment ? api.overpayment : res.payment * state.term * 12 - credit;
      res.rate = o.min_rate;
    } else {
      res.payment = res.firstPayment = annuity(credit, o.min_rate, state.term);
      res.overpayment = res.payment * state.term * 12 - credit;
      res.rate = o.min_rate;
    }
    // Средний платёж за весь срок: честное сравнение траншей (льготный период короткий)
    res.avgPayment = (credit + res.overpayment) / (state.term * 12);
    return res;
  }

  var SORTS = {
    payment: { label: 'Платёж', key: function (r) { return r.avgPayment; } },
    overpayment: { label: 'Переплата', key: function (r) { return r.overpayment; } },
    rate: { label: 'Ставка', key: function (r) { return r.rate; } },
    deposit: { label: 'Взнос', key: function (r) { return r.o.min_deposit; } }
  };

  function results() {
    var key = SORTS[state.sort].key;
    var list = offers
      .filter(function (o) { return !state.complex || o.complex_id === state.complex; })
      .map(evaluate);

    // По одному лучшему предложению на банк: сначала доступные, затем «ближайшее» недоступное
    var byBank = {};
    list.forEach(function (r) {
      var cur = byBank[r.o.bank];
      if (!cur || better(r, cur)) byBank[r.o.bank] = r;
    });
    function better(a, b) {
      if (a.available !== b.available) return a.available;
      if (!a.available) return a.issues.length < b.issues.length;
      return key(a) < key(b);
    }
    return Object.keys(byBank).map(function (b) { return byBank[b]; }).sort(function (a, b) {
      if (a.available !== b.available) return a.available ? -1 : 1;
      return key(a) - key(b);
    });
  }

  // ---------- разметка ----------
  var app, els = {};

  function mount() {
    app = document.createElement('div');
    app.className = 'lm-mnav';
    app.innerHTML =
      '<div class="lm-mnav__aside">' +
        '<div class="lm-mnav__summary">' +
          '<div class="lm-mnav__summary-label">Ежемесячный платёж</div>' +
          '<div class="lm-mnav__summary-value"><span data-el="pay">—</span><span class="lm-mnav__summary-unit">₽/мес</span></div>' +
          '<div class="lm-mnav__summary-bank" data-el="payBank"></div>' +
          '<dl class="lm-mnav__summary-facts">' +
            '<div><dt>Сумма кредита</dt><dd data-el="credit">—</dd></div>' +
            '<div><dt>Переплата</dt><dd data-el="over">—</dd></div>' +
          '</dl>' +
        '</div>' +
        '<div class="lm-mnav__controls">' +
          (props.complex_id || complexes.length < 2 ? '' :
            '<label class="lm-mnav__field"><span class="lm-mnav__label">Жилой комплекс</span>' +
            '<select class="lm-mnav__select" data-el="complex"><option value="">Все жилые комплексы</option>' +
            complexes.map(function (c) { return '<option value="' + esc(c.id) + '">' + esc(c.name) + '</option>'; }).join('') +
            '</select></label>') +
          field('price', 'Стоимость квартиры', specs.price.min, specs.price.max, 10000) +
          field('deposit', 'Первоначальный взнос', specs.deposit.min, specs.deposit.max, 1) +
          field('term', 'Срок кредита', specs.term.min, specs.term.max, 1) +
        '</div>' +
        '<button type="button" class="lm-mnav__cta" data-el="cta">Оставить заявку</button>' +
        '<p class="lm-mnav__note">Расчёт предварительный. Точные условия — после одобрения банком.</p>' +
      '</div>' +
      '<div class="lm-mnav__main">' +
        '<div class="lm-mnav__toolbar">' +
          '<div class="lm-mnav__count" data-el="count"></div>' +
          '<div class="lm-mnav__sort" role="tablist" aria-label="Сортировка">' +
            Object.keys(SORTS).map(function (k) {
              return '<button type="button" role="tab" data-sort="' + k + '">' + SORTS[k].label + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<ol class="lm-mnav__list" data-el="list"></ol>' +
        '<button type="button" class="lm-mnav__more" data-el="more"></button>' +
      '</div>';

    function field(name, label, min, max, step) {
      return '<div class="lm-mnav__field" data-field="' + name + '">' +
        '<div class="lm-mnav__field-head"><span class="lm-mnav__label">' + label + '</span>' +
        '<span class="lm-mnav__field-extra" data-el="' + name + 'Extra"></span></div>' +
        '<input class="lm-mnav__input" data-el="' + name + 'Input" inputmode="numeric" autocomplete="off">' +
        '<input class="lm-mnav__range" type="range" data-el="' + name + 'Range" min="' + min + '" max="' + max + '" step="' + step + '">' +
        '</div>';
    }

    [].forEach.call(app.querySelectorAll('[data-el]'), function (el) { els[el.getAttribute('data-el')] = el; });

    // Ползунки
    ['price', 'deposit', 'term'].forEach(function (name) {
      els[name + 'Range'].addEventListener('input', function () {
        state[name] = +this.value;
        update({ keepInput: false });
      });
      var input = els[name + 'Input'];
      input.addEventListener('focus', function () { this.select(); });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') this.blur(); });
      input.addEventListener('blur', function () {
        var lim = specs[name];
        var v = name === 'deposit' ? depositFromInput(this.value) : parseInt(this.value.replace(/\D/g, ''), 10);
        if (!isNaN(v)) state[name] = clamp(v, lim.min, lim.max);
        update({});
      });
    });

    if (els.complex) {
      els.complex.value = state.complex;
      els.complex.addEventListener('change', function () { state.complex = this.value; update({}); });
    }

    app.querySelector('.lm-mnav__sort').addEventListener('click', function (e) {
      var b = e.target.closest('[data-sort]');
      if (!b) return;
      state.sort = b.getAttribute('data-sort');
      update({});
    });

    els.more.addEventListener('click', function () { state.showAll = !state.showAll; render(); });

    // «Подставить» из подсказки недоступного предложения
    els.list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-fix]');
      if (!b) return;
      state[b.getAttribute('data-fix')] = +b.getAttribute('data-value');
      update({});
    });

    els.cta.addEventListener('click', function () {
      var original = ctx.$('[class*="MortgageCalculator-formWrapper-"] > .IdaButton');
      if (original) original.click();
    });

    container.appendChild(app);
    root.setAttribute('data-lm-nav', '');
    update({});
  }

  // ---------- обновление ----------
  var trancheTimer;
  function update() {
    syncControls();
    render();
    clearTimeout(trancheTimer);
    trancheTimer = setTimeout(refreshTranches, 300);
  }

  function syncControls() {
    var lim = { price: specs.price, deposit: specs.deposit, term: specs.term };
    ['price', 'deposit', 'term'].forEach(function (name) {
      var range = els[name + 'Range'];
      range.value = state[name];
      range.style.setProperty('--lm-p', ((state[name] - lim[name].min) / (lim[name].max - lim[name].min) * 100).toFixed(2) + '%');
      if (document.activeElement !== els[name + 'Input']) {
        els[name + 'Input'].value = name === 'price' ? num(state.price) + ' ₽' : name === 'deposit' ? num(state.deposit / 100 * state.price) + ' ₽' : years(state.term);
      }
    });
    els.depositExtra.textContent = state.deposit + '%';
    els.priceExtra.textContent = '';
    els.termExtra.textContent = '';
    [].forEach.call(app.querySelectorAll('[data-sort]'), function (b) {
      b.setAttribute('aria-selected', b.getAttribute('data-sort') === state.sort ? 'true' : 'false');
    });
  }

  // Поле взноса показывает рубли, но ввод — в процентах или рублях
  function depositFromInput(raw) {
    var v = parseInt(raw.replace(/\D/g, ''), 10);
    if (isNaN(v)) return state.deposit;
    return v > 100 ? Math.round(v / state.price * 100) : v;
  }

  function render() {
    var list = results();
    var available = list.filter(function (r) { return r.available; });
    var best = available[0];
    var maxPay = Math.max.apply(null, list.map(function (r) { return r.firstPayment; }));

    tweenNumber(els.pay, best ? best.firstPayment : 0);
    els.payBank.innerHTML = best
      ? 'в банке <b>' + esc(best.o.bank) + '</b>, ставка ' + (best.tranche
        ? best.o.special_min_rate + '% до ' + monthYear(best.o.first_tranche_end) + ', затем ' + rub(best.payment) + '/мес'
        : best.rate + '%')
      : 'Нет подходящих предложений — измените параметры';
    els.credit.textContent = rub(state.price * (1 - state.deposit / 100));
    els.over.textContent = best ? rub(best.overpayment) : '—';
    els.count.textContent = available.length + ' из ' + list.length + ' банков подходят';

    var shown = state.showAll ? list : list.slice(0, VISIBLE_ROWS);
    var showBadge = available.length > 1;
    els.list.innerHTML = shown.map(function (r, i) { return row(r, showBadge && i === 0 && r.available, maxPay); }).join('');
    els.more.hidden = list.length <= VISIBLE_ROWS;
    els.more.textContent = state.showAll ? 'Свернуть' : 'Показать все банки (' + list.length + ')';
  }

  function row(r, isBest, maxPay) {
    var o = r.o;
    var tag = o.program_name ? esc(o.program_name) : r.tranche ? 'Льготный период' : o.is_special ? 'Спецпредложение' : '';
    var rate = r.tranche
      ? '<b>' + o.special_min_rate + '%</b><small>до ' + monthYear(o.first_tranche_end) + ', затем ' + o.min_rate + '%</small>'
      : '<b>' + r.rate + '%</b><small>до ' + yearsGen(o.max_term) + '</small>';
    var pay = r.tranche
      ? '<b>' + rub(r.firstPayment) + '</b><small>затем ' + rub(r.payment) + '</small>'
      : '<b>' + rub(r.payment) + '</b><small>переплата ' + rub(r.overpayment) + '</small>';
    var issues = r.issues.map(function (is) {
      return '<span class="lm-mnav__issue">' + esc(is.text) +
        (is.action && (is.kind === 'deposit' || is.kind === 'term')
          ? ' <button type="button" data-fix="' + is.kind + '" data-value="' + is.value + '">' + esc(is.action) + '</button>' : '') +
        '</span>';
    }).join('');

    return '<li class="lm-mnav__row' + (r.available ? '' : ' is-off') + (isBest ? ' is-best' : '') + '"' +
      ' style="--lm-bank:' + esc(o.background_color || '#6A31EB') + ';--lm-bar:' + (r.firstPayment / maxPay * 100).toFixed(1) + '%">' +
      '<div class="lm-mnav__bank">' +
        '<span class="lm-mnav__logo"><img src="' + esc(staticUrl(o.color_mini)) + '" alt="" loading="lazy"></span>' +
        '<span class="lm-mnav__bank-name">' + esc(o.bank) +
          (isBest ? '<em class="lm-mnav__badge">Выгоднее всего</em>' : '') +
          (tag ? '<em class="lm-mnav__tag">' + tag + '</em>' : '') +
        '</span>' +
      '</div>' +
      '<div class="lm-mnav__rate">' + rate + '</div>' +
      '<div class="lm-mnav__pay">' + pay + '<span class="lm-mnav__bar"><i></i></span></div>' +
      (issues ? '<div class="lm-mnav__issues">' + issues + '</div>' : '') +
      '</li>';
  }

  // Плавное «перетекание» главной цифры
  var tweenFrom = 0, tweenRaf;
  function tweenNumber(el, to) {
    cancelAnimationFrame(tweenRaf);
    var from = tweenFrom, start = performance.now(), dur = 450;
    if (ctx.reducedMotion || !from) { tweenFrom = to; el.textContent = num(to); return; }
    (function step(now) {
      var t = Math.min((now - start) / dur, 1);
      var v = from + (to - from) * (1 - Math.pow(1 - t, 3));
      tweenFrom = v;
      el.textContent = num(v);
      if (t < 1) tweenRaf = requestAnimationFrame(step);
    })(start);
    // Если вкладка в фоне и rAF стоит — сразу ставим итог
    setTimeout(function () { if (tweenFrom !== to && performance.now() - start > dur + 200) { tweenFrom = to; el.textContent = num(to); } }, dur + 250);
  }

  // Точные платежи по траншам — от API платформы
  function refreshTranches() {
    if (!offers.some(function (o) { return o.type === 'tranche'; })) return;
    var params = { price: Math.round(state.price), deposit: state.deposit, term: state.term, ignore_priority: 'false' };
    if (state.complex && !props.complex_id) params.complex_id = state.complex;
    get('', params).then(function (list) {
      if (!Array.isArray(list)) return;
      trancheApi = {};
      list.forEach(function (o) { if (o.type === 'tranche') trancheApi[o.id] = o; });
      render();
    }).catch(function () { /* остаёмся на приблизительном расчёте */ });
  }
});
