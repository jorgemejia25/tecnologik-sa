# Orbit Realm - Configuración Docker

Este proyecto incluye una configuración completa con Docker Compose que ejecuta:

## Servicios Disponibles

### 🌐 Aplicación Web (Nginx)
- **URL**: http://localhost
- **Puerto**: 80
- **Descripción**: Tu aplicación Vite/React servida con nginx

### 🏢 Odoo 18
- **URL**: http://localhost:8069
- **Puerto**: 8069
- **Descripción**: Sistema ERP Odoo 18 completo
- **Master Password**: `admin_master_password`

### 🗄️ PostgreSQL
- **Host**: localhost
- **Puerto**: 5433 (externo), 5432 (interno)
- **Usuario**: odoo
- **Contraseña**: odoo_password
- **Base de datos**: postgres

## Comandos Rápidos

### Despliegue Completo
```bash
./deploy-nginx.sh
```

### Comandos Docker Compose
```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver estado de los servicios
docker-compose ps

# Ver logs de un servicio específico
docker-compose logs -f [web|odoo|postgres]

# Ver logs de todos los servicios
docker-compose logs -f

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (⚠️ CUIDADO: Borra datos)
docker-compose down -v
```

### Comandos de Desarrollo
```bash
# Construir solo la aplicación web
npm run build

# Reconstruir imagen de nginx
docker-compose build web

# Reiniciar solo un servicio
docker-compose restart [web|odoo|postgres]
```

## Estructura de Archivos

```
├── docker-compose.yml          # Configuración principal de servicios
├── Dockerfile.nginx            # Imagen personalizada de nginx
├── deploy-nginx.sh             # Script de despliegue automatizado
├── nginx/
│   └── conf.d/
│       └── default.conf        # Configuración de nginx
├── odoo/
│   ├── config/
│   │   └── odoo.conf          # Configuración de Odoo
│   └── addons/                 # Addons personalizados de Odoo
└── dist/spa/                   # Archivos construidos de la aplicación
```

## Configuración de Odoo

### Primera Configuración
1. Visita http://localhost:8069
2. Crea una nueva base de datos
3. Configura el usuario administrador
4. Instala los módulos que necesites

### Credenciales por Defecto
- **Master Password**: `admin_master_password`
- **Base de datos**: Crear nueva desde la interfaz web

### Addons Personalizados
Coloca tus addons personalizados en `./odoo/addons/` y reinicia el servicio de Odoo.

## Persistencia de Datos

Los datos se almacenan en volúmenes Docker:
- `postgres_data`: Datos de PostgreSQL
- `odoo_data`: Datos de Odoo (sesiones, archivos, etc.)

## Solución de Problemas

### El puerto 5432 está ocupado
El PostgreSQL interno usa el puerto 5433 externamente para evitar conflictos.

### Odoo no inicia
Verifica los logs: `docker-compose logs odoo`

### Aplicación web no se actualiza
Ejecuta `npm run build` y luego `docker-compose restart web`

### Limpiar todo y empezar de nuevo
```bash
docker-compose down -v
docker system prune -f
./deploy-nginx.sh
```

## Producción

Para producción, considera:
1. Cambiar las contraseñas por defecto
2. Configurar SSL/HTTPS
3. Configurar backup automático de PostgreSQL
4. Usar variables de entorno para credenciales
5. Configurar proxy reverso si es necesario
