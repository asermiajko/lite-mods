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

  // Прячем элементы только когда скрипт точно отработал — без JS блок выглядит как в оригинале
  root.setAttribute('data-lm-ready', '');

  ctx.inView([control, advantages], function (el) {
    el.setAttribute('data-lm-in', '');
  });
  ctx.inView(map, function (el) {
    el.setAttribute('data-lm-in', '');
  }, { threshold: 0.05 });
});
