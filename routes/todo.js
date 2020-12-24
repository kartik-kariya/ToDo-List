const express = require('express');
const todoRouter = express.Router();
const Todo = require('../model/todo');
const google = require('./google');

todoRouter.post('/todo/add', (req, res, next) => {
    const { todo } = req.body;
    var newTodo = new Todo({"todo": todo, "loginId": google.userEmail});
    newTodo.save()
    .then((todo) => {
        console.log("Successfully added Todo Item.");
        res.redirect('back');
    })
    .catch((err) => console.log(err));
})

todoRouter.get('/todo/delete/:_id', (req, res, next) => {
    const _id = req.params;
    Todo.deleteOne(_id)
    .then((resp) => {
        console.log("Deleted Successfully");
        res.redirect('back');
    })
    .catch((err) => console.log(err))
})

module.exports = todoRouter;