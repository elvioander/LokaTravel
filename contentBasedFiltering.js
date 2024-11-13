const fs = require("fs");
const Papa = require("papaparse");
const cosineSimilarity = require("cosine-similarity");

// Step 1: Load the CSV files
function loadCSV(filePath) {
  const csvData = fs.readFileSync(filePath, "utf8");
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  return parsedData.data;
}

const tourismWithId = loadCSV("./data/tourism_with_id.csv"); // Contains Place_Id, Place_Name, Description, Category, City, Price, Rating, etc.

const tourismRatings = loadCSV("./data/tourism_rating.csv"); // Contains User_Id, Place_Id, Place Ratings

// Step 2: Preprocess tourism_with_id.csv and generate content features
tourismWithId.forEach((place) => {
  place.content_features = `${place.Category} ${place.City} ${place.Price}`;
});

// Step 3: Convert 'content_features' into a vector for each place
function getFeatureVector(text) {
  const words = text.toLowerCase().split(/\s+/);
  const vector = {};
  words.forEach((word) => {
    vector[word] = (vector[word] || 0) + 1;
  });
  return vector;
}

// Step 4: Get the feature vectors for all places
const placeVectors = tourismWithId.map((place) =>
  getFeatureVector(place.content_features)
);

// Step 5: Function to calculate cosine similarity
function calculateSimilarity(vector1, vector2) {
  return cosineSimilarity(vector1, vector2);
}

// Step 6: Function to recommend places similar to a given place
function recommendSimilarPlaces(placeName, topN = 5) {
  // Find the place in tourismWithId based on its name
  const targetPlace = tourismWithId.find(
    (place) => place.Place_Name.toLowerCase() === placeName.toLowerCase()
  );

  if (!targetPlace) {
    return `Place "${placeName}" not found.`;
  }

  // Get the feature vector for the target place (e.g., Pantai Kuta)
  const targetPlaceVector = getFeatureVector(targetPlace.content_features);

  // Create a dictionary to store similarity scores
  const similarityScores = {};

  // Compare the target place with all other places in the dataset
  tourismWithId.forEach((otherPlace, index) => {
    if (otherPlace.Place_Id !== targetPlace.Place_Id) {
      // Skip the target place itself
      const otherPlaceVector = placeVectors[index];
      const similarity = calculateSimilarity(
        targetPlaceVector,
        otherPlaceVector
      );
      similarityScores[otherPlace.Place_Id] = similarity;
    }
  });

  // Step 7: Sort places by similarity and return the top N recommendations
  const recommendedPlaces = Object.keys(similarityScores)
    .map((placeId) => ({
      placeId: placeId,
      similarity: similarityScores[placeId],
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN) // Get the top N recommendations
    .map((item) => {
      const place = tourismWithId.find(
        (place) => place.Place_Id == item.placeId
      );
      return {
        Place_Name: place.Place_Name,
        Category: place.Category,
        City: place.City,
        Price: place.Price,
        Rating: place.Rating,
      };
    });

  return recommendedPlaces;
}

// Example: Get 5 recommended places similar to "Pantai Kuta"
const recommendedPlaces = recommendSimilarPlaces("Pantai Ngobaran", 8);
console.log(recommendedPlaces);
