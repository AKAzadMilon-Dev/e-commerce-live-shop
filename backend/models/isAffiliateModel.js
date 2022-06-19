import mongoose from "mongoose";

const AffiliateSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }
)

const Affiliate = mongoose.model('affiliate', AffiliateSchema)

export default Affiliate