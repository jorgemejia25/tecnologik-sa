#!/usr/bin/env bash
set -euo pipefail

DB=${1:-orbit_realm}
HOST=postgres
USER=odoo
PASS=odoo_password

echo "=== Solucionando error de assets de Odoo ==="
echo "Base de datos: $DB"
echo

# 1. Limpiar cache local de Odoo
echo "1. Limpiando cache local de Odoo..."
docker compose exec odoo bash -c "rm -rf /var/lib/odoo/.local/* || true"
docker compose exec odoo bash -c "rm -rf /var/lib/odoo/sessions/* || true"
echo "✓ Cache limpiado"

# 2. Limpiar attachments corruptos en la base de datos
echo "2. Limpiando attachments corruptos..."
docker compose exec postgres psql -U $USER -d $DB -c "
DELETE FROM ir_attachment 
WHERE res_model = 'ir.ui.view' 
AND name LIKE '%.assets_%' 
AND datas IS NOT NULL;
" || echo "Error al limpiar attachments, continuando..."

# 3. Limpiar registros de assets en ir_attachment
echo "3. Limpiando registros de assets..."
docker compose exec postgres psql -U $USER -d $DB -c "
DELETE FROM ir_attachment 
WHERE url LIKE '/web/assets/%' 
OR name LIKE 'web.assets_%'
OR name LIKE '%.min.js'
OR name LIKE '%.min.css';
" || echo "Error al limpiar assets, continuando..."

# 4. Reiniciar Odoo con actualización del módulo web
echo "4. Reiniciando Odoo y regenerando assets..."
docker compose exec odoo bash -c "odoo --stop-after-init -d $DB -u web --db_host=$HOST --db_user=$USER --db_password=$PASS --log-level=info" || true

# 5. Reiniciar completamente el contenedor
echo "5. Reiniciando contenedor de Odoo..."
docker compose restart odoo

# 6. Esperar que Odoo esté listo
echo "6. Esperando que Odoo esté disponible..."
for i in {1..30}; do
    if docker compose exec odoo curl -f -s http://localhost:8069/web/login > /dev/null 2>&1; then
        echo "✓ Odoo está disponible"
        break
    else
        echo "Esperando... ($i/30)"
        sleep 2
    fi
done

echo
echo "=== Proceso completado ==="
echo "Si el problema persiste, ejecuta:"
echo "  docker logs -f orbit-odoo"
echo "  o usa ./odoo/diagnose.sh para más información"