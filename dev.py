#!/usr/bin/env python3
"""Локальный сервер черновиков: отдаёт папку lite-mods на http://localhost:3400.

Сайт с ?dev=1 грузит патчи отсюда, а не с GitHub Pages.
Запуск: python3 dev.py
"""
import re
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = 3400
ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "tools"))
import build  # noqa: E402


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Файл сайта всегда свежий: пересобираем из blocks/ на каждый запрос
        m = re.match(r"^/sites/([\w.-]+)\.js", self.path)
        if m and (ROOT / "sites" / f"{m.group(1)}.json").exists():
            build.build(ROOT / "sites" / f"{m.group(1)}.json")
        super().do_GET()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), partial(Handler, directory=str(ROOT)))
    print(f"lite-mods dev: http://localhost:{PORT}  (на сайте открой ?dev=1)")
    server.serve_forever()
