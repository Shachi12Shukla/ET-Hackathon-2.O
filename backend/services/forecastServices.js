const { getForecast, getWardForecast } = require("./pythonServices");

/**
 * Get city-level forecast
 */
exports.predict = async (body) => {
    const { city } = body;

    if (!city) {
        throw new Error("City is required.");
    }

    const prediction = await getForecast(city);

    return {
        success: true,
        data: prediction
    };
};

/**
 * Get ward-level forecast
 */
exports.predictWards = async (body) => {
    const { city } = body;

    if (!city) {
        throw new Error("City is required.");
    }

    const prediction = await getWardForecast(city);

    return {
        success: true,
        data: prediction
    };
};