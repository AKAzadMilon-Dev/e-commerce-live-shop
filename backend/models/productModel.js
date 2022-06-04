import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        img: {
            type: String,
            // required: true
        },
        brand: {
            type: String,
            // required: true
        },
        description: {
            type: String,
            // required: true
        },
        price: {
            type: Number,
            required:true
        },
        rating: {
            type:String
        },
        ratingNumber: {
            type:Number
        },
        inStock: {
            type:Number,
            // required:true
        },
        category: {
            type:String,
            required:true
        },
        cupon: {
            type:Number
        },
        discount: {
            type:String
        },
        discountLimit: {
            type:Number
        },
        totalSale: {
            type:Number
        },
        storeName:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'storeName'
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model('Product',productSchema)

export default Product