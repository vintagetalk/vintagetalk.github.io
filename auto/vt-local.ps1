# 작업실 PC 도우미 1.0 (11/25) — 작업실(/auto) 화면이 보낸 위드유 엑셀을 이 PC 바탕화면에 저장
# 이 PC 안에서만 듣습니다(127.0.0.1:47815 — 바깥 네트워크에서는 못 들어옴). 작업실 주소(https://vintagetalk.github.io)에서 온 것만 받습니다.
# 받는 것: 엑셀 파일(.xls · .xlsx)만, 8MB까지, 저장 위치는 바탕화면만. 기록에는 파일 이름과 크기만 남깁니다(내용 · 손님 정보는 안 남김).
$ErrorActionPreference = 'Stop'
$PORT = 47815; $ALLOW = 'https://vintagetalk.github.io'; $VER = '1.1'   # 주의: 파워셸은 대소문자를 안 가려서 $reqOrigin 과 $ALLOW 이 같은 변수 → 허용 출처는 $ALLOW
$LOG = Join-Path $PSScriptRoot 'vt-local.log'
function Write-Log($m) { try { if ((Test-Path $LOG) -and (Get-Item $LOG).Length -gt 300000) { Clear-Content $LOG }; Add-Content -Path $LOG -Value ((Get-Date).ToString('MM-dd HH:mm:ss') + ' ' + $m) -Encoding utf8 } catch {} }
function Send-Resp($stream, [int]$code, $obj, [string]$from) {
  $body = [Text.Encoding]::UTF8.GetBytes(($obj | ConvertTo-Json -Compress))
  $st = @{ 200 = 'OK'; 204 = 'No Content'; 400 = 'Bad Request'; 403 = 'Forbidden'; 404 = 'Not Found'; 413 = 'Too Large' }[$code]
  $h = "HTTP/1.1 $code $st`r`nContent-Type: application/json; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n"
  if ($from -eq $ALLOW) { $h += "Access-Control-Allow-Origin: $ALLOW`r`nVary: Origin`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: Content-Type`r`nAccess-Control-Allow-Private-Network: true`r`nAccess-Control-Max-Age: 600`r`n" }
  $hb = [Text.Encoding]::ASCII.GetBytes($h + "`r`n"); $stream.Write($hb, 0, $hb.Length); if ($code -ne 204) { $stream.Write($body, 0, $body.Length) }; $stream.Flush()
}
try { $listener = New-Object Net.Sockets.TcpListener ([Net.IPAddress]::Loopback, $PORT); $listener.Start() } catch { Write-Log "시작 못 함(이미 켜져 있을 수 있음): $($_.Exception.Message)"; exit 0 }
Write-Log "도우미 $VER 시작 — 127.0.0.1:$PORT"
while ($true) {
  $client = $null
  try {
    $client = $listener.AcceptTcpClient(); $client.ReceiveTimeout = 8000; $client.SendTimeout = 8000; $stream = $client.GetStream()
    # 머리글 읽기
    $buf = New-Object byte[] 65536; $ms = New-Object IO.MemoryStream; $headEnd = -1
    while ($headEnd -lt 0 -and $ms.Length -lt 65536) { $n = $stream.Read($buf, 0, $buf.Length); if ($n -le 0) { break }; $ms.Write($buf, 0, $n); $all = $ms.ToArray(); for ($i = 3; $i -lt $all.Length; $i++) { if ($all[$i] -eq 10 -and $all[$i - 1] -eq 13 -and $all[$i - 2] -eq 10 -and $all[$i - 3] -eq 13) { $headEnd = $i + 1; break } } }
    if ($headEnd -lt 0) { $client.Close(); continue }
    $all = $ms.ToArray(); $head = [Text.Encoding]::ASCII.GetString($all, 0, $headEnd); $lines = $head -split "`r`n"
    $parts = $lines[0] -split ' '; $method = $parts[0]; $path = $parts[1]
    $hd = @{}; foreach ($l in $lines[1..($lines.Length - 1)]) { $k = $l.IndexOf(':'); if ($k -gt 0) { $hd[$l.Substring(0, $k).Trim().ToLower()] = $l.Substring($k + 1).Trim() } }
    $reqOrigin = [string]$hd['origin']
    if ($method -eq 'OPTIONS') { Send-Resp $stream 204 @{} $reqOrigin; $client.Close(); continue }
    if ($reqOrigin -ne $ALLOW) { Send-Resp $stream 403 @{ ok = $false; msg = '작업실 화면에서 온 요청만 받아요.' } ''; Write-Log "거절(출처 다름): $reqOrigin $method $path"; $client.Close(); continue }
    if ($method -eq 'GET' -and $path -like '/ping*') { Send-Resp $stream 200 @{ ok = $true; ver = $VER; pc = $env:COMPUTERNAME } $reqOrigin; $client.Close(); continue }
    if ($method -ne 'POST' -or $path -notlike '/save*') { Send-Resp $stream 404 @{ ok = $false; msg = '모르는 요청이에요.' } $reqOrigin; $client.Close(); continue }
    $len = 0; [void][int]::TryParse([string]$hd['content-length'], [ref]$len)
    if ($len -le 0 -or $len -gt 12000000) { Send-Resp $stream 413 @{ ok = $false; msg = '파일이 너무 커요(8MB까지).' } $reqOrigin; $client.Close(); continue }
    $body = New-Object IO.MemoryStream; $body.Write($all, $headEnd, $all.Length - $headEnd)
    while ($body.Length -lt $len) { $n = $stream.Read($buf, 0, $buf.Length); if ($n -le 0) { break }; $body.Write($buf, 0, $n) }
    if ($body.Length -lt $len) { Send-Resp $stream 400 @{ ok = $false; msg = '파일을 다 못 받았어요.' } $reqOrigin; $client.Close(); continue }
    $j = [Text.Encoding]::UTF8.GetString($body.ToArray()) | ConvertFrom-Json
    $name = ([string]$j.name) -replace '[\\/:*?"<>|\x00-\x1f]', '_'; $name = $name.Trim().TrimStart('.')
    if ($name.Length -gt 120) { $name = $name.Substring(0, 120) }
    if ($name -notmatch '\.(xls|xlsx)$') { Send-Resp $stream 400 @{ ok = $false; msg = '엑셀 파일(.xls · .xlsx)만 받아요.' } $reqOrigin; $client.Close(); continue }
    $bytes = [Convert]::FromBase64String([string]$j.b64)
    if ($bytes.Length -gt 8000000) { Send-Resp $stream 413 @{ ok = $false; msg = '파일이 너무 커요(8MB까지).' } $reqOrigin; $client.Close(); continue }
    $desk = [Environment]::GetFolderPath('Desktop'); $full = Join-Path $desk $name
    [IO.File]::WriteAllBytes($full, $bytes)
    Write-Log "바탕화면에 저장: $name ($($bytes.Length)바이트)"
    Send-Resp $stream 200 @{ ok = $true; path = $full; name = $name; size = $bytes.Length } $reqOrigin
  } catch { Write-Log "오류: $($_.Exception.Message)"; try { if ($client -and $client.Connected) { Send-Resp $client.GetStream() 400 @{ ok = $false; msg = '도우미 오류: ' + $_.Exception.Message } $ALLOW } } catch {} }
  finally { try { if ($client) { $client.Close() } } catch {} }
}
