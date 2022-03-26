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
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required:true
        },
        rating: {
            type:String,
            required:true
        },
        ratingNumber: {
            type:Number,
            required:true
        },
        inStock: {
            type:Number,
            required:true
        },
        category: {
            type:String,
            required:true
        },
        cupon: {
            type:String
        },
        discount: {
            type:Number
        },
        discountLimit: {
            type:Number
        },
        totalSale: {
            type:Number
        }
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model('Product',productSchema)

export default Product