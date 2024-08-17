import mongoose, { Schema } from "mongoose";
// City schema
var citymodelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: "City"
    },
    cinemaHalls: [
        {
            type: Schema.Types.ObjectId,
            ref: "CinemaHall"
        }
    ],
    cinemaMovies: [
        {
            type: Schema.Types.ObjectId,
            ref: "MovieInCinemaHall"
        }
    ]
}, {
    timestamps: true
});
var CityModel = mongoose.model("CityModel", citymodelSchema);
export default CityModel;
