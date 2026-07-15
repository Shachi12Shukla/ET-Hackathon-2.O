import joblib
import pandas as pd
import json
import sys

pm25_model = joblib.load("../models/pm25_xgboost_model.pkl")
pm10_model = joblib.load("../models/pm10_xgboost_model.pkl")

feature_cols = joblib.load("../models/feature_list/feature_columns.pkl")

print("Models loaded successfully!")

input_json = sys.argv[1]      # a json object from node.js backend 
data = json.loads(input_json)

# converting into dataframe
df = pd.DataFrame([data])

# feature order 
df = df[feature_cols]

## Prediction 
pm25_prediction = pm25_model.predict(df)[0]
pm10_prediction = pm10_model.predict(df)[0]

## returning json
result = {
    "PM25": float(pm25_prediction),
    "PM10": float(pm10_prediction)
}

print(json.dumps(result))