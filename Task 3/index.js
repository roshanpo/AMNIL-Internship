const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');


const indexRouter = require("./routes/index");

app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server Started");
})

const connectDB = async ()=>{
    const conn = mongoose.connect(process.env.MONGO_URI);
       
    await conn.then(()=>console.log("Database Connected"),
        (error)=>{
            console.log(error);
        })
};
connectDB();

app.use("/api", indexRouter);
app.get('/', (req,res)=>{
    res.send("Task 3")
})

app.get('/product',(req,res)=>{

})