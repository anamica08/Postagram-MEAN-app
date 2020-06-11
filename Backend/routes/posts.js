const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');

//multer configurations
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        //extra security if we detect mimeType other than these.
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");
        if (isValid) {
            error = null;
        }
        //please note path is relative to server.js
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split('').join('-');
        //above line miss the extension.
        const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension); //unique file name will be created . 


    }
})




router.post("", multer({ storage: storage }).single('image'), (req, res, next) => {
    //construct a url to server.
    const url = req.protocol + "://" + req.get('host');

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    });

    post.save().then((createdPost) => {
        res.status(201).json({
            message: 'added succesfully',
            post: {
                id: createdPost._id,
                //...createdPost
                //or ca use 
                title: createdPost.title,
                content: createdPost.content,
                imagePath: createdPost.imagePath
            }
        });
    })
});



router.get('', (req, res) => {
    const _query = Post.find();
    const pageSize = +req.query.size; //+ parses the string to number.
    const currPage = +req.query.page;
    let fetchedPosts;
    if (pageSize > 0 && currPage > 0) {
        _query.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    _query
    .then(documents => {
        fetchedPosts = documents;
        return Post.countDocuments();
    })
    .then(count=>{
        res.status(200).json({
            message:"Posts Fetched Succesfully",
            posts:fetchedPosts,
            maxPosts: count
        })
    });
    //res.send('hello from ok express');

});

router.put("/:id", multer({ storage: storage }).single('image'), (req, res) => {
    let imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get('host');
        imagePath = url + "/images/" + req.file.filename
    } else {
        imagePath = req.body.imagePath;
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });

    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({
            message: "updated succesfully",
            post: post
        })
    });
})

router.get("/:id", (req, res) => {
    Post.findById(req.params.id).then(post => {
        console.log("from db", post);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post not found"
            })
        }
    })
})

router.delete("/:id", (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "Deleted Succesfully"
            });
        })
        .catch(() => {
            console.log("error")
        });


});

module.exports = router;