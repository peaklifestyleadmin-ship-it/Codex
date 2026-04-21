import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="TradingView Webhook Agent")

SHARED_SECRET = os.getenv("TRADINGVIEW_WEBHOOK_SECRET", "replace-me")


class TradingViewAlert(BaseModel):
    secret: str
    symbol: str
    action: str
    price: float | None = None
    time: str | None = None


def send_order_to_broker(symbol: str, action: str, price: float | None) -> dict:
    """
    Replace this stub with your broker/exchange API integration.
    """
    if action.lower() not in {"buy", "sell", "close"}:
        raise ValueError("Unsupported action")

    # Example response payload for logging/testing.
    return {
        "status": "accepted",
        "symbol": symbol,
        "action": action.lower(),
        "price": price,
    }


@app.post("/webhook/tradingview")
def tradingview_webhook(payload: TradingViewAlert):
    if payload.secret != SHARED_SECRET:
        raise HTTPException(status_code=401, detail="Invalid secret")

    try:
        result = send_order_to_broker(
            symbol=payload.symbol,
            action=payload.action,
            price=payload.price,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return {
        "ok": True,
        "received": payload.model_dump(),
        "broker_result": result,
    }
