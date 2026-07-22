const forecastService = require("../services/forecastServices");

exports.predictAQI = async (req, res) => {
    try {
        const result = await forecastService.predict(req.body);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.predictWardAQI = async (req, res) => {
    try {
        const result = await forecastService.predictWards(req.body);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};