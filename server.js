const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require('mongodb');
require("dotenv").config();

const app = express();
const PORT = 3000;

mongoose.connect(`mongodb+srv://andiifedirko:${process.env.DBPASSWORD}@cluster0.d6gdrbw.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('connected to mongoDB');
})
.catch((err)=>{
    console.error("error"+err);
})



app.listen(PORT, () => {
    console.log("server works on port " + PORT);
});