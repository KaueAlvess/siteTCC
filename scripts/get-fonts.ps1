# Baixa a fonte SpaceMono do repositório EcoFashionApp para assets/fonts/
# Executar no PowerShell a partir da raiz do projeto: `.	ools\get-fonts.ps1` ou `.	ests\get-fonts.ps1` dependendo da localização

$destDir = Join-Path -Path (Split-Path -Path $PSScriptRoot -Parent) -ChildPath "assets/fonts"
if (-not (Test-Path -Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }

$rawUrl = 'https://raw.githubusercontent.com/KaueAlvess/EcoFashionApp/main/assets/fonts/SpaceMono-Regular.ttf'
$destFile = Join-Path $destDir 'SpaceMono-Regular.ttf'

Write-Host "Baixando SpaceMono para: $destFile"
try {
    Invoke-WebRequest -Uri $rawUrl -OutFile $destFile -UseBasicParsing -ErrorAction Stop
    Write-Host 'Download concluído.' -ForegroundColor Green
} catch {
    Write-Error "Falha ao baixar fonte: $($_.Exception.Message)"
    Write-Host "Você pode baixar manualmente: $rawUrl" -ForegroundColor Yellow
}
