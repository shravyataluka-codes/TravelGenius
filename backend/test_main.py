from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running - V2 TEST"}

@app.post("/plan")
def plan_trip(data: dict):
    return {
        "message": "SUCCESS - Testing response",
        "received_destination": data.get("destination"),
        "days": [
            {
                "day": 1,
                "places": [
                    {"name": "Charminar", "entry_cost": 25, "travel_cost": 0, "best_time": "Morning", "visit_time": "09:00 AM"},
                    {"name": "Golconda Fort", "entry_cost": 40, "travel_cost": 50, "best_time": "Afternoon", "visit_time": "11:30 AM"},
                ]
            }
        ],
        "total_cost": 100,
        "vehicle_suggestion": "Auto",
        "route_summary": "Test route",
        "source": data.get("source"),
        "start_time": data.get("start_time")
    }
