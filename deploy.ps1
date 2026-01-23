# 🚀 SCRIPT DE DESPLIEGUE AUTOMÁTICO - SISTEMA CLARO (PowerShell)
# Uso: .\deploy.ps1 -DropletIP "tu_ip_servidor"

param(
    [Parameter(Mandatory = $false)]
    [string]$DropletIP = "",
    [Parameter(Mandatory = $false)]
    [switch]$SkipBuild
)

# Colores para output
function Write-Success { param($msg) Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Info { param($msg) Write-Host "📦 $msg" -ForegroundColor Cyan }
function Write-Error { param($msg) Write-Host "❌ $msg" -ForegroundColor Red }
function Write-Warning { param($msg) Write-Host "⚠️  $msg" -ForegroundColor Yellow }

# Banner
Write-Host "`n🚀 ═══════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "   DEPLOY AUTOMÁTICO - SISTEMA CLARO" -ForegroundColor Magenta
Write-Host "   TangoUI - Versión 2026.01.23" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════════`n" -ForegroundColor Magenta

# Verificar si hay IP proporcionada
if ([string]::IsNullOrWhiteSpace($DropletIP)) {
    Write-Warning "No se proporcionó IP del servidor"
    $DropletIP = Read-Host "Ingresa la IP del Droplet"
    if ([string]::IsNullOrWhiteSpace($DropletIP)) {
        Write-Error "Debes proporcionar una IP válida"
        exit 1
    }
}

Write-Info "Servidor destino: $DropletIP"

# Variables
$SSH_KEY = "$env:USERPROFILE\.ssh\id_rsa_tangoui"
$REMOTE_USER = "root"
$REMOTE_PATH = "/var/www/sistema-claro"
$LOCAL_DIST = "dist"

# Verificar que existe la llave SSH
if (-not (Test-Path $SSH_KEY)) {
    Write-Error "No se encontró la llave SSH en: $SSH_KEY"
    exit 1
}
Write-Success "Llave SSH encontrada: id_rsa_tangoui"

# Paso 1: Build (si no se salta)
if (-not $SkipBuild) {
    Write-Info "Ejecutando build de producción..."
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) { throw "Build falló" }
        Write-Success "Build completado exitosamente"
    }
    catch {
        Write-Error "Error en el build: $_"
        exit 1
    }
}
else {
    Write-Warning "Saltando build (usando dist existente)"
}

# Verificar que existe el directorio dist
if (-not (Test-Path $LOCAL_DIST)) {
    Write-Error "No se encontró el directorio 'dist'. Ejecuta primero 'npm run build'"
    exit 1
}

# Paso 2: Subir archivos al servidor
Write-Info "Subiendo archivos al servidor $DropletIP..."
try {
    # Usando SCP con la llave específica
    $scpCommand = "scp -i `"$SSH_KEY`" -r $LOCAL_DIST\* ${REMOTE_USER}@${DropletIP}:${REMOTE_PATH}/"
    Write-Host "Ejecutando: $scpCommand" -ForegroundColor DarkGray
    
    & scp -i "$SSH_KEY" -r "$LOCAL_DIST\*" "${REMOTE_USER}@${DropletIP}:${REMOTE_PATH}/"
    
    if ($LASTEXITCODE -ne 0) { throw "SCP falló" }
    Write-Success "Archivos subidos correctamente"
}
catch {
    Write-Error "Error al subir archivos: $_"
    exit 1
}

# Paso 3: Ajustar permisos y recargar nginx
Write-Info "Ajustando permisos y recargando nginx..."
try {
    $sshCommand = "chown -R www-data:www-data $REMOTE_PATH; systemctl reload nginx"
    & ssh -i "$SSH_KEY" "${REMOTE_USER}@${DropletIP}" $sshCommand
    
    if ($LASTEXITCODE -ne 0) { throw "SSH command fallo" }
    Write-Success "Permisos ajustados y nginx recargado"
}
catch {
    Write-Error "Error en configuración remota: $_"
    exit 1
}

# Banner final
Write-Host "`n═══════════════════════════════════════════════" -ForegroundColor Green
Write-Success "¡DESPLIEGUE COMPLETADO EXITOSAMENTE!"
Write-Host "═══════════════════════════════════════════════" -ForegroundColor Green
Write-Host "🌐 Tu aplicación está disponible en:" -ForegroundColor White
Write-Host "   http://$DropletIP" -ForegroundColor Cyan
Write-Host "   $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor DarkGray
Write-Host ""
