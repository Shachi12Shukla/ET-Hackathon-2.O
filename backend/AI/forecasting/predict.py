import joblib
import pandas as pd
import json
import sys
from preprocess import preprocess

pm25_model = joblib.load("../models/pm25_xgboost_model.pkl")
pm10_model = joblib.load("../models/pm10_xgboost_model.pkl")

feature_cols = joblib.load("../models/feature_list/feature_columns.pkl")

print("Models loaded successfully!")

input_json = sys.argv[1]      # a json object from node.js backend 
data = json.loads(input_json)

# converting into dataframe
df = pd.DataFrame(data)

df = preprocess(df)

latest = df.tail(1)  # latest prediction

X = latest[feature_cols]

#  Prediction 
pm25_prediction = pm25_model.predict(X)[0]
pm10_prediction = pm10_model.predict(X)[0]

# ## returning json
result = {
    "Predicted_PM25": round(float(pm25_prediction),2),
    "Predicted_PM10": round(float(pm10_prediction),2)
}

print(json.dumps(result))