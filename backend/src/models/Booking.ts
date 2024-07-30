import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Booking schema
interface Booking extends Document {
  user_id: mongoose.Types.ObjectId;
  movie_id: mongoose.Types.ObjectId;
  showtime_id: mongoose.Types.ObjectId;
  booking_date: Date;
  seats: string[];
  amount_paid: number;
  payment_id: mongoose.Types.ObjectId;
  ticket_id: string;
  created_at: Date;
  updated_at: Date; 
}

// Define the Booking schema
const bookingSchema = new Schema<Booking>({
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
  seats: [{
    type: String,
    required: true
  }],
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

// Update `updated_at` field before saving
bookingSchema.pre<Booking>('save', function(next) {
  this.updated_at = new Date();
  next();
});

const Booking = mongoose.model<Booking>('Booking', bookingSchema);

export default Booking;
