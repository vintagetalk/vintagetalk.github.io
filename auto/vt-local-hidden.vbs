' VintageTalk workroom PC helper - starts vt-local.ps1 (same folder) without a window
Set sh = CreateObject("WScript.Shell")
sh.Run "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & Replace(WScript.ScriptFullName, "vt-local-hidden.vbs", "vt-local.ps1") & """", 0, False
