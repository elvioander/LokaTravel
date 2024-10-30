// pages/api/distance.js
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const POST = async (req) => {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Parse the request body to get origin and destination
  const { origin, destination } = await req.json();

  console.log(origin, destination);

  // Validate origin and destination
  if (!origin || !destination) {
    return new Response("Origin and destination are required!", {
      status: 400,
    });
  }

  try {
    // Make a request to the Distance Matrix API
    const response = await client.distancematrix({
      params: {
        origins: [`${origin.lat},${origin.lng}`], // Use latitude and longitude for origin
        destinations: [`${destination.lat},${destination.lng}`], // Use latitude and longitude for destination
        key: process.env.GOOGLE_MAPS_API_KEY, // Use your API key from environment variables
        mode: "driving", // Optional: you can change this to "walking", "bicycling", etc.
      },
    });

    // Log the response data for debugging
    console.log("Client response: ", response.data.rows[0]);

    // Extract distance and duration from the response
    const distance = response.data.rows[0].elements[0].distance.text;
    const duration = response.data.rows[0].elements[0].duration.text;

    // Log the distance and duration for debugging
    console.log("Distance: ", distance);
    console.log("Duration: ", duration);

    // Return the distance and duration in the response
    return new Response(
      JSON.stringify({ distance: distance, duration: duration }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching distance matrix:", error);
    return new Response("Failed to fetch distance and duration", {
      status: 500,
    });
  }
};
