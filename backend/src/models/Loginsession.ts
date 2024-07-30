// models/loginSession.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface LoginSession extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    created_at: Date;
}

const loginSessionSchema: Schema = new Schema({
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

export default mongoose.model<LoginSession>('LoginSession', loginSessionSchema);
