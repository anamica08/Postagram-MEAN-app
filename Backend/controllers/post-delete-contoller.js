const Post = require('../models/post');

exports.deletePost = (req, res) => {
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
        .catch(err => {
            res.status(500).json({
                message: "Delete Failed!!"
            })
        });


}