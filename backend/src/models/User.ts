import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the booking schema
interface IBooking extends Document {
  booking_id: mongoose.Types.ObjectId;
  // Uncomment and define the additional fields if needed
  // movie_id: mongoose.Types.ObjectId;
  // showtime_id: mongoose.Types.ObjectId;
  // booking_date: Date;
  // seats: string[];
  // amount_paid: number;
  // payment_id: mongoose.Types.ObjectId;
}

// Define the interface for the user schema
interface User extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  isPhoneVerified: boolean;
  bookings: IBooking[];
  created_at: Date;
  updated_at: Date;
}

// Define the booking schema
const bookingSchema = new Schema<IBooking>({
  booking_id: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  // movie_id: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Movie', 
  //     required: true
  // },
  // showtime_id: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'ShowtimeSlot', 
  //     required: true
  // },
  // booking_date: {
  //     type: Date,
  //     default: Date.now,
  //     required: true
  // },
  // seats: {
  //     type: [String],
  //     required: true
  // },
  // amount_paid: {
  //     type: Number,
  //     required: true
  // },
  // payment_id: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Payment', 
  //     required: true
  // }
}, { _id: false });

// Define the user schema
const userSchema = new Schema<User>({
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
  bookings: [bookingSchema],
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
userSchema.pre<User>('save', function(next) {
  this.updated_at = new Date();
  next();
});

const User = mongoose.model<User>('User', userSchema);

export default User;
 