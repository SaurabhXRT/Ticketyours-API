import mongoose, { Schema } from "mongoose";
var SeatSchema = new Schema({
    seat_number: {
        type: String,
        required: true
    },
    seat_type: {
        type: String,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    column: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
var SeatingArrangementSchema = new Schema({
    cinema_hall_id: {
        type: Schema.Types.ObjectId,
        ref: "CinemaHall",
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
SeatingArrangementSchema.pre("save", function(next) {
    this.updated_at = new Date();
    next();
});
var SeatingArrangement = mongoose.model("SeatingArrangement", SeatingArrangementSchema);
export default SeatingArrangement;
