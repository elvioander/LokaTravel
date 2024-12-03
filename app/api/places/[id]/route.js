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

    const placeId = params.id; // Use the actual MongoDB _id
    const { userId } = await request.json();

    // Find the place and remove the rating
    const place = await Place.findById(placeId);

    if (!place) {
      return new Response("Place not found", { status: 404 });
    }

    // Filter out the rating for the given userId
    place.Ratings = place.Ratings.filter(
      (rating) => rating.User_Id.toString() !== userId
    );

    // Save the updated place
    await place.save();

    return new Response("Rating deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting rating:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
