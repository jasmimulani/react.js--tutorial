const Product = require('../model/Product_model');

exports.addProduct = async (req,res) =>{
    try {
        let imagePath = "";
        const{name ,price,category } = req.body ;

        let product = await Product.findOne({name:name , isDelete:false});
        if(product){
            return res.status(400).json({msg:'item alredy exist..'});
        }
        if(req.file){
            imagePath = req.file.path.replace(/\\/g,"/");
        }
        product = await Product.create({
            name,
            price,
            category,
            image:imagePath
        });
        
        res.status(201).json({msg:'item added succsessfully..',product});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
    }
}

exports.productList = async (req,res) =>{
    try {
        const product = await Product.find({isDelete:false});
        if(!product) {
            return res.status(404).json({msg:'no item found.'});
        }
        res.status(200).json({product});
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
    }
}

exports.productItem = async (req,res) =>{
    try {
        let product = await Product.findById({_id:req.query.productId})
        if(!product){
            return res.status(404).josn({msg:'item not found..'});
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
}

exports.ProductUpdate = async (req,res)=>{
    try {
        let product = await Product.findById({ _id:req.query.productId,isDelete:false});
        if(!product){
            return res.status(404).json({msg:'item not found.'})
        }
        product = await Product.findByIdAndUpdate({ _id:product.id},req.body,{new:true})
        res.status(200).json({product,msg:'item updated...'});
    } catch (err) {
        console.error(err)
        res.status(500).json({msg:'internal server error.'})
    }
}


exports.Productdelete = async (req,res) =>{
    try {
        const productId = req.query.productId;
        let product = await Product.findOne({_id:productId,isDelete:false});

        if(!product){
            return res.status(404).json({msg:'item not found.'})
        }
        await Product.findByIdAndUpdate(productId,{isDelete:true},{new:true});
        res.status(200).json({msg:'item delete succsessfully...'})
    } catch (err) {
        console.error(err);
        res.status(500).josn({msg:'internal serevr error.'})
        
        
    }
}