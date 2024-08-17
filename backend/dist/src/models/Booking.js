import mongoose, { Schema } from 'mongoose';
var bookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    showtime_id: {
        type: Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true
    },
    booking_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    seats: [
        {
            type: String,
            required: true
        }
    ],
    amount_paid: {
        type: Number,
        required: true
    },
    payment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    ticket_id: {
        type: String,
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
bookingSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});
var Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
