const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const AQIData = require("../models/AQIData");

exports.importCSV = async () => {
    const csvPath = path.join(
        __dirname,
        "../AI/forecasting/featureEng_train/delhi_aqi_weather_daily.csv"
    );

    const rows = [];

    return new Promise((resolve, reject) => {

        fs.createReadStream(csvPath)
            .pipe(csv())

            .on("data", (row) => {
                rows.push(row);
            })

            .on("end", async () => {

                try {

                    let imported = 0;
                    let skipped = 0;

                    for (const row of rows) {

                        // Duplicate Check
                        const exists = await AQIData.findOne({
                            city: row.City,
                            date: new Date(row.Date)
                        });

                        if (exists) {
                            skipped++;
                            continue;
                        }

                        await AQIData.create({

                            city: row.City,

                            // You can change this later
                            ward: "Ward-12",

                            date: new Date(row.Date),

                            PM25: parseFloat(row.PM25),

                            PM10: parseFloat(row.PM10),

                            NO: parseFloat(row.NO),

                            NO2: parseFloat(row.NO2),

                            NOx: parseFloat(row.NOx),

                            NH3: parseFloat(row.NH3),

                            CO: parseFloat(row.CO),

                            SO2: parseFloat(row.SO2),

                            O3: parseFloat(row.O3),

                            AQI: parseFloat(row.AQI),

                            AQIBucket: row.AQI_Bucket,

                            temperature: parseFloat(row.Temperature),

                            humidity: parseFloat(row.Humidity),

                            windSpeed: parseFloat(row.WindSpeed),

                            windDirection: parseFloat(row.WindDirection),

                            rainfall: parseFloat(row.Rain)

                        });

                        imported++;

                    }

                    resolve({
                        totalRows: rows.length,
                        imported,
                        skipped,
                        message: "CSV Imported Successfully"
                    });

                } catch (err) {

                    reject(err);

                }

            })

            .on("error", (err) => {
                reject(err);
            });

    });

};