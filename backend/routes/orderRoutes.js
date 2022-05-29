import express from 'express';
import Stripe from 'stripe'
import Order from '../models/orderModel.js';
import {isAuth} from '../utils.js';
import dotenv from 'dotenv';

dotenv.config()

const orderRouter = express.Router()

const stripe = new Stripe(process.env.STRIPE_CLIENT || "", null)

orderRouter.post('/',isAuth, async (req,res)=>{
    const neworder = new Order({
        orderItems: req.body.orderItems.map((p)=>({...p,product: p._id})),
        shippingInfo: req.body.shippingInfo,
        paymentMethod: req.body.paymentMethod,
        productPrice: req.body.productPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.body.user
    })
    const order = await neworder.save()
    res.status(201).send({msg:"New Order Created", order})
})

orderRouter.get('/wish/:id', isAuth, async (req, res)=>{
    const orders = await Order.find({user: req.params.id})
    res.send(orders)
})

orderRouter.get('/:id', isAuth, async (req,res)=>{
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

// Stripe payment method routes
orderRouter.post('/:id/payment',isAuth, async function (req,res){
    const {token={},amount=0} = req.body

    if(!Object.keys(token).length || !amount){
        res.status(404).send({msg:'order not found'})
    }

    const {id: customerID} = await stripe.customer.create({
        email: token.email,
        source: token.id
    }).catch(error=>{
        return null
    })

    const invoiceID = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`

    const charge = await stripe.chargesResource.create({
        amount: amount*100,
        currency: 'USD',
        customer: customerID,
        receipt_email: token.email,
        description: 'Live Shop Payment'
    },{
        idempotencyKey:invoiceID
    }).catch(error=>{
        return null
    })

    if(!charge){
        res.status(500).send({msg:'Order not found'})
    }
    res.status(201).send({msg:'Order paid'})

})

export default orderRouter