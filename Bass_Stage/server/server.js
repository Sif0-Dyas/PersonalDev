//import express and store express and cors in a variable
const express = require("express")
const cors = require('cors')
//initialize the express application and store it in a variable called 'app'
const app = express()

//intialize the port to 8000
const port = 8000

// use cors to be able to dev both front end and back end on the same network
app.use(cors())
//allow the application to parse json data (form information)
app.use(express.json())

//allow the application to accept form information
app.use(express.urlencoded({extended: true}))
// ^^^^needs to be avove the lines below 
require('./config/mongoose.config')

const Routes = require('./routes/events.routes')
//make sure you insert your routes name^^^^^

require('./config/mongoose.config')
Routes(app)

//let's you know what port you are using
app.listen(port, () => console.log(`Listening on port: ${port}`))