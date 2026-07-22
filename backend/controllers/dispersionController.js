const dispersionService = require("../services/dispersionService");

exports.simulate = async (req, res) => {

    try {

        const result = await dispersionService.simulate(req.body);

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};