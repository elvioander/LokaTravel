import { connectToDB } from "@/utils/database";
import Place from "@/models/place";
import { getServerSession } from "next-auth";
const cosineSimilarity = require("cosine-similarity");
const fs = require("fs");
const Papa = require("papaparse");

// Load CSV data
function loadCSV(filePath) {
  const csvData = fs.readFileSync(filePath, "utf8");
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  return parsedData.data;
}

// Build user-item matrix combining CSV and database ratings
async function buildUserItemMatrix() {
  // Get CSV ratings
  const csvRatings = loadCSV("./data/tourism_rating.csv");
  const matrix = {};

  // Add CSV ratings to matrix
  csvRatings.forEach((rating) => {
    const userId = rating.User_Id;
    const placeId = rating.Place_Id.toString();
    if (!matrix[userId]) {
      matrix[userId] = {};
    }
    matrix[userId][placeId] = parseFloat(rating.Place_Ratings);
  });

  // Get database places with ratings
  const places = await Place.find({});

  // Add database ratings to matrix
  places.forEach((place) => {
    place.Ratings.forEach((rating) => {
      const userId = rating.User_Id.toString();
      const placeId = place.Place_Id.toString();

      if (!matrix[userId]) {
        matrix[userId] = {};
      }
      matrix[userId][placeId] = rating.Score;
    });
  });

  return matrix;
}

// Calculate similarity between two users
function calculateUserSimilarity(user1Ratings, user2Ratings) {
  const commonPlaces = Object.keys(user1Ratings).filter((placeId) =>
    Object.keys(user2Ratings).includes(placeId)
  );

  if (commonPlaces.length === 0) return 0;

  const user1Vector = commonPlaces.map((placeId) => user1Ratings[placeId]);
  const user2Vector = commonPlaces.map((placeId) => user2Ratings[placeId]);

  return cosineSimilarity(user1Vector, user2Vector);
}

// Get recommendations for a specific user
async function recommendForUser(userId, userItemMatrix) {
  if (!userItemMatrix[userId]) {
    // If user not in matrix, try to find them in CSV data
    const csvRatings = loadCSV("./data/tourism_rating.csv");
    const userRatings = csvRatings.filter(
      (rating) => rating.User_Id === userId
    );

    if (userRatings.length === 0) {
      return [];
    }

    // Add user ratings to matrix
    userItemMatrix[userId] = {};
    userRatings.forEach((rating) => {
      userItemMatrix[userId][rating.Place_Id] = parseFloat(
        rating.Place_Ratings
      );
    });
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

  // Calculate average scores and filter recommendations with good similarity (score > 0.6)
  const sortedRecommendations = Object.keys(recommendations)
    .map((placeId) => ({
      placeId,
      score:
        recommendations[placeId].totalScore / recommendations[placeId].count,
    }))
    .filter((rec) => rec.score > 0.6) // Only include recommendations with good similarity
    .sort((a, b) => b.score - a.score);

  // Load CSV place data
  const tourismWithId = loadCSV("./data/tourism_with_id.csv");

  // Fetch recommended places from both database and CSV
  const recommendedPlaces = await Promise.all(
    sortedRecommendations.map(async (rec) => {
      // Try to find in database first
      const dbPlace = await Place.findOne({ Place_Id: parseInt(rec.placeId) });

      if (dbPlace) {
        return {
          _id: dbPlace._id,
          Place_Name: dbPlace.Place_Name,
          Category: dbPlace.Category,
          City: dbPlace.City,
          Price: dbPlace.Price,
          Rating: dbPlace.Rating,
          Description: dbPlace.Description,
          Recommendation_Score: rec.score,
        };
      }

      // If not in database, get from CSV
      const csvPlace = tourismWithId.find(
        (place) => place.Place_Id.toString() === rec.placeId
      );

      if (csvPlace) {
        return {
          Place_Id: csvPlace.Place_Id,
          Place_Name: csvPlace.Place_Name,
          Category: csvPlace.Category,
          City: csvPlace.City,
          Price: parseFloat(csvPlace.Price),
          Rating: parseFloat(csvPlace.Rating),
          Description: csvPlace.Description,
          Recommendation_Score: rec.score,
        };
      }

      return null;
    })
  );

  return recommendedPlaces.filter((place) => place !== null);
}

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // Get the current user's ID from params
    const userId = params.userId;

    // Get page from searchParams
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 5; // Number of items per page
    const skip = (page - 1) * limit;

    // Build the user-item matrix combining CSV and database data
    const userItemMatrix = await buildUserItemMatrix();

    // Get all recommendations
    const allRecommendations = await recommendForUser(userId, userItemMatrix);

    if (!allRecommendations || allRecommendations.length === 0) {
      return new Response(
        JSON.stringify({ message: "No recommendations found for this user." }),
        { status: 404 }
      );
    }

    console.log("recommendation is", allRecommendations);

    // Paginate the recommendations
    const paginatedRecommendations = allRecommendations.slice(
      skip,
      skip + limit
    );
    const hasMore = allRecommendations.length > skip + limit;

    return new Response(
      JSON.stringify({
        recommendations: paginatedRecommendations,
        hasMore,
        total: allRecommendations.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in collaborative filtering:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
