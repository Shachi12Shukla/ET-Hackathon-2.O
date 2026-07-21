from predictor import predict, predict_wards
from backend.AI.dispersion.dispersion_model import simulate_dispersion
from backend.AI.attribution.attribution_engine import compute_source_attribution
import json

print("=== TESTING FORECASTER ===")
try:
  res = predict("Delhi")
  print("City Prediction Success! Returned", len(res["forecast"]), "hours of forecast.")
except Exception as e:
  print("City Prediction Failed:", e)

print("\n=== TESTING WARD FORECASTER ===")
try:
  res_wards = predict_wards("Delhi")
  print("Wards Prediction Success! Returned", len(res_wards["forecastWards"]), "wards.")
  print("Sample ward forecast:", res_wards["forecastWards"][0])
except Exception as e:
  print("Wards Prediction Failed:", e)

print("\n=== TESTING DISPERSION MODEL ===")
try:
  res_disp = simulate_dispersion(
      source_lat=28.63,
      source_lon=77.13,
      wind_speed=3.5,
      wind_dir_deg=250,
      release_rate_q=1000
  )
  print("Dispersion Success! Plume grid has", len(res_disp["features"]), "points of interest.")
except Exception as e:
  print("Dispersion Failed:", e)

print("\n=== TESTING UPWIND SOURCE ATTRIBUTION ===")
try:
  res_attr = compute_source_attribution("Delhi", "CANT_4", 250)
  print("Source Attribution Success! Found", len(res_attr["sources"]), "potential sources.")
  print("Top source:", res_attr["sources"][0] if res_attr["sources"] else "None")
except Exception as e:
  print("Source Attribution Failed:", e)
