const express = require('express');
const router = express.Router();
const _Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


router.post("/signup", (req, res, next) => {
    _Bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                //password should be saved in encrypted manner, we will use Bcrypt package for this.
                password: hash
            });

            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "Succefully Registered",
                        addedUser: result
                    });
                })
                .catch(err => {
                    res.status(417).json({
                        message: "Alredy Registered!!",
                        error: err
                    });
                });
        });
})


router.post('/login', (req, res, next) => {
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
                    message: 'Authentication Failed!!'
                })
            }
            //lets create a token , if user exists and it authenticated
            const token = jwt.sign({ email: authorizedUser.email, userId: authorizedUser._id }, "post_application_created_to_learn_mean-stack_development", { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                expirationTime:3600
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication Failed!!'
            })
        })
})




module.exports = router;