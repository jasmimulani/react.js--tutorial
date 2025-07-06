const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'products'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
    },
    isDelete:{
        type:Boolean,
        default:false
    },
},{
    versionKey:false,
    timestamps:true
})
module.exports = mongoose.model('cart',cartSchema)