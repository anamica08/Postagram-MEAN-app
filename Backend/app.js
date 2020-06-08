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
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
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

app.put("/api/posts/:id",(req,res)=>{
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
Post.updateOne({_id:req.params.id},post).then(result=>{
    console.log(result);
    res.status(200).json({
        message: "updated succesfully"
    })
});
})

app.get("/api/posts/:id",(req,res)=>{
    Post.findById(req.params.id).then(post=>{
        console.log("from db",post);
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({
                message: "Post not found"
            })
        }
    })
})

app.delete("/api/posts/:id",(req,res)=>{
    Post.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"Deleted Succesfully"
        });
    })
    .catch(()=>{
        console.log("error")
    });
 
   
});

module.exports = app;