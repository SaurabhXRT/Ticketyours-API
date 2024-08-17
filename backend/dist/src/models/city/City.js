import mongoose, { Schema } from 'mongoose';
// City schema
var citySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
var City = mongoose.model('City', citySchema);
export default City;
