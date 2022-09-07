const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        });

        console.log(`Connected to MongoDB: ${conn.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Error: ${error.message}`.bgRed)
        process.exit();
    }
}

module.exports = connectDB