import mongoose, { Schema } from "mongoose";
// Define the CinemaOperator schema
var cinemaOperatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cinema_halls: [
        {
            type: Schema.Types.ObjectId,
            ref: "CinemaHall"
        }
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
// Update `updated_at` field before saving
cinemaOperatorSchema.pre("save", function(next) {
    this.updated_at = new Date();
    next();
});
var CinemaOperator = mongoose.model("CinemaOperator", cinemaOperatorSchema);
export default CinemaOperator;
