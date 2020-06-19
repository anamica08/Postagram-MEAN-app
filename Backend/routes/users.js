const express = require('express');
const router = express.Router();

const signupController = require('../controllers/create-user-controller')
const userAuthController = require('../controllers/user-auth-controller')




router.post("/signup",signupController.createUser);


router.post('/login', userAuthController.checkLogin);




module.exports = router;