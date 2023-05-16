const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const userToken = req.cookies.usertoken;
        const decodedToken = jwt.verify(userToken, process.env.SECRET_KEY);
        const userId = decodedToken.id;
        const userDir = path.join(__dirname, 'uploads', userId.toString());
        fs.mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
