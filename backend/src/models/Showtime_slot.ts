import mongoose, { Document, Schema } from "mongoose";


interface Seat extends Document {
  seat_number: string;
  seat_type: string;
  price: number;
  status: "available" | "booked" | "locked";
  locked_until?: Date;
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
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "locked"],
    default: "available",
  },
  locked_until: { type: Date },
});


interface ShowtimeSlot extends Document {
  movie_id: mongoose.Types.ObjectId;
  cinema_hall_id: mongoose.Types.ObjectId;
  start_time: Date;
  end_time: Date;
  date: Date;
  seats: Seat[];
  created_at: Date;
  updated_at: Date;
}

const ShowtimeSlotSchema = new Schema<ShowtimeSlot>({
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinema_hall_id: {
    type: Schema.Types.ObjectId,
    ref: "CinemaHall",
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
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

ShowtimeSlotSchema.pre<ShowtimeSlot>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const ShowtimeSlot = mongoose.model<ShowtimeSlot>(
  "ShowtimeSlot",
  ShowtimeSlotSchema
);

export default ShowtimeSlot;
