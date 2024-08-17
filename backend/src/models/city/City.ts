import mongoose, { Document, Schema } from 'mongoose';

// interface for the City schema
export interface City extends Document {
  name: string;
  state: string;
  // country: string;
  createdAt: Date;
  updatedAt: Date;
}

// City schema
const citySchema = new Schema<City>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  // country: {
  //     type: String,
  //     required: true
  // }
}, {
  timestamps: true 
});

const City = mongoose.model<City>('City', citySchema);

export default City;
