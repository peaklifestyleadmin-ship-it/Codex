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
- `run_local.sh` - one-command local setup + run

## One-command local install and run

```bash
./run_local.sh
```

This command will:
- create `.venv` if missing,
- install dependencies,
- load `.env` values when present,
- run `uvicorn` on local host/port.

## Manual local setup (if you prefer)

### 1) Create virtual environment

```bash
python -m venv .venv
source .venv/bin/activate
```

### 2) Install dependencies locally

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3) Configure local environment

```bash
cp .env.example .env
# edit .env and set TRADINGVIEW_WEBHOOK_SECRET
```

### 4) Start local server

```bash
source .venv/bin/activate
set -a; source .env; set +a
uvicorn tradingview_agent:app --host 127.0.0.1 --port 8000 --reload
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
