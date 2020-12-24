const mongoose = require('mongoose');

const uri = "<Cloud server DB link>";
// const uri = "mongodb://localhost:27017/todoDB";

const connectDB = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("DB Connectivity done.!");
}

module.exports = connectDB;
