#!/usr/bin/env bash
# Публикация патчей на бой: поднять версию манифестов (сброс кэша), закоммитить, запушить.
# GitHub Pages обновляется ~1 минуту, загрузчик перечитывает манифест не реже раза в минуту.
# Использование: ./publish.sh "что изменилось"
set -euo pipefail
cd "$(dirname "$0")"

msg="${1:?Укажи описание: ./publish.sh \"что изменилось\"}"
version="$(date -u +%Y%m%d%H%M%S)"

python3 - "$version" <<'PY'
import json, sys
from pathlib import Path
for f in Path("sites").glob("*.json"):
    data = json.loads(f.read_text())
    data["version"] = sys.argv[1]
    f.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
PY

python3 tools/build.py >/dev/null
git add -A
git commit -m "$msg" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push
echo "Опубликовано, версия $version. На сайте через ~1–2 минуты."
