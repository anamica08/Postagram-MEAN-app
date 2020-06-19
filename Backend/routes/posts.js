const express = require('express');
const multer = require('multer');
const router = express.Router();
const checkAuth = require('../Auth-Middleware/verify-auth');

const postCreateController = require('../controllers/post-create-controller');
const postUpdateController = require('../controllers/post-update-controller');
const postDeleteController = require('../controllers/post-delete-contoller');
const postFetchController = require('../controllers/post-fetch-controller');




//multer configurations
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        //extra security if we detect mimeType other than these.
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");
        if (isValid) {
            error = null;
        }
        //please note path is relative to server.js
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split('').join('-');
        //above line miss the extension.
        const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension); //unique file name will be created . 


    }
})




//express automatically executes the checkAuth on each request.
router.post("", checkAuth, multer({ storage: storage }).single('image'),postCreateController.createPost);

router.get('', postFetchController.getAllPosts);

router.put("/:id", checkAuth, multer({ storage: storage }).single('image'),postUpdateController.updatePost );

router.get("/:id", postFetchController.getPostById);

router.delete("/:id", checkAuth,postDeleteController.deletePost );







module.exports = router;