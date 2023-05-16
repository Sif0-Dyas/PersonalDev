const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Step 1: Set up CORS middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Step 2: Set up body parsing middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 3: Set up cookie parsing middleware
app.use(cookieParser());

// Step 4: Set up Multer middleware for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userToken = req.cookies.usertoken;
    const decodedToken = jwt.verify(userToken, process.env.SECRET_KEY);
    const userId = decodedToken.id; // based on your jwt payload structure
    const userDir = path.join(__dirname, 'uploads', userId.toString());
    fs.mkdirSync(userDir, { recursive: true });
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Step 5: Set up routes for your application
require('./config/mongoose.config');
require('./routes/starLight.routes')(app);
require('./routes/event.routes')(app);

// Step 6: Start the server and listen for incoming requests
app.listen(port, () => console.log(`Server listening on port ${port}`));
