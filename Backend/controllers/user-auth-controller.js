const _Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');





exports.checkLogin =  (req, res, next) => {
    let authorizedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication Failed!!'
                })
            }
            authorizedUser = user
            //since bcrypt only provide facilty to encrypt , there is no way to decrypt it .
            // but it provide compare fucntion that will work.
            return _Bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Invalid Login Credentials!!'
                })
            }
            //lets create a token , if user exists and it authenticated
            const token = jwt.sign({ email: authorizedUser.email, userId: authorizedUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                expirationTime:3600,
                user_id: authorizedUser._id
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication Failed!!'
            })
        })
}