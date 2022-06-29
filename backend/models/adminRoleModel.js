import mongoose from "mongoose";

const adminRoleSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    adminrole:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userrole',
        required: true,
    }
})

const AdminRole = mongoose.model("adminRole",adminRoleSchema)

export default AdminRole