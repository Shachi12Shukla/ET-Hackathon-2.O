import csv from "csvtojson"
const AQI_data = await csv().fromFile("AQI.csv")

// console.log("AQI_data before",AQI_data);
// console.log(Object.keys(AQI_data[0]));
// console.log(AQI_data[0]);

// console.log("****")

// // string -> num
// AQI_data.forEach(row => {

//     row.PM25 = Number(row.PM25);
//     row.PM10 = Number(row.PM10);
//     row.NO = Number(row.NO);
//     row.NO2 = Number(row.NO2);
//     row.NOx = Number(row.NOx);
//     row.NH3 = Number(row.NH3);
//     row.CO = Number(row.CO);
//     row.SO2 = Number(row.SO2);
//     row.O3 = Number(row.O3);
//     row.Benzene = Number(row.Benzene);
//     row.Toluene = Number(row.Toluene);
//     row.Xylene = Number(row.Xylene);
//     row.AQI = Number(row.AQI);

// });


// AQI_data.forEach(row => {

//     const date = new Date(row.Datetime);

//     row.Year = date.getFullYear();

//     row.Month = date.getMonth() + 1;

//     row.Day = date.getDate();

//     row.DayOfWeek = date.getDay();

// });

// // encode seasons
// function getSeason(month){

//     if([12,1,2].includes(month))
//         return 0; // Winter

//     if([3,4,5].includes(month))
//         return 1; // Summer

//     if([6,7,8,9].includes(month))
//         return 2; // Monsoon

//     return 3; // Post Monsoon
// }

// AQI_data.forEach(row=>{

//     row.Season = getSeason(row.Month);

// });


// AQI_data.forEach(row=>{

//     delete row.Datetime;

// });

// AQI_data.forEach(row=>{
//     delete row.AQI_Bucket;
// });

// console.log(Object.keys(AQI_data[0]));

// ****** weather AQI_data ******
const weather_data = await csv().fromFile("weather_data.csv")
console.log(weather_data);


