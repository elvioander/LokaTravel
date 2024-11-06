import { Schema, model, models } from "mongoose";
import Place from "./place";

const TripSchema = new Schema({
  OptimalRoute: {
    type: [Number],
  },
  selectedLocations: {
    type: [Place],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Trip = models.Trip || model("Trip", TripSchema);

export default Trip;
