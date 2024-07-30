// models/loginSession.ts
import mongoose, { Schema } from 'mongoose';
var loginSessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});
export default mongoose.model('LoginSession', loginSessionSchema);
