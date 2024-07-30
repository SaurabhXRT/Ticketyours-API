import mongoose, { Document, Schema } from 'mongoose';

interface UserBooking extends Document {
  user_id: mongoose.Types.ObjectId;
  cinema_hall_name: string;
  movie_title: string;
  seat_numbers: string[];
  showtime: Date;
  booking_date: Date;
  total_price: number;
  created_at: Date;
  updated_at: Date;
}

const userBookingSchema = new Schema<UserBooking>({
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
  seat_numbers: [{
    type: String,
    required: true
  }],
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

// Update `updated_at` field before saving
userBookingSchema.pre<UserBooking>('save', function(next) {
  this.updated_at = new Date();
  next();
});

const UserBooking = mongoose.model<UserBooking>('UserBooking', userBookingSchema);

export default UserBooking;
