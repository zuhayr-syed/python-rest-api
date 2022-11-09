const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // MongoDB connector

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewURLParser: true
        });

        console.log('MongoDB Connected...');
    }
    catch (err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;