// processRatings.js
const fs = require("fs");
const Papa = require("papaparse");

// Read the tourism_rating.csv
const ratingsData = fs.readFileSync("./data/tourism_rating.csv", "utf8");
const parsedRatings = Papa.parse(ratingsData, { header: true });

// Read the existing data.json
const placesData = JSON.parse(fs.readFileSync("./seed/data.json", "utf8"));

// Process ratings
const ratingsByPlace = parsedRatings.data.reduce((acc, rating) => {
  const placeId = parseInt(rating.Place_Id);
  if (!acc[placeId]) {
    acc[placeId] = [];
  }
  acc[placeId].push({
    User_Id: rating.User_Id,
    Score: parseFloat(rating.Place_Ratings),
    Created_At: new Date().toISOString(),
  });
  return acc;
}, {});

// Update places with ratings
const updatedPlacesData = placesData.map((place) => {
  const placeRatings = ratingsByPlace[place.Place_Id] || [];

  // Calculate average rating
  const avgRating =
    placeRatings.length > 0
      ? placeRatings.reduce((sum, rating) => sum + rating.Score, 0) /
        placeRatings.length
      : place.Rating;

  return {
    ...place,
    Rating: Number(avgRating.toFixed(1)),
    Ratings: placeRatings,
  };
});

// Write updated data back to file
fs.writeFileSync(
  "./seed/data.json",
  JSON.stringify(updatedPlacesData, null, 2)
);

console.log("Ratings processed and added to data.json");
