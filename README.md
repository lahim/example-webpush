# WebPush Example App

This is simple webpush example app.

## Start API

```bash
cd apiapp/
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Start WEB

```bash
cd webapp/
npm start
```

## Test push notifications

1. Open web app and click button: "Subscribe"
2. Call notify API endpoint using curl:

```bash
curl -XPOST http://localhost:8000/notify/
```
