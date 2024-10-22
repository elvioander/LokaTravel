import Place from "@/models/place";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Parse the query string
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("q"); // Get the 'q' param from query

    // Query the database
    const places = await Place.find({
      Place_Name: { $regex: searchTerm, $options: "i" }, // Case-insensitive search
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
