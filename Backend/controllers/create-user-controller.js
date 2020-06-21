const _Bcrypt = require('bcryptjs');


const User = require('../models/user');



exports.createUser = (req, res) => {
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
                        addedUser: result.email
                    });
                })
                .catch(err => {
                    res.status(417).json({
                        message: "Already Registered!!",
                    });
                });
        });
}