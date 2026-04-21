# TravelGenius

TravelGenius is a smart, full-stack travel planning application built for a hackathon. It automatically generates optimized itineraries, calculates travel and entry costs, and suggests optimal transportation based on user interests, budget, and travel type.

## Features
- **Smart Itinerary Generation**: Uses OpenStreetMap (Overpass API) to fetch relevant points of interest based on selected categories (Nature, Historical, Devotional, Food, Entertainment).
- **Route Optimization**: Uses OSRM (Open Source Routing Machine) to calculate the shortest distance routes between attractions to form logical, day-by-day itineraries.
- **Cost & Transport Estimation**: Suggests the best vehicle type (Walking, Auto, City Cab, or Intercity Bus) based on daily travel distances and calculates total travel and entry costs.
- **Interactive Maps**: Uses Leaflet for interactive map visualization.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React-Leaflet
- **Backend**: FastAPI, Python, httpx, polyline, python-dotenv

---

## Project Structure
- `frontend/`: The React + Vite frontend application.
- `backend/`: The FastAPI backend application.

## Setup Instructions

### 1. Backend Setup
Make sure you have Python 3.8+ installed.

```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the development server
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup
Make sure you have Node.js (v16+) installed.

```bash
cd frontend
# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will typically run at `http://localhost:5173`.

---

## APIs Used (Free/Open Source)
- **Nominatim API (OpenStreetMap)**: For geocoding cities to coordinates.
- **Overpass API**: For fetching specific points of interest.
- **OSRM API**: For route distance and geometry calculations.
- **Open-Meteo API**: For weather forecasts (if integrated).

---

## Meet Team Ctrl Alt Elite

We are the team that built TravelGenius during this hackathon. Check out our profiles below to see more of our work:

- **Taluka Shravya** ([@shravyataluka-codes](https://github.com/shravyataluka-codes)) – *Full Stack & Integration (Aspiring Backend Developer)*
-**Siri Sonaganti** ([@sirisonaganti-max](https://github.com/sirisonaganti-max)) – *Frontend Engineer*
- **Sinjini Kruthi** ([@sinjinikruthi2007-png](https://github.com/sinjinikruthi2007-png)) – *Backend Engineer*
- **Divya Tepati** ([@divyatepati](https://github.com/divyatepati)) – *Machine Learning Engineer*
