# Odoo Directory

Estructura base migrada:

- `config/odoo.conf`: Configuración mínima para contenedor Odoo.
- `addons/`: Coloca aquí módulos personalizados.
- `data/`: Archivos de carga inicial (CSV, XML) si los usas.

El docker-compose monta estas rutas para permitir extensiones sin reconstruir la imagen base.
