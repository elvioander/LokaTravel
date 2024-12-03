import { connectToDB } from "@/utils/database";
import Place from "@/models/place";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    await connectToDB();

    const { placeId, userId, score } = await req.json();
    console.log("Received rating data:", { placeId, userId, score });

    if (!placeId || !userId || !score) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    const place = await Place.findById(placeId);

    if (!place) {
      return new Response(JSON.stringify({ message: "Place not found." }), {
        status: 404,
      });
    }

    // Ensure Ratings array exists
    if (!place.Ratings) {
      place.Ratings = [];
    }

    // Convert userId to ObjectId using 'new'
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Modify the finding of existing rating to be more robust
    const existingRatingIndex = place.Ratings.findIndex((rating) => {
      // Log details to help debug
      console.log("Comparing:", {
        ratingUserId: rating.User_Id,
        inputUserId: userObjectId,
        comparisonResult:
          rating.User_Id?.toString() === userObjectId.toString(),
      });

      // Use optional chaining and explicit toString comparison
      return (
        rating.User_Id && rating.User_Id.toString() === userObjectId.toString()
      );
    });

    console.log("Existing rating index:", existingRatingIndex);

    if (existingRatingIndex !== -1) {
      // Update existing rating
      place.Ratings[existingRatingIndex].Score = score;
      place.Ratings[existingRatingIndex].Created_At = new Date();
    } else {
      // Create a new rating object
      const newRating = {
        User_Id: userObjectId,
        Score: score,
        Created_At: new Date(),
      };

      // Push the new rating to the Ratings array
      place.Ratings.push(newRating);
    }

    // Recalculate average rating
    const totalRatings = place.Ratings.reduce(
      (sum, rating) => sum + rating.Score,
      0
    );
    place.Rating = Number((totalRatings / place.Ratings.length).toFixed(1));

    // Save the updated place document
    const savedPlace = await place.save();

    console.log("Saved place:", savedPlace);

    return new Response(
      JSON.stringify({
        message: "Rating added successfully.",
        newRating: place.Rating,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Full error details:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
