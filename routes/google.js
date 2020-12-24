const express = require('express');
const googleRouter = express.Router();
const Todo = require('../model/todo')
const cookieSession = require('cookie-session');
googleRouter.use(cookieSession({
    name: 'todo-session',
    keys: ['key1', 'key2']
}))

const passport = require('passport');
require('dotenv').config();
require('./passport-setup');

googleRouter.use(passport.initialize());
googleRouter.use(passport.session());


const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });

passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

googleRouter.get('/google',passport.authenticate('google', {scope: ['profile', 'email']})); 

googleRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed'}), 
    function(req, res){
        res.redirect('/success');

    }
)

googleRouter.get('/success', isLoggedIn, (req, res) => {
    console.log
    const userEmail = req.user.emails[0].value;
    module.exports.userEmail = userEmail;
    Todo.find({loginId: userEmail})
    .then((todos) => {
        res.render("todo.ejs/", {name: req.user.given_name, email: req.user.emails[0].value, todo: todos});
    })
    .catch((err) => console.log(err))
})

googleRouter.get('/logout', (req,res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports = googleRouter;
