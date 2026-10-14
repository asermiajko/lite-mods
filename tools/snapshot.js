// Снимок структуры блока для агента. Выполнить на странице сайта (javascript_tool / консоль),
// заменив BLOCK на имя блока. Результат сохранить в blocks/<BLOCK>/snapshot.txt.
// Хэши CSS-модулей сокращены: "src-components-production-InfraBlock-header-2Jmz" -> "~InfraBlock-header-2Jmz".
(function (BLOCK) {
  var root = document.querySelector('.' + BLOCK);
  if (!root) return 'блок ' + BLOCK + ' не найден на странице';
  function walk(node, depth) {
    if (depth > 12) return '';
    var out = '';
    [].forEach.call(node.children, function (c) {
      if (/^(svg|g|path|source|ymaps)/i.test(c.tagName) && depth > 3) return;
      var cls = [].map.call(c.classList, function (x) { return x.replace(/^src-components-production-/, '~'); }).join('.');
      var text = c.children.length === 0 ? (c.textContent || '').trim().slice(0, 40) : '';
      out += '  '.repeat(depth) + c.tagName.toLowerCase() + (cls ? '.' + cls : '') + (text ? ' "' + text + '"' : '') + '\n';
      out += walk(c, depth + 1);
    });
    return out;
  }
  var desktop = !!root.querySelector('.--is-desktop');
  return '# ' + BLOCK + ' — ' + location.href + ' — ' + (desktop ? 'desktop' : 'mobile') + ' ' + innerWidth + 'px\n'
    + 'section.' + BLOCK + '\n' + walk(root, 1);
})('BLOCK');
