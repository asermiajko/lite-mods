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
