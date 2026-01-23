#!/bin/bash

# 🚀 SCRIPT DE DESPLIEGUE AUTOMÁTICO - SISTEMA CLARO
# Uso: bash deploy.sh TU_IP_DROPLET

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar la IP del droplet"
    echo "Uso: bash deploy.sh 192.168.1.100"
    exit 1
fi

DROPLET_IP=$1
echo "🚀 Desplegando Sistema Claro a $DROPLET_IP"

# Paso 1: Build local
echo "📦 Creando build optimizado..."
npm run build

# Paso 2: Subir archivos
echo "⬆️ Subiendo archivos al servidor..."
scp -r dist/* root@$DROPLET_IP:/var/www/sistema-claro/

# Paso 3: Ajustar permisos y Reiniciar nginx
echo "🔄 Ajustando permisos y recargando nginx..."
ssh root@$DROPLET_IP "chown -R www-data:www-data /var/www/sistema-claro && systemctl reload nginx"

echo "✅ ¡Despliegue completado!"
echo "🌐 Tu aplicación está disponible en: http://$DROPLET_IP"