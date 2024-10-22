import { Schema, model, models } from "mongoose";

const PlaceSchema = new Schema({
  Place_Id: {
    type: Number,
    required: true,
  },
  Place_Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
  Time_Minutes: {
    type: Number,
    required: true,
  },
  Coordinate: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  Lat: {
    type: Number,
    required: true,
  },
  Long: {
    type: Number,
    required: true,
  },
  Opening_Hours: {
    type: String,
    required: true,
  },
  Closed_Hours: {
    type: String,
    required: true,
  },
});

const Place = models.Place || model("Place", PlaceSchema);

export default Place;
