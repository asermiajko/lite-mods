#!/usr/bin/env python3
"""Собирает dist/<сайт>.bundle.js — загрузчик + манифест + все патчи в одном файле.

Зачем:
  * запасной вариант публикации — вставить содержимое во вкладку JS в админке;
  * превью там, где нельзя достучаться до localhost (агент вставляет бандл на страницу).

Запуск: python3 tools/build.py [hostname]   (без аргумента — все сайты из sites/)
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def build(site_file: Path) -> Path:
    manifest = json.loads(site_file.read_text())
    files = {}
    for name, cfg in manifest.get("blocks", {}).items():
        if cfg.get("enabled") is False:
            continue
        block_dir = ROOT / "blocks" / cfg.get("path", name)
        entry = {}
        if cfg.get("css", True) and (block_dir / "style.css").exists():
            entry["css"] = (block_dir / "style.css").read_text()
        if cfg.get("js", True) and (block_dir / "script.js").exists():
            entry["js"] = (block_dir / "script.js").read_text()
        files[cfg.get("path", name)] = entry

    payload = json.dumps({"manifest": manifest, "files": files}, ensure_ascii=False)
    loader = (ROOT / "loader.js").read_text()
    out = ROOT / "dist" / f"{site_file.stem}.bundle.js"
    out.parent.mkdir(exist_ok=True)
    out.write_text(f"window.__LITE_MODS_BUNDLE__ = {payload};\n{loader}")
    return out


if __name__ == "__main__":
    sites = sorted((ROOT / "sites").glob("*.json"))
    if len(sys.argv) > 1:
        sites = [s for s in sites if s.stem == sys.argv[1]]
    for site in sites:
        print(build(site).relative_to(ROOT))
