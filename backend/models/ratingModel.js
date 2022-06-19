import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
    {
        rating:{
            
        }
    }
)

const Rating = mongoose.model("rating", RatingSchema)

export default Rating