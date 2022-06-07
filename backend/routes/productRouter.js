import express from 'express';
import Product from '../models/productModel.js';
import StoreName from '../models/storeModel.js';

const productRouter = express.Router()

productRouter.get('/', async(req, res)=>{
    const products = await Product.find()
    res.send(products)
})

productRouter.post('/', async(req, res)=>{
    console.log(req.body)
    const productInfo = {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        price: req.body.price,
        inStock: req.body.inStock,
        cupon: req.body.cupon,
        discount: req.body.discount,
        discountLimit: req.body.discountLimit,
        img: req.body.img,
        description: req.body.description,
        owner: req.body.owner
    }
    const product = new Product(productInfo)
    product.save()
})

productRouter.get('/:slug', async (req, res)=> {
    let product = await Product.findOne({slug:req.params.slug})
    if(product){
        res.send(product)
    }else{
        res.status(404).send({msg:'Product Not Found'})
    }
})

productRouter.post('/storename', async (req,res)=>{
    console.log(req.body)
    const storeNameInfo = {
        name: req.body.name,
        owner: req.body.id
    }

    const storeName = new StoreName(storeNameInfo)
    storeName.save()
    res.send(storeName)
})

productRouter.get('/storename/:id', async (req, res)=>{
    const data = await StoreName.find({owner:req.params.id})
    res.send(data)
})

productRouter.get('/productList/:id', async(req,res)=>{
    console.log(req.params.id)
    const data = await Product.find({owner: req.params.id})
    console.log(data)
    res.send(data)
})

export default productRouter