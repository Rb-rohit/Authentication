const express = require("express");
var cors = require("cors");
const connectDB = require("./database/dbConnect");
require("dotenv").config();
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));

//database connection
connectDB();

app.use("/user", userRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});