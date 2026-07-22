const express = require("express");

const router = express.Router();

const sourceAttributionController =
    require("../controllers/sourceAttributionController");

router.post(
    "/predict",
    sourceAttributionController.predictSource
);

module.exports = router;