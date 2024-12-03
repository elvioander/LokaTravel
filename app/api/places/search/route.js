import Place from "@/models/place";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Parse the query string
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("q"); // Get the 'q' param from query

    const regex = new RegExp(searchTerm.split(" ").join("|"), "i"); // Split search term by space and join with '|'

    // Query the database for partial matches
    const places = await Place.find({
      $or: [
        { Place_Name: { $regex: regex } }, // Search by Place_Name
        { Description: { $regex: regex } },
        { City: { $regex: regex } },
      ],
    });

    // Separate exact matches, partial Place_Name matches, and Description matches
    const exactMatches = places.filter(
      (place) => place.Place_Name.toLowerCase() === searchTerm.toLowerCase()
    );
    const placeNameMatches = places.filter(
      (place) =>
        regex.test(place.Place_Name) &&
        place.Place_Name.toLowerCase() !== searchTerm.toLowerCase()
    );
    const descriptionMatches = places.filter(
      (place) => !regex.test(place.Place_Name) && regex.test(place.Description)
    );

    // Concatenate arrays, with exact matches first, then partial Place_Name matches, then Description matches
    const sortedPlaces = [
      ...exactMatches,
      ...placeNameMatches,
      ...descriptionMatches,
    ];

    if (!sortedPlaces.length) {
      return new Response("Places Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(sortedPlaces), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
