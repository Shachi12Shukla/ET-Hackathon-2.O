from fastapi import FastAPI
from predictor import predict

app = FastAPI()

@app.get("/api/v1/forecast/{city}")
def get_prediction(city: str):
    return predict(city)