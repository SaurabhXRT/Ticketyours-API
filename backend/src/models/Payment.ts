import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Payment schema
interface IPayment extends Document {
  user_id: mongoose.Types.ObjectId;
  // razorpay_order_id: string;
  // razorpay_payment_id: string;
  // razorpay_signature: string;
  amount: number;
  currency: string;
  status: 'created' | 'completed' | 'failed';
  created_at: Date;
  updated_at: Date;
}

// Define the Payment schema
const PaymentSchema = new Schema<IPayment>({
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // razorpay_order_id: { 
  //   type: String, 
  //   required: true 
  // },
  // razorpay_payment_id: { 
  //   type: String, 
  //   required: true 
  // },
  // razorpay_signature: { 
  //   type: String, 
  //   required: true 
  // },
  amount: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    default: 'INR' 
  },
  status: { 
    type: String, 
    enum: ['created', 'completed', 'failed'], 
    default: 'created' 
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
PaymentSchema.pre<IPayment>('save', function(next) {
  this.updated_at = new Date();
  next();
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
