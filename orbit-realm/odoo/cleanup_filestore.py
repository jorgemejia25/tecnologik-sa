#!/usr/bin/env python3
"""
Script para eliminar adjuntos huérfanos (ir_attachment con store_fname cuyo archivo no existe) y opcionalmente reconstruir assets.
Uso dentro del contenedor Odoo:
  python3 /mnt/extra-addons/cleanup_filestore.py --db orbit_realm --rebuild-assets
Coloca este archivo donde puedas montarlo o ejecútalo con docker compose exec odoo bash -c 'python3 - <<PY ... PY'
"""
import argparse, os
import odoo
from odoo.tools import config

parser = argparse.ArgumentParser()
parser.add_argument('--db', required=True)
parser.add_argument('--rebuild-assets', action='store_true')
args = parser.parse_args()

config['db_host'] = os.getenv('HOST','postgres')
config['db_user'] = os.getenv('USER','odoo')
config['db_password'] = os.getenv('PASSWORD','odoo_password')

DB = args.db
print(f"[cleanup] Base: {DB}")

import odoo.api
registry = odoo.registry(DB)
missing_ids = []
with registry.cursor() as cr:
    env = odoo.api.Environment(cr, 1, {})
    Attach = env['ir.attachment']
    filestore = odoo.tools.config.filestore(DB)
    print(f"[cleanup] Filestore: {filestore}")
    for att in Attach.search([('store_fname','!=',False)]):
        p = os.path.join(filestore, att.store_fname)
        if not os.path.exists(p):
            missing_ids.append(att.id)
    print(f"[cleanup] Huérfanos detectados: {len(missing_ids)}")
    if missing_ids:
        Attach.browse(missing_ids).unlink()
        print("[cleanup] Eliminados.")

if args.rebuild_assets:
    print("[cleanup] Reconstruyendo assets (web)...")
    # Se fuerza actualización del módulo web
    os.system(f"odoo --stop-after-init -d {DB} -u web --db_host={config['db_host']} --db_user={config['db_user']} --db_password={config['db_password']}")
    print("[cleanup] Assets reconstruidos.")

print("[cleanup] Listo.")
