const express = require("express");

const router = express.Router();

const dispersionController =
    require("../controllers/dispersionController");

router.post(
    "/simulate",
    dispersionController.simulate
);

module.exports = router;