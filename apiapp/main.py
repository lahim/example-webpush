from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pywebpush import webpush, WebPushException

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

subscriptions = []


class Subscription(BaseModel):
    endpoint: str
    keys: dict


VAPID_PRIVATE_KEY = "iTb2oKixZOZs1ydu-wqgDqrWrZ6K1rAJRva7nFlU03M"
VAPID_CLAIMS = {
    "sub": "mailto:test@example.com"
}


@app.exception_handler(WebPushException)
def handle_push_exception(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": str(exc)},
    )


@app.post("/subscribe/")
def subscribe(subscription: Subscription):
    global subscriptions

    subscriptions.append(subscription)
    return {"message": "Subscribed successfully"}


@app.post("/notify/")
def notify():
    global subscriptions

    message_body = "Hello! This is a test push notification!"

    for subscription in subscriptions:
        try:
            webpush(
                subscription_info=subscription.dict(),
                data=message_body,
                vapid_private_key=VAPID_PRIVATE_KEY,
                vapid_claims=VAPID_CLAIMS
            )
        except WebPushException as ex:
            print(f"Push notification failed: {ex}")
    return {"message": "Notification sent to all subscribers"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
