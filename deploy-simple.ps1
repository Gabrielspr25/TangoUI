# Deploy Script - Sistema Claro
# Uso: .\deploy-simple.ps1

param(
    [string]$DropletIP = "104.236.211.88"
)

$SSH_KEY = "$env:USERPROFILE\.ssh\id_rsa_tangoui"
$REMOTE_USER = "root"
$REMOTE_PATH = "/var/www/sistema-claro"
$LOCAL_DIST = "dist"

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "DEPLOY - Sistema Claro TangoUI" -ForegroundColor Cyan
Write-Host "Servidor: $DropletIP" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Verificar llave SSH
if (-not (Test-Path $SSH_KEY)) {
    Write-Host "ERROR: No se encontro la llave SSH" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Llave SSH encontrada" -ForegroundColor Green

# Verificar dist
if (-not (Test-Path $LOCAL_DIST)) {
    Write-Host "ERROR: No existe directorio dist" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Directorio dist existe" -ForegroundColor Green

# Subir archivos
Write-Host "`nSubiendo archivos al servidor..." -ForegroundColor Yellow
& scp -i "$SSH_KEY" -r "$LOCAL_DIST\*" "${REMOTE_USER}@${DropletIP}:${REMOTE_PATH}/"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo al subir archivos" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Archivos subidos" -ForegroundColor Green

# Ajustar permisos
Write-Host "`nAjustando permisos..." -ForegroundColor Yellow
& ssh -i "$SSH_KEY" "${REMOTE_USER}@${DropletIP}" "chown -R www-data:www-data $REMOTE_PATH"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ADVERTENCIA: Permisos no ajustados" -ForegroundColor Yellow
}

# Recargar nginx
Write-Host "`nRecargando nginx..." -ForegroundColor Yellow
& ssh -i "$SSH_KEY" "${REMOTE_USER}@${DropletIP}" "systemctl reload nginx"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ADVERTENCIA: No se pudo recargar nginx" -ForegroundColor Yellow
}

Write-Host "`n==================================" -ForegroundColor Green
Write-Host "DEPLOY COMPLETADO" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host "URL: http://$DropletIP" -ForegroundColor Cyan
Write-Host ""
