const mongoose = require("mongoose");

const connectDB = async () => {
    //promise
    await mongoose 
        .connect('mongodb://127.0.0.1/Authentiction')
        .then((msg) => console.log("Database connected successfully"))
        .catch((err) => console.log("Something went wrong" + err));
};

module.exports = connectDB; 