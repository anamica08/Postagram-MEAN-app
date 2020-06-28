const multer = require('multer');
const path = require('path');


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
        cb(error, path.resolve(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split('').join('-');
        //above line miss the extension.
        const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension); //unique file name will be created . 


    }
})

module.exports = multer({ storage: storage }).single('image');