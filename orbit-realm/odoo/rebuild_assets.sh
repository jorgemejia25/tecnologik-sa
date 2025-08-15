#!/usr/bin/env bash
set -euo pipefail
DB=${1:-orbit_realm}
HOST=postgres
USER=odoo
PASS=odoo_password

cat <<EOF
[rebuild_assets] Base: $DB
1) Modo stop-after-init para limpiar caché y bundles
EOF

docker compose exec odoo bash -c "rm -rf /var/lib/odoo/.local/* || true"

docker compose exec odoo bash -c "odoo --stop-after-init -d $DB -u web --db_host=$HOST --db_user=$USER --db_password=$PASS --log-level=info" || true

echo "[rebuild_assets] Hecho. Reinicia Odoo si no se reinició automáticamente."
