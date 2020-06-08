const express = require('express');
const bodyParser = require('body-parser');
//from mongoose model
const Post = require('./models/post');
const mongoose = require('mongoose');

//this returns us an express app and wnow we can use it .
const app = express();
mongoose.connect("mongodb+srv://anamika:1s1N23MiycqxJwDT@cluster0-tvojz.mongodb.net/mean-stack-app?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to Db!")
})
.catch(()=>{
    console.log("Connection to Db Failed!")
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    next();
})

//1s1N23MiycqxJwDT

app.post("/api/posts", (req, res, next) => { 
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
   post.save().then((result)=>{
       res.status(201).json({message:'added succesfully', postId: result._id});
})
   });
    


app.get('/api/posts', (req, res) => {
   Post.find()
   .then(documents=>{
    res.status(200).json({
        message: "post fetched succesfully",
        posts: documents
    });
   });
    //res.send('hello from ok express');
    
});

app.delete("/api/posts/:id",(req,res)=>{
    Post.deleteOne({_id:req.params.id})
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Deleted Succesfully"
        });
    })
    .catch(()=>{
        console.log("error")
    });
 
   
});

module.exports = app;