const express = require("express");
const router = express.Router();
const geojsonService = require("../services/geojsonService");

// GET /api/cities/:city/wards
router.get("/:city/wards", (req, res) => {
    try {
        const { city } = req.params;

        const wards = geojsonService.getAllWards(city);

        res.status(200).json(wards);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

module.exports = router;