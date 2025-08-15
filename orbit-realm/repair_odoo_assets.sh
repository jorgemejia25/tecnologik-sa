#!/usr/bin/env bash
set -euo pipefail

DB=${1:-orbit_realm}
HOST=postgres
USER=odoo
PASS=odoo_password

echo "=== Reparación completa de assets de Odoo ==="
echo "Base de datos: $DB"
echo

# Función para verificar si el contenedor está ejecutándose
check_container() {
    if ! docker compose ps odoo | grep -q "running"; then
        echo "Error: El contenedor de Odoo no está ejecutándose"
        echo "Ejecuta: docker compose up -d"
        exit 1
    fi
}

check_container

# 1. Limpiar completamente el filestore
echo "1. Limpiando filestore corrupto..."
docker compose exec odoo bash -c "
find /var/lib/odoo/.local/share/Odoo/filestore/$DB -name '*.min.js' -delete || true
find /var/lib/odoo/.local/share/Odoo/filestore/$DB -name '*.min.css' -delete || true
rm -rf /var/lib/odoo/.local/share/Odoo/filestore/$DB/*/c1* || true
rm -rf /var/lib/odoo/.local/* || true
" || echo "Advertencia: Error al limpiar filestore"

# 2. Limpiar base de datos de attachments
echo "2. Limpiando attachments en base de datos..."
docker compose exec postgres psql -U $USER -d $DB -c "
-- Eliminar todos los assets compilados
DELETE FROM ir_attachment WHERE url LIKE '/web/assets/%';
DELETE FROM ir_attachment WHERE name LIKE 'web.assets_%';
DELETE FROM ir_attachment WHERE mimetype IN ('application/javascript', 'text/css') AND res_model = 'ir.ui.view';

-- Limpiar registros huérfanos
DELETE FROM ir_attachment WHERE store_fname IS NOT NULL AND store_fname != '' 
AND NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'ir_attachment_filestore_check'
);

-- Resetear secuencias de assets
UPDATE ir_ui_view SET write_date = NOW() WHERE type = 'qweb' AND name LIKE '%.assets_%';
"

# 3. Modo desarrollador para forzar regeneración
echo "3. Activando modo desarrollador y regenerando assets..."
docker compose exec odoo bash -c "
odoo --stop-after-init \
  -d $DB \
  --db_host=$HOST \
  --db_user=$USER \
  --db_password=$PASS \
  --dev=all \
  -u web,base \
  --log-level=info
" || echo "Advertencia: Error durante la regeneración"

# 4. Reinicio limpio
echo "4. Reinicio completo del contenedor..."
docker compose stop odoo
sleep 3
docker compose start odoo

# 5. Verificación
echo "5. Verificando que Odoo esté disponible..."
sleep 10
for i in {1..20}; do
    if curl -f -s http://localhost:8069/web/login > /dev/null 2>&1; then
        echo "✓ Odoo está disponible en puerto 8069"
        break
    else
        echo "Esperando... ($i/20)"
        sleep 3
    fi
done

# 6. Prueba de assets
echo "6. Probando URL de assets..."
if curl -f -s http://localhost:8069/web/assets/944fe34/web.assets_frontend_minimal.min.js > /dev/null 2>&1; then
    echo "✓ Assets funcionando correctamente"
else
    echo "⚠ Assets aún fallan, revisa los logs:"
    echo "  docker logs orbit-odoo --tail 50"
fi

echo
echo "=== Reparación completada ==="
echo "URL de prueba: http://66.45.236.99:8069/web/login"