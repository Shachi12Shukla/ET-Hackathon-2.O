const fs = require("fs");
const path = require("path");

function getGeoJson(city) {

    let fileName;

    switch (city) {

        case "Delhi":
            fileName = "Delhi_Wards.geojson";
            break;

        case "Mumbai":
            fileName = "Mumbai_BMC_Wards.geojson";
            break;

        case "Bengaluru":
            fileName = "bengaluru.geojson";
            break;

        default:
            throw new Error("Invalid city");
    }

    const geojsonPath = path.join(
        __dirname,
        "../../datasets/wards",
        fileName
    );

    return JSON.parse(
        fs.readFileSync(geojsonPath, "utf8")
    );
}

// Calculate polygon center
function getPolygonCenter(coordinates) {

    const polygon = coordinates[0];

    let lon = 0;
    let lat = 0;

    polygon.forEach(point => {

        lon += point[0];
        lat += point[1];

    });

    return [
        lon / polygon.length,
        lat / polygon.length
    ];

}

exports.getWardDetails = (city, wardNo) => {

    const geojson = getGeoJson(city);

    console.log("=================================");
    console.log("City:", city);
    console.log("Requested Ward:", wardNo);

    for (const feature of geojson.features) {

        const props = feature.properties;

        console.log(props);

        const number =
            props.KGISWardNo ??
            props.WARD_NO ??
            props.ward_no ??
            props.Ward_No ??
            props.WARDNO ??
            props.WARD ??
            props.WARD_NUM;

        console.log("Checking:", number);

        if (String(number) === String(wardNo)) {

            console.log("MATCH FOUND");

            return {

                wardNo: number,

                wardName:
                    props.KGISWardName ??
                    props.WARD_NAME ??
                    props.ward_name ??
                    props.Ward_Name ??
                    props.NAME ??
                    "Unknown",

                coordinates: getPolygonCenter(
                    feature.geometry.coordinates
                )

            };

        }

    }

    throw new Error("Ward not found.");

};
exports.getAllWards = (city) => {

    const geojson = getGeoJson(city);

    return geojson.features.map(feature => ({

        wardNo:
            feature.properties.wardNo ||
            feature.properties.WARD_NO ||
            feature.properties.WARD ||
            feature.properties.WARD_NUM,

        wardName:
            feature.properties.wardName ||
            feature.properties.WARD_NAME ||
            feature.properties.NAME ||
            feature.properties.WARD_NM

    }));

}