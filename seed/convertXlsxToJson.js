const xlsx = require("xlsx");
const fs = require("fs");

// Load Excel file
const workbook = xlsx.readFile("./data/tourism.xlsx");
const sheet_name_list = workbook.SheetNames;
const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Function to parse coordinate strings into an object with lat and lng as numbers
const parseCoordinates = (coordinateString) => {
  // Remove the curly braces and split by comma
  const cleanedString = coordinateString.replace(/[{'}]/g, "").trim();
  const parts = cleanedString.split(",").map((part) => part.trim());
  const lat = parseFloat(parts[0].split(":")[1]);
  const lng = parseFloat(parts[1].split(":")[1]);
  return { lat, lng };
};

// Format your data
const formattedData = jsonData.map((item) => {
  const { lat, lng } = parseCoordinates(item.Coordinate); // Parse coordinates

  return {
    Place_Id: Number(item.Place_Id),
    Place_Name: item.Place_Name,
    Description: item.Description,
    Category: item.Category,
    City: item.City,
    Price: Number(item.Price),
    Rating: Number(item.Rating),
    Time_Minutes: Number(item.Time_Minutes),
    Coordinate: {
      lat, // lat as a number
      lng, // lng as a number
    },
    Lat: lat, // lat as a number
    Long: lng, // lng as a number
    Opening_Hours: item["Opening Hours"],
    Closed_Hours: item["Closed Hours"],
  };
});

// Save JSON to a file
fs.writeFileSync("data.json", JSON.stringify(formattedData, null, 2));
