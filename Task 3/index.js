const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

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

app.get('/', (req,res)=>{
    res.send("Task 3")
})