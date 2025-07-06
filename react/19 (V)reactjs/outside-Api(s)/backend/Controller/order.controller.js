const Order = require('../model/order.model')
const Cart = require('../model/cart.model')

exports.addNewOrder = async (req,res) =>{
    try {
        const {items , subTotal , ...deliveryAddress} = req.body

        let existingOrder = await Order.findOne({
            user: req.user._id,
            items:{$eq:items},
            deliveryAddress:{$eq: deliveryAddress},
            isDeleteed: false
        })
        if(existingOrder){
            return res.status(409).json({msg:'order with the same name and delivery address alredy exist..'})
        }
               
        let order = await Order.create({
            user:req.user._id,
            item:items,
            subTotal : subTotal,deliveryAddress
        })
        await Cart.updateMany({user:req.user._id,isDeleteD:false},{isDeleteD:true})
        res.json({msg:'order place..',order})
        
    } catch (error) {
        console.log(err)
        res.status(500).json({msg:'internal server error.'})
        
    }
}

exports.cancelOrder = async(req,res) =>{
    try {
        let orderId = req.body._id
        if(!orderId){
            return res.status(404).json({msg:"order not found.."})
        }
        res.status(200).json({msg:'order delete'})
        
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"internal server error."})
        
        
    }
}

exports.getorder = async (req,res) =>{
    try {
        const order = await Order.findById({_id:req.query.orderId,isDelete:false})
        if(!order){
            return res.status(404).json({msg:'order not found..'})
        }
        res.status(200).json({order:order})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
    }
}

exports.getAllOrder = async(req,res) =>{
    try {
        const orders = await Order.find()
        .populate({path : 'items.productId' , select:'name description price image'})
        .populate('user','firstName lastName');
        res.status(200).json({orders})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"internal server error."})
        
        
    }
}