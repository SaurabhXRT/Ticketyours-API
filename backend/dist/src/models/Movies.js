import mongoose, { Schema } from 'mongoose';
var movieSchema = new Schema({
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
movieSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});
var Movie = mongoose.model('Movie', movieSchema);
export default Movie;
