const express = require('express');
const app = express();
require('dotenv').config();
//const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Book = require('./models/Book')

app.use(express.urlencoded({ extended: true }));


const port = 3000;
    app.listen(port,()=>{
        console.log("Server is running");
    });

    const mongoURI = process.env.MONGO_URI;


    //Connecting to database
    mongoose.connect(mongoURI)
            .then(console.log("MongoDB connected"))
            .catch((error) => console.log(error));
    

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

// Create a new book
app.post('/books', async(req, res) => {
    const book = new Book(req.body);
    try {
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create a book' });
    }
});

// Read all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});
