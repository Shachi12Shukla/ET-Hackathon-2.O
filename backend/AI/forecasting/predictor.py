import joblib
import pandas as pd
import json
import os
try:
  from aqi import calculate_aqi, get_aqi_category
except ModuleNotFoundError:
  from forecasting.aqi import calculate_aqi, get_aqi_category

# Resolve paths relative to this file's location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PM25_MODEL_PATH = os.path.join(BASE_DIR, "../ml_pickle_files/pm25_model.pkl")
PM10_MODEL_PATH = os.path.join(BASE_DIR, "../ml_pickle_files/pm10_model.pkl")
FEATURE_COLS_PATH = os.path.join(BASE_DIR, "../ml_pickle_files/feature_list/feature_columns.pkl")
DATASET_PATH = os.path.join(BASE_DIR, "../../../datasets/final/test_dataset.csv")

pm25_model = joblib.load(PM25_MODEL_PATH)
pm10_model = joblib.load(PM10_MODEL_PATH)
feature_cols = joblib.load(FEATURE_COLS_PATH)

print("Models loaded successfully!")

data = pd.read_csv(DATASET_PATH)
print("Dataset loaded successfully!")

# Convert datetime
data["Datetime"] = pd.to_datetime(data["Datetime"])

def predict(city):
  # Standardize city names
  search_city = city
  if "delhi" in city.lower():
    search_city = "Delhi"
  elif "mumbai" in city.lower():
    search_city = "Mumbai"
  elif "blr" in city.lower() or "bengaluru" in city.lower():
    search_city = "Bengaluru"

  city_data = data[data["City"] == search_city].copy()
  city_data = city_data.sort_values("Datetime")

  # Take first 24 hours of test set for forecasting
  forecast_rows = city_data.head(24).copy()

  X = forecast_rows.drop(
      columns=[
          "Datetime",
          "PM25",
          "PM10",
          "Target_PM25",
          "Target_PM10"
      ]
  )

  X = pd.get_dummies(
      X,
      columns=["City"],
      dtype=int
  )

  X = X.reindex(
      columns=feature_cols,
      fill_value=0
  )

  pred_pm25 = pm25_model.predict(X)
  pred_pm10 = pm10_model.predict(X)

  forecast = []

  for i in range(len(forecast_rows)):
    pm25 = float(pred_pm25[i])
    pm10 = float(pred_pm10[i])

    aqi = calculate_aqi(pm25, pm10)
    category = get_aqi_category(aqi)

    row = forecast_rows.iloc[i]

    forecast.append({
        "time": row["Datetime"].strftime("%Y-%m-%d %H:%M"),
        "pm25": round(pm25, 2),
        "pm10": round(pm10, 2),
        "aqi": int(aqi),
        "category": category,
        "windSpeed": float(row["WindSpeed"]),
        "windDirection": float(row["WindDirection"]),
        "temperature": float(row["Temperature"]),
        "humidity": float(row["Humidity"])
    })

  return {
      "city": search_city,
      "forecast": forecast
  }

def predict_wards(city):
  # 1. Get base city-level prediction
  base = predict(city)
  base_forecast = base["forecast"]

  search_city = base["city"]

  # 2. Load ward geojson
  city_filename = "Delhi_Wards.geojson"
  if "mumbai" in search_city.lower():
    city_filename = "Mumbai_BMC_Wards.geojson"
  elif "bengaluru" in search_city.lower():
    city_filename = "bengaluru.geojson"

  geojson_path = os.path.join(BASE_DIR, "../../../datasets/wards", city_filename)

  wards_data = []
  if os.path.exists(geojson_path):
    try:
      with open(geojson_path, "r", encoding="utf-8") as f:
        geojson = json.load(f)
      for feature in geojson["features"]:
        props = feature["properties"]
        ward_no = props.get("Ward_No") or props.get("WARD_NO") or props.get("OBJECTID")
        ward_name = props.get("Ward_Name") or props.get("WARD_NAME") or f"Ward {ward_no}"

        # Give each ward a deterministic scaling factor based on its name length
        # to simulate spatial variability from local sources
        spatial_multiplier = 0.75 + ((len(str(ward_name)) % 6) * 0.1)

        wards_data.append({
            "ward_no": str(ward_no),
            "ward_name": ward_name,
            "multiplier": spatial_multiplier
        })
    except Exception as e:
      print(f"Error loading geojson in predictor: {e}")

  # Fallback wards list if file load fails
  if not wards_data:
    wards_data = [
        {"ward_no": "CANT_1", "ward_name": "Ward Delhi Cantt 1", "multiplier": 0.85},
        {"ward_no": "CANT_2", "ward_name": "Ward Delhi Cantt 2", "multiplier": 1.1},
        {"ward_no": "CANT_4", "ward_name": "Ward Delhi Cantt 4", "multiplier": 1.35},
        {"ward_no": "CANT_6", "ward_name": "Ward Delhi Cantt 6", "multiplier": 0.95},
    ]

  # 3. Project ward predictions for the 08:00 morning peak hour (index 8) or first hour
  # We select index 8 representing typical daily enforcement peak
  current_hour_base = base_forecast[8] if len(base_forecast) > 8 else base_forecast[0]

  forecast_wards = []
  for wd in wards_data:
    pm25_w = current_hour_base["pm25"] * wd["multiplier"]
    pm10_w = current_hour_base["pm10"] * wd["multiplier"]
    aqi_w = calculate_aqi(pm25_w, pm10_w)

    forecast_wards.append({
        "ward_no": wd["ward_no"],
        "ward_name": wd["ward_name"],
        "pm25": round(pm25_w, 2),
        "pm10": round(pm10_w, 2),
        "aqi": int(aqi_w),
        "category": get_aqi_category(aqi_w)
    })

  return {
      "city": search_city,
      "base_forecast": base_forecast,
      "forecastWards": forecast_wards
  }
