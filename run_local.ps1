param(
  [string]$HostName,
  [int]$PortNumber
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

$venvPath = Join-Path $scriptDir ".venv"
$pythonInVenv = Join-Path $venvPath "Scripts\python.exe"

if (-not (Test-Path $pythonInVenv)) {
  py -3 -m venv $venvPath
}

$pythonInVenv = Join-Path $venvPath "Scripts\python.exe"
$pipInVenv = Join-Path $venvPath "Scripts\pip.exe"

& $pipInVenv install --upgrade pip
& $pipInVenv install -r (Join-Path $scriptDir "requirements.txt")

$envFile = Join-Path $scriptDir ".env"
if (Test-Path $envFile) {
  Get-Content $envFile |
    Where-Object { $_ -match '=' -and -not $_.TrimStart().StartsWith('#') } |
    ForEach-Object {
      $parts = $_.Split('=', 2)
      if ($parts.Count -eq 2) {
        [System.Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim())
      }
    }
}

if (-not $HostName) {
  $HostName = if ($env:HOST) { $env:HOST } else { "127.0.0.1" }
}

if (-not $PortNumber) {
  $PortNumber = if ($env:PORT) { [int]$env:PORT } else { 8000 }
}

& $pythonInVenv -m uvicorn tradingview_agent:app --host $HostName --port $PortNumber --reload
