import sys
import os

# Add parent AI directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List, Optional
from predictor import predict, predict_wards
from dispersion.dispersion_model import simulate_dispersion
from attribution.attribution_engine import compute_source_attribution


app = FastAPI(title="AuraScan AI ML Forecasting & Geospatial API")

class DispersionRequest(BaseModel):
  source: List[float] # [lon, lat]
  wind_speed: float
  wind_direction: float
  release_rate: Optional[float] = 1000.0

@app.get("/api/v1/forecast/{city}")
def get_prediction(city: str):
  return predict(city)

@app.get("/api/v1/forecast/{city}/wards")
def get_ward_prediction(city: str):
  return predict_wards(city)

@app.post("/api/v1/dispersion/simulate")
def run_dispersion_simulation(req: DispersionRequest):
  # GeoJSON outputs coordinates as [lon, lat]
  lon, lat = req.source
  plume_geojson = simulate_dispersion(
      source_lat=lat,
      source_lon=lon,
      wind_speed=req.wind_speed,
      wind_dir_deg=req.wind_direction,
      release_rate_q=req.release_rate
  )
  return {
      "success": True,
      "source": req.source,
      "wind_speed": req.wind_speed,
      "wind_direction": req.wind_direction,
      "geometry": plume_geojson
  }

@app.get("/api/v1/attribution/source")
def get_upwind_source_attribution(
    city: str,
    ward: str,
    wind_direction: float = Query(..., description="Wind direction in degrees coming FROM")
):
  return compute_source_attribution(
      city=city,
      ward_no=ward,
      wind_dir_deg=wind_direction
  )

@app.get("/api/health")
def health_check():
  return {"status": "healthy", "service": "AuraScan AI Server"}