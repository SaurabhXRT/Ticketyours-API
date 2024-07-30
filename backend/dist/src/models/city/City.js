import mongoose, { Schema } from 'mongoose';
// Define the City schema
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
    timestamps: true // Automatically add createdAt and updatedAt fields
});
var City = mongoose.model('City', citySchema);
export default City;
