#!/usr/bin/env python3
"""Собирает dist/<сайт>.bundle.js — загрузчик + манифест + все патчи в одном файле.

Зачем:
  * запасной вариант публикации — вставить содержимое во вкладку JS в админке;
  * превью там, где нельзя достучаться до localhost.

Запуск:
  python3 tools/build.py [hostname]            — бандлы для всех сайтов (или одного)
  python3 tools/build.py --preview <hostname>  — dist/<сайт>.preview.js: без комментариев,
      работает поверх ?nomods=1 (агент вставляет его на страницу через javascript_tool)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def strip(code: str) -> str:
    code = re.sub(r"/\*.*?\*/", "", code, flags=re.S)
    code = re.sub(r"(?m)^\s*//.*$", "", code)
    return "\n".join(line.strip() for line in code.splitlines() if line.strip())


def build(site_file: Path, preview: bool = False) -> Path:
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
        if preview:
            entry = {k: strip(v) for k, v in entry.items()}
        files[cfg.get("path", name)] = entry

    bundle = {"manifest": manifest, "files": files}
    if preview:
        bundle["preview"] = True
    payload = json.dumps(bundle, ensure_ascii=False)
    loader = (ROOT / "loader.js").read_text()
    if preview:
        loader = strip(loader)
    suffix = "preview" if preview else "bundle"
    out = ROOT / "dist" / f"{site_file.stem}.{suffix}.js"
    out.parent.mkdir(exist_ok=True)
    out.write_text(f"window.__LITE_MODS_BUNDLE__ = {payload};\n{loader}")
    return out


if __name__ == "__main__":
    args = sys.argv[1:]
    preview = "--preview" in args
    args = [a for a in args if a != "--preview"]
    sites = sorted((ROOT / "sites").glob("*.json"))
    if args:
        sites = [s for s in sites if s.stem == args[0]]
    for site in sites:
        print(build(site, preview).relative_to(ROOT))
