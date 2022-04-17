import express from 'express';
import data from './Data.js';
import discount from './discount.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import userSinginRouter from './routes/userSigninRouter.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongoose connected")
}).catch((error)=>{
    console.log(error)
})

// middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/seed', seedRouter)
app.use('/products', productRouter)
app.use('/api/user', userRouter)
app.use('/api/userSignin', userSinginRouter)
app.use('/api/orders', orderRouter)

app.get('/discount', function (req, res) {
    res.send(discount)
})

app.get('/category/:cat', function (req, res) {
    
    let categoryArr = []
     data.find((item)=>{
        if(req.params.cat == item.category){
            categoryArr.push(item)
        }
    })
    res.send(categoryArr)
})

app.get('/cartProduct/:id', function (req, res) {
    
    let product = data.find((item)=>{
        if(req.params.id == item._id){
            return item
        }
    })
    res.send(product)
})

const port = process.env.PORT || 8000
  
app.listen(8000, (req,res)=>{
    console.log("8000 port run")
})