const axios = require("axios");

// FastAPI server URL
const PYTHON_API = "http://127.0.0.1:8000";

/**
 * Get city-level 24-hour forecast
 * GET /api/v1/forecast/{city}
 */
exports.getForecast = async (city) => {
    try {
        const response = await axios.get(
            `${PYTHON_API}/api/v1/forecast/${encodeURIComponent(city)}`
        );

        return response.data;
    } catch (err) {
        console.error("Forecast API Error:", err.message);

        if (err.response) {
            throw new Error(
                err.response.data?.detail ||
                err.response.data?.message ||
                "Forecast API failed"
            );
        }

        throw new Error("Unable to connect to Python Forecast API");
    }
};

/**
 * Get ward-level forecast
 * GET /api/v1/forecast/{city}/wards
 */
exports.getWardForecast = async (city) => {
    try {
        const response = await axios.get(
            `${PYTHON_API}/api/v1/forecast/${encodeURIComponent(city)}/wards`
        );

        return response.data;
    } catch (err) {
        console.error("Ward Forecast API Error:", err.message);

        if (err.response) {
            throw new Error(
                err.response.data?.detail ||
                err.response.data?.message ||
                "Ward Forecast API failed"
            );
        }

        throw new Error("Unable to connect to Python Ward Forecast API");
    }
};

/**
 * Dispersion Simulation
 * POST /api/v1/dispersion/simulate
 */
exports.simulateDispersion = async (payload) => {
    try {
        const response = await axios.post(
            `${PYTHON_API}/api/v1/dispersion/simulate`,
            payload
        );

        return response.data;
    } catch (err) {
        console.error("Dispersion API Error:", err.message);

        if (err.response) {
            throw new Error(
                err.response.data?.detail ||
                err.response.data?.message ||
                "Dispersion API failed"
            );
        }

        throw new Error("Unable to connect to Python Dispersion API");
    }
};

/**
 * Source Attribution
 * GET /api/v1/attribution/source
 */
exports.getSourceAttribution = async (
    city,
    ward,
    windDirection
) => {
    try {
        const response = await axios.get(
            `${PYTHON_API}/api/v1/attribution/source`,
            {
                params: {
                    city,
                    ward,
                    wind_direction: windDirection
                }
            }
        );

        return response.data;
    } catch (err) {
        console.error("Attribution API Error:", err.message);

        if (err.response) {
            throw new Error(
                err.response.data?.detail ||
                err.response.data?.message ||
                "Attribution API failed"
            );
        }

        throw new Error("Unable to connect to Python Attribution API");
    }
};

/**
 * Health Check
 */
exports.health = async () => {
    try {
        const response = await axios.get(
            `${PYTHON_API}/api/health`
        );

        return response.data;
    } catch (err) {
        throw new Error("Python AI Server is not running");
    }
};