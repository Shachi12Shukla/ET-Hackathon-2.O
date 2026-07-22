const sourceAttributionService = require("../services/sourceAttributionService");

exports.predictSource = async (req, res) => {
    try {
        const result = await sourceAttributionService.predictSource(req.body);

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};