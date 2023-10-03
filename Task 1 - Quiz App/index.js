const express = require("express");
const app = express();
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
app.use(express.static('public'));
const { log } = require("console");


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

let currentQuestionIndex = 0;
let score = 0;
const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

//console.log(questions);
app.get('/',(req, res)=>{
    if (currentQuestionIndex < questions.length) {
        res.render('Home', { question: questions[currentQuestionIndex], currentQuestionIndex });
    } else {
        res.render('score',{score,wrong:questions.length-score});
       
    }
    //res.redirect('/');
})

 app.post('/score',(req,res)=>{
    const redirectTo = req.body.redirectTo;
    res.redirect(redirectTo);
 })

app.post('/', (req, res) => {
    const userAnswer = req.body.answer;
    console.log(req.body.answer);
    if (currentQuestionIndex < questions.length) {
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            score++;
        }
        

        currentQuestionIndex++;
    }

    res.redirect('/');
});



const port = 3000;

app.listen(port,()=>{
    console.log("Server started at port 3000!");
})