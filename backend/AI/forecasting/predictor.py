import joblib
import pandas as pd
import json
from aqi import calculate_aqi, get_aqi_category

pm25_model = joblib.load("../ml_pickle_files/pm25_model.pkl")
pm10_model = joblib.load("../ml_pickle_files/pm10_model.pkl")

feature_cols = joblib.load("../ml_pickle_files/feature_list/feature_columns.pkl")

print("Models loaded successfully!")

data = pd.read_csv("../../../datasets/final/test_dataset.csv")
print("dataset loaded succesfully!")

# convert datetime
data["Datetime"] = pd.to_datetime(data["Datetime"])

def predict(city):
    city_data = data[data["City"] == city].copy()
    city_data = city_data.sort_values("Datetime")
    city_data = data[data["City"] == city].copy()

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

        forecast.append({

            "time": forecast_rows.iloc[i]["Datetime"].strftime("%H:%M"),

            "pm25": round(pm25, 2),

            "pm10": round(pm10, 2),

            "aqi": int(aqi),

            "category": category,

        })

    return {

        "city": city,

        "forecast": forecast

    }
