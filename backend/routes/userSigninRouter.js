import express from 'express';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
import bcrypt from 'bcryptjs';
import vertualCard from '../models/vertualCardModel.js';

const userSinginRouter = express.Router()

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

userSinginRouter.post('/vertualcard',(req, res)=>{
    console.log(req.body)
    let vertualCardInfo = {
        amount: req.body.amount,
        owner: req.body.owner
    }

    const vertualcard = new vertualCard(vertualCardInfo)
    vertualcard.save()
    res.send('done')
})

export default userSinginRouter