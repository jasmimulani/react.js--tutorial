const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signupUser = async (req, res) => {
    try {
        let {name, email, password ,profileImage} = req.body;
        
        let user = await User.findOne({ email: email, isDelete: false });         
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }
        let imagePath = "";
        if(req.file){
            // console.log(req.file);
            
            imagePath = req.file.path.replace(/\\/g,"/")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        

        user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            profileImage:imagePath
        });

        res.status(201).json({ message: "User registered successfully.", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


exports.loginUser = async (req , res) =>{
    try{
        let user = await User.findOne({email:req.body.email, isDelete:false});
        
        if(!user){
            return res.json({msg:'user not found.'})
        }
        let comparedPassword = await bcrypt.compare(req.body.password ,user.password)
        if(!comparedPassword){
            return res.json({msg:'email or pass dont match...'})
        }
        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRATE);
        console.log(token);
        
        return res.json({msg:" login succseccc..",token})
    
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
}

 exports.getprofile = async (req,res) =>{
    try {
        let user = await User.findById({_id:req.query.userId})
        res.status(200).json({msg:'your profile',user})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
    }
}

exports.updateProfile = async (req,res)=>{
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(user._id,
            {$set:req.body},
            {new:true}
        );
        res.status(202).json({user, msg:'user profile update...'})
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:'internal server error.'});
        
        
    }
}

exports.Deleteuser =  async(req,res) =>{
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(user._id,{isDelete:true},{new:true});
        res.status(200).json({msg:'user delete succsess...'})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
};
exports.changePassword = async(req,res) =>{
    try {
        let user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({msg:'user not found..'});
        }
        let {oldpassword , newpassword , confirmpassword} = req.body;
        let match = await bcrypt.compare(oldpassword,user.password)
        if(!match){
            return res.status(400).json({msg:'invelid old password.'})
        }
        if(oldpassword === newpassword){
            return res.status(400).json({msg:'old and new password both are same.'});
        }
        if(newpassword !== confirmpassword){
            return res.status(400).json({msg:'new and confirm password dont match.'})
        }
        const hashnewPassword  =await bcrypt.hash(newpassword,10);
        await User.findByIdAndUpdate(req.user._id,{password:hashnewPassword});
        res.status(200).json({msg:"password change succsessfully!.."})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'internal server error.'})
        
        
    }
}



