const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");

// Step 1: Set up CORS middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Step 2: Set up body parsing middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Step 3: Set up cookie parsing middleware
app.use(cookieParser());

// Step 4: Set up Multer middleware for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId; // replace with your own user ID property
        const userDir = path.join(__dirname, 'uploads', userId.toString());
        fs.mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});



const upload = multer({ storage: storage });

// Step 5: Set up route handler for file uploads
app.post("/upload", upload.single("file"), (req, res) => {
    // handle the uploaded file here
});

// Step 6: Set up routes for your application
require("./config/mongoose.config");
require("./routes/starLight.routes")(app);
require("./routes/event.routes")(app);

// Step 7: Start the server and listen for incoming requests
app.listen(port, () => console.log(`Server listening on port ${port}`));
