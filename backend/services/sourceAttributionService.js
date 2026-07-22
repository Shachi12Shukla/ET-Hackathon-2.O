const { getSourceAttribution } = require("./pythonServices");

exports.predictSource = async (body) => {

    const { city, ward, windDirection } = body;

    if (!city)
        throw new Error("City is required.");

    if (!ward)
        throw new Error("Ward is required.");

    if (windDirection === undefined)
        throw new Error("Wind Direction is required.");

    const attribution = await getSourceAttribution(
        city,
        ward,
        windDirection
    );

    return {
        success: true,
        data: attribution
    };
};