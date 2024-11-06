import { Schema, model, models } from "mongoose";
import Place from "./place";

const TripSchema = new Schema({
  optimalRoute: {
    type: [Number],
  },
  selectedLocations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Trip = models.Trip || model("Trip", TripSchema);

export default Trip;
