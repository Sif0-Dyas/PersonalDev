const mongoose = require('mongoose')

const database = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bass_stage'
console.log('🔗 Connecting to database:', database)

mongoose.set("strictQuery", false);
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
    .then(() => console.log(`✅ Connected to MongoDB: bass_stage`))
    .catch(err => {
        console.log(`❌ Database connection failed:`, err.message);
        console.log(`🔧 Make sure MongoDB Docker container is running on port 27017`);
    })