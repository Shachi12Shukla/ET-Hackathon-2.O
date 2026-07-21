import joblib
import pandas as pd
import json
from aqi import calculate_aqi, get_aqi_category

pm25_model = joblib.load("../models/pm25_model.pkl")
pm10_model = joblib.load("../models/pm10_model.pkl")

feature_cols = joblib.load("../models/feature_list/feature_columns.pkl")

print("Models loaded successfully!")

data = pd.read_csv("../../../datasets/final/Delhi_Mumbai_BLR_final_dataset.csv")

# convert datetime
data["Datetime"] = pd.to_datetime(data["Datetime"])

def predict(city):
    city_data = data[data["City"] == city].copy()
    city_data = city_data.sort_values("Datetime")
    latest = city_data.iloc[-1:].copy()

    X = latest.drop(
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

    pred_pm25 = pm25_model.predict(X)[0]

    pred_pm10 = pm10_model.predict(X)[0]

    aqi = calculate_aqi(
        pred_pm25,
        pred_pm10
    )

    category = get_aqi_category(aqi)

    return {
        "city": city,

        "predicted_pm25": round(float(pred_pm25),2),

        "predicted_pm10": round(float(pred_pm10),2),

        "aqi": int(aqi),

        "category": category
    }
