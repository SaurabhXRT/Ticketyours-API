import mongoose, { Document, Schema } from "mongoose";

interface Seat extends Document {
  seat_number: string;
  seat_type: string;
  row: number;
  column: number;
  price: number;
}

const SeatSchema = new Schema<Seat>({
  seat_number: {
    type: String,
    required: true,
  },
  seat_type: {
    type: String,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

interface SeatingArrangement extends Document {
  cinema_hall_id: mongoose.Types.ObjectId;
  seats: Seat[];
  created_at: Date;
  updated_at: Date;
}

const SeatingArrangementSchema = new Schema<SeatingArrangement>({
  cinema_hall_id: {
    type: Schema.Types.ObjectId,
    ref: "CinemaHall",
    required: true,
  },
  seats: [SeatSchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

SeatingArrangementSchema.pre<SeatingArrangement>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const SeatingArrangement = mongoose.model<SeatingArrangement>(
  "SeatingArrangement",
  SeatingArrangementSchema
);

export default SeatingArrangement;
