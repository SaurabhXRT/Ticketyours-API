import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the City schema
export interface City extends Document {
  name: string;
  state: string;
  // Optionally add other fields as needed
  // country: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the City schema
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
  // Optionally define additional fields
  // country: {
  //     type: String,
  //     required: true
  // }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const City = mongoose.model<City>('City', citySchema);

export default City;
