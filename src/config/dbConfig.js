const mongoose = require('mongoose')

// mongoose.connect(process.env.DB_URI)

// const db = mongoose.connection;

// db.on('connected', () => {
//     console.log("DB Connection Successful")
// })

// db.on('error', (err) => {
//     console.log(`db connection failed : ${err.message}`)
// })

MONGO_URI = process.env.DB_URI

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = db.connections[0].readyState;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection error:", error);
        throw error;
    }
};

module.exports = connectDB;