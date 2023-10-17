const mongoose = require('mongoose');

exports.connectDb = async () => {

    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB Connected :${conn.connection.host}`)
}
