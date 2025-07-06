const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
    },
    image:{
         type:String,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},{
      versionKey:false,
      timestamps:true
});
module.exports = mongoose.model('products',productSchema);