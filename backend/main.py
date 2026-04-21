import os
import asyncio
import httpx
import polyline
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class TravelRequest(BaseModel):
    destination: str
    start_date: str
    end_date: str
    budget: int
    travel_type: str = "solo"
    source: str = ""
    source_lat: Optional[float] = None
    source_lon: Optional[float] = None
    start_time: str = ""
    interests: List[str] = []

# Free APIs
OVERPASS_URL = "http://overpass-api.de/api/interpreter"
OSRM_URL = "http://router.project-osrm.org/trip/v1/driving/"
WEATHER_URL = "https://api.open-meteo.com/v1/forecast"
GEOCODE_URL = "https://nominatim.openstreetmap.org/search"

async def get_coordinates(city: str) -> tuple[float, float]:
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(GEOCODE_URL, params={"q": city, "format": "json", "limit": 1}, headers={"User-Agent": "TravelGenius/1.0"})
            if resp.status_code == 200 and resp.json():
                data = resp.json()[0]
                return float(data["lat"]), float(data["lon"])
        except Exception:
            pass
    return None, None

async def get_places(lat: float, lon: float, interests: List[str]) -> List[Dict]:
    queries = []
    if "Historical" in interests:
        queries.append(f'node["historic"="monument"](around:15000,{lat},{lon});')
        queries.append(f'node["tourism"="museum"](around:15000,{lat},{lon});')
    if "Devotional" in interests:
        queries.append(f'node["amenity"="place_of_worship"](around:15000,{lat},{lon});')
    if "Nature" in interests:
        queries.append(f'node["leisure"="park"](around:15000,{lat},{lon});')
        queries.append(f'node["natural"="water"](around:15000,{lat},{lon});')
    if "Food" in interests:
        queries.append(f'node["amenity"~"restaurant|cafe|fast_food"](around:10000,{lat},{lon});')
    if "Entertainment" in interests:
        queries.append(f'node["tourism"="theme_park"](around:15000,{lat},{lon});')
        queries.append(f'node["amenity"="cinema"](around:15000,{lat},{lon});')
        
    if not queries:
        queries.append(f'node["historic"="monument"](around:15000,{lat},{lon});')
        queries.append(f'node["amenity"="restaurant"](around:10000,{lat},{lon});')
        queries.append(f'node["tourism"="attraction"](around:20000,{lat},{lon});')

    query_str = "\n".join(queries)
    query = f"""
    [out:json];
    (
      {query_str}
    );
    out center 30;
    """
    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            resp = await client.post(OVERPASS_URL, data={"data": query})
            data = resp.json()
            places = []
            for element in data.get("elements", []):
                name = element.get("tags", {}).get("name")
                if not name: continue
                places.append({
                    "name": name,
                    "lat": element.get("lat"),
                    "lon": element.get("lon"),
                    "entry_cost": 50
                })
            return places
        except Exception:
            return []

async def optimize_route(places: List[Dict]) -> dict:
    if len(places) < 2:
        return {"distance_km": 0.0, "route_geometry": []}
    
    coords = ";".join([f"{p['lon']},{p['lat']}" for p in places])
    url = f"{OSRM_URL}{coords}?overview=full&geometries=polyline"
    
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url)
            if resp.status_code == 200:
                data = resp.json()
                if "trips" in data and len(data["trips"]) > 0:
                    trip = data["trips"][0]
                    distance_km = round(trip.get("distance", 0) / 1000, 1)
                    poly = trip.get("geometry", "")
                    geom = polyline.decode(poly)
                    geom_lonlat = [[p[1], p[0]] for p in geom]
                    return {
                        "distance_km": distance_km,
                        "route_geometry": geom_lonlat
                    }
        except Exception:
            pass
            
    geom_lonlat = [[p['lon'], p['lat']] for p in places]
    return {"distance_km": 0.0, "route_geometry": geom_lonlat}

def generate_itinerary(places: List[Dict], req: TravelRequest) -> List[Dict]:
    if not places:
        return []
    
    try:
        start_d = datetime.strptime(req.start_date, "%Y-%m-%d")
        end_d = datetime.strptime(req.end_date, "%Y-%m-%d")
        days_count = max(1, (end_d - start_d).days + 1)
    except Exception:
        days_count = 2

    itinerary = []
    place_index = 0
    
    for day in range(1, days_count + 1):
        day_places = places[place_index:place_index+3]
        if not day_places:
            break
            
        # Cleaned place format
        formatted_places = []
        for p in day_places:
            formatted_places.append({
                "name": p["name"],
                "entry_cost": p["entry_cost"]
            })
            
        itinerary.append({
            "day": day,
            "places": formatted_places
        })
        place_index += 3
        
    return itinerary

@app.get("/")
def home():
    return {"message": "Smart Travel Planner API running"}

@app.post("/plan")
async def plan_trip(req: TravelRequest):
    lat, lon = await get_coordinates(req.destination)
    if not lat or not lon:
        return {"distance_km": 0, "total_cost": 0, "vehicle_suggestion": "", "route_geometry": [], "days": []}
        
    places = await get_places(lat, lon, req.interests)
    itinerary = generate_itinerary(places, req)
    
    if not itinerary:
        return {"distance_km": 0, "total_cost": 0, "vehicle_suggestion": "", "route_geometry": [], "days": []}

    all_used_places = []
    if req.source_lat is not None and req.source_lon is not None:
        all_used_places.append({
            "name": req.source or "Starting Point",
            "lat": req.source_lat,
            "lon": req.source_lon
        })
        
    for day in itinerary:
        # We need the lat/lon to build the route, so we pull from original places list
        pass
        
    # Re-fetch the lat/lon for the used places to plot the route
    route_places = []
    if req.source_lat is not None and req.source_lon is not None:
        route_places.append({"lat": req.source_lat, "lon": req.source_lon})
    for day in itinerary:
        for p in day["places"]:
            # Find the original place data
            orig = next((x for x in places if x["name"] == p["name"]), None)
            if orig:
                route_places.append(orig)
                
    route_info = await optimize_route(route_places)
    dist = route_info.get("distance_km", 0)
    
    if dist < 5:
        vehicle = "Walking or Auto"
    elif dist <= 50:
        vehicle = "City Cab"
    else:
        vehicle = "Intercity Bus"
        
    total_entry_cost = sum(p.get("entry_cost", 0) for day in itinerary for p in day.get("places", []))
    total_cost = int(dist * 10) + total_entry_cost
    
    return {
        "distance_km": dist,
        "total_cost": total_cost,
        "vehicle_suggestion": vehicle,
        "route_geometry": route_info.get("route_geometry", []),
        "days": itinerary
    }
