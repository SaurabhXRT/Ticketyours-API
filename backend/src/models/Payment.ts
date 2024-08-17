import mongoose, { Document, Schema } from 'mongoose';

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

PaymentSchema.pre<IPayment>('save', function(next) {
  this.updated_at = new Date();
  next();
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
