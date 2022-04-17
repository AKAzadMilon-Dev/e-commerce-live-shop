import express from 'express';
import Order from '../models/orderModel.js';
import {isAuth} from '../utils.js';

const orderRouter = express.Router()

orderRouter.post('/',isAuth, async (req,res)=>{
    console.log(req.body.user)
    const neworder = new Order({
        orderItems: req.body.orderItems.map((p)=>({...p,product: p._id})),
        shippingInfo: req.body.shippingInfo,
        paymentMethod: req.body.paymentMethod,
        productPrice: req.body.productPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        // user: req.user._id
    })
    const order = await neworder.save()
    res.status(201).send({msg:"New Order Created", order})
})

export default orderRouter