#!/usr/bin/env bash
set -euo pipefail

# Diagnóstico rápido para errores 500 en assets/login de Odoo
# Uso: ./odoo/diagnose.sh

SERVICE=odoo

run(){ docker compose exec -T "$SERVICE" bash -c "$1"; }

echo "[1] Versión Odoo y addons paths";
run "odoo --version || odoo -V || true"
run "python3 -c 'import sys; print(sys.version)'"
run "echo ADDONS: $ADDONS_PATH"

echo "[2] Archivos estáticos generados (directorio web assets)";
run "find /var/lib/odoo -maxdepth 3 -type f -name 'web.assets_*.js' | head -20"

echo "[3] Logs recientes con tracebacks";
run "grep -i 'ERROR' -R /var/lib/odoo/log 2>/dev/null | tail -20 || true"

echo "[4] Probar endpoint assets desde dentro:";
run "curl -I http://localhost:8069/web/assets/ 2>/dev/null | head -1 || true"

echo "[5] Recolectar módulo web si falta";
run "odoo --stop-after-init -i web -d postgres --db_host=postgres --db_user=odoo --db_password=odoo_password || true"

echo "[6] Reconstruir bundles (modo dev)";
run "odoo --log-level=info --dev=assets --stop-after-init -d postgres --db_host=postgres --db_user=odoo --db_password=odoo_password || true"

echo "Listo. Revisa arriba."
