const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require('mongodb');
require("dotenv").config();

const app = express();
const PORT = 3001;

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
    console.error("error "+err);
})

// const db = mongoose.connection;

const User = mongoose.model("user", {
    userLogin: String,
    userPassword: String,
    userServices: Array,
});

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/home", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/addUser", async (req, res)=>{
    try{
        const {userLogin, userPassword, userServices} = req.body;

        const user = new User({userLogin, userPassword, userServices});
        await user.save();
        

        res.status(200).json({message: "data saved"});
    } catch(error){
        console.log("Error");
        res.status(500).json({error: "an error"})
    }
});

app.post("/update", async (req, res) => {
    try{
        const {serviceName, servicePassword, userLogin} = req.body;

        console.log(serviceName);
        console.log(servicePassword);
        console.log(userLogin);

        const user1 = await User.find({userLogin: userLogin});


        res.status(200).json({error: "an error"});
    } catch(error){
        console.log("error");
        res.status(500).json({error: "an error"});
    }
});

app.listen(PORT, () => {
    console.log("server works on port " + PORT);
});