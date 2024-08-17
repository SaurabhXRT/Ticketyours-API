import mongoose, { Document, Schema } from "mongoose";

// interface for the Movie schema
interface Movie extends Document {
  movie_id: mongoose.Types.ObjectId;
  //showtime_slots: Array<{ showtime_slot_id: mongoose.Types.ObjectId }>;
}

// Movie schema
const movieSchema = new Schema<Movie>(
  {
    movie_id: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    // showtime_slots: [
    //   {
    //     showtime_slot_id: {
    //       type: Schema.Types.ObjectId,
    //       ref: "ShowtimeSlot",
    //       required: true,
    //     },
    //   },
    // ],
  },
  { _id: false }
);

export default movieSchema;
