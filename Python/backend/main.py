from fastapi import FastAPI
import random
import time

app = FastAPI()

device = {
    "running": False,
    "started_at": None
}

@app.get("/status")
def status():
    return device

@app.post("/start")
def start():
    device["running"] = True
    device["started_at"] = time.time()
    return {"ok": True}

@app.post("/stop")
def stop():
    device["running"] = False
    return {"ok": True}

@app.get("/sensor")
def sensor():
    if not device["running"]:
        return {"error": "device off"}

    return {
        "temperature": random.uniform(20, 85),
        "pressure": random.uniform(1, 3),
        "voltage": random.uniform(3.3, 12),
        "time": time.time()
    }