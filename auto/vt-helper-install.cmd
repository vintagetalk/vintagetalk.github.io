@echo off
chcp 65001 >nul
title 작업실 PC 도우미 설치
echo.
echo   작업실 PC 도우미를 설치하는 중이에요... (10초쯤)
echo   (위드유 엑셀을 이 PC 바탕화면에 바로 저장해 주는 작은 프로그램이에요)
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; iex ((New-Object Net.WebClient).DownloadString('https://vintagetalk.github.io/auto/vt-helper-install.ps1?v=' + [DateTime]::Now.Ticks))"
if errorlevel 1 (
  echo.
  echo   설치하지 못했어요. 이 창을 사진 찍어 사장님께 보여 주세요.
) else (
  echo.
  echo   설치했어요. 작업실 화면으로 돌아가면 돼요. PC를 켤 때마다 저절로 켜져요.
  echo   작업실에서 「로컬 네트워크 액세스」를 물으면 [허용]을 눌러 주세요.
)
echo.
pause
