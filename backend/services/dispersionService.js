const { simulateDispersion } = require("./pythonServices");

exports.simulate = async (body) => {

    const {
        source,
        wind_speed,
        wind_direction,
        release_rate
    } = body;

    if (!source)
        throw new Error("Source coordinates are required.");

    if (wind_speed === undefined)
        throw new Error("Wind Speed is required.");

    if (wind_direction === undefined)
        throw new Error("Wind Direction is required.");

    const result = await simulateDispersion({
        source,
        wind_speed,
        wind_direction,
        release_rate
    });

    return {
        success: true,
        data: result
    };
};