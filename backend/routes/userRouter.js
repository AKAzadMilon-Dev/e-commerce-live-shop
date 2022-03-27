import  express  from "express";
import User from "../models/userModel.js";
import userData from "../userData.js";

const userRouter = express.Router()

userRouter.get('/authUser', async (req, res)=>{
    await User.remove({})
    const user = await User.insertMany(userData)
    res.send(user)
})

export default userRouter