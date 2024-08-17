import mongoose, { Document, Schema } from "mongoose";

//interface for the CinemaHall schema
interface CinemaHall extends Document {
  operator_id: mongoose.Types.ObjectId;
  name: string;
  street: string;
  city_id: mongoose.Types.ObjectId;
  state: string;
  zipcode: string;
  movies: mongoose.Types.ObjectId[];
  total_seats: string[];
  created_at: Date;
  updated_at: Date;
}

// CinemaHall schema
const cinemaHallSchema = new Schema<CinemaHall>({
  operator_id: {
    type: Schema.Types.ObjectId,
    ref: "CinemaOperator",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city_id: {
    type: Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  ],
  total_seats: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

cinemaHallSchema.pre<CinemaHall>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const CinemaHall = mongoose.model<CinemaHall>("CinemaHall", cinemaHallSchema);

export default CinemaHall;
