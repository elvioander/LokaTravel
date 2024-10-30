import Place from "@/models/place";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Parse the query string
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("q"); // Get the 'q' param from query

    // Build a more flexible regular expression pattern
    const regex = new RegExp(searchTerm.split(" ").join("|"), "i"); // Split search term by space and join with '|'

    // Query the database
    const places = await Place.find({
      $or: [
        { Place_Name: { $regex: regex } }, // Search by Place_Name
        { Description: { $regex: regex } }, // Optionally, search by Description
      ],
    });

    if (!places.length) {
      return new Response("Places Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(places), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
