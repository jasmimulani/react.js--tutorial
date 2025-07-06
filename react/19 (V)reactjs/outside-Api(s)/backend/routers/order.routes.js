const express = require('express')
const OrderRoutes = express.Router()
const {VerifyToken} = require('../helpers/verifyToken')
const { addNewOrder, cancelOrder, getorder, getAllOrder } = require('../Controller/order.controller')

OrderRoutes.post('/add-order',VerifyToken, addNewOrder)
OrderRoutes.delete('/del-order',VerifyToken,cancelOrder)
OrderRoutes.get('/get-order',getorder)
OrderRoutes.get('/get-all-order',getAllOrder)

module.exports = OrderRoutes    