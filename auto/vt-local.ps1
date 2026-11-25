# 작업실 PC 도우미 1.2 (11/25 밤) — 작업실(/auto) 화면이 시키는 일을 이 PC에서 대신 함
#   ① 위드유 엑셀 · 세 칸 파일을 저장 폴더에 저장(/save) — 저장 폴더는 이 PC에서 고름(/cfg/pick 이 폴더 고르는 창을 띄움 · 처음에는 바탕화면). 엑셀 받기용(get) · 위드유 출력용(auto) 따로
#   ② 위드유 출력(/withu/…): 엑셀을 위드유 출력 폴더에 두고 → 위드유 조작 도우미(관리자 권한 예약 작업 WithuHelper)에게 불러오기 · 택배정보생성 · 전체선택 · 바로 인쇄를 시킴 → 위드유가 만든 결과 엑셀을 작업실 화면에 돌려줌
#   ③ 다 끝난 엑셀 지우기(/del): 위드유 출력 폴더 안의 「위드유_….xls」만
# 이 PC 안에서만 듣습니다(127.0.0.1:47815). 작업실 주소(https://vintagetalk.github.io)에서 온 것만 받습니다.
# 받는 파일: 엑셀(.xls · .xlsx)만, 8MB까지. 기록에는 파일 이름 · 크기 · 단계만 남깁니다(내용 · 손님 정보는 안 남김).
# 주의: 파워셸은 변수 이름의 대소문자를 안 가림 — $origin 과 $ORIGIN 은 같은 변수(1.0 의 버그). 허용 출처는 $ALLOW.
param([int]$Port = 47815)   # 시험할 때만 다른 번호로 켬
$ErrorActionPreference = 'Stop'
$ALLOW = 'https://vintagetalk.github.io'; $VER = '1.2'
$LOG = Join-Path $PSScriptRoot 'vt-local.log'
$CFG = Join-Path $env:LOCALAPPDATA 'VintageTalk\helper-cfg.json'
$DESK = [Environment]::GetFolderPath('Desktop')
function Get-Cfg { $c = @{ get = ''; auto = '' }; try { if (Test-Path $CFG) { $o = Get-Content $CFG -Raw -Encoding UTF8 | ConvertFrom-Json; foreach ($k in 'get', 'auto') { if ($o.$k) { $c[$k] = [string]$o.$k } } } } catch {}; return $c }
function Kind-Of($v) { if ([string]$v -eq 'auto') { 'auto' } else { 'get' } }
function Dir-Of([string]$kind) { $d = (Get-Cfg)[$kind]; if ($d -and (Test-Path -LiteralPath $d -PathType Container)) { return $d }; return $DESK }   # 고른 폴더가 없어졌으면 바탕화면
function Label-Of([string]$d) { if ($d.TrimEnd('\') -eq $DESK.TrimEnd('\')) { '바탕화면' } else { $d } }
function Cfg-Out { return @{ ok = $true; get = (Label-Of (Dir-Of 'get')); auto = (Label-Of (Dir-Of 'auto')) } }
$UIA = Join-Path $env:ProgramData 'VintageTalk\uia'
function Write-Log($m) { try { if ((Test-Path $LOG) -and (Get-Item $LOG).Length -gt 300000) { Clear-Content $LOG }; Add-Content -Path $LOG -Value ((Get-Date).ToString('MM-dd HH:mm:ss') + ' ' + $m) -Encoding utf8 } catch {} }
function Send-Resp($stream, [int]$code, $obj, [string]$from) {
  $body = [Text.Encoding]::UTF8.GetBytes(($obj | ConvertTo-Json -Compress -Depth 6))
  $st = @{ 200 = 'OK'; 204 = 'No Content'; 400 = 'Bad Request'; 403 = 'Forbidden'; 404 = 'Not Found'; 413 = 'Too Large' }[$code]
  $h = "HTTP/1.1 $code $st`r`nContent-Type: application/json; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n"
  if ($from -eq $ALLOW) { $h += "Access-Control-Allow-Origin: $ALLOW`r`nVary: Origin`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: Content-Type`r`nAccess-Control-Allow-Private-Network: true`r`nAccess-Control-Max-Age: 600`r`n" }
  $hb = [Text.Encoding]::ASCII.GetBytes($h + "`r`n"); $stream.Write($hb, 0, $hb.Length); if ($code -ne 204) { $stream.Write($body, 0, $body.Length) }; $stream.Flush()
}
function Safe-Name([string]$n) { $n = ($n -replace '[\\/:*?"<>|\x00-\x1f]', '_').Trim().TrimStart('.'); if ($n.Length -gt 120) { $n = $n.Substring(0, 120) }; return $n }
# 위드유 조작 도우미(관리자 권한 예약 작업)에게 일 하나 시키고 답 받기
function Call-Uia($obj, [int]$waitSec) {
  if (-not (Test-Path $UIA)) { return @{ ok = $false; msg = '이 PC에는 위드유 조작 도우미가 없어요. 위드유가 깔린 PC에서 「도우미 설치」를 해 주세요.' } }
  $req = Join-Path $UIA 'req.json'; $res = Join-Path $UIA 'res.json'
  Remove-Item $res -ErrorAction SilentlyContinue
  [IO.File]::WriteAllText($req, ($obj | ConvertTo-Json -Compress -Depth 6), (New-Object Text.UTF8Encoding $false))
  $p = Start-Process "$env:WINDIR\System32\schtasks.exe" -ArgumentList '/run', '/tn', '"\VintageTalk\WithuHelper"' -WindowStyle Hidden -Wait -PassThru
  if ($p.ExitCode -ne 0) { return @{ ok = $false; msg = '위드유 조작 도우미를 부르지 못했어요. 「도우미 설치」가 필요해요.' } }
  for ($i = 0; $i -lt $waitSec * 4; $i++) { Start-Sleep -Milliseconds 250; if (Test-Path $res) { Start-Sleep -Milliseconds 200; break } }
  if (-not (Test-Path $res)) { return @{ ok = $false; msg = '위드유 조작 도우미가 시간 안에 답하지 않았어요. 위드유 화면을 확인해 주세요.' } }
  try { return (Get-Content $res -Raw -Encoding UTF8 | ConvertFrom-Json) } catch { return @{ ok = $false; msg = '위드유 조작 도우미의 답을 못 읽었어요.' } }
}
function Handle($method, $path, $j) {
  if ($method -eq 'GET' -and $path -like '/ping*') { return @{ ok = $true; ver = $VER; pc = $env:COMPUTERNAME; withu = (Test-Path $UIA) } }
  if ($method -ne 'POST') { return $null }
  if ($Port -ne 47815 -and $path -like '/quit*') { $script:Quit = $true; return @{ ok = $true } }   # 시험으로 켠 것만 끌 수 있음
  if ($path -like '/save*') {
    $name = Safe-Name ([string]$j.name); if ($name -notmatch '\.(xls|xlsx)$') { return @{ ok = $false; msg = '엑셀 파일(.xls · .xlsx)만 받아요.'; _code = 400 } }
    $bytes = [Convert]::FromBase64String([string]$j.b64); if ($bytes.Length -gt 8000000) { return @{ ok = $false; msg = '파일이 너무 커요(8MB까지).'; _code = 413 } }
    $dir = Dir-Of (Kind-Of $j.kind); $full = Join-Path $dir $name; [IO.File]::WriteAllBytes($full, $bytes)
    Write-Log "저장: $name ($($bytes.Length)바이트) → $(Label-Of $dir)"; return @{ ok = $true; path = $full; name = $name; size = $bytes.Length; where = (Label-Of $dir) }
  }
  if ($path -like '/cfg/pick*') {   # 이 PC 화면에 폴더 고르는 창을 띄움(폴더는 이 PC에 앉은 사람이 고름 — 화면 쪽에서 경로를 정해 보낼 수 없음)
    $k = Kind-Of $j.kind; Add-Type -AssemblyName System.Windows.Forms
    $own = New-Object Windows.Forms.Form; $own.TopMost = $true; $own.ShowInTaskbar = $false; $own.Opacity = 0; $own.StartPosition = 'CenterScreen'; $own.Show(); $own.Activate()
    $dlg = New-Object Windows.Forms.FolderBrowserDialog; $dlg.ShowNewFolderButton = $true; $dlg.SelectedPath = Dir-Of $k
    $dlg.Description = if ($k -eq 'auto') { '위드유 출력 때 엑셀을 둘 폴더를 골라 주세요' } else { '위드유 엑셀 받기 파일을 둘 폴더를 골라 주세요' }
    $ans = $dlg.ShowDialog($own); $own.Close(); $own.Dispose()
    if ([string]$ans -eq 'OK' -and $dlg.SelectedPath) {
      $c = Get-Cfg; $c[$k] = if ($dlg.SelectedPath.TrimEnd('\') -eq $DESK.TrimEnd('\')) { '' } else { [string]$dlg.SelectedPath }
      New-Item -ItemType Directory -Force (Split-Path $CFG) | Out-Null; [IO.File]::WriteAllText($CFG, ($c | ConvertTo-Json -Compress), (New-Object Text.UTF8Encoding $false))
      Write-Log "저장 폴더 바꿈($k)"
    }
    return (Cfg-Out)
  }
  if ($path -like '/cfg*') { return (Cfg-Out) }
  if ($path -like '/del*') {   # 다 끝난 엑셀 지우기 — 위드유 출력 폴더 안의 「위드유_….xls」만(다른 파일 · 다른 폴더는 못 지움)
    $dir = Dir-Of 'auto'; $n = 0
    foreach ($x in @($j.names)) { $nm = Safe-Name ([string]$x); if ($nm -notmatch '^위드유_.+\.xls$') { continue }; $f = Join-Path $dir $nm; if (Test-Path -LiteralPath $f -PathType Leaf) { try { Remove-Item -LiteralPath $f -Force; $n++ } catch {} } }
    Write-Log "끝난 엑셀 지움: $($n)개"; return @{ ok = $true; removed = $n }
  }
  if ($path -like '/withu/ping*') {   # 위드유 조작 도우미가 있는지 · 위드유가 켜져 있는지
    $r = Call-Uia @{ cmd = 'ping' } 20; if (-not $r.ok) { return @{ ok = $false; msg = [string]$r.msg } }
    return @{ ok = $true; ver = [string]$r.ver; wins = [int]$r.wins; ready = ([double]$r.ver -ge 1.3) }
  }
  if ($path -like '/withu/gen*') {   # 엑셀을 일할 폴더에 두고 → 불러오기 · 택배정보생성 → 위드유가 만든 결과 엑셀을 돌려줌
    $name = Safe-Name ([string]$j.name); if ($name -notmatch '\.xls$') { return @{ ok = $false; step = 'gen'; msg = '위드유에는 .xls 파일만 넣어요.' } }
    $bytes = [Convert]::FromBase64String([string]$j.b64); if ($bytes.Length -gt 8000000) { return @{ ok = $false; step = 'gen'; msg = '파일이 너무 커요(8MB까지).' } }
    $WORK = Dir-Of 'auto'; $in = Join-Path $WORK $name; [IO.File]::WriteAllBytes($in, $bytes); $t0 = Get-Date
    Write-Log "위드유 출력 시작: $name ($($bytes.Length)바이트)"
    $r = Call-Uia @{ cmd = 'ship1'; file = $in } 420
    if (-not $r.ok) { Write-Log ('위드유 출력 멈춤(택배정보생성): ' + [string]$r.msg); return @{ ok = $false; step = 'gen'; msg = [string]$r.msg } }
    $base = [IO.Path]::GetFileNameWithoutExtension($name); $out = $null
    for ($i = 0; $i -lt 20 -and -not $out; $i++) { $out = Get-ChildItem $WORK -File | Where-Object { $_.Name -ne $name -and $_.Name.StartsWith($base + '-') -and $_.LastWriteTime -ge $t0.AddSeconds(-2) } | Sort-Object LastWriteTime | Select-Object -Last 1; if (-not $out) { Start-Sleep -Milliseconds 500 } }
    if (-not $out) { Write-Log '위드유 출력 멈춤: 결과 엑셀이 안 생김'; return @{ ok = $false; step = 'result'; msg = '택배정보생성은 됐다는데 결과 엑셀이 안 보여요. 위드유 화면을 확인해 주세요.' } }
    $m = [regex]::Match($out.Name, '-(\d{1,3})차-'); if (-not $m.Success) { return @{ ok = $false; step = 'result'; msg = '결과 엑셀 이름에서 차수를 못 찾았어요.' } }
    $rb = $null; for ($i = 0; $i -lt 10 -and -not $rb; $i++) { try { $rb = [IO.File]::ReadAllBytes($out.FullName) } catch { Start-Sleep -Milliseconds 400 } }
    if (-not $rb) { return @{ ok = $false; step = 'result'; msg = '결과 엑셀을 읽지 못했어요.' } }
    Write-Log ('택배정보생성 끝: ' + $m.Groups[1].Value + '차 · ' + $rb.Length + '바이트')
    return @{ ok = $true; cha = $m.Groups[1].Value; name = $out.Name; inName = $name; where = (Label-Of $WORK); b64 = [Convert]::ToBase64String($rb) }
  }
  if ($path -like '/withu/print*') {   # 그 차수만 전체선택 → 바로 인쇄
    $cha = [string]$j.cha; if ($cha -notmatch '^\d{1,3}$') { return @{ ok = $false; step = 'print'; msg = '차수가 이상해요.' } }
    $r = Call-Uia @{ cmd = 'ship2'; cha = $cha } 420
    if (-not $r.ok) { Write-Log ('위드유 출력 멈춤(인쇄): ' + [string]$r.msg); return @{ ok = $false; step = 'print'; msg = [string]$r.msg } }
    Write-Log ('바로 인쇄 끝: ' + $cha + '차 · 표에서 본 줄 ' + [string]$r.seen); return @{ ok = $true; cha = $cha; seen = [int]$r.seen }
  }
  return $null
}
try { $listener = New-Object Net.Sockets.TcpListener ([Net.IPAddress]::Loopback, $Port); $listener.Start() } catch { Write-Log "시작 못 함(이미 켜져 있을 수 있음): $($_.Exception.Message)"; exit 0 }
Write-Log "도우미 $VER 시작 — 127.0.0.1:$Port"
$script:Quit = $false
while (-not $script:Quit) {
  $client = $null; $reqOrigin = ''
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
    $j = New-Object psobject
    if ($method -eq 'POST') {
      $len = 0; [void][int]::TryParse([string]$hd['content-length'], [ref]$len)
      if ($len -gt 12000000) { Send-Resp $stream 413 @{ ok = $false; msg = '파일이 너무 커요(8MB까지).' } $reqOrigin; $client.Close(); continue }
      $body = New-Object IO.MemoryStream; $body.Write($all, $headEnd, $all.Length - $headEnd)
      while ($body.Length -lt $len) { $n = $stream.Read($buf, 0, $buf.Length); if ($n -le 0) { break }; $body.Write($buf, 0, $n) }
      if ($body.Length -lt $len) { Send-Resp $stream 400 @{ ok = $false; msg = '요청을 다 못 받았어요.' } $reqOrigin; $client.Close(); continue }
      if ($len -gt 0) { $j = [Text.Encoding]::UTF8.GetString($body.ToArray()) | ConvertFrom-Json }
    }
    $client.SendTimeout = 20000
    $r = Handle $method $path $j
    if ($null -eq $r) { Send-Resp $stream 404 @{ ok = $false; msg = '모르는 요청이에요.' } $reqOrigin }
    else { $code = 200; if ($r.ContainsKey('_code')) { $code = [int]$r['_code']; $r.Remove('_code') }; Send-Resp $stream $code $r $reqOrigin }
  } catch { Write-Log "오류: $($_.Exception.Message)"; try { if ($client -and $client.Connected) { Send-Resp $client.GetStream() 400 @{ ok = $false; msg = '도우미 오류: ' + $_.Exception.Message } $reqOrigin } } catch {} }
  finally { try { if ($client) { $client.Close() } } catch {} }
}
