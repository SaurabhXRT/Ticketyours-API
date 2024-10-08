import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "mongodb";

interface CinemaOperator extends Document {
  name: string;
  email: string;
  password_hash: string;
  phone: string;
  cinema_halls: ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const cinemaOperatorSchema = new Schema<CinemaOperator>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cinema_halls: [
    {
      type: Schema.Types.ObjectId,
      ref: "CinemaHall",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

cinemaOperatorSchema.pre<CinemaOperator>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const CinemaOperator = mongoose.model<CinemaOperator>(
  "CinemaOperator",
  cinemaOperatorSchema
);

export default CinemaOperator;
