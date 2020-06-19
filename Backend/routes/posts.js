const express = require('express');

const router = express.Router();
const checkAuth = require('../Middleware/verify-auth');
const extractFile = require('../Middleware/file');
const postCreateController = require('../controllers/post-create-controller');
const postUpdateController = require('../controllers/post-update-controller');
const postDeleteController = require('../controllers/post-delete-contoller');
const postFetchController = require('../controllers/post-fetch-controller');







//express automatically executes the checkAuth on each request.
router.post("", checkAuth,extractFile ,postCreateController.createPost);

router.get('', postFetchController.getAllPosts);

router.put("/:id", checkAuth, extractFile,postUpdateController.updatePost );

router.get("/:id", postFetchController.getPostById);

router.delete("/:id", checkAuth,postDeleteController.deletePost );







module.exports = router;