const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'images'),
    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        name = name + Date.now() + '.' + MIME_TYPES[file.mimetype];
        callback(null, name)
    }
});

module.exports = multer.storage({ storage}).single('image');