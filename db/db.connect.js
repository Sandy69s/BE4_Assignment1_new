const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config();


const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
    await mongoose.connect(mongoUri)
    .then(() => {
        console.log("connected to Database");
    })
    .catch((error) => {
        console.log("Error connecting to database", error)
    })
}

module.exports = { initializeDatabase };