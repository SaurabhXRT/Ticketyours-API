import mongoose, { Document, Schema } from 'mongoose';

interface MovieInCinemaHall extends Document {
  movie_id: mongoose.Types.ObjectId;
  cinema_hall_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  genre: string;
  duration: number;
  release_date: Date;
  end_date: Date;
  poster_url: string;
  created_at: Date;
  updated_at: Date;
}

const movieInCinemaHallSchema = new Schema<MovieInCinemaHall>({
  movie_id: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  cinema_hall_id: {
    type: Schema.Types.ObjectId,
    ref: "CinemaHall",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  poster_url: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});


movieInCinemaHallSchema.pre<MovieInCinemaHall>('save', function(next) {
  this.updated_at = new Date();
  next();
});

const MovieInCinemaHall = mongoose.model<MovieInCinemaHall>('MovieInCinemaHall', movieInCinemaHallSchema);

export default MovieInCinemaHall;
