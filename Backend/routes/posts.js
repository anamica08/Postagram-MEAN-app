const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');

const checkAuth = require('../Auth-Middleware/verify-auth');
const { create } = require('../models/post');

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



//express automatically executes the checkAuth on each request.
router.post("", checkAuth, multer({ storage: storage }).single('image'), (req, res, next) => {
    //construct a url to server.
    const url = req.protocol + "://" + req.get('host');

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
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
                imagePath: createdPost.imagePath,
                creator: createdPost.creator
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
        .then(count => {
            res.status(200).json({
                message: "Posts Fetched Succesfully",
                posts: fetchedPosts,
                maxPosts: count
            })
        });


});

router.put("/:id", checkAuth, multer({ storage: storage }).single('image'), (req, res) => {
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
        imagePath: imagePath,
        creator: req.userData.userId
    });
    //creator is added to prevent , the user who doesnot belong to post to do changes.
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
        if (result.nModified === 0) {
            return res.status(401).json({
                message: "User not authorized",
                post: null
            })
        }
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

router.delete("/:id", checkAuth, (req, res) => {
    //console.log(req.userData.userId)
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            
            if (result.n === 0) {
                return res.status(401).json({
                    message: "User not authorized",

                })
            } else {
                res.status(200).json({
                    message: "Deleted Succesfully"
                });
            }
        })
        .catch(() => {
            console.log("error")
        });


});

module.exports = router;