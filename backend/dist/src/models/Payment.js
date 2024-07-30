import mongoose, { Schema } from 'mongoose';
// Define the Payment schema
var PaymentSchema = new Schema({
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
        enum: [
            'created',
            'completed',
            'failed'
        ],
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
PaymentSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});
var Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;
