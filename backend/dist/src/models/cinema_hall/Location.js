import { Schema } from 'mongoose';
//Location schema
var locationSchema = new Schema({
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
    }
}, {
    _id: false
});
export default locationSchema;
