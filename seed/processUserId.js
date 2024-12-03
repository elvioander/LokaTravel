const fs = require("fs");
const mongoose = require("mongoose");

// Read the existing data
const placesData = JSON.parse(fs.readFileSync("./seed/data.json", "utf8"));

// Function to generate a valid ObjectId
const generateValidObjectId = (seed) => {
  // Create a 24-character hex string based on the seed
  const hexSeed = seed.toString(16).padStart(24, "0").slice(-24);
  return new mongoose.Types.ObjectId(hexSeed);
};

// Process the data to convert User_Id in Ratings
const processedPlacesData = placesData.map((place) => {
  // If Ratings exist, convert User_Id to valid ObjectId
  if (place.Ratings && place.Ratings.length > 0) {
    place.Ratings = place.Ratings.map((rating) => {
      // Convert the existing User_Id to a valid ObjectId
      // Use the original User_Id as a seed for consistent conversion
      return {
        ...rating,
        User_Id: generateValidObjectId(rating.User_Id),
      };
    });
  }
  return place;
});

// Write the processed data back to the file
fs.writeFileSync(
  "./seed/data.json",
  JSON.stringify(processedPlacesData, null, 2)
);

console.log("User IDs in ratings have been converted to valid ObjectIds");
