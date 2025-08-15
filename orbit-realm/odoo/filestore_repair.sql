-- Script para detectar adjuntos huérfanos (entries en ir_attachment sin archivo en filestore)
-- Ejecutar dentro de psql conectado a la base orbit_realm (ajusta si cambia el nombre)
-- Ejemplo:
--   docker compose exec postgres psql -U odoo -d orbit_realm -f /tmp/filestore_repair.sql

-- 1. Listar primeros 50 adjuntos faltantes
SELECT id, store_fname, datas_fname, res_model, res_id
FROM ir_attachment
WHERE store_fname IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM pg_ls_dir('base/filestore/orbit_realm') -- placeholder, no directo: filestore real se valida en app
  )
LIMIT 50;

-- NOTA: La verificación real de existencia de archivo se suele hacer a nivel de sistema de archivos,
-- este SQL es un placeholder. Para limpieza segura se recomienda un script Python en entorno Odoo.
