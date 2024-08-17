import mongoose, { Document, Schema } from 'mongoose';

// interface for the Location schema
interface ILocation extends Document {
  street: string;
  city_id: mongoose.Types.ObjectId;
  state: string;
  zipcode: string;
  //country: string;
}

//Location schema
const locationSchema = new Schema<ILocation>({
  street: {
    type: String,
    required: true
  },
  city_id: {
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  // country: {
  //   type: String,
  //   required: true
  // }
}, { _id: false });

export default locationSchema;
