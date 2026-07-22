const express = require("express");
const router = express.Router();

const { importCSV } = require("../controllers/dataController");

router.post("/import", importCSV);

module.exports = router;