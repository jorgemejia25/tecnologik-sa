#!/usr/bin/env bash
set -euo pipefail

echo "=== Deploy de la aplicación Orbit Realm ==="

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "Error: No se encontró package.json. Ejecuta desde el directorio raíz del proyecto."
    exit 1
fi

# 1. Build de la aplicación
echo "1. Construyendo aplicación..."
npm run build

# Verificar que se generó el build
if [ ! -d "dist/spa" ]; then
    echo "Error: No se generó la carpeta dist/spa"
    exit 1
fi

echo "✓ Build completado"

# 2. Aplicar cambios según el método elegido
METHOD=${1:-volume}

case $METHOD in
    "rebuild")
        echo "2. Método: Reconstruir contenedor"
        docker compose build web
        docker compose up -d web
        echo "✓ Contenedor reconstruido y reiniciado"
        ;;
    "volume")
        echo "2. Método: Usar volumen montado"
        # Solo reiniciar nginx para que recoja los nuevos archivos
        docker compose restart web
        echo "✓ Nginx reiniciado con nuevos archivos"
        ;;
    "full")
        echo "2. Método: Rebuild completo"
        docker compose build
        docker compose up -d
        echo "✓ Todos los contenedores reconstruidos"
        ;;
    *)
        echo "Método no reconocido: $METHOD"
        echo "Uso: ./deploy.sh [rebuild|volume|full]"
        echo "  rebuild - Solo reconstruir contenedor nginx"
        echo "  volume  - Usar volumen montado (por defecto)"
        echo "  full    - Reconstruir todos los contenedores"
        exit 1
        ;;
esac

# 3. Verificar que los servicios estén ejecutándose
echo "3. Verificando servicios..."
sleep 3

if docker compose ps | grep -q "Up"; then
    echo "✓ Servicios ejecutándose correctamente"
    echo
    echo "=== Deploy completado ==="
    echo "URLs disponibles:"
    echo "  - Aplicación: http://localhost (o tu dominio)"
    echo "  - Odoo: http://localhost:8069"
    echo
    echo "Para ver logs:"
    echo "  docker compose logs -f web"
else
    echo "⚠ Algunos servicios podrían no estar ejecutándose"
    echo "Revisa con: docker compose ps"
fi
