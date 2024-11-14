const xlsx = require("xlsx");
const fs = require("fs");
const axios = require("axios");

// Load Excel file
const workbook = xlsx.readFile("./data/tourism.xlsx");
const sheet_name_list = workbook.SheetNames;
const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Pexels API configuration
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const pexelsApiUrl = "https://api.pexels.com/v1/search";

// Function to fetch images from Pexels based on place name
async function fetchImages(placeName) {
  try {
    const response = await axios.get(pexelsApiUrl, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: placeName,
        per_page: 3,
      },
    });

    // Extract URLs of the images from the response
    return response.data.photos.map((photo) => photo.src.small);
  } catch (error) {
    console.error(`Error fetching images for ${placeName}:`, error.message);
    return []; // Return an empty array if there's an error
  }
}

// Function to parse coordinate strings into an object with lat and lng as numbers
const parseCoordinates = (coordinateString) => {
  const cleanedString = coordinateString.replace(/[{'"}]/g, "").trim();
  const parts = cleanedString.split(",").map((part) => part.trim());
  const lat = parseFloat(parts[0].split(":")[1]);
  const lng = parseFloat(parts[1].split(":")[1]);
  return { lat, lng };
};

// Format your data with image fetching
async function formatData() {
  const formattedData = await Promise.all(
    jsonData.map(async (item) => {
      const { lat, lng } = parseCoordinates(item.Coordinate); // Parse coordinates

      // Fetch images based on the place name from Pexels
      const images = await fetchImages(item.Place_Name);

      return {
        Place_Id: Number(item.Place_Id),
        Place_Name: item.Place_Name,
        Description: item.Description,
        Category: item.Category,
        City: item.City,
        Price: Number(item.Price),
        Rating: Number(item.Rating),
        Time_Minutes: Number(item.Time_Minutes),
        Coordinate: { lat, lng },
        Lat: lat,
        Long: lng,
        Opening_Hours: item["Opening Hours"],
        Closed_Hours: item["Closed Hours"],
        Images: images, // Add the fetched images here
      };
    })
  );

  // Save JSON to a file
  fs.writeFileSync(
    "data_with_images.json",
    JSON.stringify(formattedData, null, 2)
  );
  console.log("Data saved with images.");
}

formatData();
