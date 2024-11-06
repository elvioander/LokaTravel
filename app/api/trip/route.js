import { connectToDB } from "@/utils/database";
const { Client } = require("@googlemaps/google-maps-services-js");
import Trip from "@/models/trip";

export const POST = async (req) => {
  "Please print me bang";
  const { userId, tripLocations } = await req.json;
  console.log(tripLocations);
  try {
    await connectToDB();

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const locations = selectedLocations.map((location) => location.Place_Name);

    // Function to get the distance matrix using Google Maps API
    async function getDistanceMatrix(apiKey, locations) {
      const client = new Client({});

      try {
        const response = await client.distancematrix({
          params: {
            origins: locations,
            destinations: locations,
            key: apiKey,
            mode: "driving",
          },
        });

        const distanceMatrix = response.data.rows.map((row) =>
          row.elements.map((element) =>
            element.distance ? element.distance.value / 1000 : Infinity
          )
        );

        console.log(distanceMatrix);
        return distanceMatrix;
      } catch (err) {
        console.error("Error fetching distance matrix: ", err);
        return [];
      }
    }

    // Simple greedy TSP solver for route optimization (since OR-Tools is not available in JS)
    function tspSolver(distanceMatrix) {
      const numLocations = distanceMatrix.length;
      const visited = new Array(numLocations).fill(false);
      let route = [0];
      visited[0] = true;

      for (let i = 0; i < numLocations - 1; i++) {
        let lastVisited = route[route.length - 1];
        let nearest = -1;
        let nearestDistance = Infinity;

        for (let j = 0; j < numLocations; j++) {
          if (!visited[j] && distanceMatrix[lastVisited][j] < nearestDistance) {
            nearest = j;
            nearestDistance = distanceMatrix[lastVisited][j];
          }
        }

        route.push(nearest);
        visited[nearest] = true;
      }

      // Return to the starting point
      route.push(0);
      return route;
    }

    // Function to print the optimal route
    function printSolution(route) {
      console.log("Optimal route:");
      console.log(route.join(" -> "));
    }

    // Main function
    const distanceMatrix = await getDistanceMatrix(apiKey, locations);
    if (distanceMatrix.length > 0) {
      const optimalRoute = tspSolver(distanceMatrix);
      printSolution(optimalRoute);

      const newTrip = new Trip({
        optimalRoute: optimalRoute,
        selectedLocations: tripLocations,
        creator: userId,
      });
      await newTrip.save();
      return new Response(JSON.stringify(newTrip), { status: 200 });
    } else {
      throw new Error("Failed to calculate the distance matrix.");
    }
  } catch (error) {
    return new Response("Failed to save trip", { status: 500 });
  }
};
