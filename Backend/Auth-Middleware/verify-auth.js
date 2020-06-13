const jwt = require('jsonwebtoken')


//this fucntion is a middleware that will execute for the paths that areconfigured for authentication.
module.exports = (req, res, next) => {
    //token we are receiving is "Bearer *token*". 
    //can ommit bearer in other apps.
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "post_application_created_to_learn_mean-stack_development");
        next();
    } catch (error) {
        res.status(401).json({
            message: "Authentication Failed!!"
        })
    }

}