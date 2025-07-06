const Cart = require('../model/cart.model')
const Product = require('../model/Product_model')

exports.addCart = async(req,res) =>{
    try {
        const {product , quantity} = req.body;
        const userId = req.user._id;

        const  productItem = await Product.findById(product);
        if(!product){
            return res.status(404).json({msg:'item is not found.'});
        }
        let cart = await Cart.findOne({user:userId,product});

        if(cart){
            cart.quantity +=quantity;
            await cart.save();
            return res.json({msg:'cart quantity updaterd..',cart});
        }else{
             cart = await Cart.create({
                product,
                user:userId,
                quantity,
                price: productItem.price
             });
             return res.json({msg:'item added to cart..',cart})
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
}
exports.updateCart = async (req,res) =>{
    try {
        const {cartId ,quantity} = req.body;

        let cart = await  Cart.findById({_id: cartId ,isDelete:false});
        if(!cart){
            return res.status(404).json({msg:'cart item not found.'});
        }
        cart.quantity += quantity
        await cart.save();
        res.status(202).json({cart, msg:"cart item updated..."})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
}

exports.getCart = async  (req,res) =>{
         try {
            let cart = await Cart.findById({_id:req.query.cartId,isDelete:false})
            .populate("product","name , price")
            .exec();
            if(!cart){
                return res.json({msg:'cart item not found.'})
            }
            res.json()
         } catch (err) {
            console.log(err);
            res.status(500).json({msg:'internal server error.'})
            
            
         }
}
exports.getAllcart = async(req,res) =>{
    try {
         const cart = await Cart.find({isDelete:false})
         .populate("product");
         res.json(cart)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
}

exports.deleteCart  = async(req,res) =>{
    try {
        let cart = await Cart.findOne({_id:req.query.cartId,isDelete:false})
        if(!cart){
            return res.status(404).json({msg:'cart not found.'})
        }
        cart = await Cart.findByIdAndUpdate(cart._id,{isDelete:true},{new:true})
        res.status(200).json({msg:'cart delete'})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
}