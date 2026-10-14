#!/usr/bin/env python3
"""Сборка патчей сайта.

Источник правды — sites/<hostname>.json (какие блоки включены) и blocks/<Блок>/{style.css,script.js}.

Результат:
  sites/<hostname>.js         — ОДИН файл со всеми патчами сайта; его грузит loader.js (публикуется)
  dist/<hostname>.bundle.js   — загрузчик + патчи в одном файле: запасной вариант для вставки в админку
  dist/<hostname>.preview.js  — то же без комментариев и работает поверх ?nomods=1 (превью агента)

Запуск: python3 tools/build.py [hostname]        (без аргумента — все сайты)
        python3 tools/build.py --preview [hostname]  — дополнительно собрать превью
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def strip(code: str) -> str:
    # Сначала строчные комментарии: в них бывает «dist/*.js», что похоже на начало /* … */
    code = re.sub(r"(?m)^\s*//.*$", "", code)
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.S)
    return "\n".join(line.strip() for line in code.splitlines() if line.strip())


def site_patches(site_file: Path, compact: bool = False) -> str:
    manifest = json.loads(site_file.read_text())
    version = manifest.get("version", "")
    parts = [f"/* lite-mods: {site_file.stem}, версия {version} */"]
    for name, cfg in manifest.get("blocks", {}).items():
        if cfg.get("enabled") is False:
            continue
        block_dir = ROOT / "blocks" / cfg.get("path", name)
        css_file, js_file = block_dir / "style.css", block_dir / "script.js"
        css = css_file.read_text() if cfg.get("css", True) and css_file.exists() else ""
        js = js_file.read_text() if cfg.get("js", True) and js_file.exists() else ""
        if compact:
            css, js = strip(css), strip(js)
        parts.append(f"window.LiteMods && LiteMods.define({json.dumps(name)}, {{ css: {json.dumps(css, ensure_ascii=False)} }});")
        if js:
            # Ошибка в одном патче не ломает остальные
            parts.append(f"try {{\n{js}\n}} catch (e) {{ console.error('[lite-mods] ошибка в патче {name}', e); }}")
    parts.append(f"window.LiteMods && LiteMods.loaded({json.dumps({'version': version})});")
    return "\n".join(parts) + "\n"


def build(site_file: Path, preview: bool = False) -> list:
    host = site_file.stem
    out = []

    site_js = ROOT / "sites" / f"{host}.js"
    site_js.write_text(site_patches(site_file))
    out.append(site_js)

    loader = (ROOT / "loader.js").read_text()
    (ROOT / "dist").mkdir(exist_ok=True)
    bundle = ROOT / "dist" / f"{host}.bundle.js"
    bundle.write_text("window.__LITE_MODS_INLINE__ = 'bundle';\n" + loader + "\n" + site_patches(site_file))
    out.append(bundle)

    if preview:
        prev = ROOT / "dist" / f"{host}.preview.js"
        prev.write_text("window.__LITE_MODS_INLINE__ = 'preview';\n" + strip(loader) + "\n" + site_patches(site_file, compact=True))
        out.append(prev)
    return out


if __name__ == "__main__":
    args = sys.argv[1:]
    preview = "--preview" in args
    args = [a for a in args if a != "--preview"]
    sites = sorted((ROOT / "sites").glob("*.json"))
    if args:
        sites = [s for s in sites if s.stem == args[0]]
    for site in sites:
        for path in build(site, preview):
            print(path.relative_to(ROOT))
