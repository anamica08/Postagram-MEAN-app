const Post = require('../models/post');

exports.updatePost = (req, res) => {
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
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
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
    })
    .catch(err=>{
        res.status(417).json({
            message: "Post Edit Failed!!"
        })
    });
}