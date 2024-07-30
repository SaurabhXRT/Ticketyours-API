import mongoose, { Schema } from "mongoose";
// Define the Seat schema
var SeatSchema = new Schema({
    seat_number: {
        type: String,
        required: true
    },
    seat_type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            "available",
            "booked",
            "locked"
        ],
        default: "available"
    },
    locked_until: {
        type: Date
    }
});
// Define the ShowtimeSlot schema
var ShowtimeSlotSchema = new Schema({
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
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    seats: [
        SeatSchema
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
ShowtimeSlotSchema.pre("save", function(next) {
    this.updated_at = new Date();
    next();
});
var ShowtimeSlot = mongoose.model("ShowtimeSlot", ShowtimeSlotSchema);
export default ShowtimeSlot;
