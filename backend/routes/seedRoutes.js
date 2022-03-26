import express from "express";
import data from "../Data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js"

const seedRouter = express.Router()


seedRouter.get('/',async(req, res)=>{
    await Product.remove({})
    const product = await Product.insertMany(data)

    await User.remove({})
    const user = await User.insertMany(data)
    res.send(product)
})


export default seedRouter