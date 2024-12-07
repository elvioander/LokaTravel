import Place from "@/models/place";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Parse the query string
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("q")?.trim(); // Get the 'q' param and trim whitespace

    if (!searchTerm) {
      return new Response("Search term is required", { status: 400 });
    }

    // Create a regex that matches whole words or partial matches
    const wordRegex = searchTerm
      .split(/\s+/)
      .map((word) => new RegExp(`(^${word}|\\s${word})`, "i"));

    // Query the database for matches
    const places = await Place.find({
      $or: [
        { Place_Name: { $regex: new RegExp(searchTerm, "i") } },
        { Description: { $regex: new RegExp(searchTerm, "i") } },
        { Category: { $regex: new RegExp(searchTerm, "i") } },
        { City: { $regex: new RegExp(searchTerm, "i") } },
        // Additional matching for whole words
        ...(wordRegex.length > 0
          ? [
              { Place_Name: { $all: wordRegex } },
              { Description: { $all: wordRegex } },
              { Category: { $all: wordRegex } },
              { City: { $all: wordRegex } },
            ]
          : []),
      ],
    })
      .sort({
        // Sorting logic to prioritize matches
        Place_Name: -1, // Exact or near-exact name matches first
        Description: -1, // Then description matches
      })
      .limit(50); // Limit to prevent overwhelming results

    if (!places.length) {
      return new Response("Places Not Found", { status: 404 });
    }

    // Optional: Additional client-side sorting can be done if needed
    const sortedPlaces = places.sort((a, b) => {
      // Custom sorting logic if required
      const aNameMatch = a.Place_Name.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
      const bNameMatch = b.Place_Name.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    });

    return new Response(JSON.stringify(sortedPlaces), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Search Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
