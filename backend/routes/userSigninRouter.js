import express from 'express';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import bcrypt from 'bcryptjs';
import virtualCard from '../models/vertualCardModel.js';
import UserRole from '../models/userRoleModel.js';
import AdminRole from '../models/adminRoleModel.js';

const userSinginRouter = express.Router()

userSinginRouter.get('/userlist', async (req, res)=>{
    const user = await User.find({})
    console.log(user)
    res.send(user)
})

userSinginRouter.post('/signin', async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    console.log(user)

    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isVendor: user.isVendor,
                isAffiliate: user.isAffiliate,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({msg: "Invalid Email or Password"})
})

userSinginRouter.post('/signup', async (req,res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })
    const user = await newUser.save()
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVendor: user.isVendor,
        isAffiliate: user.isAffiliate,
        token: generateToken(user)
    })
})

userSinginRouter.put('/:id', async (req,res)=>{
    console.log(req.params.id)
    User.findByIdAndUpdate(req.params.id,{isVendor:true},{new: true},function(err, docs){
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
})

userSinginRouter.post('/virtualcard',(req, res)=>{
    console.log(req.body)
    let virtualCardInfo = {
        amount: req.body.amount,
        owner: req.body.owner
    }

    const virtualcard = new virtualCard(virtualCardInfo)
    virtualcard.save()
    res.send('done')
})

userSinginRouter.post('/virtualcardpayment', async (req, res)=>{
    console.log(req.body)
    let data = await virtualCard.find({owner: req.body.owner})
    console.log(data[0].amount)
    if(data[0].amount < req.body.price){
        console.log('Amount is not sufficient to the product price')
    }else{
        console.log('data.amount - req.body.price')
        console.log(data[0].amount - req.body.price)
        virtualCard.findByIdAndUpdate(data[0]._id, {amount:data[0].amount - req.body.price}, {new:true}, function(err, docs){
            if(err){
                console.log(err)
            }else{
                console.log(docs)
            }
        })
    }
})

userSinginRouter.put('/affiliate/:id', async (req,res)=>{
    console.log(req.params)
    User.findByIdAndUpdate(req.params.id,{isAffiliate:true},{new: true},function(err, docs){
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
})

userSinginRouter.post('/userrole',(req,res)=>{
    console.log(req.body)
    let userRoleInfo = {
        name: req.body.name,
        permissions: req.body.permissions
    }
    const userRole = new UserRole(userRoleInfo)
    userRole.save()
    res.send(userRole)
})

userSinginRouter.get('/userrole', async (req, res)=>{
 let data = await UserRole.find({})
 res.send(data)
})

userSinginRouter.post('/adminrole',(req,res)=>{
    console.log(req.body)
    let adminRoleInfo = {
        email: req.body.email,
        password: req.body.password,
        adminrole: req.body.adminrole
    }
    const adminRole = new AdminRole(adminRoleInfo)
    adminRole.save()
    res.send(adminRole)
})

userSinginRouter.post('/adminsignin', async (req, res)=>{
    let user = await AdminRole.find({email: req.body.email})
    if(user){
        if(user[0].password == req.body.password){
            res.send(user)
        }else{
            res.send({msg:"password not match"})
        }
    }else{
        res.send({mes:"user not found"})
    }
})

export default userSinginRouter