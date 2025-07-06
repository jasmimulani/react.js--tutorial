 require ("dotenv").config();
 const express = require('express');
 const app = express();  
 const morgan = require('morgan')
 const mongoose = require('mongoose');
 const port = process.env.PORT
 const cors = require('cors')
 const cookie = require('cookie-parser')
 const path = require('path')
 

 app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
 }))
 app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookie())

app.use("/public/images",express.static(path.join(__dirname,"public/images")))


app.get('/',(req,res) => {
    res.write('welcome to express server')
})

 app.use("/api/user",require('./routers/user.routes'))
 app.use("/api/product",require('./routers/product.routes'))
 app.use("/api/cart",require('./routers/cart.routes'))
 app.use("/api/order",require('./routers/order.routes'))

app.listen(port,() =>{
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() =>{
        console.log('database connection sucessfully...');
    })
    .catch((err) => console.log(err))
    console.log(`server start at http://localhost:${port}`);
    
})