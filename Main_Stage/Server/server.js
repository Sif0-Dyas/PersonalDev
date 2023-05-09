const express = require("express");
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require("body-parser");

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.post('/upload', upload.single('file'), (req, res) => {
    // handle the uploaded file here
});

require('dotenv').config();
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);

require('./config/mongoose.config');
require('./routes/mainStagenp.routes')(app);
require('./routes/event.routes')(app);

// Move the error handling middleware here, after all the routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.message && err.message.includes('E11000') && err.message.includes('email')) {
        res.status(409).send({ message: err.message });
    } else {
        res.status(err.status || 500).send({ message: err.message });
    }
});


app.listen(port, () => console.log(`You are now connected to infinite existence via: ${port}`));
