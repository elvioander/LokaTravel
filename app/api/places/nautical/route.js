import Place from "@/models/place";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const places = await Place.find({ Category: "Bahari" }).limit(5);
    if (!places) return new Response("Places Not Found", { status: 404 });

    return new Response(JSON.stringify(places), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
