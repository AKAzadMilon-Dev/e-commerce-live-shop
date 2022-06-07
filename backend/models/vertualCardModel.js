import mongoose from "mongoose";

const vertualCardSchema = new mongoose.Schema({
    amount:{
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const vertualCard = mongoose.model('vertualcard',vertualCardSchema)

export default vertualCard