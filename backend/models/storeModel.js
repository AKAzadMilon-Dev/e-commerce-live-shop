import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    } 
})

const StoreName = new mongoose.model('storeName', storeSchema)

export default StoreName