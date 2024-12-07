import Place from "@/models/place";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const place = await Place.findById(params.id).populate({
      path: "Ratings.User_Id",
      select: "username image",
    });
    if (!place) return new Response("Place Not Found", { status: 404 });
    return new Response(JSON.stringify(place), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const placeId = params.id; // MongoDB _id of the place
    const { userId, ratingId } = await request.json(); // Include ratingId

    // Find the place
    const place = await Place.findById(placeId);

    if (!place) {
      return new Response("Place not found", { status: 404 });
    }

    // Find the specific rating index
    const ratingIndex = place.Ratings.findIndex(
      (rating) =>
        rating.User_Id.toString() === userId &&
        rating._id.toString() === ratingId
    );

    // If rating found, remove it
    if (ratingIndex !== -1) {
      place.Ratings.splice(ratingIndex, 1);

      // Recalculate average rating
      if (place.Ratings.length > 0) {
        const totalRatings = place.Ratings.reduce(
          (sum, rating) => sum + rating.Score,
          0
        );
        place.Rating = Number((totalRatings / place.Ratings.length).toFixed(1));
      } else {
        // If no ratings left, set average rating to 0
        place.Rating = 0;
      }

      // Save the updated place
      await place.save();

      return new Response(
        JSON.stringify({
          message: "Rating deleted successfully",
          newRating: place.Rating,
        }),
        { status: 200 }
      );
    } else {
      return new Response("Rating not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting rating:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
