const express = require("express");

const router = express.Router();

const controller =
require("../controllers/advisoryController");

router.post("/",controller.generate);

module.exports = router;