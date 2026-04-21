# TradingView Local Agent Setup (Run Everything Locally)

If you want this to run completely on your machine, use this repo as a local webhook receiver:

1. TradingView alert sends webhook JSON.
2. Your local FastAPI agent validates and processes it.
3. Agent calls your broker API logic.

> TradingView Desktop does not expose a public local automation API.
> The supported pattern is alerts + webhook delivery.

## Files in this repo

- `tradingview_agent.py` - webhook app
- `requirements.txt` - Python dependencies for local install
- `.env.example` - local environment template
- `run_local.sh` - one-command local setup + run (Linux/macOS)
- `run_local.ps1` - one-command local setup + run (Windows PowerShell)

## Before you run commands

You must first open a terminal in your **actual cloned repo folder**.

Examples:
- Linux/macOS: `cd ~/projects/Codex`
- Windows PowerShell: `cd C:\Users\<you>\source\repos\Codex`

If `cd /workspace/Codex` fails on your machine, that means the repo is in a different path.

## Linux/macOS quick start

```bash
cp .env.example .env
# edit .env and set TRADINGVIEW_WEBHOOK_SECRET
./run_local.sh
```

## Windows PowerShell quick start

```powershell
Copy-Item .env.example .env
# edit .env and set TRADINGVIEW_WEBHOOK_SECRET
.\run_local.ps1
```

Notes for Windows:
- Use `Copy-Item`, not `cp` alias assumptions from Unix docs.
- Use `.\run_local.ps1`, not `./run_local.sh`.
- If script execution is blocked, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then run `.\run_local.ps1` again.

## Manual local setup (cross-platform)

### 1) Create virtual environment

Linux/macOS:

```bash
python -m venv .venv
source .venv/bin/activate
```

Windows PowerShell:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2) Install dependencies locally

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3) Configure local environment

```bash
# Linux/macOS
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Set `TRADINGVIEW_WEBHOOK_SECRET` in `.env`.

### 4) Start local server

Linux/macOS:

```bash
source .venv/bin/activate
set -a; source .env; set +a
uvicorn tradingview_agent:app --host 127.0.0.1 --port 8000 --reload
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
python -m uvicorn tradingview_agent:app --host 127.0.0.1 --port 8000 --reload
```

## TradingView alert configuration

Use this endpoint in alert webhook URL:

```text
http://127.0.0.1:8000/webhook/tradingview
```

If TradingView cannot reach localhost directly, run a tunnel (Cloudflare Tunnel/ngrok) and use that HTTPS URL.

Example alert message JSON:

```json
{
  "secret": "replace-me-with-a-long-random-secret",
  "symbol": "NASDAQ:AAPL",
  "action": "buy",
  "price": "{{close}}",
  "time": "{{timenow}}"
}
```

## Local broker integration

Replace `send_order_to_broker(...)` in `tradingview_agent.py` with your real broker/exchange API calls.

## Security checklist

- Set a strong webhook secret in `.env`.
- Reject unknown actions and invalid requests.
- Add risk limits before sending live orders.
- Keep logs for every alert and order result.
- Paper trade first.
