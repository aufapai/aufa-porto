# =======================================================
# FTP Deploy Script - Aufa Portfolio (Build & Deploy)
# Builds the Vite project and uploads dist/ and admin/ to aufarafii.id
# =======================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$FtpPassword
)

$ftpServer = "ftp://ftp.aufarafii.id"
$ftpUser = "aufarafi"
$localRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$remoteRoot = "/public_html"

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "  [DEPLOY] FTP Build & Deploy - aufarafii.id" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Server  : ftp.aufarafii.id" -ForegroundColor Gray
Write-Host "  User    : $ftpUser" -ForegroundColor Gray
Write-Host "  Local   : $localRoot" -ForegroundColor Gray
Write-Host "  Remote  : $remoteRoot" -ForegroundColor Gray
Write-Host ""

# 1. Run build first to ensure latest production files
Write-Host "[BUILD] Step 1: Building Vite Application..." -ForegroundColor Yellow
$originalLocation = Get-Location
Set-Location -Path $localRoot
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] Build failed! Deployment aborted." -ForegroundColor Red
    Set-Location $originalLocation
    exit 1
}
Set-Location $originalLocation
Write-Host "[OK] Build completed successfully!" -ForegroundColor Green
Write-Host ""

# Define paths
$distPath = Join-Path $localRoot "dist"
$adminPath = Join-Path $localRoot "admin"

# Create credential
$secPass = ConvertTo-SecureString $FtpPassword -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential($ftpUser, $secPass)

function Ensure-FtpDirectory($remotePath) {
    try {
        $uri = "$ftpServer$remotePath/"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $FtpPassword)
        $request.UseBinary = $true
        $request.UsePassive = $true
        $request.KeepAlive = $false
        $response = $request.GetResponse()
        $response.Close()
        Write-Host "  [DIR] Created Remote Dir: $remotePath" -ForegroundColor Yellow
    } catch {
        # Directory likely already exists, which is fine
        $null = $_
    }
}

function Upload-FtpFile($localFile, $remotePath) {
    try {
        $uri = "$ftpServer$remotePath"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $FtpPassword)
        $request.UseBinary = $true
        $request.UsePassive = $true
        $request.KeepAlive = $false

        $fileContent = [System.IO.File]::ReadAllBytes($localFile)
        $request.ContentLength = $fileContent.Length

        $requestStream = $request.GetRequestStream()
        $requestStream.Write($fileContent, 0, $fileContent.Length)
        $requestStream.Close()

        $response = $request.GetResponse()
        $status = $response.StatusDescription
        $response.Close()

        $sizeKB = [math]::Round($fileContent.Length / 1024, 1)
        Write-Host "  [OK] $remotePath ($sizeKB KB)" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "  [FAIL] $remotePath - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Collect files to upload
$uploadQueue = @()

# Add all files in dist/ to upload queue
if (Test-Path $distPath) {
    $distFiles = Get-ChildItem -Path $distPath -Recurse -File
    foreach ($file in $distFiles) {
        $relativePath = $file.FullName.Substring($distPath.Length).Replace('\', '/')
        if (-not $relativePath.StartsWith("/")) { $relativePath = "/$relativePath" }
        $uploadQueue += [PSCustomObject]@{
            LocalPath  = $file.FullName
            RemotePath = "$remoteRoot$relativePath"
        }
    }
}

# Add all files in admin/ to upload queue
if (Test-Path $adminPath) {
    $adminFiles = Get-ChildItem -Path $adminPath -Recurse -File
    foreach ($file in $adminFiles) {
        $relativePath = $file.FullName.Substring($adminPath.Length).Replace('\', '/')
        if (-not $relativePath.StartsWith("/")) { $relativePath = "/$relativePath" }
        $uploadQueue += [PSCustomObject]@{
            LocalPath  = $file.FullName
            RemotePath = "$remoteRoot/admin$relativePath"
        }
    }
}

$totalFiles = $uploadQueue.Count
Write-Host "[BUILD] Found $totalFiles files to deploy (dist/ and admin/)" -ForegroundColor White
Write-Host "-----------------------------------------" -ForegroundColor DarkGray
Write-Host ""

# Collect unique remote directories that need to exist
$remoteDirs = @()
foreach ($item in $uploadQueue) {
    $dirPath = Split-Path $item.RemotePath -Parent
    $dirPath = $dirPath.Replace('\', '/')
    if ($dirPath -ne $remoteRoot -and $dirPath -notin $remoteDirs) {
        $remoteDirs += $dirPath
    }
}

# Sort directories by length to ensure parents are created first
$remoteDirs = $remoteDirs | Sort-Object Length

Write-Host "[DIR] Step 2: Preparing remote directories..." -ForegroundColor Yellow
foreach ($dir in $remoteDirs) {
    Ensure-FtpDirectory $dir
}
Write-Host ""

Write-Host "[UPLOAD] Step 3: Uploading production files..." -ForegroundColor Yellow
$uploadedCount = 0
$failedCount = 0

foreach ($item in $uploadQueue) {
    $result = Upload-FtpFile $item.LocalPath $item.RemotePath
    if ($result) { $uploadedCount++ } else { $failedCount++ }
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "  [SUMMARY] Deploy Summary" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "  [OK] Uploaded : $uploadedCount files" -ForegroundColor Green
if ($failedCount -gt 0) {
    Write-Host "  [FAIL] Failed   : $failedCount files" -ForegroundColor Red
}
Write-Host ""
Write-Host "  [URL] Website  : https://aufarafii.id" -ForegroundColor Cyan
Write-Host "  [ADMIN] Admin    : https://aufarafii.id/admin/" -ForegroundColor Cyan
Write-Host ""
