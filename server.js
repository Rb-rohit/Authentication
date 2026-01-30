const express = require("express");
var cors = require("cors");
const connectDB = require("./database/dbConnect");
require("dotenv").config();
const userRoute = require('./routes/userRoute');
const cookieParser = require("cookie-parser");
const session = require('express-session');


const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// session config
app.use(session({
    name: "Session-cookie",
    secret: "super-secret-session-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,           
        sameSite: "lax",
        maxAge: 60 * 60 * 1000   // 1 hour
    }
}));

//database connection
connectDB();

app.use("/user", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});