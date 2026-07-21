# CPCB AQI Breakpoints

PM25_BREAKPOINTS = [
    (0, 30, 0, 50),
    (31, 60, 51, 100),
    (61, 90, 101, 200),
    (91, 120, 201, 300),
    (121, 250, 301, 400),
    (251, 500, 401, 500)
]

PM10_BREAKPOINTS = [
    (0, 50, 0, 50),
    (51, 100, 51, 100),
    (101, 250, 101, 200),
    (251, 350, 201, 300),
    (351, 430, 301, 400),
    (431, 600, 401, 500)
]


def calculate_sub_index(concentration, breakpoints):
    """
    Calculate AQI sub-index using CPCB linear interpolation.
    """

    for BP_low, BP_high, I_low, I_high in breakpoints:

        if BP_low <= concentration <= BP_high:

            return (
                ((I_high - I_low) / (BP_high - BP_low))
                * (concentration - BP_low)
                + I_low
            )

    # Above highest breakpoint
    return 500


def calculate_aqi(pm25, pm10):

    pm25_aqi = calculate_sub_index(
        pm25,
        PM25_BREAKPOINTS
    )

    pm10_aqi = calculate_sub_index(
        pm10,
        PM10_BREAKPOINTS
    )

    return round(max(pm25_aqi, pm10_aqi))


def get_aqi_category(aqi):

    if aqi <= 50:
        return "Good"

    elif aqi <= 100:
        return "Satisfactory"

    elif aqi <= 200:
        return "Moderate"

    elif aqi <= 300:
        return "Poor"

    elif aqi <= 400:
        return "Very Poor"

    else:
        return "Severe"
    
"""
example for testing purpose.
"""
pm25 = 82.5
pm10 = 146.3

aqi = calculate_aqi(pm25, pm10)

category = get_aqi_category(aqi)

print("AQI:", aqi)
print("Category:", category)