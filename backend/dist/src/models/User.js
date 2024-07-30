import mongoose, { Schema } from 'mongoose';
// Define the booking schema
var bookingSchema = new Schema({
    booking_id: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    }
}, {
    _id: false
});
// Define the user schema
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    bookings: [
        bookingSchema
    ],
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
userSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});
var User = mongoose.model('User', userSchema);
export default User;
