# VintageTalk workroom PC helper - installer (ASCII only on purpose: this file is fetched as text)
# Installs to %LOCALAPPDATA%\VintageTalk\helper, starts it now, and registers it in the user's Startup folder.
# The helper only listens on 127.0.0.1:47815 and only accepts requests from https://vintagetalk.github.io
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$base = 'https://vintagetalk.github.io/auto/'
$dir = Join-Path $env:LOCALAPPDATA 'VintageTalk\helper'
New-Item -ItemType Directory -Force $dir | Out-Null
$wc = New-Object Net.WebClient
foreach ($f in 'vt-local.ps1', 'vt-local-hidden.vbs') { $wc.DownloadFile($base + $f + '?v=' + [DateTime]::Now.Ticks, (Join-Path $dir $f)) }
# stop an older helper (only if the port is held by powershell)
$c = Get-NetTCPConnection -LocalPort 47815 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
if ($c) { $p = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue; if ($p -and $p.ProcessName -match '^powershell') { Stop-Process -Id $p.Id -Force; Start-Sleep -Seconds 1 } }
$vbs = Join-Path $dir 'vt-local-hidden.vbs'
$sh = New-Object -ComObject WScript.Shell
$lnk = $sh.CreateShortcut((Join-Path ([Environment]::GetFolderPath('Startup')) 'VintageTalk Helper.lnk'))
$lnk.TargetPath = "$env:WINDIR\System32\wscript.exe"; $lnk.Arguments = '"' + $vbs + '"'; $lnk.WorkingDirectory = $dir; $lnk.Save()
Start-Process "$env:WINDIR\System32\wscript.exe" -ArgumentList ('"' + $vbs + '"')
Start-Sleep -Seconds 4
$r = Invoke-WebRequest 'http://127.0.0.1:47815/ping' -Headers @{ Origin = 'https://vintagetalk.github.io' } -UseBasicParsing -TimeoutSec 8
Write-Host ('HELPER OK ' + $r.Content)
