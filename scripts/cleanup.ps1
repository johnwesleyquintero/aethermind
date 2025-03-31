Write-Host "🧹 Cleaning up project..."

# Kill any running Node processes
Write-Host "Stopping Node processes..."
taskkill /F /IM node.exe 2>$null
taskkill /F /IM electron.exe 2>$null

# Function to remove directory with retry
function Remove-DirectoryWithRetry {
    param([string]$path)
    
    if (Test-Path $path) {
        Write-Host "Removing $path..."
        try {
            Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
        }
        catch {
            Start-Sleep -Seconds 2
            try {
                Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
            }
            catch {
                Write-Warning "Could not remove $path. Please delete manually if needed."
            }
        }
    }
}

# Paths to clean
$paths = @(
    "node_modules",
    "dist",
    ".vercel",
    ".husky",
    "package-lock.json",
    "pnpm-lock.yaml",
    ".pnpm-store"
)

# Remove each path
foreach ($path in $paths) {
    Remove-DirectoryWithRetry $path
}

# Clear npm cache
Write-Host "Clearing npm cache..."
npm cache clean --force

# Install dependencies without husky
Write-Host "Installing dependencies..."
$env:HUSKY = "0"
npm install --no-save

Write-Host "✨ Cleanup complete! You can now run 'npm run dev'"
