const xlsx = require("xlsx");
const fs = require("fs");

// Load Excel file
const workbook = xlsx.readFile("./data/tourism.xlsx");
const sheet_name_list = workbook.SheetNames;
const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Format your data (especially handling 'Coordinate' as an object)
const formattedData = jsonData.map((item) => ({
  Place_Id: Number(item.Place_Id),
  Place_Name: item.Place_Name,
  Description: item.Description,
  Category: item.Category,
  City: item.City,
  Price: Number(item.Price),
  Rating: Number(item.Rating),
  Time_Minutes: Number(item.Time_Minutes),
  Coordinate: {
    lat: Number(item.Lat),
    lng: Number(item.Long),
  },
  Lat: Number(item.Lat),
  Long: Number(item.Long),
  Opening_Hours: item["Opening Hours"],
  Closed_Hours: item["Closed Hours"],
}));

// Save JSON to a file
fs.writeFileSync("data.json", JSON.stringify(formattedData, null, 2));
