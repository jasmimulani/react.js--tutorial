const express = require('express')
const {VerifyToken} = require('../helpers/verifyToken')
const {addCart, updateCart, getCart, getAllcart, deleteCart} = require('../Controller/cart.controller')

const cartRouters =express.Router()
cartRouters.post('/add-cart',VerifyToken,addCart)
cartRouters.put('/update-cart',VerifyToken,updateCart)
cartRouters.get('/get-cart',VerifyToken,getCart)
cartRouters.get('/all-cart',VerifyToken,getAllcart)
cartRouters.delete('/del-cart',VerifyToken,deleteCart)

module.exports = cartRouters