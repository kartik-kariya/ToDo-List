const express = require('express');
const app = express();

const passport = require('passport');

//MongoDB Connection
const monngoose = require('mongoose');
const connectDB = require('./DB/connection');
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('View Engine', 'ejs');

app.use(require('./routes/index'));
app.use(require('./routes/todo'));
app.use(require('./routes/google'));


app.listen(3000,() => {
    console.log("Server Running at localhost:3000");
})