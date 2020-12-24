const express = require('express');
const indexRouter = express.Router();
const Todo = require('../model/todo')

indexRouter.get('/', (req, res, next) => {
    res.render("index.ejs");
    
    // Todo.find({})
    // .then((todos) => {
    //     res.render("index.ejs", {todo: todos});
    // })
    // .catch((err) => console.log(err))
});

module.exports = indexRouter;