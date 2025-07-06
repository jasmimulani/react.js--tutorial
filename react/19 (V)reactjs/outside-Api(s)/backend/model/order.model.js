const  mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true,
    },
    items:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
            require:true
        },
        quantity:{
            type:Number,
            require:true
        },
        totalprice:{
            type:Number,
            require:true
        }
    }],
    subTotal:{
        type:Number,
        require:true
    },
    deliveryAddress:{
        firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
    },
    status: { type: String, default: "Processing" },
    paymentStatus: { type: Boolean, default: false },
    isDelete:{
        type:Boolean,
        default:false
    }
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model('order',orderSchema)