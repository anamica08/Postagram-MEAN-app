const Post = require('../models/post');

exports.getPostById = (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        console.log("from db", post);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post not found"
            })
        }
    })
    .catch(err=>{
        res.status(404).json({
            message: "Some error occured during fetching Data!!"
        })
    });
}


exports.getAllPosts = (req, res) => {
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
        })
        .catch(err=>{
            res.status(404).json({
                message: "Some error occured during fetching Data!!"
            })
        });


}