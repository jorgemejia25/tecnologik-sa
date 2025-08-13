#!/bin/bash

# Script para construir y desplegar la aplicación con nginx y Odoo

echo "🔨 Construyendo la aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error al construir la aplicación"
    exit 1
fi

echo "🐳 Construyendo la imagen de Docker..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ Error al construir la imagen de Docker"
    exit 1
fi

echo "🚀 Iniciando los servicios (nginx, PostgreSQL, Odoo)..."
docker-compose up -d

if [ $? -eq 0 ]; then
    echo "✅ Todos los servicios desplegados exitosamente"
    echo ""
    echo "🌐 Servicios disponibles:"
    echo "   • Aplicación web (nginx): http://localhost"
    echo "   • Odoo 18: http://localhost:8069"
    echo "   • PostgreSQL: localhost:5433"
    echo ""
    echo "📋 Comandos útiles:"
    echo "   • Ver logs: docker-compose logs -f [servicio]"
    echo "   • Ver estado: docker-compose ps"
    echo "   • Detener todo: docker-compose down"
    echo ""
    echo "⚠️  Nota: Odoo puede tardar unos minutos en inicializarse completamente"
    echo "   Credenciales por defecto de Odoo:"
    echo "   • Master Password: admin_master_password"
    echo "   • Database: Crear nueva desde la interfaz web"
else
    echo "❌ Error al iniciar los servicios"
    exit 1
fi
