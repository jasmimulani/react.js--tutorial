const express = require('express');
const {upload} = require('../helpers/product-img')
const {addProduct , productList, productItem, ProductUpdate, Productdelete} = require('../Controller/Product.controller');
const productRoutes = express.Router();


productRoutes.post('/pro-add', upload.single('productImage'),addProduct);
productRoutes.get('/pro-list', productList);
productRoutes.get('/pro-item',productItem);
productRoutes.put('/pro-update',ProductUpdate);
productRoutes.delete('/pro-delete',Productdelete)

module.exports = productRoutes;