const express = require("express");
const router = express.Router();

const {
    predictAQI,
    predictWardAQI
} = require("../controllers/forecastController");

router.post("/predict", predictAQI);

router.post("/predict/wards", predictWardAQI);

module.exports = router;