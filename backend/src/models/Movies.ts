import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Movie schema
interface Movie extends Document {
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

// Define the Movie schema
const movieSchema = new Schema<Movie>({
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

// Update `updated_at` field before saving
movieSchema.pre<Movie>('save', function(next) {
  this.updated_at = new Date();
  next();
});

const Movie = mongoose.model<Movie>('Movie', movieSchema);

export default Movie;
