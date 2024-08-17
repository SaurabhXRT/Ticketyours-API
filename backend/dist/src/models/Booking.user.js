import mongoose, { Schema } from 'mongoose';
var userBookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cinema_hall_name: {
        type: String,
        required: true
    },
    movie_title: {
        type: String,
        required: true
    },
    seat_numbers: [
        {
            type: String,
            required: true
        }
    ],
    showtime: {
        type: Date,
        required: true
    },
    booking_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
userBookingSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});
var UserBooking = mongoose.model('UserBooking', userBookingSchema);
export default UserBooking;
