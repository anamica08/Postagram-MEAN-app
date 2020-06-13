const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//from mongoose model

const mongoose = require('mongoose');

//this returns us an express app and wnow we can use it .
const app = express();
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
mongoose.connect("mongodb+srv://anamika:1s1N23MiycqxJwDT@cluster0-tvojz.mongodb.net/mean-stack-app?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to Db!")
})
.catch(()=>{
    console.log("Connection to Db Failed!")
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    next();
})

//1s1N23MiycqxJwDT

app.use("/api/posts",postRoutes);
app.use("/api/users",userRoutes);
module.exports = app;