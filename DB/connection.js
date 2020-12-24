const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:todo_admin@cluster0.ze08l.mongodb.net/todoDB?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/todoDB";

const connectDB = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("DB Connectivity done.!");
}

module.exports = connectDB;