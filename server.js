const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require('mongodb');
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json())

mongoose.connect(`mongodb+srv://andiifedirko:${process.env.DBPASSWORD}@cluster0.lluvybx.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('connected to mongoDB');
})
.catch((err)=>{
    console.error("error"+err);
})

const db = mongoose.connection;

const User = mongoose.model("user", {
    login: String,
    password: String,
    // savedServices: Array,
});

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/addUser", async (req, res)=>{
    const {userLogin, userPassword, savedServices} = req.body;
    try{
        console.log(userLogin);
        console.log(userPassword);
        console.log(savedServices)

        const user = new User({login, password});

        await user.save();
    } catch(error){
        console.log("Error");
        res.status(500).json({error: "an error"})
    }
});

app.listen(PORT, () => {
    console.log("server works on port " + PORT);
});