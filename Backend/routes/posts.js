const express = require('express');

const router = express.Router();
const Post = require('../models/post');

router.post("", (req, res, next) => { 
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
   post.save().then((result)=>{
       res.status(201).json({message:'added succesfully', postId: result._id});
})
   });
    


router.get('', (req, res) => {
   Post.find()
   .then(documents=>{
    res.status(200).json({
        message: "post fetched succesfully",
        posts: documents
    });
   });
    //res.send('hello from ok express');
    
});

router.put("/:id",(req,res)=>{
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

router.get("/:id",(req,res)=>{
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

router.delete("/:id",(req,res)=>{
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

module.exports = router;