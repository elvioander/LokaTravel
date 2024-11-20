import { connectToDB } from "@/utils/database"; // Adjust the import based on your project structure
import Place from "@/models/place";

// POST method to add a rating
export const POST = async (req) => {
  try {
    await connectToDB(); // Connect to the database

    const { placeId, userId, score } = await req.json(); // Parse the incoming JSON body

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

    // Create a new rating object
    const newRating = {
      User_Id: userId,
      Score: score,
      Created_At: new Date(),
    };

    // Push the new rating to the Ratings array
    place.Ratings.push(newRating);

    // Save the updated place document
    await place.save();

    return new Response(
      JSON.stringify({ message: "Rating added successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
