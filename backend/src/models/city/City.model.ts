import mongoose, { Document, Schema } from "mongoose";

// interface for the City schema
export interface CityModel extends Document {
  name: string;
  state: string;
  // country: string;
  cinemaHalls: mongoose.Schema.Types.ObjectId[];
  cinemaMovies: mongoose.Schema.Types.ObjectId[];
  cityId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// City schema
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
    // country: {
    //     type: String,
    //     required: true
    // }
  },
  {
    timestamps: true, 
  }
);

const CityModel = mongoose.model<CityModel>("CityModel", citymodelSchema);

export default CityModel;
