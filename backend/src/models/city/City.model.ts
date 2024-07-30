import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the City schema
export interface CityModel extends Document {
  name: string;
  state: string;
  // Optionally add other fields as needed
  // country: string;
  cinemaHalls: mongoose.Schema.Types.ObjectId[];
  cinemaMovies: mongoose.Schema.Types.ObjectId[];
  cityId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the City schema
const citymodelSchema = new Schema<CityModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
    },
    cinemaHalls: [
      {
        type: Schema.Types.ObjectId,
        ref: "CinemaHall",
      },
    ],
    cinemaMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: "MovieInCinemaHall",
      },
    ],
    // Optionally define additional fields
    // country: {
    //     type: String,
    //     required: true
    // }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const CityModel = mongoose.model<CityModel>("CityModel", citymodelSchema);

export default CityModel;
