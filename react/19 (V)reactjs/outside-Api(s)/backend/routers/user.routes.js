const express = require('express');

const userRotes = express.Router();

const { signupUser, loginUser ,getprofile ,updateProfile,Deleteuser,changePassword } = require('../Controller/user.controller');
const {VerifyToken} = require('../helpers/verifyToken');
const {upload2} = require('../helpers/uploadimage')

userRotes.post('/signup', upload2.single('profileImage'),signupUser);
userRotes.post('/login', loginUser);
userRotes.get('/me',VerifyToken,getprofile);
userRotes.put('/update',VerifyToken,updateProfile );
userRotes.delete('/delete',VerifyToken,Deleteuser);
userRotes.put('/pass',VerifyToken,changePassword)

module.exports = userRotes;
