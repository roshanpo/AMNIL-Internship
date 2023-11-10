const express = require('express');
const app = express();
require('dotenv').config();
//import { dotenv } from "config";
//const mongoose = require('mongoose');
//const User = require('./models/User');
//const Order = require('./models/Order');
//const Product = require('./models/Product');
const path = require('path'); 
//const ejsLint = require('ejs-lint');
//const firebaseConfig = require('./config/firebase');
//import {firebaseConfig} from './config/firebase.mjs'


//swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce API',
    version: '1.0.0',
    description:'This is a REST API application made with Express.',
  },
  
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);




app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const indexRouter = require("./routes/index");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server Started");
})

/*const connectDB = async ()=>{
    const conn = mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
       
    await conn.then(()=>console.log("Database Connected"),
        (error)=>{
            console.log(error);
        })
};
connectDB();
*/
app.use("/", indexRouter);
/*app.get('/', (req,res)=>{
    res.send("Task 3")
})

app.get('/product',(req,res)=>{

})*/