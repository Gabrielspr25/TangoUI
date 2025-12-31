#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}🚀 Iniciando Configuración Automática de Sistema Claro...${NC}"

# 1. Instalar dependencias del sistema (Solo si no existen)
echo -e "${GREEN}📦 Verificando dependencias del sistema...${NC}"
if ! command -v node &> /dev/null; then
    echo "Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

if ! command -v psql &> /dev/null; then
    echo "Instalando PostgreSQL..."
    sudo apt-get install -y postgresql postgresql-contrib
fi

if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2..."
    sudo npm install -g pm2
fi

# 2. Configurar Base de Datos
echo -e "${GREEN}🗄️  Configurando PostgreSQL...${NC}"
sudo -u postgres psql -c "CREATE USER gabriel WITH ENCRYPTED PASSWORD 'CL@789ropr';" 2>/dev/null || echo "Usuario ya existe"
sudo -u postgres psql -c "CREATE DATABASE sistema_claro OWNER gabriel;" 2>/dev/null || echo "BD ya existe"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE sistema_claro TO gabriel;" 2>/dev/null || echo "Permisos ya asignados"

# 3. Configurar Backend
echo -e "${GREEN}⚙️  Configurando Backend...${NC}"
# Detectar directorio del script y subir un nivel a 'backend'
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$DIR/.."

cd "$BACKEND_DIR"

# Instalar dependencias de Node
echo "Instalando node_modules..."
npm install

# Crear .env
echo "Generando archivo .env..."
cat > .env << EOL
PORT=3001
DB_USER=gabriel
DB_HOST=localhost
DB_NAME=sistema_claro
DB_PASSWORD=CL@789ropr
DB_PORT=5432
FRONTEND_URL=http://localhost:5173
NODE_ENV=production
EOL

# 4. Iniciar Servicios
echo -e "${GREEN}🚀 Iniciando Servidor...${NC}"
pm2 start src/server.js --name "sistema-claro-backend" 2>/dev/null || pm2 restart "sistema-claro-backend"
pm2 save

echo -e "${GREEN}✅ ¡Instalación Completa! El sistema debería estar corriendo.${NC}"
echo -e "${GREEN}   Puedes ver el log con: pm2 logs sistema-claro-backend${NC}"
