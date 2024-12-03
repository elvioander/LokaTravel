import { connectToDB } from "@/utils/database";
import Trip from "@/models/trip";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const place = await Trip.find({ creator: params.id }).populate(
      "selectedLocations"
    );
    console.log("selected is:", place);
    if (!place) return new Response("Trip Not Found", { status: 404 });
    return new Response(JSON.stringify(place), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
