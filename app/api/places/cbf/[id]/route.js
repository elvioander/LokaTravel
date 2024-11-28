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

// Step 1: Build the user-item matrix
function buildUserItemMatrix(tourismRatings) {
  const matrix = {};
  tourismRatings.forEach((rating) => {
    const { User_Id, Place_Id, Place_Ratings } = rating;
    if (!matrix[User_Id]) {
      matrix[User_Id] = {};
    }
    matrix[User_Id][Place_Id] = parseFloat(Place_Ratings);
  });
  return matrix;
}

// Step 2: Calculate similarity between two users
function calculateUserSimilarity(user1Ratings, user2Ratings) {
  const commonPlaces = Object.keys(user1Ratings).filter((placeId) =>
    Object.keys(user2Ratings).includes(placeId)
  );

  if (commonPlaces.length === 0) return 0;

  const user1Vector = commonPlaces.map((placeId) => user1Ratings[placeId]);
  const user2Vector = commonPlaces.map((placeId) => user2Ratings[placeId]);

  return cosineSimilarity(user1Vector, user2Vector);
}

// Step 3: Get recommendations for a specific user
function recommendForUser(userId, userItemMatrix, topN = 5) {
  if (!userItemMatrix[userId]) {
    return `User "${userId}" has no ratings.`;
  }

  const targetUserRatings = userItemMatrix[userId];
  const similarityScores = {};

  // Calculate similarity with all other users
  Object.keys(userItemMatrix).forEach((otherUserId) => {
    if (otherUserId !== userId) {
      similarityScores[otherUserId] = calculateUserSimilarity(
        targetUserRatings,
        userItemMatrix[otherUserId]
      );
    }
  });

  // Sort users by similarity
  const similarUsers = Object.keys(similarityScores)
    .filter((otherUserId) => similarityScores[otherUserId] > 0)
    .sort((a, b) => similarityScores[b] - similarityScores[a]);

  const recommendations = {};

  // Aggregate recommendations based on similar users
  similarUsers.forEach((similarUserId) => {
    const similarUserRatings = userItemMatrix[similarUserId];
    Object.keys(similarUserRatings).forEach((placeId) => {
      if (!targetUserRatings[placeId]) {
        if (!recommendations[placeId]) {
          recommendations[placeId] = {
            totalScore: 0,
            count: 0,
          };
        }
        recommendations[placeId].totalScore +=
          similarUserRatings[placeId] * similarityScores[similarUserId];
        recommendations[placeId].count++;
      }
    });
  });

  // Calculate average scores and return top recommendations
  const sortedRecommendations = Object.keys(recommendations)
    .map((placeId) => ({
      placeId,
      score:
        recommendations[placeId].totalScore / recommendations[placeId].count,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return sortedRecommendations.map((item) => {
    const place = tourismWithId.find((place) => place.Place_Id == item.placeId);
    return {
      Place_Name: place.Place_Name,
      Category: place.Category,
      City: place.City,
      Price: place.Price,
      Rating: place.Rating,
      Recommendation_Score: item.score,
    };
  });
}
const userItemMatrix = buildUserItemMatrix(tourismRatings);
const recommendationsForUser = recommendForUser(
  "672090a2fe444426343ee6ca",
  userItemMatrix,
  5
);
/* console.log("Collaborative", recommendationsForUser); */

import Place from "@/models/place";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const place = await Place.findById(params.id);

    const recommendedPlaces = recommendSimilarPlaces(place.Place_Name, 8);
    const placeNames = recommendedPlaces.map((place) => place.Place_Name);

    const placesFromDB = await Place.find({
      Place_Name: { $in: placeNames },
    });

    return new Response(JSON.stringify(placesFromDB), { status: 200 });
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
