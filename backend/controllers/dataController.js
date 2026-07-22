const dataService = require("../services/dataServices");

exports.importCSV = async (req, res) => {
    try {

        const result = await dataService.importCSV();

        res.status(200).json({
            success: true,
            ...result
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};