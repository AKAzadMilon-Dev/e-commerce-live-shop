import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    permissions: [{type:String}]
})

const UserRole = mongoose.model("userrole",UserRoleSchema)

export default UserRole