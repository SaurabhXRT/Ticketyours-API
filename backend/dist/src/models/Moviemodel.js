import mongoose, { Schema } from 'mongoose';
var movieInCinemaHallSchema = new Schema({
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
movieInCinemaHallSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});
var MovieInCinemaHall = mongoose.model('MovieInCinemaHall', movieInCinemaHallSchema);
export default MovieInCinemaHall;
