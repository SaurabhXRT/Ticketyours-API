import { Schema } from "mongoose";
// Movie schema
var movieSchema = new Schema({
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }
}, {
    _id: false
});
export default movieSchema;
