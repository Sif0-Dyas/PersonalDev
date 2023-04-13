

const express = require("express")
const cors = require('cors')
const multer = require('multer')
const app = express()
const port = 8000
// const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const cookies = require("cookie-parser");

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookies());
app.use(cookieParser());
// ^^^^needs to be avove the lines below 

require('dotenv').config()
require('./config/mongoose.config')
require('./routes/mainStage.routes')(app)
require('./routes/event.routes')(app);



// Routes(app)

//let's you know what port you are using
app.listen(port, () => console.log(`You are now connected to infinite existence via: ${port}`))