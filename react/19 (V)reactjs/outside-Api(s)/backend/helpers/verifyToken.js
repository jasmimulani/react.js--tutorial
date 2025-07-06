const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.VerifyToken = async (req,res,next) =>{
    try {
        let authorization = req.headers['authorization'];
        if(!authorization)
            return res.json({msg: 'not authorization completed..'});
        let token = authorization.split(" ")[1];
        let {userId} = await jwt.verify(token,process.env.JWT_SECRATE);
        let user = await User.findOne({ _id:userId,isDelete:false})        
        if(!user)
            return res.json({msg:'user not found'})        
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error'})
        
        
    }
}


