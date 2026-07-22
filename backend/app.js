const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const forecastRoutes=require("./routes/forecastRoutes");
const dataRoutes = require("./routes/dataRoutes");
const enforcementRoutes = require("./routes/enforcementRoutes");
const advisoryRoutes =require("./routes/advisoryRoutes");
const infrastructureRoutes=require("./routes/infrastructureRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");
const sourceAttributionRoutes =require("./routes/sourceAttributionRoutes");
const dispersionRoutes =require("./routes/dispersionRoutes");
const cityRoutes = require("./routes/cityRoutes");
const app = express();

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "AI Urban Air Quality Backend Running 🚀"
    });

});


app.use("/api/forecast",forecastRoutes);

app.use("/api/data", dataRoutes);

app.use("/api/enforcement", enforcementRoutes);

app.use("/api/advisory", advisoryRoutes);

app.use("/api/infrastructure",infrastructureRoutes);

app.use("/api/dashboard",dashboardRoutes);

app.use( "/api/source-attribution",sourceAttributionRoutes);

app.use("/api/dispersion",dispersionRoutes);

app.use("/api/cities", cityRoutes);
module.exports = app;