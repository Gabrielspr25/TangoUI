# 🚀 DESPLIEGUE A DIGITALOCEAN - SISTEMA CLARO

## 📦 ARCHIVOS LISTOS PARA SUBIR
Los archivos están en la carpeta `dist/`:
- `index.html` - Página principal
- `assets/index-BEOm0Oal.js` - JavaScript optimizado
- `assets/index-BiW45sPE.css` - CSS optimizado  
- `vite.svg` - Icono

## 🌐 PASOS PARA DIGITALOCEAN

### 1️⃣ **CREAR DROPLET**
```bash
# En DigitalOcean Panel
- Ubuntu 22.04 LTS
- Basic Plan ($4-6/mes)
- Crear droplet
```

### 2️⃣ **CONECTAR VIA SSH**
```bash
ssh root@TU_IP_DROPLET
```

### 3️⃣ **INSTALAR NGINX**
```bash
apt update
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

### 4️⃣ **CONFIGURAR NGINX**
```bash
# Crear directorio del sitio
mkdir -p /var/www/sistema-claro
chown -R www-data:www-data /var/www/sistema-claro

# Configurar virtual host
nano /etc/nginx/sites-available/sistema-claro
```

### 5️⃣ **CONTENIDO DEL ARCHIVO NGINX**
```nginx
server {
    listen 80;
    server_name TU_DOMINIO_O_IP;
    
    root /var/www/sistema-claro;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache para archivos estáticos
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 6️⃣ **ACTIVAR SITIO**
```bash
ln -s /etc/nginx/sites-available/sistema-claro /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

### 7️⃣ **SUBIR ARCHIVOS**
```bash
# Desde tu computadora (cmd/powershell)
scp -r dist/* root@TU_IP:/var/www/sistema-claro/
```

## ⚡ **SCRIPT DE DESPLIEGUE RÁPIDO**

Para futuros updates:
```bash
# En tu computadora
npm run build
scp -r dist/* root@TU_IP:/var/www/sistema-claro/
```

## 🔒 **OPCIONAL: SSL CON CERTBOT**
```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d TU_DOMINIO
```

## 📱 **RESULTADO**
Tu Sistema Claro estará disponible en:
- `http://TU_IP`
- `http://TU_DOMINIO` (si tienes dominio)

---
**Fecha de build:** November 19, 2025
**Archivos optimizados:** ✅ JS minificado, CSS optimizado
**Listo para producción:** ✅