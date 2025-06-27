//import express and store express and cors in a variable
require('dotenv').config()
const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//initialize the express application and store it in a variable called 'app'
const app = express()

//intialize the port to 8000
const port = 8000

// use cors to be able to dev both front end and back end on the same network
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}))

// Cookie parser middleware
app.use(cookieParser())

// Session middleware (minimal config for passport)
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}))

//allow the application to parse json data (form information)
app.use(express.json())

//allow the application to accept form information
app.use(express.urlencoded({extended: true}))

// Initialize database connection
require('./config/mongoose.config')

// Initialize passport configuration
const passport = require('./config/passport.config')
app.use(passport.initialize())
app.use(passport.session())

// Routes
const EventRoutes = require('./routes/events.routes')
const AuthRoutes = require('./routes/auth.routes')

// Mount routes
EventRoutes(app)
app.use('/auth', AuthRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'bass-stage-api',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    })
})

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error)
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    })
})

//let's you know what port you are using
app.listen(port, () => console.log(`🚀 Bass Stage API listening on port: ${port}`))