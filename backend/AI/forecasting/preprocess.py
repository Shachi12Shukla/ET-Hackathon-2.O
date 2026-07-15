import pandas as pd
import numpy as np


def create_date_features(df):
    df["Date"] = pd.to_datetime(df["Date"])

    df["year"] = df["Date"].dt.year

    df["day_of_week"] = df["Date"].dt.dayofweek

    df["day_of_year"] = df["Date"].dt.dayofyear

    df["day_sin"] = np.sin(
    2*np.pi*df["day_of_year"]/365)

    df["day_cos"] = np.cos(
    2*np.pi*df["day_of_year"]/365)

    return df



def create_lag_features(df):
    # PM2.5

    df["PM25_lag1"] = df["PM25"].shift(1)   # PM2.5 of yesterday
    df["PM25_lag3"] = df["PM25"].shift(3)   # PM2.5 3 days ago
    df["PM25_lag7"] = df["PM25"].shift(7)   # PM2.5 1 week ago
    df["PM25_lag14"] = df["PM25"].shift(14)  #PM2.5 2 weeks ago
    df["PM25_lag30"] = df["PM25"].shift(30)  # PM2.5 1 month ago

    # PM10

    df["PM10_lag1"] = df["PM10"].shift(1)    # PM10 of yesterday
    df["PM10_lag3"] = df["PM10"].shift(3)    # PM10 3 days ago
    df["PM10_lag7"] = df["PM10"].shift(7)    # PM10 1 week ago
    df["PM10_lag14"] = df["PM10"].shift(14)  #PM10 2 weeks ago
    df["PM10_lag30"] = df["PM10"].shift(30)  #PM10 1 month ago

    return df


def create_rolling_features(df):
    df["PM25_rolling_3"] = df["PM25"].rolling(3).mean()
    df["PM25_rolling_7"] = df["PM25"].rolling(7).mean()
    df["PM25_median_7"] = (df["PM25"].rolling(7).median())
    df["PM25_median_7"] = (df["PM25"].rolling(7).std())
    df["PM25_median_7"] = (df["PM25"].rolling(7).max())
    

    df["PM10_rolling_3"] = df["PM10"].rolling(3).mean()
    df["PM10_rolling_7"] = df["PM10"].rolling(7).mean()
    df["PM10_median_7"] = (df["PM10"].rolling(7).median())
    df["PM10_median_7"] = (df["PM10"].rolling(7).max())

    return df


def create_season_features(df):
    pass


def preprocess(df):
    df = df.copy()

    df = create_date_features(df)
    df = create_lag_features(df)
    df = create_rolling_features(df)
    df = create_season_features(df)

    return df