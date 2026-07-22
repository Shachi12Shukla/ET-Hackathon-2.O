const dashboardService = require("../services/dashboardServices");

exports.getDashboard = async (req, res) => {
    try {

        const data = await dashboardService.getDashboardData(req.body);

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
            stack: err.stack
        });

    }
};