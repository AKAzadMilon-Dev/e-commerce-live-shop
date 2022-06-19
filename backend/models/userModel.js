import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default:false
    },
    isVendor:{
        type: Boolean,
        default:false
    },
    isAffiliate:{
        type: Boolean,
        default:false
    },
})

const User = mongoose.model("User",UserSchema)

export default User