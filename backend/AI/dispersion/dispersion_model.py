import math

def simulate_dispersion(source_lat, source_lon, wind_speed, wind_dir_deg, release_rate_q=1000):
  """
  Simulates a 2D Gaussian Plume dispersion.
  - source_lat, source_lon: Coordinates of source release point.
  - wind_speed: Wind speed in m/s (minimum 0.5 to prevent division by zero).
  - wind_dir_deg: Wind direction in degrees (where wind is coming FROM).
  - release_rate_q: Pollutant release rate in micrograms/sec.
  """
  # Enforce wind speed bounds
  u = max(wind_speed, 0.5)

  # Calculate travel angle (downwind is opposite of wind direction)
  # Wind direction is coming FROM, downwind is going TO.
  travel_angle_rad = math.radians((wind_dir_deg + 180) % 360)

  # Grid dimensions for the plume resolution
  # We check points in a grid covering 5km downwind and 2km crosswind
  features = []

  # Pasquill stability parameters for Neutral Stability Class D
  a = 0.08
  b = 0.88
  c = 0.06
  d = 0.85

  # Earth radius conversions to meters
  meters_per_lat = 111000
  meters_per_lon = 111000 * math.cos(math.radians(source_lat))

  # Generate evaluation points on a grid rotated along the travel angle
  # downwind steps (x) from 50m to 3500m
  # crosswind steps (y) from -800m to 800m
  x_steps = [50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 3500]
  y_steps = [-600, -400, -250, -100, -50, 0, 50, 100, 250, 400, 600]

  for x in x_steps:
    # Dispersion coefficients at downwind distance x
    sigma_y = a * (x ** b)
    sigma_z = c * (x ** d)

    for y in y_steps:
      # Gaussian plume equation
      exponent = -(y ** 2) / (2 * (sigma_y ** 2))
      # Limit small exponent to prevent underflow
      if exponent < -20:
        continue

      concentration = (release_rate_q / (2 * math.pi * u * sigma_y * sigma_z)) * math.exp(exponent)

      # Only include noticeable concentrations (above 0.1 microgram/m3)
      if concentration < 0.1:
        continue

      # Map downwind/crosswind (x, y) offset in meters back to Lat/Lon
      # x is along travel_angle_rad, y is perpendicular (+90 degrees)
      perp_angle_rad = travel_angle_rad + (math.pi / 2)

      d_lon_meters = (x * math.sin(travel_angle_rad)) + (y * math.sin(perp_angle_rad))
      d_lat_meters = (x * math.cos(travel_angle_rad)) + (y * math.cos(perp_angle_rad))

      pt_lat = source_lat + (d_lat_meters / meters_per_lat)
      pt_lon = source_lon + (d_lon_meters / meters_per_lon)

      # Determine AQI category equivalent for styling based on plume thresholds
      category = "Moderate"
      if concentration > 15:
        category = "Severe"
      elif concentration > 5:
        category = "Very Poor"
      elif concentration > 1:
        category = "Poor"

      features.append({
          "type": "Feature",
          "properties": {
              "concentration": round(concentration, 2),
              "category": category
          },
          "geometry": {
              "type": "Point",
              "coordinates": [pt_lon, pt_lat]
          }
      })

  return {
      "type": "FeatureCollection",
      "features": features
  }
