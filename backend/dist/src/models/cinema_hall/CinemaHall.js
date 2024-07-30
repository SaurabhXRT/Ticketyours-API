import mongoose, { Schema } from "mongoose";
// Define the CinemaHall schema
var cinemaHallSchema = new Schema({
    operator_id: {
        type: Schema.Types.ObjectId,
        ref: "CinemaOperator",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city_id: {
        type: Schema.Types.ObjectId,
        ref: "City",
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movie",
            required: true
        }
    ],
    total_seats: {
        type: [
            String
        ],
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
cinemaHallSchema.pre("save", function(next) {
    this.updated_at = new Date();
    next();
});
var CinemaHall = mongoose.model("CinemaHall", cinemaHallSchema);
export default CinemaHall;
