const express = require("express");
var cors = require("cors");
const connectDB = require("./database/dbConnect");
require("dotenv").config();
const userRoute = require('./routes/userRoute');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());

//database connection
connectDB();

app.use("/user", userRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});