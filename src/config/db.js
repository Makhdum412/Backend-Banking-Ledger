const mongoose = require('mongoose');

async function connectToDB(){
    if (!process.env.MONGODB_URI) {
        console.log('MONGODB_URI is not defined in environment variables');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
        process.exit(1);
    }
}

module.exports = connectToDB;
