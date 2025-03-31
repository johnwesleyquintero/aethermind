$appName = "Aethermind"
Write-Host "★═══════════════════════════════════════★"
Write-Host "         $appName Cleanup Utility         "
Write-Host "★═══════════════════════════════════════★"

$paths = @(
    "$PSScriptRoot\..\node_modules",
    "$PSScriptRoot\..\dist",
    "$PSScriptRoot\..\.vercel",
    "$PSScriptRoot\..\package-lock.json",
    "$PSScriptRoot\..\pnpm-lock.yaml",
    "$PSScriptRoot\..\.pnpm-store"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "🗑️ Removing $path..."
        try {
            Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
        }
        catch {
            Write-Host "⚡ Attempting removal with elevated privileges..."
            Start-Process powershell -Verb RunAs -ArgumentList "-Command Remove-Item -Path '$path' -Recurse -Force" -Wait
        }
    }
}

Write-Host "🧹 Clearing package manager caches..."
Start-Process powershell -Verb RunAs -ArgumentList "-Command npm cache clean --force" -Wait
Start-Process powershell -Verb RunAs -ArgumentList "-Command pnpm store prune" -Wait

Write-Host "♻️ Resetting environment..."
if (Test-Path ".env.local") {
    Copy-Item ".env.local" ".env.local.backup" -Force
    Write-Host "📦 Backed up .env.local"
}

Write-Host "★═══════════════════════════════════════★"
Write-Host "           Cleanup Complete!              "
Write-Host "★═══════════════════════════════════════★"
