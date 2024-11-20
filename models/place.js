import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

// Define the schema for a Place
const PlaceSchema = new Schema({
  // Unique identifier for the place
  Place_Id: {
    type: Number,
    required: true, // This field is mandatory
  },

  // Name of the place
  Place_Name: {
    type: String,
    required: true, // This field is mandatory
  },

  // Description of the place, providing details about its features or offerings
  Description: {
    type: String,
    required: true, // This field is mandatory
  },

  // Category of the place (e.g., restaurant, park, museum)
  Category: {
    type: String,
    required: true, // This field is mandatory
  },

  // City where the place is located
  City: {
    type: String,
    required: true, // This field is mandatory
  },

  // Price associated with the place, possibly indicating entry fees or average costs
  Price: {
    type: Number,
    required: true, // This field is mandatory
  },

  // Average rating of the place, typically on a scale (e.g., 1 to 5 stars)
  Rating: {
    type: Number,
    required: true, // This field is mandatory
  },

  // Estimated time to spend at the place, in minutes
  Time_Minutes: {
    type: Number,
    required: true, // This field is mandatory
  },

  // Geographical coordinates of the place
  Coordinate: {
    lat: {
      type: Number,
      required: true, // Latitude is mandatory
    },
    lng: {
      type: Number,
      required: true, // Longitude is mandatory
    },
  },

  // Latitude of the place, redundant but could be used separately
  Lat: {
    type: Number,
    required: true, // This field is mandatory
  },

  // Longitude of the place, redundant but could be used separately
  Long: {
    type: Number,
    required: true, // This field is mandatory
  },

  // Opening hours of the place, indicating when it is accessible to visitors
  Opening_Hours: {
    type: String,
    required: true, // This field is mandatory
  },

  // Closed hours of the place, indicating when it is not accessible to visitors
  Closed_Hours: {
    type: String,
    required: true, // This field is mandatory
  },

  // Array of ratings given by users for this place
  Ratings: [
    {
      // Unique identifier for each rating
      Rating_Id: {
        type: Schema.Types.ObjectId, // Using ObjectId for unique identification
        default: () => new mongoose.Types.ObjectId(), // Automatically generate a new ObjectId
      },
      // The user who gave the rating (could be a reference to a User model)
      User_Id: {
        type: Schema.Types.ObjectId,
        required: true, // This field is mandatory
        ref: "User", // Reference to the User model
      },
      // The rating score given by the user (e.g., 1 to 5)
      Score: {
        type: Number,
        required: true, // This field is mandatory
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
      },
      // Timestamp for when the rating was created
      Created_At: {
        type: Date,
        default: Date.now, // Default to the current date and time
      },
    },
  ],
});

// Create a model for the Place schema, ensuring only one instance exists
const Place = models.Place || model("Place", PlaceSchema);

// Export the Place model for use in other parts of the application
export default Place;
