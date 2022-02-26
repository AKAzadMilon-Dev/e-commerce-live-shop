import express from 'express';
import data from './Data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongoose connected")
}).catch((error)=>{
    console.log(error)
})


const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/products', function (req, res) {
    res.send(data)
})

app.get('/products/:slug', function (req, res) {
    
    let product = data.find((item)=>{
        if(req.params.slug == item.slug){
            return item
        }
    })
    res.send(product)
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