import express from 'express';
import Order from '../models/orderModel.js';
import {isAuth} from '../utils.js';

const orderRouter = express.Router()

orderRouter.post('/',isAuth, async (req,res)=>{
    const neworder = new Order({
        orderItems: req.body.orderItems.map((p)=>({...p,product: p._id})),
        shippingInfo: req.body.shippingInfo,
        paymentMethod: req.body.paymentMethod,
        productPrice: req.body.productPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    })
    const order = await neworder.save()
    res.status(201).send({msg:"New Order Created", order})
})

orderRouter.get('/:id',isAuth, async (req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    }else{
        res.status(404).send({msg:"Order Not Found"})
    }
})

orderRouter.put('/:id/pay',isAuth, async (req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id:req.body.id,
            update_time:req.body.update_time,
            email_address:req.body.email_address
        }
        const updateOrder = await order.save()
        res.send({msg:'Order Paid',updateOrder})
    }else{
        res.status(404).send({msg:'Order Not Found'})
    }
    
})

export default orderRouter