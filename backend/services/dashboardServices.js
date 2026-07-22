const forecastService = require("./forecastServices");
const sourceAttributionService = require("./sourceAttributionService");
const dispersionService = require("./dispersionService");
const geojsonService = require("./geojsonService");

exports.getDashboardData = async (body) => {

    const { city, ward } = body;

    if (!city)
        throw new Error("City is required.");

    if (!ward)
        throw new Error("Ward is required.");

    // ==========================
    // 1. Forecast
    // ==========================
    const forecastResponse =
        await forecastService.predict({ city });

    // ==========================
    // 2. Ward Forecast
    // ==========================
    const wardForecastResponse =
        await forecastService.predictWards({ city });

    // ==========================
    // 3. Extract Weather Data
    // ==========================
    const forecast =
        forecastResponse.data.forecast[0];

    if (!forecast)
        throw new Error("Forecast data unavailable.");

    const windDirection =
        forecast.windDirection;

    const windSpeed =
        forecast.windSpeed;

    // ==========================
    // 4. GeoJSON Lookup
    // ==========================
    const wardInfo =
    geojsonService.getWardDetails(
        city,
        ward
    );

    const source =
        wardInfo.coordinates;

    // ==========================
    // 5. Source Attribution
    // ==========================
    const sourceAttribution =
        await sourceAttributionService.predictSource({

            city,

            ward,

            windDirection

        });

    // ==========================
    // 6. Dispersion
    // ==========================
    const dispersion =
        await dispersionService.simulate({

            source,

            wind_speed: windSpeed,

            wind_direction: windDirection,

            release_rate: 1000

        });

    // ==========================
    // 7. Final Dashboard Response
    // ==========================
    return {

        success: true,

        city,

        ward: {

            number: wardInfo.wardNo,

            name: wardInfo.wardName,

            coordinates: wardInfo.coordinates

        },

        weather: {

            windSpeed,

            windDirection

        },

        forecast: forecastResponse.data,

        wardForecast: wardForecastResponse.data,

        sourceAttribution:
            sourceAttribution.data,

        dispersion:
            dispersion.data

    };

};