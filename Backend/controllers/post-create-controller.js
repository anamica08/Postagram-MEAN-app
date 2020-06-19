const Post = require('../models/post');

exports.createPost =  (req, res, next) => {
    //construct a url to server.
    const url = req.protocol + "://" + req.get('host');

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });

    post.save()
    .then((createdPost) => {
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
    .catch(err=>{
        res.status(417).json({
            message: "Post not Added!! Some error occured!!"
        })
    })
}